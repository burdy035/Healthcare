export const GET_PATIENT_DOCUMENTS = "GET_PATIENT_DOCUMENTS";

export const GET_PATIENT_DOCUMENTS_FAIL = "GET_PATIENT_DOCUMENTS_FAIL";

export const GET_PATIENT_DOCUMENTS_SUCCESS = "GET_PATIENT_DOCUMENTS_SUCCESS";

export const ADD_DOCUMENT = "ADD_DOCUMENT";

export const ADD_DOCUMENT_FAIL = "ADD_DOCUMENT_FAIL";

export const ADD_DOCUMENT_SUCCESS = "ADD_DOCUMENT_SUCCESS";

export const GET_HEART_DISEASE_RATE = "GET_HEART_DISEASE_RATE";

export const GET_HEART_DISEASE_RATE_FAIL = "GET_HEART_DISEASE_RATE_FAIL";

export const GET_HEART_DISEASE_RATE_SUCCESS = "GET_HEART_DISEASE_RATE_SUCCESS";

export const GET_DOCUMENTS_FORM = "GET_DOCUMENTS_FORM";

export const GET_DOCUMENTS_FORM_FAIL = "GET_DOCUMENTS_FORM_FAIL";

export const GET_DOCUMENTS_FORM_SUCCESS = "GET_DOCUMENTS_FORM_SUCCESS";

export const EDIT_DOCUMENT = "EDIT_DOCUMENT";

export const EDIT_DOCUMENT_FAIL = "EDIT_DOCUMENT_FAIL";

export const EDIT_DOCUMENT_SUCCESS = "EDIT_DOCUMENT_SUCCESS";

export const DELETE_DOCUMENT = "DELETE_DOCUMENT";

export const DELETE_DOCUMENT_FAIL = "DELETE_DOCUMENT_FAIL";

export const DELETE_DOCUMENT_SUCCESS = "DELETE_DOCUMENT_SUCCESS";

export const doGetDocuments = () => {
    return {
        type: GET_PATIENT_DOCUMENTS
    };
};

export const doAddDocument = values => {
    return {
        type: ADD_DOCUMENT,
        payload: { ...values }
    };
};

export const doGetHeartDiseaseRate = id => {
    return {
        type: GET_HEART_DISEASE_RATE,
        payload: { id }
    };
};

export const doGetDocumentsForm = () => {
    return {
        type: GET_DOCUMENTS_FORM,
        payload: {}
    };
};

export const doEditDocument = values => {
    return {
        type: EDIT_DOCUMENT,
        payload: {
            ...values
        }
    };
};

export const doDeleteDocument = documentIds => {
    return {
        type: DELETE_DOCUMENT,
        payload: {
            documentIds
        }
    };
};
