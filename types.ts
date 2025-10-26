
export enum GameState {
  SELECTION = 'SELECTION',
  BATTLE = 'BATTLE',
  RESULT = 'RESULT',
  LEADERBOARD = 'LEADERBOARD',
}

export enum PowerType {
    FIRE = 'FIRE',
    WATER = 'WATER',
    PLANT = 'PLANT',
    SHIELD = 'SHIELD',
    SPEED = 'SPEED'
}

export interface Power {
    type: PowerType;
    name: string;
    icon: string;
    color: string;
    beats: PowerType | null;
}

export interface Emoji {
  id: string;
  character: string;
  name: string;
  power: Power;
  strength: number;
}

export interface BattleResult {
  winner: Emoji;
  loser: Emoji;
  commentary: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar: string;
}
