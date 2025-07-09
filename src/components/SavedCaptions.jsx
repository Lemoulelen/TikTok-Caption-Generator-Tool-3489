import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCaptionContext } from '../context/CaptionContext';
import CaptionCard from './CaptionCard';
import EmailCollector from './EmailCollector';

const { FiBookmark, FiTrash2, FiSearch, FiFilter } = FiIcons;

const SavedCaptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStyle, setFilterStyle] = useState('all');
  const { savedCaptions, removeSavedCaption, clearAllSaved } = useCaptionContext();

  const filteredCaptions = savedCaptions.filter(caption => {
    const matchesSearch = caption.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caption.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStyle === 'all' || caption.style === filterStyle;
    
    return matchesSearch && matchesFilter;
  });

  const styles = ['all', 'engaging', 'funny', 'inspiring', 'trending', 'storytelling'];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Saved Captions
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Access your favorite captions and manage your content library
        </p>
      </motion.div>

      {savedCaptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search captions or hashtags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiFilter} className="text-gray-400" />
                <select
                  value={filterStyle}
                  onChange={(e) => setFilterStyle(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {styles.map((style) => (
                    <option key={style} value={style}>
                      {style === 'all' ? 'All Styles' : style.charAt(0).toUpperCase() + style.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {savedCaptions.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearAllSaved}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiTrash2} />
                  <span>Clear All</span>
                </motion.button>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {filteredCaptions.length} of {savedCaptions.length} captions
          </div>
        </motion.div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {savedCaptions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-12"
            >
              <SafeIcon icon={FiBookmark} className="mx-auto text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Saved Captions</h3>
              <p className="text-gray-500">
                Save captions from the generator to access them here anytime.
              </p>
            </motion.div>
          ) : filteredCaptions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-12"
            >
              <SafeIcon icon={FiSearch} className="mx-auto text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Results Found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or filters.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {filteredCaptions.map((caption, index) => (
                <div key={caption.id} className="relative">
                  <CaptionCard caption={caption} index={index} />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeSavedCaption(caption.id)}
                    className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} />
                  </motion.button>
                </div>
              ))}
            </motion.div>
          )}
        </div>
        
        <div className="md:col-span-1">
          <EmailCollector />
        </div>
      </div>
    </div>
  );
};

export default SavedCaptions;