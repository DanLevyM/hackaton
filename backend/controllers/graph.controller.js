import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';
import XLSX from 'xlsx';

// @desc    Import excell and send datas for graphs
// @path    POST /api/v1/xlsx
// @access
export const importXlsx = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse('Please add a file', 401));
  } else {
    const file = req.files.file;

    await file.mv('./uploads/' + file.name);
    const workbook = XLSX.readFile('./uploads/' + file.name);
    const sheetNames = workbook.SheetNames;
    const sheet1 = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]], {
      header: 0,
    });
    const sheet2 = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[1]], {
      header: 0,
    });
    const json = sheet1.concat(sheet2);
    res.status(201).json({
      success: true,
      message: 'File uploaded!',
      data: json,
    });
  }
});
