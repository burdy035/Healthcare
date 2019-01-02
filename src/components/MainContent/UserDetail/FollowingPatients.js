import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye } from "@fortawesome/free-solid-svg-icons";

import { changeAlias } from "../../../utils";

class Duty extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="following-patients">
                <div className="content-header">
                    <span className="content-header-text">Bệnh nhân</span>

                    <div />
                </div>

                <div className="following-patient-container">
                    <table
                        className="table table-hover hospital-beds"
                        style={{}}
                    >
                        <thead>
                            <tr>
                                <th scope="col">Tên</th>
                                <th scope="col">Tuổi</th>
                                <th scope="col">Giới tính</th>
                                <th scope="col">Phòng</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.props.followingPatients.map(
                                (patient, index) => {
                                    console.log(patient);
                                    return (
                                        <tr
                                            className="patient-item"
                                            key={index}
                                            onClick={() =>
                                                this.props.patientOnclick({
                                                    patientId: patient._id,
                                                    patientName: changeAlias(
                                                        patient.name
                                                    ),
                                                    roomId: patient.room._id
                                                })
                                            }
                                        >
                                            <td>{patient.name}</td>
                                            <td>{patient.age}</td>
                                            <td>
                                                {patient.gender === "1"
                                                    ? "Nam"
                                                    : "Nữ"}
                                            </td>
                                            <td>{patient.room.room}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    style={{
                                                        color: "green"
                                                    }}
                                                    icon={faEye}
                                                />
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Duty;
