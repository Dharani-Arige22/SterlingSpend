import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ysbzavlnmkisgchwooct.supabase.co/rest/v1/'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzYnphdmxubWtpc2djaHdvb2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMDgxOTgsImV4cCI6MjA5Mjc4NDE5OH0.q1x73V9bvbhz9jLYNO9XTE2DkKmpied6oKDbMGqQpmw'
export const supabase = createClient(supabaseUrl, supabaseKey)