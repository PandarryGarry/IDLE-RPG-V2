import type { FiremakingLog } from './types';

// ═══════════════════════════════════════════════════════════════
// ДАННЫЕ О СЖИГАНИИ ДРЕВЕСИНЫ
// ═══════════════════════════════════════════════════════════════
// interval: базовое время сжигания 1 партии (×1), 10-30с
// xp: снижены для медленной прокачки
// burnDuration: время горения древесины в секундах
// charcoalTier: тир получаемого угля (1-8)
// successChance: шанс получения угля (иначе — зола)

export const FIREMAKING_LOGS: FiremakingLog[] = [
  { id: 'burn_normal',   name: 'Logs',          description: 'Basic logs that burn steadily.', levelRequired: 1,  xp: 10,  masteryXp: 3,  interval: 10000, logId: 'normal_logs',   ashId: 'ash', charcoalId: 'charcoal', charcoalTier: 1, successChance: 0.75, burnDuration: 10 },
  { id: 'burn_oak',      name: 'Oak Logs',      description: 'Hardwood logs with a brighter flame.', levelRequired: 15, xp: 14,  masteryXp: 4,  interval: 12000, logId: 'oak_logs',      ashId: 'ash', charcoalId: 'charcoal', charcoalTier: 2, successChance: 0.75, burnDuration: 12 },
  { id: 'burn_willow',   name: 'Willow Logs',   description: 'Light logs that make a quick training fire.', levelRequired: 30, xp: 20,  masteryXp: 5,  interval: 14000, logId: 'willow_logs',   ashId: 'ash', charcoalId: 'charcoal', charcoalTier: 3, successChance: 0.75, burnDuration: 14 },
  { id: 'burn_teak',     name: 'Teak Logs',     description: 'Dense timber with a hot, clean burn.', levelRequired: 35, xp: 25,  masteryXp: 5,  interval: 16000, logId: 'teak_logs',     ashId: 'ash', charcoalId: 'charcoal', charcoalTier: 4, successChance: 0.75, burnDuration: 16 },
  { id: 'burn_maple',    name: 'Maple Logs',    description: 'Reliable fuel for experienced firemakers.', levelRequired: 45, xp: 35,  masteryXp: 6,  interval: 18000, logId: 'maple_logs',    ashId: 'ash', charcoalId: 'charcoal', charcoalTier: 5, successChance: 0.75, burnDuration: 18 },
  { id: 'burn_mahogany', name: 'Mahogany Logs', description: 'Rare hardwood that produces substantial heat.', levelRequired: 55, xp: 50,  masteryXp: 7,  interval: 20000, logId: 'mahogany_logs', ashId: 'ash', charcoalId: 'charcoal', charcoalTier: 6, successChance: 0.75, burnDuration: 20 },
  { id: 'burn_magic',    name: 'Magic Logs',    description: 'Arcane logs that crackle with blue flame.', levelRequired: 75, xp: 80,  masteryXp: 8,  interval: 24000, logId: 'magic_logs',    ashId: 'ash', charcoalId: 'charcoal', charcoalTier: 7, successChance: 0.75, burnDuration: 24 },
  { id: 'burn_redwood',  name: 'Redwood Logs',  description: 'Ancient timber with immense experience value.', levelRequired: 90, xp: 120, masteryXp: 10, interval: 30000, logId: 'redwood_logs',  ashId: 'ash', charcoalId: 'charcoal', charcoalTier: 8, successChance: 0.75, burnDuration: 30 },
];

export const FIREMAKING_MAP = Object.fromEntries(FIREMAKING_LOGS.map(l => [l.id, l]));

// ═══════════════════════════════════════════════════════════════
// ХАРАКТЕРИСТИКИ УГЛЯ ПО ТИРАМ
// ═══════════════════════════════════════════════════════════════
// heatDuration: сколько секунд уголь держит жар (для плавки руды)
// sellValue: стоимость продажи (будет балансироваться в конце)

export const CHARCOAL_STATS: Record<number, { heatDuration: number; sellValue: number }> = {
  1: { heatDuration: 10, sellValue: 3 },
  2: { heatDuration: 15, sellValue: 6 },
  3: { heatDuration: 20, sellValue: 9 },
  4: { heatDuration: 25, sellValue: 15 },
  5: { heatDuration: 30, sellValue: 24 },
  6: { heatDuration: 35, sellValue: 36 },
  7: { heatDuration: 40, sellValue: 54 },
  8: { heatDuration: 50, sellValue: 75 },
};

export function getCharcoalStats(tier: number) {
  return CHARCOAL_STATS[tier] ?? CHARCOAL_STATS[1];
}

// ═══════════════════════════════════════════════════════════════
// ВРЕМЯ ПАРТИИ
// ═══════════════════════════════════════════════════════════════
// ×1   = базовое время
// ×10  = база + 20с   (Logs: 30с,  Redwood: 50с)
// ×100 = база + 80с   (Logs: 1:30, Redwood: 1:50)
export const BATCH_BONUS_MS: Record<number, number> = { 1: 0, 10: 20_000, 100: 80_000 };

export function getBatchTime(baseInterval: number, multiplier: number): number {
  const bonus = BATCH_BONUS_MS[multiplier] ?? 0;
  return baseInterval + bonus;
}
