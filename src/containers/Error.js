import React, { Component } from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

class Error extends Component {
    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoggedIn) {
            this.props.history.push("/login");
        }
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <Sidebar user={this.props.user} history={this.props.history} />
                <div style={{ height: "100%", marginLeft: 220 }}>
                    <Topbar
                        user={this.props.user}
                        history={this.props.history}
                    />
                    <div
                        style={{
                            height: "100%",
                            marginBottom: 0,
                            bottom: 0,
                            backgroundColor: "#F0F1F3"
                        }}
                    >
                        <div
                            className="content-wrap"
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "table",
                                position: "relative",
                                backgroundImage: "url(book.jpeg)",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover"
                            }}
                        >
                            <div
                                className="shadow-overlay"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    opacity: 0.9,
                                    background:
                                        "linear-gradient(to right, #AAAAAA 0%, #AAAAAA 20%, transparent 100%)"
                                }}
                            />

                            <div
                                // className="main-content"
                                style={{
                                    verticalAlign: "middle",
                                    zIndex: 700,
                                    position: "relative"
                                }}
                            >
                                <div
                                    className="row"
                                    style={{
                                        padding: 0,
                                        paddingLeft: 50,
                                        paddingTop: 50,
                                        margin: 0
                                    }}
                                >
                                    <div className="col-twelve">
                                        <h1 className="kern-this">
                                            404 Error.
                                        </h1>
                                        <p
                                            style={{
                                                maxWidth: 380,
                                                color: "#000"
                                            }}
                                        >
                                            Oooooops! Looks like nothing was
                                            found at this location. Maybe try on
                                            of the menu besides, click on the
                                            top menu or try a search?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        isLoggedIn: auth.isLoggedIn,
        user: auth.user
    };
};
export default connect(mapStateToProps)(Error);
