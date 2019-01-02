import { put } from "redux-saga/effects";
import * as Actions from "../actions";
import { callApi } from "../services/api";

export function* getDeviceTypes(action) {
    let payload = action.payload;

    let response = yield callApi("get", "device-types", payload);

    if (!response) {
        yield put({
            type: Actions.GET_DEVICE_TYPES_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_DEVICE_TYPES_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_DEVICE_TYPES_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* addDeviceType(action) {
    let payload = action.payload;

    let response = yield callApi("post", "add-device-type", payload);

    if (!response) {
        yield put({
            type: Actions.ADD_DEVICE_TYPE_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.ADD_DEVICE_TYPE_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.ADD_DEVICE_TYPE_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* deleteDeviceType(action) {
    let payload = action.payload;

    let response = yield callApi("post", "delete-device-type", payload);

    if (!response) {
        yield put({
            type: Actions.DELETE_DEVICE_TYPE_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.DELETE_DEVICE_TYPE_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.DELETE_DEVICE_TYPE_SUCCESS,
                payload: response.data
            });
        }
    }
}
