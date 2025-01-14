"use client";
import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // Importing icons for the hamburger menu
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Input } from "./ui/input";
import { DropDown } from "./DropDown";

export const Appbar = () => {
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="shadow-md dark:bg-black ">
      <nav className="flex justify-between items-center px-12  py-4 md:px-64 ">
        <div className="text-xl font-bold ">
          {" "}
          <Link href={"/"}>
            <span>Connectify</span>
          </Link>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {session?.data?.user ? (
            <>
              <Input type="text" placeholder="search" />
              <ThemeToggle />
              <DropDown />
            </>
          ) : (
            <>
              <ThemeToggle />
              <Button className="rounded" variant="outline">
                <Link href="/signin">Login</Link>
              </Button>
              <Button className="rounded" variant="outline">
                <Link href="/signup">Join new</Link>
              </Button>
            </>
          )}
        </div>
        {/* Mobile Menu Button */}
        {!session.data?.user ? (
          <div className="md:hidden flex gap-6">
            <div className="flex justify-center w-full">
              <ThemeToggle />
            </div>
            <button
              onClick={toggleMenu}
              className="text-gray-900 dark:text-white focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="flex gap-2 items-center">
                {isMenuOpen ? (
                  <X
                    size={24}
                    className="transition-transform duration-200 ease-in-out transform scale-100"
                  />
                ) : (
                  <Menu
                    size={24}
                    className="transition-transform duration-200 ease-in-out transform scale-100"
                  />
                )}
              </div>
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-4 justify-center items-center md:hidden lg:hidden">
              <ThemeToggle />
              <DropDown />
            </div>
          </>
        )}
      </nav>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4 transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-2">
            <Button className="w-full rounded" variant="outline">
              <Link href="/signin">Login</Link>
            </Button>
            <Button className="w-full rounded" variant="outline">
              <Link href="/signup">Join new</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
