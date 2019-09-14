const fs = require("fs");
const path = require("path");
const { markdown } = require("./utils/markdown.js");
const { getListOfFiles, cleanUpDirectory } = require("./utils/fileHelpers.js");

const nunjucks = require("nunjucks");

nunjucks.configure("views", {
  autoescape: true
});

const articleFolderPath = path.join(__dirname, "/articles");
const buildFolderPath = path.join(__dirname, "/.assets");

const listOfMarkdownFiles = getListOfFiles(articleFolderPath);

cleanUpDirectory(buildFolderPath);

for (const fileName of listOfMarkdownFiles) {
  const fileContent = fs.readFileSync(
    path.join(articleFolderPath, fileName),
    "utf-8"
  );
  
  const mdContent = markdown(fileContent);
  const content = nunjucks.render("index.html", {
    partialContent: mdContent
  });

  fs.writeFileSync(`.assets/${fileName.slice(0, -3)}.html`, content);
  console.log('\x1b[36m%s\x1b[32m', 'Changed content successfully');
}
