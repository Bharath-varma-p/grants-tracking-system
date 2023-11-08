// const cheerio = require('cheerio');
// const axios = require('axios');

// const url = 'https://www.grants.gov/web/grants/view-opportunity.html?oppId=345335';

// axios.get(url)
//      .then((response) => {
//         const $ = cheerio.load(response.data);
//         console.log("scraped data",$.length);
//         console.log("scraped data length",$);
//         console.log("scraped data 1st index",$('.synopsisBody').text());
        
//      }) 

// const axios = require('axios');
// const cheerio = require('cheerio');

// const url = 'https://www.grants.gov/web/grants/view-opportunity.html?oppId=345335';

// axios.get(url)
//   .then((response) => {
//     if (response.status === 200) {
//       const html = response.data;
//       const $ = cheerio.load(html);

//       // Use Cheerio selectors to extract data
//       const title = $('#oppViewHeader h2').text().trim();
//       const summary = $('#oppSynopsisContainer').text().trim();

//       // Print the scraped data
//       console.log('Title:', title);
//       console.log('Summary:', summary);
//     } else {
//       console.log('Failed to fetch the page');
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });


const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.grants.gov/search-results-detail/350786');

  const selector = '#opportunity-container > div > div:nth-child(4) > div > table > tbody > tr:nth-child(1) > td:nth-child(2)';
  await page.waitForSelector(selector);

  // const text = await page.$eval(selector, e => e.textContent);

  // console.log(text);

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


//*[@id="opportunity-container"]/div/div[2]/div/table/tbody/tr[1]/td[1]
// {/* <td data-v-8028f9bc="" style="width: 20%;">Eligible Applicants:</td> */}


  // const data = await page.evaluate(() => {
  //   // Get the "Eligible Applicants" field
  //   const eligibleApplicantsElement = document.querySelector(''#opportunity-container > div > div:nth-child(4) > div > table > tbody > tr:nth-child(1) > td:nth-child(2)'');
  //   let eligibleApplicants = null;
  //   if (eligibleApplicantsElement) {
  //     eligibleApplicants = eligibleApplicantsElement.textContent.trim();
  //   }
  //   console.log("eligibleApplicantsElement",eligibleApplicantsElement);
  //   return { eligibleApplicants };
  // });