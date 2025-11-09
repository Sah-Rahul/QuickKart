import AdminLayout from "@/components/admin/AdminLayout";
import childrenInterfaces from "@/interFaces/childrenInterfaces";
import React, { FC } from "react";

const AdminLayoutRouter: FC< childrenInterfaces > = ({ children }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminLayoutRouter;
