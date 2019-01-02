import React, { Component } from "react";

import moment from "moment";

import { Line } from "react-chartjs-2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import DatePicker from "react-datepicker";

class Temperature extends Component {
    constructor(props) {
        super(props);

        this.state = {
            labels: ["1-12", "2-12", "3-12", "4-12", "5-12"],
            temperatureArr: [35, 35.5, 37, 37.5, 38],
            minChart: 0,
            maxChart: 100,
            hrLabels: [],
            highHr: [],
            lowHr: [],
            averageHr: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hrData) {
            let { hrData } = nextProps;

            let hrLabels = [];

            let highHr = [];
            let lowHr = [];
            let averageHr = [];

            Object.keys(hrData).map(k => {
                // console.log(
                //     "adad",
                //     hrData[k].low,
                //     hrData[k].high,
                //     hrData[k].average
                // );

                highHr.push(
                    hrData[k].high === 0 ? this.state.minChart : hrData[k].high
                );
                lowHr.push(
                    hrData[k].low === 0 ? this.state.minChart : hrData[k].low
                );
                averageHr.push(
                    hrData[k].average === 0
                        ? this.state.minChart
                        : hrData[k].average
                );

                return hrLabels.push(k.slice(0, k.length - 5));
            });

            this.setState({
                hrLabels: hrLabels.reverse(),
                highHr: highHr.reverse(),
                lowHr: lowHr.reverse(),
                averageHr: averageHr.reverse()
            });
        }
    }

    _onChange(field, value) {
        this.setState({
            [field]: value
        });
    }

    _onDateChange(field, value) {
        this.setState({
            [field]: value
        });
    }

