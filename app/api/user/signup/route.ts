import bcrypt from "bcrypt";
import ConnectDB from "@/config/db";
import userModel from "@/models/user.model";
import serverCatchError from "@/utility/server-catch-error";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await ConnectDB(); 

    const body = await req.json();
    const { password, ...rest } = body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);  

    const user = await userModel.create({
      ...rest,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User created successfully", userId: user._id },
      { status: 201 }
    );
  } catch (error) {
    return serverCatchError(error);
  }
};
