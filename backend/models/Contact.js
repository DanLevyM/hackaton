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
  title: {
    type: String,
    required: [true, 'Please add a title'],
    minlength: [5, 'Title cannot be less than 5 characters'],
    maxlength: [50, 'Title cannot be more than 50 characters'],
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
    minlength: [20, 'Title cannot be less than 20 characters'],
    maxlength: [300, 'Title cannot be more than 300 characters'],
  },
});

export default mongoose.model('Contact', ContactSchema);
