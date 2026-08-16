// ═══════════════════════════════════════════════════════════════
// БОНУСЫ ГРЕЙДОВ ДЛЯ ЭКИПИРОВКИ И ОРУЖИЯ
// Грейд даёт множитель ко всем базовым статам.
// Тир — только визуальная бирка, бонусов не даёт.
// ═══════════════════════════════════════════════════════════════

import type { GradeId, CombatStats } from '../../types';

/** Множители статов по грейдам (для экипировки и оружия) */
export const GEAR_GRADE_MULT: Record<GradeId, number> = {
  common: 1.0,      // базовый
  uncommon: 1.1,    // +10%
  rare: 1.25,       // +25%
  epic: 1.5,        // +50%
  legendary: 2.0,   // +100%
};

/**
 * Применяет грейд-множитель к базовым статам экипировки/оружия
 */
export function applyGearGradeBonus(
  baseStats: CombatStats,
  grade: GradeId | undefined
): CombatStats {
  if (!grade) return baseStats;

  const mult = GEAR_GRADE_MULT[grade] ?? 1;
  const result: CombatStats = {};

  for (const [stat, value] of Object.entries(baseStats)) {
    if (typeof value === 'number') {
      (result as any)[stat] = Math.round(value * mult);
    }
  }

  return result;
}
