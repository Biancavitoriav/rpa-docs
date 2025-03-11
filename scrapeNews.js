import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";
import axios from "axios";
 
const app = express();
const PORT = 3001;
 
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
 
async function scrapeG1News(limit) {
  console.log(limit)
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
 
  await page.goto("https://g1.globo.com/", { waitUntil: "load", timeout: 0 });
 
  const newsLinks = await page.evaluate((limit) => {
    return Array.from(
      document.querySelectorAll("a.gui-color-primary.gui-color-hover")
    )
      .slice(0, limit) // Limitando o número de links
      .map((link) => link.href);
  }, limit); // Passando `limit` como argumento
  
 
  let articles = [];
 
  for (let link of newsLinks) {
    try {
      await page.goto(link, { waitUntil: "load", timeout: 0 });
 
      const article = await page.evaluate(() => {
        const title = document.querySelector("h1")?.innerText || "Sem título";
        const author =
          document.querySelector(".content-publication-data__from")?.innerText ||
          "Autor não informado";
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
 
app.get("/scrape-news", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6; 
    console.log("Limit recebido:", limit);
    const news = await scrapeG1News(limit);
    
    console.log(news);


    const response = await axios.post("http://127.0.0.1:5000/ler-arquivo", {
      infos: news,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

 
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});