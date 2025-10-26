
import React from 'react';
import { LEADERBOARD_DATA } from '../constants';
import { ArrowLeft } from 'lucide-react';

interface LeaderboardProps {
    onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 p-6 rounded-2xl shadow-xl animate-fade-in">
        <div className="flex items-center justify-between mb-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-indigo-400 hover:text-yellow-400 transition-colors"
            >
                <ArrowLeft size={20} />
                Back to Game
            </button>
            <h2 className="text-3xl font-bold text-yellow-400">Top Clashers</h2>
            <div className="w-16"></div>
        </div>
      
        <div className="space-y-3">
            {LEADERBOARD_DATA.map((entry, index) => (
                <div 
                    key={entry.rank}
                    className={`flex items-center p-3 rounded-lg transition-all duration-300
                        ${index === 0 ? 'bg-yellow-500/20 border-2 border-yellow-400' : ''}
                        ${index === 1 ? 'bg-gray-400/20 border border-gray-400' : ''}
                        ${index === 2 ? 'bg-orange-600/20 border border-orange-600' : ''}
                        ${index > 2 ? 'bg-slate-700/50' : ''}
                    `}
                >
                    <div className="flex items-center w-1/5">
                        <span className="text-2xl font-bold text-slate-400 w-8 text-center">{entry.rank}</span>
                        <span className="text-4xl ml-4">{entry.avatar}</span>
                    </div>
                    <div className="w-3/5 text-lg font-semibold text-white">{entry.name}</div>
                    <div className="w-1/5 text-right font-bold text-xl text-indigo-300">{entry.score.toLocaleString()}</div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Leaderboard;
