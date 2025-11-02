'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Post, PostFormData } from '@/lib/types'

interface PostFormProps {
  post?: Post | null
  onSuccess: () => void
  onCancel: () => void
}

export default function PostForm({ post, onSuccess, onCancel }: PostFormProps) {
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    slug: '',
    category: '',
    short_description: '',
    featured_image_url: '',
    meta_title: '',
    meta_description: '',
    post_content: '',
    author_name: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        category: post.category,
        short_description: post.short_description,
        featured_image_url: post.featured_image_url,
        meta_title: post.meta_title,
        meta_description: post.meta_description,
        post_content: post.post_content,
        author_name: post.author_name,
      })
    }
  }, [post])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
      meta_title: prev.meta_title || title,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const postData = {
        ...formData,
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      if (post) {
        // Update existing post
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', post.id)

        if (error) throw error
      } else {
        // Create new post
        const { error } = await supabase
          .from('posts')
          .insert([postData])

        if (error) throw error
      }

      onSuccess()
    } catch (error: any) {
      setError(error.message || 'Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">
        {post ? 'Edit Post' : 'Create New Post'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-crypto-blue-light"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-crypto-blue-light"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-crypto-blue-light"
            >
              <option value="">Select category</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Altcoins">Altcoins</option>
              <option value="DeFi">DeFi</option>
              <option value="Trading Tips">Trading Tips</option>
              <option value="NFT">NFT</option>
              <option value="Web3">Web3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Author Name *
            </label>
            <input
              type="text"
              value={formData.author_name}
              onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
              required
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-crypto-blue-light"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Short Description *
          </label>
          <textarea
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-crypto-blue-light"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Featured Image URL *
          </label>
          <input
            type="url"
            value={formData.featured_image_url}
            onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-crypto-blue-light"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Meta Title *
          </label>
          <input
            type="text"
            value={formData.meta_title}
            onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
            required
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-crypto-blue-light"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Meta Description *
          </label>
          <textarea
            value={formData.meta_description}
            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
            required
            rows={2}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-crypto-blue-light"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Post Content (HTML) *
          </label>
          <textarea
            value={formData.post_content}
            onChange={(e) => setFormData({ ...formData, post_content: e.target.value })}
            required
            rows={15}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-crypto-blue-light font-mono text-sm"
            placeholder="Paste your HTML content here..."
          />
          <p className="mt-2 text-sm text-gray-400">
            You can paste HTML code directly. Use proper HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;img&gt;, etc.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-crypto-blue-light text-white font-semibold rounded-lg hover:bg-crypto-blue-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

