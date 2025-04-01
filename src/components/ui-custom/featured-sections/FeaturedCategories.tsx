
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductCategory {
  name: string;
  imageUrl: string;
  slug: string;
  comingSoon?: boolean;
}

interface FeaturedCategoriesProps {
  categories: ProductCategory[];
}

const FeaturedCategories = ({ categories }: FeaturedCategoriesProps) => {
  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <h2 className="section-title">Explore Our Categories</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our premium line of products, crafted with quality and designed with passion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
        {categories.map((category) => (
          <React.Fragment key={category.slug}>
            {category.comingSoon ? (
              // Coming Soon Category
              <div className="group animate-on-scroll relative rounded-xl overflow-hidden aspect-[1/1.2]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20 text-white">
                  <Clock className="w-12 h-12 mb-4 text-white/70" />
                  <h3 className="text-2xl font-display font-medium mb-2">{category.name}</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium tracking-wider uppercase mb-4">
                    Coming Soon
                  </div>
                  <p className="text-white/80 text-center mb-2 max-w-xs">
                    {category.slug === 'beanies' 
                      ? 'Stay warm with style. Premium beanies for all seasons.' 
                      : 'Transform your space with our curated art collection.'}
                  </p>
                  <p className="text-white/70 text-sm text-center">
                    Our {category.slug === 'beanies' ? 'collection' : 'art collection'} is in development. Check back soon!
                  </p>
                </div>
              </div>
            ) : (
              // Available Category
              <div className="group animate-on-scroll relative rounded-xl overflow-hidden aspect-[1/1.2]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
                <img 
                  src={category.imageUrl}
                  alt={category.name}
                  className="object-cover h-full w-full transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                  <h3 className="text-2xl font-display font-medium mb-2">{category.name}</h3>
                  <p className="text-white/80 mb-4">
                    Express yourself with our bold and unique {category.name.toLowerCase()} designs.
                  </p>
                  <Button 
                    asChild
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  >
                    <Link to={`/shop?category=${category.slug}`} className="group/btn">
                      Explore
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
