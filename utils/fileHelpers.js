const fs = require("fs");
const path = require("path");

function getListOfFiles(dirPath) {
  const listOfFiles = fs.readdirSync(dirPath);
  return listOfFiles;
}

function cleanUpDirectory(dirPath) {
  const filesInDirectory = getListOfFiles(dirPath);
  for (const file of filesInDirectory) {
    fs.unlink(path.join(dirPath, file), err => {
      if (err) {
        console.error(
          `Error occured while deleting ${path.join(dirPath, file)} ::: ${err}`
        );
      }
    });
  }
}

function removeFileExtension(filename) {
  if (!filename) {
    return new Error(
      `Please provide a valid fileName, instead got ${filename}`
    );
  }
  const dotRegex = /[.]/;
  const dotIndexInFilename = filename.search(dotRegex);
  if (dotIndexInFilename > -1) {
    return filename.substring(0, dotIndexInFilename);
  }
  return filename;
}

function readFile(filePath, filename) {
  const fileContent = fs.readFileSync(path.join(filePath, filename));
  return fileContent;
}

module.exports = {
  readFile,
  getListOfFiles,
  cleanUpDirectory,
  removeFileExtension,
};
