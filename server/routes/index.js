"use strict";

import HomeRoutes from "./home";
import Auth from "./auth";
import DevicesRoutes from "./devices";
import DeviceTypesRoutes from "./deviceTypes";
import SettingRoutes from "./settings";
import RoomRoutes from "./rooms";
import DocumentsRoutes from "./documents";
import PatientsRoutes from "./patients";
import PatientTrackingRoutes from "./patientTracking";
import UserRoutes from "./users";
import DutyRoutes from "./duty";
import WarningRoutes from "./warning";

import ReportRoutes from "./report";

const routes = (app, io) => {
    io.on("connection", socket => {
        console.log("1234 Connection: ");
    });

    HomeRoutes(app, io);
    Auth(app);
    DevicesRoutes(app);
    DeviceTypesRoutes(app);
    SettingRoutes(app);
    RoomRoutes(app);
    DocumentsRoutes(app);
    PatientsRoutes(app);
    PatientTrackingRoutes(app, io);
    UserRoutes(app);
    DutyRoutes(app);
    WarningRoutes(app, io);
    ReportRoutes(app);
};

export default routes;
