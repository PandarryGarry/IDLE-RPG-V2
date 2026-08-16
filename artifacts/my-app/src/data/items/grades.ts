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

// ═══════════════════════════════════════════════════════════════
// ВРЕМЕННО: дефолтные грейды ресурсов для визуальной навигации.
// Когда введём систему ролла грейдов — эта карта удаляется
// (грейд будет приходить из слота/экземпляра).
// ═══════════════════════════════════════════════════════════════

export const DEFAULT_GRADES: Record<string, GradeId> = {
  // ── Брёвна ──
  normal_logs: 'common', oak_logs: 'common', willow_logs: 'uncommon', teak_logs: 'uncommon',
  maple_logs: 'rare', mahogany_logs: 'rare', magic_logs: 'epic', redwood_logs: 'legendary',
  // ── Руда ──
  copper_ore: 'common', tin_ore: 'common', iron_ore: 'uncommon', coal_ore: 'uncommon',
  gold_ore: 'rare', mithril_ore: 'rare', adamantite_ore: 'epic', runite_ore: 'epic', dragonite_ore: 'legendary',
  // ── Слитки ──
  bronze_bar: 'common', iron_bar: 'uncommon', steel_bar: 'uncommon', gold_bar: 'rare',
  mithril_bar: 'rare', adamantite_bar: 'epic', runite_bar: 'epic', dragon_bar: 'legendary',
  // ── Сырая рыба ──
  raw_shrimp: 'common', raw_sardine: 'common', raw_herring: 'uncommon', raw_mackerel: 'uncommon',
  raw_trout: 'rare', raw_salmon: 'rare', raw_lobster: 'epic', raw_swordfish: 'epic',
  raw_crab: 'epic', raw_shark: 'epic', raw_manta_ray: 'legendary', raw_whale: 'legendary',
  // ── Приготовленная рыба ──
  shrimp: 'common', sardine: 'common', herring: 'uncommon', mackerel: 'uncommon',
  trout: 'rare', salmon: 'rare', lobster: 'epic', swordfish: 'epic',
  cooked_crab: 'epic', shark: 'epic', manta_ray: 'legendary', whale: 'legendary', burnt_fish: 'common',
  // ── Кости / зола / уголь ──
  bones: 'common', big_bones: 'uncommon', dragon_bones: 'legendary',
  ash: 'common', charcoal: 'uncommon',
  // ── Самоцветы ──
  topaz: 'uncommon', sapphire: 'rare', emerald: 'rare', ruby: 'epic', diamond: 'epic', onyx: 'legendary',
  // ── Травы ──
  guam: 'common', marrentill: 'common', tarromin: 'uncommon', harralander: 'uncommon',
  ranarr: 'rare', toadflax: 'rare', irit: 'rare', avantoe: 'epic', kwuarm: 'epic',
  snapdragon: 'epic', cadantine: 'epic', torstol: 'legendary',
  // ── Руны ──
  air_rune: 'common', water_rune: 'common', earth_rune: 'common', fire_rune: 'uncommon',
  mind_rune: 'uncommon', body_rune: 'uncommon', chaos_rune: 'rare', death_rune: 'rare',
  blood_rune: 'epic', ancient_rune: 'legendary',
};

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
