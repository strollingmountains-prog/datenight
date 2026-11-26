import { createClient } from '@supabase/supabase-js'

// Anon key is a public key — safe to include in browser code (Supabase's design intent).
// Hardcoded here to avoid corrupted characters from Netlify env var copy-paste.
const supabaseUrl = 'https://kmsmmfvsfqbcxsvezrlm.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttc21tZnZzZnFiY3hzdmV6cmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUxODgzOTAsImV4cCI6MjExMDc2NDM5MH0.7yCW8o_ASnV80Xtf5X6kcbvao1Yj6i5yLgZezwiUe_A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
})
