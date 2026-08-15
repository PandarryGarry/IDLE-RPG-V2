// ═══════════════════════════════════════════════════════════════
// СОБИРАЕМЫЕ РЕСУРСЫ (сырьё)
// Только "ЧТО" это — без экономики (цены в balance.ts)
// ═══════════════════════════════════════════════════════════════

import type { Item } from '../types';
import { getItemIcon } from '@/lib/icons';

export const GATHERED_ITEMS: Record<string, Item> = {
  // ── Брёвна (Woodcutting) ──────────────────────────────────
  normal_logs:   { id: 'normal_logs',   name: 'Logs',          category: 'log', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('normal_logs') },
  oak_logs:      { id: 'oak_logs',      name: 'Oak Logs',      category: 'log', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('oak_logs') },
  willow_logs:   { id: 'willow_logs',   name: 'Willow Logs',   category: 'log', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('willow_logs') },
  teak_logs:     { id: 'teak_logs',     name: 'Teak Logs',     category: 'log', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('teak_logs') },
  maple_logs:    { id: 'maple_logs',    name: 'Maple Logs',    category: 'log', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('maple_logs') },
  mahogany_logs: { id: 'mahogany_logs', name: 'Mahogany Logs', category: 'log', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('mahogany_logs') },
  magic_logs:    { id: 'magic_logs',    name: 'Magic Logs',    category: 'log', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('magic_logs') },
  redwood_logs:  { id: 'redwood_logs',  name: 'Redwood Logs',  category: 'log', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('redwood_logs') },

  // ── Руда (Mining) ─────────────────────────────────────────
  copper_ore:     { id: 'copper_ore',     name: 'Copper Ore',     category: 'ore', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('copper_ore') },
  tin_ore:        { id: 'tin_ore',        name: 'Tin Ore',        category: 'ore', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('tin_ore') },
  iron_ore:       { id: 'iron_ore',       name: 'Iron Ore',       category: 'ore', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('iron_ore') },
  coal_ore:       { id: 'coal_ore',       name: 'Coal Ore',       category: 'ore', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('coal_ore') },
  gold_ore:       { id: 'gold_ore',       name: 'Gold Ore',       category: 'ore', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('gold_ore') },
  mithril_ore:    { id: 'mithril_ore',    name: 'Mithril Ore',    category: 'ore', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('mithril_ore') },
  adamantite_ore: { id: 'adamantite_ore', name: 'Adamantite Ore', category: 'ore', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('adamantite_ore') },
  runite_ore:     { id: 'runite_ore',     name: 'Runite Ore',     category: 'ore', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('runite_ore') },
  dragonite_ore:  { id: 'dragonite_ore',  name: 'Dragonite Ore',  category: 'ore', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('dragonite_ore') },

  // ── Сырая рыба (Fishing) ──────────────────────────────────
  raw_shrimp:    { id: 'raw_shrimp',    name: 'Raw Shrimp',    category: 'raw_fish', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('raw_shrimp') },
  raw_sardine:   { id: 'raw_sardine',   name: 'Raw Sardine',   category: 'raw_fish', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('raw_sardine') },
  raw_herring:   { id: 'raw_herring',   name: 'Raw Herring',   category: 'raw_fish', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('raw_herring') },
  raw_mackerel:  { id: 'raw_mackerel',  name: 'Raw Mackerel',  category: 'raw_fish', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('raw_mackerel') },
  raw_trout:     { id: 'raw_trout',     name: 'Raw Trout',     category: 'raw_fish', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('raw_trout') },
  raw_salmon:    { id: 'raw_salmon',    name: 'Raw Salmon',    category: 'raw_fish', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('raw_salmon') },
  raw_lobster:   { id: 'raw_lobster',   name: 'Raw Lobster',   category: 'raw_fish', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('raw_lobster') },
  raw_swordfish: { id: 'raw_swordfish', name: 'Raw Swordfish', category: 'raw_fish', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('raw_swordfish') },
  raw_crab:      { id: 'raw_crab',      name: 'Raw Crab',      category: 'raw_fish', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('raw_crab') },
  raw_shark:     { id: 'raw_shark',     name: 'Raw Shark',     category: 'raw_fish', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('raw_shark') },
  raw_manta_ray: { id: 'raw_manta_ray', name: 'Raw Manta Ray', category: 'raw_fish', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('raw_manta_ray') },
  raw_whale:     { id: 'raw_whale',     name: 'Raw Whale',     category: 'raw_fish', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('raw_whale') },

  // ── Травы (Herblore) ──────────────────────────────────────
  guam:        { id: 'guam',        name: 'Guam Leaf',   category: 'herb', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('guam') },
  marrentill:  { id: 'marrentill',  name: 'Marrentill',  category: 'herb', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('marrentill') },
  tarromin:    { id: 'tarromin',    name: 'Tarromin',    category: 'herb', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('tarromin') },
  harralander: { id: 'harralander', name: 'Harralander', category: 'herb', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('harralander') },
  ranarr:      { id: 'ranarr',      name: 'Ranarr Weed', category: 'herb', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('ranarr') },
  toadflax:    { id: 'toadflax',    name: 'Toadflax',    category: 'herb', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('toadflax') },
  irit:        { id: 'irit',        name: 'Irit Leaf',   category: 'herb', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('irit') },
  avantoe:     { id: 'avantoe',     name: 'Avantoe',     category: 'herb', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('avantoe') },
  kwuarm:      { id: 'kwuarm',      name: 'Kwuarm',      category: 'herb', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('kwuarm') },
  snapdragon:  { id: 'snapdragon',  name: 'Snapdragon',  category: 'herb', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('snapdragon') },
  cadantine:   { id: 'cadantine',   name: 'Cadantine',   category: 'herb', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('cadantine') },
  torstol:     { id: 'torstol',     name: 'Torstol',     category: 'herb', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('torstol') },

  // ── Самоцветы (Mining — случайный дроп) ───────────────────
  topaz:    { id: 'topaz',    name: 'Topaz',    category: 'gem', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('topaz') },
  sapphire: { id: 'sapphire', name: 'Sapphire', category: 'gem', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('sapphire') },
  emerald:  { id: 'emerald',  name: 'Emerald',  category: 'gem', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('emerald') },
  ruby:     { id: 'ruby',     name: 'Ruby',     category: 'gem', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('ruby') },
  diamond:  { id: 'diamond',  name: 'Diamond',  category: 'gem', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('diamond') },
  onyx:     { id: 'onyx',     name: 'Onyx',     category: 'gem', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('onyx') },

  // ── Кости (Combat — дроп с мобов) ─────────────────────────
  bones:        { id: 'bones',        name: 'Bones',        category: 'bone', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('bones') },
  big_bones:    { id: 'big_bones',    name: 'Big Bones',    category: 'bone', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('big_bones') },
  dragon_bones: { id: 'dragon_bones', name: 'Dragon Bones', category: 'bone', sellValue: 0, canSell: true, stackable: true, icon: getItemIcon('dragon_bones') },
};
