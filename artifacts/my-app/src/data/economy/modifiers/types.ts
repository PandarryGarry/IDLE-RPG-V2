export type BonusStat = 'speed' | 'xp' | 'price' | 'yield';

export interface BonusEntry {
  source: string;
  stat: BonusStat;
  percent: number;
  scope?: { skill?: string; category?: string; global?: boolean };
}

export interface EconomyContext {
  toolGrade?: string;
  weather?: string;
}

export const MAX_BONUS_PERCENT: Record<BonusStat, number> = {
  speed: 75, xp: 100, price: 100, yield: 100,
};
