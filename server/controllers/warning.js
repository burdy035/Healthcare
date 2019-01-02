import csv from "csvtojson";

import path from "path";

import { Types } from "mongoose";

import brain from "brain.js";

import Rooms from "../models/rooms";

import Data from "../models/patientData";

import Model from "../models/model";

import SerialPort from "serialport";

import moment from "moment";

const ObjectId = Types.ObjectId;

const Readline = SerialPort.parsers.Readline;

let clients = {};

const connect = io => {
    let warning = io.of("/warning");
    return async (req, res) => {
        try {
            let Warnings = await Rooms.aggregate([
                {
                    $match: {
                        patient: { $exists: true, $ne: null },
                        cardiacSensor: { $exists: true, $ne: null }
                    }
                },
                {
                    $lookup: {
                        from: "Devices",
                        localField: "cardiacSensor",
                        foreignField: "_id",
                        as: "cardiacSensor"
                    }
                },
                {
                    $lookup: {
                        from: "Patients",
                        localField: "patient",
                        foreignField: "_id",
                        as: "patient"
                    }
                }
            ]);

            if (!Warnings) {
                res.status(404).json({
                    success: false,
                    error: "Not found!"
                });
            } else {
                Warnings.map(w => {
                    if (w.cardiacSensor[0]) {
                        let sensor = w.cardiacSensor[0];
                        let patientObj = w.patient[0];

                        let warningFlag = false;
                        let nextTimeWarning = 0;
                        let bpmData = new Array(10);
                        let interval = null;
                        warning.on("connection", socket => {
                            if (!clients[socket.id]) {
                                clients[socket.id] = socket.id;

                                interval = setInterval(() => {
                                    let currentTime = new Date().getTime();
                                    let bpm =
                                        Math.floor(Math.random() * 21) + 50;

                                    if (
                                        bpm > 75 &&
                                        currentTime >= nextTimeWarning
                                    ) {
                                        warningFlag = true;
                                    }

                                    if (warningFlag) {
                                        socket.emit("warning-bpm", {
                                            bpm: bpm,
                                            patient: patientObj.name,
                                            room: w.room
                                        });
                                    }
                                }, 10050);

                                socket.on("close-warning", data => {
                                    warningFlag = false;
                                    nextTimeWarning =
                                        new Date().getTime() + 3000000;
                                    console.log("close");
                                });

                                socket.on("disconnect", () => {
                                    console.log("Disconnect");
                                    clearInterval(interval);

                                    delete clients[socket.id];
                                });
                            } else {
                                socket = null;
                            }
                        });
                    }
                });

                res.status(200).json({
                    success: true
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const connectNormal = io => {
    io.on("connection", socket => {
        console.log(socket.id);
        console.log("Connec normal connected");
    });

    let warning = io.of("/warning");
    return async (req, res) => {
        try {
            let hrNet = new brain.NeuralNetwork();

            let Warnings = await Rooms.aggregate([
                {
                    $match: {
                        patient: { $exists: true, $ne: null },
                        cardiacSensor: { $exists: true, $ne: null }
                    }
                },
                {
                    $lookup: {
                        from: "Devices",
                        localField: "cardiacSensor",
                        foreignField: "_id",
                        as: "cardiacSensor"
                    }
                },
                {
                    $lookup: {
                        from: "Devices",
                        localField: "temperatureSensor",
                        foreignField: "_id",
                        as: "temperatureSensor"
                    }
                },
                {
                    $lookup: {
                        from: "Patients",
                        localField: "patient",
                        foreignField: "_id",
                        as: "patient"
                    }
                }
            ]);

            let hrDetectionModel = await Model.findOne({
                type: "heartRateDetection"
            });

            hrNet.fromJSON(JSON.parse(hrDetectionModel.model));

            if (!Warnings) {
                res.status(404).json({
                    success: false,
                    error: "Not found!"
                });
            } else {
                // let BPMData = await csv({ noheader: true }).fromFile(
                //     path.resolve(__dirname, "../adataset/normalBPM.csv")
                // );

                let BPMData = await csv({ noheader: true }).fromFile(
                    path.resolve(__dirname, "../adataset/dangerBPM.csv")
                );

                let temperatureData = await csv({ noheader: true }).fromFile(
                    path.resolve(__dirname, "../adataset/normalTem.csv")
                );

                temperatureData = temperatureData[0];

                BPMData = BPMData[0];

                warning.on("connection", socket => {
                    console.log("Inside Connections!!!!");
                    if (!clients[socket.id]) {
                        clients[socket.id] = socket.id;
                        Warnings.map(w => {
                            let patientObj = w.patient[0];

                            if (w.cardiacSensor[0]) {
                                let warningFlag = false;

                                let nextTimeWarning = 0;

                                let interval = null;

                                let currentIndex = 0;

                                let hrFlag = null;

                                let hrInput = [];

                                let hrArray = [];

                                let saveHrArray = [];

                                let lastTimeSaveHrArr = new Date().getTime();

                                interval = setInterval(async () => {
                                    console.time();
                                    let currentTime = new Date().getTime();
                                    let bpm =
                                        BPMData[`field${currentIndex + 1}`];

                                    saveHrArray.push(bpm);

                                    if (
                                        lastTimeSaveHrArr <=
                                        currentTime - 300000
                                    ) {
                                        let saveState = await saveHeartRate(
                                            patientObj._id,
                                            saveHrArray
                                        );

                                        if (saveState === "success") {
                                            saveHrArray = [];
                                            lastTimeSaveHrArr = new Date().getTime();
                                        } else if (saveState === "fail") {
                                            lastTimeSaveHrArr = new Date().getTime();
                                        }
                                    }

                                    hrArray.push(bpm);

                                    if (!hrFlag) {
                                        hrFlag = bpm;
                                    }

                                    hrInput.push(Math.abs(bpm - hrFlag));

                                    // console.log("hrArray: ", hrArray);

                                    // console.log("hrInput: ", hrInput);

                                    // console.log("hrFlag: ", hrFlag);

                                    if (hrInput.length === 10) {
                                        let hrType = hrNet.run(hrInput);
                                        console.log("hrInput: ", hrInput);
                                        console.log("HrType", hrType);

                                        if (
                                            hrType["danger"] >
                                                hrType["normal"] &&
                                            currentTime >= nextTimeWarning &&
                                            !warningFlag
                                        ) {
                                            warningFlag = true;
                                        }

                                        hrArray.shift();

                                        hrFlag = hrArray[0];

                                        // console.log("hrFlag 2: ", hrFlag);

                                        hrInput = [];

                                        hrArray.map(hr => {
                                            hrInput.push(Math.abs(hr - hrFlag));
                                        });

                                        // console.log("hrInput 2: ", hrInput);
                                    }

                                    if (warningFlag) {
                                        socket.emit("warning-bpm", {
                                            bpm: bpm,
                                            patient: patientObj.name,
                                            room: w.room
                                        });
                                    }
                                    currentIndex++;

                                    if (
                                        currentIndex ===
                                        Object.keys(BPMData).length
                                    ) {
                                        currentIndex = 0;
                                    }

                                    console.timeEnd();
                                }, 10000);

                                socket.on("close-warning", data => {
                                    warningFlag = false;
                                    nextTimeWarning =
                                        new Date().getTime() + 3000000;
                                    // console.log("close");
                                });

                                socket.on("disconnect", () => {
                                    console.log("Disconnect");
                                    clearInterval(interval);

                                    delete clients[socket.id];
                                });
                            }

                            if (w.temperatureSensor[0]) {
                                let warningFlag = false;

                                let nextTimeWarning = 0;

                                let interval = null;

                                let currentIndex = 0;

                                let testTemArr = [];

                                let saveTemperatureArr = [];

                                let temFlag = null;

                                let temInput = [];

                                let lastTimeSaveTemperatureArr = new Date().getTime();

                                interval = setInterval(async () => {
                                    let currentTime = new Date().getTime();
                                    let temperature =
                                        temperatureData[
                                            `field${currentIndex + 1}`
                                        ];

                                    saveTemperatureArr.push(temperature);

                                    if (
                                        lastTimeSaveTemperatureArr <=
                                        currentTime - 300000
                                    ) {
                                        let saveState = await saveTemperatureData(
                                            patientObj._id,
                                            saveTemperatureArr
                                        );

                                        if (saveState === "success") {
                                            saveTemperatureArr = [];
                                            lastTimeSaveTemperatureArr = new Date().getTime();
                                        } else if (saveState === "fail") {
                                            lastTimeSaveTemperatureArr = new Date().getTime();
                                        }
                                    }

                                    testTemArr.push(temperature);

                                    if (!temFlag) {
                                        temFlag = temperature;
                                    }

                                    temInput.push(
                                        Math.abs(temperature - temFlag) * 10
                                    );

                                    if (temInput.length === 10) {
                                        let temType = hrNet.run(temInput);
                                        console.log("TemType: ", temType);

                                        if (
                                            temType["danger"] >
                                                temType["normal"] &&
                                            currentTime >= nextTimeWarning &&
                                            !warningFlag
                                        ) {
                                            warningFlag = true;
                                        }

                                        testTemArr.shift();

                                        temFlag = testTemArr[0];

                                        // console.log("hrFlag 2: ", hrFlag);

                                        temInput = [];

                                        testTemArr.map(tem => {
                                            temInput.push(
                                                Math.abs(tem - temFlag)
                                            );
                                        });
                                    }

                                    if (warningFlag) {
                                        socket.emit("warning-temperature", {
                                            temperature,
                                            patient: patientObj.name,
                                            room: w.room
                                        });
                                    }
                                    currentIndex++;

                                    if (
                                        currentIndex ===
                                        Object.keys(temperatureData).length
                                    ) {
                                        currentIndex = 0;
                                    }
                                }, 10000);
                            }
                        });
                    } else {
                        socket = null;
                    }
                });

                res.status(200).json({
                    success: true
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const saveHeartRate = async (id, data) => {
    try {
        let date = moment().format("DD-MM-YYYY");

        let result = await Data.updateOne(
            {
                patientId: ObjectId(id),
                type: "heartRate",
                date: date
            },
            {
                $push: {
                    data: data
                }
            },
            { upsert: true }
        );
        if (result) {
            return "success";
        }
        return "fail";
    } catch (error) {
        return "fail";
    }
};

const saveTemperatureData = async (id, data) => {
    try {
        let date = moment().format("DD-MM-YYYY");

        console.log("Date: ", date);

        let result = await Data.updateOne(
            {
                patientId: ObjectId(id),
                type: "temperature",
                date: date
            },
            {
                $push: {
                    data: data
                }
            },
            { upsert: true }
        );
        if (result) {
            return "success";
        }
        return "fail";
    } catch (error) {
        return "fail";
    }
};

export default {
    connect,
    connectNormal
};
