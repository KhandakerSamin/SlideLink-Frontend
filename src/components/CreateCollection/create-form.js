"use client"

import Link from "next/link"
import { ArrowLeft, Users, Lock, Mail, BookOpen } from "lucide-react"

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
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-start justify-center" style={{background: '#0a0f1e'}}>
      <div className="w-full max-w-3xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="glass-effect rounded-2xl border border-indigo-500/10 overflow-hidden">
          <div className="px-8 pt-8 pb-6 border-b border-indigo-500/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-white">Create Slide Collection</h1>
                <p className="text-sm text-slate-400 mt-1">
                  Minimal one-page setup to collect all class presentations in one secure place.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Section and Course Code Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="section" className="block text-sm font-medium text-slate-200 mb-2">
                    Section *
                  </label>
                  <input
                    id="section"
                    placeholder="e.g., 42-E, 65-A, 30-B"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    required
                    className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="courseCode" className="block text-sm font-medium text-slate-200 mb-2">
                    Course Code *
                  </label>
                  <input
                    id="courseCode"
                    placeholder="e.g., SE112, CSE101, EEE201"
                    value={formData.courseCode}
                    onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                    required
                    className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                  required
                  className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                  required
                  className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                  required
                  className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed"
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
              <div className="grid md:grid-cols-2 gap-6">
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
                    required
                    className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                    required
                    className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Creator Email - OPTIONAL */}
              <div>
                <label htmlFor="creatorEmail" className="block text-sm font-medium text-slate-200 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Creator Email <span className="text-gray-500 font-normal">(Optional)</span>
                </label>
                <input
                  id="creatorEmail"
                  type="email"
                  placeholder="For password recovery and notifications (optional)"
                  value={formData.creatorEmail}
                  onChange={(e) => setFormData({ ...formData, creatorEmail: e.target.value })}
                  className="w-full rounded-xl bg-slate-900/60 border border-slate-700/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-slate-500 mt-1">Leave empty if you do not want email notifications</p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-gradient text-white py-3.5 px-6 rounded-xl font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all text-base shadow-md hover:shadow-indigo-500/30"
              >
                {isLoading ? "Creating Collection..." : "Create Slide Collection"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
