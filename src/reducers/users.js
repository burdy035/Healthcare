import {
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    GET_USERS,
    GET_USERS_FAIL,
    GET_USERS_SUCCESS,
    GET_USER_DETAIL,
    GET_USER_DETAIL_FAIL,
    GET_USER_DETAIL_SUCCESS,
    DELETE_USERS,
    DELETE_USERS_SUCCESS,
    DELETE_USERS_FAIL,
    EDIT_USER_DETAIL_FAIL,
    EDIT_USER_DETAIL_SUCCESS,
    EDIT_USER_DETAIL,
    USER_CHANGE_PASSWORD,
    USER_CHANGE_PASSWORD_FAIL,
    USER_CHANGE_PASSWORD_SUCCESS
} from "../actions";

const defaultState = {
    isFetching: false,
    userList: [],
    addUserSuccess: false,
    userDetail: {},
    userDuties: {},
    followingPatients: [],
    majors: [],
    errorMessage: "",
    successMessage: ""
};

export default function users(state = defaultState, action) {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                isFetching: true
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                userList: [...state.userList, action.payload.addedUser],
                addUserSuccess: true,
                successMessage: "Thêm thành công"
            };
        case ADD_USER_FAIL:
            return {
                ...state,
                isFetching: false,
                errorMessage: "Có lỗi xảy ra"
            };
        case GET_USERS:
            return {
                ...state,
                isFetching: true
            };
        case GET_USERS_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                userList: action.payload.userList,
                majors: action.payload.majors
            };
        case GET_USER_DETAIL:
            return {
                ...state,
                isFetching: true
            };
        case GET_USER_DETAIL_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case GET_USER_DETAIL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                userDetail: action.payload.userDetail,
                userDuties: action.payload.userDuties,
                followingPatients: action.payload.followingPatients
            };
        case DELETE_USERS:
            return {
                ...state,
                isFetching: true
            };
        case DELETE_USERS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                userList: action.payload.userList,
                successMessage: "Xoá thành công"
            };
        case DELETE_USERS_FAIL:
            return {
                ...state,
                isFetching: false,
                errorMessage: "Có lỗi xảy ra"
            };
        case EDIT_USER_DETAIL:
            return {
                ...state,
                isFetching: true
            };
        case EDIT_USER_DETAIL_FAIL:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error ? action.error : "Có lỗi xảy ra"
            };
        case EDIT_USER_DETAIL_SUCCESS:
            return {
                ...state,
                successMessage: "Sửa thành công",
                userDetail: action.payload.userDetail
            };
        case USER_CHANGE_PASSWORD:
            return {
                ...state,
                isFetching: false
            };
        case USER_CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error ? action.error : "Có lỗi xảy ra"
            };
        case USER_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isFetching: false,
                successMessage: "Thay đổi mật khẩu thành công"
            };
        default:
            return {
                ...state,
                addUserSucess: "",
                successMessage: "",
                errorMessage: ""
            };
    }
}
