"use client"

import React from "react";
import { Table, Avatar, Select } from "antd";
import type { ColumnsType } from "antd/es/table";

interface OrderData {
  key: string;
  customer: string;
  email: string;
  product: string;
  price: string;
  address: string;
  date: string;
}

const { Option } = Select;

const data: OrderData[] = [
  {
    key: "1",
    customer: "Er Saurav",
    email: "email@gmail.com",
    product: "Wireless Mouse",
    price: "₹29.99",
    address: "123 New Road Kathmandu",
    date: "Jun 05, 2025 03:30 PM",
  },
  {
    key: "2",
    customer: "Er Saurav",
    email: "email@gmail.com",
    product: "Bluetooth Headphones",
    price: "₹59.99",
    address: "123 New Road Kathmandu",
    date: "Jun 04, 2025 06:15 PM",
  },
  {
    key: "3",
    customer: "Er Saurav",
    email: "email@gmail.com",
    product: "USB-C Charger",
    price: "₹29.99",
    address: "123 New Road Kathmandu",
    date: "Jun 03, 2025 08:00 PM",
  },
  {
    key: "4",
    customer: "Er Saurav",
    email: "email@gmail.com",
    product: "Laptop Stand",
    price: "₹49.99",
    address: "123 New Road Kathmandu",
    date: "Jun 02, 2025 09:30 PM",
  },
];

const columns: ColumnsType<OrderData> = [
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    render: (_, record) => (
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Avatar style={{ backgroundColor: "#f56a00" }}>
          {record.customer[0]}
        </Avatar>
        <div>
          <div style={{ fontWeight: 500 }}>{record.customer}</div>
          <div style={{ color: "gray", fontSize: "13px" }}>{record.email}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    responsive: ["lg"],
  },
  {
    title: "Status",
    key: "status",
    render: () => (
      <Select defaultValue="Status" style={{ width: 120 }}>
        <Option value="pending">Pending</Option>
        <Option value="shipped">Shipped</Option>
        <Option value="delivered">Delivered</Option>
      </Select>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];

const Order: React.FC = () => {
  return (
    <div style={{ padding: 24, background: "#fff", borderRadius: 8 }}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 4 }}
        scroll={{ x: true }}
        bordered
      />
    </div>
  );
};

export default Order;
