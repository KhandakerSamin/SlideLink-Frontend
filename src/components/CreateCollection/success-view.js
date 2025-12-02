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
    <div className="min-h-screen pt-24 pb-16 flex items-start justify-center" style={{background: '#0a0f1e'}}>
      <div className="w-full max-w-2xl px-6">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="glass-effect rounded-2xl border border-indigo-500/10 overflow-hidden">
          <div className="px-8 pt-8 pb-6 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">Collection Created Successfully!</h1>
            <p className="text-sm text-slate-300">
              Your slide collection is ready. Share the details below with your classmates.
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* Collection ID */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Collection ID</label>
              <div className="flex items-center gap-3">
                <input
                  value={collection.username}
                  readOnly
                  className="flex-1 px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl font-mono text-sm text-slate-100"
                />
                <button
                  onClick={() => copyToClipboard(collection.username, "Collection ID")}
                  className="px-4 py-3 glass-effect border border-indigo-500/20 rounded-xl hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all"
                >
                  <Copy className="w-4 h-4 text-indigo-400" />
                </button>
              </div>
            </div>

            {/* Share Link */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Direct Access Link</label>
              <div className="flex items-center gap-3">
                <input
                  value={collection.shareLink}
                  readOnly
                  className="flex-1 px-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl font-mono text-xs text-slate-100"
                />
                <button
                  onClick={() => copyToClipboard(collection.shareLink, "Share link")}
                  className="px-4 py-3 glass-effect border border-indigo-500/20 rounded-xl hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all"
                >
                  <Copy className="w-4 h-4 text-indigo-400" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">This link includes the password for easy access</p>
            </div>

            {/* QR Code */}
            <div className="text-center">
              <label className="block text-sm font-medium text-slate-200 mb-4">QR Code for Easy Sharing</label>
              <div className="inline-block">
                <div className="w-48 h-48 mx-auto bg-white rounded-xl shadow-md p-3">
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
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 glass-effect border border-indigo-500/20 rounded-xl hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all text-slate-200 font-medium text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download QR Code
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-3">Students can scan this to access the collection directly</p>
            </div>

            {/* Collection Details */}
            <div className="glass-effect border border-indigo-500/10 rounded-xl p-6">
              <h3 className="text-sm font-medium text-slate-200 mb-4">Collection Details</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-400">Section:</span>
                  <span className="ml-2 font-medium text-slate-100">{collection.section}</span>
                </div>
                <div>
                  <span className="text-slate-400">Course:</span>
                  <span className="ml-2 font-medium text-slate-100">{collection.courseCode}</span>
                </div>
                <div>
                  <span className="text-slate-400">Semester:</span>
                  <span className="ml-2 font-medium text-slate-100">{collection.semester}</span>
                </div>
                <div>
                  <span className="text-slate-400">Teams:</span>
                  <span className="ml-2 font-medium text-slate-100">{collection.teamCount}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/collections/${collection.username}`}
                className="flex-1 btn-gradient text-white py-3.5 px-6 rounded-xl font-semibold transition-all text-base text-center inline-flex items-center justify-center gap-2 shadow-md hover:shadow-indigo-500/30"
              >
                <ExternalLink className="w-4 h-4" />
                Go to Collection
              </Link>
              <Link
                href="/create"
                className="flex-1 glass-effect border border-indigo-500/20 text-white py-3.5 px-6 rounded-xl font-semibold hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all text-base text-center"
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