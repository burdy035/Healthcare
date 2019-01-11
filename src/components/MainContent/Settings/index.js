import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

import Breadcumbs from "../../Breadcumbs";

import Table from "../../TableComponent";

import AddSection from "../../AddSection";

import "./styles.css";

class MainContentDevices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            allCheckboxesAreChecked: false,
            addDeviceDisplayState: false,
            addMajorVisible: false,
            columns: [
                {
                    field: "label",
                    label: "Nhãn"
                }
            ],
            deviceStateDataColumns: [
                {
                    field: "label",
                    label: "Nhãn"
                }
            ],
            patientStateDataColumns: [
                {
                    field: "label",
                    label: "Nhãn"
                }
            ],
            majorDataColumns: [
                {
                    field: "label",
                    label: "Tên khoa"
                }
            ]
        };

        this.breadcumbs = [
            { title: "Trang chủ", path: "/" },
            {
                title: "Cài đặt",
                path: "/patient-tracking",
                active: true
            }
        ];
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {
        if (nextProps.deviceStateData) {
            this.setState({
                deviceStateData: nextProps.deviceStateData
            });
        }
        if (nextProps.patientStateData) {
            this.setState({
                patientStateData: nextProps.patientStateData
            });
        }
        if (nextProps.userRolesData) {
            this.setState({
                userRolesData: nextProps.userRolesData
            });
        }

        if (nextProps.majors) {
            this.setState({
                majors: nextProps.majors
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

    _addItem(values) {
        values.type = this.state.settingType;

        this.props.addItem(values);
    }

    async _addBtnOnClick(type) {
        if (type === "major") {
            this.setState({
                settingType: type,
                addMajorVisible: true
            });
        } else {
            await this.setState({
                settingType: type,
                addSectionDisplayState: true
            });
        }
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
    _renderHeader() {
        if (this.state.settingType === "patientState") {
            return "Thêm tình trạng bệnh nhân";
        } else if (this.state.settingType === "deviceState") {
            return "Thêm tình trạng thiết bị";
        } else if (this.state.settingType === "userRoles") {
            return "Thêm role";
        } else if (this.state.settingType === "major") {
            return "Thêm khoa";
        }
        return "";
    }

    render() {
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
                                className="content-area1"
                                style={{
                                    flex: 0.5,
                                    marginTop: 20,
                                    marginBottom: 20,
                                    marginRight: 20,
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <div
                                    style={{
                                        flex: 0.5,
                                        backgroundColor: "#fff",
                                        marginBottom: 10
                                    }}
                                >
                                    <div className="content-header">
                                        <span
                                            style={{
                                                fontSize: 17,
                                                fontWeight: "800"
                                            }}
                                        >
                                            Tình trạng thiết bị
                                        </span>

                                        <div>
                                            {this._renderDeteleButton()}

                                            <button
                                                className="rcs-btn"
                                                onClick={() =>
                                                    this._addBtnOnClick(
                                                        "deviceState"
                                                    )
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
                                    </div>

                                    <Table
                                        data={this.state.deviceStateData}
                                        fields={this.state.columns}
                                        actions={{ delete: true }}
                                        onChange={(index, checked) =>
                                            this._onCheckboxChange(
                                                index,
                                                checked
                                            )
                                        }
                                        checkAll={checked =>
                                            this._checkAllCheckbox(checked)
                                        }
                                        allCheckboxesAreChecked={
                                            this.state.allCheckboxesAreChecked
                                        }
                                        allowCheck={false}
                                    />
                                </div>
                                <div
                                    style={{
                                        flex: 0.5,
                                        marginTop: 10,
                                        backgroundColor: "#fff"
                                    }}
                                >
                                    <div className="content-header">
                                        <span className="content-header-text">
                                            Chức vụ
                                        </span>
                                    </div>

                                    <Table
                                        data={this.state.userRolesData}
                                        fields={this.state.columns}
                                        allowCheck={false}
                                        onChange={(index, checked) =>
                                            this._onCheckboxChange(
                                                index,
                                                checked
                                            )
                                        }
                                        checkAll={checked =>
                                            this._checkAllCheckbox(checked)
                                        }
                                        allCheckboxesAreChecked={
                                            this.state.allCheckboxesAreChecked
                                        }
                                        allowCheck={false}
                                    />
                                </div>
                            </div>

                            <div
                                className="content-area1"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    flex: 0.5,
                                    marginTop: 20,
                                    marginBottom: 20
                                }}
                            >
                                <div
                                    style={{
                                        flex: 0.5,
                                        marginBottom: 10,
                                        backgroundColor: "#fff"
                                    }}
                                >
                                    <div className="content-header">
                                        <span
                                            style={{
                                                fontSize: 17,
                                                fontWeight: "800"
                                            }}
                                        >
                                            Tình trạng bệnh nhân
                                        </span>

                                        <div>
                                            {this._renderDeteleButton()}

                                            <button
                                                className="rcs-btn"
                                                onClick={() =>
                                                    this._addBtnOnClick(
                                                        "patientState"
                                                    )
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
                                    </div>

                                    <Table
                                        data={this.state.patientStateData}
                                        fields={this.state.columns}
                                        actions={{ delete: true }}
                                        onChange={(index, checked) =>
                                            this._onCheckboxChange(
                                                index,
                                                checked
                                            )
                                        }
                                        checkAll={checked =>
                                            this._checkAllCheckbox(checked)
                                        }
                                        allCheckboxesAreChecked={
                                            this.state.allCheckboxesAreChecked
                                        }
                                    />
                                </div>
                                <div
                                    style={{
                                        flex: 0.5,
                                        marginTop: 10,
                                        backgroundColor: "#fff"
                                    }}
                                >
                                    <div className="content-header">
                                        <span
                                            style={{
                                                fontSize: 17,
                                                fontWeight: "800"
                                            }}
                                        >
                                            Khoa
                                        </span>

                                        <div>
                                            {this._renderDeteleButton()}

                                            <button
                                                className="rcs-btn"
                                                onClick={() =>
                                                    this._addBtnOnClick("major")
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
                                    </div>

                                    <Table
                                        data={this.state.majors}
                                        fields={this.state.columns}
                                        actions={{ delete: true }}
                                        onChange={(index, checked) =>
                                            this._onCheckboxChange(
                                                index,
                                                checked
                                            )
                                        }
                                        checkAll={checked =>
                                            this._checkAllCheckbox(checked)
                                        }
                                        allCheckboxesAreChecked={
                                            this.state.allCheckboxesAreChecked
                                        }
                                        allowCheck={false}
                                        delete={values =>
                                            this.props.delete(values)
                                        }
                                    />
                                </div>
                            </div>

                            <AddSection
                                display={this.state.addSectionDisplayState}
                                header={this._renderHeader()}
                                closeAddDevice={() => {
                                    this.setState({
                                        addSectionDisplayState: false
                                    });
                                }}
                                fields={this.state.columns.map(col => {
                                    return {
                                        ...col,
                                        value: this.state[col.field]
                                            ? this.state[col.field]
                                            : ""
                                    };
                                })}
                                onChange={(field, e) =>
                                    this._handleChange(field, e)
                                }
                                submit={values => this._addItem(values)}
                            />
                            <AddSection
                                display={this.state.addMajorVisible}
                                header={this._renderHeader()}
                                closeAddDevice={() => {
                                    this.setState({
                                        addMajorVisible: false
                                    });
                                }}
                                fields={this.state.majorDataColumns}
                                onChange={(field, e) =>
                                    this._handleChange(field, e)
                                }
                                submit={values => this._addItem(values)}
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
