import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pyxdxiomnxgtwisvkfzq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eGR4aW9tbnhndHdpc3ZrZnpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxODE4MzIsImV4cCI6MjA2NTc1NzgzMn0.otNy-wVV-svK2dwk5T99yN3_VljBuW5z3HhTxcy-2Aw"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;