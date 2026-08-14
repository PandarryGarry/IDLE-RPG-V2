// src/lib/icons.ts
// Централизованный реестр иконок
// Готов к переходу с эмодзи на картинки

type IconType = 'emoji' | 'image';

interface IconConfig {
  type: IconType;
  value: string; // emoji или path к картинке
  fallback?: string; // fallback если картинка не загрузилась
}

// ═══════════════════════════════════════════════════════════════
// НАВЫКИ (Skills)
// ═══════════════════════════════════════════════════════════════
export const SKILL_ICONS: Record<string, string> = {
  // Combat skills
  attack: '⚔️',
  strength: '💪',
  defence: '🛡️',
  hitpoints: '❤️',
  ranged: '🏹',
  magic: '✨',
  prayer: '🙏',
  slayer: '🗡️',

  // Gathering skills
  woodcutting: '🪓',
  fishing: '🎣',
  mining: '⛏️',

  // Artisan skills
  firemaking: '🔥',
  cooking: '🍳',
  smithing: '🔨',
  fletching: '🏹',
  crafting: '🧵',
  runecrafting: '🔮',
  herblore: '🌿',

  // Other skills
  thieving: '🗝️',
  farming: '🌱',
  agility: '🏃',
  summoning: '📿',
  astrology: '⭐',
  township: '🏘️',
};

// ═══════════════════════════════════════════════════════════════
// ИНСТРУМЕНТЫ (Tools)
// ═══════════════════════════════════════════════════════════════
export const TOOL_ICONS: Record<string, string> = {
  woodcutting: '🪓',
  mining: '⛏️',
  fishing: '🎣',
  smithing: '🔨',
  cooking: '🍳',
  firemaking: '🔥',
};

// ═══════════════════════════════════════════════════════════════
// UI ЭЛЕМЕНТЫ (Interface)
// ═══════════════════════════════════════════════════════════════
export const UI_ICONS = {
  // Навигация
  home: '🏠',
  settings: '⚙️',
  shop: '🏪',
  menu: '☰',
  close: '✕',
  back: '←',

  // Ресурсы
  gold: '💰',
  inventory: '🎒',
  bank: '🏦',

  // Действия
  start: '▶️',
  stop: '⏹️',
  pause: '⏸️',
  save: '💾',
  reset: '🔄',

  // Статусы
  locked: '🔒',
  unlocked: '🔓',
  warning: '⚠️',
  error: '❌',
  success: '✅',
  info: 'ℹ️',

  // Фильтры
  all: '📋',
  equipment: '⚔️',
  resources: '🌲',
  food: '🍖',
  misc: '📦',

  // Прогресс
  level: '📈',
  xp: '⭐',
  mastery: '✨',
  skills: '⚡️',
  
  // Прочее
  search: '🔍',
  filter: '🔽',
  sort: '📊',
  export: '📤',
  import: '📥',

  // Дополнительные
  waiting: '⏳',
  unknown: '❓',
  noTool: '🚫',
  speed: '⚡',
  gem: '💎',
  timer: '⏱',
  perAction: '⛏️',
} as const;

