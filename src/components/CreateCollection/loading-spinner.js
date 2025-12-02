import { BookOpen } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center" style={{background: '#0a0f1e'}}>
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
          <BookOpen className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">Creating Your Collection</h2>
        <p className="text-slate-400 text-sm">Setting up your slide collection...</p>
        <div className="mt-6 flex justify-center gap-1.5">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}
