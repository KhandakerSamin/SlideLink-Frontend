"use client"

import { useState } from "react"
import { Search, Users, ExternalLink, Clock, Mail } from "lucide-react"

export default function SubmissionsList({ submissions }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSubmissions = submissions.filter((submission) =>
    submission.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white rounded-b-2xl shadow-sm border border-gray-100 border-t-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-2xl font-bold mb-2">All Submissions</h2>
            <p className="text-purple-100">View all submitted presentation slides</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
            <input
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full lg:w-64 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-purple-200 px-10 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 mx-auto mb-6 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {submissions.length === 0 ? "No submissions yet" : "No teams match your search"}
            </h3>
            <p className="text-gray-600">
              {submissions.length === 0
                ? "Submissions will appear here once teams start uploading their slides"
                : "Try adjusting your search terms"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission._id}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-6 border border-gray-100 rounded-2xl hover:shadow-md transition-all duration-200 bg-gradient-to-r from-gray-50 to-white"
              >
                <div className="flex-1 mb-4 lg:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {submission.teamName}
                  </h3>
                  {submission.leaderEmail && (
                    <div className="flex items-center text-sm text-blue-600 font-medium mb-2">
                      <Mail className="w-4 h-4 mr-2" />
                      {submission.leaderEmail}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    Submitted {new Date(submission.submittedAt).toLocaleString()}
                  </div>
                </div>
                <a
                  href={submission.slideLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Slides
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
