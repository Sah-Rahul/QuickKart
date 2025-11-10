"use client";
import React from "react";
import { Avatar, Card, } from "antd";
import Image from "next/image";

const Users = () => {
  // <Skeleton />
  return (
    <div className="grid grid-cols-4 gap-8">
      {Array(16)
        .fill(0)
        .map((_, index) => (
          <Card key={index} hoverable>
            <div className="flex flex-col items-center gap-6">
              <Avatar
                size="large"
                src="https://imgs.search.brave.com/lK60KKTmb7rV3I6EAth6Ri1Au2pzFAefknipcqo8Kd0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTIvQXZh/dGFyLVByb2ZpbGUt/UE5HLUltYWdlLUZp/bGUucG5n"
                style={{ cursor: "pointer" }}
              />
              <Card.Meta title="Rohan Kumar" description="email@gmail.com" />
              <label className="text-gray-500">Jan 3, 2024</label>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default Users;
