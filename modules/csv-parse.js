// https://www.npmjs.com/package/csv-parse

const parse = require("csv-parse");
const { Readable } = require("stream");

module.exports = {
    execute(data, stopCallback) {
        const result = [];
        Readable.from([data])
            .pipe(parse({ columns: true }))
            .on("data", data => result.push(data))
            .on("end", () => {
                stopCallback(result);
            });
    }
};
