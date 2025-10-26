
import React, { useState, useEffect } from 'react';
import { Emoji, BattleResult } from '../types';
import { TEAM_SIZE } from '../constants';

interface BattleArenaProps {
  playerTeam: Emoji[];
  opponentTeam: Emoji[];
  battleLog: BattleResult[];
  isLoading: boolean;
}

const BattleEmojiCard: React.FC<{ emoji: Emoji, isWinner?: boolean, hasLost?: boolean }> = ({ emoji, isWinner, hasLost }) => {
    let cardClass = 'transition-all duration-500 ';
    if (hasLost) {
        cardClass += 'opacity-30 scale-75 blur-sm';
    } else if (isWinner) {
        cardClass += 'scale-110';
    }

    return (
        <div className={`flex flex-col items-center gap-2 p-4 bg-slate-800/50 rounded-xl ${cardClass}`}>
            <span className="text-7xl drop-shadow-lg">{emoji.character}</span>
            <div className="text-center">
                <p className="font-bold text-white">{emoji.name}</p>
                <p className={`text-sm font-semibold ${emoji.power.color}`}>{emoji.power.name}</p>
            </div>
        </div>
    );
};

const BattleArena: React.FC<BattleArenaProps> = ({ playerTeam, opponentTeam, battleLog, isLoading }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [animationState, setAnimationState] = useState<'idle' | 'clashing'>('idle');

  useEffect(() => {
    if (isLoading || battleLog.length === 0) return;

    const roundInterval = setInterval(() => {
      setCurrentRound(prev => {
          if (prev < TEAM_SIZE) {
            setAnimationState('clashing');
            setTimeout(() => setAnimationState('idle'), 500); // clash animation duration
            return prev + 1;
          }
          clearInterval(roundInterval);
          return prev;
      });
    }, 2500); // Time between rounds

    return () => clearInterval(roundInterval);
  }, [isLoading, battleLog]);

  const renderTeam = (team: Emoji[], isPlayer: boolean) => {
      return team.map((emoji, index) => {
          const result = battleLog.find((r, i) => i === index);
          let hasLost = false;
          if (result) {
              hasLost = result.loser.id === emoji.id;
          }
          return <BattleEmojiCard key={emoji.id} emoji={emoji} hasLost={currentRound > index && hasLost} />;
      });
  };

  const currentLogEntry = battleLog[currentRound - 1];
  const clashAnimationClass = animationState === 'clashing' ? 'animate-clash' : '';

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
        <h2 className="text-2xl font-bold text-yellow-400 mt-4">The battle is raging!</h2>
        <p className="text-indigo-300">Our AI commentator is analyzing the moves...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
        {/* Battle Stage */}
        <div className="w-full flex justify-between items-start gap-4 p-4 bg-slate-900/50 rounded-2xl shadow-inner">
            <div className="w-1/3 flex flex-col gap-2 items-center">
                <h3 className="text-xl font-bold text-blue-400">Your Team</h3>
                {renderTeam(playerTeam, true)}
            </div>
            
            <div className="w-1/3 flex flex-col justify-center items-center mt-20">
                <div className={`text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 ${clashAnimationClass}`}>
                    VS
                </div>
            </div>

            <div className="w-1/3 flex flex-col gap-2 items-center">
                <h3 className="text-xl font-bold text-red-400">Opponent's Team</h3>
                {renderTeam(opponentTeam, false)}
            </div>
        </div>

        {/* Battle Log */}
        <div className="w-full max-w-2xl bg-slate-800/50 p-4 rounded-xl shadow-lg min-h-[150px]">
            <h3 className="text-xl font-bold text-yellow-400 mb-2 text-center">Battle Commentary</h3>
            <div className="space-y-2">
                {battleLog.slice(0, currentRound).map((log, index) => (
                    <div key={index} className="p-3 bg-slate-700/50 rounded-lg animate-fade-in text-center">
                        <p className="font-semibold text-lg">
                            <span className="text-2xl">{log.winner.character}</span> defeats <span className="text-2xl">{log.loser.character}</span>!
                        </p>
                        <p className="text-indigo-300 italic">"{log.commentary}"</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default BattleArena;
