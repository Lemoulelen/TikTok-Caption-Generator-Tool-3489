import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import EmailCollector from './EmailCollector';

const { FiTrendingUp, FiCopy, FiCheck, FiFilter, FiBarChart3 } = FiIcons;

const TrendingHashtags = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedHashtag, setCopiedHashtag] = useState(null);

  const trendingData = [
    { hashtag: 'fyp', posts: '2.1B', growth: '+15%', category: 'general', difficulty: 'Hard' },
    { hashtag: 'viral', posts: '1.8B', growth: '+12%', category: 'general', difficulty: 'Hard' },
    { hashtag: 'gymtok', posts: '890M', growth: '+25%', category: 'fitness', difficulty: 'Medium' },
    { hashtag: 'beautytok', posts: '756M', growth: '+18%', category: 'beauty', difficulty: 'Medium' },
    { hashtag: 'foodtok', posts: '623M', growth: '+22%', category: 'food', difficulty: 'Medium' },
    { hashtag: 'fashiontok', posts: '445M', growth: '+20%', category: 'fashion', difficulty: 'Medium' },
    { hashtag: 'workoutmotivation', posts: '234M', growth: '+30%', category: 'fitness', difficulty: 'Easy' },
    { hashtag: 'skincareroutine', posts: '198M', growth: '+28%', category: 'beauty', difficulty: 'Easy' },
    { hashtag: 'recipeoftheday', posts: '167M', growth: '+35%', category: 'food', difficulty: 'Easy' },
    { hashtag: 'ootdinspo', posts: '145M', growth: '+32%', category: 'fashion', difficulty: 'Easy' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'general', label: 'General' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'food', label: 'Food' },
    { value: 'fashion', label: 'Fashion' }
  ];

  const filteredHashtags = selectedCategory === 'all' 
    ? trendingData 
    : trendingData.filter(item => item.category === selectedCategory);

  const handleCopyHashtag = async (hashtag) => {
    try {
      await navigator.clipboard.writeText(`#${hashtag}`);
      setCopiedHashtag(hashtag);
      setTimeout(() => setCopiedHashtag(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Trending Hashtags
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover the hottest hashtags and boost your content's reach with real-time trending data
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <SafeIcon icon={FiTrendingUp} className="text-pink-600" />
            <span>Real-time Trending</span>
          </h2>

          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFilter} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredHashtags.map((item, index) => (
            <motion.div
              key={item.hashtag}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 font-mono">#{index + 1}</span>
                  <span className="font-semibold text-lg text-purple-600">
                    #{item.hashtag}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiBarChart3} />
                    <span>{item.posts} posts</span>
                  </div>
                  <span className="text-green-600 font-medium">{item.growth}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCopyHashtag(item.hashtag)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  copiedHashtag === item.hashtag
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
                }`}
              >
                <SafeIcon icon={copiedHashtag === item.hashtag ? FiCheck : FiCopy} />
                <span>{copiedHashtag === item.hashtag ? 'Copied!' : 'Copy'}</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Pro Tips for Hashtag Success</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="space-y-2">
              <p>• Mix trending hashtags with niche-specific ones</p>
              <p>• Use 3-5 hashtags for optimal engagement</p>
              <p>• Check hashtag difficulty before using</p>
            </div>
            <div className="space-y-2">
              <p>• Create your own branded hashtags</p>
              <p>• Monitor hashtag performance regularly</p>
              <p>• Avoid banned or flagged hashtags</p>
            </div>
          </div>
        </motion.div>
        
        <EmailCollector />
      </div>
    </div>
  );
};

export default TrendingHashtags;