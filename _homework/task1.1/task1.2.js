import { pipeline } from "stream"
import fs from "fs"
import csv from "csvtojson";

pipeline(
    fs.createReadStream('_homework/task1/csv/nodejs-hw1-ex1.csv'),
    csv(),
    fs.createWriteStream('_homework/task1/csv/example.txt'),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);
