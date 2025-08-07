"use client";

import { Table, Tag, Select, Skeleton, Avatar, Breadcrumb } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";

const orderData = [
  {
    statusCode: 200,
    amount: 500,
    totalAmount: 1500,
    quantity: 3,
    price: 500,
    items: "Mobile Phone",
    address: "kathmandu",
    userId: "user_001",
    name: "Rahul Sah",
    email: "rahul.sah@example.com",
    orderId: "order_1001",
    createdAt: "2025-08-01T10:15:00Z",
  },
  {
    statusCode: 200,
    amount: 1200,
    totalAmount: 1200,
    quantity: 1,
    price: 1200,
    items: "Laptop",
    address: "Pokhara ",
    userId: "user_002",
    name: "Sita Sharma",
    email: "sita.sharma@example.com",
    orderId: "order_1002",
    createdAt: "2025-08-01T11:20:00Z",
  },
  {
    statusCode: 200,
    amount: 300,
    totalAmount: 900,
    quantity: 3,
    price: 300,
    items: "Headphones",
    address: "Bhaktapur ",
    userId: "user_003",
    name: "Mohan Thapa",
    email: "mohan.thapa@example.com",
    orderId: "order_1003",
    createdAt: "2025-08-02T09:45:00Z",
  },
  {
    statusCode: 200,
    amount: 700,
    totalAmount: 1400,
    quantity: 2,
    price: 700,
    items: "Smartwatch",
    address: "Birgunj  ",
    userId: "user_004",
    name: "Anita Rai",
    email: "anita.rai@example.com",
    orderId: "order_1004",
    createdAt: "2025-08-02T14:30:00Z",
  },
  {
    statusCode: 200,
    amount: 150,
    totalAmount: 600,
    quantity: 4,
    price: 150,
    items: "USB Cable",
    address: "Dharan   ",
    userId: "user_005",
    name: "Bikash Lama",
    email: "bikash.lama@example.com",
    orderId: "order_1005",
    createdAt: "2025-08-03T08:10:00Z",
  },
  {
    statusCode: 200,
    amount: 250,
    totalAmount: 750,
    quantity: 3,
    price: 250,
    items: "Power Bank",
    address: "Nepalgunj  ",
    userId: "user_006",
    name: "Priya Gurung",
    email: "priya.gurung@example.com",
    orderId: "order_1006",
    createdAt: "2025-08-03T16:05:00Z",
  },
  {
    statusCode: 200,
    amount: 1000,
    totalAmount: 2000,
    quantity: 2,
    price: 1000,
    items: "Tablet",
    address: "Janakpur   ",
    userId: "user_007",
    name: "Suresh Karki",
    email: "suresh.karki@example.com",
    orderId: "order_1007",
    createdAt: "2025-08-04T07:40:00Z",
  },
  {
    statusCode: 200,
    amount: 350,
    totalAmount: 1050,
    quantity: 3,
    price: 350,
    items: "Bluetooth Speaker",
    address: "Nepalgunj    ",
    userId: "user_008",
    name: "Nisha Adhikari",
    email: "nisha.adhikari@example.com",
    orderId: "order_1008",
    createdAt: "2025-08-04T13:15:00Z",
  },
  {
    statusCode: 200,
    amount: 400,
    totalAmount: 800,
    quantity: 2,
    price: 400,
    items: "Wireless Mouse",
    address: "Biratnagar    ",
    userId: "user_009",
    name: "Ramesh Shrestha",
    email: "ramesh.shrestha@example.com",
    orderId: "order_1009",
    createdAt: "2025-08-05T12:00:00Z",
  },
  {
    statusCode: 200,
    amount: 600,
    totalAmount: 2400,
    quantity: 4,
    price: 600,
    items: "Smartphone",
    address: "Lalitpur    ",
    userId: "user_010",
    name: "Kiran Magar",
    email: "kiran.magar@example.com",
    orderId: "order_1010",
    createdAt: "2025-08-05T18:25:00Z",
  },
];

const columns: ColumnsType<any> = [
  {
    key: "customer",
    title: "Customer",
    render: (item) => (
      <div className="flex items-center gap-2">
        <Avatar className="!bg-orange-500">R</Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{item.name}</span>
          <span className="text-gray-500 text-sm">{item.email} </span>
        </div>
      </div>
    ),
  },
  {
    title: "Product",
    key: "product",
    render: (item) => (
      <span className="text-gray-700 font-medium">{item.items}</span>
    ),
  },
  {
    title: "Price",
    key: "price",
    render: (item) => (
      <span className="font-semibold text-black">Npr{item.price}</span>
    ),
  },
  {
    title: "Address",
    key: "address",
    render: (item) => (
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${item.address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-sm underline hover:text-blue-700 transition"
      >
        {item.address.trim()}
      </a>
    ),
  },
  {
    title: "Status",
    key: "status",
    // width: 100,
    render: () => (
      <Select
        defaultValue="Pending"
        className="w-[100px]"
        suffixIcon={null}
        options={[
          { value: "Pending", label: <Tag color="orange">Pending</Tag> },
          { value: "Shipped", label: <Tag color="blue">Shipped</Tag> },
          { value: "Delivered", label: <Tag color="green">Delivered</Tag> },
          { value: "Cancelled", label: <Tag color="red">Cancelled</Tag> },
        ]}
      />
    ),
  },

  {
    title: "Date",
    key: "createdAt",
    render: (item) => (
      <span className="text-gray-700 text-sm">
        {dayjs(item.createdAt).format("MMM DD, YYYY hh:mm A")}
      </span>
    ),
  },
];

const UserOrders = () => {
  

  return (
    <>
      <Skeleton active />

      <div className="pt-4">
        <div className=" font-bold mb-3">
       
        </div>
        <Table
          columns={columns}
          dataSource={orderData}
          rowKey="orderId"
          pagination={{ pageSize: 5 }}
          className="bg-white rounded-xl shadow-sm"
        />
      </div>
    </>
  );
};

export default UserOrders;
