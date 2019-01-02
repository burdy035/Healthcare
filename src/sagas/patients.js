import { put } from "redux-saga/effects";
import * as Actions from "../actions";
import { callApi } from "../services/api";

export function* getPatientsTrackingList(action) {
    let payload = action.payload;

    let response = yield callApi("get", "patients-tracking-list", payload);
    if (!response) {
        yield put({
            type: Actions.GET_PATIENTS_TRACKING_LIST_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_PATIENTS_TRACKING_LIST_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_PATIENTS_TRACKING_LIST_SUCCESS,
                payload: response.data
            });
        }
    }
}
