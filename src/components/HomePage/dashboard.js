"use client"

import { useState, useEffect } from "react"
import { LayoutGrid, FileText, Clock } from "lucide-react"
import { useAnimatedNumber } from "@/hooks/use-animated-number"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCollections: 0,
    totalSubmissions: 0,
    activeCollections: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
        const response = await fetch(`${backendUrl}/api/dashboard-stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setStats(data)
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err)
        setError("Failed to load dashboard data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardStats()
  }, [])

  const animatedTotalCollections = useAnimatedNumber(stats.totalCollections, 1500)
  const animatedTotalSubmissions = useAnimatedNumber(stats.totalSubmissions, 1500)
  const animatedActiveCollections = useAnimatedNumber(stats.activeCollections, 1500)

  const statItems = [
    {
      icon: LayoutGrid,
      title: "Total Collections",
      value: animatedTotalCollections,
      description: "Collections created to date",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: FileText,
      title: "Total Submissions",
      value: animatedTotalSubmissions,
      description: "Slides submitted by students",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Clock,
      title: "Active Collections",
      value: animatedActiveCollections,
      description: "Currently live collections",
      gradient: "from-green-500 to-emerald-500"
    },
  ]

  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Platform </span>
            <span className="gradient-text">Statistics</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Real-time insights into activity and growth
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-effect rounded-2xl p-8 border border-indigo-500/10 animate-pulse">
                <div className="w-14 h-14 bg-slate-700/50 rounded-xl mb-6"></div>
                <div className="h-12 bg-slate-700/50 rounded mb-4"></div>
                <div className="h-5 bg-slate-700/50 rounded mb-2"></div>
                <div className="h-4 bg-slate-700/50 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 glass-effect border border-red-500/20 rounded-2xl">
            <p className="text-red-400 font-medium mb-2">{error}</p>
            <p className="text-red-300/70 text-sm">Please ensure your backend is running</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {statItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div
                  key={index}
                  className="group glass-effect rounded-2xl p-10 border border-indigo-500/10 card-hover hover:border-indigo-500/30 flex flex-col items-center justify-center min-h-[260px]"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-7 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-5xl font-bold text-white mb-3 tabular-nums">
                    {item.value.toLocaleString()}
                  </h3>
                  <p className="text-xl font-semibold text-slate-300 mb-2">{item.title}</p>
                  <p className="text-slate-400 text-base leading-relaxed max-w-xs mx-auto">{item.description}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}