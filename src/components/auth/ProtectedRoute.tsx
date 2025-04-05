
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Array<'admin' | 'customer'>;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  allowedRoles = [],
  redirectTo = '/auth'
}: ProtectedRouteProps) => {
  const { session, user, loading, isAdmin } = useAuth();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [checkingAuthorization, setCheckingAuthorization] = useState(true);

  // Debug information
  useEffect(() => {
    console.log('ProtectedRoute - Auth State:', { 
      session: !!session, 
      user, 
      loading, 
      isAdmin, 
      allowedRoles,
      path: location.pathname
    });
  }, [session, user, loading, isAdmin, allowedRoles, location.pathname]);

  useEffect(() => {
    // Only check authorization if we have a session and user
    if (!loading && session && user) {
      console.log('ProtectedRoute - Checking authorization:', { 
        allowedRoles, 
        userRole: user.role,
        isAdmin
      });
      
      // If no roles are required, the user is authorized
      if (allowedRoles.length === 0) {
        setIsAuthorized(true);
        setCheckingAuthorization(false);
        return;
      }

      // Force update for admin routes if the user is an admin
      if (location.pathname.startsWith('/admin') && isAdmin) {
        console.log('Admin accessing admin route - automatically authorizing');
        setIsAuthorized(true);
        setCheckingAuthorization(false);
        return;
      }

      // Simple role check based on user.role
      if (user.role) {
        const hasRequiredRole = allowedRoles.includes(user.role as 'admin' | 'customer');
        console.log('Has required role?', hasRequiredRole);
        setIsAuthorized(hasRequiredRole);
      } else {
        setIsAuthorized(false);
      }
      
      setCheckingAuthorization(false);
    } else if (!loading && (!session || !user)) {
      // User is not authenticated
      console.log('ProtectedRoute - User not authenticated');
      setIsAuthorized(false);
      setCheckingAuthorization(false);
    }
  }, [loading, session, user, allowedRoles, isAdmin, location.pathname]);

  // Show loading while checking authentication and authorization
  if (loading || checkingAuthorization) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background/50 px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!session || !user) {
    // Save the current location they were trying to go to
    toast({
      title: "Authentication required",
      description: "Please sign in to continue",
    });
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Not authorized for this route
  if (isAuthorized === false) {
    console.log('User not authorized, redirecting to appropriate page');
    toast({
      title: "Access denied",
      description: "You don't have permission to access this page",
      variant: "destructive",
    });
    
    // Handle redirect based on role
    if (isAdmin) {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // User is authenticated and authorized
  return <>{children}</>;
};

export default ProtectedRoute;
