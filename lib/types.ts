export interface Post {
  id: string
  title: string
  slug: string
  category: string
  short_description: string
  featured_image_url: string
  meta_title: string
  meta_description: string
  post_content: string
  author_name: string
  published_at: string
  created_at: string
  updated_at: string
}

export interface PostFormData {
  title: string
  slug: string
  category: string
  short_description: string
  featured_image_url: string
  meta_title: string
  meta_description: string
  post_content: string
  author_name: string
}

