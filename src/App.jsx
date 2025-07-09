import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import CaptionGenerator from './components/CaptionGenerator';
import TrendingHashtags from './components/TrendingHashtags';
import SavedCaptions from './components/SavedCaptions';
import { CaptionProvider } from './context/CaptionContext';
import './App.css';

function App() {
  return (
    <CaptionProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
          <Header />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
          >
            <Routes>
              <Route path="/" element={<CaptionGenerator />} />
              <Route path="/trending" element={<TrendingHashtags />} />
              <Route path="/saved" element={<SavedCaptions />} />
            </Routes>
          </motion.main>
        </div>
      </Router>
    </CaptionProvider>
  );
}

export default App;