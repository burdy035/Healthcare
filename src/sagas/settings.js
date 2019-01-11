import { put } from "redux-saga/effects";
import * as Actions from "../actions";
import { callApi } from "../services/api";

export function* getSettingData(action) {
    let payload = action.payload;

    let response = yield callApi("get", "setting-data", payload);
    if (!response) {
        yield put({
            type: Actions.GET_SETTING_DATA_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_SETTING_DATA_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_SETTING_DATA_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* addDeviceState(action) {
    let payload = action.payload;

    let response = yield callApi("post", "add-device-state", payload);
    if (!response) {
        yield put({
            type: Actions.ADD_DEVICE_STATE_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.ADD_DEVICE_STATE_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.ADD_DEVICE_STATE_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* addSettingData(action) {
    let payload = action.payload;

    let response = yield callApi("post", "add-setting-data", payload);
    if (!response) {
        yield put({
            type: Actions.ADD_SETTING_DATA_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.ADD_SETTING_DATA_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.ADD_SETTING_DATA_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* deleteSetting(action) {
    let payload = action.payload;

    let response = yield callApi("post", "delete-setting", payload);
    if (!response) {
        yield put({
            type: Actions.DELETE_SETTING_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.DELETE_SETTING_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.DELETE_SETTING_SUCCESS,
                payload: response.data
            });
        }
    }
}
