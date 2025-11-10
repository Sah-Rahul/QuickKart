import mongoose from "mongoose";
import { NextRequest, NextResponse, NextResponse as res } from "next/server";
import productModel from "@/models/product.model";
import { serverCatchError } from "@/lib/server-error";

// Connect DB once
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI!);
  console.log("✅ MongoDB connected for Product API");
}

// CREATE product
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const product = await productModel.create(body);
    return res.json({ message: "Product created successfully", product });
  } catch (error) {
    return serverCatchError(error);
  }
};

// GET all products
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const slugsParam = searchParams.get("slugs");

    if (slugsParam) {
      const slugs = await productModel.distinct("slug");
      return NextResponse.json(slugs);
    }

    const products = await productModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ products });
  } catch (error) {
    return serverCatchError(error);
  }
};
