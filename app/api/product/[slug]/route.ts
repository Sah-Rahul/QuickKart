import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import productModel from "@/models/product.model";
import { serverCatchError } from "@/lib/server-error";

// ✅ Connect MongoDB
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI!);
  console.log("✅ MongoDB connected for Product API (by slug)");
}

export const GET = async (
  _req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    const { slug } = params;

    const product = await productModel.findOne({ slug });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found with slug" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return serverCatchError(error);
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  try {
    const { slug: id } = params;
    const body = await req.json();
    const product = await productModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found with slug" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return serverCatchError(error);
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  try {
    const { slug: id } = params;

    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found with slug" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return serverCatchError(error);
  }
};
