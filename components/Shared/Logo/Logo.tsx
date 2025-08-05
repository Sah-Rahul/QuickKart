import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image
      src="/images/logo.png"
      width={80}
      height={80}
      alt="logo"
      priority
    />
  );
};

export default Logo;
