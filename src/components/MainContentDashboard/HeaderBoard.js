import React, { Component } from "react";

class HeaderBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div
                style={{
                    paddingLeft: 15,
                    borderBottomStyle: "solid",
                    borderWidth: 0.5,
                    padding: 10,
                    borderColor: "#DDDDDD"
                }}
            >
                <span
                    style={{
                        paddingTop: 5,
                        paddingBottom: 5,
                        fontSize: 17
                    }}
                >
                    <strong>{this.props.content}</strong>
                </span>
            </div>
        );
    }
}
export default HeaderBoard;
