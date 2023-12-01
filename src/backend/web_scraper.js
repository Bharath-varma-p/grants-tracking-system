const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.grants.gov/search-results-detail/350786');

  const selector = '#opportunity-container > div > div:nth-child(4) > div > table > tbody > tr:nth-child(1) > td:nth-child(2)';
  await page.waitForSelector(selector);

  const elements = await page.$$(selector);

  let output = '';
  const separator = '| ';

  for (const element of elements) {
    const text = await page.evaluate(el => el.textContent, element);
    output += text + separator;
  }

  output = output.slice(0, -separator.length); // Remove the last separator
  console.log(output);
  
  await browser.close();
})();
