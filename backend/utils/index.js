// npm install xlsx
import XLSX from 'xlsx';
// Lecture du fichier
const workbook = XLSX.readFile('./xlsx/datas.xlsx');

// Les noms des onglets
const sheetNames = workbook.SheetNames;

// Les lignes au format JSON
const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[2]], {
  header: 0,
});

console.log(json);
