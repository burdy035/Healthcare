"use strict";

import homeControllers from "../controllers/home";

import checkToken from "../middleware/auth";

import validate from "../middleware/validateFields";

const homeRoutes = (app, io) => {
    app.get(
        "/get-month-duties",
        checkToken,
        validate("get", ["id"]),
        homeControllers.getMonthDuties
    );
};

export default homeRoutes;
