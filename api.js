import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export function getsupabase() {
  const supabaseUrl = 'https://troqbxzzcfksfidaqghl.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyb3FieHp6Y2Zrc2ZpZGFxZ2hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODc3ODEsImV4cCI6MjA2ODY2Mzc4MX0.Rb_pkYFBTYmH2MVD7HPUh7SodNikXj09jRgNhvUWIa8';
  return createClient(supabaseUrl, supabaseKey);
}
