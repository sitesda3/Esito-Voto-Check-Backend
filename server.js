const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
// const userAgent = require("user-agents");

puppeteer.use(StealthPlugin());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

// app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.post("/process", async (req, res) => {
  const codicePersonale = await req.body.codicePersonale;
  const password = await req.body.password;

  try {
    const data = await fetchData(codicePersonale, password);

    res.send({
      data: data,
    });
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({ error: "Timeout during navigation" });
  }
});

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// const USER_AGENT =
//   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36";

async function fetchData(codicePersonale, password) {
  console.log("Entrato in fetchData");
  const url = "https://web.spaggiari.eu/cvv/app/default/genitori_voti.php";
  const browser = await puppeteer.launch(
    { headless: "new" },
    {
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    }
  );
  const page = await browser.newPage();
  console.log("page creata");
  // const newUserAgent = userAgent.random().toString();
  // const UA = newUserAgent || USER_AGENT;

  //Randomize viewport size
  await page.setViewport({
    width: 1920 + Math.floor(Math.random() * 100),
    height: 3000 + Math.floor(Math.random() * 100),
    deviceScaleFactor: 1,
    hasTouch: false,
    isLandscape: false,
    isMobile: false,
  });

  // Add Headers
  await page.setExtraHTTPHeaders({
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
    "upgrade-insecure-requests": "1",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9,en;q=0.8",
  });

  await page.setJavaScriptEnabled(true);
  await page.setDefaultNavigationTimeout(0);

  //Skip images/styles/fonts loading for performance
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (
      req.resourceType() == "stylesheet" ||
      req.resourceType() == "font" ||
      req.resourceType() == "image"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);
  console.log("pagina caricata");

  await page.waitForSelector("#login");
  await page.type("#login", await codicePersonale);
  console.log("codice personale inserito");

  await page.waitForSelector("#password");
  await page.type("#password", await password);
  console.log("password inserita");

  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.click(".accedi"),
  ]);

  const data = await page.evaluate(() => {
    const containerClass = document.querySelectorAll(
      ".riga_materia_componente"
    );
    const result = [];

    containerClass.forEach((item) => {
      const nomeMateria = item
        .querySelector(".materia_desc")
        .textContent.trim();
      const votiMateria = item.querySelectorAll(
        '[class*=":sfondocella_2: cella_div"]'
      );

      const esiti = Array.from(votiMateria).map((votoItem) => {
        const valutazione = votoItem.querySelector(
          ".double.s_reg_testo.cella_trattino"
        ).innerHTML;

        if (votoItem.className.includes("positivo")) {
          return { Esito: "Positivo", Valutazione: valutazione };
        } else if (votoItem.className.includes("negativo")) {
          return { Esito: "Negativo", Valutazione: valutazione };
        } else {
          return { Esito: "In Blu", Valutazione: valutazione };
        }
      });

      result.push({
        Nome_Materia: nomeMateria,
        Esiti: esiti,
      });
    });

    return result;
  });

  await browser.close();

  return data;
}
