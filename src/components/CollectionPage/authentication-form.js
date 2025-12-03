"use client"

import Link from "next/link"
import { ArrowLeft, Lock, Shield } from "lucide-react"

export default function AuthenticationForm({ username, passwordInput, setPasswordInput, onAuthenticate }) {
  return (
    <div className="min-h-screen relative dark-sphere-bg">
      {/* Background overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: '#020617',
          backgroundImage: `linear-gradient(to right, rgba(71,85,105,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(71,85,105,0.25) 1px, transparent 1px)`,
          backgroundSize: '36px 36px, 36px 36px',
        }}
      />

      <div className="max-w-md mx-auto px-6 py-20 relative z-10">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center text-slate-300 hover:text-white font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="glass-effect rounded-2xl border border-indigo-500/10 overflow-hidden shadow-xl">
          <div className="px-8 pt-8 pb-6 border-b border-indigo-500/10 text-center bg-gradient-to-r from-trueGray-900/30 to-transparent">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-white mb-2">Access Required</h1>
            <p className="text-sm text-slate-300 mb-4">Enter the password to access the collection</p>
            <div className="mt-2 bg-white/5 rounded-xl p-3">
              <p className="font-mono text-sm text-slate-200 truncate">{username}</p>
            </div>
          </div>

          <div className="p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                onAuthenticate()
              }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
                  <Lock className="w-4 h-4 inline mr-2 text-slate-200" />
                  Collection Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter collection password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full btn-gradient text-white py-3.5 px-6 rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                Access Collection
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}