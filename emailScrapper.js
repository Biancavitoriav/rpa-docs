const puppeteer = require("puppeteer");

const EMAIL_PROVIDER_URL = "https://mail.google.com/";
const API_URL = "http://localhost:5000/resumir";

async function scrapeEmails(username, password, date) {
  const browser = await puppeteer.launch({ headless: false }); // Coloque "true" se não quiser abrir o navegador
  const page = await browser.newPage();

  await page.goto(EMAIL_PROVIDER_URL, { waitUntil: "networkidle2" });

  // Fazer login (se necessário)
  await page.type("input[type='email']", username);
  await page.click("#identifierNext");
  //   await page.waitForTimeout(10000); // Pode precisar ajustar o tempo de espera

  await page.type("input[type='password']", password);
  await page.click("#passwordNext");
  await page.waitForNavigation();

  // Filtrar e-mails pela data (isso pode variar dependendo do provedor)
  await page.type(
    "input[aria-label='Search mail']",
    `before:${date} after:${date}`
  );
  await page.keyboard.press("Enter");
  await page.waitForTimeout(3000);

  // Coletar e-mails
  const emails = await page.evaluate(() => {
    let emailNodes = document.querySelectorAll(".zA"); // Seletor dos e-mails na caixa de entrada (varia conforme o provedor)
    let results = [];

    emailNodes.forEach((email) => {
      let title = email.querySelector(".bog").innerText; // Assunto do e-mail
      let sender = email.querySelector(".yX.xY .yP").innerText; // Nome do remetente
      let content = email.querySelector(".y2").innerText; // Pequeno trecho do conteúdo

      results.push({ title, sender, content });
    });

    return results;
  });

  await browser.close();

  // Enviar para API
  for (const email of emails) {
    try {
      const response = await axios.post(API_URL, {
        title: email.title,
        sender: email.sender,
        content: email.content,
      });
      console.log(`Resumo gerado: ${response.data.summary}`);
    } catch (error) {
      console.error("Erro ao enviar email para API:", error.message);
    }
  }
}

// Chamar a função passando usuário, senha e data desejada
scrapeEmails("123laurafarias@gmail.com", "4443cccjjj", "2025-02-27");
