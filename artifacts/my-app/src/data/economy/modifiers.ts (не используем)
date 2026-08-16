// ═══════════════════════════════════════════════════════════════
// СЛОЙ МОДИФИКАТОРОВ (динамика экономики)
// Все источники бонусов описываются единой формой BonusEntry.
// Добавить зелье/заточку/бижутерию/погоду = добавить строку данных.
// Стекание — аддитивное (проценты складываются, применяются один раз).
// ═══════════════════════════════════════════════════════════════

import type { SkillId, ItemCategory } from '../types';

export type BonusStat = 'speed' | 'xp' | 'price' | 'yield';

export interface BonusEntry {
  source: string;   // 'tool_tier', 'potion_haste', 'gear_ring', 'weather_rain'
  stat: BonusStat;
  percent: number;  // +5 = +5%
  scope?: { skill?: SkillId; category?: ItemCategory; global?: boolean };
}

/** Контекст для расчёта эффективных значений (расширяется со временем) */
export interface EconomyContext {
  toolTier?: number;
  weather?: string;
  // future: potions?: string[]; gear?: string[]; sharpen?: number; guild?: boolean;
}

/** Капы, чтобы бонусы не улетели в бесконечность */
export const MAX_BONUS_PERCENT: Record<BonusStat, number> = {
  speed: 75, xp: 100, price: 100, yield: 100,
};

/** Тир инструмента → % к скорости (пример: топор T2 = +5%) */
export const TOOL_TIER_BONUS: Record<number, BonusEntry> = {
  1: { source: 'tool_tier', stat: 'speed', percent: 0 },
  2: { source: 'tool_tier', stat: 'speed', percent: 5 },
  3: { source: 'tool_tier', stat: 'speed', percent: 10 },
  4: { source: 'tool_tier', stat: 'speed', percent: 15 },
  5: { source: 'tool_tier', stat: 'speed', percent: 20 },
  6: { source: 'tool_tier', stat: 'speed', percent: 25 },
  7: { source: 'tool_tier', stat: 'speed', percent: 30 },
  8: { source: 'tool_tier', stat: 'speed', percent: 40 },
};

/** Тир предмета → множитель цены (почва под уголь/слитки) */
export const TIER_PRICE_MULT: Record<number, number> = {
  1: 1, 2: 1.6, 3: 2.4, 4: 3.5, 5: 5, 6: 7, 7: 10, 8: 15,
};

/** Редкость → множитель цены (почва под аукцион/дроп) */
export const RARITY_PRICE_MULT: Record<string, number> = {
  common: 1, uncommon: 1.2, rare: 1.6, epic: 2.2, legendary: 3,
};

/** Погода → эффекты (сейчас нейтрально, «почва») */
export interface WeatherEffect {
  speedMult?: Partial<Record<SkillId, number>>;
  xpMult?: Partial<Record<SkillId, number>>;
  priceMult?: Partial<Record<ItemCategory, number>>;
}
export const WEATHER_EFFECTS: Record<string, WeatherEffect> = {
  clear: {},
  // rain: { speedMult: { woodcutting: 1.25 }, xpMult: { woodcutting: 1.2 }, priceMult: { log: 1.2 } },
};

/** Собирает все активные бонусы из контекста */
export function collectBonuses(ctx: EconomyContext): BonusEntry[] {
  const out: BonusEntry[] = [];
  if (ctx.toolTier && TOOL_TIER_BONUS[ctx.toolTier]) out.push(TOOL_TIER_BONUS[ctx.toolTier]);
  // future: зелья, заточка, бижутерия, гильдия — добавляются сюда
  return out;
}
