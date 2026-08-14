import type { WoodcuttingTree } from './types';
import { RESOURCE_ICONS } from '@/lib/icons';

export const TREES: WoodcuttingTree[] = [
  { id: 'normal_tree',   name: 'Tree',          icon: RESOURCE_ICONS.trees.normal_tree,   levelRequired: 1,  xp: 10,  masteryXp: 3,  interval: 3000,  logId: 'normal_logs',   quantity: [1, 1], stockLimit: 1000, respawnMs: 60_000 },
  { id: 'oak_tree',      name: 'Oak Tree',      icon: RESOURCE_ICONS.trees.oak_tree,      levelRequired: 15, xp: 18,  masteryXp: 4,  interval: 4000,  logId: 'oak_logs',      quantity: [1, 1], stockLimit: 750,  respawnMs: 120_000 },
  { id: 'willow_tree',   name: 'Willow Tree',   icon: RESOURCE_ICONS.trees.willow_tree,   levelRequired: 30, xp: 30,  masteryXp: 5,  interval: 5000,  logId: 'willow_logs',   quantity: [1, 1], stockLimit: 500,  respawnMs: 240_000 },
  { id: 'teak_tree',     name: 'Teak Tree',     icon: RESOURCE_ICONS.trees.teak_tree,     levelRequired: 35, xp: 40,  masteryXp: 6,  interval: 6000,  logId: 'teak_logs',     quantity: [1, 1], stockLimit: 400,  respawnMs: 360_000 },
  { id: 'maple_tree',    name: 'Maple Tree',    icon: RESOURCE_ICONS.trees.maple_tree,    levelRequired: 45, xp: 60,  masteryXp: 7,  interval: 7000,  logId: 'maple_logs',    quantity: [1, 1], stockLimit: 300,  respawnMs: 540_000 },
  { id: 'mahogany_tree', name: 'Mahogany Tree', icon: RESOURCE_ICONS.trees.mahogany_tree, levelRequired: 55, xp: 90,  masteryXp: 8,  interval: 8000,  logId: 'mahogany_logs', quantity: [1, 1], stockLimit: 220,  respawnMs: 720_000 },
  { id: 'magic_tree',    name: 'Magic Tree',    icon: RESOURCE_ICONS.trees.magic_tree,    levelRequired: 75, xp: 140, masteryXp: 9,  interval: 10000, logId: 'magic_logs',    quantity: [1, 1], stockLimit: 150,  respawnMs: 1_080_000 },
  { id: 'redwood_tree',  name: 'Redwood Tree',  icon: RESOURCE_ICONS.trees.redwood_tree,  levelRequired: 90, xp: 200, masteryXp: 10, interval: 12000, logId: 'redwood_logs',  quantity: [1, 2], stockLimit: 80,   respawnMs: 1_500_000 },
];

export const WOODCUTTING_TREES_MAP = Object.fromEntries(TREES.map(t => [t.id, t]));
