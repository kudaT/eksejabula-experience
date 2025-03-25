
import { supabase } from "@/integrations/supabase/client";

export interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

/**
 * Fetch recent Instagram posts for display in the UI
 * @param limit Number of posts to fetch (default: 6)
 * @returns Array of Instagram post objects
 */
export async function fetchInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  try {
    // Try to fetch posts from the Supabase edge function
    const { data, error } = await supabase.functions.invoke('instagram-feed', {
      body: { limit },
    });
    
    if (error) throw error;
    
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    // Return fallback posts in case of error
    return Array.from({ length: limit }).map((_, i) => ({
      id: `fallback-${i}`,
      media_url: `https://source.unsplash.com/random/600x600?fashion&sig=${i}`,
      permalink: 'https://www.instagram.com/eksejabula',
      caption: 'Eksejabula lifestyle',
      timestamp: new Date().toISOString(),
    }));
  }
}
