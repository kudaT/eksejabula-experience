
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setSubmitting(true);
    
    try {
      // Send to subscribe endpoint
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setEmail('');
        setMessage('Thank you for subscribing!');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
                href="https://www.facebook.com/share/1AGxyQ2obK/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a 
                href="https://www.instagram.com/eksejabula?igsh=cndqOW8zczNwdTM4&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a 
                href="https://x.com/eksejabula?s=21" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition"
                aria-label="Twitter/X"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-1-4.8 4-8.9 8-5 1.6-1 3-2.2 4-4z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href="https://www.tiktok.com/@ekse.jabula?_t=ZM-8u6y2cuyzi9&_r=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                  <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                  <path d="M15 8v9c0 1.657-1.343 3-3 3" />
                  <path d="M9 12v-3h7.5" />
                </svg>
                <span className="sr-only">TikTok</span>
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
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex space-x-2">
                <Input 
                  placeholder="Your email" 
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button size="icon" type="submit" disabled={submitting}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              {message && (
                <p className="text-sm text-background/90 mt-2">{message}</p>
              )}
            </form>
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
