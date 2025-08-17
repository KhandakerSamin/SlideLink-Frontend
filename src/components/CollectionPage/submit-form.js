"use client"

import { useState } from "react"
import { Upload, AlertCircle, Sparkles } from "lucide-react"
import { showNotification } from "@/lib/notifications"

export default function SubmitForm({ username, onSubmissionSuccess }) {
  const [submissionData, setSubmissionData] = useState({
    teamName: "",
    teamSerial: "",
    slideLink: "",
    leaderEmail: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmission = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/collections/${username}/submissions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        },
      )

      const data = await response.json()

      if (response.ok) {
        showNotification("✅ Success! Slide link submitted successfully", "success")
        setSubmissionData({ teamName: "", teamSerial: "", slideLink: "", leaderEmail: "" })
        await onSubmissionSuccess()
      } else {
        if (response.status === 409 || data.error?.toLowerCase().includes("team name already exists")) {
          showNotification("❌ A team with this name has already submitted. Please choose a different name.", "error")
        } else {
          showNotification(`❌ Submission Failed: ${data.error || "Failed to submit"}`, "error")
        }
      }
    } catch (error) {
      console.error("Error submitting slide link:", error)
      showNotification("⚠️ Something went wrong. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-b-2xl shadow-lg border border-gray-100 border-t-0 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-violet-500 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10 flex items-center mb-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              Submit Your Teams Slides
              <Sparkles className="w-5 h-5 ml-2 text-yellow-300" />
            </h2>
            <p className="text-blue-100 mt-1">Upload your presentation slides and share the link here</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-8">
        <form onSubmit={handleSubmission} className="space-y-6">
          {/* Team Name Field */}
          <div>
            <label htmlFor="teamName" className="block text-sm font-semibold text-gray-800 mb-3">
              Team Name *
            </label>
            <input
              id="teamName"
              placeholder="e.g., Team Alpha, Group 1"
              maxLength={50}
              value={submissionData.teamName}
              onChange={(e) => setSubmissionData({ ...submissionData, teamName: e.target.value })}
              required
              className="w-full text-gray-800 placeholder-gray-500 px-4 py-4 border-2 border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
            />
          </div>

          {/* Team Serial Field */}
          <div>
            <label htmlFor="teamSerial" className="block text-sm font-semibold text-gray-800 mb-3">
              Team Serial *
            </label>
            <input
              id="teamSerial"
              placeholder="1, 2, 3, etc."
              maxLength={50}
              value={submissionData.teamSerial}
              onChange={(e) => setSubmissionData({ ...submissionData, teamSerial: e.target.value })}
              required
              className="w-full text-gray-800 placeholder-gray-500 px-4 py-4 border-2 border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
            />
          </div>

          {/* Slide Link Field */}
          <div>
            <label htmlFor="slideLink" className="block text-sm font-semibold text-gray-800 mb-3">
              Slide Link *
            </label>
            <input
              id="slideLink"
              type="url"
              placeholder="https://drive.google.com/... or https://onedrive.live.com/..."
              value={submissionData.slideLink}
              onChange={(e) => setSubmissionData({ ...submissionData, slideLink: e.target.value })}
              required
              className="w-full text-gray-800 placeholder-gray-500 px-4 py-4 border-2 border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
            />
            <div className="flex items-start mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-blue-600" />
              <p className="text-sm text-blue-800">
                Make sure your slide link is publicly accessible or shared with viewing permissions
              </p>
            </div>
          </div>

          {/* Leader Email Field */}
          <div>
            <label htmlFor="leaderEmail" className="block text-sm font-semibold text-gray-800 mb-3">
              Team Leader Email (Optional)
            </label>
            <input
              id="leaderEmail"
              type="email"
              placeholder="leader@example.com"
              value={submissionData.leaderEmail}
              onChange={(e) => setSubmissionData({ ...submissionData, leaderEmail: e.target.value })}
              className="w-full text-gray-800 placeholder-gray-500 px-4 py-4 border-2 border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Submitting...
              </div>
            ) : (
              "Submit Slide Link"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
