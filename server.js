//const puppeteer = require("puppeteer-extra");
//const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { Cluster } = require("puppeteer-cluster");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

//puppeteer.use(StealthPlugin());



// app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
app.get("/", async (req, res) => {
  //res.send("Render Puppeteer server is up and running!!");







console.log('NewclusterLanuch');
const launchOptions = {
    headless: 'new',
    //devtools: false,
    ignoreHTTPSErrors: true,        // 忽略证书错误
    //waitUntil: 'networkidle2',
    timeout: 0,
    defaultViewport:{
        width: 1920,
        height: 1080
        //width: 640,
        //height: 480
    },
    /*args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-xss-auditor',    // 关闭 XSS Auditor
        '--no-zygote',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--allow-running-insecure-content',     // 允许不安全内容
        '--disable-webgl',
        '--disable-popup-blocking',
        //'--proxy-server=http://127.0.0.1:8080'      // 配置代理
    ],*/
    args: [
        '--no-sandbox',
        '--disable-web-security',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--allow-running-insecure-content',
        '--no-first-run',
        '--no-zygote',
        //'--deterministic-fetch',
        //'--disable-features=IsolateOrigins',
        //'--disable-site-isolation-trials',
        '--shm-size=500mb',
        //'--disable-infobars',
        //'--window-size=1366,768'
         //'--single-process',
    ],
  executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : process.env.PUPPETEER_EXECUTABLE_PATH,

};        
const clusterLanuchOptions = {
    concurrency: Cluster.CONCURRENCY_CONTEXT,//CONCURRENCY_BROWSER
    maxConcurrency: 3,
    retryLimit: 1,   // 重试次数 0
    //skipDuplicateUrls: true,  // 不爬重复的url
    //monitor: true,  // 显示性能消耗
    timeout:800000,//milliseconds//300000
    puppeteerOptions: launchOptions
};            
            
const cluster = await Cluster.launch(clusterLanuchOptions);
	/*	
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
  });*/

  await cluster.task(async ({ page, data: url }) => {
	  console.log("start cluster task");
    await page.goto(url, {waitUntil: 'networkidle2'});
    const screenshot = await page.screenshot();
      console.log('taking screenshot is done');
  await browser.close();



    //res.statusCode = 200;
    //res.setHeader("Content-Type", "image/png");
    console.log("res.end(screenshot)");
        res.end(screenshot, 'binary');
      return;
	  
  });

  cluster.queue('http://www.wikipedia.org/');
  // many more pages

  await cluster.idle();
  await cluster.close();



  



  
});




