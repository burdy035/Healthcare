import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

import Breadcumbs from "../../Breadcumbs";

import Table from "../../TableComponent";

import AddRoom from "./AddRoom";

import EditRoom from "./EditRoom";

import "./styles.css";

class MainContentDevices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            allCheckboxesAreChecked: false,
            columns: [
                {
                    field: "room",
                    label: "Phòng"
                },
                {
                    field: "block",
                    label: "Block"
                },
                {
                    field: "patient",
                    label: "Patient"
                },
                {
                    field: "temperatureSensor",
                    label: "Sensor đo nhiệt độ",
                    type: "select",
                    icon: true
                },
                {
                    field: "cardiacSensor",
                    label: "Sensor đo nhịp tim",
                    type: "select",
                    icon: true
                }
            ],
            patient: "",
            editSectionVisible: false,
            addSectionVisible: false,
            mainSectionVisible: true,
            addRoomSectionVisible: "none",
            devicesColums: [],
            currentAction: "add",
            currentRoom: {}
        };

        this.breadcumbs = [
            { title: "Trang chủ", path: "/" },
            {
                title: "Quản lý phòng bệnh",
                path: "/patient-tracking",
                active: true
            }
        ];
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {
        if (nextProps.roomList) {
            this.setState({
                data: nextProps.roomList
            });
        }
        if (nextProps.editRoomSuccess) {
            this.setState({
                mainSectionVisible: true,
                editSectionVisible: false
            });
        }
        if (nextProps.addRoomSuccess) {
            this.setState({
                mainSectionVisible: true,
                addSectionVisible: false
            });
        }
    }

    _checkAllCheckbox(checked) {
        let temp = this.state.data;

        temp.map(ele => {
            return (ele.isChecked = checked);
        });

        this.setState({
            allCheckboxesAreChecked: checked,
            data: temp,
            deleteBtn: true
        });

        return;
    }
    _onCheckboxChange(index, checked) {
        if (this.state.allCheckboxesAreChecked) {
            this.setState({
                allCheckboxesAreChecked: false
            });
        }

        let temp = this.state.data;

        temp[index].isChecked = checked;

        this.setState({
            data: temp
        });
    }

    _handleChange(field, value) {
        if (field === "manufacturingDate" || field === "expiryDate") {
            let date = moment(value);

            date = date.format();

            this.setState({
                [field]: date
            });
        } else {
            this.setState({
                [field]: value
            });
        }
    }
    _onChange(field, value) {
        this.setState({
            [field]: value
        });
    }

    _submit(values) {
        if (this.state.currentAction === "edit") {
        }
    }

    _editRoom(values) {
        this.props.edit(values);
    }

    _addRoom(values) {
        this.props.addItem(values);
    }

    _editOnClick(index) {
        this.setState({
            currentRoom: this.state.data[index],
            editSectionVisible: true,
            mainSectionVisible: false
        });
    }

    _addRoomOnClick() {
        this.setState({
            addSectionVisible: true,
            currentRoom: {},
            mainSectionVisible: false
        });
    }

    _renderDeteleButton() {
        let count = 0;
        this.state.data.map(item => {
            if (item.isChecked === true) {
                count++;
            }
            return count;
        });

        if (count) {
            return (
                <button
                    className="btn-delete rcs-btn"
                    onClick={() => this._addDeviceOnClick()}
                >
                    Delete
                    {count > 1 ? " devices" : " device"}
                </button>
            );
        }
    }

    render() {
        let { user } = this.props;

        let { role } = user;

        return (
            <div className="main-content">
                <div
                    style={{
                        height: "100%",
                        padding: 20
                    }}
                >
                    <div
                        style={{
                            height: "100%"
                        }}
                    >
                        <Breadcumbs
                            history={this.props.history}
                            data={this.breadcumbs}
                        />

                        <div
                            className="inner-main-content"
                            style={{
                                flexDirection: "row"
                            }}
                        >
                            <div
                                className="content-area"
                                style={{
                                    display: this.state.mainSectionVisible
                                        ? "block"
                                        : "none"
                                }}
                            >
                                <div className="content-header">
                                    <span
                                        style={{
                                            fontSize: 17,
                                            fontWeight: "800"
                                        }}
                                    >
                                        Quản lý phòng bệnh
                                    </span>
                                    {role && role.value === "admin" ? (
                                        <div>
                                            {this._renderDeteleButton()}

                                            <button
                                                style={{
                                                    backgroundColor:
                                                        "transparent",
                                                    border: "none"
                                                }}
                                                onClick={() =>
                                                    this._addRoomOnClick()
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    style={{
                                                        color: "green"
                                                    }}
                                                    icon={faPlus}
                                                />
                                            </button>
                                        </div>
                                    ) : null}
                                </div>

                                <Table
                                    data={this.state.data}
                                    fields={this.state.columns}
                                    actions={{
                                        detail: true,
                                        delete:
                                            role && role.value === "admin"
                                                ? true
                                                : false,
                                        edit:
                                            role && role.value === "admin"
                                                ? true
                                                : false
                                    }}
                                    onChange={(index, checked) =>
                                        this._onCheckboxChange(index, checked)
                                    }
                                    checkAll={checked =>
                                        this._checkAllCheckbox(checked)
                                    }
                                    allCheckboxesAreChecked={
                                        this.state.allCheckboxesAreChecked
                                    }
                                    edit={index => this._editOnClick(index)}
                                    detail={() => {}}
                                />
                            </div>
                            <AddRoom
                                visible={this.state.addSectionVisible}
                                devicesDataForm={this.props.devicesDataForm}
                                patientsDataForm={this.props.patientsDataForm}
                                submit={values => this._addRoom(values)}
                                close={() => {
                                    this.setState({
                                        mainSectionVisible: true,
                                        addSectionVisible: false
                                    });
                                }}
                            />

                            <EditRoom
                                visible={this.state.editSectionVisible}
                                devicesDataForm={this.props.devicesDataForm}
                                patientsDataForm={this.props.patientsDataForm}
                                item={this.state.currentRoom}
                                submit={values => this._editRoom(values)}
                                close={() => {
                                    this.setState({
                                        mainSectionVisible: true,
                                        editSectionVisible: false
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* dashboard */}
            </div>
        );
    }
}
export default MainContentDevices;
