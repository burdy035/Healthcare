import React, { Component } from "react";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class InfoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { userDetail } = this.props;
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
                                value={userDetail.name || ""}
                                bsClass={`form-control custom-form-control`}
                                onChange={e =>
                                    this._onChange(
                                        "oldPassword",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup className="custom-form-group">
                            <ControlLabel>Giới tính</ControlLabel>
                            <FormControl
                                type={"text"}
                                value={userDetail.gender || ""}
                                bsClass={`form-control custom-form-control`}
                                onChange={e =>
                                    this._onChange(
                                        "oldPassword",
                                        e.target.value
                                    )
                                }
                            />
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
                    </div>
                    <div className="user-detail-detail-main-right">
                        <FormGroup className="custom-form-group">
                            <ControlLabel>Chức vụ</ControlLabel>
                            <FormControl
                                type={"text"}
                                value={userDetail.role || ""}
                                bsClass={`form-control custom-form-control`}
                                onChange={e =>
                                    this._onChange(
                                        "oldPassword",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup className="custom-form-group">
                            <ControlLabel>Tuổi</ControlLabel>
                            <FormControl
                                type={"text"}
                                value={userDetail.age || ""}
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
                </div>
            </div>
        );
    }
}

export default InfoDetail;
