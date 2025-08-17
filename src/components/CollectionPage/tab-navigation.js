"use client"

import { Plus, Eye } from "lucide-react"

export default function TabNavigation({ activeTab, setActiveTab, submissionsCount }) {
  return (
    <div className="bg-white rounded-t-2xl shadow-lg border border-gray-100 border-b-0 overflow-hidden">
      <div className="grid grid-cols-2">
        <button
          onClick={() => setActiveTab("submit")}
          className={`flex items-center justify-center py-5 px-6 font-semibold transition-all duration-300 rounded-tl-2xl relative ${
            activeTab === "submit"
              ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg transform scale-105"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          <Plus className="w-5 h-5 mr-2" />
          Submit Slides
          {activeTab === "submit" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"></div>}
        </button>
        <button
          onClick={() => setActiveTab("view")}
          className={`flex items-center justify-center py-5 px-6 font-semibold transition-all duration-300 rounded-tr-2xl relative ${
            activeTab === "view"
              ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg transform scale-105"
              : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          <Eye className="w-5 h-5 mr-2" />
          View Submissions ({submissionsCount})
          {activeTab === "view" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"></div>}
        </button>
      </div>
    </div>
  )
}
