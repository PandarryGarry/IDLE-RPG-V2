// Save/Load manager for Melvor Idle Clone
// Supports: localStorage auto-save, multiple save slots, JSON export/import
// Migration: старые сейвы (bank) автоматически конвертируются в inventory

import type { SaveData, ItemSlot } from '../data/types';
import { usePlayerStore } from '../store/playerStore';
import { useInventoryStore } from '../store/inventoryStore';
import { useGameStore } from '../store/gameStore';
import { useSettingsStore } from '../store/settingsStore';
import { calculateOfflineProgress } from '../gameEngine/offlineCalc';

const SAVE_VERSION = '1.1.0'; // Обновил версию для миграции
const SAVE_KEY_PREFIX = 'melvor_save_';
const AUTO_SAVE_SLOT = 'auto';
export const SAVE_SLOTS = ['slot1', 'slot2', 'slot3'] as const;
export type SaveSlot = typeof SAVE_SLOTS[number] | typeof AUTO_SAVE_SLOT;

// ═══════════════════════════════════════════════════════════════
// MIGRATION: конвертация старых сейвов (bank → inventory)
// ═══════════════════════════════════════════════════════════════

interface OldSaveData {
  version: string;
  bank?: {
    items: ItemSlot[];
    gp: number;
    maxSlots: number;
  };
  inventory?: {
    items: ItemSlot[];
    gp: number;
    maxSlots: number;
  };
  [key: string]: any;
}

function migrateSaveData(rawData: OldSaveData): SaveData {
  const data = { ...rawData } as any;

  // Миграция: если есть bank, но нет inventory — копируем в inventory
  if (data.bank && !data.inventory) {
    console.log('[saveManager] Migrating old save: bank → inventory');
    data.inventory = {
      items: data.bank.items || [],
      gp: data.bank.gp || 0,
      maxSlots: data.bank.maxSlots || 12,
    };
    delete data.bank; // Удаляем старое поле
  }

  // Убеждаемся что inventory существует
  if (!data.inventory) {
    data.inventory = { items: [], gp: 0, maxSlots: 12 };
  }

  return data as SaveData;
}

// ═══════════════════════════════════════════════════════════════
// COLLECT SAVE DATA
// ═══════════════════════════════════════════════════════════════

export function collectSaveData(): SaveData {
  const player = usePlayerStore.getState();
  const inventory = useInventoryStore.getState();
  const game = useGameStore.getState();

  return {
    version: SAVE_VERSION,
    savedAt: Date.now(),
    totalPlayTime: game.totalPlayTime,
    gameMode: game.gameMode,
    player: {
      skills: player.skills,
      equipment: player.equipment,
    },
    inventory: {
      items: inventory.items,
      gp: inventory.gp,
      maxSlots: inventory.maxSlots,
    },
    game: {
      activeSkill: game.activeSkill,
      activeActionId: game.activeActionId,
      activeAreaId: null,
      activeMonsterId: null,
    },
    settings: {},
  };
}

// ═══════════════════════════════════════════════════════════════
// APPLY SAVE DATA
// ═══════════════════════════════════════════════════════════════

export function applySaveData(data: SaveData): void {
  const playerStore = usePlayerStore.getState();
  const inventoryStore = useInventoryStore.getState();
  const gameStore = useGameStore.getState();

  playerStore.loadFromSave(data.player.skills, data.player.equipment);
  inventoryStore.loadFromSave(data.inventory.items, data.inventory.gp, data.inventory.maxSlots);
  gameStore.loadFromSave({
    gameMode: data.gameMode,
    totalPlayTime: data.totalPlayTime,
    activeSkill: data.game.activeSkill,
    activeActionId: data.game.activeActionId,
    lastSaveTime: data.savedAt,
  });

  // Calculate offline progress
  if (data.game.activeSkill && data.game.activeActionId) {
    calculateOfflineProgress(data.game.activeSkill, data.game.activeActionId, data.savedAt);
  }
}

