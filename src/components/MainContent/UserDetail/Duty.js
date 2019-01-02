import React, { Component } from "react";

import Calendar from "./Calendar";

class Duty extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="duty-calendar">
                <div className="content-header">
                    <span className="content-header-text">Lịch trực</span>

                    <div />
                </div>

                <div className="duty-container">
                    <Calendar duties={this.props.userDuties} />
                </div>
            </div>
        );
    }
}

export default Duty;
