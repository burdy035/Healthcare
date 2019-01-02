import React, { Component } from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

import MainContentSettings from "../components/MainContentSettings";

import { doGetSettingData, doAddSettingData } from "../actions";

class Devices extends Component {
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
            this.props.dispatch(doGetSettingData());
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoggedIn) {
            this.props.history.push("/login");
        }
    }

    _addItem(values) {
        this.props.dispatch(doAddSettingData(values));
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

                    <MainContentSettings
                        history={this.props.history}
                        addItem={values => this._addItem(values)}
                        deviceStateData={this.props.deviceStateData}
                        patientStateData={this.props.patientStateData}
                        userRolesData={this.props.userRolesData}
                        majors={this.props.majors}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, settings }) => {
    return {
        user: auth.user,
        isLoggedIn: auth.isLoggedIn,
        deviceStateData: settings.deviceStateData,
        patientStateData: settings.patientStateData,
        userRolesData: settings.userRolesData,
        majors: settings.majors
    };
};
export default connect(mapStateToProps)(Devices);
