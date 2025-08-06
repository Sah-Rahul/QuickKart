import { NextRequest, NextResponse as res } from "next/server";
import ConnectDB from "@/config/db";
import serverCatchError from "@/utility/server-catch-error";
import productModel from "@/models/product.model";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

// Create product
export const POST = async (req: NextRequest) => {
  try {
    await ConnectDB();

    const body = await req.formData();
    const file = body.get("image") as File | null;

    if (!file)
      return res.json({ message: "Product image not sent" }, { status: 400 });

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save image to /public/products
    const root = process.cwd();
    const folder = path.join(root, "public", "products");

    // if folder doesn't exist
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    const fileName = `${uuid()}.png`;
    const filepath = path.join(folder, fileName);
    fs.writeFileSync(filepath, buffer);

    // Create product in DB
    const payload = {
      title: body.get("title"),
      description: body.get("description"),
      price: Number(body.get("price")),
      discount: Number(body.get("discount") ?? "0"),
      quantity: Number(body.get("quantity")),
      image: `/products/${fileName}`,
    };

    const createdProduct = await productModel.create(payload);

    return res.json(createdProduct, { status: 201 });
  } catch (error) {
    return serverCatchError(error);
  }
};

// Fetch all products

export const GET = async (req: NextRequest) => {
  try {
    await ConnectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const slug = searchParams.get("slug");
    const skip = (page - 1) * limit;
    const total = await productModel.countDocuments();

    if (slug) {
      const slugs = await productModel.distinct("slug");
      return res.json(slugs, { status: 200 });
    }

    if (search) {
      const product = await productModel
        .find({ title: RegExp(search, "i") })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      return res.json({ total, data: product });
    }
    // If no slug, return all products

    const products = await productModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return res.json({ total, data: products });
  } catch (err) {
    return serverCatchError(err);
  }
};
