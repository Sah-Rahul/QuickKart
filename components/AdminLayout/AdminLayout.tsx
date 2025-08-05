"use client";

import React, { FC } from "react";
import {
  CreditCardOutlined,
  LogoutOutlined,
  ProductOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Breadcrumb, Dropdown, Layout, Menu, theme } from "antd";
import Link from "next/link";
import ChildrenInterfaces from "@/interfacesTypes/children.interface";
import Logo from "../Shared/Logo/Logo";
import { usePathname } from "next/navigation";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const AdminLayout: FC<ChildrenInterfaces> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // get current pathName
  const pathName = usePathname();

  const getCurrentPath = (pathname: String) => {
    const pathArray = pathName.split("/");
    const breadCrums = pathArray.map((item) => ({
      title: item,
    }));
    return breadCrums;
  };

  const siderMenu = [
    {
      key: "1",
      icon: <ShoppingCartOutlined />,
      label: <Link href="/admin/orders">Orders</Link>,
    },
    {
      key: "2",
      icon: <ProductOutlined />,
      label: <Link href="/admin/products">Products</Link>,
    },

    {
      key: "4",
      icon: <UserOutlined />,
      label: <Link href="/admin/users">Users</Link>,
    },
    {
      key: "5",
      icon: <CreditCardOutlined />,
      label: <Link href="/admin/payments">Payments</Link>,
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: <Link href="/admin/settings">Settings</Link>,
    },
  ];

  const userMenu = {
    items: [
      { key: "1", label: "Profile", icon: <UserOutlined /> },
      { key: "2", label: "Logout", icon: <LogoutOutlined /> },
    ],
  };

  return (
    <Layout hasSider>
      <Sider style={siderStyle} width={250}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={siderMenu}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="px-5 flex items-center justify-between">
            <div>
              <Logo />
            </div>
            <div>
              <Dropdown menu={userMenu}>
                <Avatar
                  size="large"
                  src="https://imgs.search.brave.com/lK60KKTmb7rV3I6EAth6Ri1Au2pzFAefknipcqo8Kd0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTIvQXZh/dGFyLVByb2ZpbGUt/UE5HLUltYWdlLUZp/bGUucG5n"
                  style={{ cursor: "pointer" }}
                />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{ margin: "24px 16px 0", overflow: "initial" }}
          className="flex flex-col gap-8"
        >
          <Breadcrumb items={getCurrentPath(pathName)} />
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} Created by Rahul Sah 💖❤
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
