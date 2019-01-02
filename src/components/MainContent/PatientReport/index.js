import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Line } from "react-chartjs-2";

import Breadcumbs from "../../Breadcumbs";

import Temperature from "./Temperature";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import DatePicker from "react-datepicker";

import moment from "moment";

import Cardiac from "./Cardiac";

import "./styles.css";

class PatientReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { field: "room", label: "Phòng" },
                { field: "name", label: "Tên" },
                { field: "age", label: "Tuổi" },
                { field: "gender", label: "Giới tính" }
            ]
        };
    }

    _getValue(field, type) {
        let before = this.props.beforeParams;
        let update = this.props.beforeParams;

        if (field === "cp") {
            if (type === "before") {
                if (before.cp === "1") {
                    return "Đau thắt ngực thông thường";
                } else if (before.cp === "2") {
                    return "Đau thắt ngực không bình thường";
                } else if (before.cp === "3") {
                    return "Đau ngực";
                } else if (before.cp === "4") {
                    return " Không có triệu chứng";
                }
            } else {
                if (!update[field]) {
                    return "Chưa xác định";
                } else {
                    if (before.cp === "1") {
                        return "Đau thắt ngực thông thường";
                    } else if (before.cp === "2") {
                        return "Đau thắt ngực không bình thường";
                    } else if (before.cp === "3") {
                        return "Đau ngực";
                    } else if (before.cp === "4") {
                        return " Không có triệu chứng";
                    }
                }
            }
        } else if (field === "restecg") {
            if (type === "before") {
                if (before.restecg === "1") {
                    return "Bình thường";
                } else if (before.restecg === "2") {
                    return "Sóng ST-T không bình thường";
                } else if (before.restecg === "3") {
                    return "Phì đại thất trái";
                }
            } else {
                if (!update[field]) {
                    return "Chưa xác định";
                } else {
                    if (before.restecg === "1") {
                        return "Bình thường";
                    } else if (before.restecg === "2") {
                        return "Sóng ST-T không bình thường";
                    } else if (before.restecg === "3") {
                        return "Phì đại thất trái";
                    }
                }
            }
        } else if (field === "exang") {
            if (type === "before") {
                if (before.exang === "0") {
                    return "Không";
                } else if (before.exang === "1") {
                    return "Có";
                }
            } else {
                if (!update[field]) {
                    return "Chưa xác định";
                } else {
                    if (update.exang === "0") {
                        return "Không";
                    } else if (update.exang === "1") {
                        return "Có";
                    }
                }
            }
        } else if (field === "fbs") {
            if (type === "before") {
                if (before.fbs === "0") {
                    return "Không";
                } else if (before.restecg === "1") {
                    return "Có";
                }
            } else {
                if (!update[field]) {
                    return "Chưa xác định";
                } else {
                    if (update.fbs === "0") {
                        return "Không";
                    } else if (update.restecg === "1") {
                        return "Có";
                    }
                }
            }
        } else {
            if (type === "before") {
                return before[field];
            } else {
                return update[field];
            }
        }
    }

    render() {
        return (
            <div
                className="main-content"
                style={{
                    height: "100%"
                }}
            >
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
                        <div
                            className="inner-main-content"
                            style={{
                                flexDirection: "column"
                            }}
                        >
                            <Temperature
                                temData={this.props.temData}
                                getTemperatureChartData={values =>
                                    this.props.getTemperatureChartData(values)
                                }
                            />

                            <Cardiac
                                hrData={this.props.hrData}
                                getHrData={values => {
                                    this.props.getHrData(values);
                                }}
                            />

                            <div className="content-area-report-2">
                                <div
                                    style={{
                                        backgroundColor: "#fff",
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        marginRight: 10
                                    }}
                                >
                                    <div className="content-header content-header-12">
                                        <span
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "800"
                                            }}
                                        >
                                            Các thông số về tim mạch
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            flex: 1,
                                            overflow: "auto"
                                        }}
                                    >
                                        <table
                                            className="table table-bordered"
                                            style={{
                                                width: "100%",
                                                margin: 10
                                            }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        Thông số
                                                    </th>
                                                    <th scope="col">Trước</th>
                                                    <th scope="col">Sau</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td> Loại đau ngực</td>
                                                    <td>
                                                        {this._getValue(
                                                            "cp",
                                                            "before"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {this._getValue(
                                                            "cp",
                                                            "update"
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td> Huyết áp</td>
                                                    <td>
                                                        {this._getValue(
                                                            "trestbps",
                                                            "before"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {this._getValue(
                                                            "trestbps",
                                                            "update"
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td> Mỡ máu</td>
                                                    <td>
                                                        {this._getValue(
                                                            "trestbps",
                                                            "before"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {this._getValue(
                                                            "trestbps",
                                                            "update"
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {" "}
                                                        Lượng đường trong máu
                                                    </td>
                                                    <td>
                                                        {this._getValue(
                                                            "fbs",
                                                            "before"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {this._getValue(
                                                            "fbs",
                                                            "update"
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {" "}
                                                        Kết quả đo điện tim
                                                    </td>
                                                    <td>
                                                        {this._getValue(
                                                            "restecg",
                                                            "before"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {this._getValue(
                                                            "restecg",
                                                            "update"
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td> Nhịp tim cao nhất</td>
                                                    <td>
                                                        {this._getValue(
                                                            "thalach",
                                                            "before"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {this._getValue(
                                                            "thalach",
                                                            "update"
                                                        )}
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        Vận động gây đau thắt
                                                        ngực
                                                    </td>
                                                    <td>
                                                        {this._getValue(
                                                            "exang",
                                                            "before"
                                                        )}
                                                    </td>
                                                    <td>
                                                        {this._getValue(
                                                            "exang",
                                                            "update"
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        backgroundColor: "#fff",
                                        flex: 0.6,

                                        marginLeft: 10
                                    }}
                                >
                                    <div className="content-header content-header-12">
                                        <span
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "800"
                                            }}
                                        >
                                            Tỷ lệ mác các bệnh về tim
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            margin: 10
                                        }}
                                    >
                                        <div>
                                            <span>
                                                Tỷ lệ bị rung tâm nhỉ dựa vào
                                                điện tâm đồ:
                                            </span>
                                            <span>
                                                {" "}
                                                {(
                                                    this.props.afPredictRate *
                                                    100
                                                ).toFixed(2)}{" "}
                                                %
                                            </span>
                                        </div>
                                        <div style={{ marginTop: 20 }}>
                                            <span>
                                                Tỷ lệ bị nhồi máu cơ tim:{" "}
                                            </span>
                                            <span>
                                                {`${this.props.hdPrediction *
                                                    100}`.substr(0, 4)}{" "}
                                                %
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* dashboard */}
            </div>
        );
    }
}
export default PatientReport;
