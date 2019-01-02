"use strict";

import settingsControllers from "../controllers/settings";

import checkToken from "../middleware/auth";

const settingRoute = app => {
    app.get("/setting-data", checkToken, settingsControllers.getSettingData);

    app.post(
        "/add-device-state",
        checkToken,
        settingsControllers.addDeviceState
    );

    app.post(
        "/add-setting-data",
        checkToken,
        settingsControllers.addSettingData
    );
};

export default settingRoute;
