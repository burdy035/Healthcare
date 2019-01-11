export const GET_SETTING_DATA = "GET_SETTINGS_DATA";

export const GET_SETTING_DATA_FAIL = "GET_SETTINGS_DATA_FAIL";

export const GET_SETTING_DATA_SUCCESS = "GET_SETTINGS_DATA_SUCCESS";

export const ADD_DEVICE_STATE = "ADD_DEVICE_STATE";

export const ADD_DEVICE_STATE_FAIL = "ADD_DEVICE_STATE_FAIL";

export const ADD_DEVICE_STATE_SUCCESS = "ADD_DEVICE_STATE_SUCCESS";

export const ADD_SETTING_DATA = "ADD_SETTING_DATA";

export const ADD_SETTING_DATA_FAIL = "ADD_SETTING_DATA_FAIL";

export const ADD_SETTING_DATA_SUCCESS = "ADD_SETTING_DATA_SUCCESS";

export const DELETE_SETTING = "DELETE_SETTING";

export const DELETE_SETTING_FAIL = "DELETE_SETTING_FAIL";

export const DELETE_SETTING_SUCCESS = "DELETE_SETTING_SUCCESS";

export function doGetSettingData() {
    return {
        type: GET_SETTING_DATA
    };
}

export function addDeviceState(values) {
    return {
        type: ADD_DEVICE_STATE,
        payload: {
            ...values
        }
    };
}

export const doAddSettingData = values => {
    return {
        type: ADD_SETTING_DATA,
        payload: {
            ...values
        }
    };
};

export const doDeleteSetting = value => {
    return {
        type: DELETE_SETTING,
        payload: {
            settingId: value
        }
    };
};
