
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageUrl?: string;
  alignment?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const HeroSection = ({
  title,
  subtitle,
  description,
  ctaText = 'Shop Now',
  ctaLink = '/shop',
  secondaryCtaText,
  secondaryCtaLink,
  imageUrl = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
  alignment = 'center',
  size = 'large',
  className,
}: HeroSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      className={cn(
        "relative w-full overflow-hidden",
        size === 'small' && 'py-12 md:py-16',
        size === 'medium' && 'py-16 md:py-24',
        size === 'large' && 'py-20 md:py-32 min-h-[80vh] flex items-center',
        className
      )}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 z-10" />
        <img
          src={imageUrl}
          alt="Hero Background"
          className={cn(
            "object-cover w-full h-full transition-all duration-1000",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
          )}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {/* Content Container */}
      <div className="container relative z-20">
        <div 
          className={cn(
            "max-w-3xl text-white transition-all duration-700 delay-300 transform",
            alignment === 'left' && 'text-left ml-0 mr-auto',
            alignment === 'center' && 'text-center mx-auto',
            alignment === 'right' && 'text-right mr-0 ml-auto',
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          {subtitle && (
            <div className="mb-3 inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium tracking-wider uppercase">
              {subtitle}
            </div>
          )}
          <h1 className={cn(
            "hero-title mb-4",
            size === 'small' && 'text-3xl md:text-4xl',
            size === 'medium' && 'text-4xl md:text-5xl',
            size === 'large' && 'text-5xl md:text-6xl lg:text-7xl'
          )}>
            {title}
          </h1>
          {description && (
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl mx-auto">
              {description}
            </p>
          )}
          <div className={cn(
            "flex gap-4 mt-6",
            alignment === 'center' && 'justify-center',
            alignment === 'right' && 'justify-end',
          )}>
            <Button 
              asChild
              size="lg"
              className="group bg-white text-black hover:bg-white/90 font-medium"
            >
              <Link to={ctaLink}>
                {ctaText}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            {secondaryCtaText && secondaryCtaLink && (
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 font-medium"
              >
                <Link to={secondaryCtaLink}>
                  {secondaryCtaText}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
