import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    phone:   { type: String, required: true, trim: true },
    email:   { type: String, trim: true, lowercase: true },
    service: { type: String, trim: true },
    message: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Enquiry', enquirySchema);
