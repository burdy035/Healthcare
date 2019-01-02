import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

import Breadcumbs from "../../Breadcumbs";

import Table from "./Table";

import AddSection from "../../AddSection";

import EditSection from "./EditSection";

import "./styles.css";

class MainContentDevices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            allCheckboxesAreChecked: false,
            addSectionVisible: false,
            currentItem: {},
            columns: [
                {
                    field: "category",
                    label: "Loại thiết bị",
                    type: "select"
                },
                {
                    field: "label",
                    label: "Nhãn"
                },
                {
                    field: "state",
                    label: "Tình trạng",
                    type: "select"
                },
                {
                    field: "port",
                    label: "Port"
                },
                {
                    field: "manufacturingDate",
                    label: "Ngày sản xuất",
                    type: "date"
                },
                {
                    field: "expiryDate",
                    label: "Ngày hết hạn",
                    type: "date"
                }
            ]
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

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                data: nextProps.data
            });
        }
        if (nextProps.editDeviceSuccess) {
            this.setState({
                editSectionVisible: false
            });
        }
        if (nextProps.addDeviceSuccess) {
            this.setState({
                addSectionVisible: false
            });
        }
    }

    _addDeviceOnClick() {
        this.setState({
            addSectionVisible: true
        });
    }
    _checkAllCheckbox(checked) {
        let temp = this.state.data;

        temp.map((ele, index) => {
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

    _addDevice(values) {
        this.props.addDevice(values);
    }

    _deleteDevices(ids) {
        this.props.deleteDevices(ids);
    }
    _edit(index) {
        this.setState({
            editSectionVisible: true,
            addSectionVisible: false,
            currentItem: this.state.data[index]
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
                    style={{
                        backgroundColor: "transparent",
                        border: "none"
                    }}
                    onClick={() => {
                        let devicesIds = (this.state.data || []).map(i => {
                            return i.isChecked ? i._id : null;
                        });
                        this.props.deleteDevices(devicesIds);
                    }}
                >
                    <FontAwesomeIcon
                        style={{
                            color: "red"
                        }}
                        icon={faTrashAlt}
                    />
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
                        <Breadcumbs data={this.breadcumbs} />

                        <div
                            className="inner-main-content"
                            style={{
                                flexDirection: "row"
                            }}
                        >
                            <div className="content-area">
                                <div className="content-header">
                                    <span
                                        style={{
                                            fontSize: 17,
                                            fontWeight: "800"
                                        }}
                                    >
                                        Quản lý thiết bị
                                    </span>

                                    {role === "admin" ? (
                                        <div>
                                            {this._renderDeteleButton()}

                                            <button
                                                className="icon-button"
                                                onClick={() =>
                                                    this._addDeviceOnClick()
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
                                        delete: role === "admin" ? true : false,
                                        edit: role === "admin" ? true : false
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
                                    delete={id => this._deleteDevices([id])}
                                    edit={index => this._edit(index)}
                                    detail={() => {}}
                                />
                            </div>
                            <AddSection
                                header="Thêm thiết bị"
                                addSuccess={this.props.addDeviceSuccess}
                                display={this.state.addSectionVisible}
                                closeAddDevice={() => {
                                    this.setState({
                                        addSectionVisible: false
                                    });
                                }}
                                fields={this.state.columns.map(col => {
                                    return {
                                        ...col,
                                        value: this.state[col.field]
                                            ? this.state[col.field]
                                            : "",
                                        options: this.props.addDeviceDataForm[
                                            col.field
                                        ]
                                            ? this.props.addDeviceDataForm[
                                                  col.field
                                              ]
                                            : null
                                    };
                                })}
                                onChange={(field, e) =>
                                    this._handleChange(field, e)
                                }
                                submit={values => this._addDevice(values)}
                            />

                            <EditSection
                                display={this.state.editSectionVisible}
                                closeAddDevice={() => {
                                    this.setState({
                                        editSectionVisible: false
                                    });
                                }}
                                item={this.state.currentItem}
                                categories={
                                    this.props.addDeviceDataForm["category"]
                                }
                                states={this.props.addDeviceDataForm["state"]}
                                fields={this.state.columns}
                                onChange={(field, e) =>
                                    this._handleChange(field, e)
                                }
                                submit={values => this._addDevice(values)}
                                editDevice={values =>
                                    this.props.editDevice(values)
                                }
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
