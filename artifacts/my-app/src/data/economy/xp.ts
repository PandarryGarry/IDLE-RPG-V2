// ═══════════════════════════════════════════════════════════════
// БАЗОВЫЙ ОПЫТ по действиям. Ключ = `${skill}.${itemId}`.
// Стартовые значения, логичная прогрессия — тюним по мере баланса.
// ═══════════════════════════════════════════════════════════════

export const BASE_XP: Record<string, number> = {
  // ── Woodcutting ──
  'woodcutting.normal_logs': 10, 'woodcutting.oak_logs': 14, 'woodcutting.willow_logs': 20,
  'woodcutting.teak_logs': 28, 'woodcutting.maple_logs': 40, 'woodcutting.mahogany_logs': 55,
  'woodcutting.magic_logs': 80, 'woodcutting.redwood_logs': 110,
  // ── Mining ──
  'mining.copper_ore': 8, 'mining.tin_ore': 8, 'mining.iron_ore': 14, 'mining.coal_ore': 20,
  'mining.gold_ore': 30, 'mining.mithril_ore': 45, 'mining.adamantite_ore': 65,
  'mining.runite_ore': 90, 'mining.dragonite_ore': 125,
  // ── Fishing ──
  'fishing.raw_shrimp': 10, 'fishing.raw_sardine': 15, 'fishing.raw_herring': 20,
  'fishing.raw_mackerel': 30, 'fishing.raw_trout': 45, 'fishing.raw_salmon': 60,
  'fishing.raw_lobster': 80, 'fishing.raw_swordfish': 100, 'fishing.raw_crab': 120,
  'fishing.raw_shark': 150, 'fishing.raw_manta_ray': 200, 'fishing.raw_whale': 260,
  // ── Firemaking (сжигание брёвен) ──
  'firemaking.normal_logs': 10, 'firemaking.oak_logs': 14, 'firemaking.willow_logs': 20,
  'firemaking.teak_logs': 28, 'firemaking.maple_logs': 40, 'firemaking.mahogany_logs': 55,
  'firemaking.magic_logs': 80, 'firemaking.redwood_logs': 110,
  // ── Cooking ──
  'cooking.shrimp': 10, 'cooking.sardine': 15, 'cooking.herring': 20, 'cooking.mackerel': 28,
  'cooking.trout': 40, 'cooking.salmon': 55, 'cooking.lobster': 75, 'cooking.swordfish': 95,
  'cooking.cooked_crab': 115, 'cooking.shark': 140, 'cooking.manta_ray': 190, 'cooking.whale': 250,
  // ── Smithing (плавка в слитки) ──
  'smithing.bronze_bar': 12, 'smithing.iron_bar': 20, 'smithing.steel_bar': 35,
  'smithing.gold_bar': 45, 'smithing.mithril_bar': 60, 'smithing.adamantite_bar': 80,
  'smithing.runite_bar': 110, 'smithing.dragon_bar': 150,
  // …расширяется по тому же шаблону (кузнечное оборудование, руны и т.д.)
};

export function getBaseXp(key: string): number {
  return BASE_XP[key] ?? 0;
}
