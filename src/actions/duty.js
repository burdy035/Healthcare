export const GET_ALL_USERS_FOR_DUTY = "GET_ALL_USERS_FOR_DUTY";

export const GET_ALL_USERS_FOR_DUTY_FAIL = "GET_ALL_USERS_FOR_DUTY_FAIL";

export const GET_ALL_USERS_FOR_DUTY_SUCCESS = "GET_ALL_USERS_FOR_DUTY_SUCCESS";

export const ADD_DUTY = "ADD_DUTY";

export const ADD_DUTY_FAIL = "ADD_DUTY_FAIL";

export const ADD_DUTY_SUCCESS = "ADD_DUTY_SUCCESS";

export const GET_DUTIES_WEEKS = "GET_DUTIES_WEEKS";

export const GET_DUTIES_WEEKS_FAIL = "GET_DUTIES_WEEKS_FAIL";

export const GET_DUTIES_WEEKS_SUCCESS = "GET_DUTIES_WEEKS_SUCCESS";

export const DELETE_DUTY = "DELETE_DUTY";

export const DELETE_DUTY_FAIL = "DELETE_DUTY_FAIL";

export const DELETE_DUTY_SUCCESS = "DELETE_DUTY_SUCCESS";

export const EDIT_DUTY = "EDIT_DUTY";

export const EDIT_DUTY_FAIL = "EDIT_DUTY_FAIL";

export const EDIT_DUTY_SUCCESS = "EDIT_DUTY_SUCCESS";

export const doGetAllUsersForDuty = () => {
    return {
        type: GET_ALL_USERS_FOR_DUTY,
        payload: {}
    };
};

export const doAddDuty = values => {
    return {
        type: ADD_DUTY,
        payload: {
            ...values
        }
    };
};

export const doGetDutiesOfWeeks = queries => {
    return {
        type: GET_DUTIES_WEEKS,
        payload: {
            ...queries
        }
    };
};

export const doDeleteDuty = values => {
    return {
        type: DELETE_DUTY,
        payload: {
            ...values
        }
    };
};

export const doEditDuty = values => {
    return {
        type: EDIT_DUTY,
        payload: {
            ...values
        }
    };
};