// ═══════════════════════════════════════════════════════════════
// ПРЕДМЕТЫ (Items)
// ═══════════════════════════════════════════════════════════════
export const ITEM_ICONS: Record<string, string> = {
  // Logs
  normal_logs: '🪵',
  oak_logs: '🪵',
  willow_logs: '🪵',
  teak_logs: '🪵',
  maple_logs: '🪵',
  mahogany_logs: '🪵',
  magic_logs: '✨',
  redwood_logs: '🪵',

  // Ashes
  ash: '⚪',

  // Ores
  copper_ore: '🟤',
  tin_ore: '⚪',
  iron_ore: '🔩',
  coal_ore: '🖤',
  gold_ore: '🟡',
  mithril_ore: '💙',
  adamantite_ore: '💚',
  runite_ore: '🔵',
  dragonite_ore: '🔴',

  // Bars
  bronze_bar: '🟫',
  iron_bar: '⬜',
  steel_bar: '🔘',
  gold_bar: '🟨',
  mithril_bar: '🔵',
  adamantite_bar: '💚',
  runite_bar: '🔵',
  dragon_bar: '🔴',

  // Raw Fish
  raw_shrimp: '🦐',
  raw_sardine: '🐟',
  raw_herring: '🐟',
  raw_mackerel: '🐟',
  raw_trout: '🐟',
  raw_salmon: '🐠',
  raw_lobster: '🦞',
  raw_swordfish: '🐡',
  raw_crab: '🦀',
  raw_shark: '🦈',
  raw_manta_ray: '🐟',
  raw_whale: '🐋',

  // Cooked Fish
  shrimp: '🦐',
  sardine: '🐟',
  herring: '🐟',
  mackerel: '🐟',
  trout: '🐟',
  salmon: '🐠',
  lobster: '🦞',
  swordfish: '🐡',
  cooked_crab: '🦀',
  shark: '🦈',
  manta_ray: '🐟',
  whale: '🐋',
  burnt_fish: '🔥',

  // Bones
  bones: '🦴',
  big_bones: '🦴',
  dragon_bones: '🦴',

  // Runes
  air_rune: '💨',
  water_rune: '💧',
  earth_rune: '🌍',
  fire_rune: '🔥',
  mind_rune: '🧠',
  body_rune: '🫀',
  chaos_rune: '🌀',
  death_rune: '💀',
  blood_rune: '🩸',
  ancient_rune: '⚡',

  // Gems
  topaz: '🟠',
  sapphire: '💎',
  emerald: '💚',
  ruby: '❤️',
  diamond: '💎',
  onyx: '🖤',

  // Herbs
  guam: '🌿',
  marrentill: '🌿',
  tarromin: '🌿',
  harralander: '🌿',
  ranarr: '🌿',
  toadflax: '🌿',
  irit: '🌿',
  avantoe: '🌿',
  kwuarm: '🌿',
  snapdragon: '🌿',
  cadantine: '🌿',
  torstol: '🌿',

  // Weapons
  bronze_sword: '⚔️',
  iron_sword: '⚔️',
  steel_sword: '⚔️',
  mithril_sword: '⚔️',
  adamant_sword: '⚔️',
  rune_sword: '⚔️',
  dragon_sword: '🐉',

  // Helms
  bronze_helm: '⛑️',
  iron_helm: '⛑️',
  steel_helm: '⛑️',
  mithril_helm: '⛑️',
  adamant_helm: '⛑️',
  rune_helm: '⛑️',
  dragon_helm: '🐉',

  // Platebodies
  bronze_platebody: '🛡️',
  iron_platebody: '🛡️',
  steel_platebody: '🛡️',
  mithril_platebody: '🛡️',
  adamant_platebody: '🛡️',
  rune_platebody: '🛡️',
  dragon_platebody: '🐉',

  // Shields
  bronze_shield: '🛡️',
  iron_shield: '🛡️',
  steel_shield: '🛡️',
  mithril_shield: '🛡️',
  adamant_shield: '🛡️',
  rune_shield: '🛡️',
  dragon_shield: '🐉',

  // Misc
  mark_of_mastery: '✨',
  ancient_key: '🗝️',
  slayer_coin: '🪙',
};

