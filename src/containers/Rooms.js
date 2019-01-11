import React, { Component } from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

import Notice from "../components/Notice";

import MainContentRooms from "../components/MainContent/Rooms";

import {
    doGetRooms,
    doAddRoom,
    doGetDevicesInfo,
    doEditRoom
} from "../actions";

class Rooms extends Component {
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
            this.props.dispatch(doGetRooms());
            this.props.dispatch(doGetDevicesInfo());
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

    _addItem(values) {
        console.log(values);
        this.props.dispatch(doAddRoom(values));
    }
    _editRoom(values) {
        console.log(values);

        this.props.dispatch(doEditRoom(values));
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

                    <MainContentRooms
                        user={this.props.user}
                        history={this.props.history}
                        addItem={values => this._addItem(values)}
                        roomList={this.props.roomList}
                        devicesDataForm={this.props.devicesDataForm}
                        patientsDataForm={this.props.patientsDataForm}
                        edit={values => this._editRoom(values)}
                        addRoomSuccess={this.props.addRoomSuccess}
                        editRoomSuccess={this.props.editRoomSuccess}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, rooms }) => {
    return {
        user: auth.user,
        successMessage: rooms.successMessage,
        errorMessage: rooms.errorMessage,
        isLoggedIn: auth.isLoggedIn,
        roomList: rooms.roomList,
        devicesDataForm: rooms.devicesDataForm,
        patientsDataForm: rooms.patientsDataForm,
        addRoomSuccess: rooms.addRoomSuccess,
        editRoomSuccess: rooms.editRoomSuccess
    };
};
export default connect(mapStateToProps)(Rooms);
