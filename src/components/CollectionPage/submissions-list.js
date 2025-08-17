"use client"

import { useState } from "react"
import { ExternalLink, Calendar, User, Hash, Search, Filter, Download, Award } from "lucide-react"

export default function SubmissionsListDashboard({ submissions }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  const filteredSubmissions = submissions
    .filter(
      (submission) =>
        submission.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.teamSerial.toString().includes(searchTerm) ||
        (submission.leaderEmail && submission.leaderEmail.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.submittedAt) - new Date(a.submittedAt)
        case "oldest":
          return new Date(a.submittedAt) - new Date(b.submittedAt)
        case "teamName":
          return a.teamName.localeCompare(b.teamName)
        case "teamSerial":
          return Number.parseInt(a.teamSerial) - Number.parseInt(b.teamSerial)
        default:
          return 0
      }
    })

  if (submissions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Award className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Submissions Yet</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Teams havent started submitting their slides yet. Check back later or encourage teams to submit their work.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams, serials, or emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="teamName">Team Name</option>
                <option value="teamSerial">Team Serial</option>
              </select>
            </div>

            <button className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-xl hover:from-blue-600 hover:to-violet-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredSubmissions.map((submission, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group hover:border-blue-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                      {submission.teamName}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Hash className="w-4 h-4" />
                        <span>Serial: {submission.teamSerial}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-violet-100 text-blue-700 rounded-full text-xs font-medium">
                      Submitted
                    </span>
                  </div>
                </div>

                {submission.leaderEmail && (
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{submission.leaderEmail}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href={submission.slideLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-xl hover:from-blue-600 hover:to-violet-600 transition-all duration-200 group/link transform hover:scale-105 shadow-lg"
                >
                  <span className="text-sm font-medium">View Slides</span>
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSubmissions.length === 0 && searchTerm && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Results Found</h3>
          <p className="text-gray-600">No submissions match your search criteria. Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  )
}
