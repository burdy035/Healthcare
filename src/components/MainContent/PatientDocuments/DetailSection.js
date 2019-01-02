import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { faTimes } from "@fortawesome/free-solid-svg-icons";

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitAvailabel: false
        };
    }

    componentDidMount() {}
    componentWillReceiveProps(nextProps) {}

    async _onChange(field, value) {
        this.setState({
            [field]: value
        });
    }
    _submit() {
        let values = this.state;
        delete values["submitAvailabel"];

        this.props.submit(values);
    }

    render() {
        let data = this.props.data || {};
        console.log(data);
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
                        Hồ sơ bệnh nhân
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

                <div style={{ flex: 1, overflow: "scroll", display: "flex" }}>
                    <div
                        style={{
                            padding: 20,
                            flex: 1,
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <div
                            style={{
                                flex: 0.5,
                                display: "flex"
                                // border: "1px solid"
                            }}
                        >
                            <div
                                style={{
                                    flex: 0.25,
                                    justifyContent: "space-between"
                                }}
                            >
                                <img
                                    alt={""}
                                    src="/default-avatar.png"
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </div>
                            <div
                                style={{
                                    marginLeft: 30,
                                    flex: 0.35,
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <div className="row row-cardiac-info">
                                    <div className="col-4">Tên: </div>
                                    <div className="col-8">{data.name}</div>
                                </div>
                                <div className="row row-cardiac-info">
                                    <div className="col-4">Tuổi: </div>
                                    <div className="col-8">
                                        {data.age || ""}
                                    </div>
                                </div>
                                <div className="row row-cardiac-info">
                                    <div className="col-4">
                                        Phòng hiện tại:{" "}
                                    </div>
                                    <div className="col-8">{`${(data.room &&
                                        data.room["label"]) ||
                                        ""}`}</div>
                                </div>
                                <div className="row row-cardiac-info">
                                    <div className="col-4">Trạng thái: </div>
                                    <div className="col-8">
                                        {(data.state && data.state["label"]) ||
                                            ""}
                                    </div>
                                </div>
                                <div className="row row-cardiac-info">
                                    <div className="col-4">
                                        Bác sỹ theo dõi:{" "}
                                    </div>
                                    <div className="col-8">
                                        {(data.doctor && data.doctor["name"]) ||
                                            ""}
                                    </div>
                                </div>
                                <div className="row row-cardiac-info">
                                    <div className="col-4">Y tá theo dõi: </div>
                                    <div className="col-8">
                                        {(data.nurse && data.nurse["name"]) ||
                                            ""}
                                    </div>
                                </div>
                            </div>
                            <div style={{ flex: 0.35 }}>
                                <div className="row row-cardiac-info">
                                    <div className="col-6">Khoa</div>
                                    <div className="col-6">
                                        {data && data.major
                                            ? data.major.label
                                            : null}
                                    </div>
                                </div>
                                <div className="row row-cardiac-info">
                                    <div className="col-6">
                                        Đã mắc bệnh tim chưa:{" "}
                                    </div>
                                    <div className="col-6">
                                        {data && data.isHeartDisease === 1
                                            ? "Đã bị"
                                            : "Chưa"}
                                    </div>
                                </div>

                                <div className="row row-cardiac-info">
                                    <div className="col-6">
                                        Tỷ lệ mắc bệnh tim:{" "}
                                    </div>
                                    <div className="col-6">
                                        {this.props.heartDiseaseRate}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                flex: 0.5,
                                display: "flex",
                                flexDirection: "column"
                                // border: "1px solid"
                            }}
                        >
                            <div style={{ marginTop: 10 }}>
                                Các chỉ số
                                <div
                                    style={{
                                        marginTop: 10,
                                        width: 30,
                                        borderBottom: "3px solid"
                                    }}
                                />
                            </div>
                            <div style={{}}>
                                <div className="row row-cardiac-info-1">
                                    <FormGroup
                                        style={{ marginTop: 10, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Loại đau ngực
                                        </ControlLabel>
                                        <FormControl
                                            type={"select"}
                                            componentClass="select"
                                            disabled
                                            readOnly
                                            value={data.cp}
                                            bsClass={`form-control custom-form-control`}
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
                                        style={{ marginTop: 10, flex: 0.3 }}
                                    >
                                        <ControlLabel>Huyết áp</ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            disabled
                                            readOnly
                                            value={data.trestbps || ""}
                                            bsClass={`form-control custom-form-control`}
                                        />
                                    </FormGroup>
                                    <FormGroup
                                        style={{ marginTop: 10, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Mỡ máu (mg/dl)
                                        </ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            disabled
                                            readOnly
                                            value={data.chol || ""}
                                            bsClass={`form-control custom-form-control`}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="row row-cardiac-info-1">
                                    <FormGroup
                                        style={{ marginTop: 10, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Điện tâm đồ (ECG)
                                        </ControlLabel>
                                        <FormControl
                                            type={"select"}
                                            disabled
                                            readOnly
                                            componentClass="select"
                                            value={data.restecg}
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
                                        style={{ marginTop: 10, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Nhịp tim cao nhất
                                        </ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            disabled
                                            readOnly
                                            value={data.thalach || ""}
                                            bsClass={`form-control custom-form-control`}
                                        />
                                    </FormGroup>

                                    <FormGroup
                                        style={{ marginTop: 10, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Vận động có gây đau thắt ngực không
                                        </ControlLabel>
                                        <FormControl
                                            type={"select"}
                                            disabled
                                            readOnly
                                            componentClass="select"
                                            value={data.exang}
                                            bsClass={`form-control custom-form-control`}
                                        >
                                            <option value={""} />

                                            <option value={0}>Không</option>
                                            <option value={1}>Có</option>
                                        </FormControl>
                                    </FormGroup>
                                </div>
                                <div className="row row-cardiac-info-1">
                                    <FormGroup
                                        style={{ marginTop: 10, flex: 0.3 }}
                                    >
                                        <ControlLabel>Oldpeak</ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            disabled
                                            readOnly
                                            value={data.oldpeak || ""}
                                            bsClass={`form-control custom-form-control`}
                                        />
                                    </FormGroup>

                                    <FormGroup
                                        style={{ marginTop: 10, flex: 0.3 }}
                                    >
                                        <ControlLabel>
                                            Lượng đường trong máu > 120 mg/dl
                                        </ControlLabel>
                                        <FormControl
                                            type={"select"}
                                            componentClass="select"
                                            disabled
                                            readOnly
                                            value={data.fbs}
                                            bsClass={`form-control custom-form-control`}
                                        >
                                            <option value={""} />
                                            <option value={0}>Không</option>
                                            <option value={1}>Có</option>
                                        </FormControl>
                                    </FormGroup>
                                    <div style={{ flex: 0.3 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Detail;
