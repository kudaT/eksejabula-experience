
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

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

  useEffect(() => {
    // Only check authorization if we have a session and user
    if (!loading && session && user) {
      // If no roles are required, the user is authorized
      if (allowedRoles.length === 0) {
        setIsAuthorized(true);
        setCheckingAuthorization(false);
        return;
      }

      // Simple role check based on user.role
      if (user.role) {
        const hasRequiredRole = allowedRoles.includes(user.role as 'admin' | 'customer');
        setIsAuthorized(hasRequiredRole);
      } else {
        setIsAuthorized(false);
      }
      
      setCheckingAuthorization(false);
    } else if (!loading && (!session || !user)) {
      // User is not authenticated
      setIsAuthorized(false);
      setCheckingAuthorization(false);
    }
  }, [loading, session, user, allowedRoles]);

  // Show loading while checking authentication and authorization
  if (loading || checkingAuthorization) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Not authenticated
  if (!session || !user) {
    // Save the current location they were trying to go to
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Not authorized for this route
  if (isAuthorized === false) {
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
