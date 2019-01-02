import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { CircularProgress } from "@material-ui/core";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import moment from "moment";

import DatePicker from "react-datepicker";

import "./styles.css";

moment.suppressDeprecationWarnings = true;

class AddDevice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitBtnAvailable: false
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.fields) {
            let { fields } = nextProps;

            fields.map(field => {
                return this.setState({
                    [`${field}Error`]: ""
                });
            });
        }

        if (nextProps.addSuccess) {
            let { fields } = nextProps;

            fields.map(f => {
                return this.setState({
                    [f.field]: ""
                });
            });
        }
    }
    async _onChange(field, value, type) {
        let isValid = this._inputValidation(value, type);
        if (type === "date") {
            await this.setState({
                [field]: !isValid ? "" : value,
                [`${field}HasError`]: !isValid ? true : false
            });
        } else {
            await this.setState({
                [field]: value,
                [`${field}HasError`]: !isValid
            });
        }
        let a = 0;
        this.props.fields.map(f => {
            if (this.state[`${f.field}HasError`]) {
                a = a + 1;
            }
            if (this.state[`${f.field}HasError`] === undefined) {
                a = a + 1;
            }
            return a;
        });

        if (a === 0) {
            this.setState({
                submitBtnAvailable: true
            });
        } else {
            this.setState({
                submitBtnAvailable: false
            });
        }
    }

    _inputValidation(value, type) {
        if (type === "date") {
            let valid = moment(value, "DD/MM/YYYY", true).isValid();

            return valid;
        } else {
            return !!value;
        }
    }

    _submitOnClick() {
        let values = this.props.fields.reduce((result, item) => {
            if (item.type === "date") {
                let d = moment(this.state[item.field]);

                result[item.field] = d.format();
            } else {
                result[item.field] = this.state[item.field];
            }

            return result;
        }, {});
        if (this.state.submitBtnAvailable) {
            this.props.submit(values);
        }
    }

    render() {
        return (
            <div
                style={{
                    display: this.props.display ? "block" : "none",
                    flex: 0.4,
                    backgroundColor: "#fff",
                    marginLeft: 20,
                    marginTop: 20,
                    marginBottom: 20
                }}
            >
                <div className="content-header">
                    <span
                        style={{
                            fontSize: 17,
                            fontWeight: "800"
                        }}
                    >
                        {this.props.header || ""}
                    </span>

                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none"
                        }}
                        onClick={this.props.closeAddDevice}
                    >
                        <FontAwesomeIcon
                            style={{
                                color: "red"
                            }}
                            icon={faTimes}
                        />
                    </button>
                </div>

                <div style={{}}>
                    <div
                        style={{
                            padding: "10px 20px"
                        }}
                    >
                        <form>
                            {(this.props.fields || []).map((ele, index) => {
                                let { field, label, type, options } = ele;

                                if (type === "date") {
                                    return (
                                        <FormGroup key={index}>
                                            <ControlLabel>{label}</ControlLabel>
                                            <DatePicker
                                                className={`form-control custom-form-control ${
                                                    this.state[
                                                        `${field}HasError`
                                                    ]
                                                        ? "has-error"
                                                        : ""
                                                }`}
                                                dateFormat="YYYY/MM/DD"
                                                selected={this.state[field]}
                                                onChange={date =>
                                                    this._onChange(
                                                        field,
                                                        date,
                                                        "date"
                                                    )
                                                }
                                                onChangeRaw={e =>
                                                    this._onChange(
                                                        field,
                                                        e.target.value,
                                                        "date"
                                                    )
                                                }
                                            />
                                        </FormGroup>
                                    );
                                } else if (type === "select") {
                                    return (
                                        <FormGroup key={index}>
                                            <ControlLabel>{label}</ControlLabel>
                                            <FormControl
                                                type={"select"}
                                                componentClass="select"
                                                value={this.state[field] || ""}
                                                bsClass={`form-control custom-form-control ${
                                                    this.state[
                                                        `${field}HasError`
                                                    ]
                                                        ? "has-error"
                                                        : ""
                                                }`}
                                                onChange={e =>
                                                    this._onChange(
                                                        field,
                                                        e.target.value,
                                                        "select"
                                                    )
                                                }
                                            >
                                                <option key={1000} value={""}>
                                                    {""}
                                                </option>
                                                {(options || []).map(
                                                    (option, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    option._id ||
                                                                    option.label
                                                                }
                                                            >
                                                                {option.label}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </FormControl>
                                        </FormGroup>
                                    );
                                }

                                return (
                                    <FormGroup key={index}>
                                        <ControlLabel>{label}</ControlLabel>
                                        <FormControl
                                            type={"text"}
                                            value={this.state[field] || ""}
                                            bsClass={`form-control custom-form-control ${
                                                this.state[`${field}HasError`]
                                                    ? "has-error"
                                                    : ""
                                            }`}
                                            onChange={e =>
                                                this._onChange(
                                                    field,
                                                    e.target.value,
                                                    "text"
                                                )
                                            }
                                        />
                                    </FormGroup>
                                );
                            })}
                        </form>

                        <button
                            className={`submit-btn ${
                                !this.state.submitBtnAvailable
                                    ? "submit-btn-pos"
                                    : ""
                            }`}
                            onClick={() => this._submitOnClick()}
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
export default AddDevice;
