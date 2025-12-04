import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Users, Lock, Mail, BookOpen } from 'lucide-react'
import { showNotification } from '@/lib/notifications'

const faculties = {
  "Faculty of Science and Information Technology (FSIT)": [
    "Software Engineering (SWE)",
    "Computer Science & Engineering (CSE)",
    "Computing & Information System (CIS)",
    "Environmental Science and Disaster Management (ESDM)",
    "Multimedia & Creative Technology (MCT)",
    "Information Technology and Management (ITM)",
    "Physical Education & Sports Science (PESS)",
  ],
  "Faculty of Engineering (FE)": [
    "Information and Communication Engineering (ICE)",
    "Textile Engineering (TE)",
    "Electrical & Electronic Engineering (EEE)",
    "Architecture (ARCH)",
    "Civil Engineering (CE)",
  ],
  "Faculty of Business and Entrepreneurship (FBE)": [
    "Business Administration (BBA)",
    "Management (MGT)",
    "Real Estate (RE)",
    "Tourism & Hospitality Management (THM)",
    "Innovation & Entrepreneurship (IE)",
    "Finance and Banking (FB)",
    "Accounting (ACC)",
    "Marketing (MKT)",
  ],
  "Faculty of Health and Life Sciences (FHLS)": [
    "Pharmacy (PHARM)",
    "Public Health (PH)",
    "Nutrition & Food Engineering (NFE)",
    "Agricultural Science (AGS)",
    "Genetic Engineering and Biotechnology (GEB)",
  ],
  "Faculty of Humanities and Social Sciences (FHSS)": [
    "English (ENG)",
    "Law (LAW)",
    "Journalism & Mass Communication (JMC)",
    "Development Studies (DS)",
    "Information Science and Library Management (ISLM)",
  ],
}

const semesters = ["Spring 2025", "Summer 2025", "Fall 2025"]

export default function CreateForm({ formData, setFormData, onSubmit, error, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.section || !formData.courseCode || !formData.faculty || !formData.department || !formData.teamCount || !formData.password) {
      showNotification('Please fill in all required fields', 'error')
      return
    }
    
    if (formData.password.length < 6 || formData.password.length > 12) {
      showNotification('Password must be between 6-12 characters', 'error')
      return
    }
    
    // Call parent submit handler
    onSubmit(e)
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#020617",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
          `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      />


      {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          {/* Title Section */}
          <div className="mb-8 flex justify-between items-start">
            <div className="flex items-start gap-4 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Create a Slide Collection</h1>
                <p className="text-base text-slate-300 mt-1">
                  Set up your class presentation collection in one secure place.
                </p>
              </div>
            </div>
            <div>
              {/* Go back to Home button */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/70 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600 hover:text-white transition font-medium shadow hover:shadow-indigo-500/20"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>

          {/* Form Card */}
        <div className="glass-effect rounded-2xl border border-indigo-500/20 shadow-xl">
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Section and Course Code Row */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="section" className="block text-sm font-medium text-slate-200 mb-2">
                    Section *
                  </label>
                  <input
                    id="section"
                    placeholder="e.g., 42-E, 65-A"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="courseCode" className="block text-sm font-medium text-slate-200 mb-2">
                    Course Code *
                  </label>
                  <input
                    id="courseCode"
                    placeholder="e.g., SE112, CSE101"
                    value={formData.courseCode}
                    onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                    className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Semester */}
              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-slate-200 mb-2">
                  Semester *
                </label>
                <select
                  id="semester"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {semesters.map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
              </div>

              {/* Faculty */}
              <div>
                <label htmlFor="faculty" className="block text-sm font-medium text-slate-200 mb-2">
                  Faculty *
                </label>
                <select
                  id="faculty"
                  value={formData.faculty}
                  onChange={(e) => {
                    setFormData({ ...formData, faculty: e.target.value, department: "" })
                  }}
                  className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select faculty</option>
                  {Object.keys(faculties).map((faculty) => (
                    <option key={faculty} value={faculty}>
                      {faculty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-slate-200 mb-2">
                  Department *
                </label>
                <select
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  disabled={!formData.faculty}
                  className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <option value="">{formData.faculty ? "Select department" : "Select faculty first"}</option>
                  {formData.faculty &&
                    faculties[formData.faculty]?.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>
              </div>

              {/* Team Count and Password Row */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="teamCount" className="block text-sm font-medium text-slate-200 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Number of Teams *
                  </label>
                  <input
                    id="teamCount"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="e.g., 10"
                    value={formData.teamCount}
                    onChange={(e) => setFormData({ ...formData, teamCount: e.target.value })}
                    className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
                    <Lock className="w-4 h-4 inline mr-1" />
                    Collection Password *
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="6-12 characters"
                    minLength={6}
                    maxLength={12}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Creator Email - OPTIONAL */}
              <div>
                <label htmlFor="creatorEmail" className="block text-sm font-medium text-slate-200 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Creator Email <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  id="creatorEmail"
                  type="email"
                  placeholder="For password recovery and notifications"
                  value={formData.creatorEmail}
                  onChange={(e) => setFormData({ ...formData, creatorEmail: e.target.value })}
                  className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-400 mt-1.5">Leave empty if you don&apos;t want email notifications</p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full btn-gradient text-white py-3.5 px-6 rounded-xl font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all text-base shadow-md hover:shadow-indigo-500/30"
              >
                {isLoading ? "Creating Collection..." : "Create Slide Collection"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}