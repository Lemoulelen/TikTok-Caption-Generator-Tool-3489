import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useCaptionContext } from '../context/CaptionContext';

const { FiCopy, FiHeart, FiBookmark, FiCheck, FiEdit3 } = FiIcons;

const CaptionCard = ({ caption, index }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(caption.text);
  const { saveCaption, savedCaptions } = useCaptionContext();

  const isSaved = savedCaptions.some(saved => saved.id === caption.id);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSave = () => {
    saveCaption(caption);
  };

  const handleEdit = () => {
    if (isEditing) {
      // Save the edited version
      const updatedCaption = { ...caption, text: editedText };
      // You could update the caption in context here
    }
    setIsEditing(!isEditing);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full">
              {caption.style}
            </span>
            <span className="text-gray-500 text-sm">
              {caption.engagement}% engagement potential
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleEdit}
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <SafeIcon icon={FiEdit3} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className={`p-2 transition-colors ${
                isSaved ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
              }`}
            >
              <SafeIcon icon={isSaved ? FiHeart : FiBookmark} />
            </motion.button>
          </div>
        </div>

        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={4}
          />
        ) : (
          <p className="text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap">
            {caption.text}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {caption.hashtags.map((hashtag, idx) => (
            <span
              key={idx}
              className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-sm font-medium"
            >
              #{hashtag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <SafeIcon icon={FiHeart} />
              <span>{caption.likes}</span>
            </span>
            <span>Length: {caption.text.length} chars</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
            }`}
          >
            <SafeIcon icon={copied ? FiCheck : FiCopy} />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CaptionCard;