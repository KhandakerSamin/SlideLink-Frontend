import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      {/* Gradient Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[128px]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Ready to Get </span>
            <span className="gradient-text">Started?</span>
          </h2>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Join thousands of students and instructors who have simplified their presentation workflow
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/create"
              className="group btn-gradient px-10 py-5 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-4 text-white min-w-[260px] text-lg"
            >
              <span>Create Collection</span>
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group glass-effect border border-indigo-500/20 text-white px-10 py-5 rounded-2xl font-semibold hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all flex items-center justify-center gap-4 min-w-[260px] text-lg"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </div>

    </section>
  )
}
