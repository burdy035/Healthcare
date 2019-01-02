import React, { Component } from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

import MainContentPatientTracking from "../components/MainContent/PatientTracking";

import { patientTracking, doGetAFPRediction } from "../actions";

class PatientTracking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toastrType: "success"
        };
    }
    componentDidMount() {
        const { history } = this.props;
        const { isAuthenticated } = this.props.auth;

        if (!isAuthenticated()) {
            history.push("/login");
        } else {
            const { state } = history.location;

            const { roomId, patientName, patientId } = state;

            if (!roomId) {
                history.push("/patients");
            } else {
                this.setState({
                    patientName: patientName,
                    patientId: patientId
                });

                this.props.dispatch(patientTracking(roomId));
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoggedIn) {
            this.props.history.push("/login");
        }
    }

    _getAfPrediction(values) {
        this.props.dispatch(doGetAFPRediction(values));
    }

    _patientReportOnClick() {
        this.props.history.push({
            pathname: `/patient-report/${this.state.patientName}`,
            state: { id: this.state.patientId }
        });
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <MainContentPatientTracking
                    params={{ name: this.state.patientName }}
                    user={this.props.user}
                    history={this.props.history}
                    gotPrediction={this.props.gotPrediction}
                    getAfPrediction={values => this._getAfPrediction(values)}
                    patientReportOnClick={() => this._patientReportOnClick()}
                />
            </div>
        );
    }
}
const mapStateToProps = ({ auth, patientTracking }) => {
    return {
        user: auth.user,
        isLoggedIn: auth.isLoggedIn,
        patientTrackingConnect: patientTracking.patientTrackingConnect,
        gotPrediction: patientTracking.gotPrediction
    };
};
export default connect(mapStateToProps)(PatientTracking);
