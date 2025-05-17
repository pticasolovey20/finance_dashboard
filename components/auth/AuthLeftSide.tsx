// import Logo from "@/components/Logo";
import Slogan from "@/components/Slogan";

const AuthLeftSide = () => {
  return (
    <div className="max-w-[479px] w-full hidden md:flex flex-col justify-center mr-[52px] z-10">
      {/* <Logo /> */}
      <Slogan />
    </div>
  );
};

export default AuthLeftSide;
