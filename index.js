const fs = require("fs");
const path = require("path");
const perf = require("execution-time")(console.log);

const csv_file_path = path.join(__dirname, "sample-data.csv");
const readers_folder_path = path.join(__dirname, "readers");

fs.readFile(csv_file_path, { encoding: "utf-8" }, function(error, data) {
    if (error) throw error;

    const csv_data = data;

    fs.readdirSync(readers_folder_path).forEach(file => {
        if (file === "reader-sample.js") return;

        const reader = require("./readers/" + file);

        console.log("\n======", file, "======");

        perf.start();
        reader.execute(csv_data);
        perf.stop();
    });
});
