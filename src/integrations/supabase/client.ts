// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ijbdbqcoykfhsliufcpx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqYmRicWNveWtmaHNsaXVmY3B4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMTU3NDMsImV4cCI6MjA1Nzg5MTc0M30.4qV-egeDgvcmhDam_O2_7l5nJu9d8oA97CNsxmFdHrE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);