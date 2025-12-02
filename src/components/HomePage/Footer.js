import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="glass-effect border-t border-indigo-500/10 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <Image
                  src="/favicon3.svg"
                  alt="SlideLink Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </div>
              <span className="text-2xl font-bold gradient-text">SlideLink</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md mt-4 text-sm">
              Streamlining presentation sharing for academic institutions worldwide.
            </p>
            <p className="text-xs text-slate-500">© 2025 SlideLink. All rights reserved.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-5 text-white">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/create" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Create Collection
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Join Collection
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Browse Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-5 text-white">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
