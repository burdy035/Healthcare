import React, { Component } from "react";

import Breadcumbs from "../Breadcumbs";

import { Row } from "react-bootstrap";

import {
    BarChart,
    XAxis,
    YAxis,
    Bar,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faUsers,
//     faUserFriends,
//     faCopy,
//     faTable
// } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

import Calendar from "react-widgets/lib/Calendar";
import StatisticBlock from "./StatisticBlock";
import RecentActivities from "./RecentActivities";
import NoticeBoard from "./NoticeBoard";

class GlobalContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let breadcumbs = [
            { title: "Home", path: "/" },
            { title: "Dashboard", path: "/dashboard", active: true }
        ];

        const data = [
            { name: "Page A", uv: 4000, amt: 2400 },
            { name: "Page B", uv: 3000, amt: 2210 },
            { name: "Page C", uv: 2000, amt: 2290 },
            { name: "Page D", uv: 2780, amt: 2000 },
            { name: "Page E", uv: 1890, amt: 2181 },
            { name: "Page F", uv: 2390, amt: 2500 },
            { name: "Page G", uv: 3490, amt: 2100 }
        ];

        return (
            <div
                // style={{
                //     height: "calc(100vh - 50px)",
                //     backgroundColor: "#F0F1F3"
                // }}
                className="main-content"
            >
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
                        <Breadcumbs data={breadcumbs} />

                        <Row
                            style={{
                                padding: 0,
                                margin: 0,
                                paddingTop: 15,
                                paddingBottom: 15,
                                width: "100%",
                                height: "100%"
                                // borderStyle: "solid",
                                // borderWidth: 0.5
                            }}
                        >
                            <div
                                className="col"
                                style={{
                                    // borderStyle: "solid",
                                    // borderWidth: 0.5,

                                    height: "100%",
                                    display: "flex",
                                    flexFlow: "column",
                                    flex: 1,
                                    padding: 0,
                                    margin: 0
                                }}
                            >
                                <StatisticBlock />
                                <div
                                    className="dashboard-calendar"
                                    style={{
                                        marginTop: 20,
                                        backgroundColor: "#fff",
                                        display: "flex",
                                        flexDirection: "column",
                                        flex: 1
                                    }}
                                >
                                    <div
                                        style={{
                                            paddingLeft: 15,
                                            borderBottomStyle: "solid",
                                            borderWidth: 0.5,
                                            padding: 10,
                                            borderColor: "#DDDDDD",
                                            marginBottom: 10
                                        }}
                                    >
                                        <span
                                            style={{
                                                paddingTop: 5,
                                                paddingBottom: 5,
                                                fontSize: 17
                                            }}
                                        >
                                            <strong>Event Calendar</strong>
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            flex: 1,
                                            display: "flex",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Calendar
                                            dateFormat={dt =>
                                                String(dt.getDate())
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div
                                className="col"
                                style={{
                                    margin: 0,
                                    marginLeft: 20,
                                    padding: 0,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column"
                                    // backgroundColor: "#fff"
                                }}
                            >
                                <div style={{ backgroundColor: "#fff" }}>
                                    <div
                                        style={{
                                            paddingLeft: 15,
                                            borderBottomStyle: "solid",
                                            borderWidth: 0.5,
                                            padding: 10,
                                            borderColor: "#DDDDDD",
                                            marginBottom: 10
                                        }}
                                    >
                                        <span
                                            style={{
                                                paddingTop: 5,
                                                paddingBottom: 5,
                                                fontSize: 17
                                            }}
                                        >
                                            <strong>
                                                Number of students each year
                                            </strong>
                                        </span>
                                    </div>
                                    <ResponsiveContainer
                                        width="100%"
                                        aspect={4.0 / 1.8}
                                    >
                                        <BarChart height={220} data={data}>
                                            <XAxis dataKey="name" />
                                            <YAxis dataKey="uv" />
                                            <Tooltip />
                                            <Legend
                                                content={() => (
                                                    <span>
                                                        Number of students
                                                    </span>
                                                )}
                                                align="center"
                                                wrapperStyle={{
                                                    textAlign: "center"
                                                }}
                                            />
                                            {/* <Legend /> */}
                                            <Bar
                                                dataKey="uv"
                                                fill="#FFD34D"
                                                barSize={30}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div
                                    style={{
                                        marginTop: 20,
                                        display: "flex",
                                        flex: 1
                                    }}
                                >
                                    <NoticeBoard />
                                    <RecentActivities />
                                </div>
                            </div>
                        </Row>
                    </div>
                </div>
                {/* dashboard */}
            </div>
        );
    }
}
export default GlobalContainer;
