import svm from "node-svm";

import Documents from "../models/patientsDocuments";
import Models from "../models/model";

const trainModel = async () => {
    try {
        let docs = await Documents.find({ trainingData: true });

        let keys = [
            "age",
            "cp",
            "trestbps",
            "chol",
            "fbs",
            "restecg",
            "thalach",
            "exang",
            "oldpeak",
            "result"
        ];

        let trainingData = [];
        docs.map(d => {
            let t = [];
            let temp = [];
            keys.map((k, i) => {
                if (k !== "result") {
                    return t.push(parseFloat(d[k]));
                }
            });

            temp.push(t);
            temp.push(parseFloat(d.result));

            trainingData.push(temp);
        });

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
            // console.log(report);
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
        //     clf.predictProbabilitiesSync([52, 4, 130, 180, 0, 0, 140, 1, 1.5])
        // );

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
