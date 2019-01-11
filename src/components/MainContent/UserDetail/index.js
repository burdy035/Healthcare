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
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {}
    render() {
        let breadcumbs = [
            { title: "Trang chủ", path: "/" },
            {
                title: "Quản lý nhân sự",
                path: "/users"
            },
            {
                title: this.props.userDetail.name,
                active: true,
                path: "/"
            }
        ];
        return (
            <div className="main-content" style={{ height: "100%" }}>
                <div
                    className="main-content-padding-20"
                    style={{ paddingBottom: 0 }}
                >
                    <div>
                        <Breadcumbs
                            history={this.props.history}
                            data={breadcumbs}
                        />

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
                                    user={this.props.user}
                                    majors={this.props.majors}
                                    changeDetail={values =>
                                        this.props.changeDetail(values)
                                    }
                                />
                            </div>

                            <div className="user-detail-right-block">
                                <Duty userDuties={this.props.userDuties} />
                                <ChangePassword
                                    userDetail={this.props.userDetail}
                                    changePassword={values =>
                                        this.props.changePassword(values)
                                    }
                                    user={this.props.user}
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
