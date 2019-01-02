"use strict";

import roomControllers from "../controllers/rooms";

import checkToken from "../middleware/auth";

const roomRoutes = (app, io) => {
    app.get("/rooms", checkToken, roomControllers.getRooms);

    app.post("/add-room", checkToken, roomControllers.addRoom);

    app.get("/room-devices-info", checkToken, roomControllers.getDevicesInfo);

    app.post("/edit-room", checkToken, roomControllers.editRoom);
};

export default roomRoutes;
