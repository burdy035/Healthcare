export const GET_DEVICES = "GET_DEVICES";

export const GET_DEVICES_SUCCESS = "GET_DEVICES_SUCCESS";

export const GET_DEVICES_FAIL = "GET_DEVICES_FAIL";

export const GET_ADD_DEVICE_DATA = "GET_ADD_DEVICE_DATA";

export const GET_ADD_DEVICE_DATA_FAIL = "GET_ADD_DEVICE_DATA_FAIL";

export const GET_ADD_DEVICE_DATA_SUCCESS = "GET_ADD_DEVICE_DATA_SUCCESS";

export const ADD_DEVICE = "ADD_DEVICE";

export const ADD_DEVICE_FAIL = "ADD_DEVICE_FAIL";

export const ADD_DEVICE_SUCCESS = "ADD_DEVICE_SUCCESS";

export const DELETE_DEVICES = "DELETE_DEVICES";

export const DELETE_DEVICES_FAIL = "DELETE_DEVICES_FAIL";

export const DELETE_DEVICES_SUCCESS = "DELETE_DEVICES_SUCCESS";

export const EDIT_DEVICE = "EDIT_DEVICE";

export const EDIT_DEVICE_FAIL = "EDIT_DEVICE_FAIL";

export const EDIT_DEVICE_SUCCESS = "EDIT_DEVICE_SUCCESS";

export function getDevices() {
    return {
        type: GET_DEVICES
    };
}

export function getAddDeviceData() {
    return {
        type: GET_ADD_DEVICE_DATA
    };
}

export function doAddDevice(values) {
    return {
        type: ADD_DEVICE,
        payload: {
            ...values
        }
    };
}

export function doDeleteDevices(deviceIds) {
    return {
        type: DELETE_DEVICES,
        payload: {
            deviceIds
        }
    };
}

export function doEditDevice(values) {
    return {
        type: EDIT_DEVICE,
        payload: {
            ...values
        }
    };
}
