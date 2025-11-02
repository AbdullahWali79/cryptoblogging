import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/types'
import { format } from 'date-fns'

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-crypto-blue/20 transition-all duration-300 border border-gray-700 hover:border-crypto-blue-light">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={post.featured_image_url || 'https://via.placeholder.com/800x400?text=Crypto+Blog'}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-crypto-blue-light bg-crypto-blue/20 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-gray-400">
              {format(new Date(post.published_at || post.created_at), 'MMM dd, yyyy')}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-crypto-blue-light transition">
            {post.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {post.short_description}
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <span>By {post.author_name}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

