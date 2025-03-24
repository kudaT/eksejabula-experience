import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Sample blog post data
const blogPosts = [
  {
    id: '1',
    title: 'The Origin Story of Eksejabula',
    excerpt: 'How a small South African brand grew from a creative idea into a lifestyle movement, and the journey that shaped our unique approach to fashion and art.',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
    date: 'March 15, 2023',
    author: 'Thabo Mbeki',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    readTime: '5 min read',
    category: 'Brand Story',
    featured: true,
  },
  {
    id: '2',
    title: 'Behind the Scenes: Creating Los Vega Jerseys',
    excerpt: 'Take a look at our design process, from initial concepts to final production. Discover how we blend artistic expression with quality craftsmanship.',
    coverImage: 'https://images.unsplash.com/photo-1579762593175-20226054cad0',
    date: 'April 22, 2023',
    author: 'Sarah Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
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
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    readTime: '6 min read',
    category: 'Community',
  },
  {
    id: '4',
    title: 'The Art of Sustainable Fashion: Our Approach',
    excerpt: "Sustainability is at the core of our business. Learn about our eco-friendly practices and how we're working to reduce our environmental footprint.",
    coverImage: 'https://images.unsplash.com/photo-1550919559-2256f4b083a4',
    date: 'June 5, 2023',
    author: 'Emma Thompson',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    readTime: '7 min read',
    category: 'Sustainability',
  },
  {
    id: '5',
    title: 'Styling Guide: How to Rock Your Los Vega Jersey',
    excerpt: 'Get inspired with styling tips for your Los Vega jersey. From casual streetwear to creative combinations, elevate your style with our versatile pieces.',
    coverImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8',
    date: 'July 18, 2023',
    author: 'Alex Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    readTime: '4 min read',
    category: 'Style Guide',
  },
  {
    id: '6',
    title: 'From Concept to Canvas: The Creation of Our Art Prints',
    excerpt: 'Dive into the creative process behind our limited edition art prints. Meet the artists and discover the inspiration behind each unique piece.',
    coverImage: 'https://images.unsplash.com/photo-1505941625782-6cd6f044f42e',
    date: 'August 3, 2023',
    author: 'Thabo Mbeki',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    readTime: '9 min read',
    category: 'Art & Design',
  },
  {
    id: '7',
    title: 'The Cultural Influence Behind Eksejabula Designs',
    excerpt: 'Explore the rich cultural heritage that influences our designs. From traditional patterns to modern interpretations, discover the stories woven into our products.',
    coverImage: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2',
    date: 'September 14, 2023',
    author: 'Zandile Ndlovu',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    readTime: '6 min read',
    category: 'Culture',
  },
  {
    id: '8',
    title: 'Event Recap: Eksejabula Pop-Up Shop in Cape Town',
    excerpt: 'Highlights from our recent pop-up event in Cape Town. See photos, hear from attendees, and catch up on what you missed from this exciting showcase.',
    coverImage: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205',
    date: 'October 29, 2023',
    author: 'David Khumalo',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    readTime: '5 min read',
    category: 'Events',
  },
];

// Sample categories
const categories = [
  { name: 'All', value: 'all' },
  { name: 'Brand Story', value: 'brand-story' },
  { name: 'Design Process', value: 'design-process' },
  { name: 'Community', value: 'community' },
  { name: 'Sustainability', value: 'sustainability' },
  { name: 'Style Guide', value: 'style-guide' },
  { name: 'Art & Design', value: 'art-design' },
  { name: 'Culture', value: 'culture' },
  { name: 'Events', value: 'events' },
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts based on search query and active category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || 
      post.category.toLowerCase().replace(' & ', '-').replace(' ', '-') === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Featured post
  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="pt-8 pb-24">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-display font-medium mb-4">
            Eksejabula Blog
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stories, insights, and updates from the world of Eksejabula. Discover the creativity and community behind our brand.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16 animate-fade-in">
            <div className="relative rounded-xl overflow-hidden">
              <div className="aspect-[16/9] w-full">
                <img 
                  src={featuredPost.coverImage} 
                  alt={featuredPost.title} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 text-white">
                <Badge className="mb-3 bg-white/20 hover:bg-white/30 text-white border-none">
                  {featuredPost.category}
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium mb-3 max-w-2xl">
                  {featuredPost.title}
                </h2>
                <p className="text-white/80 mb-6 max-w-2xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center mb-6">
                  <div className="flex items-center mr-6">
                    <Calendar className="h-4 w-4 mr-2 text-white/60" />
                    <span className="text-sm text-white/80">{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center mr-6">
                    <User className="h-4 w-4 mr-2 text-white/60" />
                    <span className="text-sm text-white/80">{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-white/60" />
                    <span className="text-sm text-white/80">{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button asChild variant="default" className="bg-white text-foreground hover:bg-white/90">
                  <Link to={`/blog/${featuredPost.id}`} className="group">
                    Read Article
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Categories and Search */}
          <div className="lg:sticky lg:top-24 h-fit order-2 lg:order-1 animate-slide-in-right">
            <div className="space-y-8">
              {/* Search */}
              <div>
                <h3 className="font-medium text-lg mb-3">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search blog posts..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              {/* Categories */}
              <div>
                <h3 className="font-medium text-lg mb-3">Categories</h3>
                <div className="space-y-1">
                  {categories.map(category => (
                    <Button
                      key={category.value}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start px-3",
                        activeCategory === category.value && "bg-secondary"
                      )}
                      onClick={() => {
                        setActiveCategory(category.value);
                        setCurrentPage(1);
                      }}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Recent Posts */}
              <div>
                <h3 className="font-medium text-lg mb-3">Recent Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map(post => (
                    <Link 
                      key={post.id} 
                      to={`/blog/${post.id}`}
                      className="flex group"
                    >
                      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 mr-3">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium line-clamp-2 group-hover:text-accent transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {post.date}
                        </p>
                      </div>
                    </Link>
                  ))}
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
                  <Input 
                    placeholder="Your email address" 
                    type="email"
                  />
                  <Button className="w-full">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content with Blog Posts */}
          <div className="lg:col-span-3 order-1 lg:order-2 animate-fade-in">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-medium">
                {activeCategory === 'all' ? 'All Articles' : `Category: ${categories.find(cat => cat.value === activeCategory)?.name}`}
              </h2>
              <p className="text-muted-foreground">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Blog Grid */}
            {currentPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentPosts.map(post => (
                  <article key={post.id} className="bg-card border rounded-xl overflow-hidden shadow-sm animate-fade-in">
                    <Link to={`/blog/${post.id}`} className="block group">
                      <div className="aspect-[16/9] overflow-hidden">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <Badge className="mb-3 bg-secondary/80 hover:bg-secondary text-foreground border-none">
                          {post.category}
                        </Badge>
                        <h3 className="text-xl font-medium mb-2 group-hover:text-accent transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center text-sm text-muted-foreground">
                          <div className="flex items-center mr-4">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-secondary/50 rounded-xl">
                <h3 className="text-xl font-medium mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or category filter.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </Button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
