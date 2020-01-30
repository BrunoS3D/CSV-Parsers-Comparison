const csvtojsonV1 = require("csvtojson/v1");

module.exports = {
    execute(data, stopCallback) {
        const array = [];
        csvtojsonV1()
            .fromString(data)
            .on("json", json => {
                array.push(json);
            })
            .on("done", () => {
                // console.log(array);
                stopCallback();
            });
    }
};
