// https://www.npmjs.com/package/csv-parser

const csv = require("csv-parser");

module.exports = {
    name: "csv-parser",
    pipeConnector(stream) {
        return stream.pipe(csv());
    }
};
