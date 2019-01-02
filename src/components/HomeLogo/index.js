import React, { Component } from "react";

import { Row, Col } from "react-bootstrap";

import { IconButton } from "@material-ui/core";

import { Menu } from "@material-ui/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

class HomeLogo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _homeOnPress() {
        this.props.history.push("/home");
    }
    render() {
        return (
            <Row
                style={{
                    backgroundColor: "#FDC500",
                    margin: "auto",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 50
                }}
            >
                <div
                    href="/home"
                    style={{
                        cursor: "pointer",
                        marginLeft: 26,
                        color: "#000",
                        justifyContent: "flex-start",
                        textDecoration: "none"
                    }}
                    onClick={() => this._homeOnPress()}
                >
                    <FontAwesomeIcon
                        style={{
                            fontSize: "19",
                            paddingRight: 5
                        }}
                        icon={faHeartbeat}
                    />
                    <strong style={{ fontSize: 17, fontWeight: 550 }}>
                        Hos
                    </strong>
                </div>

                <Col style={{ paddingRight: 10, paddingLeft: 10 }}>
                    <IconButton>
                        <Menu style={{ color: "#fff" }} />
                    </IconButton>
                </Col>
            </Row>
        );
    }
}
export default HomeLogo;
