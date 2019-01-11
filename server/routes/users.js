"use strict";

import userControllers from "../controllers/users";

import checkToken from "../middleware/auth";

import validate from "../middleware/validateFields";

const userRoutes = (app, io) => {
    app.get("/get-users", checkToken, userControllers.getUsers);

    app.post("/add-user", checkToken, userControllers.addUser);

    app.get("/get-user-detail", checkToken, userControllers.getUserDetail);

    app.post(
        "/user-change-password",
        checkToken,
        validate("post", ["id", "password", "cpassword", "userId"]),
        userControllers.changePassword
    );

    app.post(
        "/delete-users",
        checkToken,
        validate("post", ["id", "userIds"]),
        userControllers.deleteUsers
    );

    app.post("/edit-user-detail", checkToken, userControllers.editUserDetail);
};

export default userRoutes;
