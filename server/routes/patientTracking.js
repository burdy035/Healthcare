"use strict";

import patientTrackingControllers from "../controllers/patientTracking";

import checkToken from "../middleware/auth";

const patientTrackingRoutes = (app, io) => {
    io.on("connection", () => {
        console.log("Patient tracking Connection");
    });

    // app.get(
    //     "/live-patient-tracking",
    //     patientTrackingControllers.patientTracking(io)
    // );

    app.get(
        "/live-patient-tracking",
        patientTrackingControllers.patientTrackingNormal(io)
    );

    app.post(
        "/af-prediction",
        checkToken,
        patientTrackingControllers.afPrediction
    );
};

export default patientTrackingRoutes;
