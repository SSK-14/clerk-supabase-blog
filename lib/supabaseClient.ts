import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : '';
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY ? process.env.NEXT_PUBLIC_SUPABASE_KEY : '';
const templateKey: string = process.env.NEXT_PUBLIC_SUPABASE_TEMPLATE_KEY ? process.env.NEXT_PUBLIC_SUPABASE_TEMPLATE_KEY : '';

export const supabaseClient = async (getToken: any) => {
  const supabaseAccessToken = await getToken({
    template: templateKey,
  });
  return createClient(supabaseUrl, supabaseKey, {
    global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  })
}

export default supabaseClient
