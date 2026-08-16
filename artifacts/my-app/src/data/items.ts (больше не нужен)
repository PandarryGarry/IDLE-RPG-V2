import type { Item } from './types';
import { getItemIcon } from '@/lib/icons';

const ITEMS: Record<string, Item> = {
  // ── Logs (цены снижены: 1/2/3/5/8/12/18/25) ────────────────
  normal_logs:    { id: 'normal_logs',    name: 'Logs',           category: 'log',   sellValue: 1,    canSell: true,  stackable: true,  icon: getItemIcon('normal_logs') },
  oak_logs:       { id: 'oak_logs',       name: 'Oak Logs',       category: 'log',   sellValue: 2,    canSell: true,  stackable: true,  icon: getItemIcon('oak_logs') },
  willow_logs:    { id: 'willow_logs',    name: 'Willow Logs',    category: 'log',   sellValue: 3,    canSell: true,  stackable: true,  icon: getItemIcon('willow_logs') },
  teak_logs:      { id: 'teak_logs',      name: 'Teak Logs',      category: 'log',   sellValue: 5,    canSell: true,  stackable: true,  icon: getItemIcon('teak_logs') },
  maple_logs:     { id: 'maple_logs',     name: 'Maple Logs',     category: 'log',   sellValue: 8,    canSell: true,  stackable: true,  icon: getItemIcon('maple_logs') },
  mahogany_logs:  { id: 'mahogany_logs',  name: 'Mahogany Logs',  category: 'log',   sellValue: 12,   canSell: true,  stackable: true,  icon: getItemIcon('mahogany_logs') },
  magic_logs:     { id: 'magic_logs',     name: 'Magic Logs',     category: 'log',   sellValue: 18,   canSell: true,  stackable: true,  icon: getItemIcon('magic_logs') },
  redwood_logs:   { id: 'redwood_logs',   name: 'Redwood Logs',   category: 'log',   sellValue: 25,   canSell: true,  stackable: true,  icon: getItemIcon('redwood_logs') },
  // ── Ashes ──────────────────────────────────────────────────
  ash:            { id: 'ash',            name: 'Ash',            category: 'ash',   sellValue: 3,    canSell: true,  stackable: true,  icon: getItemIcon('ash') },
  // ── Charcoal (базовая цена Tier 1, тир определяется в BankSlot) ─
  charcoal:       { id: 'charcoal',       name: 'Charcoal',       category: 'charcoal', sellValue: 3,    canSell: true,  stackable: true,  icon: getItemIcon('charcoal') },
  // ── Ores (цены выше брёвен — сырьё для крафта) ────────────
  copper_ore:     { id: 'copper_ore',     name: 'Copper Ore',     category: 'ore',   sellValue: 2,    canSell: true,  stackable: true,  icon: getItemIcon('copper_ore') },
  tin_ore:        { id: 'tin_ore',        name: 'Tin Ore',        category: 'ore',   sellValue: 2,    canSell: true,  stackable: true,  icon: getItemIcon('tin_ore') },
  iron_ore:       { id: 'iron_ore',       name: 'Iron Ore',       category: 'ore',   sellValue: 4,    canSell: true,  stackable: true,  icon: getItemIcon('iron_ore') },
  coal_ore:       { id: 'coal_ore',       name: 'Coal Ore',       category: 'ore',   sellValue: 6,    canSell: true,  stackable: true,  icon: getItemIcon('coal_ore') },
  gold_ore:       { id: 'gold_ore',       name: 'Gold Ore',       category: 'ore',   sellValue: 10,   canSell: true,  stackable: true,  icon: getItemIcon('gold_ore') },
  mithril_ore:    { id: 'mithril_ore',    name: 'Mithril Ore',    category: 'ore',   sellValue: 16,   canSell: true,  stackable: true,  icon: getItemIcon('mithril_ore') },
  adamantite_ore: { id: 'adamantite_ore', name: 'Adamantite Ore', category: 'ore',   sellValue: 24,   canSell: true,  stackable: true,  icon: getItemIcon('adamantite_ore') },
  runite_ore:     { id: 'runite_ore',     name: 'Runite Ore',     category: 'ore',   sellValue: 35,   canSell: true,  stackable: true,  icon: getItemIcon('runite_ore') },
  dragonite_ore:  { id: 'dragonite_ore',  name: 'Dragonite Ore',  category: 'ore',   sellValue: 50,   canSell: true,  stackable: true,  icon: getItemIcon('dragonite_ore') },
  // ── Bars ───────────────────────────────────────────────────
  bronze_bar:     { id: 'bronze_bar',     name: 'Bronze Bar',     category: 'bar',   sellValue: 20,   canSell: true,  stackable: true,  icon: getItemIcon('bronze_bar') },
  iron_bar:       { id: 'iron_bar',       name: 'Iron Bar',       category: 'bar',   sellValue: 60,   canSell: true,  stackable: true,  icon: getItemIcon('iron_bar') },
  steel_bar:      { id: 'steel_bar',      name: 'Steel Bar',      category: 'bar',   sellValue: 120,  canSell: true,  stackable: true,  icon: getItemIcon('steel_bar') },
  gold_bar:       { id: 'gold_bar',       name: 'Gold Bar',       category: 'bar',   sellValue: 200,  canSell: true,  stackable: true,  icon: getItemIcon('gold_bar') },
  mithril_bar:    { id: 'mithril_bar',    name: 'Mithril Bar',    category: 'bar',   sellValue: 320,  canSell: true,  stackable: true,  icon: getItemIcon('mithril_bar') },
  adamantite_bar: { id: 'adamantite_bar', name: 'Adamantite Bar', category: 'bar',   sellValue: 530,  canSell: true,  stackable: true,  icon: getItemIcon('adamantite_bar') },
  runite_bar:     { id: 'runite_bar',     name: 'Runite Bar',     category: 'bar',   sellValue: 1000, canSell: true,  stackable: true,  icon: getItemIcon('runite_bar') },
  dragon_bar:     { id: 'dragon_bar',     name: 'Dragon Bar',     category: 'bar',   sellValue: 1950, canSell: true,  stackable: true,  icon: getItemIcon('dragon_bar') },
  // ── Raw Fish ───────────────────────────────────────────────
  raw_shrimp:     { id: 'raw_shrimp',     name: 'Raw Shrimp',     category: 'raw_fish', sellValue: 3,   canSell: true,  stackable: true,  icon: getItemIcon('raw_shrimp') },
  raw_sardine:    { id: 'raw_sardine',    name: 'Raw Sardine',    category: 'raw_fish', sellValue: 7,   canSell: true,  stackable: true,  icon: getItemIcon('raw_sardine') },
  raw_herring:    { id: 'raw_herring',    name: 'Raw Herring',    category: 'raw_fish', sellValue: 12,  canSell: true,  stackable: true,  icon: getItemIcon('raw_herring') },
  raw_mackerel:   { id: 'raw_mackerel',   name: 'Raw Mackerel',   category: 'raw_fish', sellValue: 18,  canSell: true,  stackable: true,  icon: getItemIcon('raw_mackerel') },
  raw_trout:      { id: 'raw_trout',      name: 'Raw Trout',      category: 'raw_fish', sellValue: 30,  canSell: true,  stackable: true,  icon: getItemIcon('raw_trout') },
  raw_salmon:     { id: 'raw_salmon',     name: 'Raw Salmon',     category: 'raw_fish', sellValue: 45,  canSell: true,  stackable: true,  icon: getItemIcon('raw_salmon') },
  raw_lobster:    { id: 'raw_lobster',    name: 'Raw Lobster',    category: 'raw_fish', sellValue: 80,  canSell: true,  stackable: true,  icon: getItemIcon('raw_lobster') },
  raw_swordfish:  { id: 'raw_swordfish',  name: 'Raw Swordfish',  category: 'raw_fish', sellValue: 130, canSell: true,  stackable: true,  icon: getItemIcon('raw_swordfish') },
  raw_crab:       { id: 'raw_crab',       name: 'Raw Crab',       category: 'raw_fish', sellValue: 160, canSell: true,  stackable: true,  icon: getItemIcon('raw_crab') },
  raw_shark:      { id: 'raw_shark',      name: 'Raw Shark',      category: 'raw_fish', sellValue: 210, canSell: true,  stackable: true,  icon: getItemIcon('raw_shark') },
  raw_manta_ray:  { id: 'raw_manta_ray',  name: 'Raw Manta Ray',  category: 'raw_fish', sellValue: 500, canSell: true,  stackable: true,  icon: getItemIcon('raw_manta_ray') },
  raw_whale:      { id: 'raw_whale',      name: 'Raw Whale',      category: 'raw_fish', sellValue: 800, canSell: true,  stackable: true,  icon: getItemIcon('raw_whale') },
  // ── Cooked Fish ─────────────────────────────────────────────
  shrimp:         { id: 'shrimp',         name: 'Shrimp',         category: 'cooked_fish', sellValue: 5,    canSell: true,  stackable: true,  healAmount: 3,  icon: getItemIcon('shrimp') },
  sardine:        { id: 'sardine',        name: 'Sardine',        category: 'cooked_fish', sellValue: 10,   canSell: true,  stackable: true,  healAmount: 4,  icon: getItemIcon('sardine') },
  herring:        { id: 'herring',        name: 'Herring',        category: 'cooked_fish', sellValue: 15,   canSell: true,  stackable: true,  healAmount: 5,  icon: getItemIcon('herring') },
  mackerel:       { id: 'mackerel',       name: 'Mackerel',       category: 'cooked_fish', sellValue: 22,   canSell: true,  stackable: true,  healAmount: 7,  icon: getItemIcon('mackerel') },
  trout:          { id: 'trout',          name: 'Trout',          category: 'cooked_fish', sellValue: 40,   canSell: true,  stackable: true,  healAmount: 9,  icon: getItemIcon('trout') },
  salmon:         { id: 'salmon',         name: 'Salmon',         category: 'cooked_fish', sellValue: 60,   canSell: true,  stackable: true,  healAmount: 12, icon: getItemIcon('salmon') },
  lobster:        { id: 'lobster',        name: 'Lobster',        category: 'cooked_fish', sellValue: 100,  canSell: true,  stackable: true,  healAmount: 15, icon: getItemIcon('lobster') },
  swordfish:      { id: 'swordfish',      name: 'Swordfish',      category: 'cooked_fish', sellValue: 170,  canSell: true,  stackable: true,  healAmount: 20, icon: getItemIcon('swordfish') },
  cooked_crab:    { id: 'cooked_crab',    name: 'Cooked Crab',    category: 'cooked_fish', sellValue: 200,  canSell: true,  stackable: true,  healAmount: 22, icon: getItemIcon('cooked_crab') },
  shark:          { id: 'shark',          name: 'Shark',          category: 'cooked_fish', sellValue: 280,  canSell: true,  stackable: true,  healAmount: 25, icon: getItemIcon('shark') },
  manta_ray:      { id: 'manta_ray',      name: 'Manta Ray',      category: 'cooked_fish', sellValue: 650,  canSell: true,  stackable: true,  healAmount: 30, icon: getItemIcon('manta_ray') },
  whale:          { id: 'whale',          name: 'Whale',          category: 'cooked_fish', sellValue: 1000, canSell: true,  stackable: true,  healAmount: 35, icon: getItemIcon('whale') },
  burnt_fish:     { id: 'burnt_fish',     name: 'Burnt Fish',     category: 'cooked_fish', sellValue: 1,    canSell: true,  stackable: true,  icon: getItemIcon('burnt_fish') },
  // ── Bones ───────────────────────────────────────────────────
  bones:          { id: 'bones',          name: 'Bones',          category: 'bone', sellValue: 5,    canSell: true,  stackable: true,  icon: getItemIcon('bones') },
  big_bones:      { id: 'big_bones',      name: 'Big Bones',      category: 'bone', sellValue: 15,   canSell: true,  stackable: true,  icon: getItemIcon('big_bones') },
  dragon_bones:   { id: 'dragon_bones',   name: 'Dragon Bones',   category: 'bone', sellValue: 250,  canSell: true,  stackable: true,  icon: getItemIcon('dragon_bones') },
  // ── Runes ───────────────────────────────────────────────────
  air_rune:       { id: 'air_rune',       name: 'Air Rune',       category: 'rune', sellValue: 4,    canSell: true,  stackable: true,  icon: getItemIcon('air_rune') },
  water_rune:     { id: 'water_rune',     name: 'Water Rune',     category: 'rune', sellValue: 4,    canSell: true,  stackable: true,  icon: getItemIcon('water_rune') },
  earth_rune:     { id: 'earth_rune',     name: 'Earth Rune',     category: 'rune', sellValue: 4,    canSell: true,  stackable: true,  icon: getItemIcon('earth_rune') },
  fire_rune:      { id: 'fire_rune',      name: 'Fire Rune',      category: 'rune', sellValue: 6,    canSell: true,  stackable: true,  icon: getItemIcon('fire_rune') },
  mind_rune:      { id: 'mind_rune',      name: 'Mind Rune',      category: 'rune', sellValue: 6,    canSell: true,  stackable: true,  icon: getItemIcon('mind_rune') },
  body_rune:      { id: 'body_rune',      name: 'Body Rune',      category: 'rune', sellValue: 6,    canSell: true,  stackable: true,  icon: getItemIcon('body_rune') },
  chaos_rune:     { id: 'chaos_rune',     name: 'Chaos Rune',     category: 'rune', sellValue: 20,   canSell: true,  stackable: true,  icon: getItemIcon('chaos_rune') },
  death_rune:     { id: 'death_rune',     name: 'Death Rune',     category: 'rune', sellValue: 30,   canSell: true,  stackable: true,  icon: getItemIcon('death_rune') },
  blood_rune:     { id: 'blood_rune',     name: 'Blood Rune',     category: 'rune', sellValue: 50,   canSell: true,  stackable: true,  icon: getItemIcon('blood_rune') },
  ancient_rune:   { id: 'ancient_rune',   name: 'Ancient Rune',   category: 'rune', sellValue: 100,  canSell: true,  stackable: true,  icon: getItemIcon('ancient_rune') },
  // ── Gems ────────────────────────────────────────────────────
  topaz:          { id: 'topaz',          name: 'Topaz',          category: 'gem',  sellValue: 750,  canSell: true,  stackable: true,  icon: getItemIcon('topaz') },
  sapphire:       { id: 'sapphire',       name: 'Sapphire',       category: 'gem',  sellValue: 1500, canSell: true,  stackable: true,  icon: getItemIcon('sapphire') },
  emerald:        { id: 'emerald',        name: 'Emerald',        category: 'gem',  sellValue: 3000, canSell: true,  stackable: true,  icon: getItemIcon('emerald') },
  ruby:           { id: 'ruby',           name: 'Ruby',           category: 'gem',  sellValue: 5000, canSell: true,  stackable: true,  icon: getItemIcon('ruby') },
  diamond:        { id: 'diamond',        name: 'Diamond',        category: 'gem',  sellValue: 10000,canSell: true,  stackable: true,  icon: getItemIcon('diamond') },
  onyx:           { id: 'onyx',           name: 'Onyx',           category: 'gem',  sellValue: 25000,canSell: true,  stackable: true,  icon: getItemIcon('onyx') },
  // ── Herbs ───────────────────────────────────────────────────
  guam:           { id: 'guam',           name: 'Guam Leaf',      category: 'herb', sellValue: 50,   canSell: true,  stackable: true,  icon: getItemIcon('guam') },
  marrentill:     { id: 'marrentill',     name: 'Marrentill',     category: 'herb', sellValue: 75,   canSell: true,  stackable: true,  icon: getItemIcon('marrentill') },
  tarromin:       { id: 'tarromin',       name: 'Tarromin',       category: 'herb', sellValue: 100,  canSell: true,  stackable: true,  icon: getItemIcon('tarromin') },
  harralander:    { id: 'harralander',    name: 'Harralander',    category: 'herb', sellValue: 150,  canSell: true,  stackable: true,  icon: getItemIcon('harralander') },
  ranarr:         { id: 'ranarr',         name: 'Ranarr Weed',    category: 'herb', sellValue: 300,  canSell: true,  stackable: true,  icon: getItemIcon('ranarr') },
  toadflax:       { id: 'toadflax',       name: 'Toadflax',       category: 'herb', sellValue: 400,  canSell: true,  stackable: true,  icon: getItemIcon('toadflax') },
  irit:           { id: 'irit',           name: 'Irit Leaf',      category: 'herb', sellValue: 500,  canSell: true,  stackable: true,  icon: getItemIcon('irit') },
  avantoe:        { id: 'avantoe',        name: 'Avantoe',        category: 'herb', sellValue: 700,  canSell: true,  stackable: true,  icon: getItemIcon('avantoe') },
  kwuarm:         { id: 'kwuarm',         name: 'Kwuarm',         category: 'herb', sellValue: 1000, canSell: true,  stackable: true,  icon: getItemIcon('kwuarm') },
  snapdragon:     { id: 'snapdragon',     name: 'Snapdragon',     category: 'herb', sellValue: 1500, canSell: true,  stackable: true,  icon: getItemIcon('snapdragon') },
  cadantine:      { id: 'cadantine',      name: 'Cadantine',      category: 'herb', sellValue: 2000, canSell: true,  stackable: true,  icon: getItemIcon('cadantine') },
  torstol:        { id: 'torstol',        name: 'Torstol',        category: 'herb', sellValue: 5000, canSell: true,  stackable: true,  icon: getItemIcon('torstol') },
  // ── Weapons ─────────────────────────────────────────────────
  bronze_sword:   { id: 'bronze_sword',   name: 'Bronze Sword',   category: 'weapon', equipSlot: 'weapon', sellValue: 50,    canSell: true, stackable: false, icon: getItemIcon('bronze_sword'), combatStats: { attackBonus: 7,  strengthBonus: 8  } },
  iron_sword:     { id: 'iron_sword',     name: 'Iron Sword',     category: 'weapon', equipSlot: 'weapon', sellValue: 150,   canSell: true, stackable: false, icon: getItemIcon('iron_sword'), combatStats: { attackBonus: 10, strengthBonus: 12 } },
  steel_sword:    { id: 'steel_sword',    name: 'Steel Sword',    category: 'weapon', equipSlot: 'weapon', sellValue: 500,   canSell: true, stackable: false, icon: getItemIcon('steel_sword'), combatStats: { attackBonus: 15, strengthBonus: 18 } },
  mithril_sword:  { id: 'mithril_sword',  name: 'Mithril Sword',  category: 'weapon', equipSlot: 'weapon', sellValue: 2000,  canSell: true, stackable: false, icon: getItemIcon('mithril_sword'), combatStats: { attackBonus: 25, strengthBonus: 30 } },
  adamant_sword:  { id: 'adamant_sword',  name: 'Adamant Sword',  category: 'weapon', equipSlot: 'weapon', sellValue: 8000,  canSell: true, stackable: false, icon: getItemIcon('adamant_sword'), combatStats: { attackBonus: 35, strengthBonus: 42 } },
  rune_sword:     { id: 'rune_sword',     name: 'Rune Sword',     category: 'weapon', equipSlot: 'weapon', sellValue: 25000, canSell: true, stackable: false, icon: getItemIcon('rune_sword'), combatStats: { attackBonus: 45, strengthBonus: 54 } },
  dragon_sword:   { id: 'dragon_sword',   name: 'Dragon Sword',   category: 'weapon', equipSlot: 'weapon', sellValue: 80000, canSell: true, stackable: false, icon: getItemIcon('dragon_sword'), combatStats: { attackBonus: 60, strengthBonus: 72 } },
  // ── Helms ───────────────────────────────────────────────────
  bronze_helm:    { id: 'bronze_helm',    name: 'Bronze Helm',    category: 'helm', equipSlot: 'helm', sellValue: 30,    canSell: true, stackable: false, icon: getItemIcon('bronze_helm'), combatStats: { defenceBonus: 5  } },
  iron_helm:      { id: 'iron_helm',      name: 'Iron Helm',      category: 'helm', equipSlot: 'helm', sellValue: 100,   canSell: true, stackable: false, icon: getItemIcon('iron_helm'), combatStats: { defenceBonus: 8  } },
  steel_helm:     { id: 'steel_helm',     name: 'Steel Helm',     category: 'helm', equipSlot: 'helm', sellValue: 350,   canSell: true, stackable: false, icon: getItemIcon('steel_helm'), combatStats: { defenceBonus: 12 } },
  mithril_helm:   { id: 'mithril_helm',   name: 'Mithril Helm',   category: 'helm', equipSlot: 'helm', sellValue: 1500,  canSell: true, stackable: false, icon: getItemIcon('mithril_helm'), combatStats: { defenceBonus: 20 } },
  adamant_helm:   { id: 'adamant_helm',   name: 'Adamant Helm',   category: 'helm', equipSlot: 'helm', sellValue: 5000,  canSell: true, stackable: false, icon: getItemIcon('adamant_helm'), combatStats: { defenceBonus: 30 } },
  rune_helm:      { id: 'rune_helm',      name: 'Rune Helm',      category: 'helm', equipSlot: 'helm', sellValue: 18000, canSell: true, stackable: false, icon: getItemIcon('rune_helm'), combatStats: { defenceBonus: 40 } },
  dragon_helm:    { id: 'dragon_helm',    name: 'Dragon Helm',    category: 'helm', equipSlot: 'helm', sellValue: 60000, canSell: true, stackable: false, icon: getItemIcon('dragon_helm'), combatStats: { defenceBonus: 55 } },
  // ── Platebodies ──────────────────────────────────────────────
  bronze_platebody:   { id: 'bronze_platebody',   name: 'Bronze Platebody',   category: 'platebody', equipSlot: 'platebody', sellValue: 150,    canSell: true, stackable: false, icon: getItemIcon('bronze_platebody'), combatStats: { defenceBonus: 15  } },
  iron_platebody:     { id: 'iron_platebody',     name: 'Iron Platebody',     category: 'platebody', equipSlot: 'platebody', sellValue: 500,    canSell: true, stackable: false, icon: getItemIcon('iron_platebody'), combatStats: { defenceBonus: 25  } },
  steel_platebody:    { id: 'steel_platebody',    name: 'Steel Platebody',    category: 'platebody', equipSlot: 'platebody', sellValue: 1500,   canSell: true, stackable: false, icon: getItemIcon('steel_platebody'), combatStats: { defenceBonus: 40  } },
  mithril_platebody:  { id: 'mithril_platebody',  name: 'Mithril Platebody',  category: 'platebody', equipSlot: 'platebody', sellValue: 6000,   canSell: true, stackable: false, icon: getItemIcon('mithril_platebody'), combatStats: { defenceBonus: 60  } },
  adamant_platebody:  { id: 'adamant_platebody',  name: 'Adamant Platebody',  category: 'platebody', equipSlot: 'platebody', sellValue: 20000,  canSell: true, stackable: false, icon: getItemIcon('adamant_platebody'), combatStats: { defenceBonus: 80  } },
  rune_platebody:     { id: 'rune_platebody',     name: 'Rune Platebody',     category: 'platebody', equipSlot: 'platebody', sellValue: 65000,  canSell: true, stackable: false, icon: getItemIcon('rune_platebody'), combatStats: { defenceBonus: 105 } },
  dragon_platebody:   { id: 'dragon_platebody',   name: 'Dragon Platebody',   category: 'platebody', equipSlot: 'platebody', sellValue: 200000, canSell: true, stackable: false, icon: getItemIcon('dragon_platebody'), combatStats: { defenceBonus: 130 } },
  // ── Shields ─────────────────────────────────────────────────
  bronze_shield:  { id: 'bronze_shield',  name: 'Bronze Shield',  category: 'shield', equipSlot: 'shield', sellValue: 50,    canSell: true, stackable: false, icon: getItemIcon('bronze_shield'), combatStats: { defenceBonus: 6  } },
  iron_shield:    { id: 'iron_shield',    name: 'Iron Shield',    category: 'shield', equipSlot: 'shield', sellValue: 150,   canSell: true, stackable: false, icon: getItemIcon('iron_shield'), combatStats: { defenceBonus: 10 } },
  steel_shield:   { id: 'steel_shield',   name: 'Steel Shield',   category: 'shield', equipSlot: 'shield', sellValue: 500,   canSell: true, stackable: false, icon: getItemIcon('steel_shield'), combatStats: { defenceBonus: 16 } },
  mithril_shield: { id: 'mithril_shield', name: 'Mithril Shield', category: 'shield', equipSlot: 'shield', sellValue: 2000,  canSell: true, stackable: false, icon: getItemIcon('mithril_shield'), combatStats: { defenceBonus: 24 } },
  adamant_shield: { id: 'adamant_shield', name: 'Adamant Shield', category: 'shield', equipSlot: 'shield', sellValue: 7000,  canSell: true, stackable: false, icon: getItemIcon('adamant_shield'), combatStats: { defenceBonus: 34 } },
  rune_shield:    { id: 'rune_shield',    name: 'Rune Shield',    category: 'shield', equipSlot: 'shield', sellValue: 22000, canSell: true, stackable: false, icon: getItemIcon('rune_shield'), combatStats: { defenceBonus: 44 } },
  dragon_shield:  { id: 'dragon_shield',  name: 'Dragon Shield',  category: 'shield', equipSlot: 'shield', sellValue: 70000, canSell: true, stackable: false, icon: getItemIcon('dragon_shield'), combatStats: { defenceBonus: 60 } },
  // ── Misc ────────────────────────────────────────────────────
  mark_of_mastery: { id: 'mark_of_mastery', name: 'Mark of Mastery', category: 'misc', sellValue: 0,    canSell: false, stackable: true,  icon: getItemIcon('mark_of_mastery') },
  ancient_key:     { id: 'ancient_key',     name: 'Ancient Key',     category: 'misc', sellValue: 100,  canSell: true,  stackable: true,  icon: getItemIcon('ancient_key') },
  slayer_coin:     { id: 'slayer_coin',     name: 'Slayer Coin',     category: 'misc', sellValue: 0,    canSell: false, stackable: true,  icon: getItemIcon('slayer_coin') },
};

export default ITEMS;
export function getItem(id: string): Item | undefined {
  return ITEMS[id];
}
export function getAllItems(): Item[] {
  return Object.values(ITEMS);
}
