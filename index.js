const fs = require("fs");
const path = require("path");
const perf = require("execution-time")();

const csv_file_path = path.join(__dirname, "sample-data.csv");
const readers_folder_path = path.join(__dirname, "readers");

fs.readFile(csv_file_path, { encoding: "utf-8" }, function(error, data) {
    if (error) throw error;

    const csv_data =
        data || "_id,age,name,gender,email,phone\n5e327d46d2bced0625350c64,20,Kimberley Kinney,female,kimberleykinney@quarx.com,+55 (923) 451-3229";

    fs.readdirSync(readers_folder_path).forEach(file => {
        if (file === "reader-sample.js") return;

        const reader = require("./readers/" + file);

        perf.start();
        reader.execute(csv_data, () => {
            console.log(`[${file}]:`, perf.stop().time, "ms");
        });
    });
});
