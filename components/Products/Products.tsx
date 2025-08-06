"use client";

import clientCatchError from "@/utility/clilent-catch-errors";
import fetcher from "@/utility/fetcher";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
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
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import debounce from "lodash/debounce";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [resetForm] = Form.useForm();
  const [editId, setEditId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [product, setProduct] = useState({ data: [], total: 0 });
  const { isLoading, data, error } = useSWR(
    `/api/product?page=${page}&limit=${limit}`,
    fetcher
  );

  const closeModal = () => {
    setOpenModal(false);
    setEditId(null);
    resetForm.resetFields();
  };

  const onSearch = debounce(async (e: any) => {
    try {
      const values = e.target.value.trim();
      const { data } = await axios.get(`/api/product?search=${values}`);
      setProduct(data);
      setPage(1);
    } catch (error) {
      clientCatchError(error);
    }
  }, 500);

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  const createProduct = async (values: any) => {
    try {
      values.image = values.image.file.originFileObj;
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      await axios.post("/api/product", formData);
      mutate(`/api/product?page=${page}&limit=${limit}`);
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

  const handlePagination = (page: number, limit: number) => {
    setPage(page);
    setLimit(limit);
  };

  const editProduct = (item: any) => {
    setEditId(item._id);
    setOpenModal(true);
    resetForm.setFieldsValue(item);
  };

  const deleteProduct = async (id: string, item: any) => {
    try {
      await axios.delete(`/api/product/${id}`);
      mutate(`/api/product?page=${page}&limit=${limit}`);
      message.success(`${item.title} producted is deleted !`);
    } catch (error) {
      clientCatchError(error);
    }
  };
  const updateProduct = async (values: any) => {
    try {
      await axios.put(`/api/product/${editId}`, values);
      setOpenModal(false);
      message.success(` producted is updated !`);
      mutate(`/api/product?page=${page}&limit=${limit}`);
    } catch (error) {
      clientCatchError(error);
    }
  };
  return (
    <div className="flex flex-col gap-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Input
          className="!w-[300px]"
          size="large"
          placeholder="Search product"
          onChange={onSearch}
        />

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
          {product.data.map((item: any, index: number) => (
            <Card
              key={index}
              hoverable
              className="w-full"
              cover={
                <div className="relative w-full h-[220px]">
                  <Image
                    src={item.image}
                    fill
                    priority
                    alt={`product-${index}`}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
              }
              actions={[
                <Tooltip title="Edit" key="edit">
                  <EditOutlined
                    className="text-blue-600"
                    onClick={() => editProduct(item)}
                  />
                </Tooltip>,
                <Tooltip title="Delete" key="delete">
                  <DeleteOutlined
                    className="text-red-500"
                    onClick={() => deleteProduct(item._id, item)}
                  />
                </Tooltip>,
              ]}
            >
              {/* Product Title */}
              <h3 className="text-base font-semibold text-gray-800 truncate mb-1">
                {item.title}
              </h3>

              {/* Price & Discount Section */}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-semibold">
                    Rs
                    {(
                      item.price -
                      (item.price * item.discount) / 100
                    ).toFixed()}
                  </label>
                  <del className="text-gray-600">Rs{item.price}</del>
                  <label className="text-red-600">({item.discount}% OFF)</label>
                </div>

                <div className="mt-2">
                  <Tag>{item.quantity} pcs</Tag>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {/* pagination here  */}
        <div className="flex justify-end">
          <Pagination
            current={page}
            total={product.total}
            defaultPageSize={limit}
            pageSizeOptions={[10, 20, 30, 40, 50]}
            onChange={handlePagination}
          />
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
          onFinish={editId ? updateProduct : createProduct}
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
            <Button
              htmlType="submit"
              type="primary"
              block
              icon={editId ? <UploadOutlined /> : null}
            >
              {editId ? "Update Product" : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
