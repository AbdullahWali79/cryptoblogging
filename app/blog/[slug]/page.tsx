import { notFound } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Post } from '@/lib/types'
import { format } from 'date-fns'
import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'

async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.short_description,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.short_description,
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Image */}
        {post.featured_image_url && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-block px-4 py-2 text-sm font-semibold text-crypto-blue-light bg-crypto-blue/20 rounded-full">
              {post.category}
            </span>
            <time className="text-gray-400 text-sm">
              {format(new Date(post.published_at || post.created_at), 'MMMM dd, yyyy')}
            </time>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
          <p className="text-xl text-gray-300 mb-4">{post.short_description}</p>
          <div className="text-gray-400">
            By <span className="text-white font-medium">{post.author_name}</span>
          </div>
          {post.updated_at && post.updated_at !== post.created_at && (
            <div className="text-gray-500 text-sm mt-2">
              Last updated: {format(new Date(post.updated_at), 'MMMM dd, yyyy')}
            </div>
          )}
        </header>

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white
            prose-p:text-gray-300
            prose-a:text-crypto-blue-light
            prose-strong:text-white
            prose-code:text-crypto-blue-light
            prose-pre:bg-gray-900
            prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.post_content }}
        />
      </article>
    </div>
  )
}

