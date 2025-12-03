import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Users, BookOpen, GraduationCap } from "lucide-react"

export default function CollectionHeader({ collectionData, submissions }) {
  if (!collectionData) return null

  const submissionPercentage = Math.round((submissions.length / collectionData.teamCount) * 100)

  return (
    <>
    {/* Background overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: '#020617',
          backgroundImage: `linear-gradient(to right, rgba(71,85,105,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(71,85,105,0.25) 1px, transparent 1px)`,
          backgroundSize: '36px 36px, 36px 36px',
        }}
      />
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-slate-300 hover:text-white font-medium transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
      

      <div className="glass-effect rounded-2xl border border-indigo-500/10 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="mb-6 lg:mb-0 flex-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{collectionData.username}</h1>
                  <p className="text-indigo-100 text-sm">Slide Collection</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-indigo-100">
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

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center min-w-[130px]">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-semibold text-sm">Submissions</span>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {submissions.length}/{collectionData.teamCount}
                </div>
                <div className="text-xs opacity-90">{submissionPercentage}% Complete</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 min-w-[130px]">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-xs">Created: {new Date(collectionData.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-xs">Expires in 24h</span>
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
