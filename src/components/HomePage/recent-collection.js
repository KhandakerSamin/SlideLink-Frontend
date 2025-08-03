"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink, Trash2, Calendar, Users, BookOpen } from "lucide-react"

export default function RecentCollections() {
  const [collections, setCollections] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRecentCollections()
  }, [])

  const fetchRecentCollections = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/collections/recent`,
      )
      if (response.ok) {
        const data = await response.json()
        setCollections(data.collections || [])
      }
    } catch (error) {
      console.error("Failed to fetch recent collections:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCollection = async (username) => {
    if (!confirm("Are you sure you want to delete this collection?")) return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/collections/${username}`,
        {
          method: "DELETE",
        },
      )
      if (response.ok) {
        setCollections(collections.filter((c) => c.username !== username))
      }
    } catch (error) {
      console.error("Failed to delete collection:", error)
    }
  }

  return (
    <section id="collections" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Recent Collections</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              See whats happening across different classes and departments
            </p>
          </div>
          <Link
            href="/collections"
            className="group inline-flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : collections.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No collections yet</h3>
            <p className="text-gray-600 mb-6">Be the first to create a slide collection for your class</p>
            <Link
              href="/create"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Create First Collection
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <div
                key={collection.username}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
              >
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">{collection.username}</h3>
                        <span className="text-sm text-gray-500">Collection</span>
                      </div>
                    </div>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {collection.submissions?.length || 0}/{collection.teamCount}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="font-medium">
                      {collection.section} • {collection.courseCode}
                    </div>
                    <div className="text-blue-600 font-medium">{collection.semester}</div>
                    <div className="text-xs text-gray-500">{collection.department}</div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(collection.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{collection.teamCount} teams</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      href={`/collections/${collection.username}`}
                      className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View</span>
                    </Link>
                    <button
                      onClick={() => deleteCollection(collection.username)}
                      className="border border-red-200 text-red-600 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
