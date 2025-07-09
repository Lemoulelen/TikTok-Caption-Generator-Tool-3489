import React, { createContext, useContext, useState, useEffect } from 'react';

const CaptionContext = createContext();

export const useCaptionContext = () => {
  const context = useContext(CaptionContext);
  if (!context) {
    throw new Error('useCaptionContext must be used within a CaptionProvider');
  }
  return context;
};

export const CaptionProvider = ({ children }) => {
  const [generatedCaptions, setGeneratedCaptions] = useState([]);
  const [savedCaptions, setSavedCaptions] = useState([]);

  // Load saved captions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedCaptions');
    if (saved) {
      setSavedCaptions(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever savedCaptions changes
  useEffect(() => {
    localStorage.setItem('savedCaptions', JSON.stringify(savedCaptions));
  }, [savedCaptions]);

  const generateCaptions = async (input, style, niche) => {
    // Simulate API call with realistic data generation
    const templates = {
      engaging: [
        "POV: {input} and it's absolutely mind-blowing! 🤯 Who else can relate?",
        "Tell me you {input} without telling me you {input}... I'll go first! ✨",
        "The way I {input} hits different every time 💫 Am I the only one?",
        "When you {input} and realize you're living your best life 🌟"
      ],
      funny: [
        "Me trying to {input} vs. reality 😭 Why is this so accurate?",
        "Nobody: \nAbsolutely nobody: \nMe: *{input}* 🤡",
        "The audacity I have to {input} like I know what I'm doing 💀",
        "Plot twist: I actually don't know how to {input} properly 😂"
      ],
      inspiring: [
        "Your reminder that {input} is possible! ✨ Keep going, you've got this!",
        "Started from the bottom, now we {input} 💪 Progress over perfection!",
        "Daily affirmation: I can {input} and I will succeed! 🌟",
        "Proof that consistency with {input} pays off! What's your why? 💫"
      ],
      trending: [
        "This {input} trend but make it ✨aesthetic✨",
        "Doing the {input} challenge because everyone else is doing it 👀",
        "Rate my {input} from 1-10 in the comments! No cap 🧢",
        "This {input} hits different when you add this one thing..."
      ],
      storytelling: [
        "Chapter 1: I decided to {input}. Chapter 2: Everything changed...",
        "The story of how {input} completely transformed my perspective 📖",
        "Once upon a time I {input}, and here's what happened next...",
        "Plot twist: {input} wasn't what I expected, but it was exactly what I needed ✨"
      ]
    };

    const hashtagsByNiche = {
      general: ['fyp', 'viral', 'trending', 'foryou', 'content'],
      fitness: ['fitness', 'workout', 'gym', 'health', 'motivation'],
      beauty: ['beauty', 'makeup', 'skincare', 'glowup', 'selfcare'],
      food: ['food', 'recipe', 'cooking', 'yummy', 'foodie'],
      fashion: ['fashion', 'ootd', 'style', 'outfit', 'trendy'],
      tech: ['tech', 'gadgets', 'innovation', 'techtok', 'future'],
      travel: ['travel', 'adventure', 'wanderlust', 'explore', 'vacation'],
      lifestyle: ['lifestyle', 'daily', 'vibes', 'aesthetic', 'mindset']
    };

    const styleTemplates = templates[style] || templates.engaging;
    const nicheHashtags = hashtagsByNiche[niche] || hashtagsByNiche.general;

    const captions = styleTemplates.map((template, index) => ({
      id: Date.now() + index,
      text: template.replace(/{input}/g, input),
      style: style,
      hashtags: [
        ...nicheHashtags.slice(0, 3),
        'creator',
        style === 'trending' ? 'viral' : style
      ],
      engagement: Math.floor(Math.random() * 30) + 70, // 70-100%
      likes: `${Math.floor(Math.random() * 900) + 100}K`,
      niche: niche
    }));

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setGeneratedCaptions(captions);
  };

  const saveCaption = (caption) => {
    setSavedCaptions(prev => {
      const exists = prev.find(saved => saved.id === caption.id);
      if (exists) {
        return prev; // Already saved
      }
      return [...prev, { ...caption, savedAt: new Date().toISOString() }];
    });
  };

  const removeSavedCaption = (captionId) => {
    setSavedCaptions(prev => prev.filter(caption => caption.id !== captionId));
  };

  const clearAllSaved = () => {
    setSavedCaptions([]);
  };

  const value = {
    generatedCaptions,
    savedCaptions,
    generateCaptions,
    saveCaption,
    removeSavedCaption,
    clearAllSaved
  };

  return (
    <CaptionContext.Provider value={value}>
      {children}
    </CaptionContext.Provider>
  );
};