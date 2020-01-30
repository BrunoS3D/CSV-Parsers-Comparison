// https://www.npmjs.com/package/csv-parser

const csv = require("csv-parser");
const { Readable } = require("stream");

module.exports = {
    execute(data, stopCallback) {
        const result = [];
        Readable.from([data])
            .pipe(csv())
            .on("data", data => result.push(data))
            .on("end", () => {
                stopCallback(result);
            });
    }
};
