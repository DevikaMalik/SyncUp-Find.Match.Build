import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Zap, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully!",
      description: "See you next time!"
    });
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Explorer', path: '/explorer' },
    { name: 'Matchmaking', path: '/matchmaking' },
    { name: 'AI Coach', path: '/ai-coach' },
    { name: 'Profile', path: '/profile' }
  ];

  return (
    <nav className="glass-card sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <Zap className="h-6 w-6 text-white" />
            </div> */}
            <span className="text-xl font-bold gradient-text">SyncUp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-400 active'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="glass-button text-white font-medium">
                  Get Started
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <div className="flex flex-col space-y-2 pt-3 border-t border-white/10">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-blue-400"
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;