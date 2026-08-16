// ═══════════════════════════════════════════════════════════════
// ФАСАД ОРУЖИЯ: агрегирует все виды
// ═══════════════════════════════════════════════════════════════

import type { Item } from '../../types';
import { SWORDS } from './swords';
import { DAGGERS } from './daggers';
import { TWO_HANDERS } from './twoHanders';
import { BOWS } from './bows';
import { STAVES } from './staves';

export const WEAPONS: Record<string, Item> = {
  ...SWORDS,
  ...DAGGERS,
  ...TWO_HANDERS,
  ...BOWS,
  ...STAVES,
};
