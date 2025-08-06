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
      price: body.get("price"),
      discount: body.get("discount") ?? "0",
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
    await ConnectDB()
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const slugs = await productModel.distinct("slug");
      return res.json(slugs, { status: 200 });
    }

    // If no slug, return all products
    const products = await productModel.find();
    return res.json(products, { status: 200 });
  } catch (err) {
    return serverCatchError(err);
  }
};



