
import { ReactNode, useEffect } from 'react';
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

  if (loading) {
    // Return a loading state while checking authentication
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Not authenticated
  if (!session || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Authenticated but role check required
  if (allowedRoles.length > 0) {
    // For admin routes
    if (allowedRoles.includes('admin') && !isAdmin) {
      return <Navigate to="/unauthorized" replace />;
    }
    
    // For customer-only routes
    if (allowedRoles.includes('customer') && user.role !== 'customer') {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated and has required role
  return <>{children}</>;
};

export default ProtectedRoute;
