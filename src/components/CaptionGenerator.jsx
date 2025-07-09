import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCaptionContext } from '../context/CaptionContext';
import CaptionCard from './CaptionCard';
import HashtagSuggestions from './HashtagSuggestions';
import EmailCollector from './EmailCollector';

const { FiEdit, FiZap, FiRefreshCw, FiSettings } = FiIcons;

const CaptionGenerator = () => {
  const [input, setInput] = useState('');
  const [style, setStyle] = useState('engaging');
  const [niche, setNiche] = useState('general');
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateCaptions, generatedCaptions } = useCaptionContext();

  const styles = [
    { value: 'engaging', label: 'Engaging', desc: 'Hook your audience' },
    { value: 'funny', label: 'Funny', desc: 'Make them laugh' },
    { value: 'inspiring', label: 'Inspiring', desc: 'Motivate viewers' },
    { value: 'trending', label: 'Trending', desc: 'Use viral formats' },
    { value: 'storytelling', label: 'Storytelling', desc: 'Tell a story' }
  ];

  const niches = [
    { value: 'general', label: 'General' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'food', label: 'Food' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'tech', label: 'Tech' },
    { value: 'travel', label: 'Travel' },
    { value: 'lifestyle', label: 'Lifestyle' }
  ];

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsGenerating(true);
    await generateCaptions(input, style, niche);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          AI Caption Generator
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Generate viral TikTok captions and hashtags that boost engagement and discoverability
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-xl p-6 space-y-6"
      >
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-medium flex items-center space-x-2">
              <SafeIcon icon={FiEdit} className="text-purple-600" />
              <span>Video Theme or Keywords</span>
            </span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your video content... (e.g., 'morning workout routine', 'cooking pasta', 'outfit of the day')"
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
            />
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block">
                <span className="text-gray-700 font-medium flex items-center space-x-2">
                  <SafeIcon icon={FiZap} className="text-pink-600" />
                  <span>Caption Style</span>
                </span>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {styles.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label} - {s.desc}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label className="block">
                <span className="text-gray-700 font-medium flex items-center space-x-2">
                  <SafeIcon icon={FiSettings} className="text-blue-600" />
                  <span>Niche/Category</span>
                </span>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {niches.map((n) => (
                    <option key={n.value} value={n.value}>
                      {n.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={!input.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <SafeIcon 
              icon={isGenerating ? FiRefreshCw : FiZap} 
              className={`${isGenerating ? 'animate-spin' : ''}`} 
            />
            <span>{isGenerating ? 'Generating...' : 'Generate Captions'}</span>
          </motion.button>
        </div>
      </motion.div>

      {generatedCaptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800">Generated Captions</h2>
          <div className="grid gap-6">
            {generatedCaptions.map((caption, index) => (
              <CaptionCard key={index} caption={caption} index={index} />
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <HashtagSuggestions niche={niche} />
        <EmailCollector />
      </div>
    </div>
  );
};

export default CaptionGenerator;