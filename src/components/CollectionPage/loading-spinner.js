export default function LoadingSpinner() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      <div className="text-center glass-effect p-8 rounded-2xl border border-indigo-500/10">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold text-slate-100 mb-2">Loading Collection</h2>
        <p className="text-slate-400">Please wait while we fetch the collection data...</p>
      </div>
    </div>
  )
}
