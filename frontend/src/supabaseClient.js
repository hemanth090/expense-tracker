import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://llznwuhuffrpndggtkau.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsem53dWh1ZmZycG5kZ2d0a2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3OTkzMDAsImV4cCI6MjA1MDM3NTMwMH0.niLfDzG3-rc94SkxGoghD6BkfIm7-wfoNMY0Z7KMw5Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});
