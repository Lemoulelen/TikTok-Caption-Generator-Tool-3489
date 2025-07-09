import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBell, FiMail, FiCheck, FiX } = FiIcons;

const EmailCollector = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscribed(true);
      // In a real app, you would send the email to your backend here
      console.log('Email submitted:', email);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSubscribed(false);
    setEmail('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-2">
          <SafeIcon icon={FiBell} className="text-white text-xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          Stay Updated
        </h3>
      </div>
      
      <AnimatePresence mode="wait">
        {!subscribed ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-gray-600 mb-4">
              Get notified about new features, trending hashtags, and caption tips directly to your inbox!
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <SafeIcon 
                  icon={FiMail} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    error ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                />
              </div>
              
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm"
                >
                  {error}
                </motion.p>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium disabled:opacity-70 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiBell} />
                    <span>Notify Me</span>
                  </>
                )}
              </motion.button>
              
              <p className="text-xs text-gray-500 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiCheck} className="text-green-600 text-2xl" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Thank You!
            </h4>
            <p className="text-gray-600 mb-6">
              You're now subscribed to CaptionBoost updates. We'll keep you informed about new features and trends!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="text-purple-600 font-medium flex items-center space-x-2 mx-auto"
            >
              <SafeIcon icon={FiX} />
              <span>Close</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmailCollector;