import type { MiningRock } from './types';
import { RESOURCE_ICONS } from '@/lib/icons';

export const ROCKS: MiningRock[] = [
  { id: 'copper_rock',     name: 'Copper Rock',     icon: RESOURCE_ICONS.rocks.copper_rock,     levelRequired: 1,  xp: 12,   masteryXp: 3,  interval: 4000,  oreId: 'copper_ore',      stockLimit: 1000, respawnMs: 60_000 },
  { id: 'tin_rock',        name: 'Tin Rock',        icon: RESOURCE_ICONS.rocks.tin_rock,        levelRequired: 1,  xp: 12,   masteryXp: 3,  interval: 4000,  oreId: 'tin_ore',         stockLimit: 1000, respawnMs: 60_000 },
  { id: 'iron_rock',       name: 'Iron Rock',       icon: RESOURCE_ICONS.rocks.iron_rock,       levelRequired: 15, xp: 21,   masteryXp: 4,  interval: 5000,  oreId: 'iron_ore',        stockLimit: 750,  respawnMs: 120_000 },
  { id: 'coal_rock',       name: 'Coal Rock',       icon: RESOURCE_ICONS.rocks.coal_rock,       levelRequired: 20, xp: 28,   masteryXp: 4,  interval: 6000,  oreId: 'coal_ore',        stockLimit: 600,  respawnMs: 180_000 },
  { id: 'gold_rock',       name: 'Gold Rock',       icon: RESOURCE_ICONS.rocks.gold_rock,       levelRequired: 40, xp: 46,   masteryXp: 5,  interval: 7000,  oreId: 'gold_ore',        gemChance: 0.002, stockLimit: 400, respawnMs: 300_000 },
  { id: 'mithril_rock',    name: 'Mithril Rock',    icon: RESOURCE_ICONS.rocks.mithril_rock,    levelRequired: 55, xp: 56,   masteryXp: 6,  interval: 8000,  oreId: 'mithril_ore',     gemChance: 0.003, stockLimit: 300, respawnMs: 480_000 },
  { id: 'adamantite_rock', name: 'Adamantite Rock', icon: RESOURCE_ICONS.rocks.adamantite_rock, levelRequired: 70, xp: 67,   masteryXp: 7,  interval: 9000,  oreId: 'adamantite_ore',  gemChance: 0.004, stockLimit: 200, respawnMs: 720_000 },
  { id: 'runite_rock',     name: 'Runite Rock',     icon: RESOURCE_ICONS.rocks.runite_rock,     levelRequired: 85, xp: 91,   masteryXp: 8,  interval: 11000, oreId: 'runite_ore',      gemChance: 0.006, stockLimit: 120, respawnMs: 1_080_000 },
  { id: 'dragonite_rock',  name: 'Dragonite Rock',  icon: RESOURCE_ICONS.rocks.dragonite_rock,  levelRequired: 95, xp: 126,  masteryXp: 10, interval: 13000, oreId: 'dragonite_ore',   gemChance: 0.01,  stockLimit: 60,  respawnMs: 1_500_000 },
];

// Gem chances by tier when mining a gem rock
export const GEM_DROPS = [
  { itemId: 'topaz',    weight: 50 },
  { itemId: 'sapphire', weight: 30 },
  { itemId: 'emerald',  weight: 15 },
  { itemId: 'ruby',     weight: 10 },
  { itemId: 'diamond',  weight: 5  },
  { itemId: 'onyx',     weight: 1  },
];

export const MINING_ROCKS_MAP = Object.fromEntries(ROCKS.map(r => [r.id, r]));
