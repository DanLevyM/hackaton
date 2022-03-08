import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import slugify from 'slugify';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({path: '../config/config.env'});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password cannot be less than 6 characters'],
    maxlength: [30, 'Password cannot be more than 30 characters'],
    // Dont show pwd
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['admin', 'client', 'tester'],
    default: 'client',
  },
  name: {
    type: String,
    minlength: [2, 'Name cannot be less than 2 characters'],
    maxlength: [30, 'Name cannot be more than 30 characters'],
    required: false,
  },
  slug: String,
});

// Create slug from name
UserSchema.pre('save', function(next) {
  // eslint-disable-next-line no-invalid-this
  this.slug = slugify(this.name, {lower: true});
  next();
});

// Encrypt pwd using bcrypt
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  // eslint-disable-next-line no-invalid-this
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered pwd to hashed pwd in db
UserSchema.methods.matchPassword = async function(enteredPwd) {
  return await bcrypt.compare(enteredPwd, this.password);
};

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
};

// Match user entered pwd to hashed pwd in db
UserSchema.methods.matchPasswor = async function(enteredPwd) {
  return await bcrypt.compare(enteredPwd, this.password);
};

export default mongoose.model('User', UserSchema);
