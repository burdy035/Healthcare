"use strict";

import deviceTypesControllers from "../controllers/deviceTypes";

const DevicesTypesRoutes = (app, io) => {
    app.post("/add-device-type", deviceTypesControllers.addDeviceType);

    app.get("/device-types", deviceTypesControllers.getDeviceTypes);

    app.post("/delete-device-type", deviceTypesControllers.deleteDeviceType);
};

export default DevicesTypesRoutes;
