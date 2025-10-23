import dbConnect from "@/utils/dbConnect";
import { Admin } from "@/models/admin";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {

  await dbConnect(); // Connect to MongoDB

  try {
    // Connect to MongoDB
    await mongoose.dbConnect;
    console.log("MongoDB connected successfully");

    // Fetch admin data
    const adminData = await Admin.find();
    console.log("Admin Data:", adminData);

    return NextResponse.json({ result: true, data: adminData });
  } catch (error) {
    console.error("Error fetching admin data:", error.message);
    return NextResponse.json({ result: false, error: error.message }, { status: 500 });

  }
}