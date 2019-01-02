"use strict";

import deviceControllers from "../controllers/devices";

import checkToken from "../middleware/auth";

const DevicesRoutes = (app, io) => {
    app.post("/add-device", checkToken, deviceControllers.addDevice);

    app.get("/devices", checkToken, deviceControllers.getDevices);

    app.get(
        "/add-device-data-form",
        checkToken,
        deviceControllers.getAddDeviceDataForm
    );

    app.post("/delete-devices", checkToken, deviceControllers.deleteDevices);

    app.post("/edit-device", checkToken, deviceControllers.editDevice);
};

export default DevicesRoutes;
