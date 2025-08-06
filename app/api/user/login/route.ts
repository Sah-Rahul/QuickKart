import bcrypt from "bcrypt";
import ConnectDB from "@/config/db";
import userModel from "@/models/user.model";
import serverCatchError from "@/utility/server-catch-error";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await ConnectDB();

    const { email, password } = await req.json();

    // Find user in DB
    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User doesn't exist with this email" },
        { status: 404 }
      );
    }

    // Compare entered password with hashed password from DB
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    //  user is authenticated
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    return serverCatchError(error);
  }
};
