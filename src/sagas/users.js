import { put } from "redux-saga/effects";
import * as Actions from "../actions";
import { callApi } from "../services/api";

export function* getUsers(action) {
    let payload = action.payload;

    let response = yield callApi("get", "get-users", payload);
    if (!response) {
        yield put({
            type: Actions.GET_USERS_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_USERS_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_USERS_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* addUser(action) {
    let payload = action.payload;

    let response = yield callApi("post", "add-user", payload);
    if (!response) {
        yield put({
            type: Actions.ADD_USER_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.ADD_USER_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.ADD_USER_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* getUserDetail(action) {
    let payload = action.payload;

    let response = yield callApi("get", "get-user-detail", payload);
    if (!response) {
        yield put({
            type: Actions.GET_USER_DETAIL_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_USER_DETAIL_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_USER_DETAIL_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* userChangePassword(action) {
    let payload = action.payload;

    let response = yield callApi("post", "user-change-password", payload);
    if (!response) {
        yield put({
            type: Actions.USER_CHANGE_PASSWORD_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.USER_CHANGE_PASSWORD_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.USER_CHANGE_PASSWORD_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* deleteUsers(action) {
    let payload = action.payload;

    let response = yield callApi("post", "delete-users", payload);
    if (!response) {
        yield put({
            type: Actions.DELETE_USERS_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.DELETE_USERS_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.DELETE_USERS_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* editUserDetail(action) {
    let payload = action.payload;

    let response = yield callApi("post", "edit-user-detail", payload);
    if (!response) {
        yield put({
            type: Actions.EDIT_USER_DETAIL_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.EDIT_USER_DETAIL_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.EDIT_USER_DETAIL_SUCCESS,
                payload: response.data
            });
        }
    }
}
