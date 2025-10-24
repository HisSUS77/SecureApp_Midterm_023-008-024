import dbConnect from "@/utils/dbConnect";
import { Admin } from "@/models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ success: false, error: "Method not allowed" });
    }

    await dbConnect();
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: "Missing credentials" });
    }

    const admin = await Admin.findOne({ user: username });
    if (!admin) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // If password isn't hashed yet (development only), compare directly
    let isMatch;
    if (admin.pass.startsWith('$2a$') || admin.pass.startsWith('$2b$')) {
      isMatch = await bcrypt.compare(password, admin.pass);
    } else {
      isMatch = password === admin.pass;
      // Optionally hash the password for next time
      if (isMatch) {
        admin.pass = await bcrypt.hash(password, 10);
        await admin.save();
      }
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { user: admin.user, role: "admin" },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: "1h" }
    );

    // Set HTTP-Only cookie
    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}
