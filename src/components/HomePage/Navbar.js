"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Animate navbar on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes navbar-dropdown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

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

        @keyframes mobile-menu-slide {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes backdrop-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .navbar-animate {
          animation: navbar-dropdown 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .arrow-animate {
          animation: arrow-slide 0.3s ease-out;
        }

        .mobile-menu-animate {
          animation: mobile-menu-slide 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .backdrop-animate {
          animation: backdrop-fade 0.3s ease-out;
        }

        .gradient-border {
          position: relative;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          padding: 1px;
          border-radius: 0.75rem;
        }

        .gradient-border-inner {
          background: white;
          border-radius: 0.75rem;
        }
      `}</style>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? 'navbar-animate' : 'translate-y-[-100%] opacity-0'
      }`}>
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-blue-500/20 blur-xl opacity-30"></div>
        
        <div className="relative bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg shadow-black/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo with enhanced styling */}
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <Image 
                    src="/favicon3.svg" 
                    alt="SlideLink Logo" 
                    width={40} 
                    height={40} 
                    className="relative h-9 w-9 transition-transform duration-300 group-hover:scale-110" 
                  />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  SlideLink
                </span>
              </Link>

              {/* Desktop Navigation with enhanced styling */}
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="#features"
                  className="relative text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 group"
                >
                  <span className="relative z-10">Features</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300 group-hover:w-full"></div>
                </Link>
                <Link
                  href="/contact"
                  className="relative text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 group"
                >
                  <span className="relative z-10">Contact</span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300 group-hover:w-full"></div>
                </Link>
                <Link
                  href="/create"
                  className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold transition-all duration-300 hover:from-blue-500 hover:to-violet-500 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Create Now
                    <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                  </span>
                </Link>
              </div>

              {/* Mobile Menu Button with enhanced styling */}
              <button
                onClick={() => setIsOpen(true)}
                className="md:hidden relative p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:scale-105 group"
              >
                <Menu className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop with animation */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm backdrop-animate" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Mobile menu dropdown */}
          <div className="fixed top-0 left-0 right-0 bg-white shadow-2xl mobile-menu-animate">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-violet-50/50">
              <div className="flex items-center space-x-2">
                <Image 
                  src="/favicon3.svg" 
                  alt="SlideLink Logo" 
                  width={32} 
                  height={32} 
                  className="h-8 w-8" 
                />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  SlideLink
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-6 space-y-4 bg-gradient-to-b from-white to-gray-50/30">
              <Link
                href="#features"
                className="flex items-center justify-between p-4 text-lg text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 rounded-xl hover:bg-blue-50 group"
                onClick={() => setIsOpen(false)}
              >
                <span>Features</span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/contact"
                className="flex items-center justify-between p-4 text-lg text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 rounded-xl hover:bg-violet-50 group"
                onClick={() => setIsOpen(false)}
              >
                <span>Contact</span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-violet-500 transition-all duration-300 group-hover:translate-x-1" />
              </Link>

              <div className="pt-4">
                <Link
                  href="/create"
                  className="relative inline-flex items-center justify-center w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold transition-all duration-300 hover:from-blue-500 hover:to-violet-500 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 group overflow-hidden"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Create Now
                    <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}