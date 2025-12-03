"use client"

import { Plus, Eye } from "lucide-react"

export default function TabNavigation({ activeTab, setActiveTab, submissionsCount }) {
  return (
    <div className="glass-effect rounded-t-2xl border border-indigo-500/10 overflow-hidden">
      <div className="grid grid-cols-2">
        <button
          onClick={() => setActiveTab("submit")}
          className={`flex items-center justify-center py-4 px-6 font-semibold transition-all duration-300 ${
            activeTab === "submit"
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-102"
              : "text-slate-200 hover:text-white hover:bg-slate-800/40"
          }`}
        >
          <Plus className="w-5 h-5 mr-2 text-current" />
          Submit Slides
        </button>
        <button
          onClick={() => setActiveTab("view")}
          className={`flex items-center justify-center py-4 px-6 font-semibold transition-all duration-300 ${
            activeTab === "view"
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-102"
              : "text-slate-200 hover:text-white hover:bg-slate-800/40"
          }`}
        >
          <Eye className="w-5 h-5 mr-2 text-current" />
          View Submissions ({submissionsCount})
        </button>
      </div>
    </div>
  )
}
