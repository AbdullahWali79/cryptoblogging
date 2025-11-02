# CryptoBlog - Full-Stack Cryptocurrency Blogging Platform

A modern, full-stack cryptocurrency blogging website built with Next.js 14 (App Router), Supabase, and Tailwind CSS. Features a WordPress-style admin panel for content management.

## 🚀 Features

### Public Features
- **Landing Page**: Modern hero section with latest blog posts
- **Blog Listing**: Browse all posts with category filtering
- **Blog Detail Pages**: Individual post pages with SEO optimization
- **Category Filtering**: Filter posts by Bitcoin, Altcoins, DeFi, Trading Tips, NFT, Web3
- **SEO Ready**: Dynamic meta titles and descriptions for each post

### Admin Features
- **Password-Protected Login**: Secure admin authentication via Supabase Auth
- **Dashboard**: WordPress-style admin panel
- **CRUD Operations**: Create, Read, Update, Delete blog posts
- **Rich Form Editor**: HTML editor for post content
- **Auto-Generated Slugs**: Automatic slug generation from titles
- **Featured Images**: Support for external image URLs

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase (PostgreSQL + Authentication)
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- A Supabase account (free tier works)
- Git

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Run the SQL schema from `supabase-schema.sql`:
   ```sql
   -- Copy and paste the contents of supabase-schema.sql
   ```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under **API**.

### 4. Create Admin User

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click **Add User** → **Create New User**
3. Enter email and password for your admin account
4. Save the credentials - you'll use them to log in at `/admin/login`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/
│   ├── admin/
│   │   ├── login/          # Admin login page
│   │   └── dashboard/      # Admin dashboard (protected)
│   ├── blog/
│   │   └── [slug]/         # Dynamic blog post pages
│   ├── blogs/              # Blog listing with filters
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   ├── BlogCard.tsx        # Blog post card component
│   ├── Navbar.tsx          # Navigation bar
│   └── PostForm.tsx        # Admin post form
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── types.ts            # TypeScript types
│   └── auth.ts             # Auth utilities
├── middleware.ts           # Route protection
└── supabase-schema.sql     # Database schema
```

## 🎨 Routes

- `/` - Landing page with hero and latest posts
- `/blogs` - All blog posts with category filtering
- `/blog/[slug]` - Individual blog post page
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard (protected)

## 💾 Database Schema

The `posts` table includes:
- `id` (UUID, primary key)
- `title`, `slug`, `category`
- `short_description`, `featured_image_url`
- `meta_title`, `meta_description`
- `post_content` (HTML)
- `author_name`
- `published_at`, `created_at`, `updated_at`

## 🚢 Deployment to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**

3. Import your GitHub repository (Vercel will auto-detect Next.js)

4. **Add Environment Variables** in Vercel Dashboard → Settings → Environment Variables:
   - **NEXT_PUBLIC_SUPABASE_URL**: `https://svdmgfspuyrcuabrvikv.supabase.co`
   - **NEXT_PUBLIC_SUPABASE_ANON_KEY**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZG1nZnNwdXlyY3VhYnJ2aWt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwOTI4NTksImV4cCI6MjA3NzY2ODg1OX0.8QTuKHUdbRv8k8wOJprFnznI9Jrn3oxjdR3f6i8P524`
   - Select all environments (Production, Preview, Development)

5. Click **"Deploy"**!

**📋 See `VERCEL_DEPLOY.md` for detailed step-by-step instructions.**

## 📝 Usage

### Creating a Blog Post

1. Log in at `/admin/login`
2. Click **Add New Post** in the dashboard
3. Fill in all required fields:
   - **Title**: Post title (slug auto-generates)
   - **Category**: Select from dropdown
   - **Short Description**: Brief summary
   - **Featured Image URL**: External image URL
   - **Meta Title/Description**: SEO fields
   - **Post Content**: HTML content (paste HTML directly)
4. Click **Create Post**

### Editing a Post

1. In the dashboard, click **Edit** next to any post
2. Modify fields as needed
3. Click **Update Post**

### HTML Content

The post content field accepts HTML. You can paste HTML directly or use tools like:
- WordPress (copy HTML from editor)
- Markdown to HTML converters
- Rich text editors

Example HTML:
```html
<h2>Introduction</h2>
<p>This is a paragraph about cryptocurrency...</p>
<img src="https://example.com/image.jpg" alt="Description" />
<h3>Conclusion</h3>
<p>In summary...</p>
```

## 🔒 Security

- Row Level Security (RLS) enabled on Supabase
- Only authenticated users can create/update/delete posts
- Admin routes protected by middleware
- Public read access for all posts

## 🎯 Future Enhancements

- Image upload functionality
- Markdown editor support
- Comments system
- Search functionality
- Tags system
- Author profiles
- RSS feed

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
