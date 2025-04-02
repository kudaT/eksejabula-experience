
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Calendar, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

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

        {/* Coming Soon Banner */}
        <div className="mb-16 animate-fade-in">
          <div className="bg-secondary/50 rounded-xl p-10 text-center">
            <Badge className="mb-4 bg-accent/20 hover:bg-accent/30 text-accent border-none">
              Coming Soon
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium mb-4">
              Our Blog Content is Being Created
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're currently working on amazing blog content that will be available soon. Check back later for stories, insights, and updates about Eksejabula and Los Vega.
            </p>
            <div className="flex justify-center">
              <Button asChild variant="default">
                <Link to="/admin/blog" className="group">
                  Manage Blog Content
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

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
                    disabled
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Search will be available once content is published</p>
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
                        "w-full justify-start px-3 opacity-70",
                        activeCategory === category.value && "bg-secondary"
                      )}
                      onClick={() => setActiveCategory(category.value)}
                      disabled
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Categories will be available once content is published</p>
              </div>

              <Separator />

              {/* Newsletter */}
              <div className="bg-secondary/50 p-5 rounded-xl">
                <h3 className="font-medium text-lg mb-2">Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe to get notified when our blog launches and receive exclusive content.
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

          {/* Main Content - Coming Soon Placeholder */}
          <div className="lg:col-span-3 order-1 lg:order-2 animate-fade-in">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-medium">
                Coming Soon
              </h2>
            </div>

            {/* Blog Grid - Coming Soon Placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-card border rounded-xl overflow-hidden shadow-sm animate-pulse">
                  <div className="aspect-[16/9] bg-secondary/40"></div>
                  <div className="p-5">
                    <div className="h-6 w-24 bg-secondary/60 rounded-full mb-3"></div>
                    <div className="h-7 bg-secondary/60 rounded mb-2 w-3/4"></div>
                    <div className="h-7 bg-secondary/60 rounded mb-4 w-1/2"></div>
                    <div className="h-4 bg-secondary/40 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-secondary/40 rounded mb-4 w-5/6"></div>
                    <div className="flex">
                      <div className="h-5 w-24 bg-secondary/40 rounded mr-4"></div>
                      <div className="h-5 w-24 bg-secondary/40 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Admin CTA */}
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Are you an administrator?</p>
              <Button asChild>
                <Link to="/admin/blog">
                  Go to Blog Management
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
