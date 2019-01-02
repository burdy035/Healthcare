export const GET_ROOMS = "GET_ROOMS";

export const GET_ROOMS_FAIL = "GET_ROOMS_FAIL";

export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";

export const ADD_ROOM = "ADD_ROOM";

export const ADD_ROOM_SUCCESS = "ADD_ROOM_SUCCESS";

export const ADD_ROOM_FAIL = "ADD_ROOM_FAIL";

export const GET_DEVICE_INFO = "GET_DEVICE_INFO";

export const GET_DEVICE_INFO_FAIL = "GET_DEVICE_INFO_FAIL";

export const GET_DEVICE_INFO_SUCCESS = "GET_DEVICE_INFO_SUCCESS";

export const EDIT_ROOM = "EDIT_ROOM";

export const EDIT_ROOM_FAIL = "EDIT_ROOM_FAIL";

export const EDIT_ROOM_SUCCESS = "EDIT_ROOM_SUCCESS";

export function doGetRooms() {
    return {
        type: GET_ROOMS
    };
}

export function doAddRoom(values) {
    return {
        type: ADD_ROOM,
        payload: {
            ...values
        }
    };
}

export function doGetDevicesInfo() {
    return {
        type: GET_DEVICE_INFO
    };
}

export function doEditRoom(values) {
    return {
        type: EDIT_ROOM,
        payload: {
            ...values
        }
    };
}
