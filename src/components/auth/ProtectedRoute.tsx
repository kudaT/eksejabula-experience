
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Array<'admin' | 'customer'>;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  allowedRoles = ['admin', 'customer'],
  redirectTo = '/sign-in'
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  // Enhanced authentication check with feedback
  useEffect(() => {
    if (!loading && !user && location.pathname !== redirectTo) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
    } else if (!loading && user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page",
        variant: "destructive",
      });
    }
  }, [loading, user, location.pathname, redirectTo, allowedRoles, toast]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If not authenticated, redirect to sign-in page
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If role is required and user doesn't have the allowed role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
