"use client"

import Link from "next/link"
import { ArrowLeft, Copy, Download, ExternalLink, CheckCircle } from "lucide-react"

export default function SuccessView({ collection, onNotification }) {
  const copyToClipboard = (text, label) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        onNotification(`${label} copied to clipboard!`)
      })
      .catch(() => {
        onNotification("Failed to copy to clipboard", "error")
      })
  }

  const downloadQR = async () => {
    try {
      const response = await fetch(collection.qrCode)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${collection.username}-qr.png`
      link.click()
      window.URL.revokeObjectURL(url)
      onNotification("QR code downloaded!")
    } catch (error) {
      onNotification("Failed to download QR code", "error")
    }
  }

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
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Collection Created Successfully!</h1>
            <p className="text-green-100 text-base">
              Your slide collection is ready. Share the details below with your classmates.
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* Collection ID */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">Collection ID</label>
              <div className="flex items-center space-x-3">
                <input
                  value={collection.username}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-mono text-base text-gray-900"
                />
                <button
                  onClick={() => copyToClipboard(collection.username, "Collection ID")}
                  className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Share Link */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">Direct Access Link</label>
              <div className="flex items-center space-x-3">
                <input
                  value={collection.shareLink}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl font-mono text-sm text-gray-900"
                />
                <button
                  onClick={() => copyToClipboard(collection.shareLink, "Share link")}
                  className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-700 mt-2">This link includes the password for easy access</p>
            </div>

            {/* QR Code */}
            <div className="text-center">
              <label className="block Ttext-base font-semibold text-gray-900 mb-4">QR Code for Easy Sharing</label>
              <div className="bg-gray-50 p-8 rounded-2xl inline-block">
                <div className="w-48 h-48 mx-auto bg-white rounded-lg p-4 shadow-sm">
                  <img
                    src={collection.qrCode || "/placeholder.svg"}
                    alt="QR Code for collection access"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=200&width=200&text=QR+Code"
                    }}
                  />
                </div>
                <button
                  onClick={downloadQR}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-gray-700 font-medium"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </button>
              </div>
              <p className="text-sm text-gray-700 mt-3">Students can scan this to access the collection directly</p>
            </div>

            {/* Collection Details */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Collection Details</h3>
              <div className="grid md:grid-cols-2 gap-4 text-base">
                <div>
                  <span className="text-gray-700">Section:</span>
                  <span className="ml-2 font-medium text-gray-900">{collection.section}</span>
                </div>
                <div>
                  <span className="text-gray-700">Course:</span>
                  <span className="ml-2 font-medium text-gray-900">{collection.courseCode}</span>
                </div>
                <div>
                  <span className="text-gray-700">Semester:</span>
                  <span className="ml-2 font-medium text-gray-900">{collection.semester}</span>
                </div>
                <div>
                  <span className="text-gray-700">Teams:</span>
                  <span className="ml-2 font-medium text-gray-900">{collection.teamCount}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/collections/${collection.username}`}
                className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 text-center inline-flex items-center justify-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Go to Collection
              </Link>
              <Link
                href="/create"
                className="flex-1 border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-center"
              >
                Create Another
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}