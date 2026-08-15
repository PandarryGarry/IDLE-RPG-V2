// ═══════════════════════════════════════════════════════════════
// NPC-ЦЕНЫ ВЫКУПА (база, эталон)
// Это "цена игры". Аукцион/рынок игроков — отдельный слой позже,
// он читает базу как ориентир, но не перезаписывает её.
// ═══════════════════════════════════════════════════════════════

export const ITEM_PRICES: Record<string, { sellValue: number }> = {
  // ── Брёвна ──
  normal_logs: { sellValue: 1 }, oak_logs: { sellValue: 2 }, willow_logs: { sellValue: 3 },
  teak_logs: { sellValue: 5 }, maple_logs: { sellValue: 8 }, mahogany_logs: { sellValue: 12 },
  magic_logs: { sellValue: 18 }, redwood_logs: { sellValue: 25 },
  // ── Зола/уголь ──
  ash: { sellValue: 3 }, charcoal: { sellValue: 3 },
  // ── Руда ──
  copper_ore: { sellValue: 2 }, tin_ore: { sellValue: 2 }, iron_ore: { sellValue: 4 },
  coal_ore: { sellValue: 6 }, gold_ore: { sellValue: 10 }, mithril_ore: { sellValue: 16 },
  adamantite_ore: { sellValue: 24 }, runite_ore: { sellValue: 35 }, dragonite_ore: { sellValue: 50 },
  // ── Слитки ──
  bronze_bar: { sellValue: 20 }, iron_bar: { sellValue: 60 }, steel_bar: { sellValue: 120 },
  gold_bar: { sellValue: 200 }, mithril_bar: { sellValue: 320 }, adamantite_bar: { sellValue: 530 },
  runite_bar: { sellValue: 1000 }, dragon_bar: { sellValue: 1950 },
  // ── Сырая рыба ──
  raw_shrimp: { sellValue: 3 }, raw_sardine: { sellValue: 7 }, raw_herring: { sellValue: 12 },
  raw_mackerel: { sellValue: 18 }, raw_trout: { sellValue: 30 }, raw_salmon: { sellValue: 45 },
  raw_lobster: { sellValue: 80 }, raw_swordfish: { sellValue: 130 }, raw_crab: { sellValue: 160 },
  raw_shark: { sellValue: 210 }, raw_manta_ray: { sellValue: 500 }, raw_whale: { sellValue: 800 },
  // ── Приготовленная рыба ──
  shrimp: { sellValue: 5 }, sardine: { sellValue: 10 }, herring: { sellValue: 15 },
  mackerel: { sellValue: 22 }, trout: { sellValue: 40 }, salmon: { sellValue: 60 },
  lobster: { sellValue: 100 }, swordfish: { sellValue: 170 }, cooked_crab: { sellValue: 200 },
  shark: { sellValue: 280 }, manta_ray: { sellValue: 650 }, whale: { sellValue: 1000 },
  burnt_fish: { sellValue: 1 },
  // ── Кости ──
  bones: { sellValue: 5 }, big_bones: { sellValue: 15 }, dragon_bones: { sellValue: 250 },
  // ── Руны ──
  air_rune: { sellValue: 4 }, water_rune: { sellValue: 4 }, earth_rune: { sellValue: 4 },
  fire_rune: { sellValue: 6 }, mind_rune: { sellValue: 6 }, body_rune: { sellValue: 6 },
  chaos_rune: { sellValue: 20 }, death_rune: { sellValue: 30 }, blood_rune: { sellValue: 50 },
  ancient_rune: { sellValue: 100 },
  // ── Самоцветы ──
  topaz: { sellValue: 750 }, sapphire: { sellValue: 1500 }, emerald: { sellValue: 3000 },
  ruby: { sellValue: 5000 }, diamond: { sellValue: 10000 }, onyx: { sellValue: 25000 },
  // ── Травы ──
  guam: { sellValue: 50 }, marrentill: { sellValue: 75 }, tarromin: { sellValue: 100 },
  harralander: { sellValue: 150 }, ranarr: { sellValue: 300 }, toadflax: { sellValue: 400 },
  irit: { sellValue: 500 }, avantoe: { sellValue: 700 }, kwuarm: { sellValue: 1000 },
  snapdragon: { sellValue: 1500 }, cadantine: { sellValue: 2000 }, torstol: { sellValue: 5000 },
  // ── Мечи ──
  bronze_sword: { sellValue: 50 }, iron_sword: { sellValue: 150 }, steel_sword: { sellValue: 500 },
  mithril_sword: { sellValue: 2000 }, adamant_sword: { sellValue: 8000 }, rune_sword: { sellValue: 25000 },
  dragon_sword: { sellValue: 80000 },
  // ── Шлемы ──
  bronze_helm: { sellValue: 30 }, iron_helm: { sellValue: 100 }, steel_helm: { sellValue: 350 },
  mithril_helm: { sellValue: 1500 }, adamant_helm: { sellValue: 5000 }, rune_helm: { sellValue: 18000 },
  dragon_helm: { sellValue: 60000 },
  // ── Нагрудники ──
  bronze_platebody: { sellValue: 150 }, iron_platebody: { sellValue: 500 }, steel_platebody: { sellValue: 1500 },
  mithril_platebody: { sellValue: 6000 }, adamant_platebody: { sellValue: 20000 }, rune_platebody: { sellValue: 65000 },
  dragon_platebody: { sellValue: 200000 },
  // ── Щиты ──
  bronze_shield: { sellValue: 50 }, iron_shield: { sellValue: 150 }, steel_shield: { sellValue: 500 },
  mithril_shield: { sellValue: 2000 }, adamant_shield: { sellValue: 7000 }, rune_shield: { sellValue: 22000 },
  dragon_shield: { sellValue: 70000 },
  // ── Прочее ──
  mark_of_mastery: { sellValue: 0 }, ancient_key: { sellValue: 100 }, slayer_coin: { sellValue: 0 },
};

export function getBasePrice(itemId: string): number {
  return ITEM_PRICES[itemId]?.sellValue ?? 0;
}
