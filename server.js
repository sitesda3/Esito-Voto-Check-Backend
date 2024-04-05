//const { addExtra } = require("puppeteer-extra");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
//const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const { Cluster } = require("puppeteer-cluster");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
//const puppeteer = addExtra(vanillaPuppeteer);
puppeteer.use(StealthPlugin());
//puppeteer.use(AdblockerPlugin({ blockTrackers: true }));



// app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


(async () => {
console.log('NewclusterLanuch');
const launchOptions = {
    headless: 'new',
    //devtools: false,
    ignoreHTTPSErrors: true,        // 忽略证书错误
    //waitUntil: 'networkidle2',
    timeout: 0,
    defaultViewport:{
        //width: 1920,
        //height: 1080
        width: 640,
        height: 480
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
       // '--disable-xss-auditor',//
	//'--disable-webgl',//
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

/*'--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-pings',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain'*/
	    
    ],
  executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : process.env.PUPPETEER_EXECUTABLE_PATH,

};        
const clusterLanuchOptions = {
    concurrency: Cluster.CONCURRENCY_CONTEXT,//CONCURRENCY_BROWSER
    maxConcurrency: 3,
    retryLimit: 0,   // 重试次数 0
    //skipDuplicateUrls: true,  // 不爬重复的url
    //monitor: true,  // 显示性能消耗
    timeout:800000,//milliseconds//300000
    puppeteer,
    puppeteerOptions: launchOptions
};            
            
const cluster = await Cluster.launch(clusterLanuchOptions);
	/*	
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2,
  });*/




app.get("/test", async (req, res) => {
  //res.send("Render Puppeteer server is up and running!!");





if (typeof cluster === 'undefined') {
	console.log("cluster is not defined");
const cluster = await Cluster.launch(clusterLanuchOptions);
	console.log("Lanuch Cluster");
}


console.log("Get Request");
  await cluster.task(async ({ page, data: url }) => {
	  console.log("Starting cluster task");
    await page.goto(url, {waitUntil: 'domcontentloaded'});//networkidle2
	  //load(11),domcontentloaded(7sec),networkidle0(11),networkidle2(11)
	  console.log('taking screenshot');
    const screenshot = await page.screenshot();
      console.log('taking screenshot is done');
  //await browser.close();



    //res.statusCode = 200;
    //res.setHeader("Content-Type", "image/png");
    //console.log("res.end(screenshot)");
    //res.end(screenshot, 'binary');
      return screenshot;	  
  });

  //cluster.queue('http://www.wikipedia.org/');
  // many more pages
try {
const result = await cluster.execute('https://github.com/');
	    console.log("sending screenshot");
        res.end(result, 'binary');
	console.log("screenshot is sent");
    } catch (err) {
	console.log("screenshot ERROR:",err);
        res.end('SCREENSHOT ERROR');
        // Handle crawling error
    }
	console.log("Closing cluster");
  await cluster.idle();
  await cluster.close();
	console.log("Cluster is closed");
return;
        console.log("Request is finished");

  



  
});


 })();

