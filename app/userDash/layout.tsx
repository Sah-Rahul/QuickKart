import UserLayout from "@/components/userDash/UserLayout.tsx/UserLayout";
import ChildrenInterfaces from "@/interfacesTypes/children.interface";
import React, { FC } from "react";

const UserLayoutRouter: FC<ChildrenInterfaces> = ({ children }) => {
  return <UserLayout>{children}</UserLayout>;
};

export default UserLayoutRouter;
