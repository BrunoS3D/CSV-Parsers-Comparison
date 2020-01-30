const csvtojsonV2 = require("csvtojson/v2");

module.exports = {
    execute(data, stopCallback) {
        csvtojsonV2()
            .fromString(data)
            .then(result => {
                stopCallback(result);
            });
    }
};
