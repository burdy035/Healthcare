"use strict";

import reportControllers from "../controllers/report";

import checkToken from "../middleware/auth";

const reportRoutes = (app, io) => {
    app.get(
        "/get-patient-report",
        checkToken,
        reportControllers.getPatientReport
    );

    app.post(
        "/get-temperature-chart-data",
        reportControllers.getTemperatureChartData
    );

    app.post(
        "/get-hert-rate-chart-data",
        reportControllers.getHeartRateChartData
    );
};

export default reportRoutes;
