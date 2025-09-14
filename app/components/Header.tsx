import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-950 shadow-sm w-full">
      <div className="px-6 py-4 flex justify-around items-center space-x-10 h-24">
        <Image
          src="/logo-f2c5898a3a81380ec22211262917accf.png"
          alt="Logo"
          height={50}
          width={120}
        />
        <nav className="hidden md:flex space-x-8 text-gray-600 dark:text-gray-300 font-medium">
          {["About us", "Products", "Ventures", "News"].map((item) => (
            <Link
              key={item}
              href="#"
              className="hover:text-green-400 font-semibold text-lg"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}