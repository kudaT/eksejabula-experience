import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, ShieldCheck, RefreshCw } from 'lucide-react';
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
    imageUrl: 'https://images.unsplash.com/photo-1577280927879-b2f0b15c5409',
    category: 'Jerseys',
    isNew: true,
  },
  {
    id: '2',
    name: 'Los Vega Away Jersey',
    price: 599,
    imageUrl: 'https://images.unsplash.com/photo-1580087632545-b497holdings34a0a74',
    category: 'Jerseys',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Premium Beanie - Black',
    price: 249,
    imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531',
    category: 'Beanies',
  },
  {
    id: '4',
    name: 'Street Art Print',
    price: 349,
    imageUrl: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249',
    category: 'Art',
    discount: 15,
  },
];

// Product categories
const productCategories = [
  {
    name: 'Jerseys',
    imageUrl: 'https://images.unsplash.com/photo-1580087632545-b497034a0a74',
    slug: 'jerseys',
  },
  {
    name: 'Beanies',
    imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531',
    slug: 'beanies',
  },
  {
    name: 'Art & Posters',
    imageUrl: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249',
    slug: 'art',
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
        imageUrl="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
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
              src="https://images.unsplash.com/photo-1580087632545-b497034a0a74"
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

          {/* Beanies Category */}
          <div className="group animate-on-scroll relative rounded-xl overflow-hidden aspect-[1/1.2]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531"
              alt="Beanies"
              className="object-cover h-full w-full transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
              <h3 className="text-2xl font-display font-medium mb-2">Beanies</h3>
              <p className="text-white/80 mb-4">
                Stay warm with style. Premium beanies for all seasons.
              </p>
              <Button 
                asChild
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Link to="/shop?category=beanies" className="group/btn">
                  Explore
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Art Category */}
          <div className="group animate-on-scroll relative rounded-xl overflow-hidden aspect-[1/1.2]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1561839561-b13bcfe95249"
              alt="Art"
              className="object-cover h-full w-full transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
              <h3 className="text-2xl font-display font-medium mb-2">Art & Posters</h3>
              <p className="text-white/80 mb-4">
                Transform your space with our curated art collection.
              </p>
              <Button 
                asChild
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Link to="/shop?category=art" className="group/btn">
                  Explore
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
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
          {productCategories
            .filter(category => activeCategory === 'all' || 
              category.slug === activeCategory)
            .map((category, index) => (
              <Link 
                to={`/shop?category=${category.slug}`} 
                key={index}
                className="group animate-on-scroll rounded-lg overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={category.imageUrl} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <h3 className="text-white font-medium text-lg">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
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
