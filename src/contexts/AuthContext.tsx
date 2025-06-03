import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of a user object (can be expanded)
interface User {
  id: string;
  email: string;
  role: 'Zakat Giver' | 'Zakat Recipient' | 'admin'; // Updated roles
}

// Define the AuthContext state and methods
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email?: string, password?: string) => Promise<void>; // Made parameters optional for placeholder
  logout: () => void;
  signup: (email?: string, password?: string, role?: User['role']) => Promise<void>; // Role type will be inferred from User interface
}

// Create the context with a default undefined value or a default unauthenticated state
// Using undefined initially, and AuthProvider will check for this to prevent usage outside provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start with loading true

  // Effect to load persisted state from localStorage (optional, for demonstration)
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // Done loading
  }, []);

  const login = async (email?: string, password?: string) => {
    setIsLoading(true);
    console.log('Attempting login with:', { email, password });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = { id: '1', email: email || 'test@example.com', role: 'user' };
    const mockToken = 'mock-jwt-token';
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem('authUser', JSON.stringify(mockUser));
    localStorage.setItem('authToken', mockToken);
    setIsLoading(false);
    console.log('Login successful:', mockUser);
  };

  const logout = () => {
    console.log('Logging out...');
    setUser(null);
    setToken(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    console.log('Logout successful');
  };

  const signup = async (email?: string, password?: string, role: User['role'] = 'Zakat Giver') => { // Default role updated
    setIsLoading(true);
    console.log('Attempting signup with:', { email, password, role });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = { id: '2', email: email || `new-${Date.now()}@example.com`, role }; // Role will be of the new type
    const mockToken = 'new-mock-jwt-token';
    // For signup, typically you'd log the user in as well
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem('authUser', JSON.stringify(mockUser));
    localStorage.setItem('authToken', mockToken);
    setIsLoading(false);
    console.log('Signup successful:', mockUser);
  };

  const contextValue = {
    user,
    token,
    isLoading,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
