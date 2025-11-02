# Vercel Deployment Guide

## Environment Variables for Vercel

When deploying to Vercel, add these environment variables in your Vercel project settings:

### Required Environment Variables:

1. **NEXT_PUBLIC_SUPABASE_URL**
   ```
   https://svdmgfspuyrcuabrvikv.supabase.co
   ```

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZG1nZnNwdXlyY3VhYnJ2aWt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwOTI4NTksImV4cCI6MjA3NzY2ODg1OX0.8QTuKHUdbRv8k8wOJprFnznI9Jrn3oxjdR3f6i8P524
   ```

## Step-by-Step Vercel Deployment:

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### 3. Add Environment Variables

In the Vercel project settings:
1. Go to **Settings** → **Environment Variables**
2. Add the two variables above:
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://svdmgfspuyrcuabrvikv.supabase.co`
   - Environments: Production, Preview, Development (select all)
   
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZG1nZnNwdXlyY3VhYnJ2aWt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwOTI4NTksImV4cCI6MjA3NzY2ODg1OX0.8QTuKHUdbRv8k8wOJprFnznI9Jrn3oxjdR3f6i8P524`
   - Environments: Production, Preview, Development (select all)

### 4. Deploy

Click **"Deploy"** and wait for the build to complete!

## Before Deploying - Complete Setup:

1. ✅ Run SQL schema in Supabase (use `supabase-schema.sql`)
2. ✅ Create admin user in Supabase Dashboard → Authentication
3. ✅ Environment variables added to Vercel
4. ✅ Code pushed to GitHub

## After Deployment:

- Your site will be live at: `https://your-project.vercel.app`
- Admin login: `https://your-project.vercel.app/admin/login`
- Test the full functionality!

## Important Notes:

- The `.env.local` file is for local development only
- For Vercel, environment variables must be added through the Vercel dashboard
- Never commit `.env.local` to GitHub (already in `.gitignore`)

