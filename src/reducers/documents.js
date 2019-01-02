import {
    ADD_DOCUMENT,
    ADD_DOCUMENT_SUCCESS,
    GET_PATIENT_DOCUMENTS,
    GET_PATIENT_DOCUMENTS_SUCCESS,
    GET_HEART_DISEASE_RATE,
    GET_HEART_DISEASE_RATE_SUCCESS,
    GET_HEART_DISEASE_RATE_FAIL,
    GET_DOCUMENTS_FORM,
    GET_DOCUMENTS_FORM_FAIL,
    GET_DOCUMENTS_FORM_SUCCESS,
    EDIT_DOCUMENT,
    EDIT_DOCUMENT_SUCCESS,
    EDIT_DOCUMENT_FAIL,
    DELETE_DOCUMENT,
    DELETE_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_FAIL
} from "../actions";

const defaultState = {
    isFetching: false,
    documentsList: [],
    heartDiseaseRate: "0%",
    patientStates: [],
    doctors: [],
    nurses: [],
    majors: []
};

export default function searching(state = defaultState, action) {
    switch (action.type) {
        case GET_PATIENT_DOCUMENTS:
            return {
                ...state,
                isFetching: true
            };
        case GET_PATIENT_DOCUMENTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                documentsList: action.payload.documentsList,
                majors: action.payload.majors
            };
        case ADD_DOCUMENT:
            return {
                ...state,
                isFetching: true
            };
        case ADD_DOCUMENT_SUCCESS:
            return {
                ...state,
                isFetching: true,
                documentsList: [
                    ...action.payload.patientDocuments,
                    ...state.documentsList
                ]
            };
        case GET_HEART_DISEASE_RATE:
            return {
                ...state,
                isFetching: true
            };
        case GET_HEART_DISEASE_RATE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                heartDiseaseRate: action.payload.heartDiseaseRate
            };

        case GET_HEART_DISEASE_RATE_FAIL:
            return {
                ...state,
                isFetching: false
            };

        case GET_DOCUMENTS_FORM:
            return {
                ...state,
                isFetching: true
            };
        case GET_DOCUMENTS_FORM_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case GET_DOCUMENTS_FORM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                patientStates: action.payload.patientStates,
                doctors: action.payload.doctors,
                nurses: action.payload.nurses
            };
        case EDIT_DOCUMENT:
            return {
                ...state,
                isFetching: true
            };
        case EDIT_DOCUMENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                documentsList: action.payload.documentsList,
                editDocumentSuccess: true
            };
        case EDIT_DOCUMENT_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case DELETE_DOCUMENT:
            return {
                ...state,
                isFetching: true
            };
        case DELETE_DOCUMENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                documentsList: action.payload.documentsList
            };
        case DELETE_DOCUMENT_FAIL:
            return {
                ...state,
                isFetching: false
            };
        default:
            return {
                ...state
            };
    }
}
