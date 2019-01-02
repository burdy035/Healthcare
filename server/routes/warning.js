"use strict";

import warningControllers from "../controllers/warning";

const warningRoutes = (app, io) => {
    io.on("connection", () => {
        console.log("Warning Connection");
    });

    // app.get("/warning-connect", warningControllers.connect(io));

    app.get("/warning-connect", warningControllers.connectNormal(io));
};

export default warningRoutes;
