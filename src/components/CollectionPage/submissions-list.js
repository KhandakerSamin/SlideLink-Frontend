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

  // ✅ Fixed getUsername function to properly handle /collections/ routes
  const getUsername = () => {
    console.log("🔄 getUsername() called")
    
    // First priority: use collectionUsername prop
    if (collectionUsername) {
      console.log("🎯 Using collectionUsername prop:", collectionUsername)
      return collectionUsername
    }

    if (typeof window !== "undefined") {
      const fullPath = window.location.pathname
      const fullUrl = window.location.href
      const pathParts = fullPath.split("/").filter(Boolean)
      
      console.log("🌐 Full URL:", fullUrl)
      console.log("📍 Full pathname:", fullPath)
      console.log("🔍 Path parts:", pathParts)

      // FIXED: Handle /collections/<username>/... pattern correctly
      const collectionsIndex = pathParts.indexOf("collections")
      if (collectionsIndex !== -1 && pathParts[collectionsIndex + 1]) {
        const foundUsername = pathParts[collectionsIndex + 1]
        console.log("✅ Pattern: /collections/<username>/... - Found username:", foundUsername)
        return foundUsername
      }

      // Pattern: /collection/<username>/... (singular)
      const collectionIndex = pathParts.indexOf("collection")
      if (collectionIndex !== -1 && pathParts[collectionIndex + 1]) {
        const foundUsername = pathParts[collectionIndex + 1]
        console.log("✅ Pattern: /collection/<username>/... - Found username:", foundUsername)
        return foundUsername
      }

      // Pattern: /<username>/submissions
      const submissionsIndex = pathParts.indexOf("submissions")
      if (submissionsIndex !== -1 && submissionsIndex > 0) {
        const potentialUsername = pathParts[submissionsIndex - 1]
        // Make sure it's not "collections" or "collection"
        if (potentialUsername !== "collections" && potentialUsername !== "collection") {
          console.log("✅ Pattern: /<username>/submissions - Found username:", potentialUsername)
          return potentialUsername
        }
      }

      // Pattern: /submissions/<username>
      if (submissionsIndex !== -1 && pathParts[submissionsIndex + 1]) {
        const foundUsername = pathParts[submissionsIndex + 1]
        console.log("✅ Pattern: /submissions/<username> - Found username:", foundUsername)
        return foundUsername
      }

      // Pattern: Just /<username> (single path part that's not "collections")
      if (pathParts.length === 1 && pathParts[0] && pathParts[0] !== "collections" && pathParts[0] !== "collection") {
        const potentialUsername = pathParts[0]
        console.log("✅ Pattern: /<username> - Found username:", potentialUsername)
        return potentialUsername
      }

      // Pattern: /<username>/any-other-page (but not collections or collection)
      if (pathParts.length >= 2 && pathParts[0] && pathParts[0] !== "collections" && pathParts[0] !== "collection") {
        const potentialUsername = pathParts[0]
        console.log("✅ Pattern: /<username>/... - Found username:", potentialUsername)
        return potentialUsername
      }

      // Fallback: check query parameters
      const urlParams = new URLSearchParams(window.location.search)
      const paramUsername = urlParams.get("username") || urlParams.get("u") || urlParams.get("collection")
      if (paramUsername) {
        console.log("✅ Found username in query params:", paramUsername)
        return paramUsername
      }

      console.log("❌ No username found in any pattern")
      console.log("🔍 Available path parts for manual inspection:", pathParts)
    } else {
      console.log("❌ Window object not available (SSR)")
    }

    return ""
  }

  useEffect(() => {
    console.log("🚀 useEffect triggered")
    console.log("📦 collectionUsername prop:", collectionUsername)
    console.log("📊 initialSubmissions:", initialSubmissions?.length || 0)
    
    const foundUsername = getUsername()
    console.log("🔎 Initial username search result:", foundUsername)
    
    if (foundUsername) {
      setUsername(foundUsername)
      
      // If we have a username and no submissions, try to fetch them
      if (!initialSubmissions || initialSubmissions.length === 0) {
        console.log("📡 Auto-fetching submissions for username:", foundUsername)
        refreshSubmissions(foundUsername)
      }
    } else {
      console.log("⚠️ No username found in useEffect")
      // Try again after a small delay in case the component is still mounting
      setTimeout(() => {
        const retryUsername = getUsername()
        console.log("🔄 Retry username search:", retryUsername)
        if (retryUsername) {
          setUsername(retryUsername)
        }
      }, 100)
    }
  }, [collectionUsername, initialSubmissions])

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

  // ✅ Enhanced refreshSubmissions function
  const refreshSubmissions = async (usernameParam = null) => {
    const currentUsername = usernameParam || username || getUsername()
    console.log("📡 Refreshing submissions for username:", currentUsername)

    if (!currentUsername) {
      console.error("❌ No username available for refresh")
      showError("Error", "No username found. Please make sure you're accessing this page correctly.")
      return
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
      const url = `${backendUrl}/api/collections/${currentUsername}/submissions`
      console.log("🌍 Fetching submissions from:", url)

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (res.ok) {
        const data = await res.json()
        console.log("✅ Submissions fetched successfully:", data.submissions?.length || 0, "items")
        setSubmissions(data.submissions || [])
      } else {
        const errorText = await res.text()
        console.error("❌ Fetch error:", res.status, errorText)
        showError("Error", `Failed to fetch submissions: ${res.status} - ${errorText}`)
      }
    } catch (error) {
      console.error("❌ Network error:", error)
      showError("Network Error", "Unable to fetch submissions. Please check your connection.")
    }
  }

  // ✅ Enhanced filteredSubmissions
  const filteredSubmissions = submissions.filter((submission) =>
    submission.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.teamSerial?.toString().includes(searchTerm)
  )

  // ✅ Enhanced handleDeleteClick function with better debugging
  const handleDeleteClick = (submissionId) => {
    console.log("🗑️ DELETE BUTTON CLICKED")
    console.log("🗑️ Current username state:", username)
    console.log("🗑️ Submission ID:", submissionId)
    
    // Try multiple methods to get username
    let currentUsername = username
    if (!currentUsername) {
      console.log("🗑️ Username not in state, trying getUsername()")
      currentUsername = getUsername()
      console.log("🗑️ getUsername() returned:", currentUsername)
    }
    
    // If still no username, try to extract from collectionUsername prop
    if (!currentUsername && collectionUsername) {
      console.log("🗑️ Using collectionUsername prop as fallback:", collectionUsername)
      currentUsername = collectionUsername
    }
    
    console.log("🗑️ Final username to use:", currentUsername)
    
    if (!currentUsername) {
      console.error("❌ Username not found for delete operation")
      console.error("❌ Debug info:")
      console.error("   - username state:", username)
      console.error("   - collectionUsername prop:", collectionUsername)
      console.error("   - getUsername() result:", getUsername())
      console.error("   - window.location:", typeof window !== "undefined" ? window.location.href : "N/A")
      
      showError("Error", "Username not found. Please refresh the page and try again. If the problem persists, check the URL structure.")
      return
    }

    if (!submissionId) {
      console.error("❌ Submission ID is missing")
      showError("Error", "Submission ID is missing")
      return
    }

    console.log("🗑️ Preparing to delete submission:", submissionId)
    console.log("🗑️ Using username:", currentUsername)
    
    // Update the state with the found username if it wasn't set
    if (!username && currentUsername) {
      console.log("🗑️ Updating username state:", currentUsername)
      setUsername(currentUsername)
    }
    
    setDeleteId(submissionId)
    setIsDeleteModalOpen(true)
  }

  // 🔍 Enhanced confirmDelete with maximum debugging
  const confirmDelete = async () => {
    const currentUsername = username || getUsername()
    console.log("🗑️ CONFIRMING DELETE - FULL DEBUG")
    console.log("🗑️ Username from state:", username)
    console.log("🗑️ Username from getUsername():", getUsername())
    console.log("🗑️ Final username:", currentUsername)
    console.log("🗑️ Delete ID:", deleteId)
    console.log("🗑️ Delete ID type:", typeof deleteId)
    console.log("🗑️ collectionUsername prop:", collectionUsername)
    
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
      
      console.log("🗑️ COMPLETE REQUEST DETAILS:")
      console.log("   - Backend URL:", backendUrl)
      console.log("   - Full URL:", url)
      console.log("   - Method: DELETE")
      console.log("   - Headers: Content-Type: application/json")

      // Make the request and log everything
      console.log("🗑️ Making fetch request...")
      const res = await fetch(url, { 
        method: "DELETE", 
        headers: { 
          "Content-Type": "application/json" 
        } 
      })

      console.log("🗑️ RESPONSE RECEIVED:")
      console.log("   - Status:", res.status)
      console.log("   - Status Text:", res.statusText)
      console.log("   - OK:", res.ok)
      console.log("   - Headers:", Object.fromEntries(res.headers.entries()))

      // Clone response to read it multiple times
      const responseClone = res.clone()
      
      // Try to get both text and JSON
      let responseText = ""
      let responseJson = null
      
      try {
        responseText = await res.text()
        console.log("🗑️ Raw response text:", responseText)
        console.log("🗑️ Response text length:", responseText.length)
      } catch (textError) {
        console.error("❌ Failed to read response as text:", textError)
      }

      if (responseText) {
        try {
          responseJson = JSON.parse(responseText)
          console.log("🗑️ Parsed JSON:", responseJson)
        } catch (jsonError) {
          console.log("🗑️ Response is not valid JSON:", jsonError.message)
        }
      }

      if (res.ok) {
        console.log("✅ Delete appears successful based on status code")
        setIsDeleteModalOpen(false)
        setDeleteId(null)
        await refreshSubmissions(currentUsername)
        showSuccess("Success!", "Submission has been deleted successfully.")
      } else {
        console.log("❌ Delete failed based on status code")
        
        let errorMessage = "Unknown error occurred"
        
        if (responseJson && responseJson.error) {
          errorMessage = responseJson.error
        } else if (responseJson && responseJson.message) {
          errorMessage = responseJson.message
        } else if (responseText) {
          errorMessage = responseText
        } else {
          errorMessage = `HTTP ${res.status}: ${res.statusText}`
        }
        
        console.error("❌ Final error message:", errorMessage)
        console.error("❌ Complete error context:", {
          status: res.status,
          statusText: res.statusText,
          responseText,
          responseJson
        })
        
        showError("Delete Failed", errorMessage)
      }
    } catch (err) {
      console.error("❌ DELETE NETWORK ERROR:")
      console.error("   - Error name:", err.name)
      console.error("   - Error message:", err.message)
      console.error("   - Error stack:", err.stack)
      console.error("   - Full error object:", err)
      
      showError("Network Error", `Unable to delete submission. Network error: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ Enhanced openEditModal function with better debugging  
  const openEditModal = (submission) => {
    console.log("✏️ EDIT BUTTON CLICKED")
    console.log("✏️ Current username state:", username)
    console.log("✏️ Submission:", submission)
    
    // Try multiple methods to get username
    let currentUsername = username
    if (!currentUsername) {
      console.log("✏️ Username not in state, trying getUsername()")
      currentUsername = getUsername()
      console.log("✏️ getUsername() returned:", currentUsername)
    }
    
    // If still no username, try to extract from collectionUsername prop
    if (!currentUsername && collectionUsername) {
      console.log("✏️ Using collectionUsername prop as fallback:", collectionUsername)
      currentUsername = collectionUsername
    }
    
    console.log("✏️ Final username to use:", currentUsername)
    
    if (!currentUsername) {
      console.error("❌ Username not found for edit operation")
      console.error("❌ Debug info:")
      console.error("   - username state:", username)
      console.error("   - collectionUsername prop:", collectionUsername)
      console.error("   - getUsername() result:", getUsername())
      console.error("   - window.location:", typeof window !== "undefined" ? window.location.href : "N/A")
      
      showError("Error", "Username not found. Please refresh the page and try again. If the problem persists, check the URL structure.")
      return
    }

    if (!submission || !submission._id) {
      console.error("❌ Invalid submission data:", submission)
      showError("Error", "Invalid submission data")
      return
    }

    console.log("✏️ Opening edit modal for submission ID:", submission._id)
    console.log("✏️ Using username:", currentUsername)
    
    // Update the state with the found username if it wasn't set
    if (!username && currentUsername) {
      console.log("✏️ Updating username state:", currentUsername)
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

  // ✅ Enhanced handleUpdateSubmit function with detailed error handling
  const handleUpdateSubmit = async () => {
    const currentUsername = username || getUsername()
    console.log("✏️ UPDATE SUBMIT")
    console.log("✏️ Username:", currentUsername)
    console.log("✏️ Edit data:", editData)

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

      console.log("✏️ UPDATE REQUEST DETAILS:")
      console.log("   - URL:", updateUrl)
      console.log("   - Method: PUT")
      console.log("   - Body:", requestBody)

      const res = await fetch(updateUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })

      console.log("✏️ UPDATE RESPONSE:")
      console.log("   - Status:", res.status)
      console.log("   - Status Text:", res.statusText)
      console.log("   - OK:", res.ok)

      // Get response text first to see what we're dealing with
      const responseText = await res.text()
      console.log("✏️ Raw response text:", responseText)

      if (res.ok) {
        console.log("✅ Update successful")
        setIsEditModalOpen(false)
        setEditData({ _id: "", teamName: "", teamSerial: "", slideLink: "" })
        await refreshSubmissions(currentUsername)
        showSuccess("Success!", "Submission has been updated successfully.")
      } else {
        console.log("❌ Update failed - attempting to parse error")
        
        let errorData = { error: "Unknown error occurred" }
        
        if (responseText) {
          try {
            errorData = JSON.parse(responseText)
            console.log("❌ Parsed error data:", errorData)
          } catch (parseError) {
            console.log("❌ Failed to parse error response, using raw text")
            errorData = { error: responseText }
          }
        }
        
        console.error("❌ Update failed:", errorData)
        
        const errorMessage = errorData.error || 
                            errorData.message || 
                            `HTTP ${res.status}: ${res.statusText}` ||
                            "Unable to update submission. Please try again."
        
        showError("Update Failed", errorMessage)
      }
    } catch (err) {
      console.error("❌ Update network error:", err)
      console.error("❌ Error details:", {
        name: err.name,
        message: err.message,
        stack: err.stack
      })
      showError("Network Error", `Unable to update submission. Network error: ${err.message}`)
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
            {/* Debug info - Enhanced for better troubleshooting */}
            <div className="text-xs text-purple-200 mt-1 space-y-1">
              <div>Username: {username || 'Not found'}</div>
              <div>Prop: {collectionUsername || 'None'}</div>
              <div>URL: {typeof window !== "undefined" ? window.location.pathname : 'N/A'}</div>
            </div>
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

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-900 font-medium mb-1">Team Name *</label>
                <input
                  type="text"
                  value={editData.teamName}
                  onChange={(e) => setEditData({ ...editData, teamName: e.target.value })}
                  className="w-full border text-gray-900 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                  type="button"
                  onClick={handleUpdateSubmit}
                  disabled={isLoading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition"
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