import Link from "next/link"
import { ArrowRight, ExternalLink, Trash2 } from "lucide-react"

// This would come from API in real implementation
const recentCollections = [
  {
    username: "42-E-SE112-2025-CSE",
    section: "42-E",
    courseCode: "SE112",
    semester: "Summer 2025",
    faculty: "Faculty of Science and Information Technology (FSIT)",
    department: "Computer Science & Engineering (CSE)",
    teamCount: 12,
    submissions: 8,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    username: "65-A-EEE201-2025-EEE",
    section: "65-A",
    courseCode: "EEE201",
    semester: "Summer 2025",
    faculty: "Faculty of Engineering (FE)",
    department: "Electrical & Electronic Engineering (EEE)",
    teamCount: 15,
    submissions: 12,
    createdAt: "2024-01-15T09:15:00Z",
  },
  {
    username: "30-B-BBA101-2025-BBA",
    section: "30-B",
    courseCode: "BBA101",
    semester: "Summer 2025",
    faculty: "Faculty of Business and Entrepreneurship (FBE)",
    department: "Business Administration (BBA)",
    teamCount: 20,
    submissions: 15,
    createdAt: "2024-01-14T16:20:00Z",
  },
]

export default function RecentCollections() {
  return (
    <section id="collections" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Recent Collections</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              See what is happening across different classes and departments
            </p>
          </div>
          <Link
            href="/collections"
            className="group inline-flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentCollections.map((collection) => (
            <div
              key={collection.username}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">{collection.username}</h3>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {collection.submissions}/{collection.teamCount}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="font-medium">
                    {collection.section} • {collection.courseCode}
                  </div>
                  <div className="text-blue-600 font-medium">{collection.semester}</div>
                  <div className="text-xs text-gray-500">{collection.department}</div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="text-xs">{collection.faculty.split("(")[0].trim()}</span>
                  <span>{new Date(collection.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex space-x-3">
                  <Link
                    href={`/collection/${collection.username}`}
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View</span>
                  </Link>
                  <button className="border border-red-200 text-red-600 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors duration-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
