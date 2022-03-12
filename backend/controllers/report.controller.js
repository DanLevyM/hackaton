import asyncHandler from '../middleware/async.js';
import Report from '../models/Report.js';
import ErrorResponse from '../utils/errorResponse.js';
import fs from 'fs';

// @desc    Create report
// @path    POST /api/v1/report/new
// @access  Private
export const createReport = asyncHandler(async (req, res, next) => {
  const {path} = req.body;

  if (!path) return next(new ErrorResponse('Please provide valid path for report', 400));

  const report = await Report.create({
    path,
  });

  res.status(200).json({
    data: report,
    success: true,
  });
});

// @desc    Retrieve reports
// @path    GET /api/v1/report/all
// @access  Private
export const getReports = asyncHandler(async (req, res, next) => {
  const reports = await Report.find();

  res.status(200).json({
    data: reports,
    success: true,
  });
});

// @desc    Retrieve 1 report
// @path    GET /api/v1/report/:id
// @access  Private
export const getReport = asyncHandler(async (req, res, next) => {
  const report = await Report.findById(req.params.id);

  if (!report) return next(new ErrorResponse('Invalid report', 400));

  res.status(200).json({
    data: report,
    success: true,
  });
});

// @desc    Delete 1 report
// @path    DELETE /api/v1/report/:id
// @access  Private
export const deleteReport = asyncHandler(async (req, res, next) => {
  let report = await Report.findById(req.params.id);
  if (!report) return next(new ErrorResponse('Invalid report', 400));

  fs.unlinkSync(report.path);
  report = await Report.findByIdAndDelete(req.params.id);

  res.status(200).json({
    data: {},
    message: 'Report deleted!',
    success: true,
  });
});
