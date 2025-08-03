"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, User, Mail, MessageSquare, Info } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate API call
    try {
      // In a real application, you would send this data to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Failed to send message');

      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

      console.log("Contact form submitted:", formData)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" }) // Clear form
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        {" "}
        {/* Reduced max-w for form */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        {/* Contact Form Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-3">Get in Touch</h1>
            <p className="text-blue-100 leading-relaxed">
              Have questions, feedback, or just want to say hello? We would love to hear from you!
            </p>
          </div>

          <div className="p-8">
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                <p className="text-green-700 font-medium">Your message has been sent successfully!</p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-center">
                <p className="text-red-700 font-medium">Failed to send message. Please try again later.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-3">
                    <User className="w-4 h-4 inline mr-2" />
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-3">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Your Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-lg"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-3">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Regarding SlideLink features..."
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-lg"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-3">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  rows="6"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500 text-lg resize-y"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-lg flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        {/* Developer Info Section - Very Modern Style */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl shadow-lg p-8 text-center relative overflow-hidden border border-gray-700">
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-blue-400 shadow-xl">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-3 text-blue-200">Meet the Developer</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
              Crafted with passion and precision to simplify your slide sharing experience.
            </p>
            <div className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 inline-block text-left border border-gray-600">
              <div className="space-y-3 text-lg text-gray-200">
                <p>
                  <span className="font-semibold text-white">Name:</span> Khandaker Samin Yeasar
                </p>
                <p>
                  <span className="font-semibold text-white">Department:</span> Software Engineering
                </p>
                <p>
                  <span className="font-semibold text-white">Batch:</span> 42
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
