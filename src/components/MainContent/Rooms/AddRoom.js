import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { CircularProgress } from "@material-ui/core";

class AddRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitAvailabel: false
        };
    }

    componentDidMount() {}

    async _onChange(field, value) {
        await this.setState({
            [field]: value || ""
        });

        if (this.state.block && this.state.room) {
            this.setState({
                submitAvailabel: true
            });
        }
    }
    _submit() {
        if (!this.state.submitAvailabel) {
            return;
        } else {
            let values = {
                roomId: this.state._id,
                room: this.state.room,
                block: this.state.block,
                cardiacSensor: this.state.cardiacSensor,
                temperatureSensor: this.state.temperatureSensor,
                patient: this.state.patient
            };

            this.props.submit(values);
        }
    }

    render() {
        const { devicesDataForm } = this.props;
        return (
            <div
                className="content-area"
                style={{
                    overflow: "auto",
                    display: this.props.visible ? "block" : "none"
                }}
            >
                <div className="content-header">
                    <span
                        style={{
                            fontSize: 17,
                            fontWeight: "800"
                        }}
                    >
                        Thêm phòng bệnh
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

                <div style={{}}>
                    <div style={{ padding: 20 }}>
                        <form style={{ maxWidth: 400 }}>
                            <div>
                                <span style={{ fontSize: 14 }}>Thêm phòng</span>
                                <div
                                    style={{
                                        width: 40,
                                        borderBottom: "4px solid #042954"
                                    }}
                                />
                            </div>
                            <FormGroup style={{ marginTop: 20 }}>
                                <ControlLabel>Phòng</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    value={this.state.room || ""}
                                    bsClass={`form-control custom-form-control`}
                                    onChange={e =>
                                        this._onChange("room", e.target.value)
                                    }
                                />
                            </FormGroup>
                            <FormGroup style={{ marginTop: 20 }}>
                                <ControlLabel>Block</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    value={this.state.block || ""}
                                    bsClass={`form-control custom-form-control`}
                                    onChange={e =>
                                        this._onChange("block", e.target.value)
                                    }
                                />
                            </FormGroup>

                            <div>
                                <span style={{ fontSize: 17 }}>Add Device</span>
                                <div
                                    style={{
                                        width: 40,
                                        borderBottom: "4px solid #042954"
                                    }}
                                />
                            </div>
                            <div style={{ marginTop: 20 }}>
                                <FormGroup
                                    style={{
                                        marginTop: 20,
                                        flex: 0.3
                                    }}
                                >
                                    <ControlLabel>
                                        Sensor đo nhiệt độ
                                    </ControlLabel>
                                    <FormControl
                                        type={"text"}
                                        componentClass="select"
                                        value={
                                            this.state["temperatureSensor"] ||
                                            ""
                                        }
                                        bsClass={`form-control custom-form-control`}
                                        onChange={e =>
                                            this._onChange(
                                                "temperatureSensor",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" />
                                        {(
                                            (devicesDataForm[
                                                "temperatureSensor"
                                            ] &&
                                                devicesDataForm[
                                                    "temperatureSensor"
                                                ].devices) ||
                                            []
                                        ).map((d, i) => {
                                            return (
                                                <option key={i} value={d._id}>
                                                    {d.label}
                                                </option>
                                            );
                                        })}
                                    </FormControl>
                                </FormGroup>
                                <FormGroup
                                    style={{
                                        marginTop: 20,
                                        flex: 0.3
                                    }}
                                >
                                    <ControlLabel>
                                        Sensor đo nhịp tim
                                    </ControlLabel>
                                    <FormControl
                                        type={"text"}
                                        componentClass="select"
                                        value={
                                            this.state["cardiacSensor"] || ""
                                        }
                                        bsClass={`form-control custom-form-control`}
                                        onChange={e =>
                                            this._onChange(
                                                "cardiacSensor",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" />
                                        {(
                                            (devicesDataForm["cardiacSensor"] &&
                                                devicesDataForm["cardiacSensor"]
                                                    .devices) ||
                                            []
                                        ).map((d, i) => {
                                            return (
                                                <option key={i} value={d._id}>
                                                    {d.label}
                                                </option>
                                            );
                                        })}
                                    </FormControl>
                                </FormGroup>
                            </div>
                            <div>
                                <span style={{ fontSize: 17 }}>
                                    Add patient
                                </span>
                                <div
                                    style={{
                                        width: 40,
                                        borderBottom: "4px solid #042954"
                                    }}
                                />
                            </div>
                            <FormGroup
                                style={{
                                    marginTop: 20,
                                    flex: 0.3
                                }}
                            >
                                <ControlLabel>Thêm bệnh nhân</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    componentClass="select"
                                    value={this.state.patient || ""}
                                    bsClass={`form-control custom-form-control`}
                                    onChange={e =>
                                        this._onChange(
                                            "patient",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="" />
                                    {(this.props.patientsDataForm || []).map(
                                        (d, i) => {
                                            return (
                                                <option key={i} value={d._id}>
                                                    {d.name}
                                                </option>
                                            );
                                        }
                                    )}
                                </FormControl>
                            </FormGroup>
                        </form>

                        <button
                            className={`submit-btn ${
                                !this.state.submitAvailabel
                                    ? "submit-btn-pos"
                                    : ""
                            }`}
                            style={{
                                marginTop: 30
                            }}
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
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddRoom;
