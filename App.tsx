
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Emoji, BattleResult } from './types';
import { EMOJI_POOL, TEAM_SIZE } from './constants';
import { generateBattleCommentary } from './services/geminiService';
import Header from './components/Header';
import EmojiSelector from './components/EmojiSelector';
import BattleArena from './components/BattleArena';
import GameResult from './components/GameResult';
import Leaderboard from './components/Leaderboard';
import { Swords, Shield, Users } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.SELECTION);
  const [playerTeam, setPlayerTeam] = useState<Emoji[]>([]);
  const [opponentTeam, setOpponentTeam] = useState<Emoji[]>([]);
  const [battleLog, setBattleLog] = useState<BattleResult[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmojiSelect = (emoji: Emoji) => {
    setPlayerTeam((prevTeam) => {
      if (prevTeam.find((e) => e.id === emoji.id)) {
        return prevTeam.filter((e) => e.id !== emoji.id);
      }
      if (prevTeam.length < TEAM_SIZE) {
        return [...prevTeam, emoji];
      }
      return prevTeam;
    });
  };

  const startBattle = () => {
    if (playerTeam.length === TEAM_SIZE) {
      // Select a random opponent team
      const shuffled = [...EMOJI_POOL].sort(() => 0.5 - Math.random());
      setOpponentTeam(shuffled.slice(0, TEAM_SIZE));
      setBattleLog([]);
      setWinner(null);
      setGameState(GameState.BATTLE);
    }
  };

  const determineRoundWinner = (playerEmoji: Emoji, opponentEmoji: Emoji): [Emoji, Emoji] => {
    const playerPower = playerEmoji.power;
    const opponentPower = opponentEmoji.power;

    if (playerPower.beats === opponentPower.type) {
        return [playerEmoji, opponentEmoji];
    }
    if (opponentPower.beats === playerPower.type) {
        return [opponentEmoji, playerEmoji];
    }
    // Tie in power, winner is one with higher strength
    return playerEmoji.strength >= opponentEmoji.strength ? [playerEmoji, opponentEmoji] : [opponentEmoji, playerEmoji];
  };

  const runBattle = useCallback(async () => {
    setIsLoading(true);
    const results: BattleResult[] = [];
    for (let i = 0; i < TEAM_SIZE; i++) {
      const playerEmoji = playerTeam[i];
      const opponentEmoji = opponentTeam[i];
      const [winner, loser] = determineRoundWinner(playerEmoji, opponentEmoji);
      
      const commentary = await generateBattleCommentary(winner, loser, playerEmoji.id === winner.id ? 'Player' : 'Opponent');
      
      const result: BattleResult = { winner, loser, commentary };
      results.push(result);
    }
    setBattleLog(results);

    const playerWins = results.filter(r => playerTeam.some(e => e.id === r.winner.id)).length;
    const opponentWins = TEAM_SIZE - playerWins;
    setWinner(playerWins > opponentWins ? 'Player' : 'Opponent');
    
    setTimeout(() => {
        setGameState(GameState.RESULT);
        setIsLoading(false);
    }, results.length * 2500 + 1000); // Wait for all animations to finish
  }, [playerTeam, opponentTeam]);

  useEffect(() => {
    if (gameState === GameState.BATTLE && playerTeam.length > 0 && opponentTeam.length > 0) {
      runBattle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  const resetGame = () => {
    setPlayerTeam([]);
    setOpponentTeam([]);
    setBattleLog([]);
    setWinner(null);
    setGameState(GameState.SELECTION);
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.SELECTION:
        return (
          <EmojiSelector
            emojiPool={EMOJI_POOL}
            selectedEmojis={playerTeam}
            onSelectEmoji={handleEmojiSelect}
            onStartBattle={startBattle}
          />
        );
      case GameState.BATTLE:
        return <BattleArena playerTeam={playerTeam} opponentTeam={opponentTeam} battleLog={battleLog} isLoading={isLoading} />;
      case GameState.RESULT:
        return <GameResult winner={winner} onPlayAgain={resetGame} onViewLeaderboard={() => setGameState(GameState.LEADERBOARD)} />;
      case GameState.LEADERBOARD:
        return <Leaderboard onBack={resetGame} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-900 font-sans p-4 md:p-8 flex flex-col items-center">
      <Header />
      <main className="w-full max-w-5xl mx-auto mt-8 flex-grow">
        {renderContent()}
      </main>
      <footer className="text-center text-indigo-400 text-sm mt-8">
        <p>Emoji Clash - A Vibe Coding Project</p>
      </footer>
    </div>
  );
};

export default App;
