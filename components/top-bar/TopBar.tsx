import Logo from "@/components/top-bar/Logo";
import Navigation from "@/components/top-bar/Navigation";
import UserAvatar from "@/components/top-bar/UserAvatar";

const TopBar = () => {
  return (
    <header className="flex items-center gap-10 p-8">
      <Logo />
      <Navigation />
      <UserAvatar />
    </header>
  );
};

export default TopBar;
