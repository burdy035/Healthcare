import {
    GET_ALL_USERS_FOR_DUTY,
    GET_ALL_USERS_FOR_DUTY_FAIL,
    GET_ALL_USERS_FOR_DUTY_SUCCESS,
    ADD_DUTY,
    ADD_DUTY_FAIL,
    ADD_DUTY_SUCCESS,
    GET_DUTIES_WEEKS,
    GET_DUTIES_WEEKS_FAIL,
    GET_DUTIES_WEEKS_SUCCESS,
    DELETE_DUTY,
    DELETE_DUTY_FAIL,
    DELETE_DUTY_SUCCESS,
    EDIT_DUTY,
    EDIT_DUTY_FAIL,
    EDIT_DUTY_SUCCESS
} from "../actions";

const defaultState = {
    isFetching: false,
    allUsers: [],
    duties: [],
    newDuty: {},
    successMessage: ""
};

export default function home(state = defaultState, action) {
    switch (action.type) {
        case GET_ALL_USERS_FOR_DUTY:
            return {
                ...state,
                isFetching: true
            };
        case GET_ALL_USERS_FOR_DUTY_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case GET_ALL_USERS_FOR_DUTY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                allUsers: action.payload.users
            };

        case ADD_DUTY:
            return {
                ...state,
                isFetching: true
            };
        case ADD_DUTY_FAIL:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error
            };
        case ADD_DUTY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                duties: [...state.duties, action.payload.newDuty],
                successMessage: "Thêm thành công"
            };

        case GET_DUTIES_WEEKS:
            return {
                ...state
            };
        case GET_DUTIES_WEEKS_FAIL:
            return {
                ...state
            };
        case GET_DUTIES_WEEKS_SUCCESS:
            return {
                ...state,
                duties: action.payload.duties
            };
        case DELETE_DUTY:
            return {
                ...state,
                isFetching: true
            };

        case DELETE_DUTY_FAIL:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error
            };

        case DELETE_DUTY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                duties: action.payload.duties,
                successMessage: "Xoá thành công"
            };
        case EDIT_DUTY:
            return {
                ...state,
                isFetching: true
            };
        case EDIT_DUTY_FAIL:
            return {
                ...state,
                isFetching: true,
                errorMessage: action.error
            };
        case EDIT_DUTY_SUCCESS:
            return {
                ...state,
                isFetching: true,
                duties: action.payload.duties,
                successMessage: "Sửa thành công"
            };
        default:
            return {
                ...state,
                successMessage: "",
                errorMessage: ""
            };
    }
}
