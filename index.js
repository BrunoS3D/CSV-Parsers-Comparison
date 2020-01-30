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

const csv_file_path = argv.input || path.join(__dirname, "sample-data.csv");
const modules_folder_path = path.join(__dirname, "modules");

function executeTestModule(m_module, csv_data, module_name) {
    perf.start();
    m_module.execute(csv_data, result => {
        const exec_time = perf.stop().time;

        if (argv.debug) {
            console.log(module_name ? `[${module_name}] Result:` : "Result:", result);
        }
        if (argv.output) {
            fs.writeFile(argv.output, JSON.stringify(result), "utf8", error => {
                if (error) throw error;
                console.log("Output file saved in:", argv.output);
            });
        }

        console.log(module_name ? `[${module_name}]:` : "Execution time:", exec_time, "ms");
    });
}

fs.readFile(csv_file_path, { encoding: "utf-8" }, function(error, data) {
    if (error) throw error;

    const csv_data = data;
    // data || "_id,age,name,gender,email,phone\n5e327d46d2bced0625350c64,20,Kimberley Kinney,female,kimberleykinney@quarx.com,+55 (923) 451-3229";

    if (argv.module) {
        const m_module = require("./modules/" + argv.module.replace(".js", "") + ".js");
        executeTestModule(m_module, csv_data, argv.module);
    } else {
        fs.readdirSync(modules_folder_path).forEach(file => {
            if (file === "sample-module.js") return;
            const m_module = require("./modules/" + file);
            executeTestModule(m_module, csv_data, file);
        });
    }
});
