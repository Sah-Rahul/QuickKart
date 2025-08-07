"use client";

import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import "animate.css";
import Logo from "../AdminLayout/Shared/Logo/Logo";
import Link from "next/link";

const { Title, Text } = Typography;

const Signup = () => {
  const handleLogin = (values: any) => {
    console.log("Success:", values);
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    // Integrate Google Auth here
  };

  return (
    <div className="min-h-screen flex items-center justify-center ml-32 bg-gray-50 px-4">
      <div className="flex w-full max-w-5xl shadow-md bg-white rounded-lg overflow-hidden">
        {/* Left Side Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="/images/login.svg"
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 animate__animated animate__fadeInRight">
          <Title level={3} className="text-center mb-6">
            <Logo />
          </Title>

          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Fullname"
              name="fullname"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input placeholder="Ravi Singh Parihar" />
            </Form.Item>

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
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                className="bg-red-500 hover:bg-red-600"
              >
                Sign up
              </Button>
            </Form.Item>

            <div className="my-4 text-center text-gray-500">or</div>

            <Button
              block
              icon={<GoogleOutlined />}
              onClick={handleGoogleSignup}
              className="border border-gray-300 text-black"
            >
              Sign up with Google
            </Button>

            <p className="text-sm text-center mt-6">
              Already have an account?
              <Link href="/user/login" className="ml-2 text-blue-600">
                Log in
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
