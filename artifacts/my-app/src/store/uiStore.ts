// src/store/uiStore.ts
import { create } from 'zustand';

export type ModalType = 
  | 'onboarding' 
  | 'settings' 
  | 'save' 
  | 'toolRepair' 
  | 'itemDetails' 
  | null;

export type SkillCategory = 
  | 'all' 
  | 'gathering' 
  | 'artisan' 
  | 'combat' 
  | 'other';

export interface UIStore {
  // Состояние UI
  sideMenuOpen: boolean;
  bottomNavVisible: boolean;
  activeModal: ModalType;
  activeSkillCategory: SkillCategory;

  // Скролл-состояние для автоскрытия BottomNav
  lastScrollY: number;

  // Новые поля для управления потоком экранов
  isSplashVisible: boolean;
  isAuthModalOpen: boolean;

  // Actions
  toggleSideMenu: () => void;
  openSideMenu: () => void;
  closeSideMenu: () => void;

  setBottomNavVisible: (visible: boolean) => void;
  updateScrollPosition: (scrollY: number) => void;

  openModal: (modal: ModalType) => void;
  closeModal: () => void;

  setSkillCategory: (category: SkillCategory) => void;

  // Новые методы
  hideSplash: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;

  reset: () => void;
}

const INITIAL_STATE = {
  sideMenuOpen: false,
  bottomNavVisible: true,
  activeModal: null as ModalType,
  activeSkillCategory: 'all' as SkillCategory,
  lastScrollY: 0,
  isSplashVisible: true,
  isAuthModalOpen: false,
};

export const useUIStore = create<UIStore>((set, get) => ({
  ...INITIAL_STATE,

  toggleSideMenu: () => set(s => ({ sideMenuOpen: !s.sideMenuOpen })),
  openSideMenu: () => set({ sideMenuOpen: true }),
  closeSideMenu: () => set({ sideMenuOpen: false }),

  setBottomNavVisible: (visible) => set({ bottomNavVisible: visible }),

  updateScrollPosition: (scrollY) => {
    const { lastScrollY } = get();
    const delta = scrollY - lastScrollY;

    if (scrollY < 50) {
      set({ bottomNavVisible: true, lastScrollY: scrollY });
    } else if (delta > 5) {
      set({ bottomNavVisible: false, lastScrollY: scrollY });
    } else if (delta < -5) {
      set({ bottomNavVisible: true, lastScrollY: scrollY });
    }
  },

  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),

  setSkillCategory: (category) => set({ activeSkillCategory: category }),

  // Новые методы
  hideSplash: () => set({ isSplashVisible: false }),
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  reset: () => set(INITIAL_STATE),
}));