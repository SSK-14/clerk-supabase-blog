import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : '';
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY ? process.env.NEXT_PUBLIC_SUPABASE_KEY : '';

export const supabaseClient = (supabaseAccessToken: any) => createClient(supabaseUrl, supabaseKey, {
  global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
})

export default supabaseClient
