import brain from "brain.js";

import Models from "../models/model";

const net = new brain.NeuralNetwork();

const trainHrDetection = async () => {
    try {
        let heartRateDetection = await Models.findOne({
            type: "heartRateDetection"
        });

        if (heartRateDetection) {
            console.log("Saved!");
        } else {
            net.train(
                [
                    {
                        input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        output: { danger: 1 }
                    },
                    {
                        input: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        output: { normal: 1 }
                    },
                    {
                        input: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        output: { normal: 1 }
                    },
                    {
                        input: [0, 0, 1, 1, 1, 2, 2, 2, 3, 2],
                        output: { normal: 1 }
                    }
                ],
                {
                    log: true
                }
            );

            let json = await net.toJSON();

            let result = await Models.findOneAndUpdate(
                { type: "heartRateDetection" },
                {
                    model: JSON.stringify(json)
                },
                { upsert: true, new: true }
            );

            const output = net.run([2, 2, 2, 2, 2, 3, 3, 2, 2, 2]);

            console.log(output);
        }
    } catch (error) {}
};

export default trainHrDetection;
