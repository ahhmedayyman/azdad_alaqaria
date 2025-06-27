import { createClient } from '@supabase/supabase-js'

// نستخدم المتغيرات العامة (يبدأ بـ NEXT_PUBLIC_) عشان تشتغل في المتصفح
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
