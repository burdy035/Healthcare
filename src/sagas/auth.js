import { put } from "redux-saga/effects";
import * as Actions from "../actions";
import { callApi } from "../services/api";

export function* delay() {
    yield new Promise(resolve => {
        setTimeout(() => {
            resolve(console.log("aaaa"));
        }, 5000);
    });
}

export function* doLogin(action) {
    let payload = action.payload;

    let response = yield callApi("post", "login", payload);
    if (!response) {
        yield put({
            type: Actions.LOGIN_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.LOGIN_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.LOGIN_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* checkUserAuthentication(action) {
    try {
        let userId = yield localStorage.getItem("userId");
        let userToken = yield localStorage.getItem("userToken");
        let user = yield localStorage.getItem("user");

        user = JSON.parse(user);

        if (userId && userToken && user) {
            yield put({
                type: Actions.USER_AUTHENTICATED,
                payload: {
                    user,
                    token: userToken,
                    userId
                }
            });
        } else {
            yield put({
                type: Actions.USER_UNAUTHENTICATED,
                error: "Please login"
            });
        }
    } catch (error) {}
}
