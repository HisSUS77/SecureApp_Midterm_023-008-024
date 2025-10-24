import mongoose from "mongoose";


const adminSchema = new mongoose.Schema({
  user: { type: String, required: true },
  pass: { type: String, required: true }, // Will store bcrypt hash
});

export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);