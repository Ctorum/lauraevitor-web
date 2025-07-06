"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Moon, Sun, Menu, X, Lock } from "lucide-react"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="w-full absolute top-0 left-0 z-20 px-4 py-6 m-200">
      <div className="container mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-6 py-4 flex justify-between items-center shadow-lg">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Laura & Vitor" width={40} height={40} className="h-10 w-10" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-400 dark:text-gray-500 flex items-center cursor-not-allowed opacity-70">
                      PÁGINAS <Lock className="ml-1 h-3 w-3" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Em breve disponível</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-400 dark:text-gray-500 flex items-center cursor-not-allowed opacity-70">
                      PRESENTES <Lock className="ml-1 h-3 w-3" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Em breve disponível</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-400 dark:text-gray-500 flex items-center cursor-not-allowed opacity-70">
                      CONFIRMAR PRESENÇA <Lock className="ml-1 h-3 w-3" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Em breve disponível</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
            {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 pt-28">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleMobileMenu}></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-t-3xl shadow-xl p-6 h-auto max-h-[80vh] overflow-y-auto mx-4 mt-4 animate-in slide-in-from-bottom duration-300">
            <nav>
              <ul className="space-y-6 py-4">
                <li>
                  <span className="text-gray-400 dark:text-gray-500 flex items-center justify-between text-lg cursor-not-allowed opacity-70">
                    <span>PÁGINAS</span>
                    <Lock className="h-4 w-4" />
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 dark:text-gray-500 flex items-center justify-between text-lg cursor-not-allowed opacity-70">
                    <span>PRESENTES</span>
                    <Lock className="h-4 w-4" />
                  </span>
                </li>
                <li>
                  <span className="text-gray-400 dark:text-gray-500 flex items-center justify-between text-lg cursor-not-allowed opacity-70">
                    <span>CONFIRMAR PRESENÇA</span>
                    <Lock className="h-4 w-4" />
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
