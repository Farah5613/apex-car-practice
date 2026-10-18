import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qaobpgjpzqrdjrkzhqvg.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_8FXFTW4jLOXZSF4jtrqFHQ_BiEN09ni';

export const db = createClient(supabaseUrl, supabaseAnonKey);