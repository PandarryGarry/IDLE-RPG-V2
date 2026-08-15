// ═══════════════════════════════════════════════════════════════
// КРАФТ-ПРЕДМЕТЫ
// Зола, уголь, слитки, приготовленная рыба, руны
// ═══════════════════════════════════════════════════════════════

import type { Item } from '../types';
import { getItemIcon } from '@/lib/icons';

export const CRAFTED_ITEMS: Record<string, Item> = {
  // ── Зола (Firemaking — побочный продукт) ──────────────────
  ash: { id: 'ash', name: 'Ash', category: 'ash', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('ash') },

  // ── Уголь (Firemaking — продукт, тир в BankSlot) ──────────
  charcoal: { id: 'charcoal', name: 'Charcoal', category: 'charcoal', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('charcoal') },

  // ── Слитки (Smithing — плавка руды) ───────────────────────
  bronze_bar:     { id: 'bronze_bar',     name: 'Bronze Bar',     category: 'bar', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('bronze_bar') },
  iron_bar:       { id: 'iron_bar',       name: 'Iron Bar',       category: 'bar', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('iron_bar') },
  steel_bar:      { id: 'steel_bar',      name: 'Steel Bar',      category: 'bar', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('steel_bar') },
  gold_bar:       { id: 'gold_bar',       name: 'Gold Bar',       category: 'bar', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('gold_bar') },
  mithril_bar:    { id: 'mithril_bar',    name: 'Mithril Bar',    category: 'bar', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('mithril_bar') },
  adamantite_bar: { id: 'adamantite_bar', name: 'Adamantite Bar', category: 'bar', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('adamantite_bar') },
  runite_bar:     { id: 'runite_bar',     name: 'Runite Bar',     category: 'bar', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('runite_bar') },
  dragon_bar:     { id: 'dragon_bar',     name: 'Dragon Bar',     category: 'bar', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('dragon_bar') },

  // ── Приготовленная рыба (Cooking) ─────────────────────────
  shrimp:      { id: 'shrimp',      name: 'Shrimp',      category: 'cooked_fish', sellValue: 0, canSell: true, stackable: true, healAmount: 3,  icon: getItemIcon('shrimp') },
  sardine:     { id: 'sardine',     name: 'Sardine',     category: 'cooked_fish', sellValue: 0, canSell: true, stackable: true, healAmount: 4,  icon: getItemIcon('sardine') },
  herring:     { id: 'herring',     name: 'Herring',     category: 'cooked_fish', sellValue: 0, canSell: true, stackable: true, healAmount: 5,  icon: getItemIcon('herring') },
  mackerel:    { id: 'mackerel',    name: 'Mackerel',    category: 'cooked_fish', sellValue: 0, canSell: true, stackable: true, healAmount: 7,  icon: getItemIcon('mackerel') },
  trout:       { id: 'trout',       name: 'Trout',       category: 'cooked_fish', sellValue: 0, canSell: true, stackable: true, healAmount: 9,  icon: getItemIcon('trout') },
  salmon:      { id: 'salmon',      name: 'Salmon',      category: 'cooked_fish', sellValue: 0, canSell: true, stackable: true, healAmount: 12, icon: getItemIcon('salmon') },
  lobster:     { id: 'lobster',     name: 'Lobster',     category: 'cooked_fish', sellValue: 0, canSell: true, stackable: true, healAmount: 15, icon: getItemIcon('lobster') },
  swordfish:   { id: 'swordfish',   name: 'Swordfish',   category: 'cooked_fish', sellValue: 0, canSell: true, stackable: true, healAmount: 20, icon: getItemIcon('swordfish') },
  cooked_crab: { id: 'cooked_crab', name: 'Cooked Crab', category: 'cooked_fish', sellValue: 0, canSell: true, stackable: true, healAmount: 22, icon: getItemIcon('cooked_crab') },
  shark:       { id: 'shark',       name: 'Shark',       category: 'cooked_fish', sellValue: 0, canSell: true, stackable: true, healAmount: 25, icon: getItemIcon('shark') },
  manta_ray:   { id: 'manta_ray',   name: 'Manta Ray',   category: 'cooked_fish', sellValue: 0, canSell: true, stackable: true, healAmount: 30, icon: getItemIcon('manta_ray') },
  whale:       { id: 'whale',       name: 'Whale',       category: 'cooked_fish', sellValue: 0, canSell: true, stackable: true, healAmount: 35, icon: getItemIcon('whale') },
  burnt_fish:  { id: 'burnt_fish',  name: 'Burnt Fish',  category: 'cooked_fish', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('burnt_fish') },

  // ── Руны (Runecrafting) ───────────────────────────────────
  air_rune:     { id: 'air_rune',     name: 'Air Rune',     category: 'rune', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('air_rune') },
  water_rune:   { id: 'water_rune',   name: 'Water Rune',   category: 'rune', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('water_rune') },
  earth_rune:   { id: 'earth_rune',   name: 'Earth Rune',   category: 'rune', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('earth_rune') },
  fire_rune:    { id: 'fire_rune',    name: 'Fire Rune',    category: 'rune', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('fire_rune') },
  mind_rune:    { id: 'mind_rune',    name: 'Mind Rune',    category: 'rune', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('mind_rune') },
  body_rune:    { id: 'body_rune',    name: 'Body Rune',    category: 'rune', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('body_rune') },
  chaos_rune:   { id: 'chaos_rune',   name: 'Chaos Rune',   category: 'rune', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('chaos_rune') },
  death_rune:   { id: 'death_rune',   name: 'Death Rune',   category: 'rune', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('death_rune') },
  blood_rune:   { id: 'blood_rune',   name: 'Blood Rune',   category: 'rune', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('blood_rune') },
  ancient_rune: { id: 'ancient_rune', name: 'Ancient Rune', category: 'rune', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('ancient_rune') },
};
