const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const perf = require("execution-time")();

const argv = yargs
    .option("module", {
        alias: "m",
        description: "Test a module individually",
        type: "string"
    })
    .option("debug", {
        alias: "d",
        description: "Prints the result of the module(s) on the console",
        type: "boolean"
    })
    .option("input", {
        alias: "i",
        description: "Input file to perform conversion",
        type: "string"
    })
    .option("output", {
        alias: "o",
        description: "Output file that will be written containing the result of converting the input file",
        type: "string"
    })
    .help()
    .alias("help", "h")
    .alias("version", "v").argv;

const csv_file_path = argv.input || path.join(__dirname, "10-rows.csv");
const modules_folder_path = path.join(__dirname, "modules");

function startModuleTest(m_module) {
    const stream = fs.createReadStream(csv_file_path, { encoding: "utf-8" });

    perf.start();
    const result = [];

    m_module
        .pipeConnector(stream)
        .on("error", error => {
            if (error) throw error;
        })
        .on("data", data => {
            result.push(data);
        })
        .on("end", () => {
            const exec_time = perf.stop().time;

            if (argv.debug) {
                console.log(`[${m_module.name}] Result:`, result);
            }

            if (argv.output) {
                fs.writeFile(argv.output, JSON.stringify(result), "utf8", error => {
                    if (error) throw error;
                    console.log("Output file saved in:", argv.output);
                });
            }

            console.log(`[${m_module.name}] Execution time:`, exec_time, "ms");
        });
}

if (argv.module) {
    const m_module = require("./modules/" + argv.module.replace(".js", "") + ".js");
    startModuleTest(m_module);
} else {
    fs.readdirSync(modules_folder_path).forEach(file => {
        if (file === "sample-module.js") return;
        const m_module = require("./modules/" + file);
        startModuleTest(m_module);
    });
}
