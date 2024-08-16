import { SupabaseClient, createClient as supabaseCreateClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY!
const supabase = supabaseCreateClient(supabaseUrl, supabaseKey)

export const createClient = (): SupabaseClient => supabase
