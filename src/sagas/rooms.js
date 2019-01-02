import { put } from "redux-saga/effects";
import * as Actions from "../actions";
import { callApi } from "../services/api";

export function* getRooms(action) {
    let payload = action.payload;

    let response = yield callApi("get", "rooms", payload);
    if (!response) {
        yield put({
            type: Actions.GET_ROOMS_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_ROOMS_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_ROOMS_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* addRoom(action) {
    let payload = action.payload;

    let response = yield callApi("post", "add-room", payload);
    if (!response) {
        yield put({
            type: Actions.ADD_ROOM_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.ADD_ROOM_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.ADD_ROOM_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* getDeviceInfo(action) {
    let payload = action.payload;

    let response = yield callApi("get", "room-devices-info", payload);
    if (!response) {
        yield put({
            type: Actions.GET_DEVICE_INFO_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_DEVICE_INFO_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_DEVICE_INFO_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* editRoom(action) {
    let payload = action.payload;

    let response = yield callApi("post", "edit-room", payload);
    if (!response) {
        yield put({
            type: Actions.EDIT_ROOM_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.EDIT_ROOM_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.EDIT_ROOM_SUCCESS,
                payload: response.data
            });
        }
    }
}
