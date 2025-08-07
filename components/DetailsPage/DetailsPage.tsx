import DataInterface from "@/interfacesTypes/data.interface";
import { Empty, Button } from "antd";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import React, { FC } from "react";

const DetailsPage: FC<DataInterface> = ({ data }) => {
  if (!data) return <Empty />;

  const discountedPrice = (data.price - (data.price * data.discount) / 100).toFixed(2);

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Image section */}
      <div className="flex-shrink-0 w-full md:w-1/3 relative rounded-lg overflow-hidden shadow-md">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Details section */}
      <div className="flex flex-col justify-between w-full md:w-2/3">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <p className="mb-6 text-gray-700">{data.description}</p>

        <div className="flex flex-wrap items-center gap-4">
          <p className="text-2xl font-extrabold text-green-600">
            ₹{discountedPrice}
          </p>
          <p className="text-lg text-gray-400 line-through">
            ₹{data.price.toFixed(2)}
          </p>
          <p className="text-red-600 font-semibold">{data.discount}% OFF</p>
        </div>

        <p className="mt-6 text-lg">
          <span className="font-medium">Quantity:</span> {data.quantity} pcs
        </p>

        {/* Buy and Cart buttons */}
        <div className="mt-6 flex gap-4">
          <Button type="primary" icon={<ShoppingOutlined />}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
