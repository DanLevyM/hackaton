import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  role: {
    type: String,
    required: [true, 'Please add a role'],
    enum: ['client', 'tester'],
    default: 'client',
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone'],
    minlength: [8, 'Phone cannot be less than 8 characters'],
    maxlength: [12, 'Phone cannot be more than 12 characters'],
  },
  message: {
    type: String,
    required: [true, 'Please add you message'],
    minlength: [10, 'Message cannot be less than 10 characters'],
    maxlength: [300, 'Message cannot be more than 300 characters'],
  },
  company: {
    type: String,
    required: false,
    minlength: [2, 'Company cannot be less than 2 characters'],
    maxlength: [20, 'Company cannot be more than 20 characters'],
  },
  registerForm: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
    minlength: [2, 'Name cannot be less than 2 characters'],
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Contact', ContactSchema);
