import React, { Component } from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

import MainContentUserDetail from "../components/MainContent/UserDetail";

import { doGetUserDetail, doChangePassword } from "../actions";

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
            const { state } = this.props.history.location;

            if (!state.userId) {
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
    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <Sidebar user={this.props.user} history={this.props.history} />
                <div style={{ height: "100%", marginLeft: 220 }}>
                    <Topbar
                        user={this.props.user}
                        history={this.props.history}
                    />

                    <MainContentUserDetail
                        history={this.props.history}
                        userDetail={this.props.userDetail}
                        userDuties={this.props.userDuties}
                        followingPatients={this.props.followingPatients}
                        patientOnclick={id => this._patientOnclick(id)}
                        changePassword={values =>
                            this._userChangePassword(values)
                        }
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, users }) => {
    return {
        user: auth.user,
        isLoggedIn: auth.isLoggedIn,
        userDetail: users.userDetail,
        userDuties: users.userDuties,
        followingPatients: users.followingPatients
    };
};
export default connect(mapStateToProps)(Users);
