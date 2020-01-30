// https://www.npmjs.com/package/fast-csv

const csv = require("fast-csv");
const { Readable } = require("stream");

module.exports = {
    execute(data, stopCallback) {
        const result = [];
        Readable.from([data])
            .pipe(csv.parse({ headers: true }))
            .on("data", data => result.push(data))
            .on("end", () => {
                stopCallback(result);
            });
    }
};
