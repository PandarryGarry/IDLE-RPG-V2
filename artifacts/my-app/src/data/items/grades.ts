// ═══════════════════════════════════════════════════════════════
// ГРЕЙДЫ ПРЕДМЕТОВ (common..legendary)
// Цвет фона карточки (под эмодзи) для ВСЕХ предметов.
// Бонусы (скорость/XP/статы) — ТОЛЬКО для экипировки/оружия/инструментов.
// Ресурсы/крафченные предметы получают только цвет, без бонусов.
// ═══════════════════════════════════════════════════════════════

import type { GradeId } from '../types';

export interface GradeConfig {
  id: GradeId;
  name: string;
  bgColor: string;        // цвет фона карточки (под эмодзи)
  borderColor: string;    // цвет рамки карточки
  textColor: string;      // цвет текста названия
}

export const GRADES: Record<GradeId, GradeConfig> = {
  common: {
    id: 'common', name: 'Common',
    bgColor: 'bg-slate-900/40',
    borderColor: 'border-slate-500',
    textColor: 'text-slate-300',
  },
  uncommon: {
    id: 'uncommon', name: 'Uncommon',
    bgColor: 'bg-green-950/40',
    borderColor: 'border-green-500',
    textColor: 'text-green-300',
  },
  rare: {
    id: 'rare', name: 'Rare',
    bgColor: 'bg-blue-950/40',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-300',
  },
  epic: {
    id: 'epic', name: 'Epic',
    bgColor: 'bg-purple-950/40',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-300',
  },
  legendary: {
    id: 'legendary', name: 'Legendary',
    bgColor: 'bg-amber-950/40',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-300',
  },
};

export function getGradeConfig(grade: GradeId | undefined): GradeConfig | null {
  if (!grade) return null;
  return GRADES[grade] ?? null;
}


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
