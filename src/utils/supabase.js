
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tnsmyolqecrfxclgoezz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuc215b2xxZWNyZnhjbGdvZXp6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1NzM2NzEzMCwiZXhwIjoxOTcyOTQzMTMwfQ.bx56yCZTLQ_sADiCkE52NZmf4afZ4_WNcEqSxf1Br8Q';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;