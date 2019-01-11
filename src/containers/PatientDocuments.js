import React, { Component } from "react";
import { connect } from "react-redux";

import Topbar from "../components/Topbar";

import Sidebar from "../components/Sidebar";

import Notice from "../components/Notice";

import MainContentPatientDocuments from "../components/MainContent/PatientDocuments";

import {
    doGetDocuments,
    doAddDocument,
    doGetHeartDiseaseRate,
    doGetDocumentsForm,
    doEditDocument,
    doDeleteDocument
} from "../actions";

class PatientDocument extends Component {
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
            this.props.dispatch(doGetDocuments());
            this.props.dispatch(doGetDocumentsForm());
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoggedIn) {
            this.props.history.push("/login");
        }

        if (nextProps.successMessage) {
            this.setState({
                messageDisplay: true,
                messageType: "success",
                message: nextProps.successMessage
            });
        }

        if (nextProps.errorMessage) {
            this.setState({
                messageDisplay: true,
                messageType: "error",
                message: nextProps.errorMessage
            });
        }
    }

    _addDocument(values) {
        this.props.dispatch(doAddDocument(values));
    }

    _editDocument(values) {
        this.props.dispatch(doEditDocument(values));
    }

    _getHeartDiseaseRate(id) {
        this.props.dispatch(doGetHeartDiseaseRate(id));
    }
    _deleteDocuments(ids) {
        this.props.dispatch(doDeleteDocument(ids));
    }
    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <Notice
                    display={this.state.messageDisplay}
                    type={this.state.messageType}
                    message={this.state.message}
                />
                <Sidebar user={this.props.user} history={this.props.history} />
                <div style={{ height: "100%", marginLeft: 220 }}>
                    <Topbar
                        user={this.props.user}
                        history={this.props.history}
                    />

                    <MainContentPatientDocuments
                        user={this.props.user}
                        history={this.props.history}
                        data={this.props.documentsList}
                        addDocument={values => this._addDocument(values)}
                        editDocument={values => this._editDocument(values)}
                        deleteDocuments={ids => this._deleteDocuments(ids)}
                        getHeartDiseaseRate={id =>
                            this._getHeartDiseaseRate(id)
                        }
                        heartDiseaseRate={this.props.heartDiseaseRate}
                        patientStates={this.props.patientStates}
                        editDocumentSuccess={this.props.editDocumentSuccess}
                        doctors={this.props.doctors}
                        nurses={this.props.nurses}
                        majors={this.props.majors}
                        addDocumentSuccess={this.props.addDocumentSuccess}
                    />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth, documents }) => {
    return {
        user: auth.user,
        successMessage: documents.successMessage,
        errorMessage: documents.errorMessage,
        isLoggedIn: auth.isLoggedIn,
        documentsList: documents.documentsList,
        heartDiseaseRate: documents.heartDiseaseRate,
        patientStates: documents.patientStates,
        editDocumentSuccess: documents.editDocumentSuccess,
        doctors: documents.doctors,
        nurses: documents.nurses,
        majors: documents.majors,
        addDocumentSuccess: documents.addDocumentSuccess
    };
};
export default connect(mapStateToProps)(PatientDocument);
