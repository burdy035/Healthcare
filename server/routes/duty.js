"use strict";

import dutyControllers from "../controllers/duty";

import checkToken from "../middleware/auth";

import validate from "../middleware/validateFields";

const dutyRoutes = app => {
    app.get(
        "/get-all-users-for-duty",
        checkToken,
        validate("get", ["id"]),
        dutyControllers.getAllUsers
    );

    app.post("/add-duty", checkToken, dutyControllers.addDuty);

    app.post(
        "/get-duties-of-week",
        checkToken,
        validate("post", ["id"]),
        dutyControllers.getDutiesOfWeek
    );

    app.post("/delete-duty", checkToken, dutyControllers.deleteDuty);

    app.post("/edit-duty", checkToken, dutyControllers.editDuty);
};

export default dutyRoutes;
