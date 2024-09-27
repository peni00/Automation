const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport width and height
  await page.setViewport({ width: 1280, height: 720 });

  const website_url = 'http://127.0.0.1:5500/customer_data.html';
  await page.goto(website_url, { waitUntil: 'networkidle0' });

})();