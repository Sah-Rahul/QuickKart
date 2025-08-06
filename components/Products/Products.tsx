"use client";

import clientCatchError from "@/utility/clilent-catch-errors";
import fetcher from "@/utility/fetcher";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Pagination,
  Result,
  Skeleton,
  Tag,
  Tooltip,
  Upload,
} from "antd";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [resetForm] = Form.useForm();
  const { isLoading, data, error } = useSWR("/api/product", fetcher);

  const closeModal = () => {
    setOpenModal(false);
    resetForm.resetFields();
  };

  const onSearch = (values: any) => {
    console.log("Searching for:", values);
  };

  const createProduct = async (values: any) => {
    try {
      values.image = values.image.file.originFileObj;
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      await axios.post("/api/product", formData);
      message.success("product added successfully !");
      closeModal();
    } catch (error) {
      clientCatchError(error);
    }
  };
  if (isLoading) return <Skeleton active />;
  if (error) {
    return <Result status="error" title={error.message} />;
  }
  return (
    <div className="flex flex-col gap-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Form onFinish={onSearch}>
          <Form.Item name="search" className="!mb-0">
            <Input
              className="!w-[300px]"
              placeholder="Search product"
              suffix={
                <Button
                  htmlType="submit"
                  type="text"
                  icon={<SearchOutlined />}
                />
              }
            />
          </Form.Item>
        </Form>

        <Button
          onClick={() => setOpenModal(true)}
          type="primary"
          size="large"
          icon={<PlusCircleOutlined />}
        >
          Add product
        </Button>
      </div>

      {/* Product Grid */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
          {data.map((item: any, index: number) => (
            <Card
              key={index}
              hoverable
              className="w-full"
              cover={
                <div className="relative w-full h-[220px]">
                  <Image
                    src={item.image}
                    fill
                    alt={`product-${index}`}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
              }
              actions={[
                <Tooltip title="Edit" key="edit">
                  <EditOutlined className="text-blue-600" />
                </Tooltip>,
                <Tooltip title="Delete" key="delete">
                  <DeleteOutlined className="text-red-500" />
                </Tooltip>,
              ]}
            >
              {/* Product Title */}
              <h3 className="text-base font-semibold text-gray-800 truncate mb-1">
                {item.title}
              </h3>

              {/* Price & Discount Section */}
              <div>
                <div className="flex items-center  justify-between">
                  <span className="text-lg font-bold text-green-600">
                    Rs {item.price}
                  </span>
                  <span className="text-sm line-through text-gray-500">
                    Rs {item.discount}
                  </span>
                  <span className="text-xs font-semibold  px-2 py-[2px] rounded">
                    ( {item.quantity}% Off)
                  </span>
                </div>
                <div className="mt-2">
                  <Tag>20pics</Tag>
                  <Tag>20pics</Tag>
                  <Tag>20pics</Tag>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {/* pagination here  */}
        <div className="flex justify-end">
          <Pagination />
        </div>
      </div>

      {/* modal here  */}
      <Modal
        title="Add New Product"
        open={openModal}
        onCancel={closeModal}
        footer={null}
        centered
        maskClosable={false}
      >
        <Form
          layout="vertical"
          size="large"
          onFinish={createProduct}
          form={resetForm}
        >
          <Form.Item
            label="Product Name"
            name="title"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <div style={{ display: "flex", gap: 16 }}>
            {/* Price Field */}
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter price" }]}
              style={{ flex: 1 }}
            >
              <InputNumber
                min={0}
                step={0.01}
                precision={2}
                style={{ width: "100%" }}
              />
            </Form.Item>

            {/* Discount Field */}
            <Form.Item
              label="Discount (%)"
              name="discount"
              rules={[{ required: true, message: "Please enter discount" }]}
              style={{ flex: 1 }}
            >
              <InputNumber
                min={0}
                max={100}
                step={1}
                precision={0}
                placeholder="0"
                style={{ width: "100%" }}
              />
            </Form.Item>

            {/* Quantity Field */}
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Please enter quantity" }]}
              style={{ flex: 1 }}
            >
              <InputNumber
                min={1}
                step={1}
                precision={0}
                placeholder="0"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={4} placeholder="Product description" />
          </Form.Item>

          <Form.Item label="Upload Image" name="image">
            <Upload
              fileList={[]}
              maxCount={1}
              accept="image/*"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
