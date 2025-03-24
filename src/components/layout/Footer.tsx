
import { Link } from 'react-router-dom';
import { Instagram, Facebook, TikTok, Twitter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-medium">Eksejabula</h3>
            <p className="text-background/80 max-w-xs">
              Lifestyle, fashion, and art that celebrates creativity and self-expression.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition"
              >
                <TikTok className="h-5 w-5" />
                <span className="sr-only">TikTok</span>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop?category=jerseys" className="text-background/80 hover:text-background transition">
                  Jerseys
                </Link>
              </li>
              <li>
                <Link to="/shop?category=beanies" className="text-background/80 hover:text-background transition">
                  Beanies
                </Link>
              </li>
              <li>
                <Link to="/shop?category=art" className="text-background/80 hover:text-background transition">
                  Art & Posters
                </Link>
              </li>
              <li>
                <Link to="/shop/new-arrivals" className="text-background/80 hover:text-background transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop/best-sellers" className="text-background/80 hover:text-background transition">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-background/80 hover:text-background transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-background/80 hover:text-background transition">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-background/80 hover:text-background transition">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-background/80 hover:text-background transition">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/80 hover:text-background transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4">Subscribe</h4>
            <p className="text-background/80 mb-4">
              Stay updated with our latest collections and stories.
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Your email" 
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-background/60">
                &copy; {currentYear} Eksejabula. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4 text-sm text-background/60">
              <Link to="/privacy" className="hover:text-background transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-background transition">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-background transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
