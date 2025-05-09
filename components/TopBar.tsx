import Link from "next/link";

const TopBar = () => {
  return (
    <header className="flex justify-center p-4 py-8">
      <ul className="min-w-[600px] flex gap-6 p-6 border border-black rounded-3xl">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
    </header>
  );
};

export default TopBar;
