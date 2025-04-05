
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, ShieldAlert, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";

const Unauthorized = () => {
  const { user, isAdmin, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out"
      });
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
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
        description: "Your profile data has been updated"
      });
      
      // If user is admin after refresh, redirect to admin
      if (isAdmin) {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
      toast({
        title: "Error",
        description: "Could not refresh profile data",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 max-w-md w-full shadow-sm">
        <ShieldAlert className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-8">
          You don't have permission to access this page.
        </p>
        
        {user ? (
          <div className="bg-card p-4 rounded-md mb-6 flex items-center gap-4">
            <div className="bg-muted rounded-full p-3">
              <UserRound className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="font-medium">{user.full_name || 'User'}</p>
              <p className="text-sm text-muted-foreground">Role: {user.role || 'Unknown'}</p>
              <p className="text-sm text-muted-foreground">Admin status: {isAdmin ? 'Yes' : 'No'}</p>
            </div>
          </div>
        ) : null}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" /> Return Home
            </Link>
          </Button>
          
          {user ? (
            <>
              <Button variant="default" onClick={handleRefreshProfile}>
                Refresh Profile
              </Button>
              <Button variant="secondary" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button asChild variant="default">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
      
      <div className="mt-8 max-w-md text-center text-sm text-muted-foreground">
        <p className="mb-4">
          <strong>Troubleshooting:</strong> If you should have admin access but don't, try refreshing your profile or signing out and back in.
        </p>
        {isAdmin && (
          <Button asChild variant="link" className="text-primary">
            <Link to="/admin">Go to Admin Dashboard</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Unauthorized;
