// ═══════════════════════════════════════════════════════════════
// БОНУСЫ ГРЕЙДОВ
// Ресурсы: бонусы к скорости фарма и XP
// Экипировка/оружие/инструменты: бонусы к статам
// ═══════════════════════════════════════════════════════════════

import type { GradeId, CombatStats } from '../../types';

/** Бонусы грейдов для ресурсов (скорость фарма, XP, цена) */
export const RESOURCE_GRADE_BONUSES: Record<GradeId, {
  speedPercent: number;   // % к скорости (отрицательный = быстрее)
  xpPercent: number;      // % к XP
  priceMult: number;      // множитель цены
}> = {
  common:    { speedPercent: 0,  xpPercent: 0,  priceMult: 1 },
  uncommon:  { speedPercent: -5, xpPercent: 5,  priceMult: 1.2 },
  rare:      { speedPercent: -10, xpPercent: 10, priceMult: 1.5 },
  epic:      { speedPercent: -20, xpPercent: 20, priceMult: 2 },
  legendary: { speedPercent: -35, xpPercent: 35, priceMult: 3 },
};

/** Бонусы грейдов для экипировки/оружия/инструментов (множители статов) */
export const EQUIPMENT_GRADE_MULT: Record<GradeId, number> = {
  common: 1.0,
  uncommon: 1.1,   // +10% ко всем статам
  rare: 1.25,      // +25%
  epic: 1.5,       // +50%
  legendary: 2.0,  // +100%
};

/**
 * Применяет грейд-множитель к базовым статам экипировки/оружия
 */
export function applyEquipmentGradeBonus(
  baseStats: CombatStats,
  grade: GradeId | undefined
): CombatStats {
  if (!grade) return baseStats;

  const mult = EQUIPMENT_GRADE_MULT[grade] ?? 1;
  const result: CombatStats = {};

  for (const [stat, value] of Object.entries(baseStats)) {
    if (typeof value === 'number') {
      (result as any)[stat] = Math.round(value * mult);
    }
  }

  return result;
}
