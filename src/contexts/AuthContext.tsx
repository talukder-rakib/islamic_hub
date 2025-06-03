import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define valid user roles
export type UserRole = 'Zakat Giver' | 'Zakat Recipient' | 'admin';

// Define the shape of a user object
interface User {
  id: string;
  email: string;
  role: UserRole;
}

// Define the AuthContext state and methods
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => void;
  signup: (email?: string, password?: string, role?: UserRole) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore user and token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const validRoles: UserRole[] = ['Zakat Giver', 'Zakat Recipient', 'admin'];

        if (validRoles.includes(parsedUser.role)) {
          setUser(parsedUser);
          setToken(storedToken);
        } else {
          console.warn('Invalid role in stored user:', parsedUser.role);
          localStorage.removeItem('authUser');
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
      }
    }

    setIsLoading(false);
  }, []);

  // Simulated login function
  const login = async (email?: string, password?: string) => {
    setIsLoading(true);
    console.log('Attempting login with:', { email, password });

    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: '1',
      email: email || 'test@example.com',
      role: 'Zakat Giver', // ✅ Must be a valid role
    };

    const mockToken = 'mock-jwt-token';
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem('authUser', JSON.stringify(mockUser));
    localStorage.setItem('authToken', mockToken);
    setIsLoading(false);
    console.log('Login successful:', mockUser);
  };

  // Simulated signup function
  const signup = async (email?: string, password?: string, role: UserRole = 'Zakat Giver') => {
    setIsLoading(true);
    console.log('Attempting signup with:', { email, password, role });

    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: '2',
      email: email || `new-${Date.now()}@example.com`,
      role,
    };

    const mockToken = 'new-mock-jwt-token';
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem('authUser', JSON.stringify(mockUser));
    localStorage.setItem('authToken', mockToken);
    setIsLoading(false);
    console.log('Signup successful:', mockUser);
  };

  const logout = () => {
    console.log('Logging out...');
    setUser(null);
    setToken(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    console.log('Logout successful');
  };

  const contextValue: AuthContextType = {
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

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
