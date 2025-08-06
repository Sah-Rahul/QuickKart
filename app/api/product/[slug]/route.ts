import { NextRequest, NextResponse as res } from "next/server";
import ConnectDB from "@/config/db";
import serverCatchError from "@/utility/server-catch-error";
import productModel from "@/models/product.model";
import slugInterface from "@/interfacesTypes/slug.interface";


export const GET = async (req: NextRequest, context: slugInterface) => {
  try {
    await ConnectDB();

    const { slug } = context.params;
    const products = await productModel.findOne({slug});
    if (!products) return res.json({ message: "product not found with slug" }, { status: 404});
    return res.json(products);

  } catch (error) {
    return serverCatchError(error);
  }
};


export const PUT = async (req: NextRequest, context: slugInterface) => {
  try {
    await ConnectDB();

    const { slug: id} = context.params;
    const body = await req.json()
    const products = await productModel.findByIdAndUpdate(id, body, {new: true});
    if (!products) return res.json({ message: "product not found with slug" }, { status: 404});
    return res.json(products);

  } catch (error) {
    return serverCatchError(error);
  }
};


export const DELETE = async (req: NextRequest, context: slugInterface) => {
  try {
    await ConnectDB();

    const { slug: id} = context.params;
    const products = await productModel.findByIdAndDelete(id);
    if (!products) return res.json({ message: "product not found with slug" }, { status: 404});
    return res.json(products);

  } catch (error) {
    return serverCatchError(error);
  }
};
