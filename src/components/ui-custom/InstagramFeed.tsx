
import { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { fetchInstagramPosts, type InstagramPost } from '@/lib/instagram';
import { cn } from '@/lib/utils';

interface InstagramFeedProps {
  postCount?: number;
  className?: string;
}

export default function InstagramFeed({ postCount = 6, className }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const instagramPosts = await fetchInstagramPosts(postCount);
        setPosts(instagramPosts);
      } catch (error) {
        console.error('Error loading Instagram posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [postCount]);

  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4", className)}>
      {loading ? (
        // Show skeletons while loading
        Array.from({ length: postCount }).map((_, i) => (
          <div key={`skeleton-${i}`} className="aspect-square bg-secondary animate-pulse rounded-lg"></div>
        ))
      ) : (
        // Show actual posts
        posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg animate-on-scroll"
          >
            <img
              src={post.media_url}
              alt={post.caption || "Instagram post"}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-300 flex items-center justify-center">
              <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm">
                <Instagram className="h-4 w-4" />
                View Post
              </span>
            </div>
          </a>
        ))
      )}
    </div>
  );
}
