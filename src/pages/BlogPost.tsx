
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const BlogPost = () => {
  // Set page title
  useEffect(() => {
    document.title = "Blog Coming Soon | Eksejabula";
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    return () => {
      document.title = 'Eksejabula';
    };
  }, []);

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
            <span className="text-foreground">Article</span>
          </nav>
        </div>

        {/* Coming Soon Message */}
        <div className="bg-secondary/50 rounded-xl p-10 text-center max-w-3xl mx-auto mb-10 animate-fade-in">
          <Badge className="mb-4 bg-accent/20 hover:bg-accent/30 text-accent border-none">
            Coming Soon
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium mb-4">
            Blog Content Under Development
          </h1>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're working on creating amazing blog content that will be available soon. Check back later for stories, insights, and updates about Eksejabula and Los Vega.
          </p>
          <Button asChild>
            <Link to="/blog" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Admin CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Are you an administrator?</p>
          <Button asChild>
            <Link to="/admin/blog">
              Manage Blog Content
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
