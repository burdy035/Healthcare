import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faCheckCircle,
    faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.display) {
            const display = { nextProps };

            if (display) {
                this.setState({
                    isVisible: true
                });
                setTimeout(() => {
                    this.setState({
                        isVisible: false
                    });
                }, 5000);
            }
        }
    }

    render() {
        return (
            <div
                className="notice-container-1"
                style={{
                    display: this.state.isVisible ? "block" : "none",
                    backgroundColor:
                        this.props.type === "error" ? "#ff3547" : "#00c851"
                }}
            >
                <div className="notice-inner-1">
                    <FontAwesomeIcon
                        style={{ fontSize: 22, marginRight: 15 }}
                        icon={
                            this.props.type === "error"
                                ? faExclamationCircle
                                : faCheckCircle
                        }
                    />

                    <span style={{ fontSize: 14 }}>
                        {this.props.message
                            ? this.props.message
                            : this.props.type === "error"
                            ? "Error Message!!"
                            : "Success Message!!"}
                    </span>
                </div>
            </div>
        );
    }
}
export default Notice;
