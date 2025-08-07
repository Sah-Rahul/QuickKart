import DataInterface from "@/interfacesTypes/data.interface";
import { Card, Tag } from "antd";
import Image from "next/image";
import React, { FC } from "react";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";

const Product: FC<DataInterface> = ({ data }) => {
  return (
    <div className="container mx-auto px-4 ml-32 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {data.data.map((item: any, index: number) => (
          <Card
            key={index}
            hoverable
            className="w-full group relative overflow-hidden"
            cover={
              <div className="relative w-full h-[220px] overflow-hidden">
                <Image
                  src={item.image}
                  width={300}
                  height={220}
                  priority
                  alt={`product-${index}`}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* 👉 Hover Icons (slide in from right) */}
                <div className="absolute top-4 right-[-100px] group-hover:right-4 transition-all duration-500 flex flex-col gap-2 z-10">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                    <ShoppingCartOutlined className="cursor-pointer text-[18px]" />
                  </button>
                  <Link
                    href={`/products/${item.title
                      .toLowerCase()
                      .split(" ")
                      .join("-")}`}
                  >
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                      <EyeOutlined className="cursor-pointer text-[18px]" />
                    </button>
                  </Link>
                </div>
              </div>
            }
          >
            {/* Title */}
            <h3 className="text-base font-semibold text-gray-800 truncate mb-1">
              {item.title}
            </h3>

            {/* Price and Discount */}
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-gray-900">
                Rs {(item.price - (item.price * item.discount) / 100).toFixed()}
              </label>
              {/* <div className="text-right"> */}
              <del className="text-gray-500 text-sm">Rs{item.price}</del>
              <span className="text-red-600 text-xs ml-1">
                ({item.discount}% OFF)
              </span>
              {/* </div> */}
            </div>

            {/* Quantity Tag */}
            <div className="mt-2">
              <Tag>{item.quantity} pcs</Tag>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Product;
