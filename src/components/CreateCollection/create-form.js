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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Create Slide Collection</h1>
                <p className="text-blue-100 mt-1">
                  Set up a new collection for your class to gather presentation slides
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
                  <label htmlFor="section" className="block text-sm font-semibold text-gray-900 mb-2">
                    Section *
                  </label>
                  <input
                    id="section"
                    placeholder="e.g., 42-E, 65-A, 30-B"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="courseCode" className="block text-sm font-semibold text-gray-900 mb-2">
                    Course Code *
                  </label>
                  <input
                    id="courseCode"
                    placeholder="e.g., SE112, CSE101, EEE201"
                    value={formData.courseCode}
                    onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Semester */}
              <div>
                <label htmlFor="semester" className="block text-sm font-semibold text-gray-900 mb-2">
                  Semester *
                </label>
                <select
                  id="semester"
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white"
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
                <label htmlFor="faculty" className="block text-sm font-semibold text-gray-900 mb-2">
                  Faculty *
                </label>
                <select
                  id="faculty"
                  value={formData.faculty}
                  onChange={(e) => {
                    setFormData({ ...formData, faculty: e.target.value, department: "" })
                  }}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white"
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
                <label htmlFor="department" className="block text-sm font-semibold text-gray-900 mb-2">
                  Department *
                </label>
                <select
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  disabled={!formData.faculty}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 bg-white disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
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
                  <label htmlFor="teamCount" className="block text-sm font-semibold text-gray-900 mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Creator Email - OPTIONAL */}
              <div>
                <label htmlFor="creatorEmail" className="block text-sm font-semibold text-gray-900 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Creator Email <span className="text-gray-500 font-normal">(Optional)</span>
                </label>
                <input
                  id="creatorEmail"
                  type="email"
                  placeholder="For password recovery and notifications (optional)"
                  value={formData.creatorEmail}
                  onChange={(e) => setFormData({ ...formData, creatorEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
                <p className="text-sm text-gray-600 mt-1">Leave empty if you do not want email notifications</p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-lg"
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
