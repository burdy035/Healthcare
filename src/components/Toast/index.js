import React, { Component } from "react";

import { ToastContainer } from "mdbreact";
import "./styles.css";

class LoadingBar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        let toast = this.props.toastType;
        switch (toast) {
            case "success":
                return (
                    <ToastContainer
                        hideProgressBar={true}
                        newestOnTop={true}
                        autoClose={3000}
                        className={"toast-container"}
                        toastClassName={`toast toast-success`}
                        bodyClassName={"toast-message"}
                    />
                );
            case "error":
                return (
                    <ToastContainer
                        hideProgressBar={true}
                        newestOnTop={true}
                        autoClose={3000}
                        className={"toast-container"}
                        toastClassName={`toast toast-error`}
                        bodyClassName={"toast-message"}
                    />
                );
            default:
                return (
                    <ToastContainer
                        hideProgressBar={true}
                        newestOnTop={true}
                        autoClose={3000}
                        className={"toast-container"}
                        toastClassName={`toast toast-success`}
                        bodyClassName={"toast-message"}
                    />
                );
        }
    }
}
export default LoadingBar;
