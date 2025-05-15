import Image from "next/image";

const Logo = () => {
  const logo = null;

  return (
    logo && (
      <div className="w-full h-[50px] relative overflow-hidden">
        <Image src={logo} alt="logo" height={50} priority />
      </div>
    )
  );
};

export default Logo;
