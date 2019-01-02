export const GET_PATIENT_REPORT = "GET_PATIENT_REPORT";

export const GET_PATIENT_REPORT_FAIL = "GET_PATIENT_REPORT_FAIL";

export const GET_PATIENT_REPORT_SUCCESS = "GET_PATIENT_REPORT_SUCCESS";

export const GET_TEMPERATURE_CHART_DATA = "GET_TEMPERATURE_CHART_DATA";

export const GET_TEMPERATURE_CHART_DATA_FAIL =
    "GET_TEMPERATURE_CHART_DATA_FAIL";

export const GET_TEMPERATURE_CHART_DATA_SUCCESS =
    "GET_TEMPERATURE_CHART_DATA_SUCCESS";

export const GET_HEART_RATE_CHART_DATA = "GET_HEART_RATE_CHART_DATA";

export const GET_HEART_RATE_CHART_DATA_FAIL = "GET_HEART_RATE_CHART_DATA_FAIL";

export const GET_HEART_RATE_CHART_DATA_SUCCESS =
    "GET_HEART_RATE_CHART_DATA_SUCCESS";

export const doGetPatientReport = payload => {
    return {
        type: GET_PATIENT_REPORT,
        payload: {
            ...payload
        }
    };
};

export const doGetTemperatureChartData = values => {
    return {
        type: GET_TEMPERATURE_CHART_DATA,
        payload: {
            ...values
        }
    };
};

export const doGetHrData = values => {
    return {
        type: GET_HEART_RATE_CHART_DATA,
        payload: {
            ...values
        }
    };
};
