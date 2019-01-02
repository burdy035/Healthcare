import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { CircularProgress } from "@material-ui/core";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import moment from "moment";

import DatePicker from "react-datepicker";

import "./styles.css";

moment.suppressDeprecationWarnings = true;

class AddDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitBtnAvailable: false,
            fields: [
                "name",
                "username",
                "gender",
                "role",
                "major",
                "birthday",
                "password",
                "cpassword"
            ]
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.fields) {
            let { fields } = nextProps;

            fields.map(field => {
                return this.setState({
                    [`${field}Error`]: ""
                });
            });
        }
    }
    async _onChange(field, value, type) {
        let isValid = this._inputValidation(value, type);
        if (field === "birthday") {
            await this.setState({
                [field]: !isValid ? "" : value,
                [`${field}HasError`]: !isValid ? true : false
            });
        } else if (field === "password" || field === "cpassword") {
            if (isValid && value.length >= 6) {
                await this.setState({
                    [field]: value,
                    [`${field}HasError`]: false
                });
            } else {
                await this.setState({
                    [field]: !isValid ? "" : value,
                    [`${field}HasError`]: true
                });
            }
        } else {
            await this.setState({
                [field]: value,
                [`${field}HasError`]: !isValid
            });
        }

        let count = 0;

        this.state.fields.map(f => {
            if (this.state[`${f}HasError`]) {
                count++;
            }
            if (this.state[`${f}HasError`] === undefined) {
                count++;
            }
            return count;
        });

        if (count === 0) {
            this.setState({
                submitBtnAvailable: true
            });
        } else {
            this.setState({
                submitBtnAvailable: false
            });
        }
    }

    _inputValidation(value, type) {
        if (type === "date") {
            let valid = moment(value, "DD/MM/YYYY", true).isValid();

            return valid;
        } else {
            return !!value;
        }
    }

    _submitOnClick() {
        let values = this.state.fields.reduce((result, field) => {
            if (field === "birthday") {
                let d = moment(this.state[field]);

                result[field] = d.format();
            } else {
                result[field] = this.state[field];
            }

            return result;
        }, {});
        if (this.state.submitBtnAvailable) {
            this.props.submit(values);
        }
    }
    _renderMajor() {
        const { user, majors } = this.props;
        const { role, major } = user;

        if (role && role.value === "admin") {
            return (
                <FormGroup>
                    <ControlLabel>Khoa</ControlLabel>
                    <FormControl
                        type={"text"}
                        componentClass="select"
                        value={this.state.major || ""}
                        bsClass={`form-control custom-form-control ${
                            this.state[`genderHasError`] ? "has-error" : ""
                        }`}
                        onChange={e =>
                            this._onChange("major", e.target.value, "text")
                        }
                    >
                        <option value="" />
                        {majors.map((m, i) => {
                            return (
                                <option key={i} value={m._id}>
                                    {m.label}
                                </option>
                            );
                        })}
                    </FormControl>
                </FormGroup>
            );
        } else if (role && role.value === "manager") {
            if (major && majors.length > 0) {
                let majorAvailabel;

                majors.map((m, i) => {
                    if (m._id === major._id) {
                        majorAvailabel = m;
                    }
                    return;
                });

                return (
                    <FormGroup>
                        <ControlLabel>Khoa</ControlLabel>
                        <FormControl
                            type={"text"}
                            componentClass="select"
                            value={this.state.major || ""}
                            bsClass={`form-control custom-form-control ${
                                this.state[`genderHasError`] ? "has-error" : ""
                            }`}
                            onChange={e =>
                                this._onChange("major", e.target.value, "text")
                            }
                        >
                            <option value="" />
                            <option value={majorAvailabel._id}>
                                {majorAvailabel.label}
                            </option>
                        </FormControl>
                    </FormGroup>
                );
            } else {
                return (
                    <FormGroup>
                        <ControlLabel>Khoa</ControlLabel>
                        <FormControl
                            type={"text"}
                            componentClass="select"
                            value={this.state.major || ""}
                            bsClass={`form-control custom-form-control ${
                                this.state[`genderHasError`] ? "has-error" : ""
                            }`}
                            onChange={e =>
                                this._onChange("major", e.target.value, "text")
                            }
                        >
                            <option value="" />
                        </FormControl>
                    </FormGroup>
                );
            }
        }
    }
    render() {
        const { user } = this.props;
        const { role } = user;
        return (
            <div
                style={{
                    display: this.props.display ? "flex" : "none",
                    flex: 0.4,
                    backgroundColor: "#fff",
                    marginLeft: 20,
                    marginTop: 20,
                    marginBottom: 20,
                    flexDirection: "column"
                }}
            >
                <div className="content-header">
                    <span
                        style={{
                            fontSize: 14,
                            fontWeight: "800"
                        }}
                    >
                        Thêm nhân sự
                    </span>

                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none"
                        }}
                        onClick={this.props.closeAddDevice}
                    >
                        <FontAwesomeIcon
                            style={{
                                color: "red"
                            }}
                            icon={faTimes}
                        />
                    </button>
                </div>

                <div style={{ flex: 1, display: "flex" }}>
                    <div
                        style={{
                            padding: "10px 20px",
                            flex: 1,
                            overflow: "auto"
                        }}
                    >
                        <form style={{ flex: 1 }}>
                            <FormGroup>
                                <ControlLabel>Tên</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    value={this.state.name || ""}
                                    bsClass={`form-control custom-form-control ${
                                        this.state[`nameHasError`]
                                            ? "has-error"
                                            : ""
                                    }`}
                                    onChange={e =>
                                        this._onChange(
                                            "name",
                                            e.target.value,
                                            "text"
                                        )
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Tài khoản</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    value={this.state.username || ""}
                                    bsClass={`form-control custom-form-control ${
                                        this.state[`usernameHasError`]
                                            ? "has-error"
                                            : ""
                                    }`}
                                    onChange={e =>
                                        this._onChange(
                                            "username",
                                            e.target.value,
                                            "text"
                                        )
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Giới tính</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    componentClass="select"
                                    value={this.state.gender || ""}
                                    bsClass={`form-control custom-form-control ${
                                        this.state[`genderHasError`]
                                            ? "has-error"
                                            : ""
                                    }`}
                                    onChange={e =>
                                        this._onChange(
                                            "gender",
                                            e.target.value,
                                            "text"
                                        )
                                    }
                                >
                                    <option value="" />
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Chức vụ</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    componentClass="select"
                                    value={this.state.role || ""}
                                    bsClass={`form-control custom-form-control ${
                                        this.state[`roleHasError`]
                                            ? "has-error"
                                            : ""
                                    }`}
                                    onChange={e =>
                                        this._onChange(
                                            "role",
                                            e.target.value,
                                            "text"
                                        )
                                    }
                                >
                                    <option value="" />
                                    {role === "admin" ? (
                                        <option value="admin">Quản trị</option>
                                    ) : null}
                                    {role === "admin" ? (
                                        <option value="manager">
                                            Trưởng phòng
                                        </option>
                                    ) : null}
                                    <option value="doctor">Bác sỹ</option>
                                    <option value="nurse">Y tá</option>
                                </FormControl>
                            </FormGroup>

                            {this._renderMajor()}

                            <FormGroup>
                                <ControlLabel>Ngày sinh</ControlLabel>
                                <DatePicker
                                    className={`form-control custom-form-control ${
                                        this.state[`birthdayHasError`]
                                            ? "has-error"
                                            : ""
                                    }`}
                                    dateFormat="YYYY/MM/DD"
                                    selected={this.state.birthday}
                                    onChange={date =>
                                        this._onChange("birthday", date, "date")
                                    }
                                    onChangeRaw={e =>
                                        this._onChange(
                                            "birthday",
                                            e.target.value,
                                            "date"
                                        )
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Mật khẩu</ControlLabel>
                                <FormControl
                                    type={"password"}
                                    value={this.state.password || ""}
                                    bsClass={`form-control custom-form-control ${
                                        this.state[`passwordHasError`]
                                            ? "has-error"
                                            : ""
                                    }`}
                                    onChange={e =>
                                        this._onChange(
                                            "password",
                                            e.target.value,
                                            "text"
                                        )
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Xác nhận mật khẩu</ControlLabel>
                                <FormControl
                                    type={"password"}
                                    value={this.state.cpassword || ""}
                                    bsClass={`form-control custom-form-control ${
                                        this.state[`cpasswordHasError`]
                                            ? "has-error"
                                            : ""
                                    }`}
                                    onChange={e =>
                                        this._onChange(
                                            "cpassword",
                                            e.target.value,
                                            "text"
                                        )
                                    }
                                />
                            </FormGroup>
                        </form>

                        <button
                            className={`submit-btn ${
                                !this.state.submitBtnAvailable
                                    ? "submit-btn-pos"
                                    : ""
                            }`}
                            onClick={() => this._submitOnClick()}
                        >
                            {!this.state.submitBtnAvailable ? (
                                <CircularProgress
                                    style={{
                                        marginRight: 10
                                    }}
                                    size={16}
                                />
                            ) : null}
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddDevice;
