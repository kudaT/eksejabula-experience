
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { format } from "https://deno.land/std@0.178.0/datetime/format.ts";

serve(async (req) => {
  try {
    // Only allow GET requests
    if (req.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Define base URL of the site
    const baseUrl = Deno.env.get("SITE_URL") || "https://eksejabula.com";
    
    // Array to store all URLs
    const urls = [
      // Static pages
      { loc: "/", priority: 1.0, changefreq: "daily" },
      { loc: "/los-vega", priority: 0.9, changefreq: "weekly" },
      { loc: "/shop", priority: 0.9, changefreq: "daily" },
      { loc: "/blog", priority: 0.8, changefreq: "weekly" },
      { loc: "/contact", priority: 0.7, changefreq: "monthly" },
    ];
    
    // Fetch products
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, created_at, is_available")
      .eq("is_available", true);
    
    if (productsError) {
      console.error("Error fetching products:", productsError);
    } else {
      // Add product URLs
      products.forEach(product => {
        // Create slug from product name
        const slug = product.name.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-");
        urls.push({
          loc: `/product/${slug}-${product.id}`,
          priority: 0.8,
          changefreq: "weekly",
          lastmod: new Date(product.created_at).toISOString()
        });
      });
    }
    
    // Fetch blog posts
    const { data: blogPosts, error: blogError } = await supabase
      .from("blog_posts")
      .select("slug, published_at")
      .not("published_at", "is", null);
    
    if (blogError) {
      console.error("Error fetching blog posts:", blogError);
    } else {
      // Add blog post URLs
      blogPosts.forEach(post => {
        urls.push({
          loc: `/blog/${post.slug}`,
          priority: 0.7,
          changefreq: "monthly",
          lastmod: new Date(post.published_at).toISOString()
        });
      });
    }
    
    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
    
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response(`Error generating sitemap: ${error.message}`, { status: 500 });
  }
});
