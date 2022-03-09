// npm install xlsx
const XLSX = require("xlsx");

// Lecture du fichier
const workbook = XLSX.readFile("./xlsx/data.xlsx");

// Les noms des onglets
const sheetNames = workbook.SheetNames;

// Les lignes au format JSON
const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[1]], {
  header: 0
});

console.log(json);
