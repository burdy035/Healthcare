import React, { Component } from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

import Notice from "../components/Notice";

import MainContentUsers from "../components/MainContent/Users";

import { doAddUser, doGetUsers, doDeleteUsers } from "../actions";

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
            this.props.dispatch(doGetUsers());
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

    _addUser(values) {
        this.props.dispatch(doAddUser(values));
    }

    _userDetail(params) {
        this.props.history.push({
            pathname: `/user/${params.suffix}`,
            state: {
                userId: params.userId
            }
        });
    }

    _deleteUsers(userIds) {
        console.log(userIds);
        this.props.dispatch(doDeleteUsers(userIds));
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

                    <MainContentUsers
                        history={this.props.history}
                        user={this.props.user}
                        userList={this.props.userList}
                        addUser={values => this._addUser(values)}
                        userDetail={params => this._userDetail(params)}
                        addUserSuccess={this.props.addUserSuccess}
                        majors={this.props.majors}
                        deleteUsers={userIds => this._deleteUsers(userIds)}
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
        userList: users.userList,
        addUserSuccess: users.addUserSuccess,
        majors: users.majors
    };
};
export default connect(mapStateToProps)(Users);
