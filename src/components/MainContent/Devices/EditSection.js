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
        let { fields } = nextProps;
        if (nextProps.fields) {
            fields.map(field => {
                return this.setState({
                    [`${field}Error`]: ""
                });
            });
        }
        if (nextProps.item) {
            if (nextProps.item) {
                this.setState({
                    state: nextProps.item.state ? nextProps.item.state._id : "",
                    category: nextProps.item.category
                        ? nextProps.item.category._id
                        : "",
                    label: nextProps.item.label ? nextProps.item.label : "",
                    manufacturingDate: nextProps.item["manufacturingDate"]
                        ? moment(nextProps.item["manufacturingDate"])
                        : moment(),
                    expiryDate: nextProps.item["expiryDate"]
                        ? moment(nextProps.item["expiryDate"])
                        : moment(),
                    port: nextProps.item["port"] ? nextProps.item["port"] : ""
                });
            }
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
            if (!this.state[`${f.field}HasError`]) {
                a = a + 1;
            }

            return a;
        });

        if (a === 6) {
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

        values.deviceId = this.props.item._id;

        if (this.state.submitBtnAvailable) {
            this.props.editDevice(values);
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
                        Sửa thông tin thiết bị
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
                            <FormGroup>
                                <ControlLabel>Loại thiết bị</ControlLabel>
                                <FormControl
                                    type={"select"}
                                    componentClass="select"
                                    value={this.state.category || ""}
                                    bsClass={`form-control custom-form-control ${
                                        this.state[`categoryHasError`]
                                            ? "has-error"
                                            : ""
                                    }`}
                                    onChange={e =>
                                        this._onChange(
                                            "category",
                                            e.target.value,
                                            "select"
                                        )
                                    }
                                >
                                    <option key={1000} value={""}>
                                        {""}
                                    </option>
                                    {(this.props.categories || []).map(
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

                            <FormGroup>
                                <ControlLabel>Nhãn</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    value={this.state.label || ""}
                                    bsClass={`form-control custom-form-control ${
                                        this.state[`labelHasError`]
                                            ? "has-error"
                                            : ""
                                    }`}
                                    onChange={e =>
                                        this._onChange(
                                            "label",
                                            e.target.value,
                                            "text"
                                        )
                                    }
                                />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Port</ControlLabel>
                                <FormControl
                                    type={"text"}
                                    value={this.state.port || ""}
                                    bsClass={`form-control custom-form-control ${
                                        this.state[`portHasError`]
                                            ? "has-error"
                                            : ""
                                    }`}
                                    onChange={e =>
                                        this._onChange(
                                            "port",
                                            e.target.value,
                                            "text"
                                        )
                                    }
                                />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Tình trạng</ControlLabel>
                                <FormControl
                                    type={"select"}
                                    componentClass="select"
                                    value={this.state.state || ""}
                                    bsClass={`form-control custom-form-control ${
                                        this.state[`stateHasError`]
                                            ? "has-error"
                                            : ""
                                    }`}
                                    onChange={e =>
                                        this._onChange(
                                            "state",
                                            e.target.value,
                                            "select"
                                        )
                                    }
                                >
                                    <option key={1000} value={""}>
                                        {""}
                                    </option>
                                    {(this.props.states || []).map(
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

                            <FormGroup>
                                <ControlLabel>Ngày sản xuất</ControlLabel>
                                <DatePicker
                                    className={`form-control custom-form-control ${
                                        this.state[`expiryDateHasError`]
                                            ? "has-error"
                                            : ""
                                    }`}
                                    dateFormat="YYYY/MM/DD"
                                    selected={this.state.expiryDate}
                                    onChange={date =>
                                        this._onChange(
                                            "expiryDate",
                                            date,
                                            "date"
                                        )
                                    }
                                    onChangeRaw={e =>
                                        this._onChange(
                                            "expiryDate",
                                            e.target.value,
                                            "date"
                                        )
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Ngày hết hạn</ControlLabel>
                                <DatePicker
                                    className={`form-control custom-form-control ${
                                        this.state[`expiryDateHasError`]
                                            ? "has-error"
                                            : ""
                                    }`}
                                    dateFormat="YYYY/MM/DD"
                                    selected={this.state.expiryDate}
                                    onChange={date =>
                                        this._onChange(
                                            "expiryDate",
                                            date,
                                            "date"
                                        )
                                    }
                                    onChangeRaw={e =>
                                        this._onChange(
                                            "expiryDate",
                                            e.target.value,
                                            "date"
                                        )
                                    }
                                />
                            </FormGroup>
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
