import React, { Component } from "react";

import Breadcumbs from "../../Breadcumbs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faHeartbeat,
    faTemperatureLow,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";

import io from "socket.io-client";

import { Line } from "react-chartjs-2";

import PlethGraph from "./ecg";

import HomeLogo from "../../HomeLogo";

import { Row, Col } from "react-bootstrap";

import { ChevronRight } from "@material-ui/icons";

import Topbar from "../../Topbar";

import { changeAlias } from "../../../utils";

import "./styles.css";

class MainContentHospitalBeds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            endpoint: "http://localhost:3002",
            temperature: "Chưa xác định",
            temperatureArr: Array(40).fill(0),
            labels: Array(40).fill("0"),
            maxValue: 5,
            tempMinValue: 36,
            tempMaxValue: 40,
            ecgSignals: [],
            patientName: ""
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;

        const socket = io.connect(`${endpoint}/chat`);

        this.socket = socket;

        socket.on("allow-to-change-screen", data => {
            this.props.history.push({
                pathname: this.state.currentNav.link,
                state: {
                    ...this.state.currentNav.state
                }
            });
        });

        socket.on("bpm-tracking", data => {
            this.setState({
                bpm: data.bpm
            });
        });

        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        this.ctx = ctx;
        ctx.canvas.width =
            this.refs.canvasContainer.clientWidth -
            this.refs.canvasRuler.clientWidth;
        ctx.canvas.height = this.refs.canvasContainer.clientHeight;
        this.ecg = new PlethGraph(canvas, ctx, () => {
            return [this.state.value];
        });
        socket.on("ecg-signal-tracking", async data => {
            await this.setState({
                value: data.s,
                maxValue:
                    Math.abs(data.s) > this.state.maxValue
                        ? Math.abs(data.s)
                        : this.state.maxValue
            });
            this.ecg.start();
            if (!this.props.gotPrediction) {
                if (this.state.ecgSignals.length === 2001) {
                    this.props.getAfPrediction(this.state.ecgSignals);
                    this.setState({
                        ecgSignals: []
                    });
                } else {
                    this.setState({
                        ecgSignals: [...this.state.ecgSignals, data.s]
                    });
                }
            }
        });
        socket.on("temperature-tracking", data => {
            let temperature = parseFloat(data.temperature);

            if (temperature < 0) {
                temperature = this.state.tempMinValue;
            }
            let minValue = temperature - 1;
            let maxValue = temperature + 1;

            this.setState({
                temperature: temperature,
                tempMinValue:
                    minValue < this.state.tempMinValue
                        ? minValue
                        : this.state.tempMinValue,
                tempMaxValue:
                    maxValue > this.state.tempMaxValue
                        ? maxValue
                        : this.state.tempMaxValue
            });

            let temp = this.state.temperatureArr;

            temp.shift();

            temp.push(data.temperature);

            this.setState({
                temperatureArr: temp
            });
        });
    }

    _navigateRoute(link, state) {
        this.setState({
            currentNav: {
                link,
                state
            }
        });

        this.socket.emit("close", { init: false });
    }
    componentWillUnmount() {
        this.socket.disconnect();
    }
    render() {
        let { user } = this.props;

        let breadcumbs = [
            { title: "Trang chủ", path: "/" },
            {
                title: "Theo dõi bệnh nhân",
                path: "/patients"
            },
            {
                title: this.props.params ? this.props.params.name : "",
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
                        <Breadcumbs
                            history={this.props.history}
                            data={breadcumbs}
                        />

                        <div
                            className="inner-main-content"
                            style={{ flexDirection: "column" }}
                        >
                            <div
                                className="content-area-patient-tracking-1"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "auto"
                                }}
                            >
                                <div
                                    className="content-header"
                                    style={{
                                        alignItems: "center"
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "800"
                                        }}
                                    >
                                        Phòng 101 - Nguyễn Văn An - Biểu đồ điện
                                        tâm đồ, nhịp tim
                                    </span>

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <span
                                            onClick={() =>
                                                this.props.patientReportOnClick()
                                            }
                                            style={{
                                                marginRight: 15,
                                                color: "#2979ff",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Báo cáo chi thiết
                                        </span>
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                    </div>
                                </div>

                                <div
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        margin: 10
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flex: 1,
                                            border: "1px solid",
                                            flexDirection: "row"
                                        }}
                                    >
                                        <div
                                            style={{
                                                flex: 1
                                            }}
                                        >
                                            <div
                                                className="ecg-canvas-container"
                                                ref="canvasContainer"
                                            >
                                                <div
                                                    className="canvas-ruler"
                                                    ref="canvasRuler"
                                                >
                                                    <span>
                                                        {this.state.maxValue.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                    <span>
                                                        {(
                                                            this.state
                                                                .maxValue / 2
                                                        ).toFixed(2)}
                                                    </span>
                                                    <span>0</span>
                                                    <span>
                                                        -
                                                        {(
                                                            this.state
                                                                .maxValue / 2
                                                        ).toFixed(2)}
                                                    </span>
                                                    <span>
                                                        -
                                                        {this.state.maxValue.toFixed(
                                                            2
                                                        )}
                                                    </span>
                                                </div>
                                                <canvas
                                                    className="ecg-canvas"
                                                    ref="canvas"
                                                />
                                            </div>
                                        </div>
                                        <div className="heart-beating-container">
                                            <FontAwesomeIcon
                                                className="human-heart"
                                                style={{
                                                    fontSize: "19",
                                                    paddingRight: 5,
                                                    color: "red",
                                                    width: 69,
                                                    height: 69,

                                                    marginBottom: 10
                                                }}
                                                icon={faHeartbeat}
                                            />
                                            <span>BPM: {this.state.bpm}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="content-area-patient-tracking-2">
                                <div
                                    className="content-header"
                                    style={{
                                        alignItems: "center"
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 14,
                                            fontWeight: "800"
                                        }}
                                    >
                                        Biểu đồ nhiệt độ
                                    </span>
                                </div>
                                <div
                                    style={{
                                        marginTop: 15,
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "row",
                                        border: "1px solid",
                                        margin: 10
                                    }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <Line
                                            key={Math.random()}
                                            data={{
                                                labels: this.state.labels,

                                                datasets: [
                                                    {
                                                        pointRadius: 0,
                                                        data: this.state
                                                            .temperatureArr,
                                                        fill: false,
                                                        backgroundColor:
                                                            "rgba(75,192,192,0.4)",
                                                        borderColor:
                                                            "rgba(75,192,192,1)"
                                                    }
                                                ]
                                            }}
                                            options={{
                                                maintainAspectRatio: false,
                                                responsive: true,
                                                animation: false,
                                                legend: {
                                                    display: false
                                                },
                                                scales: {
                                                    xAxes: [
                                                        {
                                                            gridLines: {
                                                                display: false
                                                            },
                                                            ticks: {
                                                                display: false
                                                            }
                                                        }
                                                    ],
                                                    yAxes: [
                                                        {
                                                            gridLines: {
                                                                display: false
                                                            },
                                                            ticks: {
                                                                min: this.state
                                                                    .tempMinValue,
                                                                max: this.state
                                                                    .tempMaxValue
                                                            }
                                                        }
                                                    ]
                                                }
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            height: "100%",
                                            flex: 0.3,
                                            borderLeft: "1px solid",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column"
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            style={{
                                                fontSize: "19",
                                                paddingRight: 5,
                                                color: "red",
                                                width: 69,
                                                height: 69,
                                                marginBottom: 10
                                            }}
                                            icon={faTemperatureLow}
                                        />
                                        <span>{this.state.temperature}</span>
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
export default MainContentHospitalBeds;
