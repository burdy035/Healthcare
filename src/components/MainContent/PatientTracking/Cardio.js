import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";

import io from "socket.io-client";

import { Line } from "react-chartjs-2";

class ECGDiagram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            endpoint: "http://localhost:3002",
            signals: Array(100).fill(0),
            labels: Array(100).fill("0")
        };
    }
    componentDidMount() {
        const { endpoint } = this.state;

        const socket = io.connect(`${endpoint}/patient-tracking`);

        this.socket = socket;

        socket.on("connect", () => {
            console.log("Connected~~~");
        });
        socket.on("connected", data => {
            console.log(data);
        });
        socket.on("signal", data => {
            console.log(data);
            let temp = this.state.signals;

            temp.shift();

            temp.push(data.signal);

            this.setState({
                signals: temp
            });
        });

        socket.on("bpm", data => {
            this.setState({
                bpm: data.bpm
            });
        });
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    render() {
        return (
            <div
                style={{
                    marginTop: 15,
                    display: "flex",
                    flex: 0.5,
                    border: "1px solid",
                    flexDirection: "row"
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
                                    data: this.state.signals,
                                    fill: false,
                                    backgroundColor: "rgba(75,192,192,0.4)",
                                    borderColor: "rgba(75,192,192,1)"
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
                                            min: 0,
                                            max: 1200
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
        );
    }
}
export default ECGDiagram;
