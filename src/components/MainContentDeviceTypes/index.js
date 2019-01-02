import React, { Component } from "react";

import moment from "moment";

import Breadcumbs from "../Breadcumbs";

import AddSection from "../AddSection";

import Table from "../TableComponent";

import "./styles.css";

class MainContentDevices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            allCheckboxesAreChecked: false,
            addDeviceDisplayState: "none",
            name: "",
            manufacturingDate: "",
            expiryDate: "",
            brand: "",
            columns: [
                {
                    field: "name",
                    label: "Loại thiết bị"
                },
                {
                    field: "brand",
                    label: "Hãng"
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
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({
                data: nextProps.data
            });
        }
    }

    _addDeviceOnClick() {
        this.setState({
            addDeviceDisplayState: "block"
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
    _deleteOnClick() {
        let typeIds = [];

        this.state.data.map(type => {
            if (type.isChecked === true) {
                typeIds.push(type._id);
            }
            return typeIds;
        });

        this.props.deteleDeviceType(typeIds);
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
                    onClick={() => this._deleteOnClick()}
                >
                    Delete
                    {count > 1 ? " devices" : " device"}
                </button>
            );
        }
    }
    render() {
        let breadcumbs = [
            { title: "Trang chủ", path: "/" },
            {
                title: "Theo dõi bệnh nhân",
                path: "/patient-tracking",
                active: true
            }
        ];

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
                        <Breadcumbs data={breadcumbs} />

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
                                        All beds
                                    </span>

                                    <div>
                                        {this._renderDeteleButton()}

                                        <button
                                            className="btn-add rcs-btn"
                                            onClick={() =>
                                                this._addDeviceOnClick()
                                            }
                                        >
                                            Add device
                                        </button>
                                    </div>
                                </div>
                                <Table
                                    data={this.state.data}
                                    fields={this.state.columns}
                                    onChange={(index, checked) =>
                                        this._onCheckboxChange(index, checked)
                                    }
                                    checkAll={checked =>
                                        this._checkAllCheckbox(checked)
                                    }
                                    allCheckboxesAreChecked={
                                        this.state.allCheckboxesAreChecked
                                    }
                                />
                            </div>
                            <AddSection
                                display={this.state.addDeviceDisplayState}
                                closeAddDevice={() => {
                                    this.setState({
                                        addDeviceDisplayState: "none"
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
                                submit={values =>
                                    this.props.addDeviceType(values)
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
