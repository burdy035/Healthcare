import React, { Component } from "react";

import SidebarItem from "./SidebarItem";

import HomeLogo from "../HomeLogo";

import { changeAlias } from "../../utils";

import "./styles.css";

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { user } = this.props;
        let { role } = user;
        return (
            <div
                style={{
                    backgroundColor: "#042954",
                    height: "100%",
                    width: 220,
                    maxWidth: 220,
                    float: "left",
                    position: "fixed",
                    top: 0,
                    bottom: 0
                }}
            >
                <HomeLogo history={this.props.history} />

                {/* <SidebarItem
                    history={this.props.history}
                    content="Dashboard"
                    link="/dashboard"
                /> */}
                <SidebarItem
                    history={this.props.history}
                    content="Trang chủ"
                    link="/home"
                />
                {(role && role.value === "admin") ||
                (role && role.value === "manager") ? (
                    <SidebarItem
                        history={this.props.history}
                        content="Trực"
                        link="/add-duty"
                    />
                ) : null}

                {role && role.value === "admin" ? null : user.name ? (
                    <SidebarItem
                        history={this.props.history}
                        content="Cá nhân"
                        link={`/user/${changeAlias(user.name)}`}
                        state={{
                            userId: user._id
                        }}
                    />
                ) : null}

                <SidebarItem
                    history={this.props.history}
                    content="Theo dõi bệnh nhân"
                    link="/patients"
                />
                <SidebarItem
                    history={this.props.history}
                    content="Hồ sơ bệnh nhân"
                    link="/documents"
                />
                <SidebarItem
                    history={this.props.history}
                    content="Phòng bệnh"
                    link="/rooms"
                />
                <SidebarItem
                    history={this.props.history}
                    content="Quản lí thiết bị"
                    link="/devices"
                />
                <SidebarItem
                    history={this.props.history}
                    content="Nhân sự"
                    link="/users"
                />
                {role && role.value !== "admin" ? null : (
                    <SidebarItem
                        history={this.props.history}
                        content="Cài đặt"
                        link="/settings"
                    />
                )}
            </div>
        );
    }
}
export default MainContent;
