import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHash, FiTrendingUp, FiTarget } = FiIcons;

const HashtagSuggestions = ({ niche }) => {
  const hashtagData = {
    general: {
      trending: ['fyp', 'viral', 'foryou', 'trending', 'explore'],
      popular: ['love', 'life', 'happy', 'fun', 'mood'],
      niche: ['content', 'creator', 'daily', 'vibes', 'aesthetic']
    },
    fitness: {
      trending: ['gymtok', 'fitnessmotivation', 'workoutvideos', 'fitfam', 'gains'],
      popular: ['gym', 'workout', 'fitness', 'health', 'strong'],
      niche: ['homeworkout', 'cardio', 'strength', 'bodybuilding', 'fitlife']
    },
    beauty: {
      trending: ['beautytok', 'makeuptutorial', 'skincareroutine', 'glowup', 'beautyhacks'],
      popular: ['makeup', 'skincare', 'beauty', 'selfcare', 'glam'],
      niche: ['makeover', 'beautytips', 'skincaretips', 'cosmetics', 'beautyreview']
    },
    food: {
      trending: ['foodtok', 'recipe', 'cooking', 'foodie', 'yummy'],
      popular: ['food', 'delicious', 'tasty', 'hungry', 'eat'],
      niche: ['homecooking', 'baking', 'healthy', 'dessert', 'foodprep']
    },
    fashion: {
      trending: ['fashiontok', 'ootd', 'style', 'outfit', 'fashion'],
      popular: ['clothes', 'styling', 'look', 'trend', 'wear'],
      niche: ['vintage', 'streetstyle', 'fashionista', 'designer', 'thrift']
    }
  };

  const currentHashtags = hashtagData[niche] || hashtagData.general;

  const categories = [
    { name: 'Trending', hashtags: currentHashtags.trending, icon: FiTrendingUp, color: 'red' },
    { name: 'Popular', hashtags: currentHashtags.popular, icon: FiHash, color: 'blue' },
    { name: 'Niche', hashtags: currentHashtags.niche, icon: FiTarget, color: 'purple' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
        <SafeIcon icon={FiHash} className="text-purple-600" />
        <span>Hashtag Suggestions</span>
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="space-y-3"
          >
            <h4 className="font-semibold text-gray-700 flex items-center space-x-2">
              <SafeIcon 
                icon={category.icon} 
                className={`text-${category.color}-500`} 
              />
              <span>{category.name}</span>
            </h4>
            <div className="space-y-2">
              {category.hashtags.map((hashtag, idx) => (
                <motion.button
                  key={hashtag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigator.clipboard.writeText(`#${hashtag}`)}
                  className={`block w-full text-left px-3 py-2 rounded-lg bg-${category.color}-50 text-${category.color}-600 hover:bg-${category.color}-100 transition-colors text-sm`}
                >
                  #{hashtag}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HashtagSuggestions;