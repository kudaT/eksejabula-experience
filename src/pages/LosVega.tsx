
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Palette, Users, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import HeroSection from '@/components/ui-custom/HeroSection';
import TestimonialCard from '@/components/ui-custom/TestimonialCard';

// Sample image gallery
const galleryImages = [
  { url: 'https://images.unsplash.com/photo-1577280927879-b2f0b15c5409', alt: 'Los Vega Jersey 1', size: 'large' },
  { url: 'https://images.unsplash.com/photo-1580087632545-b497034a0a74', alt: 'Los Vega Jersey 2', size: 'small' },
  { url: 'https://images.unsplash.com/photo-1541051595295-e0e3ad01db18', alt: 'Los Vega Jersey 3', size: 'small' },
  { url: 'https://images.unsplash.com/photo-1521150932951-303a95503ed3', alt: 'Los Vega Jersey 4', size: 'medium' },
  { url: 'https://images.unsplash.com/photo-1553859943-a02c5418b798', alt: 'Los Vega Jersey 5', size: 'medium' },
  { url: 'https://images.unsplash.com/photo-1553859937-1bd92ee053c9', alt: 'Los Vega Jersey 6', size: 'small' },
];

// Sample testimonials
const testimonials = [
  {
    quote: "Los Vega jerseys have become a staple in my wardrobe. The designs are so unique, I get compliments everywhere I go!",
    author: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    quote: "I love how these jerseys blend sport culture with artistic expression. It's like wearing a piece of art.",
    author: "Jessica Williams",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
  {
    quote: "The quality is amazing and the fit is perfect. I've never had a jersey that feels this comfortable while looking so cool.",
    author: "David Rodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  },
];

const LosVega = () => {
  const [isGalleryLoaded, setIsGalleryLoaded] = useState(false);

  useEffect(() => {
    // Simulate gallery loading after component mounts
    const timer = setTimeout(() => {
      setIsGalleryLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <HeroSection 
        title="Los Vega"
        subtitle="The Club"
        description="A club for those who believe jerseys are more than sportswear — they're canvases for artistic expression."
        ctaText="Shop Jersey Collection"
        ctaLink="/shop?category=jerseys"
        secondaryCtaText="About The Club"
        secondaryCtaLink="#about"
        imageUrl="https://images.unsplash.com/photo-1615397349754-cfa2066a298e"
        alignment="left"
        size="large"
      />

      {/* About Los Vega */}
      <section id="about" className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium tracking-wider uppercase mb-6">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">Where Sport Meets Art</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Los Vega began as a passionate project by a group of artists and sports enthusiasts who saw the potential of the jersey as a medium for creative expression.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Today, we're a vibrant community that celebrates the intersection of sport, art, and fashion through uniquely designed jerseys that tell stories and make statements.
            </p>
            <Button asChild size="lg">
              <Link to="/blog/los-vega-story" className="group">
                Read Our Full Story
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden animate-on-scroll">
            <img 
              src="https://images.unsplash.com/photo-1526997747035-f4c991fbdb2a" 
              alt="Los Vega Team" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="font-medium text-lg">The Los Vega Team</p>
              <p className="text-white/80">Creators, designers, and visionaries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Values */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">Our Core Values</h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do at Los Vega.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-8 shadow-sm border text-center animate-on-scroll">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-medium mb-4">Creativity</h3>
              <p className="text-muted-foreground">
                We push boundaries with bold designs that challenge conventional sportswear. Every jersey is a unique work of art.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-8 shadow-sm border text-center animate-on-scroll">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-medium mb-4">Community</h3>
              <p className="text-muted-foreground">
                More than customers, Los Vega wearers are part of a global community that shares a passion for sport, art, and expression.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-8 shadow-sm border text-center animate-on-scroll">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smile className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-medium mb-4">Fun</h3>
              <p className="text-muted-foreground">
                We don't take ourselves too seriously. Los Vega is about enjoying the freedom of expression and the joy of standing out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Jersey Gallery */}
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">Our Designs</h2>
          <p className="text-muted-foreground">
            Explore our collection of unique jersey designs, each telling its own story.
          </p>
        </div>
        
        <div 
          className={cn(
            "grid grid-cols-2 md:grid-cols-3 gap-4 transition-opacity duration-700",
            isGalleryLoaded ? "opacity-100" : "opacity-0"
          )}
        >
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className={cn(
                "rounded-xl overflow-hidden bg-secondary",
                image.size === 'large' && "col-span-2 row-span-2",
                image.size === 'medium' && "col-span-1 row-span-2",
                image.size === 'small' && "col-span-1 row-span-1",
                "animate-on-scroll"
              )}
            >
              <a 
                href={`/shop?category=jerseys`}
                className="block w-full h-full group relative"
              >
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-300 flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                    View Collection
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-transparent to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">What Los Vega Fans Say</h2>
            <p className="text-muted-foreground">
              Hear from the community of Los Vega jersey enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                {...testimonial} 
                className="animate-on-scroll" 
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/shop?category=jerseys" className="group">
                Shop Los Vega Jerseys
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">
              Join The Club
            </h2>
            <p className="text-background/80 text-lg mb-8 max-w-xl mx-auto">
              Become part of the Los Vega community. Get your jersey today and express your unique style.
            </p>
            <Button 
              asChild 
              size="lg"
              className="bg-white text-foreground hover:bg-white/90"
            >
              <Link to="/shop?category=jerseys">
                Get Your Jersey Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LosVega;
