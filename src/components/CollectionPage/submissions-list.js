"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Users,
  ExternalLink,
  Clock,
  Mail,
  Edit,
  Trash2,
  Hash,
  X,
} from "lucide-react"

export default function SubmissionsList({ submissions: initialSubmissions }) {
  const [submissions, setSubmissions] = useState(initialSubmissions)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editData, setEditData] = useState({
    _id: "",
    teamName: "",
    teamSerial: "",
    slideLink: "",
  })
  const [username, setUsername] = useState("")

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "")
  }, [])

  const refreshSubmissions = async () => {
    try {
      const res = await fetch(`/api/collections/${username}/submissions`)
      if (res.ok) {
        const data = await res.json()
        setSubmissions(data)
      }
    } catch (error) {
      console.error("Failed to refresh submissions", error)
    }
  }

  const filteredSubmissions = submissions.filter((submission) =>
    submission.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteClick = (submissionId) => {
    setDeleteId(submissionId)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!deleteId) return

    try {
      const res = await fetch(
        `/api/collections/${username}/submissions/${deleteId}`,
        { method: "DELETE" }
      )

      if (res.ok) {
        setIsDeleteModalOpen(false)
        setDeleteId(null)
        await refreshSubmissions()
      } else {
        console.error("Failed to delete submission")
      }
    } catch (err) {
      console.error(err)
    }
  }

  const openEditModal = (submission) => {
    setEditData(submission)
    setIsEditModalOpen(true)
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    if (!editData._id) return

    try {
      const res = await fetch(
        `/api/collections/${username}/submissions/${editData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teamName: editData.teamName,
            teamSerial: editData.teamSerial,
            slideLink: editData.slideLink,
          }),
        }
      )

      if (res.ok) {
        setIsEditModalOpen(false)
        await refreshSubmissions()
      } else {
        console.error("Failed to update submission")
      }
    } catch (err) {
      console.error(err)
    }
  }

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
              {submissions.length === 0
                ? "No submissions yet"
                : "No teams match your search"}
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
                  <div className="flex items-center text-sm font-bold text-purple-600 mb-2">
                    <Hash className="w-4 h-4 mr-1" />
                    {submission.teamSerial}
                  </div>
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

                {/* Actions */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                  <a
                    href={submission.slideLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Slides
                  </a>
                  <button
                    onClick={() => openEditModal(submission)}
                    className="inline-flex items-center bg-yellow-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(submission._id)}
                    className="inline-flex items-center bg-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this submission?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Submission Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-gray-900 font-bold">Edit Submission</h3>
              <button onClick={() => setIsEditModalOpen(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-900 font-medium mb-1">Team Name</label>
                <input
                  type="text"
                  value={editData.teamName}
                  onChange={(e) =>
                    setEditData({ ...editData, teamName: e.target.value })
                  }
                  className="w-full border text-gray-900 rounded-lg px-3 py-2 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 font-medium mb-1">Team Serial</label>
                <input
                  type="text"
                  value={editData.teamSerial}
                  onChange={(e) =>
                    setEditData({ ...editData, teamSerial: e.target.value })
                  }
                  className="w-full border rounded-lg text-gray-900 px-3 py-2 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 font-medium mb-1">Slide Link</label>
                <input
                  type="url"
                  value={editData.slideLink}
                  onChange={(e) =>
                    setEditData({ ...editData, slideLink: e.target.value })
                  }
                  className="w-full border rounded-lg text-gray-900 px-3 py-2 bg-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-red-500 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
