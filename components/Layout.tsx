"use client";

import childrenInterfaces from "@/interFaces/childrenInterfaces";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { FC } from "react";
import 'animate.css';

const Layout: FC<childrenInterfaces> = ({ children }) => {
  return <AntdRegistry>{children}</AntdRegistry>;
};

export default Layout;
