// https://www.npmjs.com/package/csvtojson

const csvtojsonV1 = require("csvtojson/v1");

module.exports = {
    execute(data, stopCallback) {
        const result = [];
        csvtojsonV1()
            .fromString(data)
            .on("json", json => {
                result.push(json);
            })
            .on("done", () => {
                stopCallback(result);
            });
    }
};
