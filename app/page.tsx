import Navbar from '@/components/Navbar'
import BlogCard from '@/components/BlogCard'
import { supabase } from '@/lib/supabase'
import { Post } from '@/lib/types'
import Link from 'next/link'

async function getLatestPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data || []
}

export default async function Home() {
  const posts = await getLatestPosts()

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-crypto-blue-dark to-crypto-blue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welcome to CryptoBlog
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Stay updated with the latest cryptocurrency news, trading tips, DeFi insights, and blockchain innovations.
            </p>
            <Link
              href="/blogs"
              className="inline-block px-8 py-3 bg-white text-crypto-blue-dark font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Explore All Blogs
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">Latest Blog Posts</h2>
            <p className="text-gray-400">Discover our most recent cryptocurrency insights</p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No blog posts available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 CryptoBlog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

