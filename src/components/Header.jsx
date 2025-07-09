import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiTrendingUp, FiBookmark } = FiIcons;

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Generator', icon: FiZap },
    { path: '/trending', label: 'Trending', icon: FiTrendingUp },
    { path: '/saved', label: 'Saved', icon: FiBookmark }
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiZap} className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              CaptionBoost
            </span>
          </Link>

          <nav className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 rounded-lg transition-colors"
              >
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={`relative flex items-center space-x-2 ${
                  location.pathname === item.path 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}>
                  <SafeIcon icon={item.icon} className="text-sm" />
                  <span className="hidden sm:inline">{item.label}</span>
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;