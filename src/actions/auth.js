export const LOGIN = "LOGIN";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGIN_FAIL = "LOGIN_FAIL";

export const CHECK_USER_AUTHENTICATION = "CHECK_USER_AUTHENTICATION";

export const USER_AUTHENTICATED = "USER_AUTHENTICATED";

export const USER_UNAUTHENTICATED = "USER_UNAUTHENTICATED";

export const LOGOUT = "LOGOUT";

export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const INVALID_TOKEN = "INVALID_TOKEN";

export function doLogin(username, password) {
    return {
        type: LOGIN,
        payload: {
            username,
            password
        }
    };
}

export function checkUserAuthentication() {
    return {
        type: CHECK_USER_AUTHENTICATION
    };
}

export const doLogout = () => {
    return {
        type: LOGOUT
    };
};
