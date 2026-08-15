// ═══════════════════════════════════════════════════════════════
// ЭКИПИРОВКА
// Оружие, шлемы, нагрудники, щиты
// ═══════════════════════════════════════════════════════════════

import type { Item } from '../types';
import { getItemIcon } from '@/lib/icons';

export const EQUIPMENT_ITEMS: Record<string, Item> = {
  // ── Мечи (Smithing) ───────────────────────────────────────
  bronze_sword:  { id: 'bronze_sword',  name: 'Bronze Sword',  category: 'weapon', equipSlot: 'weapon', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('bronze_sword'),  combatStats: { attackBonus: 7,  strengthBonus: 8 } },
  iron_sword:    { id: 'iron_sword',    name: 'Iron Sword',    category: 'weapon', equipSlot: 'weapon', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('iron_sword'),    combatStats: { attackBonus: 10, strengthBonus: 12 } },
  steel_sword:   { id: 'steel_sword',   name: 'Steel Sword',   category: 'weapon', equipSlot: 'weapon', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('steel_sword'),   combatStats: { attackBonus: 15, strengthBonus: 18 } },
  mithril_sword: { id: 'mithril_sword', name: 'Mithril Sword', category: 'weapon', equipSlot: 'weapon', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('mithril_sword'), combatStats: { attackBonus: 25, strengthBonus: 30 } },
  adamant_sword: { id: 'adamant_sword', name: 'Adamant Sword', category: 'weapon', equipSlot: 'weapon', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('adamant_sword'), combatStats: { attackBonus: 35, strengthBonus: 42 } },
  rune_sword:    { id: 'rune_sword',    name: 'Rune Sword',    category: 'weapon', equipSlot: 'weapon', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('rune_sword'),    combatStats: { attackBonus: 45, strengthBonus: 54 } },
  dragon_sword:  { id: 'dragon_sword',  name: 'Dragon Sword',  category: 'weapon', equipSlot: 'weapon', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('dragon_sword'),  combatStats: { attackBonus: 60, strengthBonus: 72 } },

  // ── Шлемы (Smithing) ──────────────────────────────────────
  bronze_helm:  { id: 'bronze_helm',  name: 'Bronze Helm',  category: 'helm', equipSlot: 'helm', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('bronze_helm'),  combatStats: { defenceBonus: 5 } },
  iron_helm:    { id: 'iron_helm',    name: 'Iron Helm',    category: 'helm', equipSlot: 'helm', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('iron_helm'),    combatStats: { defenceBonus: 8 } },
  steel_helm:   { id: 'steel_helm',   name: 'Steel Helm',   category: 'helm', equipSlot: 'helm', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('steel_helm'),   combatStats: { defenceBonus: 12 } },
  mithril_helm: { id: 'mithril_helm', name: 'Mithril Helm', category: 'helm', equipSlot: 'helm', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('mithril_helm'), combatStats: { defenceBonus: 20 } },
  adamant_helm: { id: 'adamant_helm', name: 'Adamant Helm', category: 'helm', equipSlot: 'helm', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('adamant_helm'), combatStats: { defenceBonus: 30 } },
  rune_helm:    { id: 'rune_helm',    name: 'Rune Helm',    category: 'helm', equipSlot: 'helm', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('rune_helm'),    combatStats: { defenceBonus: 40 } },
  dragon_helm:  { id: 'dragon_helm',  name: 'Dragon Helm',  category: 'helm', equipSlot: 'helm', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('dragon_helm'),  combatStats: { defenceBonus: 55 } },

  // ── Нагрудники (Smithing) ─────────────────────────────────
  bronze_platebody:  { id: 'bronze_platebody',  name: 'Bronze Platebody',  category: 'platebody', equipSlot: 'platebody', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('bronze_platebody'),  combatStats: { defenceBonus: 15 } },
  iron_platebody:    { id: 'iron_platebody',    name: 'Iron Platebody',    category: 'platebody', equipSlot: 'platebody', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('iron_platebody'),    combatStats: { defenceBonus: 25 } },
  steel_platebody:   { id: 'steel_platebody',   name: 'Steel Platebody',   category: 'platebody', equipSlot: 'platebody', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('steel_platebody'),   combatStats: { defenceBonus: 40 } },
  mithril_platebody: { id: 'mithril_platebody', name: 'Mithril Platebody', category: 'platebody', equipSlot: 'platebody', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('mithril_platebody'), combatStats: { defenceBonus: 60 } },
  adamant_platebody: { id: 'adamant_platebody', name: 'Adamant Platebody', category: 'platebody', equipSlot: 'platebody', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('adamant_platebody'), combatStats: { defenceBonus: 80 } },
  rune_platebody:    { id: 'rune_platebody',    name: 'Rune Platebody',    category: 'platebody', equipSlot: 'platebody', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('rune_platebody'),    combatStats: { defenceBonus: 105 } },
  dragon_platebody:  { id: 'dragon_platebody',  name: 'Dragon Platebody',  category: 'platebody', equipSlot: 'platebody', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('dragon_platebody'),  combatStats: { defenceBonus: 130 } },

  // ── Щиты (Smithing) ───────────────────────────────────────
  bronze_shield:  { id: 'bronze_shield',  name: 'Bronze Shield',  category: 'shield', equipSlot: 'shield', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('bronze_shield'),  combatStats: { defenceBonus: 6 } },
  iron_shield:    { id: 'iron_shield',    name: 'Iron Shield',    category: 'shield', equipSlot: 'shield', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('iron_shield'),    combatStats: { defenceBonus: 10 } },
  steel_shield:   { id: 'steel_shield',   name: 'Steel Shield',   category: 'shield', equipSlot: 'shield', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('steel_shield'),   combatStats: { defenceBonus: 16 } },
  mithril_shield: { id: 'mithril_shield', name: 'Mithril Shield', category: 'shield', equipSlot: 'shield', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('mithril_shield'), combatStats: { defenceBonus: 24 } },
  adamant_shield: { id: 'adamant_shield', name: 'Adamant Shield', category: 'shield', equipSlot: 'shield', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('adamant_shield'), combatStats: { defenceBonus: 34 } },
  rune_shield:    { id: 'rune_shield',    name: 'Rune Shield',    category: 'shield', equipSlot: 'shield', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('rune_shield'),    combatStats: { defenceBonus: 44 } },
  dragon_shield:  { id: 'dragon_shield',  name: 'Dragon Shield',  category: 'shield', equipSlot: 'shield', sellValue: 0, canSell: true, stackable: false, icon: getItemIcon('dragon_shield'),  combatStats: { defenceBonus: 60 } },
};
