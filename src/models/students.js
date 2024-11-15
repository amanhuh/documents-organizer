import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  rollNo: { type: Number, required: true },
  username: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  course: {
    department: { type: String, required: true },
    year: { type: Number, required: true },
    sem: { type: Number, required: true },
  }
});

export default mongoose.models?.User || mongoose.model("User", UserSchema);