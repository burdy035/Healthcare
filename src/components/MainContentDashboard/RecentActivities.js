import React, { Component } from "react";

import HeaderBoard from "./HeaderBoard";

import { randomColor } from "../../services/randomColor";

import styles from "./styles";

import "./styles.css";

class RecentActivities extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div
                style={{
                    marginLeft: 20,
                    backgroundColor: "#fff",
                    height: "100%",
                    flex: 0.5,
                    width: "50%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <HeaderBoard content="Recent Activities" />
                <div
                    className="activity-feed"
                    style={{
                        flex: 1,
                        padding: 10,
                        position: "relative",
                        overflowY: "auto"
                    }}
                >
                    <div className="feed-item" style={{}}>
                        <div
                            className="circle"
                            style={{
                                ...styles.noticeCircle,
                                borderColor: randomColor()
                            }}
                        >
                            {""}
                        </div>
                        <div className="date">9 mins ago</div>
                        <div className="text">You Delete Abc xyz</div>
                    </div>
                    <div className="feed-item" style={{}}>
                        <div
                            className="circle"
                            style={{
                                ...styles.noticeCircle,
                                borderColor: randomColor()
                            }}
                        >
                            {""}
                        </div>
                        <div className="date">9 mins ago</div>
                        <div className="text">You Delete Abc xyz</div>
                    </div>
                    <div className="feed-item" style={{}}>
                        <div
                            className="circle"
                            style={{
                                ...styles.noticeCircle,
                                borderColor: randomColor()
                            }}
                        >
                            {""}
                        </div>
                        <div className="date">9 mins ago</div>
                        <div className="text">You Delete Abc xyz</div>
                    </div>
                    <div className="feed-item" style={{}}>
                        <div
                            className="circle"
                            style={{
                                ...styles.noticeCircle,
                                borderColor: randomColor()
                            }}
                        >
                            {""}
                        </div>
                        <div className="date">9 mins ago</div>
                        <div className="text">You Delete Abc xyz</div>
                    </div>
                    <div className="feed-item" style={{}}>
                        <div
                            className="circle"
                            style={{
                                ...styles.noticeCircle,
                                borderColor: randomColor()
                            }}
                        >
                            {""}
                        </div>
                        <div className="date">9 mins ago</div>
                        <div className="text">You Delete Abc xyz</div>
                    </div>
                    <div className="feed-item" style={{}}>
                        <div
                            className="circle"
                            style={{
                                ...styles.noticeCircle,
                                borderColor: randomColor()
                            }}
                        >
                            {""}
                        </div>
                        <div className="date">9 mins ago</div>
                        <div className="text">You Delete Abc xyz</div>
                    </div>
                    <div className="feed-item" style={{}}>
                        <div
                            className="circle"
                            style={{
                                ...styles.noticeCircle,
                                borderColor: randomColor()
                            }}
                        >
                            {""}
                        </div>
                        <div className="date">9 mins ago</div>
                        <div className="text">You Delete Abc xyz</div>
                    </div>
                    <div className="feed-item" style={{}}>
                        <div
                            className="circle"
                            style={{
                                ...styles.noticeCircle,
                                borderColor: randomColor()
                            }}
                        >
                            {""}
                        </div>
                        <div className="date">9 mins ago</div>
                        <div className="text">You Delete Abc xyz</div>
                    </div>
                    <div className="feed-item" style={{}}>
                        <div
                            className="circle"
                            style={{
                                ...styles.noticeCircle,
                                borderColor: randomColor()
                            }}
                        >
                            {""}
                        </div>
                        <div className="date">9 mins ago</div>
                        <div className="text">You Delete Abc xyz</div>
                    </div>
                    <div className="feed-item" style={{}}>
                        <div
                            className="circle"
                            style={{
                                ...styles.noticeCircle,
                                borderColor: randomColor()
                            }}
                        >
                            {""}
                        </div>
                        <div className="date">9 mins ago</div>
                        <div className="text">You Delete Abc xyz</div>
                    </div>
                    <div className="feed-item" style={{}}>
                        <div
                            className="circle"
                            style={{
                                ...styles.noticeCircle,
                                borderColor: randomColor()
                            }}
                        >
                            {""}
                        </div>
                        <div className="date">9 mins ago</div>
                        <div className="text">You Delete Abc xyz</div>
                    </div>
                    <div className="feed-item" style={{}}>
                        <div
                            className="circle"
                            style={{
                                ...styles.noticeCircle,
                                borderColor: randomColor()
                            }}
                        >
                            {""}
                        </div>
                        <div className="date">9 mins ago</div>
                        <div className="text">You Delete Abc xyz</div>
                    </div>
                    <div className="feed-item" style={{}}>
                        <div
                            className="circle"
                            style={{
                                ...styles.noticeCircle,
                                borderColor: randomColor()
                            }}
                        >
                            {""}
                        </div>
                        <div className="date">9 mins ago</div>
                        <div className="text">You Delete Abc xyz</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default RecentActivities;
