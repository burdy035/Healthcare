import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faEye,
    faEdit,
    faTrashAlt,
    faCheck,
    faTimes
} from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

class RcsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <table className="table table-hover hospital-beds" style={{}}>
                <thead>
                    <tr>
                        {this.props.allowCheck === false ? null : (
                            <th scope="col">
                                <input
                                    name="isGoing"
                                    type="checkbox"
                                    checked={
                                        this.props.allCheckboxesAreChecked
                                            ? this.props.allCheckboxesAreChecked
                                            : false
                                    }
                                    onChange={event =>
                                        this.props.checkAll(
                                            event.target.checked
                                        )
                                    }
                                />
                            </th>
                        )}

                        <th scope="col">#</th>
                        {(this.props.fields || []).map((field, index) => {
                            return (
                                <th scope="col" key={index}>
                                    {field.label}
                                </th>
                            );
                        })}
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(this.props.data || []).map((ele, index) => {
                        return (
                            <tr
                                key={index}
                                // onClick={() => {
                                //     if (this.props.allowClickOnRow === true) {
                                //         this.props.detail(index);
                                //     }
                                // }}
                            >
                                {this.props.allowCheck === false ? null : (
                                    <td>
                                        <input
                                            className="rcs-checkbox"
                                            type="checkbox"
                                            checked={
                                                !ele.isChecked
                                                    ? false
                                                    : ele.isChecked
                                            }
                                            onChange={event => {
                                                if (ele) {
                                                    this.props.onChange(
                                                        index,
                                                        event.target.checked
                                                    );
                                                }
                                            }}
                                        />
                                    </td>
                                )}

                                <td>{index + 1}</td>

                                {(this.props.fields || []).map(
                                    (item, index) => {
                                        const { field, icon } = item;

                                        if (
                                            field === "manufacturingDate" ||
                                            field === "expiryDate"
                                        ) {
                                            return (
                                                <td key={index}>
                                                    {moment(ele[field]).format(
                                                        "DD-MM-YYYY"
                                                    )}
                                                </td>
                                            );
                                        }

                                        if (icon && ele[field]) {
                                            return (
                                                <td key={index}>
                                                    <FontAwesomeIcon
                                                        style={{
                                                            color: "green"
                                                        }}
                                                        icon={faCheck}
                                                    />
                                                </td>
                                            );
                                        } else if (icon && !ele[field]) {
                                            return (
                                                <td key={index}>
                                                    <FontAwesomeIcon
                                                        style={{
                                                            color: "red"
                                                        }}
                                                        icon={faTimes}
                                                    />
                                                </td>
                                            );
                                        } else if (
                                            typeof ele[field] === "object"
                                        ) {
                                            return (
                                                <td key={index}>{`${
                                                    ele[field] &&
                                                    ele[field]["label"]
                                                        ? ele[field]["label"]
                                                        : "Chưa xác định"
                                                }`}</td>
                                            );
                                        }

                                        return (
                                            <td key={index}>{`${
                                                ele[field]
                                            }`}</td>
                                        );
                                    }
                                )}

                                <td>
                                    <div className="row rcs-row">
                                        {this.props.actions &&
                                        this.props.actions.detail ? (
                                            <button
                                                style={{
                                                    backgroundColor:
                                                        "transparent",
                                                    border: "none"
                                                }}
                                                onClick={() => {
                                                    this.props.detail(index);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    style={{
                                                        color: "grey"
                                                    }}
                                                    icon={faEye}
                                                />
                                            </button>
                                        ) : null}
                                        {this.props.actions &&
                                        this.props.actions.edit ? (
                                            <button
                                                style={{
                                                    backgroundColor:
                                                        "transparent",
                                                    border: "none"
                                                }}
                                                onClick={() =>
                                                    this.props.edit(index)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    style={{
                                                        color: "green"
                                                    }}
                                                    icon={faEdit}
                                                />
                                            </button>
                                        ) : null}

                                        {this.props.actions &&
                                        this.props.actions.delete ? (
                                            <button
                                                style={{
                                                    backgroundColor:
                                                        "transparent",
                                                    border: "none"
                                                }}
                                                onClick={() =>
                                                    this.props.delete(ele._id)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    style={{
                                                        color: "red"
                                                    }}
                                                    icon={faTrashAlt}
                                                />
                                            </button>
                                        ) : null}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

export default RcsTable;
