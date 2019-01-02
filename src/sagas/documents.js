import { put } from "redux-saga/effects";
import * as Actions from "../actions";
import { callApi } from "../services/api";

export function* getDocuments(action) {
    let payload = action.payload;

    let response = yield callApi("get", "patient-documents", payload);

    if (!response) {
        yield put({
            type: Actions.GET_PATIENT_DOCUMENTS_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_PATIENT_DOCUMENTS_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_PATIENT_DOCUMENTS_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* addDocument(action) {
    let payload = action.payload;

    let response = yield callApi("post", "add-document", payload);

    if (!response) {
        yield put({
            type: Actions.ADD_DOCUMENT_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.ADD_DOCUMENT_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.ADD_DOCUMENT_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* getHeartDiseaseRate(action) {
    let payload = action.payload;

    let response = yield callApi("get", "get-heart-disease-rate", payload);

    if (!response) {
        yield put({
            type: Actions.GET_HEART_DISEASE_RATE_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_HEART_DISEASE_RATE_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_HEART_DISEASE_RATE_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* getDocumentsForm(action) {
    let payload = action.payload;

    let response = yield callApi("get", "get-document-form", payload);

    if (!response) {
        yield put({
            type: Actions.GET_DOCUMENTS_FORM_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_DOCUMENTS_FORM_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_DOCUMENTS_FORM_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* editDocument(action) {
    let payload = action.payload;

    let response = yield callApi("post", "edit-document", payload);

    if (!response) {
        yield put({
            type: Actions.EDIT_DOCUMENT_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.EDIT_DOCUMENT_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.EDIT_DOCUMENT_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* deleteDocument(action) {
    let payload = action.payload;

    let response = yield callApi("post", "delete-documents", payload);

    if (!response) {
        yield put({
            type: Actions.DELETE_DOCUMENT_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.DELETE_DOCUMENT_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.DELETE_DOCUMENT_SUCCESS,
                payload: response.data
            });
        }
    }
}
