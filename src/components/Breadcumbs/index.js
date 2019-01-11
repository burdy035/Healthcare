import React, { Component } from "react";

class Breadcumbs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //
    }

    render() {
        let data = this.props.data;
        return (
            <div className="breadcumbs">
                {this.props.data.map((item, index) => {
                    if (!item.active) {
                        if (index === data.length - 1) {
                            return (
                                <span
                                    onClick={() => {
                                        this.props.history.push({
                                            pathname: item.path,
                                            state: item.state
                                        });
                                    }}
                                    style={{
                                        textDecoration: "none",
                                        cursor: "pointer",
                                        color: "#2979ff"
                                    }}
                                >
                                    {item.title}
                                </span>
                            );
                        } else {
                            return (
                                <span key={index}>
                                    <span
                                        onClick={() => {
                                            this.props.history.push({
                                                pathname: item.path,
                                                state: item.state
                                            });
                                        }}
                                        style={{
                                            textDecoration: "none",
                                            cursor: "pointer",
                                            color: "#2979ff"
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                    <span> - </span>
                                </span>
                            );
                        }
                    } else {
                        if (index === this.props.data.length - 1) {
                            return <span key={index}>{item.title}</span>;
                        } else {
                            return <span key={index}>{item.title} - </span>;
                        }
                    }
                })}
            </div>
        );
    }
}
export default Breadcumbs;
