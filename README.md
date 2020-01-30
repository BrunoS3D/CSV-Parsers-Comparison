# CSV-Parsers-Comparison

🔥 NODE.JS - Comparative analysis of csv converters.

### Old Test Method (CSV String Parse)

In the old test method, the csv structure was passed as a string to the converters and the time that elapsed from that conversion was used for comparison:

| module                 | execution time (10 rows) | execution time (1000 rows) |
| ---------------------- | ------------------------ | -------------------------- |
| csvtojsonV1.js         | 46.8337 ms               | 77.1661989 ms              |
| csvtojsonV2.js         | 9.934 ms                 | 24.36389 ms                |
| papaparse.js           | 2.5822 ms                | 8.2563 ms                  |
| convert-csv-to-json.js | 0.58229 ms               | 3.556901 ms                |
| csv-parser.js          | 8.917701 ms              | 35.272601 ms               |
| csv-parse.js           | 13.1939 ms               | 74.1141 ms                 |
| fast-csv.js            | 12.8577 ms               | 58.502801 ms               |

### Current Test Method (CSV File Stream Reader)

In the new method, use a `createReadStream` to read a file then it is connected to the converter using the `pipe` function, the time it takes from connecting the pipe to the `end` event is used for the comparison.

| module        | execution time (10 rows) | execution time (1k rows) | execution time (10k rows) |
| ------------- | ------------------------ | ------------------------ | ------------------------- |
| papaparse.js  | 10.886201 ms             | 22.5746 ms               | 81.1833 ms                |
| csv-parser.js | 9.745599 ms              | 51.86 ms                 | 111.473 ms                |
| csv-parse.js  | 13.73379 ms              | 128.088201 ms            | 202.3191 ms               |
| fast-csv.js   | 12.9665 ms               | 57.5728 ms               | 219.8584 ms               |

> Obs: _Some packages have not supported or demonstrated some type of bug and have been removed._

## Modules

The comparator consists of modules.
they are in the [modules](./modules/) folder and maintain the following structure:

```js
module.exports = {
    name: "sample-module",
    pipeConnector(stream) {
        // return stream.pipe(/* stream connector */);
    }
};
```

## CLI

It is possible to pass arguments to the analyzer use the `--help` or `-h` flag for more details:

```console
node index.js --help
```

A very useful and important flag is the `--module` or just `-m`, it serves and is used to test each module individually:

```console
node index.js -m papaparse
```

It is still possible to select an `input` file to perform the conversion and `output` path to save the result:

```console
node index.js -m fast-csv -i ./big-data.csv -d

# or

node index.js -m fast-csv -i ./big-data.csv -o ./output.json
```

## Test Data

The tests were based on the [10-rows.csv](./10-rows.csv), [1k-rows.csv](./1k-rows.csv) and [10k-rows.csv](./10k-rows.csv) file which maintains the following structure:

| \_id                     | age | name             | gender | email                     | phone              |
| ------------------------ | --- | ---------------- | ------ | ------------------------- | ------------------ |
| 5e327d46d2bced0625350c64 | 20  | Kimberley Kinney | female | kimberleykinney@quarx.com | +55 (923) 451-3229 |
| 5e327d4652112a31ca1cb009 | 25  | Frieda Roth      | female | friedaroth@quarx.com      | +55 (928) 580-3096 |
| 5e327d4611b7676779e8706f | 31  | Bean Pope        | male   | beanpope@quarx.com        | +55 (839) 449-2320 |
| ...                      | ... | ...              | ...    | ...                       | ...                |

For each module tested the result obtained by converting the csv must be equal to the following structure:

```js
[
    {
        _id: "5e327d46d2bced0625350c64",
        age: "20",
        name: "Kimberley Kinney",
        gender: "female",
        email: "kimberleykinney@quarx.com",
        phone: "+55 (923) 451-3229"
    }
    // ...
];
```
