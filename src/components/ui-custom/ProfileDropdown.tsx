
import { User, Settings, Package, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProfileDropdownProps {
  isLoggedIn?: boolean;
  username?: string;
  avatarUrl?: string;
  onSignOut?: () => void;
}

const ProfileDropdown = ({
  isLoggedIn = false,
  username,
  avatarUrl,
  onSignOut,
}: ProfileDropdownProps) => {
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
        <DropdownMenuLabel>Guest User</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/admin" className="cursor-pointer flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Admin Dashboard</span>
          </Link>
        </DropdownMenuItem>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
