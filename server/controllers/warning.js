import csv from "csvtojson";

import path from "path";

import fs from "fs";

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
                },
                {
                    $unwind: "$cardiacSensor"
                },
                {
                    $unwind: "$temperatureSensor"
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
                warning.on("connection", socket => {
                    if (!clients[socket.id]) {
                        clients[socket.id] = socket.id;
                        Warnings.map(w => {
                            let patientObj = w.patient[0];

                            let cardiacSensorPort;
                            let temperatureSensorPort;
                            if (w.cardiacSensor) {
                                const { cardiacSensor } = w;

                                let warningFlag = false;

                                let nextTimeWarning = 0;

                                let hrFlag = null;

                                let hrInput = [];

                                let hrArray = [];

                                let saveHrArray = [];

                                let lastTimeSaveHrArr = new Date().getTime();

                                cardiacSensorPort = new SerialPort(
                                    cardiacSensor.port,
                                    {
                                        baudRate: 115200
                                    }
                                );

                                const parser = new Readline();

                                cardiacSensorPort.pipe(parser);

                                let bpmRegex = RegExp("BPM: [0-9]+", "g");

                                let ecgRegex = RegExp("Ecg: [0-9]+", "g");

                                let bpm;

                                let saveBPMArr = [];

                                parser.on("data", async data => {
                                    let arr = data.split(" ");

                                    if (bpmRegex.test(data)) {
                                        bpm = arr[1];
                                        bpm = parseFloat(bpm).toFixed(0);

                                        socket.emit("bpm-tracking", {
                                            bpm: bpm
                                        });

                                        // saveBPMArr.push(bpm);
                                        // if (saveBPMArr.length === 100) {
                                        //     fs.writeFileSync(
                                        //         path.resolve(
                                        //             __dirname,
                                        //             "../dataset/bpm-signals.json"
                                        //         ),
                                        //         JSON.stringify(saveBPMArr)
                                        //     );
                                        // }

                                        let currentTime = new Date().getTime();

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

                                        if (hrInput.length === 10) {
                                            let hrType = hrNet.run(hrInput);
                                            // console.log("hrInput: ", hrInput);
                                            // console.log("HrType", hrType);

                                            if (
                                                hrType["danger"] >
                                                    hrType["normal"] &&
                                                currentTime >=
                                                    nextTimeWarning &&
                                                !warningFlag
                                            ) {
                                                warningFlag = true;
                                            }

                                            hrArray.shift();

                                            hrFlag = hrArray[0];

                                            hrInput = [];

                                            hrArray.map(hr => {
                                                hrInput.push(
                                                    Math.abs(hr - hrFlag)
                                                );
                                            });
                                        }

                                        if (warningFlag) {
                                            socket.emit("warning-bpm", {
                                                bpm: bpm,
                                                patient: {
                                                    name: patientObj.name,
                                                    id: patientObj._id
                                                },
                                                room: w.room
                                            });
                                        }
                                    }

                                    if (ecgRegex.test(data)) {
                                        let ecg = arr[1];
                                        ecg = (ecg / 1000).toFixed(3);
                                        // saveEcgSignals.push(ecg);
                                        socket.emit("ecg-signal-tracking", {
                                            s: ecg
                                        });
                                    }
                                });
                                socket.on(
                                    `close-warning-cardiac-${patientObj._id}`,
                                    data => {
                                        console.log(
                                            "Close ---- warning ---- cariac"
                                        );
                                        warningFlag = false;
                                        nextTimeWarning =
                                            new Date().getTime() + 300000;
                                    }
                                );

                                socket.on("disconnect", () => {
                                    delete clients[socket.id];
                                });
                            }

                            if (w.temperatureSensor) {
                                const { temperatureSensor } = w;

                                let warningFlag = false;

                                let nextTimeWarning = 0;

                                let testTemArr = [];

                                let saveTemperatureArr = [];

                                let temFlag = null;

                                let temInput = [];

                                let lastTimeSaveTemperatureArr = new Date().getTime();

                                temperatureSensorPort = new SerialPort(
                                    temperatureSensor.port,
                                    {
                                        baudRate: 115200
                                    }
                                );

                                const parser = new Readline();

                                temperatureSensorPort.pipe(parser);

                                let temperature;
                                let saveTemArr = [];
                                parser.on("data", async data => {
                                    temperature = parseFloat(data).toFixed(1);
                                    saveTemArr.push(temperature);

                                    console.log(
                                        "Temp:",
                                        temperature,
                                        saveTemArr.length
                                    );
                                    socket.emit("temperature-tracking", {
                                        temperature
                                    });

                                    if (saveTemArr.length === 100) {
                                        fs.writeFileSync(
                                            path.resolve(
                                                __dirname,
                                                "../dataset/temperature-signals.json"
                                            ),
                                            JSON.stringify(saveTemArr)
                                        );
                                    }

                                    let currentTime = new Date().getTime();

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
                                            patient: {
                                                name: patientObj.name,
                                                id: patientObj._id
                                            },
                                            room: w.room
                                        });
                                    }
                                });

                                socket.on(
                                    `close-warning-temperature-${
                                        patientObj._id
                                    }`,
                                    data => {
                                        console.log("Close ---- warning");

                                        warningFlag = false;
                                        nextTimeWarning =
                                            new Date().getTime() + 300000;
                                    }
                                );
                            }

                            socket.on("disconnect", () => {
                                console.log("Disconnect");

                                cardiacSensorPort.close(err => {
                                    console.log(err);
                                });

                                temperatureSensorPort.close(err => {
                                    console.log(err);
                                });

                                delete clients[socket.id];
                            });
                        });
                    } else {
                        socket = null;
                    }
                });

                res.json({
                    success: true,
                    data: {}
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const connectNormal = io => {
    // io.on("connection", socket => {
    //     console.log("Connec normal connected");
    // });
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
                //     path.resolve(__dirname, "../dataset/normalBPM.csv")
                // );

                // let BPMData = await csv({ noheader: true }).fromFile(
                //     path.resolve(__dirname, "../dataset/dangerBPM.csv")
                // );

                // let temperatureData = await csv({ noheader: true }).fromFile(
                //     path.resolve(__dirname, "../dataset/normalTem.csv")
                // );

                // temperatureData = temperatureData[0];

                // BPMData = BPMData[0];

                let BPMData = JSON.parse(
                    fs.readFileSync(
                        path.resolve(__dirname, "../dataset/bpm-signals.json")
                    )
                );

                let temperatureData = JSON.parse(
                    fs.readFileSync(
                        path.resolve(
                            __dirname,
                            "../dataset/temperature-signals.json"
                        )
                    )
                );

                warning.on("connection", socket => {
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
                                    let currentTime = new Date().getTime();
                                    // let bpm = BPMData[`field${currentIndex + 1}`];
                                    let bpm = BPMData[currentIndex];

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

                                    if (hrInput.length === 10) {
                                        let hrType = hrNet.run(hrInput);
                                        // console.log("hrInput: ", hrInput);
                                        // console.log("HrType", hrType);

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

                                        hrInput = [];

                                        hrArray.map(hr => {
                                            hrInput.push(Math.abs(hr - hrFlag));
                                        });
                                    }

                                    if (warningFlag) {
                                        socket.emit("warning-bpm", {
                                            bpm: bpm,
                                            patient: {
                                                name: patientObj.name,
                                                id: patientObj._id
                                            },
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
                                }, 1000);

                                socket.on(
                                    `close-warning-cardiac-${patientObj._id}`,
                                    data => {
                                        console.log("Close ---- warning");

                                        warningFlag = false;
                                        nextTimeWarning =
                                            new Date().getTime() + 300000;
                                    }
                                );

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
                                        temperatureData[currentIndex];

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
                                            patient: {
                                                name: patientObj.name,
                                                id: patientObj._id
                                            },
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
                                }, 1000);

                                socket.on("close-warning", data => {
                                    console.log("Close ---- warning");

                                    warningFlag = false;
                                    nextTimeWarning =
                                        new Date().getTime() + 300000;
                                });

                                socket.on(
                                    `close-warning-temperature-${
                                        patientObj._id
                                    }`,
                                    data => {
                                        console.log("Close ---- warning");

                                        warningFlag = false;
                                        nextTimeWarning =
                                            new Date().getTime() + 300000;
                                    }
                                );

                                socket.on("disconnect", () => {
                                    console.log("Disconnect");
                                    clearInterval(interval);

                                    delete clients[socket.id];
                                });
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
