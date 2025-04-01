
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, ShieldCheck, RefreshCw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, subscribeToNewsletter } from '@/lib/utils';
import HeroSection from '@/components/ui-custom/HeroSection';
import ProductCard from '@/components/ui-custom/ProductCard';
import InstagramFeed from '@/components/ui-custom/InstagramFeed';

// Sample product data
const featuredProducts = [
  {
    id: '1',
    name: 'Los Vega Home Jersey',
    price: 599,
    imageUrl: '/lovable-uploads/5543d787-c616-440f-8393-d7b31f0aa342.png',
    category: 'Jerseys',
    isNew: true,
  },
  {
    id: '2',
    name: 'Tokyo #99 Jersey',
    price: 649,
    imageUrl: '/lovable-uploads/9d55eed4-3404-4d8c-aa3f-9e0c8c8451e5.png',
    category: 'Jerseys',
    isFeatured: true,
  },
];

// Product categories
const productCategories = [
  {
    name: 'Jerseys',
    imageUrl: '/lovable-uploads/5543d787-c616-440f-8393-d7b31f0aa342.png',
    slug: 'jerseys',
  },
  {
    name: 'Beanies',
    imageUrl: '', // No image for Coming Soon
    slug: 'beanies',
    comingSoon: true
  },
  {
    name: 'Art & Posters',
    imageUrl: '', // No image for Coming Soon
    slug: 'art',
    comingSoon: true
  }
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hasScrolled, setHasScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setSubmitting(true);
    
    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        setEmail('');
        setSubmitMessage(result.message);
      } else {
        setSubmitMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection 
        title="Discover Eksejabula"
        subtitle="Premium Lifestyle"
        description="Where fashion meets creativity. Explore our unique collection of jerseys, beanies, and art that define modern self-expression."
        ctaText="Shop Collection"
        ctaLink="/shop"
        secondaryCtaText="Our Story"
        secondaryCtaLink="/los-vega"
        imageUrl="/lovable-uploads/ab316598-d3f2-4574-abf9-ce094d74122e.png"
        alignment="center"
        size="large"
      />

      {/* Featured Categories */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">Explore Our Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our premium line of products, crafted with quality and designed with passion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
          {/* Jerseys Category */}
          <div className="group animate-on-scroll relative rounded-xl overflow-hidden aspect-[1/1.2]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
            <img 
              src="/lovable-uploads/5543d787-c616-440f-8393-d7b31f0aa342.png"
              alt="Jerseys"
              className="object-cover h-full w-full transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
              <h3 className="text-2xl font-display font-medium mb-2">Jerseys</h3>
              <p className="text-white/80 mb-4">
                Express yourself with our bold and unique jersey designs.
              </p>
              <Button 
                asChild
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Link to="/shop?category=jerseys" className="group/btn">
                  Explore
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Beanies Category - Coming Soon */}
          <div className="group animate-on-scroll relative rounded-xl overflow-hidden aspect-[1/1.2]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20 text-white">
              <Clock className="w-12 h-12 mb-4 text-white/70" />
              <h3 className="text-2xl font-display font-medium mb-2">Beanies</h3>
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium tracking-wider uppercase mb-4">
                Coming Soon
              </div>
              <p className="text-white/80 text-center mb-2 max-w-xs">
                Stay warm with style. Premium beanies for all seasons.
              </p>
              <p className="text-white/70 text-sm text-center">
                Our collection is in development. Check back soon!
              </p>
            </div>
          </div>

          {/* Art Category - Coming Soon */}
          <div className="group animate-on-scroll relative rounded-xl overflow-hidden aspect-[1/1.2]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-bl from-gray-800 to-gray-900"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20 text-white">
              <Clock className="w-12 h-12 mb-4 text-white/70" />
              <h3 className="text-2xl font-display font-medium mb-2">Art & Posters</h3>
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium tracking-wider uppercase mb-4">
                Coming Soon
              </div>
              <p className="text-white/80 text-center mb-2 max-w-xs">
                Transform your space with our curated art collection.
              </p>
              <p className="text-white/70 text-sm text-center">
                Our art collection is in development. Check back soon!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-container bg-secondary/50">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our product categories.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex bg-background/50 rounded-full p-1.5 border">
            <button
              className={cn(
                "px-4 py-1.5 rounded-full text-sm transition-all",
                activeCategory === 'all' 
                  ? "bg-foreground text-background" 
                  : "text-foreground hover:bg-secondary"
              )}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            <button
              className={cn(
                "px-4 py-1.5 rounded-full text-sm transition-all",
                activeCategory === 'jerseys' 
                  ? "bg-foreground text-background" 
                  : "text-foreground hover:bg-secondary"
              )}
              onClick={() => setActiveCategory('jerseys')}
            >
              Jerseys
            </button>
            <button
              className={cn(
                "px-4 py-1.5 rounded-full text-sm transition-all",
                activeCategory === 'beanies' 
                  ? "bg-foreground text-background" 
                  : "text-foreground hover:bg-secondary"
              )}
              onClick={() => setActiveCategory('beanies')}
            >
              Beanies
            </button>
            <button
              className={cn(
                "px-4 py-1.5 rounded-full text-sm transition-all",
                activeCategory === 'art' 
                  ? "bg-foreground text-background" 
                  : "text-foreground hover:bg-secondary"
              )}
              onClick={() => setActiveCategory('art')}
            >
              Art
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activeCategory === 'jerseys' || activeCategory === 'all' ? (
            featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                category={product.category}
                isNew={product.isNew}
                isFeatured={product.isFeatured}
                showPrice={false}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Clock className="w-12 h-12 mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
              <p className="text-muted-foreground text-center max-w-md">
                We're working hard to bring you amazing {activeCategory === 'beanies' ? 'beanies' : 'art & posters'}.
                Check back soon!
              </p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/shop" className="group">
              View All Products
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Why Eksejabula */}
      <section className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">Why Eksejabula?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're more than just a brand. We're a lifestyle built on quality, creativity, and community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-card rounded-xl p-8 shadow-sm border animate-on-scroll">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-medium mb-3">Unique Designs</h3>
            <p className="text-muted-foreground">
              Every product is crafted with creativity and attention to detail, ensuring you stand out from the crowd.
            </p>
          </div>
          
          <div className="text-center bg-card rounded-xl p-8 shadow-sm border animate-on-scroll">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-medium mb-3">Premium Quality</h3>
            <p className="text-muted-foreground">
              We use only the highest quality materials to ensure our products last and maintain their beauty.
            </p>
          </div>
          
          <div className="text-center bg-card rounded-xl p-8 shadow-sm border animate-on-scroll">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-medium mb-3">Sustainable Practices</h3>
            <p className="text-muted-foreground">
              Our commitment to the environment means responsible production and minimal waste.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Follow Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join the Eksejabula community on Instagram.
            </p>
          </div>
          
          <InstagramFeed postCount={6} />
          
          <div className="text-center mt-10">
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <a 
                href="https://www.instagram.com/eksejabula?igsh=cndqOW8zczNwdTM4&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                Follow @eksejabula
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-foreground text-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
              Join Our Community
            </h2>
            <p className="text-background/80 mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter for exclusive offers, new releases, and creative inspiration.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-md bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <Button 
                className="bg-white text-foreground hover:bg-white/90"
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            {submitMessage && (
              <p className="mt-4 text-sm text-background/90">{submitMessage}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
