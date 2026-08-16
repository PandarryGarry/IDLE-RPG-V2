import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { MenuLogo, MenuContent, PlayerCard } from '@/components/MenuContent';
import { X } from 'lucide-react';

export function SideMenu() {
  const sideMenuOpen = useUIStore(s => s.sideMenuOpen);
  const closeSideMenu = useUIStore(s => s.closeSideMenu);

  return (
    <AnimatePresence>
      {sideMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={closeSideMenu}
          />

          {/* Side panel */}
          <motion.div
            key="panel"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-[300px] max-w-[85vw] bg-card border-r border-white/5 flex flex-col md:hidden"
          >
            {/* ── ЛОГОТИП + ЗАКРЫТЬ ── */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.03] backdrop-blur-sm z-10">
              <MenuLogo onNavigate={closeSideMenu} />
              <button
                onClick={closeSideMenu}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── СКРОЛЛ-ЗОНА ── */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              <MenuContent onNavigate={closeSideMenu} />
            </div>

            {/* ── ПОДВАЛ ── */}
            <div className="p-3 border-t border-white/5 bg-white/[0.03]">
              <PlayerCard onNavigate={closeSideMenu} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
