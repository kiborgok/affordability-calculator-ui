import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Fin Africa. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="#" className="hover:text-green-600">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-green-600">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}