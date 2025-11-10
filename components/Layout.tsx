"use client";

import childrenInterfaces from "@/interFaces/childrenInterfaces";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { FC } from "react";
import 'animate.css';
import '@ant-design/v5-patch-for-react-19';

const Layout: FC<childrenInterfaces> = ({ children }) => {
  return <AntdRegistry>{children}</AntdRegistry>;
};

export default Layout;
