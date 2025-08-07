"use client";

import { GoogleOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import React from "react";

const Login = () => {
  //   const [form] = Form.useForm();

  const loginHandle = (values: any) => {
    console.log("Login Values:", values);
  };

  return (
    <div className="ml-32 min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className=" bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Log in</h2>
          <Form
            // form={form}
            layout="vertical"
            onFinish={loginHandle}
            className="space-y-4"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="email@example.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="bg-blue-600 hover:bg-blue-700"
              >
                Log in
              </Button>
            </Form.Item>
            <div className="my-4 text-center text-gray-500">or</div>

            <Button
              block
              icon={<GoogleOutlined />}
              className="border border-gray-300 text-black"
            >
              Sign up with Google
            </Button>
          </Form>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link href="/user/signup" className="ml-2 text-blue-600">
              Sign up
            </Link>
          </p>
        </div>

        {/* Illustration */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/images/login.svg"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
