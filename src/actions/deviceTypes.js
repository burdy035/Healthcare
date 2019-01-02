export const GET_DEVICE_TYPES = "GET_DEVICE_TYPES";

export const GET_DEVICE_TYPES_SUCCESS = "GET_DEVICE_TYPES_SUCCESS";

export const GET_DEVICE_TYPES_FAIL = "GET_DEVICE_TYPES_FAIL";

export const ADD_DEVICE_TYPE = "ADD_DEVICE_TYPE";

export const ADD_DEVICE_TYPE_SUCCESS = "ADD_DEVICE_TYPE_SUCCESS";

export const ADD_DEVICE_TYPE_FAIL = "ADD_DEVICE_TYPE_FAIL";

export const DELETE_DEVICE_TYPE = "DELETE_DEVICE_TYPE";

export const DELETE_DEVICE_TYPE_FAIL = "DELETE_DEVICE_TYPE_FAIL";

export const DELETE_DEVICE_TYPE_SUCCESS = "DELETE_DEVICE_TYPE_SUCCESS";

export function getDeviceTypes() {
    return {
        type: GET_DEVICE_TYPES
    };
}

export function addDeviceType(values) {
    return {
        type: ADD_DEVICE_TYPE,
        payload: values
    };
}

export function deleteDeviceType(ids) {
    return {
        type: DELETE_DEVICE_TYPE,
        payload: { typeIds: [...ids] }
    };
}
