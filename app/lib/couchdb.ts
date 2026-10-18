import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qaobpgjpzqrdjrkzhqvg.supabase.co';
const supabaseAnonKey = 'sb_publishable_8FXFTW4jLOXZSF4jtrqFHQ_BiEN09ni';

export const db = createClient(supabaseUrl, supabaseAnonKey);