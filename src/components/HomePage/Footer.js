import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-1.5">
              <Image
                src="/favicon3.svg"
                alt="SlideLink Logo"
                width={40}
                height={40}
                className="h-8 w-8"
                ></Image>
              
              <span className="text-2xl font-bold text-white">SlideLink</span>


            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Streamlining presentation sharing for academic institutions worldwide.
            </p>
            <p className="text-sm text-gray-500">© 2024 SlideLink. All rights reserved.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-6 text-lg">Product</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/create" className="hover:text-white transition-colors duration-200">
                  Create Collection
                </Link>
              </li>
              <li>
                <Link href="/join" className="hover:text-white transition-colors duration-200">
                  Join Collection
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors duration-200">
                  Browse Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6 text-lg">Support</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors duration-200">
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
