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

app.get("/", async (req, res) => {
  //res.send("Render Puppeteer server is up and running!!");



console.log("start fetchData");
  const url = "https://www.google.com/";
  const browser = await puppeteer.launch(
    { headless: "new" },
    {
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
        "--proxy-server=http://86.48.0.127:3128",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    }
  );
  const page = await browser.newPage();
  console.log("page creata");

  //Randomize viewport size
  await page.setViewport({
    width: 1920 + Math.floor(Math.random() * 100),
    height: 3000 + Math.floor(Math.random() * 100),
    deviceScaleFactor: 1,
    hasTouch: false,
    isLandscape: false,
    isMobile: false,
  });


        await page.goto('https://www.google.com', {waitUntil: 'networkidle2'});

        // Login by Fill User / Password
        //await page.type('#Email', email);
        //await page.type('#Password', password);
        //await page.$eval('button[type=submit]', el => el.click());
        //await page.waitForNetworkIdle({idleTime: idelTime});

        const screenshot = await page.screenshot();
  await browser.close();
    console.log('screenshot done');
        res.end(screenshot, 'binary');
      return;


  
});




