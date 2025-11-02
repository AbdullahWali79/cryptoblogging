import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-8">Page not found</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-crypto-blue-light text-white font-semibold rounded-lg hover:bg-crypto-blue-dark transition"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}

