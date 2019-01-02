"use strict";

import homeControllers from "../controllers/home";

import checkToken from "../middleware/auth";

const homeRoutes = (app, io) => {
    app.get("/get-month-duties", checkToken, homeControllers.getMonthDuties);
};

export default homeRoutes;
