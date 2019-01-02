import React, { Component } from "react";
import { connect } from "react-redux";

import io from "socket.io-client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faExclamationTriangle,
    faHeartbeat
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
            muted: true
        };

        // this.audio = new Audio(sound);
        // this.audio.load();
        // this.audio.loop = true;
        // this.audio.muted = true;
    }
    componentDidMount() {
        this.props.dispatch(doConnect());

        const { endpoint } = this.state;

        let socket = io.connect(`${endpoint}/warning`);

        this.socket = socket;

        socket.emit("test", "test");

        socket.on("warning-bpm", async data => {
            this.props.dispatch(doGetWarningMessage());
            if (!this.state.isWarning) {
                console.log("!this.state.isWarning");
                await this.setState({
                    isWarning: true,
                    muted: false
                });

                this.refs.audio.load();

                console.log(this.state);
            }

            this.setState({
                bpm: data.bpm,
                patient: data.patient,
                room: data.room
            });
        });

        socket.on("warning-temperature", async data => {
            this.props.dispatch(doGetWarningMessage());
            console.log("Tem: ", data);
        });
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    _close() {
        this.socket.emit("close-warning", "");
        // this.audio.pause();

        this.setState({
            isWarning: false,
            muted: true
        });
    }

    render() {
        let currentUrl = window.location.href;

        let route = currentUrl.substr(currentUrl.lastIndexOf("/") + 1);
        if (route === "login") {
            return null;
        } else {
            return (
                <div style={{ display: "none" }}>
                    <Modal
                        isOpen={this.state.isWarning}
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
                                // display: "none"
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

                                    alignItems: "center"
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

                                <span style={{ fontSize: 17 }}>
                                    {this.state.room}
                                </span>
                            </div>

                            <div style={{ fontSize: 14 }}>
                                Bệnh nhân: {this.state.patient}
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <FontAwesomeIcon
                                    className="human-heart"
                                    style={{
                                        color: "red",
                                        width: 35,
                                        height: 35,
                                        marginRight: 15
                                    }}
                                    icon={faHeartbeat}
                                />
                                <span style={{ fontSize: 14 }}>
                                    {this.state.bpm}
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginBottom: 5
                                }}
                            >
                                <button onClick={() => this._close()}>
                                    Close
                                </button>
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
