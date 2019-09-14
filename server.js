const path = require("path");
const express = require("express");
const { articleHelpers } = require("./utils/articleHelpers.js");

const app = new express();
const port = 3005;

const articleFolderPath = path.join(__dirname, "/articles");
const htmlAssetsFolderPath = path.join(__dirname, "/.assets");

const articleUtils = articleHelpers(articleFolderPath);

const articlesMap = new Map();

app.use(express.static("public"));

app.get("/articles/:slug", (req, res) => {
  res.set("Content-Type", "text/html");
  /**
   * Check if requested `article` already exists
   * in articlesMap, if yes then serve from there straightforward.
   * Else check in `articles` folder, read content from there, add it
   * in articlesMap for future usage, and serve in response.
   */
  const requestedArticle = req.params.slug;
  if (articlesMap.has(requestedArticle)) {
    res.send(articlesMap.get(requestedArticle));
  } else {
    const doesArticleExists = articleUtils.isAnArticle(requestedArticle);

    if (doesArticleExists) {
      const articleContent = articleUtils.readArticleHTMLOutput(
        htmlAssetsFolderPath,
        `${requestedArticle}.html`
      );
      articlesMap.set(requestedArticle, articleContent);
      res.send(articleContent);
    }
    res.send(`404 page`);
  }
});

app.listen(port, () => {
  console.log(`app listening on port: ${port}`);
});
