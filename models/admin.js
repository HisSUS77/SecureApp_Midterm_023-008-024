import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  user: String,
  pass: String
});

export const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);