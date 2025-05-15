import { NAVIGATION } from "@/constants/navigation";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <div className="h-14 flex-[1] flex justify-center">
      <ul className="shrink basis-[600px] flex gap-6">
        {NAVIGATION.map(({ label, href, icon }) => (
          <li key={label}>
            <Link href={href}>
              <Button
                variant="outline"
                className="h-full px-6 rounded-2xl bg-gray-100"
                aria-label="navigation button"
              >
                {icon}
                {label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
