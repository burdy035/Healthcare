import React, { Component } from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

import MainContentPatients from "../components/MainContent/Patients";

import { getPatientsTrackingList } from "../actions";

class Patients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toastrType: "success"
        };
    }
    componentDidMount() {
        const { isAuthenticated } = this.props.auth;

        if (!isAuthenticated()) {
            this.props.history.push("/login");
        } else {
            this.props.dispatch(getPatientsTrackingList());
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoggedIn) {
            this.props.history.push("/login");
        }
    }

    _patientTrackingOnClick(params) {
        this.props.history.push({
            pathname: `/patient-tracking/${params.patientName}`,
            state: {
                ...params
            }
        });
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
                    <MainContentPatients
                        history={this.props.history}
                        data={this.props.patientsTrackingList}
                        patientTrackingOnClick={params =>
                            this._patientTrackingOnClick(params)
                        }
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, patients }) => {
    return {
        user: auth.user,
        isLoggedIn: auth.isLoggedIn,
        patientsTrackingList: patients.patientsTrackingList
    };
};
export default connect(mapStateToProps)(Patients);
