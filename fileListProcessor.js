const fs = require("fs");
const path = require("path");

let serialNum = 0;

/**
 * Method to add the header to the CSV file
 */
const addHeaderToResult = (csvArr, schema) => {
  let str = [];
  schema.forEach((item) => {
    str.push(item.title);
  });
  csvArr.push(str.join(",") + "\n");
};

/**
 * method to get the CSV string
 */
function getCsvRow(serialNum, fileName) {
  return `${serialNum}, ${fileName}, ${path.extname(fileName)}, ${
    fs.statSync(fileName).size
  }\n`;
}

/**
 * Method to recursively get the list of files.
 */
const getFilesList = (directoryPath, csvArr) => {
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

      csvArr.push(getCsvRow(++serialNum, fileName));

      if (index === arr.length - 1) {
        csvArr.push("\n");
      }
    });

  directories
    .sort((a, b) => a - b)
    .forEach((fileName) => {
      getFilesList(fileName, csvArr);
    });
};

exports.getFilesList = getFilesList;
exports.addHeaderToResult = addHeaderToResult;
