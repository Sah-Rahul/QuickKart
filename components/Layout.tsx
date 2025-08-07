"use client";

import ChildrenInterfaces from "@/interfacesTypes/children.interface";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import React, { FC } from "react";
import "animate.css";
import Logo from "./AdminLayout/Shared/Logo/Logo";
import { usePathname } from "next/navigation";
import { ShoppingOutlined } from "@ant-design/icons";
import Link from "next/link";

const Layout: FC<ChildrenInterfaces> = ({ children }) => {
  const pathName = usePathname();

  const path = ["/admin", "/login", "/signup", "/user"];

  const blockRoutes = path.some((path) => pathName.startsWith(path));

  if (blockRoutes) {
    return <AntdRegistry>{children}</AntdRegistry>;
  }
  return (
    <AntdRegistry>
      <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
        {/* ====== Navbar ====== */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">
              <Link href='/'>
              <Logo />
              </Link>
            </div>

            <nav className="hidden md:flex space-x-6 font-medium">
              <a href="/" className="hover:text-blue-600">
                Home
              </a>
              <a href="/products" className="hover:text-blue-600">
                Products
              </a>
              <a href="/deals" className="hover:text-blue-600">
                Deals
              </a>
              <a href="/contact" className="hover:text-blue-600">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="text-2xl cursor-pointer relative">
                <ShoppingOutlined />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
                  2
                </span>
              </button>
              <Link href={'/user/signup'}>
              <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium">
                Signup
              </button>
              </Link>
            </div>
          </div>
        </header>

        {/* ====== Main Content ====== */}
        <main className="flex-1 max-w-7xl w-ful  px-4 py-8 h-[3000px]">
          {children}
        </main>

        {/* ====== Footer ====== */}
        <footer className="bg-gray-900 text-gray-200 pt-10 pb-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                <Logo />
              </h3>
              <p className="text-sm">
                Your one-stop shop for quality and savings. Explore now.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/products" className="hover:underline">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:underline">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3">Stay Updated</h4>
              <form className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-semibold"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-10">
            © {new Date().getFullYear()} QuickKart. All rights reserved.
          </div>
        </footer>
      </div>
    </AntdRegistry>
  );
};

export default Layout;
