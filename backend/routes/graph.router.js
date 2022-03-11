/* eslint-disable new-cap */
import express from 'express';

import {
  importXlsx,
} from '../controllers/graph.controller.js';

const graphRouter = express.Router();

graphRouter.post('/post', importXlsx);

export default graphRouter;
