
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Calendar, User, Clock, Facebook, Twitter, Instagram, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Sample blog post data
const blogPostData = {
  id: '1',
  title: 'The Origin Story of Eksejabula',
  content: `
    <p>In the vibrant streets of Johannesburg, Eksejabula began as a small creative project by a group of friends passionate about merging South African culture with contemporary design. What started as weekend experiments with jerseys and art prints has grown into a lifestyle brand that resonates with people across the globe.</p>
    
    <h2>The Early Days</h2>
    
    <p>The founders of Eksejabula met at a local art gallery opening in 2018, each bringing their unique perspective and skills. Thabo, with his background in graphic design; Sarah, who had studied fashion; and Michael, with his entrepreneurial spirit, shared a vision of creating products that celebrated creativity and self-expression.</p>
    
    <p>Their first creation was a limited run of hand-designed jerseys that quickly sold out at a local market. The positive response encouraged them to expand their offerings and refine their vision.</p>
    
    <blockquote>
      <p>"We never set out to create just another clothing brand. We wanted to create a platform for artistic expression that people could wear and live with every day." – Thabo Mbeki, Co-founder</p>
    </blockquote>
    
    <h2>Finding Our Identity</h2>
    
    <p>The name "Eksejabula" comes from the Zulu word meaning "to be excited" or "to rejoice," reflecting the joy and energy the founders wanted their creations to inspire. This connection to local language and culture remains central to the brand's identity.</p>
    
    <p>As the brand evolved, so did its mission. What began as a creative outlet transformed into a commitment to quality craftsmanship, sustainable practices, and community building. Each product became not just an item to wear or display, but a piece of a larger story about creativity, heritage, and conscious consumption.</p>
    
    <h2>Los Vega: A Club for Creativity</h2>
    
    <p>In 2020, we launched Los Vega, a sub-brand focused on reimagining the jersey as a canvas for artistic expression rather than just team loyalty. This initiative resonated deeply with our community, attracting artists, sports enthusiasts, and fashion-forward individuals alike.</p>
    
    <p>The Los Vega Club has since become a cultural phenomenon, hosting events, collaborating with local artists, and creating limited-edition designs that blur the lines between sportswear and wearable art.</p>
    
    <h2>Our Community</h2>
    
    <p>Perhaps the most remarkable aspect of Eksejabula's growth has been the community that has formed around it. From the early supporters who lined up for our first pop-up shop to the international customers who discover us online, our community shares a passion for creativity and authenticity.</p>
    
    <p>We celebrate this community through regular events, collaborations, and by highlighting our customers' stories in our "Community Spotlight" series. Their support and enthusiasm continue to inspire our designs and fuel our growth.</p>
    
    <h2>Looking Forward</h2>
    
    <p>As we look to the future, we remain committed to our founding principles while embracing new challenges and opportunities. We're expanding our sustainable practices, collaborating with more diverse artists, and exploring new product categories that align with our vision.</p>
    
    <p>The origin story of Eksejabula is still being written, with each new creation and customer adding to our journey. We invite you to be part of this ongoing story, whether you're a longtime supporter or just discovering us today.</p>
    
    <p>Thank you for being part of our community and for helping us continue to create, inspire, and eksejabula!</p>
  `,
  coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
  date: 'March 15, 2023',
  author: 'Thabo Mbeki',
  authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  authorBio: 'Co-founder of Eksejabula and creative director for the brand. Passionate about blending cultural heritage with modern design.',
  readTime: '5 min read',
  category: 'Brand Story',
  tags: ['Brand History', 'Founders', 'Los Vega', 'Community'],
};

