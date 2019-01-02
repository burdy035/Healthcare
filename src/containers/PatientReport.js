import React, { Component } from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

import MainContentPatientReport from "../components/MainContent/PatientReport";

import {
    doGetPatientReport,
    doGetTemperatureChartData,
    doGetHrData
} from "../actions";

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

            const id = state.id || "";

            if (!id) {
                history.push("/patients");
            } else {
                this.setState({
                    patientId: id
                });
                console.log(state);
                this.props.dispatch(doGetPatientReport({ patientId: id }));
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoggedIn) {
            this.props.history.push("/login");
        }
    }

    _getTemperatureChartData(values) {
        console.log(values);
        values.patientId = this.state.patientId;
        this.props.dispatch(doGetTemperatureChartData(values));
    }

    _getHrData(values) {
        console.log(values);
        values.patientId = this.state.patientId;
        this.props.dispatch(doGetHrData(values));
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
                    <MainContentPatientReport
                        history={this.props.history}
                        beforeParams={this.props.beforeParams}
                        updateParams={this.props.updateParams}
                        hrData={this.props.hrData}
                        temData={this.props.temData}
                        afPredictRate={this.props.afPredictRate}
                        hdPrediction={this.props.hdPrediction}
                        getTemperatureChartData={values =>
                            this._getTemperatureChartData(values)
                        }
                        getHrData={values => this._getHrData(values)}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, report }) => {
    return {
        user: auth.user,
        isLoggedIn: auth.isLoggedIn,
        beforeParams: report.beforeParams,
        updateParams: report.updateParams,
        hrData: report.hrData,
        temData: report.temData,
        afPredictRate: report.afPredictRate,
        hdPrediction: report.hdPrediction
    };
};
export default connect(mapStateToProps)(PatientTracking);
