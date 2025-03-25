
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { limit = 6 } = await req.json();
    
    // For demonstration, we'll use a mock data approach since we don't have
    // the Instagram API keys set up yet
    
    // In a real implementation, you would use the Instagram Graph API:
    // const token = Deno.env.get("INSTAGRAM_TOKEN");
    // const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=${limit}&access_token=${token}`);
    
    // Mock data for now
    const mockPosts = [
      {
        id: '1',
        media_url: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475',
        permalink: 'https://www.instagram.com/eksejabula',
        caption: 'Our latest Los Vega jersey just dropped! #fashion #jersey #losvega',
        timestamp: '2023-12-10T12:00:00Z'
      },
      {
        id: '2',
        media_url: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2',
        permalink: 'https://www.instagram.com/eksejabula',
        caption: 'Street style with our premium beanies #streetwear #fashion',
        timestamp: '2023-12-05T15:30:00Z'
      },
      {
        id: '3',
        media_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035',
        permalink: 'https://www.instagram.com/eksejabula',
        caption: 'The art of expression. New art prints available in our shop. #art #expression',
        timestamp: '2023-12-01T09:15:00Z'
      },
      {
        id: '4',
        media_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
        permalink: 'https://www.instagram.com/eksejabula',
        caption: 'Behind the scenes of our latest photoshoot #behindthescenes',
        timestamp: '2023-11-28T14:45:00Z'
      },
      {
        id: '5',
        media_url: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
        permalink: 'https://www.instagram.com/eksejabula',
        caption: 'Lifestyle choices that define you. #eksejabula #lifestyle',
        timestamp: '2023-11-25T10:20:00Z'
      },
      {
        id: '6',
        media_url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
        permalink: 'https://www.instagram.com/eksejabula',
        caption: 'Community is everything. Meet our team. #team #community',
        timestamp: '2023-11-20T16:10:00Z'
      },
    ];

    return new Response(
      JSON.stringify({ 
        posts: mockPosts.slice(0, limit) 
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  } catch (error) {
    console.error('Instagram feed error:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        } 
      }
    );
  }
});
