import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse as res } from "next/server";
import userModel from "@/models/user.model";
import { serverCatchError } from "@/lib/server-error";

if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI!);
  console.log("✅ MongoDB connected for login API");
}

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ error: "Invalid password" }, { status: 401 });
    }

    return res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    return serverCatchError(error);
  }
};
