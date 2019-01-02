"use strict";

import patientsControllers from "../controllers/patients";

import checkToken from "../middleware/auth";

const patientsRoutes = (app, io) => {
    app.get(
        "/patients-tracking-list",
        checkToken,
        patientsControllers.getPatientsTrackingList
    );
};

export default patientsRoutes;
