// ═══════════════════════════════════════════════════════════════
// СЛОТЫ ЭКИПИРОВКИ ПО ТИПАМ ОРУЖИЯ
// Определяет, сколько слотов занимает оружие и требует ли оно
// дополнительных предметов (стрелы для лука).
// ═══════════════════════════════════════════════════════════════

import type { WeaponTypeId } from './types';

export interface WeaponSlots {
  /** Слот оружия (всегда 1) */
  weapon: 1;
  /** Слот щита (1 для двуручников и посохов, 0 для остальных) */
  shield: 0 | 1;
  /** Слот стрел (1 для лука, требует стрелы; 0 для остальных) */
  quiver: 0 | 1;
  /** Оружие требует стрелы в quiver для работы */
  requiresAmmo: boolean;
}

export const WEAPON_SLOTS: Record<WeaponTypeId, WeaponSlots> = {
  dagger:    { weapon: 1, shield: 0, quiver: 0, requiresAmmo: false },
  sword:     { weapon: 1, shield: 0, quiver: 0, requiresAmmo: false },
  twoHander: { weapon: 1, shield: 1, quiver: 0, requiresAmmo: false }, // занимает weapon + shield
  bow:       { weapon: 1, shield: 0, quiver: 1, requiresAmmo: true },  // требует стрелы
  crossbow:  { weapon: 1, shield: 0, quiver: 1, requiresAmmo: true },  // требует болты
  staff:     { weapon: 1, shield: 1, quiver: 0, requiresAmmo: false },  // занимает weapon + shield
};

export function getWeaponSlots(type: WeaponTypeId | undefined): WeaponSlots {
  return WEAPON_SLOTS[type ?? 'sword'] ?? WEAPON_SLOTS.sword;
}

