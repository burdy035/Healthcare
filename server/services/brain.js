import brain from "brain.js";

const BrainTest = async () => {
    const net = new brain.recurrent.LSTM({ hiddenLayers: [200, 200, 200] });

    net.train(
        [
            { input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], output: "1" },
            { input: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], output: "0" },
            { input: [0, 1, 0, 1, 0, 0, 0, 0, 1, 1], output: "0" },
            { input: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], output: "1" },
            { input: [0, 1, 2, 3, 3, 5, 6, 7, 8, 9], output: "1" },
            { input: [0, 1, 2, 2, 4, 5, 6, 7, 8, 9], output: "1" },
            { input: [0, 1, 2, 2, 4, 5, 6, 7, 8, 8], output: "1" },
            { input: [0, 1, 2, 2, 2, 1, 1, 0, 0, 1], output: "0" }
        ],
        {
            iterations: Infinity,
            log: true,
            errorThresh: 0.005
        }
    );

    const output = net.run([0, 1, 1, 1, 0, 0, 0, 0, 1, 1]);
    const output1 = net.run([0, 1, 2, 2, 3, 4, 5, 6, 7, 8]);
    const output2 = net.run([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    console.log("Result: ", output, output1, "Result2: ", output2);
};

export default BrainTest;