// ═══════════════════════════════════════════════════════════════
// ДЕРЕВЬЯ, РУДА, РЫБА (Resources)
// ═══════════════════════════════════════════════════════════════
export const RESOURCE_ICONS = {
  // Деревья
  trees: {
    normal_tree: '🌳',
    oak_tree: '🌲',
    willow_tree: '🎋',
    teak_tree: '🌴',
    maple_tree: '🍁',
    mahogany_tree: '🎍',
    magic_tree: '🎄',
    redwood_tree: '🌲',
  },

  // В секции ITEM_ICONS добавь после секции "Ores":

  // Камни
  rocks: {
    copper_rock: '🟤',
    tin_rock: '⚪',
    iron_rock: '⬜',
    coal_rock: '⬛',
    gold_rock: '🟡',
    mithril_rock: '💙',
    adamantite_rock: '💚',
    runite_rock: '🔷',
    dragonite_rock: '🔴',
  },

  // Рыбные места
  fishing_spots: {
    shrimp_spot: '🌊',
    sardine_spot: '🌊',
    herring_spot: '🌊',
    trout_spot: '🌊',
    salmon_spot: '🌊',
    tuna_spot: '🌊',
    lobster_spot: '🌊',
    swordfish_spot: '🌊',
    shark_spot: '🌊',
  },
};

// ═══════════════════════════════════════════════════════════════
// БОЙ (Combat)
// ═══════════════════════════════════════════════════════════════
export const COMBAT_ICONS = {
  player: '🧑‍🌾',
  monster: '👹',
  dragon: '🐉',
  damage: '💥',
  heal: '💚',
  miss: '💨',
  critical: '⚡',
  death: '💀',
  victory: '🏆',
};

// ═══════════════════════════════════════════════════════════════
// КАТЕГОРИИ НАВЫКОВ (Skill Groups)
// ═══════════════════════════════════════════════════════════════
export const GROUP_ICONS = {
  combat: '⚔️',
  gathering: '🌲',
  artisan: '🔨',
  support: '✨',
  all: '📋',
};

// ═══════════════════════════════════════════════════════════════
// УВЕДОМЛЕНИЯ (Notifications)
// ═══════════════════════════════════════════════════════════════
export const NOTIFICATION_ICONS = {
  levelup: '🎉',
  mastery_levelup: '🎯',
  item: '📦',
  combat: '⚔️',
  warning: '⚠️',
  info: 'ℹ️',
  achievement: '🏆',
};

// ═══════════════════════════════════════════════════════════════
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ═══════════════════════════════════════════════════════════════

/**
 * Получить иконку навыка по ID
 */
export function getSkillIcon(skillId: string): string {
  return SKILL_ICONS[skillId] ?? '❓';
}

/**
 * Получить иконку инструмента по навыку
 */
export function getToolIcon(skillId: string): string {
  return TOOL_ICONS[skillId] ?? '🔧';
}

/**
 * Получить иконку предмета по ID
 */
export function getItemIcon(itemId: string): string {
  return ITEM_ICONS[itemId] ?? '📦';
}

/**
 * Получить UI иконку по ключу
 */
export function getUIIcon(key: keyof typeof UI_ICONS): string {
  return UI_ICONS[key];
}

/**
 * Получить иконку группы навыков
 */
export function getGroupIcon(group: keyof typeof GROUP_ICONS): string {
  return GROUP_ICONS[group];
}

/**
 * Получить иконку уведомления по типу
 */
export function getNotificationIcon(type: keyof typeof NOTIFICATION_ICONS): string {
  return NOTIFICATION_ICONS[type];
}

// ═══════════════════════════════════════════════════════════════
// БУДУЩЕЕ: Компонент для рендеринга иконок (emoji или image)
// ═══════════════════════════════════════════════════════════════

/**
 * Конфигурация для будущих картинок
 * Когда будем переходить на картинки, просто изменим type и value
 */
export const ICON_CONFIG: Record<string, IconConfig> = {
  // Пример будущей конфигурации:
  // 'skill.woodcutting': { type: 'image', value: '/icons/skills/axe.png', fallback: '🪓' },
  // Сейчас всё emoji:
  'skill.woodcutting': { type: 'emoji', value: '🪓' },
  'skill.mining': { type: 'emoji', value: '⛏️' },
  // ... остальные можно добавить по мере необходимости
};
