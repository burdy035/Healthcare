import { put } from "redux-saga/effects";
import * as Actions from "../actions";
import { callApi } from "../services/api";

export function* patientTracking(action) {
    let payload = action.payload;
    console.log(payload);
    let response = yield callApi("get", "live-patient-tracking", payload);
    if (!response) {
        yield put({
            type: Actions.PATIENT_TRACKING_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.PATIENT_TRACKING_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.PATIENT_TRACKING_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* getAFPrediction(action) {
    let payload = action.payload;
    console.log(payload);
    let response = yield callApi("post", "af-prediction", payload);
    if (!response) {
        yield put({
            type: Actions.GET_AF_PREDICTION_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_AF_PREDICTION_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_AF_PREDICTION_SUCCESS,
                payload: response.data
            });
        }
    }
}
