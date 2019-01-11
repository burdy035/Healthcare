import React, { Component } from "react";

import Breadcumbs from "../../Breadcumbs";

import Table from "./Table";

import "./styles.css";

import { changeAlias } from "../../../utils";

class MainContentHospitalBeds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { field: "room", label: "Phòng" },
                { field: "name", label: "Tên" },
                { field: "age", label: "Tuổi" },
                { field: "gender", label: "Giới tính" }
            ]
        };
        this.breadcumbs = [
            { title: "Trang chủ", path: "/" },
            {
                title: "Theo dõi bệnh nhân",
                path: "/patient-tracking",
                active: true
            }
        ];
    }
    _detail(room) {
        let patientName = changeAlias(room.name);
        this.props.patientTrackingOnClick({
            roomId: room._id,
            patientName,
            patientId: room.patient
        });
    }
    render() {
        return (
            <div className="main-content">
                <div
                    style={{
                        height: "100%",
                        padding: 20
                    }}
                >
                    <div
                        style={{
                            // backgroundColor: "#fff",
                            height: "100%"
                            // borderStyle: "solid",
                            // borderWidth: 0.5
                        }}
                    >
                        <Breadcumbs
                            history={this.props.history}
                            data={this.breadcumbs}
                        />

                        <div className="inner-main-content">
                            <div className="content-area">
                                <div
                                    className="content-header"
                                    style={{
                                        borderWidth: 1,
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        paddingLeft: 12,
                                        borderBottomStyle: "solid",
                                        borderColor: "#000"
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 17,
                                            fontWeight: "800"
                                        }}
                                    >
                                        Bệnh nhân
                                    </span>
                                </div>

                                <Table
                                    data={this.props.data}
                                    fields={this.state.columns}
                                    detail={patient => this._detail(patient)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* dashboard */}
            </div>
        );
    }
}
export default MainContentHospitalBeds;
