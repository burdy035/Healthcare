"use strict";

import Rooms from "../models/rooms";
import Devices from "../models/devices";
import Models from "../models/model";

import brain from "brain.js";

import { Types } from "mongoose";
import SerialPort from "serialport";
import path from "path";

const ObjectId = Types.ObjectId;

const Readline = SerialPort.parsers.Readline;

import csv from "csvtojson";

let clients = {};

const patientTracking = io => {
    let chat = io.of("/chat");

    return async (req, res) => {
        try {
            const { id } = req.query;

            if (!id || !ObjectId.isValid(id)) {
                res.status(404).json({ success: false });
            }

            let Room = await Rooms.findOne({ _id: id });

            let cardiacSensorId = Room.cardiacSensor;
            let temperatureSensorId = Room.temperatureSensor;

            let cardiacSensor;
            let temperatureSensor;

            let cardiacSensorPort;
            let temperatureSensorPort;

            if (cardiacSensorId) {
                cardiacSensor = await Devices.findOne({
                    _id: ObjectId(cardiacSensorId)
                });
            }

            if (temperatureSensorId) {
                temperatureSensor = await Devices.findOne({
                    _id: ObjectId(temperatureSensorId)
                });

                console.log(temperatureSensor);
            }

            chat.on("connection", async socket => {
                console.log("Connection!!!!");

                if (!clients[socket.id]) {
                    clients[socket.id] = socket.id;
                    if (cardiacSensor) {
                        cardiacSensorPort = new SerialPort(cardiacSensor.port, {
                            baudRate: 115200
                        });

                        const parser = new Readline();

                        cardiacSensorPort.pipe(parser);

                        let signalRegex = RegExp("Signal: [0-9]+", "g");

                        let bpmRegex = RegExp("BPM: [0-9]+", "g");

                        parser.on("data", data => {
                            let arr = data.split(" ");
                            if (signalRegex.test(data)) {
                                socket.emit("signal", {
                                    signal: parseInt(arr[1])
                                });
                            } else if (bpmRegex.test(data)) {
                                socket.emit("bpm", {
                                    bpm: parseInt(arr[1])
                                });
                            }
                        });

                        let a = null;
                        let i = 0;

                        let data = [];
                        let jsonArr = [];

                        const csvFilePath = path.join(
                            __dirname,
                            "../adataset/samples.csv"
                        );
                        jsonArr = await csv().fromFile(csvFilePath);
                        delete jsonArr[0];

                        jsonArr.map(i => {
                            return data.push(i["'ECG '"]);
                        });

                        a = setInterval(() => {
                            socket.emit("ecg-signal", { s: data[i] });
                            i++;
                            if (i === data.length) {
                                i = 0;
                            }
                        }, 100);
                    }

                    if (temperatureSensor) {
                        temperatureSensorPort = new SerialPort(
                            temperatureSensor.port,
                            {
                                baudRate: 115200
                            }
                        );

                        const parser = new Readline();

                        temperatureSensorPort.pipe(parser);

                        let temperatureRegex = RegExp(
                            "Temperature: [0-9][0-9].[0-9]+",
                            "g"
                        );

                        parser.on("data", data => {
                            let arr = data.split(" ");

                            if (temperatureRegex.test(data)) {
                                socket.emit("temperature", {
                                    temperature: parseFloat(arr[1])
                                });
                            }
                        });
                    }

                    socket.on("close", () => {
                        if (cardiacSensor.isOpen) {
                            cardiacSensorPort.close(err => {
                                if (!err) {
                                    if (temperatureSensor.isOpen) {
                                        temperatureSensor.close(err => {
                                            console.log("Tem closed");
                                            socket.emit(
                                                "allow-to-change-screen",
                                                { a: 1 }
                                            );
                                        });
                                    } else {
                                        socket.emit("allow-to-change-screen", {
                                            a: 1
                                        });
                                    }
                                }
                            });
                        } else {
                            socket.emit("allow-to-change-screen", { a: 1 });
                        }
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
};

const afPrediction = async (req, res) => {
    try {
        let { values } = req.body;

        let afModel = await Models.findOne({ type: "afPrediction" });

        var net = new brain.NeuralNetwork({
            hiddenLayers: [200, 200, 200]
        });

        net.fromJSON(JSON.parse(afModel.model));

        values = values.map(v => {
            return parseFloat(v);
        });

        res.status(200).json({
            success: true,
            data: {
                rate: 70
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const patientTrackingNormal = io => {
    io.on("connection", () => {
        console.log("Patient inside tracking Connection");
    });

    let chat = io.of("/chat");

    return async (req, res) => {
        try {
            io.on("connection", () => {
                console.log("Warning 123 5 Connection");
            });

            const { id } = req.query;

            if (!id || !ObjectId.isValid(id)) {
                res.status(404).json({ success: false });
            }

            let Room = await Rooms.findOne({ _id: id });

            let BPMData = await csv({ noheader: true }).fromFile(
                path.resolve(__dirname, "../adataset/normalBPM.csv")
            );

            BPMData = BPMData[0];

            let temperatureData = await csv({ noheader: true }).fromFile(
                path.resolve(__dirname, "../adataset/normalTem.csv")
            );

            temperatureData = temperatureData[0];

            let ecgData = await csv().fromFile(
                path.resolve(__dirname, "../adataset/A4336.csv")
            );
            delete ecgData[0];

            ecgData = ecgData.map(i => {
                return i["'ECG '"];
            });

            let currentIndexBPM = 0;

            let currentIndexEcg = 0;

            let currentIndexTem = 0;

            let interval = null;

            let intervalEcg = null;

            let intervalTem = null;

            chat.on("connection", async socket => {
                console.log("Connection!!!!");

                if (!clients[socket.id]) {
                    clients[socket.id] = socket.id;

                    interval = setInterval(() => {
                        let bpm = BPMData[`field${currentIndexBPM + 1}`];

                        socket.emit("bpm", {
                            bpm: bpm
                        });

                        currentIndexBPM++;

                        if (currentIndexBPM === Object.keys(BPMData).length) {
                            currentIndexBPM = 0;
                        }
                    }, 1000);

                    intervalEcg = setInterval(() => {
                        let ecgSignal = ecgData[currentIndexEcg];

                        socket.emit("ecg-signal", { s: ecgSignal });

                        currentIndexEcg++;

                        if (currentIndexEcg === ecgData.length) {
                            currentIndexEcg = 0;
                        }
                    }, 120);

                    intervalTem = setInterval(() => {
                        let temperature =
                            temperatureData[`field${currentIndexTem + 1}`];

                        socket.emit("temperature", {
                            temperature: temperature
                        });

                        currentIndexTem++;

                        if (
                            currentIndexTem ===
                            Object.keys(temperatureData).length
                        ) {
                            currentIndexTem = 0;
                        }
                    }, 1000);

                    socket.on("close", () => {
                        clearInterval(interval);
                        clearInterval(intervalEcg);
                        clearInterval(intervalTem);
                        socket.emit("allow-to-change-screen", { a: 1 });
                    });
                }
            });

            res.status(200).json({
                success: true,
                data: {}
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export default {
    patientTracking,
    afPrediction,
    patientTrackingNormal
};
