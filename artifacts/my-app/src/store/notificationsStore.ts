import { create } from 'zustand';
import type { GameNotification, NotificationType, SkillId } from '../data/types';
import { generateId } from '../lib/utils';
import { getSkillIcon, UI_ICONS, COMBAT_ICONS } from '../lib/icons';

const MAX_NOTIFICATIONS = 20;
const AUTO_DISMISS_MS = 4000;
const LEVELUP_DISMISS_MS = 6000;

export interface NotificationsStore {
  notifications: GameNotification[];
  addNotification: (type: NotificationType, message: string, opts?: Partial<GameNotification>) => void;
  dismissNotification: (id: string) => void;
  clearAll: () => void;

  // Convenience helpers
  notifyLevelUp: (skillId: SkillId, newLevel: number) => void;
  notifyItem: (itemName: string, qty: number, icon?: string) => void;
  notifyMasteryLevelUp: (skillId: SkillId, actionName: string, newLevel: number) => void;
  notifyCombat: (message: string) => void;
  notifyInfo: (message: string) => void;
}

export const useNotificationsStore = create<NotificationsStore>((set, get) => ({
  notifications: [],

  addNotification: (type, message, opts = {}) => {
    const id = generateId();
    const notification: GameNotification = {
      id,
      type,
      message,
      timestamp: Date.now(),
      ...opts,
    };
    set(s => ({
      notifications: [notification, ...s.notifications].slice(0, MAX_NOTIFICATIONS),
    }));
    // Auto-dismiss all notifications (level-ups stay longer)
    const delay = (type === 'levelup' || type === 'mastery_levelup') ? LEVELUP_DISMISS_MS : AUTO_DISMISS_MS;
    setTimeout(() => get().dismissNotification(id), delay);
  },

  dismissNotification: (id) => {
    set(s => ({ notifications: s.notifications.filter(n => n.id !== id) }));
  },

  clearAll: () => set({ notifications: [] }),

  notifyLevelUp: (skillId, newLevel) => {
    const icon = getSkillIcon(skillId);
    const skillName = skillId.charAt(0).toUpperCase() + skillId.slice(1);
    get().addNotification('levelup', `${skillName} level up! → ${newLevel}`, {
      icon,
      skillId,
      level: newLevel,
    });
  },

  notifyItem: (itemName, qty, icon) => {
    const msg = qty > 1 ? `${itemName} x${qty}` : itemName;
    get().addNotification('item', msg, { icon: icon ?? UI_ICONS.misc });
  },

  notifyMasteryLevelUp: (skillId, actionName, newLevel) => {
    get().addNotification('mastery_levelup', `${actionName} mastery → ${newLevel}`, {
      icon: UI_ICONS.mastery,
      skillId,
      level: newLevel,
    });
  },

  notifyCombat: (message) => {
    get().addNotification('combat', message, { icon: COMBAT_ICONS.damage });
  },

  notifyInfo: (message) => {
    get().addNotification('info', message, { icon: UI_ICONS.info });
  },
}));
