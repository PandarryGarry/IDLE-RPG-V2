// ═══════════════════════════════════════════════════════════════
// РУНЫ (заглушка для будущей системы рун)
// Руны вставляются в слоты оружия (runeSlots) и дают бонусы к статам.
// ═══════════════════════════════════════════════════════════════

import type { CombatStats } from '../../types';

/** Эффекты рун (id руны → бонус к статам) */
export const RUNE_EFFECTS: Record<string, Partial<CombatStats>> = {
  // fire_rune: { attackBonus: 5 },
  // strength_rune: { strengthBonus: 10 },
  // speed_rune: { attackSpeed: 1 },
  // protection_rune: { defenceBonus: 8 },
};

/**
 * Применяет бонусы от применённых рун к статам
 */
export function applyRuneBonuses(
  stats: CombatStats,
  appliedRunes: string[]
): CombatStats {
  const result = { ...stats };

  for (const runeId of appliedRunes) {
    const effect = RUNE_EFFECTS[runeId];
    if (effect) {
      for (const [stat, value] of Object.entries(effect)) {
        if (typeof value === 'number') {
          (result as any)[stat] = ((result as any)[stat] ?? 0) + value;
        }
      }
    }
  }

  return result;
}
