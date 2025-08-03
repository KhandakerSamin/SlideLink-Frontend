'use client';

import Link from "next/link"
import { ArrowRight, Users } from "lucide-react"
import React from 'react';

const gradientKeyframes = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  animation: gradient 8s linear infinite;
}
`;

function GradientText({
  children,
  className = "",
  colors = ["#3b82f6", "#a855f7", "#3b82f6"], // Blue to purple gradient
  animationSpeed = 8,
  showBorder = false
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    animation: `gradient ${animationSpeed}s linear infinite`
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: gradientKeyframes }} />
      <div
        className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-extrabold backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}
      >
        {showBorder && (
          <div
            className="absolute inset-0 bg-cover z-0 pointer-events-none"
            style={gradientStyle}
          >
            <div
              className="absolute inset-0 bg-white rounded-[1.25rem] z-[-1]"
              style={{
                width: "calc(100% - 2px)",
                height: "calc(100% - 2px)",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
              }}
            ></div>
          </div>
        )}
        <div
          className="inline-block relative z-2 text-transparent bg-cover"
          style={{
            ...gradientStyle,
            backgroundClip: "text",
            WebkitBackgroundClip: "text"
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
           <div>
               <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-black"> Share Your Presentation Slides </h1>
          </div>
          <GradientText
            className="text-5xl lg:text-7xl font-extrabold leading-tight pb-5"
            colors={["#3b82f6", "#a855f7", "#3b82f6"]}
            animationSpeed={8}
            showBorder={false}
          >
           Effortlessly
          </GradientText>
          <div>
               <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-black"></h1>
          </div>
          <p className="text-xl lg:text-2xl text-gray-600 font-semibold mb-12 leading-relaxed max-w-3xl mx-auto">
            Transform chaotic Excel sheets into organized slide collections. Perfect for university classes and academic
            collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/create"
              className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-extrabold hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 text-lg"
            >
              <span>Create Collection</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/join"
              className="group border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-extrabold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 text-lg"
            >
              <Users className="w-5 h-5" />
              <span>Join Collection</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}