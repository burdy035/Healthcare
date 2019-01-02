import {
    GET_PATIENT_REPORT,
    GET_PATIENT_REPORT_FAIL,
    GET_PATIENT_REPORT_SUCCESS,
    GET_TEMPERATURE_CHART_DATA,
    GET_TEMPERATURE_CHART_DATA_FAIL,
    GET_TEMPERATURE_CHART_DATA_SUCCESS,
    GET_HEART_RATE_CHART_DATA,
    GET_HEART_RATE_CHART_DATA_FAIL,
    GET_HEART_RATE_CHART_DATA_SUCCESS
} from "../actions";

const defaultState = {
    isFetching: false,
    updateParams: {},
    beforeParams: {}
};

export default function report(state = defaultState, action) {
    switch (action.type) {
        case GET_PATIENT_REPORT:
            return {
                ...state
            };
        case GET_PATIENT_REPORT_FAIL:
            return {
                ...state
            };
        case GET_PATIENT_REPORT_SUCCESS:
            return {
                ...state,
                beforeParams: action.payload.before,
                updateParams: action.payload.update,
                hrData: action.payload.hrData,
                temData: action.payload.temData,
                afPredictRate: action.payload.afPredictRate,
                hdPrediction: action.payload.hdPrediction
            };
        case GET_TEMPERATURE_CHART_DATA:
            return {
                ...state
            };
        case GET_TEMPERATURE_CHART_DATA_FAIL:
            return {
                ...state
            };
        case GET_TEMPERATURE_CHART_DATA_SUCCESS:
            return {
                ...state,
                temData: action.payload.temData
            };
        case GET_HEART_RATE_CHART_DATA:
            return {
                ...state
            };
        case GET_HEART_RATE_CHART_DATA_FAIL:
            return {
                ...state
            };
        case GET_HEART_RATE_CHART_DATA_SUCCESS:
            return {
                ...state,
                hrData: action.payload.hrData
            };
        default:
            return {
                ...state
            };
    }
}
