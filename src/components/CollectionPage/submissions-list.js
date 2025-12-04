"use client"
import { useState, useEffect } from "react"
import {
  Search,
  Users,
  ExternalLink,
  Clock,
  Edit,
  Trash2,
  Hash,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export default function SubmissionsList({ submissions: initialSubmissions, collectionUsername, onSubmissionsChange }) {
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

  const getUsername = () => {
    if (collectionUsername) {
      return collectionUsername
    }

    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/").filter(Boolean)
      
      const collectionsIndex = pathParts.indexOf("collections")
      if (collectionsIndex !== -1 && pathParts[collectionsIndex + 1]) {
        return pathParts[collectionsIndex + 1]
      }

      const collectionIndex = pathParts.indexOf("collection")
      if (collectionIndex !== -1 && pathParts[collectionIndex + 1]) {
        return pathParts[collectionIndex + 1]
      }

      const submissionsIndex = pathParts.indexOf("submissions")
      if (submissionsIndex !== -1 && submissionsIndex > 0) {
        const potentialUsername = pathParts[submissionsIndex - 1]
        if (potentialUsername !== "collections" && potentialUsername !== "collection") {
          return potentialUsername
        }
      }

      if (submissionsIndex !== -1 && pathParts[submissionsIndex + 1]) {
        return pathParts[submissionsIndex + 1]
      }

      if (pathParts.length === 1 && pathParts[0] && pathParts[0] !== "collections" && pathParts[0] !== "collection") {
        return pathParts[0]
      }

      if (pathParts.length >= 2 && pathParts[0] && pathParts[0] !== "collections" && pathParts[0] !== "collection") {
        return pathParts[0]
      }

      const urlParams = new URLSearchParams(window.location.search)
      const paramUsername = urlParams.get("username") || urlParams.get("u") || urlParams.get("collection")
      if (paramUsername) {
        return paramUsername
      }
    }

    return ""
  }

  useEffect(() => {
    const foundUsername = getUsername()
    setUsername(foundUsername)
    
    if (foundUsername && (!initialSubmissions || initialSubmissions.length === 0)) {
      refreshSubmissions(foundUsername)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionUsername, initialSubmissions])

  useEffect(() => {
    setSubmissions(initialSubmissions || [])
  }, [initialSubmissions])

  const showSuccess = (title, message) => {
    setModalTitle(title)
    setModalMessage(message)
    setShowSuccessModal(true)
  }

  const showError = (title, message) => {
    setModalTitle(title)
    setModalMessage(message)
    setShowErrorModal(true)
  }

  const refreshSubmissions = async (usernameParam = null) => {
    const currentUsername = usernameParam || username || getUsername()

    if (!currentUsername) {
      showError("Error", "No username found. Please make sure you're accessing this page correctly.")
      return
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
      const url = `${backendUrl}/api/collections/${currentUsername}/submissions`

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (res.ok) {
        const data = await res.json()
        setSubmissions(data.submissions || [])
      } else {
        const errorText = await res.text()
        showError("Error", `Failed to fetch submissions: ${res.status} - ${errorText}`)
      }
    } catch (error) {
      showError("Network Error", "Unable to fetch submissions. Please check your connection.")
    }
  }

  const filteredSubmissions = submissions.filter((submission) =>
    submission.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.teamSerial?.toString().includes(searchTerm)
  )

  const handleDeleteClick = (submissionId) => {
    const currentUsername = username || getUsername()
    
    if (!currentUsername) {
      showError("Error", "Username not found. Please refresh the page and try again.")
      return
    }

    if (!submissionId) {
      showError("Error", "Submission ID is missing")
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
          "Content-Type": "application/json" 
        } 
      })

      if (res.ok) {
        setIsDeleteModalOpen(false)
        setDeleteId(null)
        if (onSubmissionsChange) {
          await onSubmissionsChange()
        } else {
          await refreshSubmissions(currentUsername)
        }
        showSuccess("Success!", "Submission has been deleted successfully.")
      } else {
        const errorData = await res.json().catch(() => ({ error: "Unable to delete submission" }))
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
      showError("Error", "Username not found. Please refresh the page and try again.")
      return
    }

    if (!submission || !submission._id) {
      showError("Error", "Invalid submission data")
      return
    }

    if (!username && currentUsername) {
      setUsername(currentUsername)
    }
    
    setEditData({
      _id: submission._id.toString(),
      teamName: submission.teamName || "",
      teamSerial: submission.teamSerial || "",
      slideLink: submission.slideLink || "",
    })
    setIsEditModalOpen(true)
  }

  const handleUpdateSubmit = async () => {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })

      if (res.ok) {
        setIsEditModalOpen(false)
        setEditData({ _id: "", teamName: "", teamSerial: "", slideLink: "" })
        if (onSubmissionsChange) {
          await onSubmissionsChange()
        } else {
          await refreshSubmissions(currentUsername)
        }
        showSuccess("Success!", "Submission has been updated successfully.")
      } else {
        const errorData = await res.json().catch(() => ({ error: "Unable to update submission" }))
        showError("Update Failed", errorData.error || "Unable to update submission. Please try again.")
      }
    } catch (err) {
      showError("Network Error", "Unable to update submission. Please check your connection.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="glass-effect rounded-2xl border border-indigo-500/20 overflow-hidden shadow-xl">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">All Submissions</h2>
            <p className="text-indigo-100 text-sm">View and manage submitted presentation slides</p>
          </div>
          <div className="relative lg:w-80">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-300" />
            <input
              placeholder="Search by team name or serial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-indigo-200 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-effect p-8 rounded-2xl border border-indigo-500/20 shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-3 border-indigo-500/20 border-t-indigo-500"></div>
              <p className="text-slate-200 font-semibold text-lg">Processing...</p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 sm:p-8">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-200 mb-3">
              {submissions.length === 0 ? "No submissions yet" : "No teams match your search"}
            </h3>
            <p className="text-slate-400 max-w-md mx-auto">
              {submissions.length === 0
                ? "Submissions will appear here once teams start uploading their slides"
                : "Try adjusting your search terms to find what you're looking for"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission._id}
                className="group relative overflow-hidden rounded-xl border border-indigo-500/20 bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                          <Hash className="w-4 h-4 mr-1.5 text-indigo-400" />
                          <span className="text-sm font-bold text-indigo-400">{submission.teamSerial}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-indigo-300 transition-colors">
                        {submission.teamName}
                      </h3>
                      <div className="flex items-center text-sm text-slate-400">
                        <Clock className="w-4 h-4 mr-2 text-indigo-400" />
                        Submitted on {new Date(submission.submittedAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 lg:gap-2">
                      <a
                        href={submission.slideLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center btn-gradient text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30"
                      >
                        <span>View Slides</span>
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>

                      {/* Desktop Action Buttons */}
                      <div className="hidden md:flex gap-2">
                        <button
                          onClick={() => openEditModal(submission)}
                          disabled={isLoading}
                          className="inline-flex items-center justify-center bg-gradient-to-br from-amber-500 to-amber-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30"
                          title="Edit submission"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(submission._id)}
                          disabled={isLoading}
                          className="inline-flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                          title="Delete submission"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Mobile Action Buttons */}
                      <div className="flex md:hidden gap-2">
                        <button
                          onClick={() => openEditModal(submission)}
                          disabled={isLoading}
                          className="flex-1 inline-flex items-center justify-center bg-gradient-to-br from-amber-500 to-amber-600 text-white px-5 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 transition-all duration-200"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(submission._id)}
                          disabled={isLoading}
                          className="flex-1 inline-flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600 text-white px-5 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-2xl p-8 w-11/12 max-w-md border border-red-500/20 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-start mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <Trash2 className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-1">Delete Submission</h3>
                <p className="text-sm text-slate-400">This action cannot be undone</p>
              </div>
            </div>
            <p className="mb-8 text-slate-300 leading-relaxed">
              Are you sure you want to delete this submission? All data will be permanently removed from the system.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isLoading}
                className="flex-1 px-6 py-3 border border-slate-600 rounded-xl text-slate-200 hover:bg-slate-800/50 disabled:opacity-50 transition-all font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition-all font-semibold shadow-lg hover:shadow-red-500/30"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Submission Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="glass-effect p-8 rounded-2xl w-full max-w-lg border border-amber-500/20 shadow-2xl my-8 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-xl flex items-center justify-center mr-3">
                  <Edit className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-2xl text-slate-100 font-bold">Edit Submission</h3>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)} 
                disabled={isLoading} 
                className="disabled:opacity-50 hover:bg-slate-800/50 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-400 hover:text-slate-200" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-slate-200 font-semibold mb-2">
                  Team Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={editData.teamName}
                  onChange={(e) => setEditData({ ...editData, teamName: e.target.value })}
                  className="w-full border border-indigo-500/20 text-slate-100 rounded-xl px-4 py-3.5 bg-gradient-to-br from-slate-900/80 to-slate-800/60 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500/50 transition-all"
                  disabled={isLoading}
                  placeholder="Enter team name"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-200 font-semibold mb-2">
                  Team Serial <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={editData.teamSerial}
                  onChange={(e) => setEditData({ ...editData, teamSerial: e.target.value })}
                  className="w-full border border-indigo-500/20 rounded-xl text-slate-100 px-4 py-3.5 bg-gradient-to-br from-slate-900/80 to-slate-800/60 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500/50 transition-all"
                  disabled={isLoading}
                  placeholder="Enter team serial number"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-200 font-semibold mb-2">
                  Slide Link <span className="text-red-400">*</span>
                </label>
                <input
                  type="url"
                  value={editData.slideLink}
                  onChange={(e) => setEditData({ ...editData, slideLink: e.target.value })}
                  className="w-full border border-indigo-500/20 rounded-xl text-slate-100 px-4 py-3.5 bg-gradient-to-br from-slate-900/80 to-slate-800/60 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500/50 transition-all"
                  disabled={isLoading}
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-3 mt-8 pt-6 border-t border-indigo-500/10">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 text-slate-200 border border-slate-600 rounded-xl hover:bg-slate-800/50 disabled:opacity-50 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateSubmit}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 transition-all font-semibold shadow-lg hover:shadow-amber-500/30"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-2xl p-8 w-11/12 max-w-md border border-green-500/20 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-3">{modalTitle}</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">{modalMessage}</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-8 py-3.5 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-semibold w-full shadow-lg hover:shadow-green-500/30"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-2xl p-8 w-11/12 max-w-md border border-red-500/20 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-12 h-12 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-3">{modalTitle}</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">{modalMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-8 py-3.5 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-semibold w-full shadow-lg hover:shadow-red-500/30"
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