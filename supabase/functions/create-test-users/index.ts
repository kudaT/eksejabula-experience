
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing");
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check if admin email exists
    const { data: existingAdmin } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'admin@eksejabula.co.za')
      .single();
      
    // Create admin user if doesn't exist
    if (!existingAdmin) {
      // 1. Create auth user
      const { data: adminAuthData, error: adminAuthError } = await supabase.auth.admin.createUser({
        email: 'admin@eksejabula.co.za',
        password: 'Admin123$',
        email_confirm: true,
        user_metadata: {
          full_name: 'Admin User',
        },
      });
      
      if (adminAuthError) throw adminAuthError;
      
      // 2. Update profile to admin role (the trigger will create the profile, but we need to update role)
      const { error: adminProfileError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', adminAuthData.user.id);
        
      if (adminProfileError) throw adminProfileError;
    }
    
    // Check if regular user email exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', 'user@eksejabula.co.za')
      .single();
      
    // Create regular user if doesn't exist
    if (!existingUser) {
      // Create auth user
      const { data: userAuthData, error: userAuthError } = await supabase.auth.admin.createUser({
        email: 'user@eksejabula.co.za',
        password: 'User123$',
        email_confirm: true,
        user_metadata: {
          full_name: 'Regular User',
        },
      });
      
      if (userAuthError) throw userAuthError;
      
      // The trigger will create the profile with default 'customer' role
    }
    
    return new Response(
      JSON.stringify({ message: "Test users created successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
