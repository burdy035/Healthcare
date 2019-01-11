import React, { Component } from "react";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { CircularProgress } from "@material-ui/core";

class InfoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitAvailabel: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userDetail) {
            let { userDetail } = nextProps;

            Object.keys(userDetail).map(k => {
                if (userDetail[k]._id && userDetail[k].value) {
                    this.setState({
                        [k]: userDetail[k].value
                    });
                } else {
                    this.setState({
                        [k]: userDetail[k]
                    });
                }
            });
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

    async _onChange(field, value) {
        this.setState({
            [field]: value
        });

        if (
            !this.state.name ||
            !this.state.username ||
            !this.state.role ||
            !this.state.gender ||
            !this.state.birthday
        ) {
            this.setState({
                submitAvailabel: false
            });
        } else {
            this.setState({
                submitAvailabel: true
            });
        }
    }

    _renderEditButton() {
        const { userDetail } = this.props;
        const { user } = this.props;
        const { role } = user;

        if (userDetail.role && userDetail.role.value === "manager") {
            if (role && role.value === "admin") {
                return (
                    <div style={{ marginLeft: 15, marginBottom: 20 }}>
                        <button
                            style={{ marginTop: 5 }}
                            className={`submit-btn ${
                                !this.state.submitAvailabel
                                    ? "submit-btn-pos"
                                    : ""
                            }`}
                            onClick={() => this._submit()}
                        >
                            {!this.state.submitAvailabel ? (
                                <CircularProgress
                                    style={{
                                        marginRight: 10
                                    }}
                                    size={16}
                                />
                            ) : null}
                            Sửa thông tin
                        </button>
                    </div>
                );
            } else {
                return null;
            }
        } else if (
            (role && role.value === "admin") ||
            (role && role.value === "manager")
        ) {
            return (
                <div style={{ marginLeft: 15, marginBottom: 20 }}>
                    <button
                        style={{ marginTop: 5 }}
                        className={`submit-btn ${
                            !this.state.submitAvailabel ? "submit-btn-pos" : ""
                        }`}
                        onClick={() => this._submit()}
                    >
                        {!this.state.submitAvailabel ? (
                            <CircularProgress
                                style={{
                                    marginRight: 10
                                }}
                                size={16}
                            />
                        ) : null}
                        Sửa thông tin
                    </button>
                </div>
            );
        } else {
            return null;
        }
    }
    _submit() {
        const { name, gender, birthday, username, role } = this.state;

        if (!name || !gender || !birthday || !username || !role) {
        } else {
            this.props.changeDetail({
                name,
                gender,
                birthday,
                username,
                role,
                userId: this.props.userDetail._id
            });
        }
    }
    render() {
        const { userDetail } = this.props;
        const { user } = this.props;
        const { role } = user;

        return (
            <div className="user-detail-detail">
                <div className="content-header">
                    <span className="content-header-text">
                        Thông tin cá nhân
                    </span>
                </div>
                <div className="user-detail-detail-container">
                    <div className="user-detail-detail-main-left">
                        <FormGroup className="custom-form-group">
                            <ControlLabel>Tên</ControlLabel>
                            <FormControl
                                type={"text"}
                                value={this.state.name || ""}
                                bsClass={`form-control custom-form-control`}
                                onChange={e =>
                                    this._onChange("name", e.target.value)
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Giới tính</ControlLabel>
                            <FormControl
                                type={"text"}
                                componentClass="select"
                                value={this.state.gender || ""}
                                bsClass={`form-control custom-form-control`}
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
                        <FormGroup className="custom-form-group">
                            <ControlLabel>Ngày sinh</ControlLabel>
                            <FormControl
                                type={"text"}
                                value={userDetail.birthday || ""}
                                bsClass={`form-control custom-form-control`}
                                onChange={e =>
                                    this._onChange(
                                        "oldPassword",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        {this._renderMajor()}
                    </div>
                    <div className="user-detail-detail-main-right">
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
                                {role && role.value === "admin" ? (
                                    <option value="admin">Quản trị</option>
                                ) : null}
                                <option value="manager">Trưởng phòng</option>
                                <option value="doctor">Bác sỹ</option>
                                <option value="nurse">Y tá</option>
                            </FormControl>
                        </FormGroup>
                    </div>
                </div>
                {this._renderEditButton()}
            </div>
        );
    }
}

export default InfoDetail;
