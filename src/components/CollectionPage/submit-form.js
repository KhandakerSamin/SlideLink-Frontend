"use client"

import { useState } from "react"
import { Upload, AlertCircle } from "lucide-react"
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
        }
      )

      const data = await response.json()

      if (response.ok) {
        showNotification("✅ Success! Slide link submitted successfully", "success")
        setSubmissionData({ teamName: "",teamSerial:"", slideLink: "", leaderEmail: "" })
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
    <div className="bg-white rounded-b-2xl shadow-sm border border-gray-100 border-t-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Submit Your Teams Slides</h2>
            <p className="text-green-100">Upload your presentation slides and share the link here</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-8">
        <form onSubmit={handleSubmission} className="space-y-6">
          {/* Team Name Field */}
          <div>
            <label htmlFor="teamName" className="block text-sm font-semibold text-gray-800 mb-2">
              Team Name *
            </label>
            <input
              id="teamName"
              placeholder="e.g., Team Alpha, Group 1"
              maxLength={50}
              value={submissionData.teamName}
              onChange={(e) =>
                setSubmissionData({ ...submissionData, teamName: e.target.value })
              }
              required
              className="w-full text-black placeholder-gray-600 px-4 py-3 border border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
          </div>
          {/* Team Serial Field */}
          <div>
            <label htmlFor="teamName" className="block text-sm font-semibold text-gray-800 mb-2">
              Team Serial *
            </label>
            <input
              id="teamSerial"
              placeholder="1, 2, 3, etc."
              maxLength={50}
              value={submissionData.teamSerial}
              onChange={(e) =>
                setSubmissionData({ ...submissionData, teamSerial: e.target.value })
              }
              required
              className="w-full text-black placeholder-gray-600 px-4 py-3 border border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
          </div>

          

          {/* Slide Link Field */}
          <div>
            <label htmlFor="slideLink" className="block text-sm font-semibold text-gray-800 mb-2">
              Slide Link *
            </label>
            <input
              id="slideLink"
              type="url"
              placeholder="https://drive.google.com/... or https://onedrive.live.com/..."
              value={submissionData.slideLink}
              onChange={(e) =>
                setSubmissionData({ ...submissionData, slideLink: e.target.value })
              }
              required
              className="w-full text-black placeholder-gray-600 px-4 py-3 border border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
            <div className="flex items-start mt-2 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-red-500" />
              <p className="text-black">
                Make sure your slide link is publicly accessible or shared with viewing permissions
              </p>
            </div>
          </div>

          {/* Leader Email Field */}
          <div>
            <label htmlFor="leaderEmail" className="block text-sm font-semibold text-gray-800 mb-2">
              Team Leader Email (Optional)
            </label>
            <input
              id="leaderEmail"
              type="email"
              placeholder="leader@example.com"
              value={submissionData.leaderEmail}
              onChange={(e) =>
                setSubmissionData({ ...submissionData, leaderEmail: e.target.value })
              }
              className="w-full text-black placeholder-gray-600 px-4 py-3 border border-gray-200 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? "Submitting..." : "Submit Slide Link"}
          </button>
        </form>
      </div>
    </div>
  )
}
