// https://www.npmjs.com/package/fast-csv

const csv = require("fast-csv");

module.exports = {
    name: "fast-csv",
    pipeConnector(stream) {
        return stream.pipe(csv.parse({ headers: true }));
    }
};
