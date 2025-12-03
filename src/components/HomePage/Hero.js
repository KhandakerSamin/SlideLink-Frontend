"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Shield, Check } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px] animate-float" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect border border-indigo-500/20 mb-8 animate-fade-in">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-slate-300">Modern Presentation Management</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight animate-fade-in-up delay-100">
          <span className="block text-white mb-2">Organize Your</span>
          <span className="gradient-text">Slide Collections</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-200">
          Create secure, password-protected collections for class presentations.
          <br className="hidden sm:block" />
          Simple submission management for students and instructors.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
          <Link
            href="/create"
            className="group btn-gradient px-8 py-4 rounded-xl font-semibold text-white hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 flex items-center gap-2 min-w-[200px] justify-center"
          >
            Create Collection
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/join"
            className="group px-8 py-4 glass-effect rounded-xl font-semibold text-slate-200 hover:border-indigo-500/30 transition-all duration-300 border border-slate-700/50 min-w-[200px] hover:bg-slate-800/50"
          >
            Join Collection
          </Link>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up delay-400">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-effect border border-slate-700/50">
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-slate-300">No Registration</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-effect border border-slate-700/50">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-slate-300">Instant Setup</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-effect border border-slate-700/50">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-slate-300">Secure Access</span>
          </div>
        </div>
      </div>

      
    </section>
  )
}