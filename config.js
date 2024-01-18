const fs = require("fs");
const path = require("path");

/**
 * source : Absolute path of the source directory. It has to be the path to a directory, not path to a files
 * destination: Absolute path of the CSV File. If it does not exist, it will be created.
 */
const filePathsConfig = {
  source: "",
  destination: "",
};

const resultSchema = [
  {
    title: "serial_num",
  },
  {
    title: "path",
  },
  {
    title: "extension",
  },
  {
    title: "size_in_bytes",
  },
];

exports.filePathsConfig = filePathsConfig;
exports.resultSchema = resultSchema;
