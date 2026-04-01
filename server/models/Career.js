import mongoose from 'mongoose';

const StepSchema = new mongoose.Schema({
  stage: String,
  title: String,
  description: String,
  courses: [String],
});

const CareerSchema = new mongoose.Schema({
  careerId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  salary: { type: String, required: true },
  demand: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  steps: [StepSchema],
});

export default mongoose.model('Career', CareerSchema);
