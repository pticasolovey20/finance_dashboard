import { Switch } from "@/components/ui/switch";

const ThemeSwitcher = () => {
  return (
    <div className="flex items-center gap-4">
      <span>Dark</span>
      <Switch />
      <span>Light</span>
    </div>
  );
};

export default ThemeSwitcher;
