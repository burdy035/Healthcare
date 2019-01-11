import brain from "brain.js";

import Models from "../models/model";

const net = new brain.NeuralNetwork();

const trainHrDetection = async () => {
    try {
        let heartRateDetection = await Models.findOne({
            type: "heartRateDetection"
        });

        if (heartRateDetection) {
            let model = await Models.findOne({
                type: "heartRateDetection"
            });
            var net1 = new brain.NeuralNetwork();
            let json = JSON.parse(model.model);

            net1.fromJSON(json);

            let hr = [
                37.5,
                38.6,
                38.7,
                38.8,
                38.6,
                38.6,
                38.7,
                38.6,
                38.6,
                38.7
            ];

            let hr1 = hr.reduce((result, value) => {
                result.push(((value - hr[0]) * 10).toFixed(1));
                return result;
            }, []);
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
                    },
                    {
                        input: [0, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                        output: { danger: 1 }
                    },
                    {
                        input: [0, 50, 50, 50, 50, 50, 50, 50, 50, 50],
                        output: { danger: 1 }
                    },
                    {
                        input: [0, 20, 10, 20, 30, 40, 40, 40, 50, 50],
                        output: { danger: 1 }
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
