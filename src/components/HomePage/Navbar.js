"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className=" border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">SL</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">SlideLink</span> */}
              <Image
                src="/logo.png"
                alt="SlideLink Logo"
                width={80}
                height={40}
                className="w-35 h-10 rounded-xl"
              />

            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">

              <Link
                href="#features"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Features
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Contact
              </Link>
              <Link
                href="/create"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Create Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slider Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <span className="text-xl font-bold text-gray-900">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <Link
                href="/collections"
                className="block text-lg text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="#features"
                className="block text-lg text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/contact"
                className="block text-lg text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/create"
                className="block bg-blue-600 text-white px-6 py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
                onClick={() => setIsOpen(false)}
              >
                Create Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
