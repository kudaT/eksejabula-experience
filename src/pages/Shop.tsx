
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SlidersHorizontal, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ui-custom/ProductCard';
import { toast } from 'sonner';

// Updated product data with new images
const productData = [
  {
    id: '1',
    name: 'Los Vega Home Jersey',
    price: 599,
    imageUrl: '/lovable-uploads/fb1e25b1-d14f-4fb3-bb21-8a1b63caba9a.png',
    category: 'Jerseys',
    isNew: true,
    isSoldOut: false,
    priceToBeUpdated: true,
  },
  {
    id: '2',
    name: 'Los Vega White & Gold Jersey',
    price: 599,
    imageUrl: '/lovable-uploads/6bb9dccc-e52b-4b08-a071-cc15b78708b5.png',
    category: 'Jerseys',
    isFeatured: true,
    isSoldOut: false,
    priceToBeUpdated: true,
  },
  {
    id: '3',
    name: 'Los Vega Special Edition',
    price: 599,
    discount: 10,
    imageUrl: '/lovable-uploads/693c7831-6859-43e3-8db5-a4c81a400126.png',
    category: 'Jerseys',
    isSoldOut: false,
    priceToBeUpdated: true,
  },
  {
    id: '10',
    name: 'Los Vega Limited Edition Jersey',
    price: 799,
    imageUrl: '/lovable-uploads/b2047f5e-aca1-4dfe-8f68-948c9fed3e09.png',
    category: 'Jerseys',
    isFeatured: true,
    isSoldOut: false,
    priceToBeUpdated: true,
  },
  {
    id: '11',
    name: 'Los Vega White & Gold Design',
    price: 599,
    imageUrl: '/lovable-uploads/a418d18e-fcf2-463b-9676-dac065115595.png',
    category: 'Jerseys',
    isNew: true,
    isSoldOut: false,
    priceToBeUpdated: true,
  },
  {
    id: '12',
    name: 'Los Vega Black & Gold Edition',
    price: 599,
    imageUrl: '/lovable-uploads/5145cd4a-8f99-49b0-a010-d82ba511d7fa.png',
    category: 'Jerseys',
    isNew: true,
    isSoldOut: false,
    priceToBeUpdated: true,
  },
];

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState('newest');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [availabilityFilters, setAvailabilityFilters] = useState({
    inStock: false,
    newArrivals: false,
    onSale: false,
    featured: false,
  });
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFiltersCount, setSelectedFiltersCount] = useState(0);

  useEffect(() => {
    const category = queryParams.get('category') || 'all';
    setActiveCategory(category);
  }, [location.search]);

  useEffect(() => {
    let result = [...productData];
    
    if (activeCategory !== 'all') {
      result = result.filter(
        product => product.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    
    if (availabilityFilters.inStock) {
      result = result.filter(product => !product.isSoldOut);
    }
    
    if (availabilityFilters.newArrivals) {
      result = result.filter(product => product.isNew);
    }
    
    if (availabilityFilters.onSale) {
      result = result.filter(product => product.discount && product.discount > 0);
    }
    
    if (availabilityFilters.featured) {
      result = result.filter(product => product.isFeatured);
    }
    
    result = result.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    switch(sortOption) {
      case 'price-low':
        result.sort((a, b) => {
          const aPrice = a.discount ? a.price - (a.price * (a.discount / 100)) : a.price;
          const bPrice = b.discount ? b.price - (b.price * (b.discount / 100)) : b.price;
          return aPrice - bPrice;
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          const aPrice = a.discount ? a.price - (a.price * (a.discount / 100)) : a.price;
          const bPrice = b.discount ? b.price - (b.price * (b.discount / 100)) : b.price;
          return bPrice - aPrice;
        });
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case 'popular':
        result.sort((a, b) => (a.isFeatured === b.isFeatured) ? 0 : a.isFeatured ? -1 : 1);
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
    
    let count = 0;
    if (availabilityFilters.inStock) count++;
    if (availabilityFilters.newArrivals) count++;
    if (availabilityFilters.onSale) count++;
    if (availabilityFilters.featured) count++;
    if (priceRange.min > 0 || priceRange.max < 1000) count++;
    
    setSelectedFiltersCount(count);
  }, [activeCategory, sortOption, priceRange, availabilityFilters]);

  const clearAllFilters = () => {
    setActiveCategory('all');
    setPriceRange({ min: 0, max: 1000 });
    setAvailabilityFilters({
      inStock: false,
      newArrivals: false,
      onSale: false,
      featured: false,
    });
    setSortOption('newest');
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Show "Coming Soon" toast for non-Jersey categories
    if (category === 'beanies' || category === 'art') {
      toast.info(
        `${category === 'beanies' ? 'Beanies' : 'Art & Posters'} coming soon!`,
        {
          description: "We're working on adding these products to our collection."
        }
      );
    }
  };

  return (
    <div className="pt-8 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-display font-medium mb-4">
            Shop Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our unique collection of jerseys, beanies, and art prints, all designed with creativity and quality in mind.
          </p>
        </div>

        <div className="md:hidden mb-6 animate-slide-up">
          <div className="overflow-x-auto pb-2 flex space-x-2">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              onClick={() => handleCategoryChange('all')}
              className="rounded-full flex-shrink-0"
            >
              All
            </Button>
            <Button
              variant={activeCategory === 'jerseys' ? 'default' : 'outline'}
              onClick={() => handleCategoryChange('jerseys')}
              className="rounded-full flex-shrink-0"
            >
              Jerseys
            </Button>
            <Button
              variant={activeCategory === 'beanies' ? 'default' : 'outline'}
              onClick={() => handleCategoryChange('beanies')}
              className="rounded-full flex-shrink-0"
            >
              Beanies
            </Button>
            <Button
              variant={activeCategory === 'art' ? 'default' : 'outline'}
              onClick={() => handleCategoryChange('art')}
              className="rounded-full flex-shrink-0"
            >
              Art
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block animate-slide-in-right">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-3">Categories</h3>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start px-3",
                      activeCategory === 'all' && "bg-secondary"
                    )}
                    onClick={() => handleCategoryChange('all')}
                  >
                    All Products
                  </Button>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start px-3",
                      activeCategory === 'jerseys' && "bg-secondary"
                    )}
                    onClick={() => handleCategoryChange('jerseys')}
                  >
                    Jerseys
                  </Button>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start px-3",
                      activeCategory === 'beanies' && "bg-secondary"
                    )}
                    onClick={() => handleCategoryChange('beanies')}
                  >
                    Beanies
                  </Button>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start px-3",
                      activeCategory === 'art' && "bg-secondary"
                    )}
                    onClick={() => handleCategoryChange('art')}
                  >
                    Art & Posters
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-lg mb-3">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="in-stock"
                      checked={availabilityFilters.inStock}
                      onCheckedChange={(checked) => 
                        setAvailabilityFilters({
                          ...availabilityFilters,
                          inStock: !!checked
                        })
                      }
                    />
                    <label htmlFor="in-stock" className="ml-2 text-sm font-medium">
                      In Stock
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="new-arrivals"
                      checked={availabilityFilters.newArrivals}
                      onCheckedChange={(checked) => 
                        setAvailabilityFilters({
                          ...availabilityFilters,
                          newArrivals: !!checked
                        })
                      }
                    />
                    <label htmlFor="new-arrivals" className="ml-2 text-sm font-medium">
                      New Arrivals
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="on-sale"
                      checked={availabilityFilters.onSale}
                      onCheckedChange={(checked) => 
                        setAvailabilityFilters({
                          ...availabilityFilters,
                          onSale: !!checked
                        })
                      }
                    />
                    <label htmlFor="on-sale" className="ml-2 text-sm font-medium">
                      On Sale
                    </label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="featured"
                      checked={availabilityFilters.featured}
                      onCheckedChange={(checked) => 
                        setAvailabilityFilters({
                          ...availabilityFilters,
                          featured: !!checked
                        })
                      }
                    />
                    <label htmlFor="featured" className="ml-2 text-sm font-medium">
                      Featured
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-lg mb-4">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-20">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                      className="w-full px-2 py-1 border rounded text-sm"
                      min="0"
                      max={priceRange.max}
                    />
                  </div>
                  <span className="text-muted-foreground">to</span>
                  <div className="w-20">
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                      className="w-full px-2 py-1 border rounded text-sm"
                      min={priceRange.min}
                      max="1000"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <p className="text-muted-foreground hidden sm:block mr-2">
                  {filteredProducts.length} products
                </p>
                {selectedFiltersCount > 0 && (
                  <Badge variant="outline" className="ml-2">
                    {selectedFiltersCount} filter{selectedFiltersCount > 1 ? 's' : ''} applied
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden flex items-center">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {selectedFiltersCount > 0 && (
                        <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                          {selectedFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-4 space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-3">Categories</h3>
                        <div className="space-y-2">
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start px-3",
                              activeCategory === 'all' && "bg-secondary"
                            )}
                            onClick={() => {
                              handleCategoryChange('all');
                              setMobileFiltersOpen(false);
                            }}
                          >
                            All Products
                          </Button>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start px-3",
                              activeCategory === 'jerseys' && "bg-secondary"
                            )}
                            onClick={() => {
                              handleCategoryChange('jerseys');
                              setMobileFiltersOpen(false);
                            }}
                          >
                            Jerseys
                          </Button>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start px-3",
                              activeCategory === 'beanies' && "bg-secondary"
                            )}
                            onClick={() => {
                              handleCategoryChange('beanies');
                              setMobileFiltersOpen(false);
                            }}
                          >
                            Beanies
                          </Button>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start px-3",
                              activeCategory === 'art' && "bg-secondary"
                            )}
                            onClick={() => {
                              handleCategoryChange('art');
                              setMobileFiltersOpen(false);
                            }}
                          >
                            Art & Posters
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-lg mb-3">Availability</h3>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Checkbox
                              id="mobile-in-stock"
                              checked={availabilityFilters.inStock}
                              onCheckedChange={(checked) => 
                                setAvailabilityFilters({
                                  ...availabilityFilters,
                                  inStock: !!checked
                                })
                              }
                            />
                            <label htmlFor="mobile-in-stock" className="ml-2 text-sm font-medium">
                              In Stock
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox
                              id="mobile-new-arrivals"
                              checked={availabilityFilters.newArrivals}
                              onCheckedChange={(checked) => 
                                setAvailabilityFilters({
                                  ...availabilityFilters,
                                  newArrivals: !!checked
                                })
                              }
                            />
                            <label htmlFor="mobile-new-arrivals" className="ml-2 text-sm font-medium">
                              New Arrivals
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox
                              id="mobile-on-sale"
                              checked={availabilityFilters.onSale}
                              onCheckedChange={(checked) => 
                                setAvailabilityFilters({
                                  ...availabilityFilters,
                                  onSale: !!checked
                                })
                              }
                            />
                            <label htmlFor="mobile-on-sale" className="ml-2 text-sm font-medium">
                              On Sale
                            </label>
                          </div>
                          <div className="flex items-center">
                            <Checkbox
                              id="mobile-featured"
                              checked={availabilityFilters.featured}
                              onCheckedChange={(checked) => 
                                setAvailabilityFilters({
                                  ...availabilityFilters,
                                  featured: !!checked
                                })
                              }
                            />
                            <label htmlFor="mobile-featured" className="ml-2 text-sm font-medium">
                              Featured
                            </label>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium text-lg mb-4">Price Range</h3>
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-20">
                            <input
                              type="number"
                              value={priceRange.min}
                              onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                              className="w-full px-2 py-1 border rounded text-sm"
                              min="0"
                              max={priceRange.max}
                            />
                          </div>
                          <span className="text-muted-foreground">to</span>
                          <div className="w-20">
                            <input
                              type="number"
                              value={priceRange.max}
                              onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                              className="w-full px-2 py-1 border rounded text-sm"
                              min={priceRange.min}
                              max="1000"
                            />
                          </div>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          clearAllFilters();
                          setMobileFiltersOpen(false);
                        }}
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>

                <Select 
                  value={sortOption} 
                  onValueChange={setSortOption}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {(priceRange.min > 0 || priceRange.max < 1000) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Price: R{priceRange.min} - R{priceRange.max}
                    <button 
                      onClick={() => setPriceRange({ min: 0, max: 1000 })}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {availabilityFilters.inStock && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    In Stock
                    <button 
                      onClick={() => setAvailabilityFilters({...availabilityFilters, inStock: false})}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {availabilityFilters.newArrivals && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    New Arrivals
                    <button 
                      onClick={() => setAvailabilityFilters({...availabilityFilters, newArrivals: false})}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {availabilityFilters.onSale && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    On Sale
                    <button 
                      onClick={() => setAvailabilityFilters({...availabilityFilters, onSale: false})}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {availabilityFilters.featured && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Featured
                    <button 
                      onClick={() => setAvailabilityFilters({...availabilityFilters, featured: false})}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  className="text-sm h-7 px-2"
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
              </div>
            )}

            {(activeCategory === 'beanies' || activeCategory === 'art') ? (
              <div className="text-center py-16 bg-secondary/50 rounded-xl">
                <Clock className="w-12 h-12 mb-4 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We're working hard to bring you amazing {activeCategory === 'beanies' ? 'beanies' : 'art & posters'}.
                  Check back soon!
                </p>
                <Button onClick={() => setActiveCategory('jerseys')}>
                  View Available Jerseys
                </Button>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} {...product} showPrice={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-secondary/50 rounded-xl">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

