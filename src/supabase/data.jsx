import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dqoitwiwkkdwbaniqllv.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxb2l0d2l3a2tkd2JhbmlxbGx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU0MzIxODMsImV4cCI6MjAzMTAwODE4M30.8ROhQHW9udLezH1Lz7rf4MhILZ2p0SsmBp6ke_13V28'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
