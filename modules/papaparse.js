// https://www.npmjs.com/package/papaparse

const Papa = require("papaparse");

module.exports = {
    execute(data, stopCallback) {
        const result = Papa.parse(data, {
            header: true
        }).data;
        stopCallback(result);
    }
};
