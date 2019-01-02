import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

import Breadcumbs from "../../Breadcumbs";

import BigCalendar from "react-big-calendar";

import Modal from "react-modal";

import "./styles.css";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

Modal.setAppElement("#root");

class MainContentUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };

        this.breadcumbs = [
            { title: "Trang chủ", path: "/" },
            {
                title: "Theo dõi bệnh nhân",
                path: "/patient-tracking",
                active: true
            }
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userList) {
            this.setState({
                data: nextProps.userList
            });
        }
        if (nextProps.addUserSuccess) {
            this.setState({
                addSectionVisible: !this.state.addSectionVisible
            });
        }
    }

    _closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    render() {
        return (
            <div className="main-content">
                <div className="main-content-padding-20">
                    <div>
                        <Breadcumbs data={this.breadcumbs} />

                        <div className="inner-main-content">
                            <div
                                className="content-area"
                                style={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <div className="content-header">
                                    <span className="content-header-text">
                                        Lịch
                                    </span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <BigCalendar
                                        style={{ flex: 1, height: "100%" }}
                                        events={this.props.duties}
                                        views={["month"]}
                                        step={60}
                                        showMultiDayTimes
                                        defaultDate={new Date()}
                                        localizer={localizer}
                                        onSelectEvent={e => {
                                            console.log(e);
                                            this.setState({
                                                modalIsOpen: true,
                                                title: e.title,
                                                user: e.user.name,
                                                note: e.note,
                                                start: moment(e.start).format(
                                                    "hh:mm"
                                                ),
                                                end: moment(e.end).format(
                                                    "hh:mm"
                                                )
                                            });
                                        }}
                                    />
                                </div>

                                <Modal
                                    isOpen={this.state.modalIsOpen}
                                    onAfterOpen={this.afterOpenModal}
                                    onRequestClose={this.closeModal}
                                    className="modal-1"
                                    overlayClassName="overlay-1"
                                    contentLabel="Example Modal"
                                >
                                    <div>
                                        <span
                                            style={{
                                                fontSize: 17
                                            }}
                                        >
                                            Người trực: {this.state.user}
                                        </span>
                                        <br />
                                        <span
                                            style={{
                                                fontSize: 17
                                            }}
                                        >
                                            Ghi chú: {this.state.note}
                                        </span>
                                        <br />
                                        <span
                                            style={{
                                                fontSize: 15
                                            }}
                                        >
                                            Thời gian: {this.state.start} -{" "}
                                            {this.state.end}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            marginTop: 20,
                                            display: "flex",
                                            justifyContent: "flex-end"
                                        }}
                                    >
                                        <button
                                            style={{}}
                                            onClick={() => this._closeModal()}
                                        >
                                            Đóng
                                        </button>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MainContentUsers;
