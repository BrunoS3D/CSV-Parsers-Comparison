// https://www.npmjs.com/package/csv-parse

const parse = require("csv-parse");

module.exports = {
    name: "csv-parse",
    pipeConnector(stream) {
        return stream.pipe(parse({ columns: true }));
    }
};
