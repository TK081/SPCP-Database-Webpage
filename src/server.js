// app.use(express.json());
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000
app.use(express.static('public'));

/* 
*-----------------------*
* Packages              *
*                       *
* npm install axios     *
* npm install xlsx      *
* npm install cors      *
*-----------------------*
*/

// Enable CORS for all routes
app.use(cors());

// Code to read in excel data file using XLSX & SheetJS
const path = require('path');
const XLSX = require('xlsx');
const ExcelJS = require('exceljs');
const filePath = path.join(__dirname, 'excelfiles', 'praythisworksv2.xlsx');

const readExcel = async () => {
  // Code to loop through the first column and extract all bolded indicators
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Peel Region Statistics'); // Replace 'Sheet1' with the name of your sheet

  const boldedText = [];

  // worksheet.getColumn('A').eachCell((cell, rowNumber) => {
  //   if (cell.font && cell.font.bold) {
  //     boldedText.push(cell.value);
  //   }
  // });

   // Find the first and last columns that contain bolded text
  
   let startColumn = null;
   let endColumn = null;
 
   worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
     row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
       if (cell.font && cell.font.bold) {
         const colLetter = XLSX.utils.encode_col(colNumber);
         if (!startColumn || colNumber < startColumn) {
           startColumn = colNumber;
         }
         if (!endColumn || colNumber > endColumn) {
           endColumn = colNumber;
         }
       }
     });
   });
 
   // Add bolded text from column A
   const columnA = [];
   worksheet.getColumn('A').eachCell((cell, rowNumber) => {
     if (cell.font && cell.font.bold) {
       boldedText.push(cell.value);
     }
   });
   boldedText['Column A'] = columnA;
 
   // Loop through each column within the determined range
   for (let col = startColumn; col <= endColumn; col++) {
     const colLetter = XLSX.utils.encode_col(col);
     if (colLetter !== 'A') {
      const columnData = [];
       worksheet.getColumn(colLetter).eachCell((cell, rowNumber) => {
         if (cell.font && cell.font.bold) {
           boldedText.push(cell.value);
         }
       });
       boldedText[`Column ${colLetter}`] = columnData;
     }
   }

  // console.log(boldedText);
  console.log(JSON.stringify(boldedText, null, 2));

  // const readExcel = async () => {
  //   const workbook = new ExcelJS.Workbook();
  //   await workbook.xlsx.readFile(filePath);
  //   const worksheet = workbook.getWorksheet('Canada Statistics'); // Replace 'Sheet1' with the name of your sheet
  
  //   const boldedText = [];
  
  //   const startRow = 1; // Start from row 2 (excluding header)
  //   const endRow = 225; // End at row 10
  
  //   for (let rowNumber = startRow; rowNumber <= endRow; rowNumber++) {
  //     const cell = worksheet.getCell(`A${rowNumber}`); // Assuming you're searching in the first column
  //     if (cell.font && cell.font.bold) {
  //       boldedText.push({
  //         text: cell.value,
  //         position: {
  //           row: rowNumber,
  //           column: 1, // Assuming you're searching in the first column
  //         },
  //       });
  //     }
  //   }
  
    // console.log(boldedText);
  // };
  
  // readExcel();

};

 readExcel();

app.get('/api/sheetNames', async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheetNames = workbook.worksheets.map(sheet => decodeURIComponent(sheet.name));
  res.json({ sheetNames });
});

app.get('/api/sheet/:sheetName', async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheetName = decodeURIComponent(req.params.sheetName);
  const sheet = workbook.getWorksheet(sheetName);
  console.log('Sheet Object:', sheet);
  const jsonData = sheet.getSheetValues();
  res.json({ sheetData: jsonData });
});

// app.get('/api/sheetNames', (req, res) => {
//   const workbook = XLSX.readFile(filePath);
//   const sheetNames = workbook.SheetNames;
//   res.json({ sheetNames });
// });

// ExcelJS Get Request for sheetNames
// app.get('/api/sheetNames', (req, res) => {
//   const workbook = new ExcelJS.Workbook();
//   workbook.xlsx.readFile(filePath)
//     .then(() => {
//       const sheetNames = workbook.sheetNames;
//       res.json({ sheetNames });
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'Failed to read the file' });
//     });
// });


// Check endpoint in both server.js & Dropdown.js
// http://localhost:8000/api/sheet/Canada%20Statistics
// http://localhost:8000/api/sheet/Peel%20Region%20Statistics
// app.get('/api/sheet/:sheetName',(req, res) => {

//   const workbook = XLSX.readFile(filePath);
//   const sheetName = decodeURIComponent(req.params.sheetName);
//   const sheet = workbook.Sheets[sheetName];
//   console.log('Sheet Object:', sheet);
//   const jsonData = XLSX.utils.sheet_to_json(sheet);
//   res.json({ sheetData: jsonData });

  // const sheetName = workbook.SheetNames;
  // res.json({sheetName});
  //const worksheet = workbook.Sheets[sheetnames];
  //const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetnames]);
  
// });

// http://localhost:8000/api/search?query=helloworld
app.get('/api/search', (req, res) => {

  //res.send('Hello from the search endpoint');
  console.log('Received request at /api/search');
  const query = req.query.query;
  // Implement our own search logic 
  console.log('Query:',query);
  res.json(query)

});

app.listen(port, () => {
  console.log('Server is running on port 8000');
});