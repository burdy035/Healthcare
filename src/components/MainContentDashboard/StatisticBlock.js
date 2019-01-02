import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faUserFriends,
    faCopy,
    faTable
} from "@fortawesome/free-solid-svg-icons";

import styles from "./styles";

class StatisticBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={{}}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <div
                        style={{
                            ...styles.statisticContainer,
                            marginRight: 20
                        }}
                    >
                        <div style={styles.statisticBlock}>
                            <div style={styles.statisticLeft}>
                                <FontAwesomeIcon
                                    style={{
                                        color: "#8BC24A",
                                        ...styles.statisticIcon
                                    }}
                                    icon={faUsers}
                                />
                            </div>

                            <div style={styles.statisticRight}>
                                <span style={{ fontSize: 29 }}>50,000</span>
                            </div>
                        </div>
                    </div>
                    <div style={styles.statisticContainer}>
                        <div style={styles.statisticBlock}>
                            <div style={styles.statisticLeft}>
                                <FontAwesomeIcon
                                    style={{
                                        color: "#1D88E5",
                                        ...styles.statisticIcon
                                    }}
                                    icon={faUserFriends}
                                />
                            </div>

                            <div style={styles.statisticRight}>
                                <span style={{ fontSize: 29 }}>50,000</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <div
                        style={{
                            ...styles.statisticContainer,
                            marginRight: 20
                        }}
                    >
                        <div style={styles.statisticBlock}>
                            <div style={styles.statisticLeft}>
                                <FontAwesomeIcon
                                    style={{
                                        color: "#FDCD05",
                                        ...styles.statisticIcon
                                    }}
                                    icon={faCopy}
                                />
                            </div>

                            <div style={styles.statisticRight}>
                                <span style={{ fontSize: 29 }}>50,000</span>
                            </div>
                        </div>
                    </div>
                    <div style={styles.statisticContainer}>
                        <div style={styles.statisticBlock}>
                            <div style={styles.statisticLeft}>
                                <FontAwesomeIcon
                                    style={{
                                        color: "#E81E63",
                                        ...styles.statisticIcon
                                    }}
                                    icon={faTable}
                                />
                            </div>

                            <div style={styles.statisticRight}>
                                <span style={{ fontSize: 29 }}>50,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default StatisticBlock;
