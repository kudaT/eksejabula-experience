
import { User, Settings, Package, Heart, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProfileDropdownProps {
  onSignOut?: () => void;
}

const ProfileDropdown = ({
  onSignOut,
}: ProfileDropdownProps) => {
  const { user, session, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const isLoggedIn = !!session;
  const username = user?.full_name;
  const avatarUrl = user?.avatar_url;
  
  const handleSignOut = async () => {
    try {
      if (onSignOut) {
        onSignOut();
      } else {
        await signOut();
      }
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };
  
  const handleSignIn = () => {
    navigate('/auth');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative focus:ring-0"
        >
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={username || "User profile"} 
              className="h-8 w-8 rounded-full object-cover border-2 border-transparent hover:border-accent transition-colors"
            />
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {isLoggedIn ? (
          <>
            <DropdownMenuLabel>{username || 'User'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link to="/account" className="cursor-pointer flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>My Account</span>
              </Link>
            </DropdownMenuItem>
            
            {isAdmin && (
              <DropdownMenuItem asChild>
                <Link to="/admin" className="cursor-pointer flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin Dashboard</span>
                </Link>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link to="/orders" className="cursor-pointer flex items-center">
                <Package className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link to="/wishlist" className="cursor-pointer flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                <span>Wishlist</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              className="cursor-pointer flex items-center text-red-500 focus:text-red-500"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={handleSignIn}
            >
              Sign In / Register
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link to="/shop" className="cursor-pointer flex items-center">
                <Package className="mr-2 h-4 w-4" />
                <span>Shop</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild>
              <Link to="/blog" className="cursor-pointer flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                <span>Blog</span>
              </Link>
            </DropdownMenuItem>
            
            {/* Show admin link for demo purposes */}
            <DropdownMenuItem asChild>
              <Link to="/admin" className="cursor-pointer flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
