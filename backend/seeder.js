import fs from 'fs';
import mongoose from 'mongoose';

import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);
console.log(path.join(__dirname, '/dist', 'index.html'));

// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import dotenv from 'dotenv';

dotenv.config({path: './config/config.env'});

import Product from './models/Product.js';
import User from './models/Users.js';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = JSON.parse(fs.readFileSync(`${__dirname}/__fixtures/products.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/__fixtures/users.json`, 'utf-8'));

const importData = async () => {
  try {
    await Product.create(products);
    await User.create(users);

    console.log('Data imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed...'.red);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
