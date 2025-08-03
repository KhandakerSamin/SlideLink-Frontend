"use client"

import Link from "next/link"
import { ArrowLeft, Lock, Shield } from "lucide-react"

export default function AuthenticationForm({ username, passwordInput, setPasswordInput, onAuthenticate }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Access Required</h1>
            <p className="text-blue-100 leading-relaxed">Enter the password to access collection</p>
            <div className="mt-4 bg-white/10 rounded-xl p-3">
              <p className="font-mono text-sm text-blue-100">{username}</p>
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
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-3">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Collection Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter collection password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 text-lg"
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