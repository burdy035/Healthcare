import React, { Component } from "react";

import io from "socket.io-client";

import PlethGraph from "./ecg";

class ECGDiagram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            endpoint: "http://localhost:3002",
            maxValue: 0,
            ecgSignals: []
        };
    }
    componentDidMount() {
        // const { endpoint } = this.state;
        // const socket = io.connect(`${endpoint}/patient-tracking`);
        // this.socket = socket;
        // socket.on("connect", () => {
        //     console.log("Connected~~~");
        // });
        // const canvas = this.refs.canvas;
        // const ctx = canvas.getContext("2d");
        // this.ctx = ctx;
        // ctx.canvas.width = this.refs.canvasContainer.clientWidth;
        // ctx.canvas.height = this.refs.canvasContainer.clientHeight;
        // this.ecg = new PlethGraph(canvas, ctx, () => {
        //     return [this.state.value];
        // });
        // socket.on("signal", async data => {
        //     await this.setState({
        //         value: data.s,
        //         maxValue:
        //             Math.abs(data.s) > this.state.maxValue
        //                 ? Math.abs(data.s)
        //                 : this.state.maxValue
        //     });
        //     this.ecg.start();
        //     if (!this.props.gotPrediction) {
        //         if (this.state.ecgSignals.length === 2001) {
        //             this.props.getAfPrediction(this.state.ecgSignals);
        //             this.setState({
        //                 ecgSignals: []
        //             });
        //         } else {
        //             this.setState({
        //                 ecgSignals: [...this.state.ecgSignals, data.s]
        //             });
        //         }
        //     }
        // });
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    render() {
        return (
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "row"
                }}
                ref="canvasContainer"
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRight: "1px solid RGBA(128,128,128,0.6)",
                        padding: "0px 10px",
                        margin: "10px 0px"
                    }}
                >
                    <span>{this.state.maxValue.toFixed(2)}</span>
                    <span>{(this.state.maxValue / 2).toFixed(2)}</span>
                    <span>0</span>
                    <span>-{(this.state.maxValue / 2).toFixed(2)}</span>
                    <span>-{this.state.maxValue.toFixed(2)}</span>
                </div>
                <canvas
                    id="canvas"
                    ref="canvas"
                    style={{
                        margin: "10px 0px",
                        borderBottom: "1px solid RGBA(128,128,128,0.6)"
                    }}
                />
            </div>
        );
    }
}
export default ECGDiagram;
