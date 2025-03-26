
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Menu, ShoppingCart, User, LogOut, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and Desktop Nav */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center text-xl font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 mr-2"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
              Eksejabula
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
              <Link to="/shop" className="text-gray-700 hover:text-primary">Shop</Link>
              <Link to="/blog" className="text-gray-700 hover:text-primary">Blog</Link>
              <Link to="/los-vega" className="text-gray-700 hover:text-primary">About</Link>
            </div>
          </div>

          {/* Desktop Auth and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar>
                      <AvatarImage src={user.avatar_url || undefined} alt={user.full_name || 'User'} />
                      <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.full_name || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email || 'No email'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer w-full">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer w-full">
                        <Lock className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="mr-2">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-6 py-6">
                  <Link 
                    to="/" 
                    className="flex items-center gap-2 text-lg font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    Home
                  </Link>
                  <Link 
                    to="/shop" 
                    className="flex items-center gap-2 text-lg font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Shop
                  </Link>
                  <Link 
                    to="/blog" 
                    className="flex items-center gap-2 text-lg font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link 
                    to="/los-vega" 
                    className="flex items-center gap-2 text-lg font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  
                  {user ? (
                    <>
                      <div className="border-t pt-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Avatar>
                            <AvatarImage src={user.avatar_url || undefined} alt={user.full_name || 'User'} />
                            <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.full_name || 'User'}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Button 
                            variant="outline" 
                            className="justify-start"
                            onClick={() => {
                              setIsOpen(false);
                              navigate('/dashboard');
                            }}
                          >
                            <User className="mr-2 h-4 w-4" />
                            Dashboard
                          </Button>
                          
                          {isAdmin && (
                            <Button 
                              variant="outline" 
                              className="justify-start"
                              onClick={() => {
                                setIsOpen(false);
                                navigate('/admin');
                              }}
                            >
                              <Lock className="mr-2 h-4 w-4" />
                              Admin Panel
                            </Button>
                          )}
                          
                          <Button 
                            variant="outline" 
                            className="justify-start"
                            onClick={() => {
                              handleSignOut();
                              setIsOpen(false);
                            }}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Button 
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/auth');
                      }}
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
