import { NAVIGATION } from "@/constants/navigation";

import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex-[1] flex justify-center">
      <ul className="shrink basis-[600px] flex gap-6">
        {NAVIGATION.map(({ label, href, icon }) => (
          <li key={label}>
            <Link
              href={href}
              aria-label="navigation button"
              className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gray-200"
            >
              {icon}
              <span className="text-lg">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
