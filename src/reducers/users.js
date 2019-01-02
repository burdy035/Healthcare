import {
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    GET_USERS,
    GET_USERS_FAIL,
    GET_USERS_SUCCESS,
    GET_USER_DETAIL,
    GET_USER_DETAIL_FAIL,
    GET_USER_DETAIL_SUCCESS
} from "../actions";

const defaultState = {
    isFetching: false,
    userList: [],
    addUserSuccess: false,
    userDetail: {},
    userDuties: {},
    followingPatients: [],
    majors: []
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
                addUserSuccess: true
            };
        case ADD_USER_FAIL:
            return {
                ...state,
                isFetching: false
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
        default:
            return {
                ...state,
                addUserSucess: ""
            };
    }
}
