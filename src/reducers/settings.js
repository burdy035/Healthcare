import {
    GET_SETTING_DATA,
    GET_SETTING_DATA_FAIL,
    GET_SETTING_DATA_SUCCESS,
    ADD_SETTING_DATA,
    ADD_SETTING_DATA_SUCCESS
} from "../actions";

const defaultState = {
    isFetching: false,
    deviceStateData: [],
    patientStateData: [],
    majors: []
};

export default function settings(state = defaultState, action) {
    switch (action.type) {
        case GET_SETTING_DATA:
            return {
                ...state,
                isFetching: true
            };
        case GET_SETTING_DATA_FAIL:
            return {
                ...state,
                isFetching: false
            };
        case GET_SETTING_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                deviceStateData: action.payload.deviceStateData,
                patientStateData: action.payload.patientStateData,
                userRolesData: action.payload.userRolesData,
                majors: action.payload.majorData
            };
        case ADD_SETTING_DATA:
            return {
                ...state,
                isFetching: true
            };
        case ADD_SETTING_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                patientStateData: action.payload.patientStateData && [
                    ...action.payload.patientStateData,
                    ...state.patientStateData
                ],
                deviceStateData: action.payload.deviceStateData && [
                    ...action.payload.deviceStateData,
                    ...state.deviceStateData
                ],
                majors: action.payload.majorData && [
                    ...action.payload.majorData,
                    ...state.majors
                ]
            };
        default:
            return {
                ...state
            };
    }
}
