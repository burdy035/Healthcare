import React, { Component } from "react";
import { Image, Row, Col } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faSortDown,
    faSortUp,
    faSignOutAlt,
    faPills
} from "@fortawesome/free-solid-svg-icons";

// import { doLogout } from "../../actions";

import "./styles.css";

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownVisible: false
        };
    }

    _showDropdown() {
        this.setState({
            dropdownVisible: !this.state.dropdownVisible
        });
    }
    async logout() {
        await localStorage.setItem("userId", "");

        await localStorage.setItem("userToken", "");

        this.props.history.push("/login");
    }
    render() {
        let { user } = this.props;
        let { role } = user;

        return (
            <div
                style={{
                    height: 50,
                    backgroundColor: "#FFFFFF",
                    alignItems: "center"
                    // border: "1px solid"
                }}
                ref={div => (this.topBar = div)}
            >
                <Row
                    style={{
                        marginLeft: 15,
                        marginRight: 15,
                        height: "100%",
                        // borderStyle: "solid",
                        alignItems: "center",
                        alignContent: "center"
                    }}
                >
                    <Col
                        md={7}
                        className="row"
                        style={{
                            height: "100%",
                            margin: 0,
                            padding: 0,
                            alignItems: "center",
                            alignContent: "center"
                        }}
                    >
                        {/* <Image
                            style={{
                                width: 39,
                                height: 39,
                                transform: `rotate(-30deg)`
                            }}
                            src="/education.png"
                        /> */}

                        <FontAwesomeIcon
                            style={{
                                width: 39,
                                height: 39,
                                transform: `rotate(-30deg)`,
                                color: "#D0C2D0"
                            }}
                            icon={faPills}
                        />
                        <p
                            style={{
                                padding: 0,
                                paddingLeft: 10,
                                margin: 0,
                                color: "#92a4c0"
                            }}
                        >
                            <strong style={{}}>Welcome to</strong> Hospital
                            Manenger System{" "}
                        </p>
                    </Col>

                    <div className="col-md-5 dropdown">
                        <div
                            className="row"
                            style={{
                                margin: 0,
                                padding: 0,
                                direction: "rtl",
                                alignItems: "center"
                            }}
                        >
                            <div
                                style={{
                                    marginLeft: 10,
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "flex-start"
                                }}
                            >
                                <button
                                    style={{
                                        border: "none"
                                    }}
                                    onClick={() => this._showDropdown()}
                                >
                                    <FontAwesomeIcon
                                        style={{}}
                                        icon={
                                            !this.state.dropdownVisible
                                                ? faSortDown
                                                : faSortUp
                                        }
                                    />
                                </button>
                            </div>
                            <div>
                                <div>
                                    <strong style={{ fontSize: 14 }}>
                                        {user.name}
                                    </strong>
                                </div>
                                <span style={{ fontSize: 12 }}>
                                    {role && role.value === "admin"
                                        ? "Admin"
                                        : role && role.value === "doctor"
                                        ? "Bác sỹ"
                                        : role && role.value === "manager"
                                        ? "Trưởng phòng"
                                        : "Y tá"}
                                </span>
                            </div>
                            <div>
                                <Image
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        marginRight: 15
                                    }}
                                    src={"/story.png"}
                                />
                            </div>

                            <div
                                className="logout-dropdown"
                                style={{
                                    position: "absolute",
                                    top: 43,
                                    right: 0,
                                    backgroundColor: "#fff",
                                    display: this.state.dropdownVisible
                                        ? "block"
                                        : "none"
                                }}
                            >
                                <button
                                    style={{
                                        padding: "5px 10px",
                                        border: "none"
                                    }}
                                    onClick={() => this.logout()}
                                >
                                    Logout
                                    <FontAwesomeIcon
                                        style={{ marginRight: 10 }}
                                        icon={faSignOutAlt}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </Row>
            </div>
        );
    }
}
export default Topbar;
