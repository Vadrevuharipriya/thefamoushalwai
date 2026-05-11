import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String, required: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: ['Approve', 'Non-Approve', 'Hold'],
      default: 'Hold'
    }
  },
  { timestamps: true }
);

// Hash password before saving (using async/await with callback wrapper)
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  
  bcrypt.genSalt(10, async (err, salt) => {
    if (err) return next(err);
    try {
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    } catch (err) {
      next(err);
    }
  });
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
