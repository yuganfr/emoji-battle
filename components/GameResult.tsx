
import React from 'react';
import { Award, Frown, RefreshCw, BarChart } from 'lucide-react';

interface GameResultProps {
  winner: string | null;
  onPlayAgain: () => void;
  onViewLeaderboard: () => void;
}

const GameResult: React.FC<GameResultProps> = ({ winner, onPlayAgain, onViewLeaderboard }) => {
  const isPlayerWinner = winner === 'Player';

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-800/50 rounded-2xl shadow-xl animate-fade-in">
      {isPlayerWinner ? (
        <>
          <Award className="w-24 h-24 text-yellow-400 animate-bounce" />
          <h2 className="text-5xl font-extrabold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
            You Won!
          </h2>
          <p className="text-indigo-300 mt-2 text-xl">A masterful victory!</p>
        </>
      ) : (
        <>
          <Frown className="w-24 h-24 text-red-400 animate-shake" />
          <h2 className="text-5xl font-extrabold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
            You Lost...
          </h2>
          <p className="text-indigo-300 mt-2 text-xl">Better luck next time, Clasher!</p>
        </>
      )}

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={onPlayAgain}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105"
        >
          <RefreshCw size={20} />
          Play Again
        </button>
        <button
          onClick={onViewLeaderboard}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-lg bg-slate-700 text-white hover:bg-slate-600 transition-all duration-300 transform hover:scale-105"
        >
          <BarChart size={20} />
          View Leaderboard
        </button>
      </div>
    </div>
  );
};

export default GameResult;
