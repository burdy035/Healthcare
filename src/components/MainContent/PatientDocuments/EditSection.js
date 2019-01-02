import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { CircularProgress } from "@material-ui/core";

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitBtnAvailable: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            Object.keys(nextProps.data).map(k => {
                if (typeof nextProps.data[k] === "object") {
                    return this.setState({
                        [k]: nextProps.data[k]["_id"]
                    });
                }

                return this.setState({
                    [k]: nextProps.data[k]
                });
            });
        }
    }

    async _onChange(field, value) {
        await this.setState({
            [field]: value
        });

        let count = 0;

        Object.keys(this.props.data).map(k => {
            if (
                this.state[k] === undefined ||
                this.state[k] === "" ||
                this.state[k] === null
            ) {
                return count++;
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
    _submit() {
        let values = this.state;
        delete values["submitBtnAvailable"];

        this.props.submit(values);
    }

    render() {
        return (
            <div
                className="content-area"
                style={{
                    display: this.props.visible ? "flex" : "none",
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
                        Chỉnh sửa hồ sơ bệnh nhân
                    </span>

                    <div>
                        <button
                            style={{
                                backgroundColor: "transparent",
                                border: "none"
                            }}
                            onClick={() => this.props.close()}
                        >
                            <FontAwesomeIcon
                                style={{
                                    color: "red"
                                }}
                                icon={faTimes}
                            />
                        </button>
                    </div>
                </div>

                <div style={{ flex: 1, overflow: "scroll" }}>
                    <div style={{ padding: 20 }}>
                        <form style={{}}>
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>Tên</ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            value={this.state.name || ""}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>Tuổi</ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            value={this.state.age || ""}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "age",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>Trạng thái</ControlLabel>
                                        <FormControl
                                            type={"select"}
                                            componentClass="select"
                                            value={this.state.state || ""}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "state",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value={""} />
                                            {(
                                                this.props.patientStates || []
                                            ).map(s => {
                                                return (
                                                    <option
                                                        key={s._id}
                                                        value={s._id}
                                                    >
                                                        {s.label}
                                                    </option>
                                                );
                                            })}
                                        </FormControl>
                                    </FormGroup>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    {" "}
                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>Khoa</ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            componentClass="select"
                                            value={this.state.major || ""}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "major",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="" />
                                            {this.props.majors.map((m, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={m._id}
                                                    >
                                                        {m.label}
                                                    </option>
                                                );
                                            })}
                                        </FormControl>
                                    </FormGroup>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>Giới tính</ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            componentClass="select"
                                            value={this.state.gender || ""}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "gender",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="" />
                                            <option value="0">Nam</option>
                                            <option value="1">Nữ</option>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Bác sĩ theo dõi
                                        </ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            componentClass="select"
                                            value={this.state.doctor || ""}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "doctor",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="" />
                                            {this.props.doctors.map(
                                                (d, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={d._id}
                                                        >
                                                            {d.name}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>Y tá</ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            componentClass="select"
                                            value={this.state.nurse || ""}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "nurse",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="" />
                                            {this.props.nurses.map(
                                                (n, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={n._id}
                                                        >
                                                            {n.name}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            </div>
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Loại đau ngực
                                        </ControlLabel>
                                        <FormControl
                                            type={"select"}
                                            componentClass="select"
                                            value={this.state.cp}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "cp",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value={""} />
                                            <option value={1}>
                                                Đau thắt ngực thông thường
                                            </option>
                                            <option value={2}>
                                                Đau thắt ngực không bình thường
                                            </option>
                                            <option value={3}>Đau ngực</option>
                                            <option value={4}>
                                                Không có triệu chứng
                                            </option>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>Huyết áp</ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            value={this.state.trestbps || ""}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "trestbps",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormGroup>
                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Mỡ máu (mg/dl)
                                        </ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            value={this.state.chol || ""}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "chol",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormGroup>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Điện tâm đồ (ECG)
                                        </ControlLabel>
                                        <FormControl
                                            type={"select"}
                                            componentClass="select"
                                            value={this.state.restecg}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "restecg",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value={""} />
                                            <option value={0}>
                                                Bình thường
                                            </option>
                                            <option value={1}>
                                                Sóng ST-T không bình thường
                                            </option>
                                            <option value={2}>
                                                Phì đại thất trái
                                            </option>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Nhịp tim cao nhất
                                        </ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            value={this.state.thalach || ""}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "thalach",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormGroup>

                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Vận động có gây đau thắt ngực không
                                        </ControlLabel>
                                        <FormControl
                                            type={"select"}
                                            componentClass="select"
                                            value={this.state.exang}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "exang",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value={""} />

                                            <option value={0}>Không</option>
                                            <option value={1}>Có</option>
                                        </FormControl>
                                    </FormGroup>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>Oldpeak</ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            value={this.state.oldpeak || ""}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "oldpeak",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </FormGroup>

                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Lượng đường trong máu > 120 mg/dl
                                        </ControlLabel>
                                        <FormControl
                                            type={"select"}
                                            componentClass="select"
                                            value={this.state.fbs}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "fbs",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value={""} />
                                            <option value={0}>Không</option>
                                            <option value={1}>Có</option>
                                        </FormControl>
                                    </FormGroup>

                                    <FormGroup
                                        style={{ marginTop: 20, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Đã từng bị bệnh tim hay chưa
                                        </ControlLabel>
                                        <FormControl
                                            type={"select"}
                                            componentClass="select"
                                            value={this.state.isHearDisease}
                                            bsClass={`form-control custom-form-control`}
                                            onChange={e =>
                                                this._onChange(
                                                    "isHearDisease",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value={""} />
                                            <option value={0}>Không</option>
                                            <option value={1}>Có</option>
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            </div>
                        </form>

                        <button
                            className={`submit-btn ${
                                !this.state.submitBtnAvailable
                                    ? "submit-btn-pos"
                                    : ""
                            }`}
                            style={{
                                marginTop: 30
                            }}
                            onClick={() => this._submit()}
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
export default Edit;
