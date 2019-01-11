import React, { Component } from "react";
import { connect } from "react-redux";

import io from "socket.io-client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faExclamationTriangle,
    faHeartbeat,
    faTemperatureHigh,
    faTimes
} from "@fortawesome/free-solid-svg-icons";

import Modal from "react-modal";

import { doConnect, doGetWarningMessage } from "../actions";

import sound from "../sounds/warning.mp3";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://localhost:3002",
            isWarning: false,
            muted: true,
            warningList: {}
        };
    }
    componentDidMount() {
        this.props.dispatch(doConnect());

        const { endpoint } = this.state;

        let socket = io.connect(`${endpoint}/warning`);

        this.socket = socket;

        socket.emit("test", "test");

        socket.on("warning-bpm", async data => {
            if (!this.state.isWarning) {
                this.props.dispatch(doGetWarningMessage());
                this.setState({
                    isWarning: true,
                    muted: false
                });
            }

            let temp = this.state.warningList;

            temp[`cardiac-${data.patient.id}`] = {
                type: "cardiac",
                bpm: data.bpm,
                patient: data.patient,
                room: data.room
            };

            this.setState({
                warningList: temp
            });
        });

        socket.on("warning-temperature", async data => {
            if (!this.state.isWarning) {
                this.props.dispatch(doGetWarningMessage());
                this.setState({
                    isWarning: true,
                    muted: false
                });
            }
            let temp = this.state.warningList;

            temp[`temperature-${data.patient.id}`] = {
                type: "temperature",
                temperature: data.temperature,
                patient: data.patient,
                room: data.room
            };

            this.setState({
                warningList: temp
            });
        });
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    _closeWarning(type, patientId) {
        this.socket.emit(`close-warning-${type}-${patientId}`);

        let tmp = this.state.warningList;

        delete tmp[`${type}-${patientId}`];

        let countW = 0;

        Object.keys(tmp).map(k => {
            if (tmp[k]) {
                countW++;
            }
        });

        this.setState({
            warningList: tmp,
            muted: true,
            isWarning: countW === 0 ? false : true
        });
    }

    render() {
        let currentUrl = window.location.href;

        let route = currentUrl.substr(currentUrl.lastIndexOf("/") + 3);

        if (route === "login") {
            return null;
        } else {
            return (
                <div style={{ display: "none" }}>
                    <Modal
                        isOpen={this.state.isWarning}
                        // isOpen={true}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        className="warning-modal"
                        overlayClassName="warning-overlay"
                    >
                        {/* {this.state.isWarning ? (
                                <div
                                    style={{
                                        visibility: "hidden",
                                        height: 0
                                        // display: "none"
                                    }}
                                >
                                    <audio ref="audio" src={sound} loop autoPlay />
                                </div>
                            ) : null} */}
                        <div
                            style={{
                                visibility: "hidden",
                                height: 0
                            }}
                        >
                            <audio
                                ref="audio"
                                src={sound}
                                muted={this.state.muted}
                                loop
                                autoPlay
                            />
                        </div>
                        <div className="warning-container">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginBottom: 15
                                }}
                            >
                                <FontAwesomeIcon
                                    style={{
                                        color: "red",
                                        width: 40,
                                        height: 40,
                                        marginRight: 15
                                    }}
                                    icon={faExclamationTriangle}
                                />
                            </div>
                            <div className="warning-list-container">
                                <div className="warning-row">
                                    <div className="warning-row-room">
                                        Phòng
                                    </div>
                                    <div className="warning-row-patient">
                                        Bệnh nhân
                                    </div>
                                    <div className="warning-row-action" />{" "}
                                    <div className="warning-row-close" />{" "}
                                </div>

                                {Object.keys(this.state.warningList).map(
                                    (k, i) => {
                                        let w = this.state.warningList[k];

                                        if (w.type === "cardiac") {
                                            return (
                                                <div
                                                    className="warning-row"
                                                    key={i}
                                                >
                                                    <div className="warning-row-room">
                                                        {w.room}
                                                    </div>
                                                    <div className="warning-row-patient">
                                                        {w.patient.name}
                                                    </div>
                                                    <div className="warning-row-action">
                                                        <FontAwesomeIcon
                                                            className="human-heart"
                                                            style={{
                                                                color: "red",
                                                                width: 25,
                                                                height: 25,
                                                                marginRight: 15,
                                                                marginLeft: 10
                                                            }}
                                                            icon={faHeartbeat}
                                                        />
                                                        <span
                                                            style={{
                                                                fontSize: 14
                                                            }}
                                                        >
                                                            {w.bpm}
                                                        </span>
                                                    </div>
                                                    <div className="warning-row-close">
                                                        <button
                                                            style={{
                                                                border: "none",
                                                                backgroundColor:
                                                                    "transparent"
                                                            }}
                                                            onClick={() =>
                                                                this._closeWarning(
                                                                    w.type,
                                                                    w.patient.id
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                style={{
                                                                    color: "red"
                                                                }}
                                                                icon={faTimes}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div
                                                    className="warning-row"
                                                    key={i}
                                                >
                                                    <div className="warning-row-room">
                                                        {w.room}
                                                    </div>
                                                    <div className="warning-row-patient">
                                                        {w.patient.name}
                                                    </div>
                                                    <div className="warning-row-action">
                                                        <FontAwesomeIcon
                                                            className="human-heart"
                                                            style={{
                                                                color: "red",
                                                                width: 25,
                                                                height: 25,
                                                                marginRight: 15,
                                                                marginLeft: 10
                                                            }}
                                                            icon={
                                                                faTemperatureHigh
                                                            }
                                                        />
                                                        <span
                                                            style={{
                                                                fontSize: 14
                                                            }}
                                                        >
                                                            {w.temperature}
                                                        </span>
                                                    </div>
                                                    <div className="warning-row-close">
                                                        <button
                                                            style={{
                                                                border: "none",
                                                                backgroundColor:
                                                                    "transparent"
                                                            }}
                                                            onClick={() =>
                                                                this._closeWarning(
                                                                    w.type,
                                                                    w.patient.id
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                style={{
                                                                    color: "red"
                                                                }}
                                                                icon={faTimes}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }
                                )}
                            </div>
                        </div>
                    </Modal>
                    {this.props.children}
                </div>
            );
        }
    }
}
const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user
    };
};
export default connect(mapStateToProps)(Users);