// ═══════════════════════════════════════════════════════════════
// LOCALSTORAGE OPERATIONS
// ═══════════════════════════════════════════════════════════════

export function saveToSlot(slot: SaveSlot): void {
  try {
    const data = collectSaveData();
    const json = JSON.stringify(data);
    localStorage.setItem(`${SAVE_KEY_PREFIX}${slot}`, json);
    console.log(`[saveManager] Saved to ${slot}`);
  } catch (e) {
    console.error('[saveManager] Failed to save game:', e);
  }
}

export function loadFromSlot(slot: SaveSlot): SaveData | null {
  try {
    const json = localStorage.getItem(`${SAVE_KEY_PREFIX}${slot}`);
    if (!json) return null;

    const rawData = JSON.parse(json) as OldSaveData;
    const migratedData = migrateSaveData(rawData);

    console.log(`[saveManager] Loaded from ${slot}`);
    return migratedData;
  } catch (e) {
    console.error('[saveManager] Failed to load save:', e);
    return null;
  }
}

export function deleteSaveSlot(slot: SaveSlot): void {
  localStorage.removeItem(`${SAVE_KEY_PREFIX}${slot}`);
  console.log(`[saveManager] Deleted slot ${slot}`);
}

export function getSaveMetadata(slot: SaveSlot): { savedAt: number; gameMode: string; totalPlayTime: number } | null {
  const data = loadFromSlot(slot);
  if (!data) return null;
  return { savedAt: data.savedAt, gameMode: data.gameMode, totalPlayTime: data.totalPlayTime };
}

// ═══════════════════════════════════════════════════════════════
// AUTO-SAVE
// ═══════════════════════════════════════════════════════════════

let autoSaveTimer: ReturnType<typeof setInterval> | null = null;

export function startAutoSave(intervalSeconds = 30): void {
  stopAutoSave();
  autoSaveTimer = setInterval(() => {
    saveToSlot(AUTO_SAVE_SLOT);
  }, intervalSeconds * 1000);
  console.log(`[saveManager] Auto-save started (${intervalSeconds}s)`);
}

export function stopAutoSave(): void {
  if (autoSaveTimer) {
    clearInterval(autoSaveTimer);
    autoSaveTimer = null;
    console.log('[saveManager] Auto-save stopped');
  }
}

export function manualSave(slot: SaveSlot = AUTO_SAVE_SLOT): void {
  saveToSlot(slot);
}

// ═══════════════════════════════════════════════════════════════
// EXPORT / IMPORT
// ═══════════════════════════════════════════════════════════════

export function exportSave(): string {
  const data = collectSaveData();
  return btoa(JSON.stringify(data)); // base64 encode
}

export function importSave(encoded: string): boolean {
  try {
    const json = atob(encoded);
    const rawData = JSON.parse(json) as OldSaveData;

    if (!rawData.version || !rawData.player) {
      throw new Error('Invalid save data');
    }

    const migratedData = migrateSaveData(rawData);
    applySaveData(migratedData);
    saveToSlot(AUTO_SAVE_SLOT);

    console.log('[saveManager] Save imported successfully');
    return true;
  } catch (e) {
    console.error('[saveManager] Failed to import save:', e);
    return false;
  }
}

export function exportSaveAsFile(): void {
  const data = collectSaveData();
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `melvor_save_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  console.log('[saveManager] Save exported as file');
}

// ═══════════════════════════════════════════════════════════════
// GAME INITIALIZATION
// ═══════════════════════════════════════════════════════════════

export function initGame(): void {
  // Try to load auto-save
  const autoSave = loadFromSlot(AUTO_SAVE_SLOT);
  if (autoSave) {
    applySaveData(autoSave);
    console.log('[saveManager] Game initialized from auto-save');
  } else {
    console.log('[saveManager] No auto-save found, starting fresh game');
  }

  // Start auto-save timer
  const settings = useSettingsStore.getState();
  if (settings.autoSaveEnabled) {
    startAutoSave(settings.autoSaveInterval);
  }
}
