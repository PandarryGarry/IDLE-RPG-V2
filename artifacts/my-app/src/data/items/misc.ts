// ═══════════════════════════════════════════════════════════════
// ПРОЧИЕ ПРЕДМЕТЫ
// Квестовые, валюта, награды
// ═══════════════════════════════════════════════════════════════

import type { Item } from '../types';
import { getItemIcon } from '@/lib/icons';

export const MISC_ITEMS: Record<string, Item> = {
  mark_of_mastery: { id: 'mark_of_mastery', name: 'Mark of Mastery', category: 'misc', sellValue: 0, canSell: false, stackable: true, icon: getItemIcon('mark_of_mastery') },
  ancient_key:     { id: 'ancient_key',     name: 'Ancient Key',     category: 'misc', sellValue: 0, canSell: true,  stackable: true, icon: getItemIcon('ancient_key') },
  slayer_coin:     { id: 'slayer_coin',     name: 'Slayer Coin',     category: 'misc', sellValue: 0, canSell: false, stackable: true, icon: getItemIcon('slayer_coin') },
};
