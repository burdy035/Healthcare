import svm from "node-svm";

import Documents from "../models/patientsDocuments";
import Models from "../models/model";

import csv from "csvtojson";

import path from "path";

const trainModel = async () => {
    try {
        let data = await csv().fromFile(
            path.resolve(__dirname, "../dataset/dataHeartAttack.csv")
        );

        let rawData = [];

        data.map(d => {
            let temp = [];

            Object.keys(d).map(k => {
                if (k !== "num") {
                    temp.push(parseFloat(d[k]));
                }
            });

            rawData.push([temp, parseFloat(d["num"])]);
        });

        let trainingData = rawData.slice(0, 200);
        let testingData = rawData.slice(200);

        let clf = new svm.CSVC({
            gamma: [0.01, 0.1],
            c: 8,
            kFold: 4,
            normalize: true,
            reduce: true, // default value
            retainedVariance: 0.95,
            probability: true
        });

        let r = await clf.train(trainingData).spread(async (model, report) => {
            let result = await Models.findOneAndUpdate(
                { type: "heartDiseaseRate" },
                {
                    model: JSON.stringify(model)
                },
                { upsert: true, new: true }
            );
            if (result) {
                return true;
            } else {
                return false;
            }
        });

        // console.log(
        //     clf.predictProbabilitiesSync([65, 1, 4, 130, 275, 0, 1, 115, 1, 1])
        // );

        // let accuracy = 0;

        // testingData.map(t => {
        //     let predict = clf.predictSync(t[0]);
        //     console.log(predict, t[1]);
        //     if (predict === t[1]) {
        //         accuracy += 1;
        //     }
        // });

        // console.log((accuracy / 60) * 100);

        if (r) {
            console.log("Train predict heart disease success");
        } else {
            console.log("Train predict heart disease fail");
        }
    } catch (error) {
        console.log(error);
        console.log("Train predict heart disease fail");
    }
};

export default trainModel;
