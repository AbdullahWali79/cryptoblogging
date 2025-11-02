import { createServerClient } from './supabase'
import { cookies } from 'next/headers'

export async function getSession() {
  const cookieStore = cookies()
  const supabase = createServerClient()
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export async function requireAuth() {
  const session = await getSession()
  
  if (!session) {
    throw new Error('Unauthorized')
  }
  
  return session
}

