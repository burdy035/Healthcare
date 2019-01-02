import { put } from "redux-saga/effects";
import * as Actions from "../actions";
import { callApi } from "../services/api";

import { history } from "../store/configureStore";

export function* getMonthDuties(action) {
    let payload = action.payload;

    let response = yield callApi("get", "get-month-duties", payload);

    if (!response) {
        yield put({
            type: Actions.GET_MONTH_DUTIES_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            if (response.errorCode && response.errorCode === "invalidToken") {
                yield put({
                    type: Actions.INVALID_TOKEN,
                    error: response.error
                });
            } else {
                yield put({
                    type: Actions.GET_MONTH_DUTIES_FAIL,
                    error: response.error
                });
            }
        } else {
            yield put({
                type: Actions.GET_MONTH_DUTIES_SUCCESS,
                payload: response.data
            });
        }
    }
}
