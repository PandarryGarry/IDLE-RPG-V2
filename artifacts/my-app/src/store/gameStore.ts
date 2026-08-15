import { create } from 'zustand';
import type { SkillId, GameMode } from '../data/types';
import { WOODCUTTING_TREES_MAP } from '../data/woodcutting';
import { MINING_ROCKS_MAP, GEM_DROPS } from '../data/mining';
import { FISHING_SPOTS_MAP } from '../data/fishing';
import { COOKING_RECIPES_MAP } from '../data/cooking';
import { SMITHING_MAP } from '../data/smithing';
import { FIREMAKING_MAP, getBatchTime } from '../data/firemaking';
import { usePlayerStore } from './playerStore';
import { useBankStore } from './bankStore';
import { useNotificationsStore } from './notificationsStore';
import { useResourceStore } from './resourceStore';
import { calcBurnChance, calcXpPerHour } from '../gameEngine/formulas';
import { getItem } from '../data/items';
import { chance, randomRange } from '../lib/utils';
import { UI_ICONS } from '../lib/icons';

export interface ActionResult {
  items: { itemId: string; quantity: number; tier?: number }[];
  xpGained: number;
  masteryXpGained: number;
  bonusXp?: number;
  preserved?: boolean;
}

export interface GameStore {
  activeSkill: SkillId | null;
  activeActionId: string | null;
  actionProgress: number;
  actionStartTime: number;
  nextActionTime: number;
  currentActionInterval: number;
  activeMultiplier: number;
  waitingForRespawn: boolean;
  gameMode: GameMode;
  totalPlayTime: number;
  sessionStartTime: number;
  lastSaveTime: number;
  isRunning: boolean;
  isPaused: boolean;
  xpGainedThisSession: Partial<Record<SkillId, number>>;

  startSkillAction: (skillId: SkillId, actionId: string, multiplier?: number) => boolean;
  setMultiplier: (multiplier: number) => void;
  stopAction: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  tick: (now: number) => void;
  setGameMode: (mode: GameMode) => void;
  reset: () => void;
  loadFromSave: (data: Partial<GameStore>) => void;
}

function getNodeLimits(actionId: string): { stockLimit?: number; respawnMs?: number } | null {
  const action = WOODCUTTING_TREES_MAP[actionId]
    ?? MINING_ROCKS_MAP[actionId]
    ?? FISHING_SPOTS_MAP[actionId];
  if (!action) return null;
  return { stockLimit: action.stockLimit, respawnMs: action.respawnMs };
}

function processWoodcutting(actionId: string): ActionResult | null {
  const tree = WOODCUTTING_TREES_MAP[actionId];
  if (!tree) return null;
  const playerLevel = usePlayerStore.getState().getSkillLevel('woodcutting');
  if (playerLevel < tree.levelRequired) return null;
  const qty = randomRange(tree.quantity[0], tree.quantity[1]);
  return { items: [{ itemId: tree.logId, quantity: qty }], xpGained: tree.xp, masteryXpGained: tree.masteryXp ?? 3 };
}

function processMining(actionId: string): ActionResult | null {
  const rock = MINING_ROCKS_MAP[actionId];
  if (!rock) return null;
  const playerLevel = usePlayerStore.getState().getSkillLevel('mining');
  if (playerLevel < rock.levelRequired) return null;
  const items: { itemId: string; quantity: number; tier?: number }[] = [{ itemId: rock.oreId, quantity: 1 }];
  if (rock.gemChance && chance(rock.gemChance)) {
    const totalWeight = GEM_DROPS.reduce((sum, g) => sum + g.weight, 0);
    let rng = Math.random() * totalWeight;
    for (const gem of GEM_DROPS) {
      rng -= gem.weight;
      if (rng <= 0) { items.push({ itemId: gem.itemId, quantity: 1 }); break; }
    }
  }
  return { items, xpGained: rock.xp, masteryXpGained: rock.masteryXp ?? 3 };
}

