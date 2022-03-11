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
    console.log(req.files.file);
    // let file = req.files.name;
    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    const file = req.files.file;

    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    await file.mv('./uploads/' + file.name);
    const workbook = XLSX.readFile('./uploads/' + file.name);
    const sheetNames = workbook.SheetNames;
    const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[2]], {
      header: 0,
    });
    console.log(json);
    res.status(201).json({
      success: true,
      message: 'File uploaded!',
      data: json,
    });
  }
});
