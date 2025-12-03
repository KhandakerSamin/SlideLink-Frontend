"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink, Trash2, Calendar, Users, BookOpen } from 'lucide-react'

export default function RecentCollections() {
  const [collections, setCollections] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRecentCollections()
  }, [])

  const fetchRecentCollections = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
      const response = await fetch(`${backendUrl}/api/collections/recent`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        setCollections(data.collections || []) // Expects { collections: [...] }
      } else {
        console.error("Failed to fetch recent collections:", response.status, response.statusText)
        // Optionally set an error state to display to the user
      }
    } catch (error) {
      console.error("Error fetching recent collections:", error)
      // Optionally set an error state to display to the user
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCollection = async (username) => {
    if (!confirm("Are you sure you want to delete this collection? All submissions will be permanently removed.")) return

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
      const response = await fetch(`${backendUrl}/api/collections/${username}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        setCollections(collections.filter((c) => c.username !== username))
        alert("Collection deleted successfully!")
      } else {
        const errorData = await response.json().catch(() => ({ error: "Failed to delete" }))
        alert(`Failed to delete collection: ${errorData.error || 'Unknown error'}`)
        console.error("Failed to delete collection:", response.status, response.statusText)
      }
    } catch (error) {
      alert("Network error: Unable to delete collection. Please check your connection.")
      console.error("Failed to delete collection:", error)
    }
  }

  return (
    <section id="collections" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Recent </span>
            <span className="text-white">Collections</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explore active collections across different classes
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-effect rounded-2xl p-6 border border-indigo-500/10 animate-pulse">
                <div className="h-6 bg-slate-700/50 rounded mb-4"></div>
                <div className="h-4 bg-slate-700/50 rounded mb-2"></div>
                <div className="h-4 bg-slate-700/50 rounded mb-4"></div>
                <div className="h-10 bg-slate-700/50 rounded"></div>
              </div>
            ))}
          </div>
        ) : collections.length === 0 ? (
          <div className="text-center py-20 glass-effect rounded-2xl border border-indigo-500/10">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">No collections yet</h3>
            <p className="text-slate-400 mb-8">Be the first to create a collection</p>
            <Link
              href="/create"
              className="inline-flex items-center btn-gradient px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-indigo-500/30 transition-all text-white min-w-[200px] justify-center"
            >
              Create Collection
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <div
                key={collection.username}
                className="glass-effect rounded-2xl p-6 border border-indigo-500/10 card-hover hover:border-indigo-500/30 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white leading-tight">{collection.username}</h3>
                      <span className="text-xs text-slate-500">Collection</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20">
                    {collection.submissions?.length || 0}/{collection.teamCount}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-5 text-sm">
                  <div className="text-slate-300 font-medium">
                    {collection.section} • {collection.courseCode}
                  </div>
                  <div className="text-cyan-400 font-medium">{collection.semester}</div>
                  <div className="text-xs text-slate-500">{collection.department}</div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-5 pb-5 border-b border-indigo-500/10">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(collection.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{collection.teamCount} teams</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    href={`/collections/${collection.username}`}
                    className="flex-1 btn-gradient px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 text-sm text-white"
                  >
                    <span>View</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => deleteCollection(collection.username)}
                    className="px-4 py-3 rounded-xl glass-effect border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
    </section>
  )
}
