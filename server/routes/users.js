"use strict";

import userControllers from "../controllers/users";

import checkToken from "../middleware/auth";

const userRoutes = (app, io) => {
    app.get("/get-users", checkToken, userControllers.getUsers);

    app.post("/add-user", checkToken, userControllers.addUser);

    app.get("/get-user-detail", checkToken, userControllers.getUserDetail);

    app.post(
        "/user-change-password",
        checkToken,
        userControllers.changePassword
    );

    app.post("/delete-users", checkToken, userControllers.deleteUsers);
};

export default userRoutes;