function processFishing(actionId: string): ActionResult | null {
  const spot = FISHING_SPOTS_MAP[actionId];
  if (!spot) return null;
  const playerLevel = usePlayerStore.getState().getSkillLevel('fishing');
  if (playerLevel < spot.levelRequired) return null;
  return { items: [{ itemId: spot.fishId, quantity: 1 }], xpGained: spot.xp, masteryXpGained: spot.masteryXp ?? 3 };
}

function processCooking(actionId: string): ActionResult | null {
  const recipe = COOKING_RECIPES_MAP[actionId];
  if (!recipe) return null;
  const bankStore = useBankStore.getState();
  if (!bankStore.hasItem(recipe.rawItemId, 1)) return null;
  const playerLevel = usePlayerStore.getState().getSkillLevel('cooking');
  if (playerLevel < recipe.levelRequired) return null;
  bankStore.removeItem(recipe.rawItemId, 1);
  const burnChance = calcBurnChance(playerLevel, recipe.levelRequired, recipe.burnChanceBase ?? 0.3);
  const burnt = chance(burnChance);
  const outputId = burnt ? (recipe.burntItemId ?? 'burnt_fish') : recipe.cookedItemId;
  return { items: [{ itemId: outputId, quantity: 1 }], xpGained: burnt ? 0 : recipe.xp, masteryXpGained: burnt ? 0 : (recipe.masteryXp ?? 3) };
}

function processSmithing(actionId: string): ActionResult | null {
  const recipe = SMITHING_MAP[actionId];
  if (!recipe) return null;
  const bankStore = useBankStore.getState();
  const playerLevel = usePlayerStore.getState().getSkillLevel('smithing');
  if (playerLevel < recipe.levelRequired) return null;
  for (const ing of recipe.ingredients) {
    if (!bankStore.hasItem(ing.itemId, ing.quantity)) return null;
  }
  for (const ing of recipe.ingredients) {
    bankStore.removeItem(ing.itemId, ing.quantity);
  }
  return { items: [{ itemId: recipe.outputItemId, quantity: recipe.outputQuantity ?? 1 }], xpGained: recipe.xp, masteryXpGained: recipe.masteryXp ?? 3 };
}

function processFiremaking(actionId: string): ActionResult | null {
  const log = FIREMAKING_MAP[actionId];
  if (!log) return null;
  const bankStore = useBankStore.getState();
  const playerLevel = usePlayerStore.getState().getSkillLevel('firemaking');
  if (playerLevel < log.levelRequired) return null;
  if (!bankStore.hasItem(log.logId, 1)) return null;
  bankStore.removeItem(log.logId, 1);

  const successChance = log.successChance ?? 0.75;
  const success = chance(successChance);

  const items: { itemId: string; quantity: number; tier?: number }[] = [];
  let xpGained = log.xp;
  let masteryXp = log.masteryXp ?? 3;

  if (success && log.charcoalId && log.charcoalTier) {
    items.push({ itemId: log.charcoalId, quantity: 1, tier: log.charcoalTier });
  } else if (log.ashId) {
    items.push({ itemId: log.ashId, quantity: 1 });
    xpGained = Math.max(1, Math.floor(log.xp * 0.3));
    masteryXp = Math.max(1, Math.floor(masteryXp * 0.5));
  }

  return { items, xpGained, masteryXpGained: masteryXp };
}

function processAction(skillId: SkillId, actionId: string): ActionResult | null {
  switch (skillId) {
    case 'woodcutting': return processWoodcutting(actionId);
    case 'mining':      return processMining(actionId);
    case 'fishing':     return processFishing(actionId);
    case 'cooking':     return processCooking(actionId);
    case 'smithing':    return processSmithing(actionId);
    case 'firemaking':  return processFiremaking(actionId);
    default: return null;
  }
}

