const fs = require("fs");
const path = require("path");

let serialNum = 0;

/**
 * @description : Method to get the header of the csv file
 * @param csvArr : array containing the csv strings
 * @param schema : schema of the result
 */
const addHeaderToResult = (csvArr, schema) => {
  let str = [];
  schema.forEach((item) => {
    str.push(item.title);
  });
  csvArr.push(str.join(",") + "\n");
};

/**
 * @description : Method to get the individual data row of the csv file
 * @param csvArr : array containing the csv strings
 * @param schema : schema of the result
 * @param dataObj : data for the each row of the csv
 */
const addDataRowToResult = (csvArr, schema, dataObj) => {
  let str = [];
  schema.forEach((item) => {
    str.push(item.val(dataObj));
  });
  csvArr.push(str.join(",") + "\n");
};

/**
 * @description : Primary method, which is recursively called, to get the files list.
 * @param directoryPath : path of the directory
 * @param csvArr : array containing the csv string
 * @param schema : data for the each row of the csv
 */
const getFilesList = (directoryPath, csvArr, schema) => {
  const filesNameList = fs.readdirSync(directoryPath);

  const directories = [],
    individualFiles = [];

  filesNameList.forEach((fileName) => {
    const filePath = `${directoryPath}/${fileName}`;

    fs.statSync(filePath).isDirectory()
      ? directories.push(filePath)
      : individualFiles.push(filePath);
  });

  individualFiles
    .sort((a, b) => a - b)
    .forEach((fileName, index, arr) => {
      if (index === 0) {
        csvArr.push("\n");
      }

      addDataRowToResult(csvArr, schema, {
        serial_num: ++serialNum,
        path: fileName,
      });

      if (index === arr.length - 1) {
        csvArr.push("\n");
      }
    });

  directories
    .sort((a, b) => a - b)
    .forEach((fileName) => {
      getFilesList(fileName, csvArr, schema);
    });
};

exports.getFilesList = getFilesList;
exports.addHeaderToResult = addHeaderToResult;
