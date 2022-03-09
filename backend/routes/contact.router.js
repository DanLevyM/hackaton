import {sendContactForm} from '../controllers/contact.controller.js';
import express from 'express';

// eslint-disable-next-line new-cap
const contactRouter = express.Router();

contactRouter.post('/send', sendContactForm);

export default contactRouter;
