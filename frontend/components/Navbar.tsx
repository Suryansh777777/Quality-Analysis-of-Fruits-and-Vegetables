import React, { useState } from "react";
import {
  Menu,
  X,
  Apple,
  Settings,
  Bell,
  Search,
  User,
  BarChart2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href={"/"}>
                <Apple className="h-8 w-8 text-blue-500" />
              </Link>
            </div>
            <div className="hidden md:block ml-4">
              <div className="flex items-baseline space-x-4">
                <span className="text-white font-bold">Fruit Quality </span>
                <a
                  href="/dashboard"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Analytics
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Reports
                </a>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs ml-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search batches..."
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white"
            >
              <BarChart2 className="h-5 w-5" />
            </Button>

            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-gray-300 hover:text-white"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-gray-900" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-gray-800 border-gray-700 text-gray-300">
                <DropdownMenuItem>
                  New quality alert for Batch #APL-2024-001
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Temperature threshold exceeded
                </DropdownMenuItem>
                <DropdownMenuItem>Weekly report ready</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white"
            >
              <Settings className="h-5 w-5" />
            </Button>

            <div className="border-l border-gray-700 h-6 mx-2" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-gray-300">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-700"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Analytics
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Reports
            </a>
            <div className="relative mt-3 px-3">
              <div className="absolute inset-y-0 left-3 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-300 placeholder-gray-400"
                placeholder="Search batches..."
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