// Related blog posts
const relatedPosts = [
  {
    id: '2',
    title: 'Behind the Scenes: Creating Los Vega Jerseys',
    excerpt: 'Take a look at our design process, from initial concepts to final production. Discover how we blend artistic expression with quality craftsmanship.',
    coverImage: 'https://images.unsplash.com/photo-1579762593175-20226054cad0',
    date: 'April 22, 2023',
    author: 'Sarah Johnson',
    readTime: '8 min read',
    category: 'Design Process',
  },
  {
    id: '3',
    title: 'Community Spotlight: The Fans Behind Eksejabula',
    excerpt: 'Meet the amazing community that has supported our brand from day one. Stories from our loyal customers and how they incorporate our products into their lifestyle.',
    coverImage: 'https://images.unsplash.com/photo-1521150932951-303a95503ed3',
    date: 'May 10, 2023',
    author: 'Michael Rodriguez',
    readTime: '6 min read',
    category: 'Community',
  },
  {
    id: '5',
    title: 'Styling Guide: How to Rock Your Los Vega Jersey',
    excerpt: 'Get inspired with styling tips for your Los Vega jersey. From casual streetwear to creative combinations, elevate your style with our versatile pieces.',
    coverImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
    date: 'July 18, 2023',
    author: 'Alex Chen',
    readTime: '4 min read',
    category: 'Style Guide',
  },
];

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPostData; // In a real app, you would fetch the specific post by id
  
  // Set page title
  useEffect(() => {
    document.title = `${post.title} | Eksejabula Blog`;
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    return () => {
      document.title = 'Eksejabula';
    };
  }, [post.title]);

  return (
    <div className="pt-8 pb-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm text-muted-foreground animate-fade-in">
          <nav className="flex items-center">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground">{post.title}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 animate-fade-in">
            {/* Featured Image */}
            <div className="rounded-xl overflow-hidden mb-8">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-auto aspect-[16/9] object-cover"
              />
            </div>

            {/* Post Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center mb-6">
                <div className="flex items-center mr-6">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </div>
                <div className="flex items-center mr-6">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link 
                    key={tag} 
                    to={`/blog?tag=${tag.toLowerCase().replace(' ', '-')}`}
                    className="bg-secondary hover:bg-secondary/80 text-foreground text-sm rounded-full px-3 py-1 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Post Content */}
            <div 
              className="prose prose-lg max-w-none mb-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Bio */}
            <div className="bg-secondary/50 rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-10">
              <img 
                src={post.authorAvatar} 
                alt={post.author} 
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium mb-1">{post.author}</h3>
                <p className="text-muted-foreground mb-3">{post.authorBio}</p>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex justify-between items-center mb-16">
              <Button asChild variant="outline">
                <Link to="/blog" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
              <div className="flex items-center">
                <span className="text-sm mr-3">Share:</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <div>
              <h2 className="text-2xl font-medium mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="group"
                  >
                    <div className="rounded-lg overflow-hidden mb-3">
                      <img 
                        src={relatedPost.coverImage} 
                        alt={relatedPost.title} 
                        className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-lg font-medium mb-1 group-hover:text-accent transition-colors">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>{relatedPost.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block animate-slide-in-right">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              <div className="bg-secondary/50 rounded-xl p-5">
                <h3 className="font-medium text-lg mb-3">Table of Contents</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-accent transition-colors">The Early Days</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-accent transition-colors">Finding Our Identity</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-accent transition-colors">Los Vega: A Club for Creativity</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-accent transition-colors">Our Community</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-accent transition-colors">Looking Forward</a>
                  </li>
                </ul>
              </div>

              <Separator />

              {/* Featured Products */}
              <div>
                <h3 className="font-medium text-lg mb-3">Featured Products</h3>
                <div className="space-y-4">
                  <Link to="/product/1" className="flex group">
                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 mr-3">
                      <img 
                        src="https://images.unsplash.com/photo-1577280927879-b2f0b15c5409" 
                        alt="Los Vega Jersey" 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium line-clamp-2 group-hover:text-accent transition-colors">
                        Los Vega Home Jersey
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        R599.00
                      </p>
                    </div>
                  </Link>
                  <Link to="/product/4" className="flex group">
                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 mr-3">
                      <img 
                        src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531" 
                        alt="Premium Beanie" 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium line-clamp-2 group-hover:text-accent transition-colors">
                        Premium Beanie - Black
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        R249.00
                      </p>
                    </div>
                  </Link>
                  <Link to="/product/7" className="flex group">
                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 mr-3">
                      <img 
                        src="https://images.unsplash.com/photo-1561839561-b13bcfe95249" 
                        alt="Street Art Print" 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium line-clamp-2 group-hover:text-accent transition-colors">
                        Street Art Print
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        R349.00
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/shop">
                      View All Products
                    </Link>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Newsletter */}
              <div className="bg-secondary/50 p-5 rounded-xl">
                <h3 className="font-medium text-lg mb-2">Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe to get the latest updates and exclusive content.
                </p>
                <div className="space-y-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <Button className="w-full">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
