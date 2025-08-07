"use client";

import ChildrenInterfaces from "@/interfacesTypes/children.interface";
import {
  OrderedListOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Card, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

const UserLayout: FC<ChildrenInterfaces> = ({ children }) => {
  const siderMenu = [
    {
      key: "1",
      icon: <ShoppingCartOutlined />,
      label: <Link href="/userDash/carts">Cart</Link>,
    },
    {
      key: "2",
      icon: <OrderedListOutlined />,
      label: <Link href="/userDash/orders">Orders</Link>,
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: <Link href="/userDash/settings">Settings</Link>,
    },
  ];

  const pathName = usePathname();

  const getCurrentPath = (pathname: String) => {
    const pathArray = pathName.split("/");
    const breadCrums = pathArray.map((item) => ({
      title: item,
    }));
    return breadCrums;
  };

  return (
    <div>
      <Layout className="h-screen">
        <Sider width={270}>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={siderMenu}
            className="h-full"
          />

          <div className="bg-[#7a33bd] p-8 fixed w-[270px] bottom-0 left-0 ">
            <div className="flex items-center gap-4 mb-2">
              <Avatar
                size={"large"}
                className="!w-12 !h-12 bg-orange-500   !text-xl !font-bold"
              >
                R
              </Avatar>
              <div>
                <div className="font-semibold text-white">Rahul Sah</div>
                <div className="text-sm text-gray-200">rahul@mail.com</div>
              </div>
            </div>
            <button className="w-full flex items-center justify-center cursor-pointer  gap-2 bg-[#b094dd]  text-white px-3 py-2 rounded">
              <UserOutlined /> Logout
            </button>
          </div>
        </Sider>

        <Layout>
          <Layout.Content>
            <div className="p-5">
              <Breadcrumb items={getCurrentPath(pathName)} />
            </div>
            <div className="min-h-screen">
              <Card>{children}</Card>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default UserLayout;
