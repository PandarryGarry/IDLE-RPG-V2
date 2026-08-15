// src/data/tiers.ts
// ═══════════════════════════════════════════════════════════════
// ЕДИНАЯ СПОКОЙНАЯ ПАЛИТРА ТИРОВ (1-8)
// Используется во всех местах игры: древесина, уголь, инструменты,
// руда, слитки, инвентарь. Приглушённые полутона без ядовитых цветов.
//
// Принцип прогрессии: каждый следующий тир = улучшение предыдущего
//   серый → бронза → оливковый → сталь → лазурь → слива → бордо → терракот
// ═══════════════════════════════════════════════════════════════

export interface Tier {
  id: number;
  name: string;
  nameEn: string;
  backgroundColor: string; // полупрозрачный фон иконок (~20%)
  textColor: string;       // цвет текста
  borderColor: string;     // цвет границы (~45%)
  glowColor: string;       // цвет свечения
  solidColor: string;      // плотный цвет для ярлыков (бейджи T1-T8)
}

export const TIERS: Record<number, Tier> = {
  1: {
    id: 1,
    name: 'Обычный',
    nameEn: 'Common',
    backgroundColor: 'bg-stone-500/20',
    textColor: 'text-stone-300',
    borderColor: 'border-stone-500/40',
    glowColor: 'shadow-stone-500/20',
    solidColor: 'bg-stone-600',
  },
  2: {
    id: 2,
    name: 'Бронзовый',
    nameEn: 'Bronze',
    backgroundColor: 'bg-amber-800/20',
    textColor: 'text-amber-300',
    borderColor: 'border-amber-700/45',
    glowColor: 'shadow-amber-700/20',
    solidColor: 'bg-amber-800',
  },
  3: {
    id: 3,
    name: 'Стальной',
    nameEn: 'Steel',
    backgroundColor: 'bg-emerald-700/20',
    textColor: 'text-emerald-300',
    borderColor: 'border-emerald-600/45',
    glowColor: 'shadow-emerald-600/20',
    solidColor: 'bg-emerald-700',
  },
  4: {
    id: 4,
    name: 'Железный',
    nameEn: 'Iron',
    backgroundColor: 'bg-teal-700/20',
    textColor: 'text-teal-300',
    borderColor: 'border-teal-600/45',
    glowColor: 'shadow-teal-600/20',
    solidColor: 'bg-teal-700',
  },
  5: {
    id: 5,
    name: 'Мифриловый',
    nameEn: 'Mithril',
    backgroundColor: 'bg-blue-800/20',
    textColor: 'text-blue-300',
    borderColor: 'border-blue-700/45',
    glowColor: 'shadow-blue-700/20',
    solidColor: 'bg-blue-800',
  },
  6: {
    id: 6,
    name: 'Адмантитовый',
    nameEn: 'Adamantite',
    backgroundColor: 'bg-violet-700/20',
    textColor: 'text-violet-300',
    borderColor: 'border-violet-600/45',
    glowColor: 'shadow-violet-600/20',
    solidColor: 'bg-violet-700',
  },
  7: {
    id: 7,
    name: 'Рунический',
    nameEn: 'Rune',
    backgroundColor: 'bg-rose-700/20',
    textColor: 'text-rose-300',
    borderColor: 'border-rose-600/45',
    glowColor: 'shadow-rose-600/20',
    solidColor: 'bg-rose-700',
  },
  8: {
    id: 8,
    name: 'Драконий',
    nameEn: 'Dragon',
    backgroundColor: 'bg-red-800/20',
    textColor: 'text-red-300',
    borderColor: 'border-red-700/45',
    glowColor: 'shadow-red-700/20',
    solidColor: 'bg-red-800',
  },
};

// ═══════════════════════════════════════════════════════════════
// ХЕЛПЕР-ФУНКЦИИ
// ═══════════════════════════════════════════════════════════════

export function getTier(tier?: number): Tier {
  return TIERS[tier ?? 1] ?? TIERS[1];
}

export function getTierBackground(tier?: number): string {
  return getTier(tier).backgroundColor;
}

export function getTierText(tier?: number): string {
  return getTier(tier).textColor;
}

export function getTierBorder(tier?: number): string {
  return getTier(tier).borderColor;
}

export function getTierGlow(tier?: number): string {
  return getTier(tier).glowColor;
}

export function getTierSolid(tier?: number): string {
  return getTier(tier).solidColor;
}

export function getTierName(tier?: number): string {
  return getTier(tier).name;
}

export function getTierNameEn(tier?: number): string {
  return getTier(tier).nameEn;
}

export function isValidTier(tier?: number): boolean {
  return tier !== undefined && tier >= 1 && tier <= 8;
}
