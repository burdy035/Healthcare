import React, { Component } from "react";
import "./styles.css";

class LoadingBar extends Component {
  render() {
    return this.props.isFetching ? <div className="loading-bar" /> : null;
  }
}
export default LoadingBar;
