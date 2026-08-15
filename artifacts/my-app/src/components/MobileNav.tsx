import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import {
  Building2, ScrollText, Globe2, PawPrint, Skull,
  Landmark, Store, Home, Users,
  BookOpen, MapPin, CalendarDays, Trophy,
  Map, DoorClosed, Swords, Egg, Shield, BarChart3, Construction,
} from 'lucide-react';

interface MobileNavProps {
  className?: string;
}

// ═══════════════════════════════════════════════════════════════
// ЗАРИСОВКА БУДУЩИХ СИСТЕМ (каркас на будущее)
// TODO: перенести названия в i18n при реализации систем
// ═══════════════════════════════════════════════════════════════

type IconType = React.ComponentType<{ className?: string }>;

interface DockSubItem {
  icon: IconType;
  label: string;
}

interface DockTab {
  id: string;
  icon: IconType;
  label: string;
  subItems: DockSubItem[];
}

const DOCK_TABS: DockTab[] = [
  {
    id: 'town',
    icon: Building2,
    label: 'Town',
    subItems: [
      { icon: Landmark, label: 'Bank' },
      { icon: Store, label: 'Shop' },
      { icon: Home, label: 'My Home' },
      { icon: Users, label: 'Guild' },
    ],
  },
  {
    id: 'quests',
    icon: ScrollText,
    label: 'Quests',
    subItems: [
      { icon: BookOpen, label: 'Story' },
      { icon: MapPin, label: 'Side' },
      { icon: CalendarDays, label: 'Daily' },
      { icon: Trophy, label: 'Achievements' },
    ],
  },
  {
    id: 'world',
    icon: Globe2,
    label: 'World',
    subItems: [
      { icon: Map, label: 'World Map' },
      { icon: DoorClosed, label: 'Dungeons' },
      { icon: Swords, label: 'Arena' },
    ],
  },
  {
    id: 'pets',
    icon: PawPrint,
    label: 'Pets',
    subItems: [
      { icon: PawPrint, label: 'My Pets' },
      { icon: Egg, label: 'Hatching' },
    ],
  },
  {
    id: 'bosses',
    icon: Skull,
    label: 'Bosses',
    subItems: [
      { icon: Skull, label: 'World Bosses' },
      { icon: Shield, label: 'Dungeon Bosses' },
      { icon: BarChart3, label: 'Leaderboard' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// МОБИЛЬНЫЙ ДОК (адаптивный: edge-to-edge / MacBook-стиль)
// ═══════════════════════════════════════════════════════════════

export function MobileNav({ className }: MobileNavProps) {
  const [openTab, setOpenTab] = useState<string | null>(null);
  const bottomNavVisible = useUIStore(s => s.bottomNavVisible);

  const activeTab = DOCK_TABS.find(t => t.id === openTab) ?? null;
  const closePopup = () => setOpenTab(null);

  return (
    <>
      {/* ── Попап-подменю выбранной вкладки ── */}
      <AnimatePresence>
        {activeTab && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={closePopup}
            />
            <motion.div
              key="panel"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className={cn(
                'fixed z-50 bg-card border-border p-4 pb-5 max-h-[70vh] overflow-y-auto overscroll-contain',
                // mobile: шторка от края до края
                'bottom-[calc(3.5rem+env(safe-area-inset-bottom))] inset-x-0 border-t rounded-t-2xl',
                // md+: центрированная карточка над доком
                'md:bottom-24 md:inset-x-0 md:mx-auto md:max-w-md md:rounded-2xl md:border'
              )}
            >
              {/* Drag handle */}
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />

              {/* Заголовок попапа */}
              <div className="flex items-center justify-between mb-3 px-1">
                <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  {activeTab.label}
                </p>
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/30 font-bold uppercase tracking-wider">
                  Sketch
                </span>
              </div>

              {/* Подпункты-зарисовки (все «в разработке») */}
              <div className="grid grid-cols-2 gap-2">
                {activeTab.subItems.map(item => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border bg-background/60 opacity-60 cursor-not-allowed select-none"
                  >
                    <item.icon className="w-6 h-6 text-muted-foreground" />
                    <span className="text-[10px] font-bold text-center text-foreground">
                      {item.label}
                    </span>
                    <span className="flex items-center gap-1 text-[8px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold uppercase tracking-wider">
                      <Construction className="w-2.5 h-2.5" />
                      In Dev
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Сам док ── */}
      <motion.nav
        initial={false}
        animate={{
          y: bottomNavVisible ? 0 : '100%',
          opacity: bottomNavVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={cn(
          'fixed z-40 bg-card/95 backdrop-blur-md border-border flex items-stretch',
          // mobile: от края до края
          'bottom-0 inset-x-0 border-t',
          'h-[calc(3.5rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]',
          // md+: плавающий док как у MacBook (центрирование без translate!)
          'md:bottom-4 md:mx-auto md:w-fit md:inset-x-0 md:h-16 md:pb-0 md:px-2',
          'md:rounded-2xl md:border md:shadow-2xl md:shadow-black/50',
          className
        )}
      >
        {DOCK_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setOpenTab(openTab === tab.id ? null : tab.id)}
            className={cn(
              'relative flex-1 md:flex-none md:w-20 flex flex-col items-center justify-center gap-0.5',
              'text-[11px] font-bold transition-colors',
              openTab === tab.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
            title={tab.label}
          >
            <span className="relative">
              <tab.icon className={cn('w-6 h-6', openTab === tab.id ? 'opacity-100' : 'opacity-70')} />
              {/* Точка «soon» */}
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500/80" />
            </span>
            {/* Подпись только на мобильных (на md+ — как MacBook, только иконки) */}
            <span className="md:hidden">{tab.label}</span>
          </button>
        ))}
      </motion.nav>
    </>
  );
}
