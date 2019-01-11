import Documents from "../models/patientsDocuments";
import Data from "../models/patientData";
import Models from "../models/model";

import brain from "brain.js";

import { Types } from "mongoose";

import moment from "moment";

import svm from "node-svm";

const ObjectId = Types.ObjectId;

let hrNet = new brain.NeuralNetwork({
    hiddenLayers: [200, 200, 200]
});

let keys = [
    "age",
    "gender",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak"
];

const getPatientReport = async (req, res) => {
    try {
        let afPredictionModel = await Models.findOne({ type: "afPrediction" });

        const { patientId } = req.query;

        let doc = await Documents.findOne({ _id: ObjectId(patientId) });

        let before = {
            cp: doc.cp,
            trestbps: doc.trestbps,
            fbs: doc.fbs,
            restecg: doc.restecg,
            thalach: doc.thalach,
            exang: doc.exang
        };

        let update = doc.update ? doc.update : {};

        let hrData = await getHeartRateData(patientId, "week", 1);
        let temData = await getTemperatureData(patientId, "week", 1);

        let ecgRecord = await Data.findOne({
            patientId: patientId,
            type: "ecgRecord"
        });

        hrNet.fromJSON(JSON.parse(afPredictionModel.model));

        let afPredictRate = hrNet.run(ecgRecord.data);
        afPredictRate = afPredictRate["A"];

        let patientDoc = await Documents.findOne({ _id: ObjectId(patientId) });

        let hdInput = keys.map(k => {
            return parseFloat(patientDoc[k]);
        });

        let heartDiseaseModel = await Models.findOne({
            type: "heartDiseaseRate"
        });

        let clf = new svm.restore(JSON.parse(heartDiseaseModel.model));

        let hdPrediction = clf.predictProbabilitiesSync(hdInput);

        hdPrediction = hdPrediction["1"];

        if (!doc) {
            res.json({
                success: false,
                error: "Khong tim thay"
            });
        } else {
            res.status(200).json({
                success: true,
                data: {
                    before,
                    update,
                    hrData,
                    temData,
                    afPredictRate,
                    hdPrediction
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Co loi"
        });
    }
};

const getTemperatureChartData = async (req, res) => {
    try {
        let { patientId, type, numbers } = req.body;

        let temData = await getTemperatureData(patientId, type, numbers);

        res.json({
            success: true,
            data: {
                temData
            }
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: "Co loi"
        });
    }
};

const getHeartRateChartData = async (req, res) => {
    try {
        let { patientId, type, numbers } = req.body;

        let hrData = await getHeartRateData(patientId, type, numbers);

        res.json({
            success: true,
            data: {
                hrData
            }
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: "Co loi"
        });
    }
};

const getHeartRateData = async (id, type, numbers) => {
    try {
        let daysArr = [];

        let currentDay = new Date(2018, 12, 1, 0, 0, 0);

        // console.log(currentDay);

        if (type === "week") {
            for (let i = 0; i < 7; i++) {
                let d = new Date();

                d.setDate(d.getDate() - i);

                let str = moment(d).format("DD-MM-YYYY");

                daysArr.push(str);
            }
        }
        if (type === "month") {
            let month = numbers[0];

            let year = new Date().getFullYear();

            const endDay = moment([year, month - 1])
                .endOf("month")
                .format("DD");

            for (let i = 1; i <= endDay; i++) {
                let str = `${i}-${month}-${year}`;

                daysArr.push(str);
            }

            daysArr.reverse();
        }
        if (type === "day") {
            let fromDay = numbers[0];

            let toDay = numbers[1];

            fromDay = moment(fromDay).format();

            fromDay = new Date(fromDay);

            for (let i = 0; i < toDay; i++) {
                let d = new Date();
                d.setDate(fromDay.getDate() - i);

                let str = moment(d).format("DD-MM-YYYY");

                daysArr.push(str);
            }
        }

        let docs = await Data.find({
            patientId: id,
            type: "heartRate",
            date: { $in: daysArr }
        });

        // console.log(docs);

        let hrData = daysArr.reduce((result, d) => {
            result[d] = {
                high: 0,
                average: 0,
                low: 0
            };
            return result;
        }, {});

        docs.map(d => {
            if (hrData[d.date]) {
                let heartRates = d.data.map(value => parseFloat(value));

                let high = Math.max(...heartRates);

                let low = Math.min(...heartRates);

                let sum = heartRates.reduce((result, v) => {
                    return result + v;
                }, 0);

                let average = parseInt((sum / heartRates.length).toFixed(0));

                hrData[d.date] = {
                    high,
                    low,
                    average
                };
            }
        });

        return hrData;
    } catch (error) {
        throw error;
    }
};

const getTemperatureData = async (id, type, numbers) => {
    try {
        let daysArr = [];

        let currentDay = new Date(2018, 12, 1, 0, 0, 0);
        // console.log(currentDay);

        if (type === "week") {
            for (let i = 0; i < 7; i++) {
                let d = new Date();

                d.setDate(d.getDate() - i);

                let str = moment(d).format("DD-MM-YYYY");

                daysArr.push(str);
            }
        }

        if (type === "month") {
            let month = numbers[0];

            let year = new Date().getFullYear();

            const endDay = moment([year, month - 1])
                .endOf("month")
                .format("DD");

            for (let i = 1; i <= endDay; i++) {
                let str = `${i}-${month}-${year}`;

                daysArr.push(str);
            }

            daysArr.reverse();
        }
        if (type === "day") {
            let fromDay = numbers[0];

            let toDay = numbers[1];

            fromDay = moment(fromDay).format();

            fromDay = new Date(fromDay);

            for (let i = 0; i < toDay; i++) {
                let d = new Date();
                d.setDate(fromDay.getDate() - i);

                let str = moment(d).format("DD-MM-YYYY");

                daysArr.push(str);
            }
        }

        let docs = await Data.find({
            patientId: id,
            type: "temperature",
            date: { $in: daysArr }
        });

        let temData = daysArr.reduce((result, d) => {
            result[d] = {
                high: 0,
                average: 0,
                low: 0
            };
            return result;
        }, {});

        docs.map(d => {
            if (temData[d.date]) {
                let temperatures = d.data.map(value => parseFloat(value));

                let high = Math.max(...temperatures);

                let low = Math.min(...temperatures);

                let sum = temperatures.reduce((result, v) => {
                    return result + v;
                }, 0);

                let average = parseFloat(
                    (sum / temperatures.length).toFixed(2)
                );

                temData[d.date] = {
                    high,
                    low,
                    average
                };
            }
        });

        return temData;
    } catch (error) {
        throw error;
    }
};

export default {
    getPatientReport,
    getTemperatureChartData,
    getHeartRateChartData
};
