"use client"

import { Plus, Eye } from "lucide-react"

export default function TabNavigation({ activeTab, setActiveTab, submissionsCount }) {
  return (
    <div className="bg-white rounded-t-2xl shadow-sm border border-gray-100 border-b-0">
      <div className="grid grid-cols-2">
        <button
          onClick={() => setActiveTab("submit")}
          className={`flex items-center justify-center py-4 px-6 font-semibold transition-all duration-200 rounded-tl-2xl ${
            activeTab === "submit" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Plus className="w-5 h-5 mr-2" />
          Submit Slides
        </button>
        <button
          onClick={() => setActiveTab("view")}
          className={`flex items-center justify-center py-4 px-6 font-semibold transition-all duration-200 rounded-tr-2xl ${
            activeTab === "view" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Eye className="w-5 h-5 mr-2" />
          View Submissions ({submissionsCount})
        </button>
      </div>
    </div>
  )
}
