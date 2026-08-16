// ═══════════════════════════════════════════════════════════════
// АГРЕГАТОР ЭКОНОМИКИ — единая точка доступа для интерфейсов/механик.
// База (prices/xp/speed) × модификаторы (modifiers) = эффективное значение.
//
// МОДЕЛЬ КАЧЕСТВА:
//   Тир (1-12)  — только визуальная бирка, бонусов НЕ даёт.
//   Грейд       — цвет + бонусы (ресурсы: цена/XP/скорость; экипировка: статы).
// ═══════════════════════════════════════════════════════════════

import type { GradeId } from '../types';
import { getBasePrice } from './prices';
import { getBaseXp } from './xp';
import { getBaseInterval } from './speed';
import {
  collectBonuses,
  MAX_BONUS_PERCENT,
  getResourcePriceModifier,
  getResourceXpModifier,
  getResourceSpeedModifier,
  getEffectiveEquipmentStats,
  type BonusStat,
  type EconomyContext,
} from './modifiers';

/** Расширенный контекст расчёта */
export interface CalcContext extends EconomyContext {
  /** Грейд предмета (ресурса) — влияет на цену/XP/скорость */
  itemGrade?: GradeId;
}

export function actionKey(skill: string, itemId: string): string {
  return `${skill}.${itemId}`;
}

// ── Суммирование бонусов (аддитивно, с капом) ──
function sumBonus(stat: BonusStat, ctx: EconomyContext): number {
  const total = collectBonuses(ctx)
    .filter(b => b.stat === stat)
    .reduce((s, b) => s + b.percent, 0);
  const cap = MAX_BONUS_PERCENT[stat];
  return Math.max(-cap, Math.min(cap, total));
}

// ── Эффективные значения ──

/** XP за действие: база × бонусы × грейд-множитель ресурса */
export function getEffectiveXp(key: string, ctx: CalcContext = {}): number {
  const base = getBaseXp(key);
  return Math.round(base * (1 + sumBonus('xp', ctx) / 100) * getResourceXpModifier(ctx.itemGrade));
}

/** Скорость (мс): база × (1 − speedBonus) × грейд-множитель ресурса */
export function getEffectiveInterval(key: string, ctx: CalcContext = {}): number {
  const base = getBaseInterval(key);
  const reduced = base * (1 - sumBonus('speed', ctx) / 100) * getResourceSpeedModifier(ctx.itemGrade);
  return Math.max(200, Math.round(reduced)); // не быстрее 0.2с
}

/** Цена: база × грейд-множитель ресурса × бонусы цены */
export function getEffectivePrice(itemId: string, ctx: CalcContext = {}): number {
  const base = getBasePrice(itemId);
  return Math.round(base * getResourcePriceModifier(ctx.itemGrade) * (1 + sumBonus('price', ctx) / 100));
}

// ── Разбор для отладки / тултипов ──
export function describeEffective(key: string, ctx: CalcContext = {}) {
  return {
    key,
    baseXp: getBaseXp(key),
    baseInterval: getBaseInterval(key),
    bonuses: collectBonuses(ctx),
    effectiveXp: getEffectiveXp(key, ctx),
    effectiveInterval: getEffectiveInterval(key, ctx),
  };
}

// Реэкспорт базы и экипировочных статов
export { getBasePrice, getBaseXp, getBaseInterval, getEffectiveEquipmentStats };
export type { CalcContext as EconomyCalcContext };
