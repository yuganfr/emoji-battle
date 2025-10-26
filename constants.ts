
import { Emoji, Power, PowerType, LeaderboardEntry } from './types';

export const TEAM_SIZE = 3;

const POWERS: Record<PowerType, Power> = {
    [PowerType.FIRE]: { type: PowerType.FIRE, name: 'Fire', icon: '🔥', color: 'text-red-400', beats: PowerType.PLANT },
    [PowerType.WATER]: { type: PowerType.WATER, name: 'Water', icon: '💧', color: 'text-blue-400', beats: PowerType.FIRE },
    [PowerType.PLANT]: { type: PowerType.PLANT, name: 'Plant', icon: '🌿', color: 'text-green-400', beats: PowerType.WATER },
    [PowerType.SHIELD]: { type: PowerType.SHIELD, name: 'Shield', icon: '🛡️', color: 'text-gray-400', beats: null },
    [PowerType.SPEED]: { type: PowerType.SPEED, name: 'Speed', icon: '⚡', color: 'text-yellow-400', beats: null }
};

export const EMOJI_POOL: Emoji[] = [
  { id: 'e1', character: '🐲', name: 'Dragon', power: POWERS.FIRE, strength: 95 },
  { id: 'e2', character: '🐙', name: 'Octopus', power: POWERS.WATER, strength: 88 },
  { id: 'e3', character: '🌵', name: 'Cactus', power: POWERS.PLANT, strength: 85 },
  { id: 'e4', character: '🐢', name: 'Turtle', power: POWERS.SHIELD, strength: 90 },
  { id: 'e5', character: '🐆', name: 'Leopard', power: POWERS.SPEED, strength: 92 },
  { id: 'e6', character: '🔥', name: 'Fire Spirit', power: POWERS.FIRE, strength: 80 },
  { id: 'e7', character: '🌊', name: 'Tsunami', power: POWERS.WATER, strength: 93 },
  { id: 'e8', character: '🌳', name: 'Ancient Tree', power: POWERS.PLANT, strength: 89 },
  { id: 'e9', character: '🤖', name: 'Robot', power: POWERS.SHIELD, strength: 82 },
  { id: 'e10', character: '💨', name: 'Tornado', power: POWERS.SPEED, strength: 86 },
  { id: 'e11', character: '🌋', name: 'Volcano', power: POWERS.FIRE, strength: 98 },
  { id: 'e12', character: '🐋', name: 'Whale', power: POWERS.WATER, strength: 96 }
];

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
    { rank: 1, name: 'ClashMaster', score: 9980, avatar: '👑' },
    { rank: 2, name: 'EmojiFan', score: 9540, avatar: '😎' },
    { rank: 3, name: 'ProPlayerX', score: 9210, avatar: '🚀' },
    { rank: 4, name: 'BattleCat', score: 8870, avatar: '😼' },
    { rank: 5, name: 'AquaDude', score: 8500, avatar: '🏄' }
];
