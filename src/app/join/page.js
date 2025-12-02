"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Lock, Users } from 'lucide-react'

export default function JoinCollectionPage() {
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleJoin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/collections/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: usernameInput,
            password: passwordInput,
          }),
        },
      )
      if (response.ok) {
        router.push(`/collections/${usernameInput}?password=${passwordInput}`) // Redirect with password for auto-login
      } else {
        const data = await response.json()
        setError(data.error || "Invalid collection username or password.")
      }
    } catch (err) {
      setError("Error: Could not connect to the server. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-start justify-center" style={{background: '#0a0f1e'}}>
      <div className="w-full max-w-md px-6">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="glass-effect rounded-2xl border border-indigo-500/10 overflow-hidden">
          <div className="px-8 pt-8 pb-6 border-b border-indigo-500/10 text-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-white mb-2">Join a Collection</h1>
            <p className="text-sm text-slate-400">Enter collection details to get access</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-400 font-medium text-sm">{error}</p>
              </div>
            )}
            <form onSubmit={handleJoin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-200 mb-2">
                  <Users className="w-4 h-4 inline mr-1.5" />
                  Collection Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="e.g., 42E-SE112-2025-CSE"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                  className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
                  <Lock className="w-4 h-4 inline mr-1.5" />
                  Collection Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter collection password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-gradient text-white py-3.5 px-6 rounded-xl font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all text-base shadow-md hover:shadow-indigo-500/30 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Joining...
                  </>
                ) : (
                  "Join Collection"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}