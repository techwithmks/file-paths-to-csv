const fs = require("fs");
const path = require("path");

/**
 * Description -
 * source : Absolute path of the source directory. It has to be the path to a directory, not path to a files
 * e.g. : C:/Users/<user-name>/Documents/
 *
 * destination: Absolute path of the CSV File. If it does not exist, it will be created.
 * e.g. : C:/Users/<user-name>/Documents/output.csv
 */
const filePathsConfig = {
  source: "",
  destination: "",
};

/**
 * Description : Schema of the CSV file is added here
 */
const resultSchema = [
  {
    title: "serial_num",
    val: (obj) => obj.serial_num,
  },
  {
    title: "path",
    val: (obj) => obj.path,
  },
  {
    title: "extension",
    val: (obj) => path.extname(obj.path),
  },
  {
    title: "size_in_bytes",
    val: (obj) => fs.statSync(obj.path).size,
  },
];

exports.filePathsConfig = filePathsConfig;
exports.resultSchema = resultSchema;
