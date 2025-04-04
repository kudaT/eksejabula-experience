
import { useState, useEffect } from 'react';
import HeroSection from '@/components/ui-custom/HeroSection';
import FeaturedCategories from '@/components/ui-custom/featured-sections/FeaturedCategories';
import FeaturedProducts from '@/components/ui-custom/featured-sections/FeaturedProducts';
import FeatureHighlights from '@/components/ui-custom/featured-sections/FeatureHighlights';
import SocialFeedSection from '@/components/ui-custom/featured-sections/SocialFeedSection';
import NewsletterSection from '@/components/ui-custom/featured-sections/NewsletterSection';

// Sample product data
const featuredProducts = [
  {
    id: '1',
    name: 'Los Vega Red and Navy',
    price: 599,
    imageUrl: '/lovable-uploads/5543d787-c616-440f-8393-d7b31f0aa342.png',
    category: 'Jerseys',
    isNew: true,
  },
  {
    id: '2',
    name: 'Los Vega White and Gold',
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
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <FeaturedCategories categories={productCategories} />

      {/* Featured Products */}
      <FeaturedProducts products={featuredProducts} showPrice={false} />

      {/* Why Eksejabula */}
      <FeatureHighlights />

      {/* Instagram Feed */}
      <SocialFeedSection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};

export default Index;
