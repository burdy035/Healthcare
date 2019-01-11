import React, { Component } from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

import Notice from "../components/Notice";

import MainContentUserDetail from "../components/MainContent/UserDetail";

import {
    doGetUserDetail,
    doChangePassword,
    doEditUserDetail
} from "../actions";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toastrType: "success"
        };
    }
    componentDidMount() {
        const { isAuthenticated } = this.props.auth;

        if (!isAuthenticated()) {
            this.props.history.push("/login");
        } else {
            const { location } = this.props.history;

            const { state } = location;

            if (!state || !state.userId) {
                this.props.history.push("/");
            } else {
                this.setState({
                    userId: state.userId
                });
                this.props.dispatch(doGetUserDetail(state.userId));
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoggedIn) {
            this.props.history.push("/login");
        }

        if (nextProps.successMessage) {
            this.setState({
                messageDisplay: true,
                messageType: "success",
                message: nextProps.successMessage
            });
        }

        if (nextProps.errorMessage) {
            this.setState({
                messageDisplay: true,
                messageType: "error",
                message: nextProps.errorMessage
            });
        }
    }

    _patientOnclick(params) {
        this.props.history.push({
            pathname: `/patient-tracking/${params.patientName}`,
            state: { ...params }
        });
    }

    _userChangePassword(values) {
        values.userId = this.state.userId;

        this.props.dispatch(doChangePassword(values));
    }

    _changeDetail(values) {
        console.log(values);
        this.props.dispatch(doEditUserDetail(values));
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <Notice
                    display={this.state.messageDisplay}
                    type={this.state.messageType}
                    message={this.state.message}
                />
                <Sidebar user={this.props.user} history={this.props.history} />
                <div style={{ height: "100%", marginLeft: 220 }}>
                    <Topbar
                        user={this.props.user}
                        history={this.props.history}
                    />

                    <MainContentUserDetail
                        history={this.props.history}
                        user={this.props.user}
                        userDetail={this.props.userDetail}
                        userDuties={this.props.userDuties}
                        followingPatients={this.props.followingPatients}
                        patientOnclick={id => this._patientOnclick(id)}
                        changePassword={values =>
                            this._userChangePassword(values)
                        }
                        majors={this.props.majors}
                        changeDetail={values => this._changeDetail(values)}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, users }) => {
    return {
        user: auth.user,
        successMessage: users.successMessage,
        errorMessage: users.errorMessage,
        isLoggedIn: auth.isLoggedIn,
        userDetail: users.userDetail,
        userDuties: users.userDuties,
        followingPatients: users.followingPatients,
        majors: users.majors
    };
};
export default connect(mapStateToProps)(Users);
