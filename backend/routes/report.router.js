/* eslint-disable new-cap */
import {
  createReport,
  getReport,
  getReports,
  deleteReport,
} from '../controllers/report.controller.js';
import express from 'express';
import {protect} from '../middleware/auth.js';

const reportRouter = express.Router();

reportRouter
    .route('/new')
    .post(protect, createReport);
reportRouter
    .route('/all')
    .get(protect, getReports);
reportRouter
    .route('/:id')
    .get(protect, getReport);
reportRouter
    .route('/:id')
    .delete(protect, deleteReport);

export default reportRouter;
