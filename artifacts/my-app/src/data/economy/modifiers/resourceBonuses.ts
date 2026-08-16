// ═══════════════════════════════════════════════════════════════
// БОНУСЫ ГРЕЙДОВ ДЛЯ РЕСУРСОВ (бревна, руда, рыба, травы и т.д.)
// Грейд влияет на: скорость фарма, XP, цену продажи.
// ═══════════════════════════════════════════════════════════════

import type { GradeId } from '../../types';

/** Бонусы грейдов для ресурсов */
export const RESOURCE_GRADE_BONUSES: Record<GradeId, {
  speedPercent: number;   // % к скорости (отрицательный = быстрее)
  xpPercent: number;      // % к XP
  priceMult: number;      // множитель цены
}> = {
  common:    { speedPercent: 0,   xpPercent: 0,  priceMult: 1 },
  uncommon:  { speedPercent: -5,  xpPercent: 5,  priceMult: 1.2 },
  rare:      { speedPercent: -10, xpPercent: 10, priceMult: 1.5 },
  epic:      { speedPercent: -20, xpPercent: 20, priceMult: 2 },
  legendary: { speedPercent: -35, xpPercent: 35, priceMult: 3 },
};
