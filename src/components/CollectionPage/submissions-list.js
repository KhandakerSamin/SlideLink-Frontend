"use client"
import { useState, useEffect } from "react"
import { Search, Users, ExternalLink, Clock, Edit, Trash2, Hash, X } from "lucide-react"

export default function SubmissionsList({ submissions: initialSubmissions }) {
  const [submissions, setSubmissions] = useState(initialSubmissions || [])
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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Get username from localStorage or URL params
    const storedUser = localStorage.getItem("username") || ""
    const urlParams = new URLSearchParams(window.location.search)
    const urlUsername = urlParams.get("username") || ""

    const finalUsername = storedUser || urlUsername
    console.log("Username sources:", { storedUser, urlUsername, finalUsername })

    if (finalUsername) {
      setUsername(finalUsername)
    }
  }, [])

  const refreshSubmissions = async () => {
    if (!username) {
      console.log("No username available for refresh")
      return
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
      const url = `${backendUrl}/api/collections/${username}/submissions`
      console.log("Fetching submissions from:", url)

      const res = await fetch(url)

      if (res.ok) {
        const data = await res.json()
        setSubmissions(data.submissions || [])
        console.log("Submissions refreshed:", data.submissions?.length || 0)
      } else {
        console.error("Failed to fetch submissions:", res.status, res.statusText)
      }
    } catch (error) {
      console.error("Error fetching submissions:", error)
    }
  }

  const filteredSubmissions = submissions.filter((submission) =>
    submission.teamName?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteClick = (submissionId) => {
    console.log("Delete clicked for ID:", submissionId)
    setDeleteId(submissionId)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    console.log("Attempting delete with:", { deleteId, username })

    if (!deleteId || !username) {
      console.error("Delete ID or username missing!", { deleteId, username })
      alert("Error: Missing required information for deletion")
      return
    }

    setIsLoading(true)
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
      const url = `${backendUrl}/api/collections/${username}/submissions/${deleteId}`
      console.log("Delete URL:", url)

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.ok) {
        console.log("Submission deleted successfully")
        setIsDeleteModalOpen(false)
        setDeleteId(null)
        await refreshSubmissions()
        alert("Submission deleted successfully!")
      } else {
        const errorData = await res.json()
        console.error("Failed to delete submission:", errorData)
        alert(`Failed to delete: ${errorData.error || "Unknown error"}`)
      }
    } catch (err) {
      console.error("Error deleting submission:", err)
      alert("Network error occurred while deleting")
    } finally {
      setIsLoading(false)
    }
  }

  const openEditModal = (submission) => {
    console.log("Opening edit modal with submission:", submission)

    if (!submission || !submission._id) {
      console.error("Invalid submission data:", submission)
      alert("Error: Invalid submission data")
      return
    }

    const editDataToSet = {
      _id: submission._id.toString(), // Ensure it's a string
      teamName: submission.teamName || "",
      teamSerial: submission.teamSerial || "",
      slideLink: submission.slideLink || "",
    }

    console.log("Setting edit data:", editDataToSet)
    setEditData(editDataToSet)
    setIsEditModalOpen(true)
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    console.log("Update attempt with:", {
      editData,
      username,
      editDataId: editData._id,
      usernameExists: !!username,
    })

    // Validation
    if (!editData._id) {
      console.error("Edit ID missing!", editData)
      alert("Error: Submission ID is missing")
      return
    }

    if (!username) {
      console.error("Username missing!", username)
      alert("Error: Username is missing")
      return
    }

    if (!editData.teamName || !editData.teamSerial || !editData.slideLink) {
      console.error("Required fields missing:", editData)
      alert("Error: Please fill in all required fields")
      return
    }

    setIsLoading(true)
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
      const updateUrl = `${backendUrl}/api/collections/${username}/submissions/${editData._id}`
      console.log("Update URL:", updateUrl)

      const requestBody = {
        teamName: editData.teamName.trim(),
        teamSerial: editData.teamSerial.trim(),
        slideLink: editData.slideLink.trim(),
      }
      console.log("Request body:", requestBody)

      const res = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (res.ok) {
        console.log("Submission updated successfully")
        setIsEditModalOpen(false)
        setEditData({
          _id: "",
          teamName: "",
          teamSerial: "",
          slideLink: "",
        })
        await refreshSubmissions()
        alert("Submission updated successfully!")
      } else {
        const errorData = await res.json()
        console.error("Failed to update submission:", errorData)
        alert(`Failed to update: ${errorData.error || "Unknown error"}`)
      }
    } catch (err) {
      console.error("Error updating submission:", err)
      alert("Network error occurred while updating")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUsernameCheck = () => {
    const storedUser = localStorage.getItem("username")
    console.log("Manual username check:", storedUser)
    if (storedUser && storedUser !== username) {
      setUsername(storedUser)
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
            <p className="text-xs text-purple-200 mt-1">Current username: {username || "Not set"}</p>
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
        <button onClick={handleUsernameCheck} className="mt-2 px-3 py-1 bg-white/20 text-xs rounded hover:bg-white/30">
          Refresh Username
        </button>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-gray-900">Processing...</p>
          </div>
        </div>
      )}

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
                  <div className="flex items-center text-sm font-bold text-purple-600 mb-2">
                    <Hash className="w-4 h-4 mr-1" />
                    {submission.teamSerial}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{submission.teamName}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    Submitted {new Date(submission.submittedAt).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">ID: {submission._id}</div>
                </div>

                {/* Actions */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                  <a
                    href={submission.slideLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    View Slides
                    <ExternalLink className="w-4 h-4 ml-3" />
                  </a>

                  {/* Desktop buttons */}
                  <button
                    onClick={() => openEditModal(submission)}
                    disabled={isLoading}
                    className="hidden md:inline-flex items-center justify-center bg-yellow-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-yellow-600 disabled:opacity-50 transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(submission._id)}
                    disabled={isLoading}
                    className="hidden md:inline-flex items-center justify-center bg-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Mobile buttons */}
                  <div className="flex md:hidden gap-2 w-full">
                    <button
                      onClick={() => openEditModal(submission)}
                      disabled={isLoading}
                      className="flex-1 inline-flex items-center justify-center bg-yellow-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-yellow-600 disabled:opacity-50 transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(submission._id)}
                      disabled={isLoading}
                      className="flex-1 inline-flex items-center justify-center bg-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Confirm Deletion</h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this submission? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Submission Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl text-gray-900 font-bold">Edit Submission</h3>
              <button onClick={() => setIsEditModalOpen(false)} disabled={isLoading} className="disabled:opacity-50">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Debug info */}
            <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
              <p>Edit Data ID: {editData._id}</p>
              <p>Username: {username}</p>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-900 font-medium mb-1">Team Name *</label>
                <input
                  type="text"
                  value={editData.teamName}
                  onChange={(e) => setEditData({ ...editData, teamName: e.target.value })}
                  className="w-full border text-gray-900 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 font-medium mb-1">Team Serial *</label>
                <input
                  type="text"
                  value={editData.teamSerial}
                  onChange={(e) => setEditData({ ...editData, teamSerial: e.target.value })}
                  className="w-full border rounded-lg text-gray-900 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-900 font-medium mb-1">Slide Link *</label>
                <input
                  type="url"
                  value={editData.slideLink}
                  onChange={(e) => setEditData({ ...editData, slideLink: e.target.value })}
                  className="w-full border rounded-lg text-gray-900 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isLoading}
                  className="px-4 py-2 text-red-500 border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
