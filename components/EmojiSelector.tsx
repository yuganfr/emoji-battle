
import React from 'react';
import { Emoji } from '../types';
import { TEAM_SIZE } from '../constants';
import { Swords } from 'lucide-react';

interface EmojiSelectorProps {
  emojiPool: Emoji[];
  selectedEmojis: Emoji[];
  onSelectEmoji: (emoji: Emoji) => void;
  onStartBattle: () => void;
}

const EmojiCard: React.FC<{ emoji: Emoji; isSelected: boolean; onSelect: () => void; }> = ({ emoji, isSelected, onSelect }) => {
    return (
        <div
            onClick={onSelect}
            className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 flex flex-col items-center justify-between text-center
                ${isSelected 
                    ? 'bg-indigo-500 border-yellow-400 scale-105 shadow-lg shadow-yellow-400/30' 
                    : 'bg-slate-800/50 border-slate-700 hover:border-indigo-500 hover:bg-slate-700/50'
                }`}
        >
            <span className="text-6xl mb-2 drop-shadow-lg">{emoji.character}</span>
            <div className='flex-grow'>
                <h3 className="font-bold text-lg text-white">{emoji.name}</h3>
                <div className={`flex items-center justify-center gap-1 text-sm font-semibold ${emoji.power.color}`}>
                    <span>{emoji.power.icon}</span>
                    <span>{emoji.power.name}</span>
                </div>
                <p className="text-slate-400 text-sm">STR: {emoji.strength}</p>
            </div>
        </div>
    );
};


const EmojiSelector: React.FC<EmojiSelectorProps> = ({ emojiPool, selectedEmojis, onSelectEmoji, onStartBattle }) => {
  const canStart = selectedEmojis.length === TEAM_SIZE;

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in">
        <div className="bg-slate-800/50 p-4 rounded-xl shadow-lg w-full max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-yellow-400">Assemble Your Team!</h2>
            <p className="text-indigo-300 mt-1">Select {TEAM_SIZE} emojis to battle.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
            {emojiPool.map((emoji) => (
                <EmojiCard
                    key={emoji.id}
                    emoji={emoji}
                    isSelected={selectedEmojis.some((e) => e.id === emoji.id)}
                    onSelect={() => onSelectEmoji(emoji)}
                />
            ))}
        </div>

        <div className="sticky bottom-4 w-full flex justify-center">
            <button
                onClick={onStartBattle}
                disabled={!canStart}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-xl shadow-lg transition-all duration-300 transform
                ${canStart 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:scale-105 shadow-orange-500/40' 
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
            >
                <Swords />
                {canStart ? 'Start Battle!' : `Select ${TEAM_SIZE - selectedEmojis.length} more`}
            </button>
        </div>
    </div>
  );
};

export default EmojiSelector;
