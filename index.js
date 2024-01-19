const fs = require("fs");

/**
 * @name : config.js
 * @description : Configuration file, for source, destination and schema
 */
const { filePathsConfig, resultSchema } = require("./config");

/**
 * @name : fileListProcessor.js
 * @description : File where the CSV data is generated
 */
const { getFilesList, addHeaderToResult } = require("./fileListProcessor");

/**
 * @description : a JS Array containing the CSV strings at each index
 */
const resultCSVArr = [];

try {
  const isDirectory = fs.statSync(filePathsConfig.source).isDirectory();
  if (isDirectory) {
    addHeaderToResult(resultCSVArr, resultSchema);
    getFilesList(filePathsConfig.source, resultCSVArr, resultSchema);
    fs.writeFileSync(filePathsConfig.destination, resultCSVArr.join(""));
  } else {
    throw new Error("Source Path does not leads to a directory");
  }
} catch (e) {
  console.log(e);
}
