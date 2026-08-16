// ═══════════════════════════════════════════════════════════════
// ШЛЕМЫ (equipSlot: 'helm')
// Дают defenceBonus. Занимают 1 слот.
// ═══════════════════════════════════════════════════════════════

import type { Item } from '../../types';
import { getItemIcon } from '@/lib/icons';

export const HELMS: Record<string, Item> = {
  bronze_helm: {
    id: 'bronze_helm', name: 'Bronze Helm',
    category: 'helm', description: 'Простой бронзовый шлем',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'helm', tier: 1,
    baseStats: { defenceBonus: 5 },
    icon: getItemIcon('bronze_helm'),
  },
  iron_helm: {
    id: 'iron_helm', name: 'Iron Helm',
    category: 'helm', description: 'Железный шлем',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'helm', tier: 2,
    baseStats: { defenceBonus: 8 },
    icon: getItemIcon('iron_helm'),
  },
  steel_helm: {
    id: 'steel_helm', name: 'Steel Helm',
    category: 'helm', description: 'Стальной шлем',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'helm', tier: 3,
    baseStats: { defenceBonus: 12 },
    icon: getItemIcon('steel_helm'),
  },
  mithril_helm: {
    id: 'mithril_helm', name: 'Mithril Helm',
    category: 'helm', description: 'Лёгкий мифриловый шлем',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'helm', tier: 4,
    baseStats: { defenceBonus: 20 },
    icon: getItemIcon('mithril_helm'),
  },
  adamant_helm: {
    id: 'adamant_helm', name: 'Adamant Helm',
    category: 'helm', description: 'Тяжёлый адамантиевый шлем',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'helm', tier: 5,
    baseStats: { defenceBonus: 30 },
    icon: getItemIcon('adamant_helm'),
  },
  rune_helm: {
    id: 'rune_helm', name: 'Rune Helm',
    category: 'helm', description: 'Рунический шлем',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'helm', tier: 6,
    baseStats: { defenceBonus: 40 },
    icon: getItemIcon('rune_helm'),
  },
  dragon_helm: {
    id: 'dragon_helm', name: 'Dragon Helm',
    category: 'helm', description: 'Драконий шлем с мощной защитой',
    sellValue: 0, canSell: true, stackable: false,
    equipSlot: 'helm', tier: 7,
    baseStats: { defenceBonus: 55 },
    icon: getItemIcon('dragon_helm'),
  },
};
