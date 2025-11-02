import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-crypto-dark border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-crypto-blue-light hover:text-blue-400 transition">
              CryptoHawke
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Home
              </Link>
              <Link
                href="/blogs"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Blogs
              </Link>
              <Link
                href="/admin/login"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

