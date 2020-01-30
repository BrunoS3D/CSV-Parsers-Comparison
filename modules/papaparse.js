// https://www.npmjs.com/package/papaparse

const Papa = require("papaparse");

module.exports = {
    name: "papaparse",
    pipeConnector(stream) {
        return stream.pipe(
            Papa.parse(Papa.NODE_STREAM_INPUT, {
                header: true
            })
        );
    }
};
