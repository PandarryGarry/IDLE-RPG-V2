// ═══════════════════════════════════════════════════════════════
// ТИРЫ ПРЕДМЕТОВ (1-12)
// ТОЛЬКО нумерация (бирка T1-T12) для экипировки/оружия/инструментов.
// Бонусов тиры НЕ дают — это просто визуальная метка уровня предмета.
// Качество и бонусы определяются ГРЕЙДОМ (grade).
//
// Универсальный нейтральный стиль: тёмно-серая бирка с тонким
// светлым ring, читается поверх любого грейда.
// ═══════════════════════════════════════════════════════════════

export interface TierConfig {
  id: number;
  name: string;
  badgeBgColor: string;
  badgeTextColor: string;
}

const BADGE_STYLE = {
  badgeBgColor: 'bg-zinc-800/95 ring-1 ring-zinc-400/70',
  badgeTextColor: 'text-zinc-100',
};

export const TIERS: Record<number, TierConfig> = {
  1:  { id: 1,  name: 'Tier 1',  ...BADGE_STYLE },
  2:  { id: 2,  name: 'Tier 2',  ...BADGE_STYLE },
  3:  { id: 3,  name: 'Tier 3',  ...BADGE_STYLE },
  4:  { id: 4,  name: 'Tier 4',  ...BADGE_STYLE },
  5:  { id: 5,  name: 'Tier 5',  ...BADGE_STYLE },
  6:  { id: 6,  name: 'Tier 6',  ...BADGE_STYLE },
  7:  { id: 7,  name: 'Tier 7',  ...BADGE_STYLE },
  8:  { id: 8,  name: 'Tier 8',  ...BADGE_STYLE },
  9:  { id: 9,  name: 'Tier 9',  ...BADGE_STYLE },
  10: { id: 10, name: 'Tier 10', ...BADGE_STYLE },
  11: { id: 11, name: 'Tier 11', ...BADGE_STYLE },
  12: { id: 12, name: 'Tier 12', ...BADGE_STYLE },
};

export function getTierConfig(tier: number | undefined): TierConfig | null {
  if (!tier) return null;
  return TIERS[tier] ?? null;
}

export const MAX_TIER = 12;

/**
 * Слоты рун по тиру (только для экипировки/оружия).
 * Тиры 1-3 → 0, 4-6 → 1, 7-9 → 2, 10-12 → 3.
 */
export function getRuneSlotsForTier(tier: number | undefined): number {
  if (!tier) return 0;
  if (tier >= 10) return 3;
  if (tier >= 7) return 2;
  if (tier >= 4) return 1;
  return 0;
}
