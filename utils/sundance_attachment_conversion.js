const fs = require("fs-extra");
const path = require("path");
const { Table } = require("console-table-printer");

function getFileNamesInDirectory(dirPath, table) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      getFileNamesInDirectory(filePath, table);
    } else {
      table.addRow({ Folder: dirPath, FileName: file });
    }
  });
}

function createFileNamesTable(rootPath) {
  const table = new Table({
    columns: [
      { name: "Folder", alignment: "left", width: 30 },
      { name: "FileName", alignment: "left", width: 40 },
    ],
  });

  getFileNamesInDirectory(rootPath, table);
  // table.printTable();

  const csvFilePath = "2022Tow.csv"; // Specify the desired file name and path here

  let csvContent = "";
  const headerRow = ["path", "filename"];
  csvContent += headerRow.join(",") + "\n";
  table.table.rows.forEach((row) => {
    const rowValues = Object.values(row.text);
    csvContent += rowValues.join(",") + "\n";
  });

  fs.writeFileSync(csvFilePath, csvContent);
  globalThis.logger.info(`Table exported to ${csvFilePath} successfully.`);
}

const rootPath = "G:/SUNDANCE/est/root/TOW/2022"; // Replace with the actual root directory path
createFileNamesTable(rootPath);
