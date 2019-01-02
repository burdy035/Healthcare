import React, { Component } from "react";
import { connect } from "react-redux";

// import { checkUserAuthentication } from "../actions";

import DutyMainContent from "../components/MainContent/Duty";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

import Notice from "../components/Notice";

import {
    doGetAllUsersForDuty,
    doAddDuty,
    doGetDutiesOfWeeks,
    doDeleteDuty,
    doEditDuty
} from "../actions";
import moment from "moment";

class Home extends Component {
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
            this.props.dispatch(doGetAllUsersForDuty());
            let startDay = moment().startOf("week");
            let endDay = moment().endOf("week");
            this.props.dispatch(
                doGetDutiesOfWeeks({
                    startDay: startDay.format(),
                    endDay: endDay.format()
                })
            );
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

    _addDuty(values) {
        this.props.dispatch(doAddDuty(values));
    }
    _getDutiesOfWeek(start, end) {
        this.props.dispatch(
            doGetDutiesOfWeeks({
                startDay: moment(start).format(),
                endDay: moment(end).format()
            })
        );
    }

    _editDuty(values) {
        this.props.dispatch(doEditDuty(values));
    }

    _deleteDuty(values) {
        this.props.dispatch(doDeleteDuty(values));
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
                    <DutyMainContent
                        history={this.props.history}
                        duties={this.props.duties}
                        allUsers={this.props.allUsers}
                        addDuty={values => this._addDuty(values)}
                        getDutiesOfWeek={(start, end) =>
                            this._getDutiesOfWeek(start, end)
                        }
                        editDuty={values => this._editDuty(values)}
                        deleteDuty={values => this._deleteDuty(values)}
                        closeAllModal={this.props.closeAllModal}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, home, duty, warning }) => {
    return {
        user: auth.user,
        successMessage: duty.successMessage,
        errorMessage: duty.errorMessage,
        isLoggedIn: auth.isLoggedIn,
        loginSuccess: auth.loginSuccess,
        duties: duty.duties,
        allUsers: duty.allUsers,
        newDuty: duty.newDuty,
        closeAllModal: warning.getWarningMessage
    };
};
export default connect(mapStateToProps)(Home);
