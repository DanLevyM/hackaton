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
    required: true,
    enum: ['client', 'tester'],
    default: 'client',
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    minlength: [5, 'Title cannot be less than 5 characters'],
    maxlength: [50, 'Title cannot be more than 50 characters'],
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
    minlength: [10, 'Message cannot be less than 10 characters'],
    maxlength: [300, 'Message cannot be more than 300 characters'],
  },
  registerForm: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: false,
    minlength: [2, 'Name cannot be less than 2 characters'],
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Contact', ContactSchema);