// Интервал действия. Для firemaking учитывает множитель партии.
function getActionInterval(skillId: SkillId, actionId: string, multiplier = 1): number {
  switch (skillId) {
    case 'woodcutting': return WOODCUTTING_TREES_MAP[actionId]?.interval ?? 3000;
    case 'mining':      return MINING_ROCKS_MAP[actionId]?.interval ?? 3000;
    case 'fishing':     return FISHING_SPOTS_MAP[actionId]?.interval ?? 7000;
    case 'cooking':     return COOKING_RECIPES_MAP[actionId]?.interval ?? 3000;
    case 'smithing':    return SMITHING_MAP[actionId]?.interval ?? 3000;
    case 'firemaking': {
      const base = FIREMAKING_MAP[actionId]?.interval ?? 10000;
      return getBatchTime(base, multiplier);
    }
    default: return 3000;
  }
}

export const useGameStore = create<GameStore>((set, get) => ({
  activeSkill: null,
  activeActionId: null,
  actionProgress: 0,
  actionStartTime: 0,
  nextActionTime: 0,
  currentActionInterval: 3000,
  activeMultiplier: 1,
  waitingForRespawn: false,
  gameMode: 'standard',
  totalPlayTime: 0,
  sessionStartTime: Date.now(),
  lastSaveTime: Date.now(),
  isRunning: false,
  isPaused: false,
  xpGainedThisSession: {},

  startSkillAction: (skillId, actionId, multiplier = 1) => {
    const interval = getActionInterval(skillId, actionId, multiplier);
    const now = performance.now();

    const limits = getNodeLimits(actionId);
    if (limits?.stockLimit && limits.respawnMs) {
      const resourceStore = useResourceStore.getState();
      if (resourceStore.isDepleted(actionId, limits.respawnMs)) {
        set({
          activeSkill: skillId,
          activeActionId: actionId,
          actionProgress: 0,
          actionStartTime: 0,
          nextActionTime: 0,
          currentActionInterval: interval,
          activeMultiplier: multiplier,
          waitingForRespawn: true,
          isRunning: true,
          isPaused: false,
        });
        useNotificationsStore.getState().notifyInfo(
          `${UI_ICONS.waiting} ${WOODCUTTING_TREES_MAP[actionId]?.name ?? actionId} восстанавливается...`
        );
        return true;
      }
    }

    set({
      activeSkill: skillId,
      activeActionId: actionId,
      actionProgress: 0,
      actionStartTime: now,
      nextActionTime: now + interval,
      currentActionInterval: interval,
      activeMultiplier: multiplier,
      waitingForRespawn: false,
      isRunning: true,
      isPaused: false,
    });
    return true;
  },

  setMultiplier: (multiplier) => {
    const state = get();
    if (!state.activeSkill || !state.activeActionId) return;

    const newInterval = getActionInterval(state.activeSkill, state.activeActionId, multiplier);
    const now = performance.now();
    const elapsed = now - state.actionStartTime;
    const remainingTime = Math.max(0, newInterval - elapsed);

    set({
      activeMultiplier: multiplier,
      currentActionInterval: newInterval,
      nextActionTime: now + remainingTime,
    });
  },

  stopAction: () => {
    set({
      activeSkill: null,
      activeActionId: null,
      actionProgress: 0,
      activeMultiplier: 1,
      waitingForRespawn: false,
      isRunning: false,
    });
  },

  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),

  tick: (now: number) => {
    const state = get();
    if (!state.isRunning || state.isPaused) return;
    if (!state.activeSkill || !state.activeActionId) return;

    const resourceStore = useResourceStore.getState();

    if (state.waitingForRespawn) {
      const limits = getNodeLimits(state.activeActionId);
      if (limits?.stockLimit && limits.respawnMs) {
        const stillDepleted = resourceStore.isDepleted(state.activeActionId, limits.respawnMs);
        if (!stillDepleted) {
          const interval = state.currentActionInterval;
          set({
            waitingForRespawn: false,
            actionProgress: 0,
            actionStartTime: now,
            nextActionTime: now + interval,
          });
          useNotificationsStore.getState().notifyInfo(
            `${UI_ICONS.mastery} ${WOODCUTTING_TREES_MAP[state.activeActionId]?.name ?? state.activeActionId} восстановилось!`
          );
        }
      }
      return;
    }

    const elapsed = now - state.actionStartTime;
    const progress = Math.min(elapsed / state.currentActionInterval, 1);
    set({ actionProgress: progress });

    if (now < state.nextActionTime) return;

    const result = processAction(state.activeSkill, state.activeActionId);

    if (result === null) {
      set({ isRunning: false, actionProgress: 0, waitingForRespawn: false, activeMultiplier: 1 });
      useNotificationsStore.getState().notifyInfo('Not enough resources or level too low. Action stopped.');
      return;
    }

    const limits = getNodeLimits(state.activeActionId);
    if (limits?.stockLimit) {
      const ok = resourceStore.recordHarvest(state.activeActionId, 1, limits.stockLimit);

      if (!ok && limits.respawnMs) {
        useNotificationsStore.getState().notifyInfo(
          `${UI_ICONS.waiting} ${WOODCUTTING_TREES_MAP[state.activeActionId]?.name ?? state.activeActionId} истощено. Ожидание восстановления...`
        );
        set({
          waitingForRespawn: true,
          actionProgress: 0,
          actionStartTime: 0,
          nextActionTime: 0,
        });
      }
    }

    const bankStore = useBankStore.getState();
    const notifs = useNotificationsStore.getState();
    let inventoryFull = false;

    for (const { itemId, quantity, tier } of result.items) {
      const added = bankStore.addItem(itemId, quantity, tier);
      if (added && quantity > 0) {
        const item = getItem(itemId);
        if (item) notifs.notifyItem(item.name, quantity, item.icon);
      } else if (!added) {
        inventoryFull = true;
      }
    }

    if (inventoryFull) {
      notifs.notifyInfo(`${UI_ICONS.warning} Inventory full! Some items were lost.`);
    }

    if (result.xpGained > 0) {
      const { leveledUp, newLevel } = usePlayerStore.getState().addXp(state.activeSkill, result.xpGained);
      if (leveledUp) {
        notifs.notifyLevelUp(state.activeSkill, newLevel);
      }
    }

    if (result.masteryXpGained > 0) {
      const playerStore = usePlayerStore.getState();
      const oldMastery = playerStore.getMasteryLevel(state.activeSkill, state.activeActionId);
      playerStore.addMasteryXp(state.activeSkill, state.activeActionId, result.masteryXpGained);
      const newMastery = playerStore.getMasteryLevel(state.activeSkill, state.activeActionId);
      if (newMastery > oldMastery) {
        notifs.notifyMasteryLevelUp(state.activeSkill, state.activeActionId, newMastery);
      }
    }

    const xpGainedThisSession = { ...state.xpGainedThisSession };
    xpGainedThisSession[state.activeSkill] = (xpGainedThisSession[state.activeSkill] ?? 0) + result.xpGained;

    if (!get().waitingForRespawn) {
      set({
        actionProgress: 0,
        actionStartTime: now,
        nextActionTime: now + state.currentActionInterval,
        xpGainedThisSession,
      });
    } else {
      set({ xpGainedThisSession });
    }
  },

  setGameMode: (mode) => set({ gameMode: mode }),

  loadFromSave: (data) => set(s => ({ ...s, ...data })),

  reset: () => set({
    activeSkill: null, activeActionId: null, actionProgress: 0,
    actionStartTime: 0, nextActionTime: 0, currentActionInterval: 3000,
    activeMultiplier: 1,
    waitingForRespawn: false,
    totalPlayTime: 0, sessionStartTime: Date.now(), lastSaveTime: Date.now(),
    isRunning: false, isPaused: false, xpGainedThisSession: {},
  }),
}));
