import React, { Component } from "react";

import HeaderBoard from "./HeaderBoard";
import { randomColor } from "../../services/randomColor";

class NoticeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    date() {
        let date = new Date();
        return date.toString();
    }
    render() {
        return (
            <div
                style={{
                    backgroundColor: "#fff",
                    height: "100%",
                    flex: 0.5,
                    width: "50%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <HeaderBoard content="Notice board" />
                <div
                    className="notice-board"
                    style={{ padding: 10, flex: 1, overflowY: "auto" }}
                >
                    <div style={{ marginTop: 10 }}>
                        <div className="notice-date">
                            <span style={{ color: "#8c96a3", fontSize: 13 }}>
                                {"16 May, 2018"}
                            </span>{" "}
                        </div>
                        <div className="notice-name">
                            <span
                                style={{
                                    fontWeight: "550",

                                    color: randomColor()
                                }}
                            >
                                Teacher Thao
                            </span>
                            <span style={{ color: "#8c96a3", fontSize: 13 }}>
                                {"   "}9 mins ago
                            </span>
                        </div>
                        <div className="notice-content">
                            Greate school management
                        </div>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <div className="notice-date">
                            <span style={{ color: "#8c96a3", fontSize: 13 }}>
                                {"16 May, 2018"}
                            </span>{" "}
                        </div>
                        <div className="notice-name">
                            <span
                                style={{
                                    fontWeight: "550",

                                    color: randomColor()
                                }}
                            >
                                Teacher Thao
                            </span>
                            <span style={{ color: "#8c96a3", fontSize: 13 }}>
                                {"   "}9 mins ago
                            </span>
                        </div>
                        <div className="notice-content">
                            Greate school management
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default NoticeBoard;
