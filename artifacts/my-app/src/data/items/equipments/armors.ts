// ═══════════════════════════════════════════════════════════════
// ТОРСЫ / КОМБИНЕЗОНЫ (category: 'platebody')
// Некоторые топовые доспехи — комбинезоны (fullBody: true),
// занимают слоты platebody + platelegs.
// Остальные — только platebody.
// ═══════════════════════════════════════════════════════════════

import type { Item } from '../../types';
import { getItemIcon } from '@/lib/icons';

export const ARMORS: Record<string, Item> = {
  bronze_platebody: {
    id: 'bronze_platebody', name: 'Bronze Platebody',
    category: 'platebody', description: 'Бронзовый нагрудник',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'platebody', tier: 1,
    baseStats: { defenceBonus: 15 },
    icon: getItemIcon('bronze_platebody'),
  },
  iron_platebody: {
    id: 'iron_platebody', name: 'Iron Platebody',
    category: 'platebody', description: 'Железный нагрудник',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'platebody', tier: 2,
    baseStats: { defenceBonus: 25 },
    icon: getItemIcon('iron_platebody'),
  },
  steel_platebody: {
    id: 'steel_platebody', name: 'Steel Platebody',
    category: 'platebody', description: 'Стальной нагрудник',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'platebody', tier: 3,
    baseStats: { defenceBonus: 40 },
    icon: getItemIcon('steel_platebody'),
  },
  mithril_platebody: {
    id: 'mithril_platebody', name: 'Mithril Platebody',
    category: 'platebody', description: 'Мифриловый нагрудник',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'platebody', tier: 4,
    baseStats: { defenceBonus: 60 },
    icon: getItemIcon('mithril_platebody'),
  },
  // ── Комбинезоны (fullBody: true) — занимают platebody + platelegs ──
  adamant_platebody: {
    id: 'adamant_platebody', name: 'Adamant Platebody',
    category: 'platebody', description: 'Адамантиевый комбинезон, закрывающий торс и ноги',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'platebody', tier: 5,
    fullBody: true,
    baseStats: { defenceBonus: 80 },
    icon: getItemIcon('adamant_platebody'),
  },
  rune_platebody: {
    id: 'rune_platebody', name: 'Rune Platebody',
    category: 'platebody', description: 'Рунический комбинезон',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'platebody', tier: 6,
    fullBody: true,
    baseStats: { defenceBonus: 105 },
    icon: getItemIcon('rune_platebody'),
  },
  dragon_platebody: {
    id: 'dragon_platebody', name: 'Dragon Platebody',
    category: 'platebody', description: 'Легендарный драконий комбинезон',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'platebody', tier: 7,
    fullBody: true,
    baseStats: { defenceBonus: 130 },
    icon: getItemIcon('dragon_platebody'),
  },
};
