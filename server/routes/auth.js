"use strict";

import authControllers from "../controllers/auth";

const auth = app => {
    app.post("/login", authControllers.login);

    app.post(
        "/check-user-authentication",
        authControllers.checkUserAuthentication
    );
};

export default auth;
