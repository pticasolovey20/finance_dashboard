import React from "react";
import Image from "next/image";

const Logo = () => {
  const logo = null;

  return (
    logo && (
      <div className="w-full h-[50px] relative overflow-hidden">
        <Image loading="lazy" src={logo} alt="logo" height={50} />
      </div>
    )
  );
};

export default Logo;
