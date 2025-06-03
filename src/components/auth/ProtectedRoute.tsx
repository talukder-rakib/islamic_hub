import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjusted path

// Re-defining User Role type here for simplicity, or import from AuthContext if it's exported
type UserRole = 'Zakat Giver' | 'Zakat Recipient' | 'admin';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]; // Make allowedRoles optional for routes that only need authentication
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isLoading } = useAuth(); // Removed token as user object implies token presence
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading authentication state...</div>
        {/* You might want a more sophisticated spinner/loader here */}
      </div>
    );
  }

  if (!user) {
    // User not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // User is logged in but does not have the required role
    // Redirect to a "Not Authorized" page or homepage
    return <Navigate to="/not-authorized" state={{ from: location }} replace />;
  }

  // User is authenticated and, if allowedRoles are specified, authorized
  return <Outlet />;
};

export default ProtectedRoute;
