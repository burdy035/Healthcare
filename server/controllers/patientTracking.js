"use strict";

import Rooms from "../models/rooms";
import Devices from "../models/devices";
import Models from "../models/model";

import fs from "fs";

import brain from "brain.js";

import { Types } from "mongoose";
import SerialPort from "serialport";
import path from "path";

const ObjectId = Types.ObjectId;

const Readline = SerialPort.parsers.Readline;

import csv from "csvtojson";

let clients = {};

const patientTracking = async (req, res) => {
    try {
        const { roomId } = req.query;

        if (!roomId || !ObjectId.isValid(roomId)) {
            res.status(404).json({ success: false });
        }

        res.json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.log(error);
    }
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
    let chat = io.of("/chat");

    return async (req, res) => {
        try {
            const { id } = req.query;

            if (!id || !ObjectId.isValid(id)) {
                res.status(404).json({ success: false });
            }

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

            let ecgData = JSON.parse(
                fs.readFileSync(
                    path.resolve(__dirname, "../dataset/ecg-signals.json")
                )
            );

            let currentIndexBPM = 0;

            let currentIndexEcg = 0;

            let currentIndexTem = 0;

            let interval = null;

            let intervalEcg = null;

            let intervalTem = null;

            chat.on("connection", async socket => {
                // console.log("Connection!!!!");

                if (!clients[socket.id]) {
                    clients[socket.id] = socket.id;

                    interval = setInterval(() => {
                        let bpm = parseFloat(BPMData[currentIndexBPM]);

                        socket.emit("bpm-tracking", {
                            bpm: bpm
                        });

                        currentIndexBPM++;

                        if (currentIndexBPM === Object.keys(BPMData).length) {
                            currentIndexBPM = 0;
                        }
                    }, 1000);

                    intervalEcg = setInterval(() => {
                        let ecgSignal = parseFloat(ecgData[currentIndexEcg]);

                        socket.emit("ecg-signal-tracking", { s: ecgSignal });

                        currentIndexEcg++;

                        if (currentIndexEcg === ecgData.length) {
                            currentIndexEcg = 0;
                        }
                    }, 120);

                    intervalTem = setInterval(() => {
                        let temperature = temperatureData[currentIndexTem];

                        socket.emit("temperature-tracking", {
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
