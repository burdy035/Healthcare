import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import home from "./home";
import auth from "./auth";
import deviceTypes from "./deviceTypes";
import devices from "./devices";
import settings from "./settings";
import rooms from "./rooms";
import documents from "./documents";
import patients from "./patients";
import patientTracking from "./patientTracking";
import users from "./users";
import duty from "./duty";
import report from "./report";
import warning from "./warning";

export default combineReducers({
    home,
    auth,
    deviceTypes,
    devices,
    settings,
    rooms,
    documents,
    patients,
    patientTracking,
    users,
    duty,
    warning,
    report,
    routing: routerReducer
});