    _onSubmitCardiac() {
        let values = {};
        if (this.state.cardiacType === "day") {
            values.type = "day";
            values.numbers = [
                moment(this.state.cardiacFromDay).format(),
                parseInt(this.state.cardiacToDay)
            ];

            if (
                this.state.cardiacType &&
                this.state.cardiacFromDay &&
                this.state.cardiacToDay
            ) {
                this.props.getHrData(values);
            }
        } else if (this.state.cardiacType === "month") {
            values.type = "month";
            values.numbers = [parseInt(this.state.cardiacMonth)];

            if (this.state.cardiacMonth) {
                this.props.getHrData(values);
            }
        }
    }
    render() {
        let daysArr = [];

        for (let i = 1; i <= 30; i++) {
            daysArr.push(i);
        }
        return (
            <div className="content-area-report-3">
                <div className="cardiac-chart">
                    <div className="content-header">
                        <span
                            style={{
                                fontSize: 14,
                                fontWeight: "800"
                            }}
                        >
                            Biểu đồ nhịp tim của bệnh nhân
                        </span>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Line
                            key={Math.random()}
                            data={{
                                labels: this.state.hrLabels,

                                datasets: [
                                    {
                                        label: "Nhip tim cao nhất",
                                        pointRadius: 0,
                                        data: this.state.highHr,
                                        fill: false,
                                        backgroundColor: "rgba(75,192,192,0.4)",
                                        borderColor: "rgba(75,192,192,1)",
                                        pointBorderColor:
                                            "rgba(255, 0, 70, 0.25) ",
                                        pointBackgroundColor: "#fff",
                                        pointBorderWidth: 5,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: "#fff",
                                        pointHoverBorderColor:
                                            "rgba(255, 0, 70, 1) )",
                                        pointHoverBorderWidth: 5,
                                        pointRadius: 5,
                                        pointHitRadius: 10
                                    },
                                    {
                                        label: "Nhip tim trung bình",
                                        pointRadius: 0,
                                        data: this.state.averageHr,
                                        fill: false,
                                        backgroundColor: "#FDC500",
                                        borderColor: "#FDC500",
                                        pointBorderColor:
                                            "rgba(255, 0, 70, 0.25) ",
                                        pointBackgroundColor: "#fff",
                                        pointBorderWidth: 5,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: "#fff",
                                        pointHoverBorderColor:
                                            "rgba(255, 0, 70, 1) )",
                                        pointHoverBorderWidth: 5,
                                        pointRadius: 5,
                                        pointHitRadius: 10
                                    },
                                    {
                                        label: "Nhip tim thấp nhất",
                                        pointRadius: 0,
                                        data: this.state.lowHr,
                                        fill: false,
                                        backgroundColor: "#EE0D0D",
                                        borderColor: "#EE0D0D",
                                        pointBorderColor:
                                            "rgba(255, 0, 70, 0.25) ",
                                        pointBackgroundColor: "#fff",
                                        pointBorderWidth: 5,
                                        pointHoverRadius: 5,
                                        pointHoverBackgroundColor: "#fff",
                                        pointHoverBorderColor:
                                            "rgba(255, 0, 70, 1) )",
                                        pointHoverBorderWidth: 5,
                                        pointRadius: 5,
                                        pointHitRadius: 10
                                    }
                                ]
                            }}
                            options={{
                                maintainAspectRatio: false,
                                responsive: true,
                                animation: false,
                                legend: {
                                    display: true,
                                    position: "top",
                                    fullWidth: true,
                                    reverse: false,
                                    labels: {
                                        fontColor: "rgb(255, 99, 132)"
                                    }
                                },
                                scales: {
                                    xAxes: [
                                        {
                                            gridLines: {
                                                display: false
                                            },
                                            ticks: {
                                                display: true
                                            }
                                        }
                                    ],
                                    yAxes: [
                                        {
                                            gridLines: {
                                                display: false
                                            },
                                            ticks: {
                                                min: this.state.minChart,
                                                max: this.state.maxChart
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="report-selection">
                    <div style={{ margin: 10 }}>
                        <FormGroup style={{ marginTop: 20, flex: 0.3 }}>
                            <ControlLabel>Loại</ControlLabel>
                            <FormControl
                                type={"select"}
                                componentClass="select"
                                value={this.state.cardiacType || ""}
                                bsClass={`form-control custom-form-control`}
                                onChange={e =>
                                    this._onChange(
                                        "cardiacType",
                                        e.target.value
                                    )
                                }
                            >
                                <option value={""} />
                                <option label="Ngày" value="day" />
                                <option label="Tháng" value="month" />
                            </FormControl>
                        </FormGroup>

                        {this.state.cardiacType === "day" ? (
                            <div>
                                <FormGroup>
                                    <ControlLabel>Từ ngày</ControlLabel>
                                    <DatePicker
                                        className={`form-control custom-form-control`}
                                        dateFormat="YYYY/MM/DD"
                                        selected={this.state.cardiacFromDay}
                                        maxDate={moment()}
                                        onChange={date =>
                                            this._onDateChange(
                                                "cardiacFromDay",
                                                date
                                            )
                                        }
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Đến trước đó</ControlLabel>
                                    <FormControl
                                        type={"select"}
                                        componentClass="select"
                                        value={this.state.cardiacToDay || ""}
                                        bsClass={`form-control custom-form-control`}
                                        onChange={e =>
                                            this._onChange(
                                                "cardiacToDay",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value={""} />
                                        {daysArr.map(d => {
                                            return (
                                                <option
                                                    key={d}
                                                    value={d}
                                                    label={`${d}  ngày`}
                                                />
                                            );
                                        })}
                                    </FormControl>
                                </FormGroup>
                            </div>
                        ) : null}

                        {this.state.cardiacType === "month" ? (
                            <FormGroup
                                style={{
                                    marginTop: 20,
                                    flex: 0.3
                                }}
                            >
                                <ControlLabel>Tháng</ControlLabel>
                                <FormControl
                                    type={"select"}
                                    componentClass="select"
                                    value={this.state.cardiacMonth || ""}
                                    bsClass={`form-control custom-form-control`}
                                    onChange={e =>
                                        this._onChange(
                                            "cardiacMonth",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value={""} />
                                    <option label="Tháng 1" value="1" />
                                    <option label="Tháng 2" value="2" />
                                    <option label="Tháng 3" value="3" />
                                    <option label="Tháng 4" value="4" />
                                    <option label="Tháng 5" value="5" />
                                    <option label="Tháng 6" value="6" />
                                    <option label="Tháng 7" value="7" />
                                    <option label="Tháng 8" value="8" />
                                    <option label="Tháng 9" value="9" />
                                    <option label="Tháng 10" value="10" />
                                    <option label="Tháng 11" value="11" />
                                    <option label="Tháng 12" value="12" />
                                </FormControl>
                            </FormGroup>
                        ) : null}

                        <button onClick={() => this._onSubmitCardiac()}>
                            Cap nhat
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Temperature;
