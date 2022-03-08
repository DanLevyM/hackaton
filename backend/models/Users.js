import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    minlength: 6,
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
    default: 'user',
  },
  name: {
    type: String,
    required: false,
  },
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

export default mongoose.model('User', UserSchema);
