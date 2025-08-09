"use client"

import { useState, useEffect } from "react"
import { LayoutGrid, FileText, Clock } from "lucide-react"
import { useAnimatedNumber } from "@/hooks/use-animated-number" // Import the new hook

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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/dashboard-stats`,
        )
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

  // Use the animated number hook for each stat
  const animatedTotalCollections = useAnimatedNumber(stats.totalCollections, 1500)
  const animatedTotalSubmissions = useAnimatedNumber(stats.totalSubmissions, 1500)
  const animatedActiveCollections = useAnimatedNumber(stats.activeCollections, 1500)

  const statItems = [
    {
      icon: LayoutGrid,
      title: "Total Collections",
      value: animatedTotalCollections,
      description: "Collections created to date",
    },
    {
      icon: FileText,
      title: "Total Submissions",
      value: animatedTotalSubmissions,
      description: "Slides submitted by students",
    },
    {
      icon: Clock,
      title: "Active Collections",
      value: animatedActiveCollections,
      description: "Currently live collections",
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">SlideLink at a Glance</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real-time insights into the platforms activity and impact
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-6"></div>
                <div className="h-10 w-3/4 bg-gray-200 rounded mx-auto mb-3"></div>
                <div className="h-6 w-1/2 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-700 font-medium">{error}</p>
            <p className="text-red-600 text-sm mt-2">Please ensure your backend is running and accessible.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {statItems.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 ease-out"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-5xl font-extrabold text-gray-900 mb-3 tabular-nums">
                    {item.value.toLocaleString()}
                  </h3>
                  <p className="text-xl font-semibold text-gray-700 mb-2">{item.title}</p>
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
