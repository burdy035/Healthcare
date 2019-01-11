import { put } from "redux-saga/effects";
import * as Actions from "../actions";
import { callApi } from "../services/api";

export function* getDevices(action) {
    let payload = action.payload;

    let response = yield callApi("get", "devices", payload);

    if (!response) {
        yield put({
            type: Actions.GET_DEVICES_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_DEVICES_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_DEVICES_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* getAddDeviceData(action) {
    let payload = action.payload;

    let response = yield callApi("get", "add-device-data-form", payload);

    if (!response) {
        yield put({
            type: Actions.GET_ADD_DEVICE_DATA_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_ADD_DEVICE_DATA_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_ADD_DEVICE_DATA_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* addDevice(action) {
    let payload = action.payload;

    let response = yield callApi("post", "add-device", payload);

    if (!response) {
        yield put({
            type: Actions.ADD_DEVICE_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.ADD_DEVICE_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.ADD_DEVICE_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* deleteDevices(action) {
    let payload = action.payload;

    let response = yield callApi("post", "delete-devices", payload);

    if (!response) {
        yield put({
            type: Actions.DELETE_DEVICES_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.DELETE_DEVICES_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.DELETE_DEVICES_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* editDevice(action) {
    let payload = action.payload;

    let response = yield callApi("post", "edit-device", payload);

    if (!response) {
        yield put({
            type: Actions.EDIT_DEVICE_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.EDIT_DEVICE_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.EDIT_DEVICE_SUCCESS,
                payload: response.data
            });
        }
    }
}
