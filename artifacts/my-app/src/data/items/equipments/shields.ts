// ═══════════════════════════════════════════════════════════════
// ЩИТЫ (equipSlot: 'shield')
// Дают defenceBonus. Занимают 1 слот.
// Не может быть экипирован одновременно с двуручным оружием/посохом.
// ═══════════════════════════════════════════════════════════════

import type { Item } from '../../types';
import { getItemIcon } from '@/lib/icons';

export const SHIELDS: Record<string, Item> = {
  bronze_shield: {
    id: 'bronze_shield', name: 'Bronze Shield',
    category: 'shield', description: 'Простой бронзовый щит',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'shield', tier: 1,
    baseStats: { defenceBonus: 6 },
    icon: getItemIcon('bronze_shield'),
  },
  iron_shield: {
    id: 'iron_shield', name: 'Iron Shield',
    category: 'shield', description: 'Железный щит',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'shield', tier: 2,
    baseStats: { defenceBonus: 10 },
    icon: getItemIcon('iron_shield'),
  },
  steel_shield: {
    id: 'steel_shield', name: 'Steel Shield',
    category: 'shield', description: 'Стальной щит',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'shield', tier: 3,
    baseStats: { defenceBonus: 16 },
    icon: getItemIcon('steel_shield'),
  },
  mithril_shield: {
    id: 'mithril_shield', name: 'Mithril Shield',
    category: 'shield', description: 'Мифриловый щит',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'shield', tier: 4,
    baseStats: { defenceBonus: 24 },
    icon: getItemIcon('mithril_shield'),
  },
  adamant_shield: {
    id: 'adamant_shield', name: 'Adamant Shield',
    category: 'shield', description: 'Адамантиевый щит',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'shield', tier: 5,
    baseStats: { defenceBonus: 34 },
    icon: getItemIcon('adamant_shield'),
  },
  rune_shield: {
    id: 'rune_shield', name: 'Rune Shield',
    category: 'shield', description: 'Рунический щит',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'shield', tier: 6,
    baseStats: { defenceBonus: 44 },
    icon: getItemIcon('rune_shield'),
  },
  dragon_shield: {
    id: 'dragon_shield', name: 'Dragon Shield',
    category: 'shield', description: 'Драконий щит',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'shield', tier: 7,
    baseStats: { defenceBonus: 60 },
    icon: getItemIcon('dragon_shield'),
  },
};
