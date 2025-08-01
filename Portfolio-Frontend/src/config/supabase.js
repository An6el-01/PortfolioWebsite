import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Debug: Log all environment variables that start with REACT_APP_
console.log('🔍 Environment Variables Debug:')
console.log('All REACT_APP_ variables:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')))
console.log('REACT_APP_SUPABASE_URL:', supabaseUrl)
console.log('REACT_APP_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set (length: ' + supabaseAnonKey.length + ')' : '❌ Missing')
console.log('REACT_APP_EMAILJS_SERVICE_ID:', process.env.REACT_APP_EMAILJS_SERVICE_ID ? '✅ Set' : '❌ Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please create a .env file in the Portfolio-Frontend directory with:')
  console.error('REACT_APP_SUPABASE_URL=your_supabase_project_url')
  console.error('REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key')
  console.error('')
  console.error('Current values:')
  console.error('URL:', supabaseUrl ? '✅ Set' : '❌ Missing')
  console.error('Key:', supabaseAnonKey ? '✅ Set' : '❌ Missing')
}

// Create client even if credentials are missing (for development)
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
) 