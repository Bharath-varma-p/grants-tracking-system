const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');

const url = 'https://www.grants.gov/xml-extract';

const fetchFileList = () => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const $ = cheerio.load(data);
          const fileList = [];

          const table = $('table.usa-table');

          if (table.length > 0) {
            table.find('tbody tr').each((_, row) => {
              const fileName = $(row).find('td:first-child a').text();
              const fileUrl = $(row).find('td:first-child a').attr('href');
              const fileSize = $(row).find('td:nth-child(2)').text().trim();
              const dateTime = $(row).find('td:nth-child(3)').text().trim();

              fileList.push({ fileName, fileUrl, fileSize, dateTime });
            });
            resolve(fileList);
          } else {
            console.error('Failed to extract file list');
            reject('Failed to extract file list');
          }
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const downloadFile = (fileUrl, fileName) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(fileName);
    https.get(fileUrl, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${fileName}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(fileName);
      reject(err);
    });
  });
};

const main = async () => {
  try {
    const fileList = await fetchFileList();
    for (const { fileName, fileUrl } of fileList) {
      await downloadFile(fileUrl, fileName);
    }
  } catch (err) {
    console.error(err);
  }
};

main();