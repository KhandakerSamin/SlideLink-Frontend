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
    <div className="glass-effect rounded-2xl border border-indigo-500/10 overflow-hidden bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10 flex items-center">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4 backdrop-blur-sm">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center">
              Submit Your Slides
              <Sparkles className="w-4 h-4 ml-2 text-yellow-300" />
            </h2>
            <p className="text-indigo-100 text-sm mt-0.5">Share your presentation link</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmission} className="space-y-5">
          {/* Team Name Field */}
          <div>
            <label htmlFor="teamName" className="block text-sm font-semibold text-slate-200 mb-2">
              Team Name *
            </label>
            <input
              id="teamName"
              placeholder="e.g., Team Alpha, Group 1"
              maxLength={50}
              value={submissionData.teamName}
              onChange={(e) => setSubmissionData({ ...submissionData, teamName: e.target.value })}
              required
              className="w-full text-slate-100 placeholder-slate-500 px-4 py-3 border border-indigo-500/20 bg-slate-900/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-500/40"
            />
          </div>

          {/* Team Serial Field */}
          <div>
            <label htmlFor="teamSerial" className="block text-sm font-semibold text-slate-200 mb-2">
              Team Serial *
            </label>
            <input
              id="teamSerial"
              placeholder="1, 2, 3, etc."
              maxLength={50}
              value={submissionData.teamSerial}
              onChange={(e) => setSubmissionData({ ...submissionData, teamSerial: e.target.value })}
              required
              className="w-full text-slate-100 placeholder-slate-500 px-4 py-3 border border-indigo-500/20 bg-slate-900/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-500/40"
            />
          </div>

          {/* Slide Link Field */}
          <div>
            <label htmlFor="slideLink" className="block text-sm font-semibold text-slate-200 mb-2">
              Slide Link *
            </label>
            <input
              id="slideLink"
              type="url"
              placeholder="https://drive.google.com/... or https://onedrive.live.com/..."
              value={submissionData.slideLink}
              onChange={(e) => setSubmissionData({ ...submissionData, slideLink: e.target.value })}
              required
              className="w-full text-slate-100 placeholder-slate-500 px-4 py-3 border border-indigo-500/20 bg-slate-900/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-500/40"
            />
            <div className="flex items-start mt-3 p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-indigo-400" />
              <p className="text-sm text-slate-300">
                Make sure your slide link is publicly accessible or shared with viewing permissions
              </p>
            </div>
          </div>

          {/* Leader Email Field */}
          <div>
            <label htmlFor="leaderEmail" className="block text-sm font-semibold text-slate-200 mb-2">
              Team Leader Email (Optional)
            </label>
            <input
              id="leaderEmail"
              type="email"
              placeholder="leader@example.com"
              value={submissionData.leaderEmail}
              onChange={(e) => setSubmissionData({ ...submissionData, leaderEmail: e.target.value })}
              className="w-full text-slate-100 placeholder-slate-500 px-4 py-3 border border-indigo-500/20 bg-slate-900/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-indigo-500/40"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-gradient text-white py-3.5 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
