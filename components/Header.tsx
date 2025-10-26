
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center gap-4">
        <Sparkles className="w-8 h-8 md:w-12 md:h-12" />
        Emoji Clash
        <Sparkles className="w-8 h-8 md:w-12 md:h-12" />
      </h1>
      <p className="text-indigo-300 mt-2 text-lg">The Ultimate Emoji Battle Arena</p>
    </header>
  );
};

export default Header;
