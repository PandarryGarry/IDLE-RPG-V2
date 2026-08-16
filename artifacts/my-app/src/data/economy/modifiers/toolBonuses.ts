// ═══════════════════════════════════════════════════════════════
// БОНУСЫ ИНСТРУМЕНТОВ
// Бонусы к скорости фарма даёт ГРЕЙД инструмента (не тир).
// Тир — только визуальная бирка (T1-T12).
// ═══════════════════════════════════════════════════════════════

import type { GradeId, BonusEntry } from './types';

/**
 * Грейд инструмента даёт бонус к скорости фарма.
 * common = 0%, uncommon = +5%, rare = +10% и т.д.
 */
export const TOOL_GRADE_BONUS: Record<GradeId, BonusEntry> = {
  common:    { source: 'tool_grade', stat: 'speed', percent: 0 },
  uncommon:  { source: 'tool_grade', stat: 'speed', percent: 5 },
  rare:      { source: 'tool_grade', stat: 'speed', percent: 10 },
  epic:      { source: 'tool_grade', stat: 'speed', percent: 20 },
  legendary: { source: 'tool_grade', stat: 'speed', percent: 35 },
};
