import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Report', ReportSchema);
