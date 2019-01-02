import React, { Component } from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {} from "@fortawesome/free-solid-svg-icons";

import Breadcumbs from "../../Breadcumbs";

import ChangePassword from "./ChangePassword";

import InfoDetail from "./InfoDetail";

import Duty from "./Duty";

import FollowingPatients from "./FollowingPatients";

import "./styles.css";

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.breadcumbs = [
            { title: "Trang chủ", path: "/" },
            {
                title: "Theo dõi bệnh nhân",
                path: "/patient-tracking",
                active: true
            }
        ];
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}
    render() {
        return (
            <div className="main-content" style={{ height: "100%" }}>
                <div
                    className="main-content-padding-20"
                    style={{ paddingBottom: 0 }}
                >
                    <div>
                        <Breadcumbs data={this.breadcumbs} />

                        <div className="inner-main-content">
                            <div className="user-detail-left-block">
                                <FollowingPatients
                                    followingPatients={
                                        this.props.followingPatients
                                    }
                                    patientOnclick={params =>
                                        this.props.patientOnclick(params)
                                    }
                                />
                                <InfoDetail
                                    userDetail={this.props.userDetail}
                                />
                            </div>

                            <div className="user-detail-right-block">
                                <Duty userDuties={this.props.userDuties} />
                                <ChangePassword
                                    changePassword={values =>
                                        this.props.changePassword(values)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserDetail;
