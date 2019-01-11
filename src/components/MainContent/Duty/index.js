import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

import Breadcumbs from "../../Breadcumbs";

import BigCalendar from "react-big-calendar";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import Modal from "react-modal";

import "./styles.css";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

Modal.setAppElement("#root");

class MainContentAddDuty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            selectedUser: {},
            editDutyModal: false,
            currentUserIndex: 0,
            selectedDuty: {},
            note: ""
        };

        this.breadcumbs = [
            { title: "Trang chủ", path: "/" },
            {
                title: "Quản lý lịch trực",
                path: "/duty",
                active: true
            }
        ];
    }

    componentDidMount() {
        let startDay = moment().startOf("week");
        let endDay = moment().endOf("week");
        this.setState({
            startDay,
            endDay
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.closeAllModal) {
            const { closeAllModal } = nextProps;

            if (closeAllModal) {
                this.setState({
                    modalIsOpen: false,
                    editDutyModal: false
                });
            }
        }
    }
    handleSelect = ({ start, end }) => {
        this.setState({
            start: start,
            end: end,
            modalIsOpen: true
        });
    };

    _closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    _closeEditModal() {
        this.setState({
            editDutyModal: false
        });
    }
    _addDuty() {
        this.setState({
            modalIsOpen: false
        });

        let start = moment(this.state.start).format();
        let end = moment(this.state.end).format();

        if (!this.state.selectedUser._id) {
            console.log("Select user please");
        } else {
            this.props.addDuty({
                start,
                end,
                note: this.state.note,
                userDutyId: this.state.selectedUser._id
            });
        }
    }
    _onSelect(user) {
        this.setState({
            selectedUser: user
        });
    }
    _onChange(field, value) {
        this.setState({
            [field]: value
        });
    }
    _rangeChange(start, end) {
        this.props.getDutiesOfWeek(start, end);
    }

    _selectUser() {
        let user = this.props.allUsers[this.state.currentUserIndex];
        this.setState({
            currentUserIndex:
                this.state.currentUserIndex >= this.props.allUsers.length - 1
                    ? 0
                    : this.state.currentUserIndex + 1,
            selectedUser: user
        });
    }

    _editDuty() {
        this.setState({
            editDutyModal: false
        });

        if (!this.state.selectedUser._id && !this.state.note) {
            console.log("Select user please");
        } else {
            this.props.editDuty({
                startDay: this.state.startDay,
                endDay: this.state.endDay,
                note: this.state.note,
                dutyId: this.state.selectedDuty._id,
                userDutyId: this.state.selectedUser._id
            });
        }
    }

    _deleteDuty() {
        this.setState({
            editDutyModal: false
        });

        if (!this.state.selectedDuty._id) {
            console.log("Select user please");
        } else {
            this.props.deleteDuty({
                startDay: this.state.startDay,
                endDay: this.state.endDay,
                dutyId: this.state.selectedDuty._id
            });
        }
    }

    render() {
        return (
            <div className="main-content" id="main">
                <div className="main-content-padding-20">
                    <div>
                        <Breadcumbs
                            history={this.props.history}
                            data={this.breadcumbs}
                        />

                        <div className="inner-main-content">
                            <div
                                className="content-area"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "auto"
                                }}
                            >
                                <div
                                    className="content-header"
                                    style={{ paddingBottom: 30 }}
                                >
                                    <span className="content-header-text">
                                        Lịch
                                    </span>
                                </div>
                                <div style={{ flex: 1, marginTop: 20 }}>
                                    <BigCalendar
                                        selectable
                                        localizer={localizer}
                                        events={this.props.duties.map(d => {
                                            d.start = new Date(d.start);
                                            d.end = new Date(d.end);
                                            return d;
                                        })}
                                        defaultView={BigCalendar.Views.WEEK}
                                        views={["week"]}
                                        defaultDate={new Date()}
                                        onSelectEvent={event => {
                                            this.setState({
                                                editDutyModal: true,
                                                selectedDuty: event,
                                                note: event.note,
                                                selectedUser: event.user
                                            });
                                        }}
                                        onSelectSlot={this.handleSelect}
                                        onRangeChange={obj =>
                                            this._rangeChange(obj[0], obj[6])
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            className="modal-add-duty"
                            overlayClassName="overlay-add-duty"
                            contentLabel="Example Modal"
                        >
                            <span style={{ fontSize: 17, fontWeight: "700" }}>
                                Lịch trực
                            </span>
                            <div style={{ marginTop: 15 }}>
                                <ControlLabel>Chọn người trực</ControlLabel>
                                <div className="add-user-to-duty">
                                    <input
                                        className="add-user-to-duty-input"
                                        type="text"
                                        placeholder="Search"
                                        disabled
                                        value={
                                            this.state.selectedUser.name || ""
                                        }
                                    />
                                    <button
                                        className="icon-button"
                                        onClick={() => this._selectUser()}
                                    >
                                        <FontAwesomeIcon
                                            style={{
                                                color: "green"
                                            }}
                                            icon={faPlus}
                                        />
                                    </button>
                                </div>
                            </div>

                            <FormGroup className="custom-form-group">
                                <ControlLabel>Ghi chú</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    value={this.state.note || ""}
                                    bsClass={`form-control custom-form-control-duty`}
                                    onChange={e =>
                                        this._onChange("note", e.target.value)
                                    }
                                />
                            </FormGroup>
                            <div className="user-select">
                                {this.props.allUsers.map((user, index) => {
                                    return (
                                        <div
                                            className="user-select-row"
                                            key={index}
                                            style={{
                                                borderRadius: 4,

                                                borderBottom:
                                                    index !==
                                                    this.props.allUsers.length -
                                                        1
                                                        ? "1px solid #ccc"
                                                        : "none"
                                            }}
                                            onClick={() => this._onSelect(user)}
                                        >
                                            <span style={{}}>{user.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div
                                style={{
                                    marginTop: 20,
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}
                            >
                                <button
                                    style={{ marginRight: 10 }}
                                    onClick={() => this._closeModal()}
                                >
                                    Huỷ
                                </button>
                                <button onClick={() => this._addDuty()}>
                                    Chọn
                                </button>
                            </div>
                        </Modal>
                        <Modal
                            isOpen={this.state.editDutyModal}
                            className="modal-add-duty"
                            overlayClassName="overlay-add-duty"
                            contentLabel="Example Modal"
                        >
                            <span style={{ fontSize: 17, fontWeight: "700" }}>
                                Lịch trực
                            </span>
                            <div style={{ marginTop: 15 }}>
                                <ControlLabel>Chọn người trực</ControlLabel>
                                <div className="add-user-to-duty">
                                    <input
                                        className="add-user-to-duty-input"
                                        type="text"
                                        placeholder="Search"
                                        disabled
                                        value={
                                            this.state.selectedUser.name || ""
                                        }
                                    />
                                    <button
                                        className="icon-button"
                                        onClick={() => this._selectUser()}
                                    >
                                        <FontAwesomeIcon
                                            style={{
                                                color: "green"
                                            }}
                                            icon={faPlus}
                                        />
                                    </button>
                                </div>
                            </div>

                            <FormGroup className="custom-form-group">
                                <ControlLabel>Ghi chú</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    value={this.state.note || ""}
                                    bsClass={`form-control custom-form-control-duty`}
                                    onChange={e =>
                                        this._onChange("note", e.target.value)
                                    }
                                />
                            </FormGroup>
                            <div className="user-select">
                                {this.props.allUsers.map((user, index) => {
                                    return (
                                        <div
                                            className="user-select-row"
                                            key={index}
                                            style={{
                                                borderRadius: 4,

                                                borderBottom:
                                                    index !==
                                                    this.props.allUsers.length -
                                                        1
                                                        ? "1px solid #ccc"
                                                        : "none"
                                            }}
                                            onClick={() => this._onSelect(user)}
                                        >
                                            <span style={{}}>{user.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div
                                style={{
                                    marginTop: 20,
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}
                            >
                                <button
                                    style={{ marginRight: 10 }}
                                    onClick={() => this._closeEditModal()}
                                >
                                    Đóng
                                </button>
                                <button
                                    style={{ marginRight: 10 }}
                                    onClick={() => this._deleteDuty()}
                                >
                                    Xoá
                                </button>
                                <button onClick={() => this._editDuty()}>
                                    Sửa
                                </button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}
export default MainContentAddDuty;
