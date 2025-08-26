"use client"

import Link from "next/link"
import { ArrowRight, Users } from "lucide-react"
import { useEffect, useState } from "react"

const gradientKeyframes = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  animation: gradient 8s linear infinite;
}

@keyframes hero-fade-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-fade-up-delay {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-animate {
  animation: hero-fade-up 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
}

.hero-animate-delay {
  animation: hero-fade-up-delay 1s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
}

.hero-animate-delay-2 {
  animation: hero-fade-up-delay 1s cubic-bezier(0.4, 0, 0.2, 1) 0.9s both;
}
`

function GradientText({
  children,
  className = "",
  colors = ["#3b82f6", "#a855f7", "#3b82f6"], // Blue to purple gradient
  animationSpeed = 8,
  showBorder = false,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    animation: `gradient ${animationSpeed}s linear infinite`,
  }

  return (
    <div
      className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-extrabold backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}
    >
      {showBorder && (
        <div className="absolute inset-0 bg-cover z-0 pointer-events-none" style={gradientStyle}>
          <div
            className="absolute inset-0 bg-white rounded-[1.25rem] z-[-1]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      )}
      <div
        className="inline-block relative z-2 text-transparent bg-cover"
        style={{
          ...gradientStyle,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations after navbar animation completes
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: gradientKeyframes }} />
      
      {/* Hero Section with proper navbar spacing */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient and subtle patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-violet-50/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-violet-100/20"></div>
        
        {/* Floating background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-violet-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Main Heading */}
            <div className={`mb-4 ${isVisible ? 'hero-animate' : 'opacity-0'}`}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
                <span className="text-gray-900 block mb-2">
                  Share Your Presentation Slides
                </span>
                <GradientText
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight"
                  colors={["#3b82f6", "#a855f7", "#ec4899", "#3b82f6"]}
                  animationSpeed={6}
                  showBorder={false}
                >
                  Effortlessly
                </GradientText>
              </h1>
            </div>

            {/* Subtitle */}
            <div className={`mb-12 ${isVisible ? 'hero-animate-delay' : 'opacity-0'}`}>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto">
                Transform chaotic Excel sheets into organized slide collections. Perfect for university classes and academic collaboration.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center ${isVisible ? 'hero-animate-delay-2' : 'opacity-0'}`}>
              <Link
                href="/create"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 text-lg hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Create Collection</span>
                <ArrowRight className="relative z-10 w-5 h-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
              </Link>
              
              <Link
                href="/join"
                className="group relative border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50/80 transition-all duration-300 flex items-center space-x-2 text-lg backdrop-blur-sm hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto justify-center"
              >
                <Users className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                <span>Join Collection</span>
              </Link>
            </div>

            {/* Trust indicators or additional info */}
            <div className={`mt-16 pt-8 border-t border-gray-200/50 ${isVisible ? 'hero-animate-delay-2' : 'opacity-0'}`}>
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <span>No registration required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <span>Instant sharing</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div> */}
      </section>
    </>
  )
}