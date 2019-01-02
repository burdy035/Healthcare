import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye } from "@fortawesome/free-solid-svg-icons";

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
                                onClick={() => this.props.detail(ele)}
                            >
                                <td>{index + 1}</td>

                                {(this.props.fields || []).map(
                                    (item, index) => {
                                        const { field } = item;

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

                                        return (
                                            <td key={index}>{`${
                                                ele[field]
                                            }`}</td>
                                        );
                                    }
                                )}

                                <td>
                                    <div className="row rcs-row">
                                        <button
                                            style={{
                                                backgroundColor: "transparent",
                                                border: "none"
                                            }}
                                            onClick={() => {
                                                this.props.detail(ele);
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                style={{
                                                    color: "grey"
                                                }}
                                                icon={faEye}
                                            />
                                        </button>
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
