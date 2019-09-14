const path = require('path')
const {
    readFile,
    getListOfFiles,
    removeFileExtension
  } = require("./fileHelpers.js");
  
function articleHelpers(articleFolderPath) {
    // const articleFolderPath = path.join(__dirname, "/articles");
    const articlesList = getListOfFiles(articleFolderPath)

    function isAnArticle(articleName) {
        const articlesWithoutExtension = getListOfArticlesWithoutExtension()
        console.log('articlesList ', articlesList, articleName, articlesWithoutExtension)
        return articlesWithoutExtension.includes(articleName)
    }

    function getArticlesFolderPath() {
        return articleFolderPath
    }

    function getListOfArticlesWithoutExtension() {
        return articlesList.map(removeFileExtension)
    }

    function readArticleHTMLOutput(htmlPath, articleName) {
        return readFile(htmlPath, articleName)
    }

    return {
        isAnArticle,
        readArticleHTMLOutput,
        getArticlesFolderPath,
        getListOfArticlesWithoutExtension,
    }
}

module.exports = { articleHelpers }