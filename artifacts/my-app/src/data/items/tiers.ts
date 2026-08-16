// ═══════════════════════════════════════════════════════════════
// ТИРЫ ПРЕДМЕТОВ (1-12)
// ТОЛЬКО нумерация (бирка T1-T12) для экипировки/оружия/инструментов.
// Бонусов тиры НЕ дают — это просто визуальная метка уровня предмета.
// Качество и бонусы определяются ГРЕЙДОМ (grade).
// ═══════════════════════════════════════════════════════════════

export interface TierConfig {
  id: number;
  name: string;
  badgeBgColor: string;    // фон бирки (T1, T2...)
  badgeTextColor: string;  // текст на бирке
}

export const TIERS: Record<number, TierConfig> = {
  1:  { id: 1,  name: 'Tier 1',  badgeBgColor: 'bg-slate-600',   badgeTextColor: 'text-slate-100' },
  2:  { id: 2,  name: 'Tier 2',  badgeBgColor: 'bg-green-600',   badgeTextColor: 'text-green-100' },
  3:  { id: 3,  name: 'Tier 3',  badgeBgColor: 'bg-blue-600',    badgeTextColor: 'text-blue-100' },
  4:  { id: 4,  name: 'Tier 4',  badgeBgColor: 'bg-purple-600',  badgeTextColor: 'text-purple-100' },
  5:  { id: 5,  name: 'Tier 5',  badgeBgColor: 'bg-amber-600',   badgeTextColor: 'text-amber-100' },
  6:  { id: 6,  name: 'Tier 6',  badgeBgColor: 'bg-red-600',     badgeTextColor: 'text-red-100' },
  7:  { id: 7,  name: 'Tier 7',  badgeBgColor: 'bg-pink-600',    badgeTextColor: 'text-pink-100' },
  8:  { id: 8,  name: 'Tier 8',  badgeBgColor: 'bg-cyan-600',    badgeTextColor: 'text-cyan-100' },
  9:  { id: 9,  name: 'Tier 9',  badgeBgColor: 'bg-indigo-600',  badgeTextColor: 'text-indigo-100' },
  10: { id: 10, name: 'Tier 10', badgeBgColor: 'bg-orange-600',  badgeTextColor: 'text-orange-100' },
  11: { id: 11, name: 'Tier 11', badgeBgColor: 'bg-emerald-600', badgeTextColor: 'text-emerald-100' },
  12: { id: 12, name: 'Tier 12', badgeBgColor: 'bg-rose-600',    badgeTextColor: 'text-rose-100' },
};

export function getTierConfig(tier: number | undefined): TierConfig | null {
  if (!tier) return null;
  return TIERS[tier] ?? null;
}

export const MAX_TIER = 12;
