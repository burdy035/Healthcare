import fs from "fs";

import path from "path";
import Axios from "axios";

let errorArr = [];

const download = async (fileName, prefix) => {
    try {
        const url = `https://www.physionet.org/atm/challenge/2017/training/A0${prefix}/${fileName}/0/10/rdsamp/csv/pS/samples.csv`;

        console.log(url);

        const filePath = path.resolve(__dirname, "csvs", `${fileName}.csv`);

        const res = await Axios({
            method: "GET",
            url: url,
            responseType: "stream"
        });
        console.log("Status: ", res.status);
        await res.data.pipe(fs.createWriteStream(filePath));

        console.log("File on end!");

        return new Promise((resolve, reject) => {
            res.data.on("end", () => {
                console.log("On End!!!!");
                resolve();
            });
        });
    } catch (error) {
        console.log("Error: ", error.message);

        errorArr.push(fileName);
        // console.log(error);
    }
};

async function a() {
    let len = [];
    for (let i = 1; i <= 8528; i++) {
        let c = ``;
        let prefix = Math.floor(i / 1000);
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

        if (i < 6) {
            console.log("==============");
            console.log(c, prefix);
            await download(`${c}`, prefix);

            console.log("Finish");
        }
    }
}

a();
