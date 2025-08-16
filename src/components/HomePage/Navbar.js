"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <style jsx>{`
        @keyframes arrow-slide {
          0% {
            transform: translateX(-8px);
            opacity: 0;
          }
          100% {
            transform: translateX(0px);
            opacity: 1;
          }
        }

        .arrow-animate {
          animation: arrow-slide 0.3s ease-out;
        }
      `}</style>

      <nav className=" border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-1.5">
              <Image src="/favicon3.svg" alt="SlideLink Logo" width={40} height={40} className="h-8 w-8" />

              <span className="text-2xl font-bold text-gray-900">SlideLink</span>
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
                className="relative inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium transition-all duration-300 hover:from-blue-500 hover:to-violet-500 hover:shadow-lg group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Create Now
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:arrow-animate" />
                </span>
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
          <div className="fixed inset-0 bg-white/20 backdrop-blur-md" onClick={() => setIsOpen(false)} />
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
                className="relative inline-flex items-center justify-center w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium transition-all duration-300 hover:from-blue-500 hover:to-violet-500 hover:shadow-lg group overflow-hidden"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Create Now
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:arrow-animate" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
