import { put } from "redux-saga/effects";
import * as Actions from "../actions";
import { callApi } from "../services/api";

export function* doConnect(action) {
    let payload = action.payload;

    let response = yield callApi("get", "warning-connect", payload);
    if (!response) {
        yield put({
            type: Actions.WARNING_CONNECT_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.WARNING_CONNECT_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.WARNING_CONNECT_SUCCESS,
                payload: response.data
            });
        }
    }
}
