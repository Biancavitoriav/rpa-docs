const puppeteer = require("puppeteer");

async function scrapeG1News(targetDate) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://g1.globo.com/", { waitUntil: "load", timeout: 0 });

  const newsLinks = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll("a.gui-color-primary.gui-color-hover")
    ).map((link) => link.href);
  });

  let articles = [];

  for (let link of newsLinks) {
    try {
      await page.goto(link, { waitUntil: "load", timeout: 0 });

      const article = await page.evaluate(() => {
        const title = document.querySelector("h1")?.innerText || "Sem título";
        const author =
          document.querySelector(".content-publication-data__from")
            ?.innerText || "Autor não informado";
        const content = Array.from(document.querySelectorAll("p"))
          .map((p) => p.innerText)
          .join("\n");
        const dateElement =
          document.querySelector(".content-publication-data__updated time") ||
          document.querySelector("time");
        const publishedDate = dateElement
          ? dateElement.getAttribute("datetime")
          : "";
        return { title, author, content, publishedDate };
      });

      articles.push({ link, ...article });
    } catch (error) {
      console.error(`Erro ao acessar ${link}:`, error.message);
    }
  }

  await browser.close();
  return articles;
}

(async () => {
  const news = await scrapeG1News();
  console.log(news);
})();
