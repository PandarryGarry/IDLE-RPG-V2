import { create } from 'zustand';
import type { ItemSlot, GradeId, EquipSlot } from '@/data/types';
import { getItem } from '@/data/items';
import { usePlayerStore } from './playerStore';

const DEFAULT_MAX_SLOTS = 12;
const SLOTS_PER_UPGRADE = 12;

export type CategoryFilter = 'all' | 'equipment' | 'resources' | 'food' | 'misc';

export interface InventoryStore {
  items: ItemSlot[];
  gp: number;
  maxSlots: number;
  sortMode: 'default' | 'name' | 'value' | 'quantity' | 'category';
  searchQuery: string;
  activeTab: number;
  activeCategory: CategoryFilter;

  // Queries
  getItemQty: (itemId: string, tier?: number, grade?: GradeId) => number;
  hasItem: (itemId: string, qty?: number, tier?: number, grade?: GradeId) => boolean;
  getSlot: (itemId: string, tier?: number, grade?: GradeId) => ItemSlot | undefined;
  getFilteredItems: () => ItemSlot[];
  getUsedSlots: () => number;

  // Mutations
  addItem: (itemId: string, qty: number, tier?: number, grade?: GradeId) => boolean;
  removeItem: (itemId: string, qty: number, tier?: number, grade?: GradeId) => boolean;
  removeItems: (items: { itemId: string; quantity: number; tier?: number; grade?: GradeId }[]) => boolean;
  addGp: (amount: number) => void;
  spendGp: (amount: number) => boolean;
  sellItem: (itemId: string, qty: number, tier?: number, grade?: GradeId) => number;
  sellAll: (itemId: string, tier?: number, grade?: GradeId) => number;
  lockItem: (itemId: string, tier?: number, grade?: GradeId, locked?: boolean) => void;
  equipFromInventory: (itemId: string, tier?: number, grade?: GradeId) => boolean;
  setTab: (itemId: string, tab: number) => void;
  upgradeSlots: () => void;
  setSearch: (query: string) => void;
  setSort: (mode: InventoryStore['sortMode']) => void;
  setActiveTab: (tab: number) => void;
  setCategory: (category: CategoryFilter) => void;
  loadFromSave: (items: ItemSlot[], gp: number, maxSlots: number) => void;
  reset: () => void;
}

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  items: [],
  gp: 0,
  maxSlots: DEFAULT_MAX_SLOTS,
  sortMode: 'default',
  searchQuery: '',
  activeTab: 0,
  activeCategory: 'all',

  getItemQty: (itemId, tier, grade) => {
    const slot = get().items.find(s => s.itemId === itemId && s.tier === tier && s.grade === grade);
    return slot?.quantity ?? 0;
  },

  hasItem: (itemId, qty = 1, tier, grade) => get().getItemQty(itemId, tier, grade) >= qty,

  getSlot: (itemId, tier, grade) => get().items.find(s => s.itemId === itemId && s.tier === tier && s.grade === grade),

  getUsedSlots: () => get().items.filter(s => s.quantity > 0).length,

  getFilteredItems: () => {
    const { items, searchQuery, sortMode, activeTab, activeCategory } = get();
    let result = items.filter(s => s.quantity > 0);

    if (activeTab > 0) {
      result = result.filter(s => s.tab === activeTab);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => {
        const item = getItem(s.itemId);
        return item?.name.toLowerCase().includes(q) || s.itemId.includes(q);
      });
    }

    if (activeCategory !== 'all') {
      result = result.filter(s => {
        const item = getItem(s.itemId);
        if (!item) return false;
        const category = item.category;
        switch (activeCategory) {
          case 'equipment':
            return ['weapon', 'helm', 'platebody', 'platelegs', 'boots', 'gloves',
              'amulet', 'ring', 'shield', 'cape', 'quiver', 'passive'].includes(category);
          case 'resources':
            return ['ore', 'log', 'raw_fish', 'bar', 'gem', 'herb', 'seed', 'charcoal'].includes(category);
          case 'food':
            return ['food', 'cooked_fish', 'potion'].includes(category);
          case 'misc':
            return ['misc', 'bone', 'ash', 'rune', 'tablet', 'arrow'].includes(category);
          default:
            return true;
        }
      });
    }

    if (sortMode === 'name') {
      result.sort((a, b) => (getItem(a.itemId)?.name ?? '').localeCompare(getItem(b.itemId)?.name ?? ''));
    } else if (sortMode === 'value') {
      result.sort((a, b) => {
        const valA = (getItem(a.itemId)?.sellValue ?? 0) * a.quantity;
        const valB = (getItem(b.itemId)?.sellValue ?? 0) * b.quantity;
        return valB - valA;
      });
    } else if (sortMode === 'quantity') {
      result.sort((a, b) => b.quantity - a.quantity);
    } else if (sortMode === 'category') {
      result.sort((a, b) => {
        const catA = getItem(a.itemId)?.category ?? 'misc';
        const catB = getItem(b.itemId)?.category ?? 'misc';
        return catA.localeCompare(catB);
      });
    }

    return result;
  },

  addItem: (itemId, qty, tier, grade) => {
    const { items, maxSlots } = get();
    const item = getItem(itemId);
    if (!item) return false;

    const existingIdx = items.findIndex(s =>
      s.itemId === itemId && s.tier === tier && s.grade === grade
    );

    if (existingIdx >= 0) {
      if (item.stackable) {
        const newItems = [...items];
        newItems[existingIdx] = {
          ...newItems[existingIdx],
          quantity: newItems[existingIdx].quantity + qty
        };
        set({ items: newItems });
        return true;
      }
    }

    const usedSlots = items.filter(s => s.quantity > 0).length;
    if (usedSlots >= maxSlots) return false;

    set({
      items: [...items, {
        itemId,
        quantity: item.stackable ? qty : 1,
        locked: false,
        tab: 0,
        tier,
        grade
      }]
    });
    return true;
  },

  removeItem: (itemId, qty, tier, grade) => {
    const { items } = get();
    const idx = items.findIndex(s => s.itemId === itemId && s.tier === tier && s.grade === grade);
    if (idx < 0 || items[idx].quantity < qty) return false;

    const newItems = [...items];
    const newQty = newItems[idx].quantity - qty;

    if (newQty <= 0) {
      newItems.splice(idx, 1);
    } else {
      newItems[idx] = { ...newItems[idx], quantity: newQty };
    }

    set({ items: newItems });
    return true;
  },

  removeItems: (itemList) => {
    const state = get();
    for (const { itemId, quantity, tier, grade } of itemList) {
      if (!state.hasItem(itemId, quantity, tier, grade)) return false;
    }
    for (const { itemId, quantity, tier, grade } of itemList) {
      state.removeItem(itemId, quantity, tier, grade);
    }
    return true;
  },

  addGp: (amount) => set(s => ({ gp: s.gp + amount })),

  spendGp: (amount) => {
    const { gp } = get();
    if (gp < amount) return false;
    set({ gp: gp - amount });
    return true;
  },

  sellItem: (itemId, qty, tier, grade) => {
    const item = getItem(itemId);
    if (!item || !item.canSell) return 0;

    const slot = get().getSlot(itemId, tier, grade);
    if (slot?.locked) return 0;

    const available = get().getItemQty(itemId, tier, grade);
    const sellQty = Math.min(qty, available);
    if (sellQty <= 0) return 0;

    get().removeItem(itemId, sellQty, tier, grade);
    const gpGained = item.sellValue * sellQty;
    get().addGp(gpGained);
    return gpGained;
  },

  sellAll: (itemId, tier, grade) => {
    const qty = get().getItemQty(itemId, tier, grade);
    return get().sellItem(itemId, qty, tier, grade);
  },

  lockItem: (itemId, tier, grade, locked = true) => {
    const { items } = get();
    set({
      items: items.map(s =>
        s.itemId === itemId && s.tier === tier && s.grade === grade
          ? { ...s, locked }
          : s
      )
    });
  },

  equipFromInventory: (itemId, tier, grade) => {
    const equipItem = usePlayerStore.getState().equipItem;

    const item = getItem(itemId);
    if (!item || !item.equipSlot) return false;

    const slot = get().getSlot(itemId, tier, grade);
    if (!slot || slot.locked) return false;

    const oldEquipId = equipItem(itemId, item.equipSlot);
    get().removeItem(itemId, 1, tier, grade);

    if (oldEquipId) {
      const oldItem = getItem(oldEquipId);
      if (oldItem) {
        get().addItem(oldEquipId, 1, oldItem.tier);
      }
    }

    return true;
  },

  setTab: (itemId, tab) => {
    const { items } = get();
    set({ items: items.map(s => s.itemId === itemId ? { ...s, tab } : s) });
  },

  upgradeSlots: () => set(s => ({ maxSlots: s.maxSlots + SLOTS_PER_UPGRADE })),

  setSearch: (query) => set({ searchQuery: query }),

  setSort: (mode) => set({ sortMode: mode }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setCategory: (category) => set({ activeCategory: category }),

  loadFromSave: (items, gp, maxSlots) => set({ items, gp, maxSlots }),

  reset: () => set({
    items: [],
    gp: 0,
    maxSlots: DEFAULT_MAX_SLOTS,
    searchQuery: '',
    sortMode: 'default',
    activeTab: 0,
    activeCategory: 'all'
  }),
}));
