import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { required: true, type: String },
  NIN: { required: true, type: String, unique: true },
  email: { type: String, unique: true },
  password: { required: true, type: String },
  role: { type: String, const: "doctor" },
  phone: { type: String, required: true },
  specialty: { type: String },
  department: {
    type: String,
    required: true,
    enum: ['General Medicine', 'Pediatrics', 'Dermatology', 'Cardiology'],
  },
  availability: {
    type: [{
      date: String,
      timeSlots: [String]
    }]
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

doctorSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

doctorSchema.set('toJSON', { virtuals: true });

export const doctorsModel = mongoose.model('Doctor', doctorSchema);