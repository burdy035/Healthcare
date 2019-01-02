import React, { Component } from "react";
import { connect } from "react-redux";

// import { checkUserAuthentication } from "../actions";

import HomeMainContent from "../components/MainContent/Home";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

import { doGetDuties } from "../actions";

import Notice from "../components/Notice";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { isAuthenticated } = this.props.auth;

        if (!isAuthenticated()) {
            this.props.history.push("/login");
        } else {
            this.props.dispatch(doGetDuties(new Date().getMonth() + 1));
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn === false) {
            this.props.history.push("/login");
        }
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                {/* <Notice
                    display={true}
                    type={"success"}
                    message={this.state.message}
                /> */}
                <Sidebar user={this.props.user} history={this.props.history} />
                <div style={{ height: "100%", marginLeft: 220 }}>
                    <Topbar
                        user={this.props.user}
                        history={this.props.history}
                    />
                    <HomeMainContent
                        history={this.props.history}
                        duties={this.props.duties}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, home }) => {
    return {
        user: auth.user,
        isLoggedIn: auth.isLoggedIn,
        loginSuccess: auth.loginSuccess,
        duties: home.duties
    };
};
export default connect(mapStateToProps)(Home);
