import { takeEvery } from "redux-saga/effects";

import * as Actions from "../actions";
import { doLogin, checkUserAuthentication } from "./auth";

import {
    getDevices,
    getAddDeviceData,
    addDevice,
    deleteDevices,
    editDevice
} from "./devices";
import { getDeviceTypes, addDeviceType, deleteDeviceType } from "./deviceTypes";
import {
    getSettingData,
    addDeviceState,
    addSettingData,
    deleteSetting
} from "./settings";
import { getRooms, addRoom, getDeviceInfo, editRoom } from "./rooms";
import {
    getDocuments,
    addDocument,
    getHeartDiseaseRate,
    getDocumentsForm,
    editDocument,
    deleteDocument
} from "./documents";

import {
    addUser,
    getUsers,
    getUserDetail,
    userChangePassword,
    deleteUsers,
    editUserDetail
} from "./users";

import { getPatientsTrackingList } from "./patients";

import { patientTracking, getAFPrediction } from "./patientTracking";

import { getMonthDuties } from "./home";

import {
    getAllUsersForDuty,
    addDuty,
    getDutiesOfWeek,
    deleteDuty,
    editDuty
} from "./duty";

import { doConnect } from "./warning";

import {
    getPatientReport,
    getHeartRateChartData,
    getTemperatureChartData
} from "./report";

function* initialStates(action) {
    try {
        let user = yield sessionStorage.getItem("user");
        user = JSON.parse(user);
        console.log(user);
    } catch (error) {}
}

function* mySaga() {
    yield takeEvery(Actions.INITIAL, initialStates);
    yield takeEvery(Actions.LOGIN, doLogin);
    yield takeEvery(Actions.CHECK_USER_AUTHENTICATION, checkUserAuthentication);
    yield takeEvery(Actions.GET_DEVICES, getDevices);
    yield takeEvery(Actions.GET_DEVICE_TYPES, getDeviceTypes);
    yield takeEvery(Actions.ADD_DEVICE_TYPE, addDeviceType);
    yield takeEvery(Actions.DELETE_DEVICE_TYPE, deleteDeviceType);
    yield takeEvery(Actions.GET_ADD_DEVICE_DATA, getAddDeviceData);
    yield takeEvery(Actions.ADD_DEVICE, addDevice);
    yield takeEvery(Actions.GET_SETTING_DATA, getSettingData);
    yield takeEvery(Actions.ADD_DEVICE_STATE, addDeviceState);
    yield takeEvery(Actions.ADD_SETTING_DATA, addSettingData);
    yield takeEvery(Actions.GET_ROOMS, getRooms);
    yield takeEvery(Actions.ADD_ROOM, addRoom);
    yield takeEvery(Actions.GET_DEVICE_INFO, getDeviceInfo);
    yield takeEvery(Actions.EDIT_ROOM, editRoom);
    yield takeEvery(Actions.GET_PATIENT_DOCUMENTS, getDocuments);
    yield takeEvery(Actions.ADD_DOCUMENT, addDocument);
    yield takeEvery(Actions.GET_HEART_DISEASE_RATE, getHeartDiseaseRate);
    yield takeEvery(Actions.GET_DOCUMENTS_FORM, getDocumentsForm);
    yield takeEvery(
        Actions.GET_PATIENTS_TRACKING_LIST,
        getPatientsTrackingList
    );
    yield takeEvery(Actions.PATIENT_TRACKING, patientTracking);
    yield takeEvery(Actions.GET_AF_PREDICTION, getAFPrediction);
    yield takeEvery(Actions.EDIT_DOCUMENT, editDocument);

    yield takeEvery(Actions.DELETE_DOCUMENT, deleteDocument);
    yield takeEvery(Actions.ADD_USER, addUser);
    yield takeEvery(Actions.GET_USERS, getUsers);
    yield takeEvery(Actions.GET_USER_DETAIL, getUserDetail);
    yield takeEvery(Actions.GET_MONTH_DUTIES, getMonthDuties);
    yield takeEvery(Actions.GET_ALL_USERS_FOR_DUTY, getAllUsersForDuty);
    yield takeEvery(Actions.ADD_DUTY, addDuty);
    yield takeEvery(Actions.GET_DUTIES_WEEKS, getDutiesOfWeek);
    yield takeEvery(Actions.WARNING_CONNECT, doConnect);
    yield takeEvery(Actions.USER_CHANGE_PASSWORD, userChangePassword);

    yield takeEvery(Actions.DELETE_DEVICES, deleteDevices);

    yield takeEvery(Actions.EDIT_DEVICE, editDevice);

    yield takeEvery(Actions.GET_PATIENT_REPORT, getPatientReport);

    yield takeEvery(
        Actions.GET_TEMPERATURE_CHART_DATA,
        getTemperatureChartData
    );

    yield takeEvery(Actions.GET_HEART_RATE_CHART_DATA, getHeartRateChartData);
    yield takeEvery(Actions.DELETE_DUTY, deleteDuty);
    yield takeEvery(Actions.EDIT_DUTY, editDuty);

    yield takeEvery(Actions.DELETE_USERS, deleteUsers);

    yield takeEvery(Actions.DELETE_SETTING, deleteSetting);

    yield takeEvery(Actions.EDIT_USER_DETAIL, editUserDetail);
}

export default mySaga;
