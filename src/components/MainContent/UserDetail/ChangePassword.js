import React, { Component } from "react";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { CircularProgress } from "@material-ui/core";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitAvailabel: false
        };
    }
    async _onChange(field, value) {
        await this.setState({
            [field]: value
        });

        if (
            this.state.password &&
            this.state.cpassword &&
            this.state.oldPassword
        ) {
            this.setState({
                submitAvailabel: true
            });
        }
    }
    _submit() {
        if (
            this.state.password &&
            this.state.cpassword &&
            this.state.oldPassword
        ) {
            this.props.changePassword({
                password: this.state.password,
                cpassword: this.state.password,
                oldPassword: this.state.oldPassword
            });
        }
    }

    render() {
        return (
            <div className="change-password-block">
                <div className="content-header">
                    <span className="content-header-text">Đổi mật khẩu</span>
                </div>
                <div className="change-password-form-container">
                    <div>
                        <div className="change-password-form-left">
                            <FormGroup>
                                <ControlLabel>Mật khẩu mới</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    value={this.state.password || ""}
                                    bsClass={`form-control custom-form-control`}
                                    onChange={e =>
                                        this._onChange(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Mật khẩu cũ</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    value={this.state.oldPassword || ""}
                                    bsClass={`form-control custom-form-control`}
                                    onChange={e =>
                                        this._onChange(
                                            "oldPassword",
                                            e.target.value
                                        )
                                    }
                                />
                            </FormGroup>
                        </div>
                        <div className="change-password-form-right">
                            <FormGroup>
                                <ControlLabel>Xác nhận mật khẩu</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    value={this.state.cpassword || ""}
                                    bsClass={`form-control custom-form-control`}
                                    onChange={e =>
                                        this._onChange(
                                            "cpassword",
                                            e.target.value
                                        )
                                    }
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <button
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
                        Đổi mật khẩu
                    </button>
                </div>
            </div>
        );
    }
}

export default ChangePassword;
