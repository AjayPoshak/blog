const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const takeScreenshot = async (url, destination) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({
    path: destination,
    clip: {
      x: 0,
      y: 200,
      width: 800,
      height: 300,
    },
  });

  await browser.close();
};

async function generateScreenShots(config) {
  try {
    const screenshotsDirPath = path.join(
      __dirname,
      "./public/screenshots"
    );
    if(!fs.existsSync(screenshotsDirPath)) {
      fs.mkdirSync(screenshotsDirPath)
    }
    for (const fileMeta of config.articles) {
      const { filename } = fileMeta;
      const fileNameWithoutExtension = filename.slice(0, filename.length - 3);
      const htmlFileName = fileNameWithoutExtension.concat(".html");
      const htmlFilePath = path.join(
        __dirname,
        "./public/articles",
        htmlFileName
      );

      await takeScreenshot(
        `file://${htmlFilePath}`,
        path.join(
          __dirname,
          `./public/screenshots/${fileNameWithoutExtension}.png`
        )
      );
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = { generateScreenShots };
