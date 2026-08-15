// ═══════════════════════════════════════════════════════════════
// ФАСАД: агрегирует предметы из подмодулей + экономику из economy/prices
// Предметы хранят только "ЧТО" — цены подмешиваются здесь.
// getItem / getAllItems — стабильный публичный API (ничего не ломается)
// ═══════════════════════════════════════════════════════════════

import type { Item } from '../types';
import { getBasePrice } from '../economy/prices';  // ← импорт из economy/
import { GATHERED_ITEMS } from './gathered';
import { CRAFTED_ITEMS } from './crafted';
import { EQUIPMENT_ITEMS } from './equipment';
import { MISC_ITEMS } from './misc';

// Подмешиваем экономику: sellValue приходит из economy/prices.ts
function withEconomy(item: Item): Item {
  return { ...item, sellValue: getBasePrice(item.id) };
}

const ITEMS: Record<string, Item> = {};
for (const raw of [
  ...Object.values(GATHERED_ITEMS),
  ...Object.values(CRAFTED_ITEMS),
  ...Object.values(EQUIPMENT_ITEMS),
  ...Object.values(MISC_ITEMS),
]) {
  ITEMS[raw.id] = withEconomy(raw);
}

export default ITEMS;

export function getItem(id: string): Item | undefined {
  return ITEMS[id];
}

export function getAllItems(): Item[] {
  return Object.values(ITEMS);
}
