import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Users, BookOpen, GraduationCap } from "lucide-react"

export default function CollectionHeader({ collectionData, submissions }) {
  if (!collectionData) return null

  const submissionPercentage = Math.round((submissions.length / collectionData.teamCount) * 100)

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
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="mb-6 lg:mb-0 flex-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{collectionData.username}</h1>
                  <p className="text-blue-100 text-sm">Slide Collection</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-blue-100">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span className="text-sm">Section: </span>
                    <span className="font-semibold ml-1">{collectionData.section}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span className="text-sm">Course: </span>
                    <span className="font-semibold ml-1">{collectionData.courseCode}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">{collectionData.semester}</div>
                  <div className="text-xs opacity-90">{collectionData.department}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center min-w-[140px]">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Submissions</span>
                </div>
                <div className="text-3xl font-bold mb-1">
                  {submissions.length}/{collectionData.teamCount}
                </div>
                <div className="text-sm opacity-90">{submissionPercentage}% Complete</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 min-w-[140px]">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Created: {new Date(collectionData.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Expires in 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
