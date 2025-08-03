export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Collection</h2>
        <p className="text-gray-600">Please wait while we fetch the collection data...</p>
      </div>
    </div>
  )
}
