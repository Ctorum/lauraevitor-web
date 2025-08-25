"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Moon, Sun, Menu, X, Lock } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full max-w-[2100px] absolute z-20 px-4 py-6 m-200 h-header">
      <div className="container mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Laura & Vitor"
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link href="/clothing" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary flex items-center">
                FOTOS
              </Link>
            </li>
            <li>
              <Link href="/gifts" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary flex items-center">
                PRESENTES
              </Link>
            </li>
            <li>
              <Link href="/rsvp" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary flex items-center">
                CONFIRMAR PRESENÇA
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 pt-28">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          ></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-t-3xl shadow-xl p-6 h-auto max-h-[80vh] overflow-y-auto mx-4 mt-4 animate-in slide-in-from-bottom duration-300">
            <nav>
              <ul className="space-y-6 py-4">
                <li>
                  <Link href="/pictures" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary flex items-center justify-between text-lg" onClick={toggleMobileMenu}>
                    <span>FOTOS</span>
                  </Link>
                </li>
                <li>
                  <Link href="/gifts" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary flex items-center justify-between text-lg" onClick={toggleMobileMenu}>
                    <span>PRESENTES</span>
                  </Link>
                </li>
                <li>
                  <Link href="/rsvp" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary flex items-center justify-between text-lg" onClick={toggleMobileMenu}>
                    <span>CONFIRMAR PRESENÇA</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
