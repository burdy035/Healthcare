import React, { Component } from "react";
import { connect } from "react-redux";

class Cont extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}
const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user
    };
};
export default connect(mapStateToProps)(Cont);
