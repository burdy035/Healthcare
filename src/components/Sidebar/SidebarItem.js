import React, { Component } from "react";

import { Row, Col } from "react-bootstrap";

import { ChevronRight } from "@material-ui/icons";

import "./styles.css";

class SideBarItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div
                onClick={() => {
                    this.props.history.push({
                        pathname: this.props.link,
                        state: {
                            ...this.props.state
                        }
                    });
                }}
                style={{
                    textDecoration: "none",
                    cursor: "pointer"
                }}
            >
                <Row
                    style={{
                        borderStyle: "solid",
                        borderColor: "#1b3c59",
                        borderWidth: 0.2,
                        borderTopColor: "transparent",
                        borderLeftColor: "transparent",
                        borderRightColor: "transparent",
                        width: 190,
                        margin: 0,
                        color: "#fff",
                        // justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: 10,
                        paddingBottom: 10
                    }}
                >
                    <Col
                        style={{
                            marginLeft: 26,
                            justifyContent: "flex-start"
                        }}
                    >
                        {this.props.content}
                    </Col>
                    <Col
                        style={{
                            position: "absolute",
                            right: 20,
                            alignItems: "center"
                        }}
                    >
                        <ChevronRight style={{ fontSize: 14 }} />
                    </Col>
                </Row>
            </div>
        );
    }
}
export default SideBarItem;
