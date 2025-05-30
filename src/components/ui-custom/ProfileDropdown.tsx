
import { User, Settings, Package, Heart, LogOut, RefreshCw } from 'lucide-react';
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
  const { user, session, isAdmin, signOut, refreshUserProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const isLoggedIn = !!session;
  const username = user?.full_name;
  const avatarUrl = user?.avatar_url;
  
  console.log('ProfileDropdown - Auth status:', { isAdmin, userRole: user?.role, isLoggedIn });
  
  const handleSignOut = async () => {
    try {
      if (onSignOut) {
        onSignOut();
      }
      
      // Always call signOut regardless of whether onSignOut is provided
      await signOut();
      
      toast({
        title: "Signed out successfully",
        description: "You have been logged out"
      });
      
      // Redirect to home page after sign out
      navigate('/');
      
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign out failed",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };
  
  const handleRefreshProfile = async () => {
    try {
      await refreshUserProfile();
      toast({
        title: "Profile refreshed",
        description: "Your profile has been updated"
      });
    } catch (error) {
      console.error("Error refreshing profile:", error);
      toast({
        title: "Profile refresh failed",
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
          {isAdmin && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
              A
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {isLoggedIn ? (
          <>
            <DropdownMenuLabel className="flex items-center gap-2">
              {avatarUrl && (
                <img 
                  src={avatarUrl} 
                  alt={username || "User profile"} 
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-medium">{username || 'User'}</p>
                <p className="text-xs text-muted-foreground">Role: {user?.role || 'customer'}</p>
                {isAdmin && <p className="text-xs text-muted-foreground font-semibold text-primary">Administrator</p>}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem asChild>
              <Link to="/account" className="cursor-pointer flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>My Account</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={handleRefreshProfile} className="cursor-pointer flex items-center">
              <RefreshCw className="mr-2 h-4 w-4" />
              <span>Refresh Profile</span>
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
