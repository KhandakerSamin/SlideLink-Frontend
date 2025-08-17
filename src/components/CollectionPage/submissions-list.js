"use client"
import { useState, useEffect } from "react"
import { Search, Users, ExternalLink, Clock, Edit, Trash2, Hash, X, CheckCircle, AlertCircle } from "lucide-react"

export default function SubmissionsList({ submissions: initialSubmissions, collectionUsername }) {
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

  // Success/Error Modal States
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [modalTitle, setModalTitle] = useState("")

  // Function to get username from multiple sources
  const getUsername = () => {
    if (collectionUsername) {
      return collectionUsername
    }

    const storedUser = localStorage.getItem("username")
    if (storedUser) {
      return storedUser
    }

    const sessionUser = sessionStorage.getItem("username")
    if (sessionUser) {
      return sessionUser
    }

    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/")
      const urlUsername = pathParts[pathParts.length - 1]
      if (urlUsername && urlUsername !== "collection" && urlUsername !== "" && urlUsername !== "submissions") {
        return urlUsername
      }

      const urlParams = new URLSearchParams(window.location.search)
      const paramUsername = urlParams.get("username") || urlParams.get("u")
      if (paramUsername) {
        return paramUsername
      }
    }

    return ""
  }

  useEffect(() => {
    const foundUsername = getUsername()
    setUsername(foundUsername)

    if (foundUsername) {
      localStorage.setItem("username", foundUsername)
    }
  }, [collectionUsername])

  // Success Modal
  const showSuccess = (title, message) => {
    setModalTitle(title)
    setModalMessage(message)
    setShowSuccessModal(true)
  }

  // Error Modal
  const showError = (title, message) => {
    setModalTitle(title)
    setModalMessage(message)
    setShowErrorModal(true)
  }

  const refreshSubmissions = async () => {
    const currentUsername = username || getUsername()

    if (!currentUsername) {
      showError("Error", "No username found. Please make sure you're accessing this page correctly.")
      return
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
      const url = `${backendUrl}/api/collections/${currentUsername}/submissions`

      const res = await fetch(url)

      if (res.ok) {
        const data = await res.json()
        setSubmissions(data.submissions || [])
      } else {
        showError("Error", `Failed to fetch submissions: ${res.status}`)
      }
    } catch (error) {
      showError("Network Error", "Unable to fetch submissions. Please check your connection.")
    }
  }

  const filteredSubmissions = submissions.filter((submission) =>
    submission.teamName?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteClick = (submissionId) => {
    const currentUsername = username || getUsername()
    if (!currentUsername) {
      showError("Error", "Username not found. Please refresh the page.")
      return
    }

    if (!username && currentUsername) {
      setUsername(currentUsername)
    }

    setDeleteId(submissionId)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    const currentUsername = username || getUsername()

    if (!deleteId) {
      showError("Error", "Submission ID is missing")
      return
    }

    if (!currentUsername) {
      showError("Error", "Username is missing. Please refresh the page and try again.")
      return
    }

    setIsLoading(true)
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
      const url = `${backendUrl}/api/collections/${currentUsername}/submissions/${deleteId}`

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.ok) {
        setIsDeleteModalOpen(false)
        setDeleteId(null)
        await refreshSubmissions()
        showSuccess("Success!", "Submission has been deleted successfully.")
      } else {
        const errorData = await res.json()
        showError("Delete Failed", errorData.error || "Unable to delete submission. Please try again.")
      }
    } catch (err) {
      showError("Network Error", "Unable to delete submission. Please check your connection.")
    } finally {
      setIsLoading(false)
    }
  }

  const openEditModal = (submission) => {
    const currentUsername = username || getUsername()
    if (!currentUsername) {
      showError("Error", "Username not found. Please refresh the page.")
      return
    }

    if (!username && currentUsername) {
      setUsername(currentUsername)
    }

    if (!submission || !submission._id) {
      showError("Error", "Invalid submission data")
      return
    }

    const editDataToSet = {
      _id: submission._id.toString(),
      teamName: submission.teamName || "",
      teamSerial: submission.teamSerial || "",
      slideLink: submission.slideLink || "",
    }

    setEditData(editDataToSet)
    setIsEditModalOpen(true)
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    const currentUsername = username || getUsername()

    if (!editData._id) {
      showError("Error", "Submission ID is missing")
      return
    }

    if (!currentUsername) {
      showError("Error", "Username is missing. Please refresh the page and try again.")
      return
    }

    if (!editData.teamName || !editData.teamSerial || !editData.slideLink) {
      showError("Validation Error", "Please fill in all required fields")
      return
    }

    setIsLoading(true)
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
      const updateUrl = `${backendUrl}/api/collections/${currentUsername}/submissions/${editData._id}`

      const requestBody = {
        teamName: editData.teamName.trim(),
        teamSerial: editData.teamSerial.trim(),
        slideLink: editData.slideLink.trim(),
      }

      const res = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (res.ok) {
        setIsEditModalOpen(false)
        setEditData({
          _id: "",
          teamName: "",
          teamSerial: "",
          slideLink: "",
        })
        await refreshSubmissions()
        showSuccess("Success!", "Submission has been updated successfully.")
      } else {
        const errorData = await res.json()
        showError("Update Failed", errorData.error || "Unable to update submission. Please try again.")
      }
    } catch (err) {
      showError("Network Error", "Unable to update submission. Please check your connection.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-b-2xl shadow-sm border border-gray-100 border-t-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-violet-500 text-white p-8 py-10">
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

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              <p className="text-gray-900 font-medium">Processing...</p>
            </div>
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
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Delete Submission</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this submission? All data will be permanently removed.
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
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <Edit className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-xl text-gray-900 font-bold">Edit Submission</h3>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} disabled={isLoading} className="disabled:opacity-50">
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-900 font-medium mb-1">Team Name *</label>
                <input
                  type="text"
                  value={editData.teamName}
                  onChange={(e) => setEditData({ ...editData, teamName: e.target.value })}
                  className="w-full border text-gray-900 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                  className="w-full border rounded-lg text-gray-900 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                  className="w-full border rounded-lg text-gray-900 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isLoading}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
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

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{modalTitle}</h3>
              <p className="text-gray-600 mb-6">{modalMessage}</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{modalTitle}</h3>
              <p className="text-gray-600 mb-6">{modalMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
