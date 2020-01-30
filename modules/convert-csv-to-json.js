const csvToJson = require("convert-csv-to-json/src/csvToJson");

module.exports = {
    execute(data, stopCallback) {
        csvToJson.fieldDelimiter(",");
        const result = csvToJson.csvToJson(data);
        stopCallback(result);
    }
};
