import {
    GET_ROOMS,
    GET_ROOMS_FAIL,
    GET_ROOMS_SUCCESS,
    ADD_ROOM_SUCCESS,
    ADD_ROOM,
    ADD_ROOM_FAIL,
    GET_DEVICE_INFO,
    GET_DEVICE_INFO_FAIL,
    GET_DEVICE_INFO_SUCCESS,
    EDIT_ROOM,
    EDIT_ROOM_FAIL,
    EDIT_ROOM_SUCCESS
} from "../actions";

const defaultState = {
    isFetching: false,
    roomList: [],
    devicesDataForm: [],
    addRoomSuccess: false,
    editRoomSuccess: false
};

export default function settings(state = defaultState, action) {
    switch (action.type) {
        case GET_ROOMS:
            return {
                ...state,
                isFetching: true
            };
        case GET_ROOMS_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case GET_ROOMS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                roomList: action.payload.roomList
            };

        case ADD_ROOM:
            return {
                ...state,
                isFetching: true
            };
        case ADD_ROOM_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case ADD_ROOM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                roomList: [...action.payload.roomList, ...state.roomList],
                addRoomSuccess: true
            };
        case EDIT_ROOM:
            return {
                ...state,
                isFetching: true
            };
        case EDIT_ROOM_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case EDIT_ROOM_SUCCESS:
            return {
                ...state,
                isFetching: false,
                editRoomSuccess: true
            };
        case GET_DEVICE_INFO:
            return {
                ...state,
                isFetching: false
            };
        case GET_DEVICE_INFO_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case GET_DEVICE_INFO_SUCCESS:
            return {
                ...state,
                isFetching: false,
                devicesDataForm: action.payload.devicesDataForm,
                patientsDataForm: action.payload.patientsDataForm
            };
        default:
            return {
                ...state,
                addRoomSuccess: false,
                editRoomSuccess: false
            };
    }
}
