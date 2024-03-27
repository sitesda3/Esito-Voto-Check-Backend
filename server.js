const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

puppeteer.use(StealthPlugin());



// app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
app.get("/", async (req, res) => {
  //res.send("Render Puppeteer server is up and running!!");



  const url = "https://www.google.com";
  const browser = await puppeteer.launch(
    { headless: "new" },
    {
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote"
        //"--proxy-server=http://86.48.0.127:3128",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    }
  );
  
console.log("browser is launched");
  const page = await browser.newPage();
  console.log("page is created");

  //Randomize viewport size
  await page.setViewport({
    width: 1920 + Math.floor(Math.random() * 100),
    height: 3000 + Math.floor(Math.random() * 100),
    deviceScaleFactor: 1,
    hasTouch: false,
    isLandscape: false,
    isMobile: false,
  });


await page.goto(url, {waitUntil: 'networkidle2'});//
  //await page.waitForTimeout(5000);


        const screenshot = await page.screenshot();
      console.log('taking screenshot is done');
  await browser.close();
        res.end(screenshot, 'binary');
      return;


  
});




