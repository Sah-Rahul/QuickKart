"use client";

import ChildrenInterfaces from "@/interfacesTypes/children.interface";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React, { FC } from "react";
import 'animate.css';

const Layout: FC<ChildrenInterfaces> = ({ children }) => {
  return <AntdRegistry>{children}</AntdRegistry>;
};

export default Layout;
