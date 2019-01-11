export const ADD_USER = "ADD_USER";

export const ADD_USER_FAIL = "ADD_USER_FAIL";

export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";

export const GET_USERS = "GET_USERS";

export const GET_USERS_FAIL = "GET_USERS_FAIL";

export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";

export const GET_USER_DETAIL = "GET_USER_DETAIL";

export const GET_USER_DETAIL_FAIL = "GET_USER_DETAIL_FAIL";

export const GET_USER_DETAIL_SUCCESS = "GET_USER_DETAIL_SUCCESS";

export const USER_CHANGE_PASSWORD = "USER_CHANGE_PASSWORD";

export const USER_CHANGE_PASSWORD_FAIL = "USER_CHANGE_PASSWORD_FAIL";

export const USER_CHANGE_PASSWORD_SUCCESS = "USER_CHANGE_PASSWORD_SUCCESS";

export const DELETE_USERS = "DELETE_USERS";

export const DELETE_USERS_FAIL = "DELETE_USERS_FAIL";

export const DELETE_USERS_SUCCESS = "DELETE_USERS_SUCCESS";

export const EDIT_USER_DETAIL = "EDIT_USER_DETAIL";

export const EDIT_USER_DETAIL_FAIL = "EDIT_USER_DETAIL_FAIL";

export const EDIT_USER_DETAIL_SUCCESS = "EDIT_USER_DETAIL_SUCCESS";

export const doAddUser = values => {
    return {
        type: ADD_USER,
        payload: values
    };
};

export const doGetUsers = () => {
    return {
        type: GET_USERS
    };
};

export const doGetUserDetail = userId => {
    return {
        type: GET_USER_DETAIL,
        payload: {
            userId
        }
    };
};

export const doChangePassword = payload => {
    return {
        type: USER_CHANGE_PASSWORD,
        payload: {
            ...payload
        }
    };
};

export const doDeleteUsers = userIds => {
    return {
        type: DELETE_USERS,
        payload: {
            userIds
        }
    };
};

export const doEditUserDetail = values => {
    return {
        type: EDIT_USER_DETAIL,
        payload: {
            ...values
        }
    };
};
