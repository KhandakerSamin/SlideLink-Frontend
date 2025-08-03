import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Users } from "lucide-react"

export default function CollectionHeader({ collectionData, submissions }) {
  if (!collectionData) return null

  return (
    <>
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold mb-4">{collectionData.username}</h1>
              <div className="space-y-2 text-blue-100">
                <div className="text-lg font-medium">
                  {collectionData.section} • {collectionData.courseCode}
                </div>
                <div className="text-blue-200 font-medium">{collectionData.semester}</div>
                <div className="text-sm">{collectionData.department}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Submissions</span>
                </div>
                <div className="text-2xl font-bold">
                  {submissions.length}/{collectionData.teamCount}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center text-sm mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Created: {new Date(collectionData.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Auto-expires in 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
