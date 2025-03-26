
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Array<'admin' | 'customer'>;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
}: ProtectedRouteProps) => {
  // Simply render children without any protection
  return <>{children}</>;
};

export default ProtectedRoute;
