import React, { Component } from "react";
import { connect } from "react-redux";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toastrType: "success"
        };
    }
    async componentDidMount() {
        await localStorage.setItem("userId", "");

        await localStorage.setItem("userToken", "");

        this.props.history.push("/login");
    }

    render() {
        return <div style={{ width: "100%", height: "100%" }} />;
    }
}
const mapStateToProps = ({ auth, users }) => {
    return {
        user: auth.user,
        isLoggedIn: auth.isLoggedIn
    };
};
export default connect(mapStateToProps)(Users);
