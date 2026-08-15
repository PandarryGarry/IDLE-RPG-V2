// ═══════════════════════════════════════════════════════════════
// БАЗОВАЯ СКОРОСТЬ (interval, мс) по действиям. Ключ = `${skill}.${itemId}`.
// Чем выше тир ресурса — тем дольше действие.
// ═══════════════════════════════════════════════════════════════

export const BASE_INTERVAL: Record<string, number> = {
  // ── Woodcutting ──
  'woodcutting.normal_logs': 3000, 'woodcutting.oak_logs': 4000, 'woodcutting.willow_logs': 5000,
  'woodcutting.teak_logs': 6000, 'woodcutting.maple_logs': 7000, 'woodcutting.mahogany_logs': 8000,
  'woodcutting.magic_logs': 9000, 'woodcutting.redwood_logs': 10000,
  // ── Mining ──
  'mining.copper_ore': 3000, 'mining.tin_ore': 3000, 'mining.iron_ore': 4000, 'mining.coal_ore': 5000,
  'mining.gold_ore': 6000, 'mining.mithril_ore': 7000, 'mining.adamantite_ore': 8000,
  'mining.runite_ore': 9000, 'mining.dragonite_ore': 10000,
  // ── Fishing ──
  'fishing.raw_shrimp': 3000, 'fishing.raw_sardine': 3500, 'fishing.raw_herring': 4000,
  'fishing.raw_mackerel': 4500, 'fishing.raw_trout': 5000, 'fishing.raw_salmon': 5500,
  'fishing.raw_lobster': 6000, 'fishing.raw_swordfish': 7000, 'fishing.raw_crab': 7500,
  'fishing.raw_shark': 8000, 'fishing.raw_manta_ray': 9000, 'fishing.raw_whale': 10000,
  // ── Firemaking ──
  'firemaking.normal_logs': 10000, 'firemaking.oak_logs': 12000, 'firemaking.willow_logs': 14000,
  'firemaking.teak_logs': 16000, 'firemaking.maple_logs': 18000, 'firemaking.mahogany_logs': 20000,
  'firemaking.magic_logs': 22000, 'firemaking.redwood_logs': 24000,
  // ── Cooking ──
  'cooking.shrimp': 2000, 'cooking.sardine': 2200, 'cooking.herring': 2400, 'cooking.mackerel': 2600,
  'cooking.trout': 2800, 'cooking.salmon': 3000, 'cooking.lobster': 3200, 'cooking.swordfish': 3400,
  'cooking.cooked_crab': 3600, 'cooking.shark': 3800, 'cooking.manta_ray': 4000, 'cooking.whale': 4200,
  // ── Smithing ──
  'smithing.bronze_bar': 3000, 'smithing.iron_bar': 3500, 'smithing.steel_bar': 4000,
  'smithing.gold_bar': 4500, 'smithing.mithril_bar': 5000, 'smithing.adamantite_bar': 5500,
  'smithing.runite_bar': 6000, 'smithing.dragon_bar': 7000,
  // …расширяется по тому же шаблону
};

export function getBaseInterval(key: string): number {
  return BASE_INTERVAL[key] ?? 3000;
}
