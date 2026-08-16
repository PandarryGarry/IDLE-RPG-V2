// ═══════════════════════════════════════════════════════════════
// ФАСАД ЭКИПИРОВКИ: агрегирует все слоты
// ═══════════════════════════════════════════════════════════════

import type { Item } from '../../types';
import { HELMS } from './helms';
import { ARMORS } from './armors';
import { PLATELEGS } from './platelegs';
import { BOOTS } from './boots';
import { GLOVES } from './gloves';
import { SHIELDS } from './shields';

export const EQUIPMENT_ITEMS: Record<string, Item> = {
  ...HELMS,
  ...ARMORS,
  ...PLATELEGS,
  ...BOOTS,
  ...GLOVES,
  ...SHIELDS,
};
