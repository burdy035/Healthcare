import { put } from "redux-saga/effects";
import * as Actions from "../actions";
import { callApi } from "../services/api";

export function* getAllUsersForDuty(action) {
    let payload = action.payload;

    let response = yield callApi("get", "get-all-users-for-duty", payload);
    if (!response) {
        yield put({
            type: Actions.GET_ALL_USERS_FOR_DUTY_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_ALL_USERS_FOR_DUTY_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_ALL_USERS_FOR_DUTY_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* addDuty(action) {
    let payload = action.payload;

    let response = yield callApi("post", "add-duty", payload);
    if (!response) {
        yield put({
            type: Actions.ADD_DUTY_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.ADD_DUTY_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.ADD_DUTY_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* getDutiesOfWeek(action) {
    let payload = action.payload;

    let response = yield callApi("post", "get-duties-of-week", payload);
    if (!response) {
        yield put({
            type: Actions.GET_DUTIES_WEEKS_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_DUTIES_WEEKS_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_DUTIES_WEEKS_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* deleteDuty(action) {
    let payload = action.payload;

    let response = yield callApi("post", "delete-duty", payload);
    if (!response) {
        yield put({
            type: Actions.DELETE_DUTY_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.DELETE_DUTY_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.DELETE_DUTY_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* editDuty(action) {
    let payload = action.payload;

    let response = yield callApi("post", "edit-duty", payload);
    if (!response) {
        yield put({
            type: Actions.EDIT_DUTY_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.EDIT_DUTY_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.EDIT_DUTY_SUCCESS,
                payload: response.data
            });
        }
    }
}
