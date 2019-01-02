"use strict";

import dutyControllers from "../controllers/duty";

import checkToken from "../middleware/auth";

const dutyRoutes = app => {
    app.get("/get-all-users-for-duty", checkToken, dutyControllers.getAllUsers);

    app.post("/add-duty", checkToken, dutyControllers.addDuty);

    app.post(
        "/get-duties-of-week",
        checkToken,
        dutyControllers.getDutiesOfWeek
    );

    app.post("/delete-duty", checkToken, dutyControllers.deleteDuty);

    app.post("/edit-duty", checkToken, dutyControllers.editDuty);
};

export default dutyRoutes;
