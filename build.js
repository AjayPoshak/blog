const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const { markdown } = require("./utils/markdown.js");
const { generateScreenShots } = require("./screenshots.js");
const { getListOfFiles, cleanUpDirectory } = require("./utils/fileHelpers.js");

const nunjucks = require("nunjucks");

nunjucks.configure("views", {
  autoescape: true,
});

async function runBuild() {
  const contentConfig = yaml.safeLoad(fs.readFileSync("content.yaml", "utf8"));

  const articleFolderPath = path.join(__dirname, "/articles");
  const buildFolderPath = path.join(__dirname, "/public/articles");

  const listOfMarkdownFiles = getListOfFiles(articleFolderPath);

  if (!fs.existsSync(buildFolderPath)) {
    fs.mkdirSync(buildFolderPath);
  }

  cleanUpDirectory(buildFolderPath);

  for (const fileName of listOfMarkdownFiles) {
    const fileConfig = contentConfig.articles.find(
      (article) => article.filename === fileName
    );

    const fileContent = fs.readFileSync(
      path.join(articleFolderPath, fileName),
      "utf-8"
    );

    const { title, publishedDate, datetime, excerpt } = fileConfig;
    const mdContent = markdown(fileContent);
    const content = nunjucks.render("index.html", {
      title,
      excerpt,
      datetime,
      publishedDate,
      partialContent: mdContent,
    });

    fs.writeFileSync(`public/articles/${fileName.slice(0, -3)}.html`, content);
    console.log("\x1b[36m%s\x1b[32m", "Changed content successfully");

    console.log("\x1b[36m%s\x1b[32m", "Generating screenshots...");
  }
  await generateScreenShots(contentConfig);
}

runBuild();
