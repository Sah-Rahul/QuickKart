"use client";

import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Tag,
  Tooltip,
  Upload,
} from "antd";
import Image from "next/image";
import { useState } from "react";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
  };

  const onSearch = (values: any) => {
    console.log("Searching for:", values);
  };

  const createProduct = (values: any) =>{
    console.log(values)
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <Card
              key={index}
              hoverable
              className="w-full"
              cover={
                <div className="relative w-full h-[220px]">
                  <Image
                    src="/images/product.webp"
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
                SGkdkjs
              </h3>

              {/* Price & Discount Section */}
              <div>
                <div className="flex items-center  justify-between">
                  <span className="text-lg font-bold text-green-600">
                    Rs 545
                  </span>
                  <span className="text-sm line-through text-gray-500">
                    Rs 55654
                  </span>
                  <span className="text-xs font-semibold  px-2 py-[2px] rounded">
                    25% OFF
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

      {/* modal here  */}
      <Modal
        title="Add New Product"
        open={openModal}
        onCancel={closeModal}
        footer={null}
        centered
        maskClosable={false}
      >
        <Form layout="vertical" size="large" onFinish={createProduct}>
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <div style={{ display: "flex", gap: 16 }}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter price" }]}
              style={{ flex: 1 }}
            >
              <InputNumber
                min={0}
                placeholder="0.00"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item label="Discount (%)" name="discount" style={{ flex: 1 }}>
              <InputNumber
                min={0}
                max={100}
                placeholder="0"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Please enter quantity" }]}
              style={{ flex: 1 }}
            >
              <InputNumber min={1} placeholder="0" style={{ width: "100%" }} />
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
