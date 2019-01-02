"use strict";

import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
import http from "http";

import socketIO from "socket.io";

import routes from "./routes";
import connectDatabase from "./config/database";

import init from "./services/init";

const app = express();
const api = express.Router();

const server = http.createServer(app);

const io = socketIO(server);

server.listen(3002);

dotenv.config();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.header("Access-Control-Request-Headers", "Content-Type");
    next();
});

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(express.static(path.join(__dirname, "../public")));

// io.sockets.on("connection", socket => {
//     console.log("connection", socket.id);
// });

routes(api, io);

app.use("/api", api);

// io.on("connection", socket => {
//     console.log("User connected");

//     socket.on("disconnect", () => {
//         console.log("user disconnected");
//     });
// });

app.listen(process.env.SERVER_PORT || 5001, async err => {
    if (err) {
        console.log(
            `Can not listen at http://localhost:${process.env.SERVER_PORT ||
                5001}`
        );
    } else {
        console.log(
            `Server is running at http://localhost:${process.env.SERVER_PORT ||
                5001}`
        );
        let r = await connectDatabase();
        if (r === "success") {
            init();
        }
    }
});
