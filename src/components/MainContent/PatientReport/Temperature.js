import React, { Component } from "react";

import moment from "moment";

import { Line } from "react-chartjs-2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import DatePicker from "react-datepicker";

import { addDays } from "date-fns";

class Temperature extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minChart: 30,
            maxChart: 40,
            temLabels: [],
            highTem: [],
            lowTem: [],
            averageTem: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.temData) {
            console.log("nextProps.temData");
            let { temData } = nextProps;

            let temLabels = [];

            let highTem = [];
            let lowTem = [];
            let averageTem = [];

            Object.keys(temData).map(k => {
                highTem.push(temData[k].high);
                lowTem.push(temData[k].low);
                averageTem.push(temData[k].average);

                return temLabels.push(k.slice(0, k.length - 5));
            });

            let max = Math.max(...highTem);

            let lowArr = [];

            lowTem.map(i => {
                if (i !== 0) {
                    lowArr.push(i);
                }
            });

            let min = Math.min(...lowArr);

            this.setState({
                maxChart: Math.ceil(max),
                minChart: Math.floor(min)
            });

            highTem = highTem.map(i => {
                return i === 0 ? this.state.minChart : i;
            });

            lowTem = lowTem.map(i => {
                return i === 0 ? this.state.minChart : i;
            });

            averageTem = averageTem.map(i => {
                return i === 0 ? this.state.minChart : i;
            });

            this.setState(
                {
                    temLabels: temLabels.reverse(),
                    highTem: highTem.reverse(),
                    lowTem: lowTem.reverse(),
                    averageTem: averageTem.reverse()
                },
                () => console.log(this.state)
            );
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
                this.props.getTemperatureChartData(values);
            }
        } else if (this.state.cardiacType === "month") {
            values.type = "month";
            values.numbers = [parseInt(this.state.cardiacMonth)];

            if (this.state.cardiacMonth) {
                this.props.getTemperatureChartData(values);
            }
        }
    }
    render() {
        let daysArr = [];

        for (let i = 1; i <= 30; i++) {
            daysArr.push(i);
        }
        return (
            <div className="content-area-report-1">
                <div className="temperature-chart">
                    <div className="content-header">
                        <span
                            style={{
                                fontSize: 14,
                                fontWeight: "800"
                            }}
                        >
                            Biểu đồ nhiệt độ bệnh nhân
                        </span>
                    </div>

                    <div style={{ flex: 1 }}>
                        <Line
                            key={Math.random()}
                            data={{
                                labels: this.state.temLabels,

                                datasets: [
                                    {
                                        label: "Nhiệt độ cao nhất",
                                        pointRadius: 0,
                                        data: this.state.highTem,
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
                                        label: "Nhiệt độ trung bình",
                                        pointRadius: 0,
                                        data: this.state.averageTem,
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
                                        label: "Nhiệt độ thấp nhất",
                                        pointRadius: 0,
                                        data: this.state.lowTem,
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
