import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Join thousands of students and instructors who have simplified their presentation workflow
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/create"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-violet-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-violet-700 transition-all duration-300 flex items-center space-x-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Create Your First Collection</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
            <Link
              href="/contact"
              className="group border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
