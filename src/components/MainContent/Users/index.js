import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

import Breadcumbs from "../../Breadcumbs";

import Table from "../../TableComponent";

import AddSection from "./AddSection";

import { changeAlias } from "../../../utils";

import "./styles.css";

class MainContentUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            allCheckboxesAreChecked: false,
            columns: [
                {
                    field: "name",
                    label: "Tên"
                },
                {
                    field: "gender",
                    label: "Giới tính"
                },
                {
                    field: "major",
                    label: "Khoa"
                },
                {
                    field: "age",
                    label: "Tuổi"
                },
                {
                    field: "role",
                    label: "Vai trò"
                },
                {
                    field: "birthday",
                    label: "Ngày sinh"
                }
            ],
            detailSectionVisible: false
        };

        this.breadcumbs = [
            { title: "Trang chủ", path: "/" },
            {
                title: "Quản lý nhân sự",
                path: "/patient-tracking",
                active: true
            }
        ];
    }

    componentDidMount() {}

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

    _addDeviceOnClick() {
        this.setState({
            addDeviceDisplayState: "block"
        });
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
            values.roomId = this.state.currentRoom._id;

            this.props.edit(values);
        } else {
            this.props.addItem(values);
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
                    style={{
                        backgroundColor: "transparent",
                        border: "none"
                    }}
                    onClick={() => {
                        let userIds = (this.state.data || []).map(i => {
                            // if (i.isChecked) {
                            return i.isChecked ? i._id : null;
                            // }
                        });
                        this.props.deleteUsers(userIds);
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

    _addBtnOnClick() {
        this.setState({
            addSectionVisible: true
        });
    }
    _addSectionClose() {
        this.setState({
            addSectionVisible: false
        });
    }

    _detail(index) {
        let { user } = this.props;
        let { role } = user;

        console.log(role);
        if (
            (role && role.value === "admin") ||
            (role && role.value === "manager")
        ) {
            let currentUser = this.state.data[index];

            let name = changeAlias(currentUser.name);

            this.props.userDetail({ suffix: name, userId: currentUser._id });
        } else {
            return;
        }
    }

    render() {
        let { user } = this.props;

        let { role } = user;

        return (
            <div className="main-content">
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
                                    display: !this.state.editSectionVisible
                                        ? "block"
                                        : "none"
                                }}
                            >
                                <div className="content-header">
                                    <span className="content-header-text">
                                        Quản lý nhân sự
                                    </span>
                                    {(role && role.value === "admin") ||
                                    (role && role.value === "manager") ? (
                                        <div>
                                            {this._renderDeteleButton()}

                                            <button
                                                className="icon-button"
                                                onClick={() =>
                                                    this._addBtnOnClick()
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
                                    allowClickOnRow={true}
                                    actions={{
                                        detail: true,
                                        delete:
                                            role && role.value === "admin"
                                                ? true
                                                : false,
                                        edit:
                                            (role && role.value === "admin") ||
                                            (role && role.value === "manager")
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
                                    detail={index => this._detail(index)}
                                    edit={index => this._detail(index)}
                                    delete={id => {
                                        this.props.deleteUsers([id]);
                                    }}
                                />
                            </div>

                            <AddSection
                                display={this.state.addSectionVisible}
                                header={"Thêm nhân sự"}
                                closeAddDevice={() => this._addSectionClose()}
                                submit={values => this.props.addUser(values)}
                                majors={this.props.majors}
                                user={user}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MainContentUsers;
