
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ShoppingCart, User, ChevronDown, 
  LogOut, Settings, Package, Home, Newspaper, ShoppingBag,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import CartDropdown from '../ui-custom/CartDropdown';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const { user, isAdmin, signOut, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (show !== isScrolled) setIsScrolled(show);
    };
    
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/80 backdrop-blur-md shadow-sm border-b" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-display font-bold tracking-tight relative z-10"
          >
            Eksejabula
          </Link>

          {/* Centered Navigation */}
          <div className="flex-1 flex justify-center">
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/los-vega" className="nav-link">
                    Los Vega
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/blog" className="nav-link">
                    Blog
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/shop" className="nav-link">
                    Shop
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Cart Icon with Badge */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative ml-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <CartDropdown />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="ml-2"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuLabel>
                      {user.full_name ? `Hello, ${user.full_name}` : 'My Account'}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link 
                          to="/admin" 
                          className="flex items-center cursor-pointer"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/account" 
                        className="flex items-center cursor-pointer"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Account Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/orders" 
                        className="flex items-center cursor-pointer"
                      >
                        <Package className="mr-2 h-4 w-4" />
                        <span>Orders</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={signOut}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/sign-in" 
                        className="flex items-center cursor-pointer"
                      >
                        <span>Sign In</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link 
                        to="/sign-in?tab=register" 
                        className="flex items-center cursor-pointer"
                      >
                        <span>Register</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            className="md:hidden" 
            size="icon" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out transform md:hidden",
        isMenuOpen ? "translate-x-0" : "translate-x-full",
        "pt-16"
      )}>
        <div className="container h-full flex flex-col">
          <nav className="py-8 flex flex-col space-y-6">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-lg px-2"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link 
              to="/los-vega" 
              className="flex items-center space-x-2 text-lg px-2"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Los Vega</span>
            </Link>
            <Link 
              to="/blog" 
              className="flex items-center space-x-2 text-lg px-2"
            >
              <Newspaper className="h-5 w-5" />
              <span>Blog</span>
            </Link>
            <Link 
              to="/shop" 
              className="flex items-center space-x-2 text-lg px-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Shop</span>
            </Link>
            
            {isAdmin && (
              <Link 
                to="/admin" 
                className="flex items-center space-x-2 text-lg px-2 text-primary"
              >
                <Shield className="h-5 w-5" />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </nav>

          <div className="mt-auto pb-8 pt-4 border-t">
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Account</span>
              </div>
              {user ? (
                <Button 
                  variant="ghost" 
                  onClick={signOut}
                >
                  Sign Out
                </Button>
              ) : (
                <Link to="/sign-in">
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

