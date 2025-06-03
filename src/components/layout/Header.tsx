import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, LanguagesIcon as LanguageIcon, LogOut, UserCircle, GridIcon } from 'lucide-react'; // Added LogOut, UserCircle, GridIcon
import { useTheme } from '../../contexts/ThemeContext';
import { useDirection } from '../../contexts/DirectionContext';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { direction, toggleDirection } = useDirection();
  const { user, logout, isLoading } = useAuth(); // Get auth state and functions

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case 'Zakat Giver':
        return '/dashboard/giver';
      case 'Zakat Recipient':
        return '/dashboard/recipient';
      // Add cases for other roles if they have dashboards
      // case 'admin':
      //   return '/admin/dashboard';
      default:
        return null; // Or a generic dashboard/profile page
    }
  };

  const dashboardLink = getDashboardLink();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">ই</span>
            </div>
            <span className="text-xl font-medium text-primary-600 dark:text-primary-400">ইসলামিক হাব</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-3"> {/* Adjusted spacing for smaller screens */}
          {isLoading ? (
            <span className="text-sm text-gray-700 dark:text-gray-300">লোড হচ্ছে...</span>
          ) : user ? (
            <>
              {dashboardLink && (
                <Link to={dashboardLink} className="hidden sm:flex items-center btn btn-sm btn-outline text-xs sm:text-sm">
                  <GridIcon size={16} className="mr-1 sm:mr-2"/> ড্যাশবোর্ড
                </Link>
              )}
              <span className="hidden sm:block text-sm text-gray-700 dark:text-gray-300 truncate max-w-[100px] sm:max-w-[150px]" title={user.email}>
                {user.email}
              </span>
              <button
                onClick={logout}
                className="btn btn-sm btn-outline text-xs sm:text-sm flex items-center"
                aria-label="Logout"
              >
                <LogOut size={16} className="mr-1 sm:mr-2"/> লগআউট
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-outline text-xs sm:text-sm">লগইন</Link>
              <Link to="/signup" className="btn btn-sm btn-primary text-xs sm:text-sm">সাইন আপ</Link>
            </>
          )}
          <button 
            onClick={toggleDirection}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label={direction === 'ltr' ? 'Switch to RTL' : 'Switch to LTR'}
          >
            <LanguageIcon size={20} />
          </button>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {/* "ডাউনলোড অ্যাপ" button can be kept or removed based on final design preference */}
          {/* <a
            href="#" 
            className="hidden md:block btn btn-primary"
          >
            ডাউনলোড অ্যাপ
          </a> */}
        </div>
      </div>
    </header>
  );
};

export default Header;