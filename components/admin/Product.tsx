"use client";

import React, { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Tag,
  Typography,
  Upload,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import Image from "next/image";
import Meta from "antd/es/card/Meta";

const Product: React.FC = () => {
  const { Text } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSearch = (values: any) => {
    console.log("Search:", values);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const handleAddProduct = (values: any) => {
    console.log("New Product:", { ...values, image: fileList });
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const handleUploadChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Form onFinish={onSearch}>
          <Form.Item
            className="mb-0"
            name="search"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input
              className="!w-[300px] sm:!w-[400px] md:!w-[450px]"
              placeholder="Search the product"
              suffix={
                <Button
                  type="text"
                  icon={<SearchOutlined />}
                  htmlType="submit"
                />
              }
            />
          </Form.Item>
        </Form>

        <Button
          onClick={handleOpenModal}
          type="primary"
          className="!bg-indigo-500 !h-10 !text-white flex items-center gap-2"
        >
          <PlusOutlined /> Add product
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array(8)
          .fill(0)
          .map((_, index) => {
            const title = "Men`s Blue Jeans";
            const price = 2000;
            const discount = 50;
            const discountedPrice = price - (price * discount) / 100;
            const stock = 20;

            return (
              <Card
                key={index}
                hoverable
                cover={
                  <div className="relative w-full h-[180px]">
                    <Image
                      src="/images/product.webp"
                      alt={`product-${index}`}
                      fill
                      priority={index === 0} // add priority for LCP optimization
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="rounded-t-md object-cover"
                    />
                  </div>
                }
                actions={[
                  <EditOutlined key="edit" className="!text-green-400" />,
                  <DeleteOutlined key="delete" className="!text-rose-400" />,
                ]}
              >
                <Meta
                  title={title}
                  description={
                    <div className="mt-2">
                      <div className="flex gap-4">
                        <Text delete type="secondary">
                          ₹{price}
                        </Text>{" "}
                        <Text type="danger">({discount}% Off)</Text>
                        <Text strong className="block">
                          ₹{discountedPrice}
                        </Text>
                      </div>
                      <Tag color="blue" className="mt-2">
                        {stock} PCS
                      </Tag>
                    </div>
                  }
                />
              </Card>
            );
          })}
      </div>

      <Modal
        title="Add a new product"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        maskClosable={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddProduct}
          className="space-y-4"
        >
          <Form.Item
            name="name"
            label="Product name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <div className="flex flex-wrap gap-4">
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter price" }]}
              className="flex-1"
            >
              <Input type="number" placeholder="0.00" />
            </Form.Item>

            <Form.Item
              name="discount"
              label="Discount (%)"
              rules={[{ required: true, message: "Enter discount" }]}
              className="flex-1"
            >
              <Input type="number" placeholder="20" />
            </Form.Item>

            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: "Enter quantity" }]}
              className="flex-1"
            >
              <Input type="number" placeholder="20" />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={3} placeholder="Description" />
          </Form.Item>

          <Form.Item label="Upload a product image">
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            className="!bg-indigo-500 !text-white w-full"
          >
            Add now
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
