import mongoose from "mongoose";
import { NextRequest, NextResponse as res } from "next/server";
import userModel from "@/models/user.model";
import { serverCatchError } from "@/lib/server-error";

// Connect DB
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI!);
  console.log("✅ MongoDB connected for signup API");
}

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { email } = body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email already registered" }, { status: 400 });
    }

    const user = await userModel.create(body);

    return res.json({
      message: "Signup success",
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
