import React, { Component } from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

import MainContentDevices from "../components/MainContent/Devices";

import {
    getDevices,
    getAddDeviceData,
    doAddDevice,
    doDeleteDevices,
    doEditDevice
} from "../actions";

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
            this.props.dispatch(getDevices());
            this.props.dispatch(getAddDeviceData());
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoggedIn) {
            this.props.history.push("/login");
        }
    }

    _addDevice(values) {
        this.props.dispatch(doAddDevice(values));
    }

    _deleteDevices(deviceIds) {
        this.props.dispatch(doDeleteDevices(deviceIds));
    }

    _editDevice(values) {
        this.props.dispatch(doEditDevice(values));
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

                    <MainContentDevices
                        user={this.props.user}
                        history={this.props.history}
                        addDeviceDataForm={this.props.addDeviceDataForm}
                        addDevice={values => this._addDevice(values)}
                        deleteDevices={ids => this._deleteDevices(ids)}
                        data={this.props.devicesList}
                        editDevice={values => this._editDevice(values)}
                        editDeviceSuccess={this.props.editDeviceSuccess}
                        addDeviceSuccess={this.props.addDeviceSuccess}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, devices }) => {
    return {
        user: auth.user,
        isLoggedIn: auth.isLoggedIn,
        addDeviceDataForm: devices.addDeviceDataForm,
        devicesList: devices.devicesList,
        editDeviceSuccess: devices.editDeviceSuccess,
        addDeviceSuccess: devices.addDeviceSuccess
    };
};
export default connect(mapStateToProps)(Devices);
