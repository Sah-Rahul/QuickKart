"use client";

import { Card, Skeleton } from "antd";
import Image from "next/image";
import React from "react";

const User = () => {
  return (
    <>
    <Skeleton active/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {Array(20)
          .fill(0)
          .map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6 flex flex-col items-center text-center"
            >
              <img
                src="/images/user.avif"
                alt={`user-${index}`}
                className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover"
              />
              <h2 className="mt-4 text-lg font-semibold text-gray-800">
                Rahul Sah
              </h2>
              <p className="text-sm text-gray-500">rahul@gmail.com</p>
              <span className="mt-2 text-xs font-medium text-gray-400">
                08/05/2025
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default User;
