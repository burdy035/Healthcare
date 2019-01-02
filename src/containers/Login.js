import React, { Component } from "react";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { toast } from "mdbreact";

import LoadingBar from "../components/LoadingBar";

import Notice from "../components/Notice";

import { doLogin } from "../actions";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            toastType: ""
        };
    }

    componentDidMount() {
        const { isAuthenticated } = this.props.auth;

        if (isAuthenticated()) {
            this.props.history.push("/home");
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn) {
            this.props.history.push("/home");
        } else if (nextProps.loginError) {
            this.setState({
                messageDisplay: true,
                messageType: "error",
                message: nextProps.loginError
            });
        }
    }
    _signInOnClick() {
        if (!this.state.username) {
            this.setState({
                messageDisplay: true,
                messageType: "error",
                message: "Thiếu tài khoản"
            });
        } else if (!this.state.password) {
            this.setState({
                messageDisplay: true,
                messageType: "error",
                message: "Vui lòng nhập mật khẩu"
            });
        } else {
            this.props.dispatch(
                doLogin(this.state.username, this.state.password)
            );
        }
    }

    _formOnChange(field, event) {
        this.setState({
            [field]: event.target.value
        });
    }

    render() {
        return (
            <div className="main login-main">
                <LoadingBar isFetching={this.props.isFetching} />
                <Notice
                    display={this.state.messageDisplay}
                    type={this.state.messageType}
                    message={this.state.message}
                />
                <div className="login-main-cover">
                    <div className="container">
                        <div className="col-md-4">
                            <div className="form-horizontal templatemo-login-form-2">
                                <div className="row login-form-row">
                                    <div className="">
                                        <p className="login-title">Sign in</p>
                                    </div>
                                </div>
                                <div className="row login-form-row">
                                    <div className="templatemo-one-signin">
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <div className="templatemo-input-icon-container">
                                                    <i className="fa fa-user" />
                                                    <input
                                                        className="login-field"
                                                        placeholder="Username"
                                                        value={
                                                            this.state.username
                                                        }
                                                        onChange={event =>
                                                            this._formOnChange(
                                                                "username",
                                                                event
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <div className="templatemo-input-icon-container">
                                                    <i className="fa fa-lock" />

                                                    <input
                                                        className="login-field"
                                                        type="password"
                                                        placeholder="Password"
                                                        value={
                                                            this.state.password
                                                        }
                                                        onChange={event =>
                                                            this._formOnChange(
                                                                "password",
                                                                event
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group sign-in-block">
                                            <div className="col-md-12">
                                                <button
                                                    onClick={() =>
                                                        this._signInOnClick()
                                                    }
                                                    className="btn-sign-in btn btn-warning row"
                                                >
                                                    {this.props.isFetching ? (
                                                        <CircularProgress
                                                            style={{
                                                                marginRight: 10,
                                                                color: "#fff"
                                                            }}
                                                            size={16}
                                                        />
                                                    ) : null}
                                                    Sign in
                                                </button>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-md-12">
                                                <a
                                                    href="/forgot-password"
                                                    className="text-center"
                                                >
                                                    Cannot login?
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    return {
        isFetching: auth.isFetching,
        isLoggedIn: auth.isLoggedIn,
        loginError: auth.loginError
    };
};
export default connect(mapStateToProps)(Home);
