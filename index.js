const fs = require("fs");

/**
 * Name : config.js
 * Description : Configuration file, for source, destination and schema
 */
const { filePathsConfig, resultSchema } = require("./config");

/**
 * Name : fileListProcessor.js
 * Description : File where the CSV data is generated
 */
const { getFilesList, addHeaderToResult } = require("./fileListProcessor"); 


const resultCSVArr = [];

try {
  const isDirectory = fs.statSync(filePathsConfig.source).isDirectory();
  if (isDirectory) {
    addHeaderToResult(resultCSVArr, resultSchema);
    getFilesList(filePathsConfig.source, resultCSVArr);
    fs.writeFileSync(filePathsConfig.destination, resultCSVArr.join(""));
  } else {
    throw new Error("Source Path does not leads to a directory");
  }
} catch (e) {
  console.log(e);
}
