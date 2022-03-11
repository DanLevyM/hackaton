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

    res.status(201).json({
      success: true,
      message: 'File uploaded!',
      data: {
        files: req.files,
        file: req.files.file,
      },
    });
  }
});
