// ═══════════════════════════════════════════════════════════════
// ФАСАД ИНСТРУМЕНТОВ
// ═══════════════════════════════════════════════════════════════

import type { Item } from '../../types';
import { AXES } from './axes';
import { PICKAXES } from './pickaxes';
import { FISHING_RODS } from './fishingRods';

export const TOOLS: Record<string, Item> = {
  ...AXES,
  ...PICKAXES,
  ...FISHING_RODS,
};
