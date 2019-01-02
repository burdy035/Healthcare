import { put } from "redux-saga/effects";
import * as Actions from "../actions";
import { callApi } from "../services/api";

export function* getPatientReport(action) {
    let payload = action.payload;

    let response = yield callApi("get", "get-patient-report", payload);
    if (!response) {
        yield put({
            type: Actions.GET_PATIENT_REPORT_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_PATIENT_REPORT_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_PATIENT_REPORT_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* getTemperatureChartData(action) {
    let payload = action.payload;

    let response = yield callApi("post", "get-temperature-chart-data", payload);
    if (!response) {
        yield put({
            type: Actions.GET_TEMPERATURE_CHART_DATA_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_TEMPERATURE_CHART_DATA_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_TEMPERATURE_CHART_DATA_SUCCESS,
                payload: response.data
            });
        }
    }
}

export function* getHeartRateChartData(action) {
    let payload = action.payload;

    let response = yield callApi("post", "get-hert-rate-chart-data", payload);
    if (!response) {
        yield put({
            type: Actions.GET_HEART_RATE_CHART_DATA_FAIL,
            error: "Something went wrong!"
        });
    } else {
        if (response && response.error) {
            yield put({
                type: Actions.GET_HEART_RATE_CHART_DATA_FAIL,
                error: response.error
            });
        } else {
            yield put({
                type: Actions.GET_HEART_RATE_CHART_DATA_SUCCESS,
                payload: response.data
            });
        }
    }
}
