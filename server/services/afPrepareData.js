import csv from "csvtojson";

import brain from "brain.js";

import fs from "fs";

import path from "path";

import Models from "../models/model";

import Data from "../models/patientData";

let fileNames = [],
    trainingData = [],
    missingQueque = [];

const prepare = async () => {
    console.log("Prepare");
    try {
        let afPredictionModel = await Models.findOne({ type: "afPrediction" });

        if (afPredictionModel) {
            let pre = await csv().fromFile(
                path.resolve(__dirname, "../adataset/A4336.csv")
            );

            delete pre[0];

            let temp = [];
            pre.map((row, i) => {
                if (i <= 2000) {
                    return temp.push(parseFloat(row["'ECG '"]));
                }
            });

            await Data.updateOne(
                {
                    patientId: "5bdc00d3146153bee796f1d2",
                    type: "ecgRecord"
                },
                {
                    $set: {
                        data: temp
                    }
                },
                {
                    upsert: true
                }
            );
            var net1 = new brain.NeuralNetwork({
                hiddenLayers: [200, 200, 200]
            });
            let json = JSON.parse(afPredictionModel.model);

            net1.fromJSON(json);

            console.log(net1.run(temp));

            return "success";
        } else {
            for (let i = 1; i <= 3500; i++) {
                let c;

                if (i < 10) {
                    c = `A0000${i}`;
                }
                if (i > 9 && i < 100) {
                    c = `A000${i}`;
                }

                if (i > 99 && i < 1000) {
                    c = `A00${i}`;
                }

                if (i > 999 && i < 10000) {
                    c = `A0${i}`;
                }

                fileNames.push(c);
            }

            let reference = await csv({ noheader: true }).fromFile(
                path.resolve(__dirname, "../adataset/reference.csv")
            );

            reference = reference.reduce((result, ref) => {
                let field1 = ref.field1;

                field1 = field1.substr(4);

                if (fileNames.includes(field1)) {
                    result[field1] = ref.field2;

                    return result;
                }
                return result;
            }, {});

            await Promise.all(
                fileNames.map(async (f, i) => {
                    const file = path.resolve(
                        __dirname,
                        "../adataset/",
                        `Af-data/${f}.csv`
                    );

                    if (fs.existsSync(file)) {
                        let content = await csv().fromFile(file);
                        // if (i <= 1000) {
                        if (content) {
                            delete content[0];

                            let innerArr = [];

                            content.map((value, i) => {
                                if (i <= 2000) {
                                    return innerArr.push(
                                        parseFloat(value["'ECG '"])
                                    );
                                }
                            });

                            if (innerArr.length !== 2000) {
                                console.log(file);
                            }

                            trainingData.push({
                                input: innerArr,
                                output: {
                                    [`${reference[f]}`]: 1
                                }
                            });
                        }
                        // }
                    } else {
                        missingQueque.push(parseFloat(f.substr(1)));
                    }
                })
            );

            var net = new brain.NeuralNetwork({
                hiddenLayers: [200, 200, 200]
            });

            net.train(trainingData, {
                iterations: 20000,
                log: true,
                errorThresh: 0.005
            });

            let json = await net.toJSON();

            let result = await Models.findOneAndUpdate(
                { type: "afPrediction" },
                {
                    model: JSON.stringify(json)
                },
                { upsert: true, new: true }
            );

            let pre = await csv().fromFile(
                path.resolve(__dirname, "../adataset/Af-data/A00005.csv")
            );

            delete pre[0];
            let temp = [];
            pre.map((row, i) => {
                if (i <= 2000) {
                    return temp.push(parseFloat(row["'ECG '"]));
                }
            });
        }
    } catch (error) {
        console.log(error);
        return "fail";
    }
};

export default prepare;
