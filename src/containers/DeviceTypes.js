import React, { Component } from "react";
import { connect } from "react-redux";

import { toast } from "mdbreact";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

import MainContentDeviceTypes from "../components/MainContentDeviceTypes";

import { getDeviceTypes, addDeviceType, deleteDeviceType } from "../actions";

import LoadingBar from "../components/LoadingBar";

import Toast from "../components/Toast";

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
            this.props.dispatch(getDeviceTypes());
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deteleTypeMessage) {
            if (nextProps.error) {
                this.setState({
                    toastType: "error"
                });

                toast.error(nextProps.deteleTypeMessage);
            } else {
                this.setState({
                    toastType: "success"
                });

                toast.success(nextProps.deteleTypeMessage);
            }
        } else if (nextProps.addTypeMessage) {
            if (nextProps.error) {
                this.setState({
                    toastType: "error"
                });

                toast.error(nextProps.addTypeMessage);
            } else {
                this.setState({
                    toastType: "success"
                });

                toast.success(nextProps.addTypeMessage);
            }
        }
    }

    _addDeviceType(values) {
        console.log("a", values);

        this.props.dispatch(addDeviceType(values));
    }
    _deleteDeviceType(ids) {
        this.props.dispatch(deleteDeviceType(ids));
    }
    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <LoadingBar isFetching={this.props.isFetching} />
                <Toast toastType={this.state.toastType} />
                <Sidebar user={this.props.user} history={this.props.history} />
                <div style={{ height: "100%", marginLeft: 220 }}>
                    <Topbar
                        user={this.props.user}
                        history={this.props.history}
                    />

                    <MainContentDeviceTypes
                        history={this.props.history}
                        data={this.props.deviceTypeList}
                        addDeviceType={values => this._addDeviceType(values)}
                        deteleDeviceType={typeIds =>
                            this._deleteDeviceType(typeIds)
                        }
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, deviceTypes }) => {
    return {
        deviceTypeList: deviceTypes.deviceTypeList,
        user: auth.user,
        isFetching: deviceTypes.isFetching,
        deteleTypeMessage: deviceTypes.deteleTypeMessage,
        addTypeMessage: deviceTypes.addTypeMessage,
        error: deviceTypes.error
    };
};
export default connect(mapStateToProps)(Devices);
