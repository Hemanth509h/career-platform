import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    personality: { type: String, default: null },
    aptitudeScore: { type: Number, default: null },
    interests: [{ type: String }]
  },
  savedCareers: [{ type: String }],
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
