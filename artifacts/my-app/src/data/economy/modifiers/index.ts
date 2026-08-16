// ═══════════════════════════════════════════════════════════════
// АГРЕГАТОР МОДИФИКАТОРОВ
// Единая точка доступа ко всем бонусам и модификаторам экономики.
// ═══════════════════════════════════════════════════════════════

import type { Item, CombatStats, GradeId } from '../../types';
import { TOOL_GRADE_BONUS } from './toolBonuses';
import { applyGearGradeBonus } from './gearBonuses';
import { RESOURCE_GRADE_BONUSES } from './resourceBonuses';
import type { EconomyContext, BonusEntry } from './types';

export * from './types';
export * from './toolBonuses';
export * from './gearBonuses';
export * from './resourceBonuses';
export * from './weatherBonuses';
export * from './runeBonuses';

/**
 * Собирает все активные бонусы из контекста
 */
export function collectBonuses(ctx: EconomyContext): BonusEntry[] {
  const out: BonusEntry[] = [];

  // Бонус от грейда инструмента
  if (ctx.toolGrade && TOOL_GRADE_BONUS[ctx.toolGrade as GradeId]) {
    out.push(TOOL_GRADE_BONUS[ctx.toolGrade as GradeId]);
  }

  // future: зелья, заточка, бижутерия, гильдия, погода — добавляются сюда

  return out;
}

/**
 * Получить итоговые характеристики экипировки/оружия с учётом грейда и рун
 */
export function getEffectiveEquipmentStats(
  item: Item,
  appliedRunes: string[] = []
): CombatStats {
  let stats = { ...(item.baseStats ?? {}) };

  // 1. Применяем грейд-множитель (экипировка/оружие)
  if (item.grade && (item.category === 'weapon' || item.equipSlot)) {
    stats = applyGearGradeBonus(stats, item.grade);
  }

  // 2. Применяем руны (будущее)
  // stats = applyRuneBonuses(stats, appliedRunes);

  return stats;
}

/**
 * Получить модификаторы цены для ресурса по его грейду
 */
export function getResourcePriceModifier(grade: GradeId | undefined): number {
  if (!grade) return 1;
  return RESOURCE_GRADE_BONUSES[grade]?.priceMult ?? 1;
}

/**
 * Получить модификаторы XP для ресурса по его грейду
 */
export function getResourceXpModifier(grade: GradeId | undefined): number {
  if (!grade) return 1;
  const bonus = RESOURCE_GRADE_BONUSES[grade];
  return bonus ? (1 + bonus.xpPercent / 100) : 1;
}

/**
 * Получить модификатор скорости для ресурса по его грейду
 */
export function getResourceSpeedModifier(grade: GradeId | undefined): number {
  if (!grade) return 1;
  const bonus = RESOURCE_GRADE_BONUSES[grade];
  return bonus ? (1 + bonus.speedPercent / 100) : 1;
}
