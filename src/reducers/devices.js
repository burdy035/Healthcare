import {
    GET_ADD_DEVICE_DATA,
    GET_ADD_DEVICE_DATA_SUCCESS,
    GET_ADD_DEVICE_DATA_FAIL,
    ADD_DEVICE,
    ADD_DEVICE_SUCCESS,
    ADD_DEVICE_FAIL,
    GET_DEVICES,
    GET_DEVICES_FAIL,
    GET_DEVICES_SUCCESS,
    DELETE_DEVICES_FAIL,
    DELETE_DEVICES,
    DELETE_DEVICES_SUCCESS,
    EDIT_DEVICE,
    EDIT_DEVICE_FAIL,
    EDIT_DEVICE_SUCCESS
} from "../actions";

const defaultState = {
    isFetching: false,
    addDeviceDataForm: {},
    devicesList: [],
    editDeviceSuccess: false,
    addDeviceSuccess: false
};

export default function searching(state = defaultState, action) {
    switch (action.type) {
        case GET_ADD_DEVICE_DATA:
            return {
                ...state,
                isFetching: true
            };
        case GET_ADD_DEVICE_DATA_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case GET_ADD_DEVICE_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                addDeviceDataForm: action.payload
            };
        case ADD_DEVICE:
            return {
                ...state,
                isFetching: true
            };
        case ADD_DEVICE_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case ADD_DEVICE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                addDeviceSuccess: true,
                devicesList: action.payload.devicesList
            };

        case GET_DEVICES:
            return {
                ...state,
                isFetching: true
            };
        case GET_DEVICES_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case GET_DEVICES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                devicesList: action.payload.devicesList
            };
        case DELETE_DEVICES:
            return {
                ...state,
                isFetching: true
            };
        case DELETE_DEVICES_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case DELETE_DEVICES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                devicesList: action.payload.devicesList
            };
        case EDIT_DEVICE:
            return {
                ...state,
                isFetching: true
            };
        case EDIT_DEVICE_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case EDIT_DEVICE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                editDeviceSuccess: true,
                devicesList: action.payload.devicesList
            };
        default:
            return {
                ...state,
                editDeviceSuccess: false,
                addDeviceSuccess: false
            };
    }
}
