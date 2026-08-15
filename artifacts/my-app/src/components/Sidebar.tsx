import React from 'react';
import { MenuLogo, MenuContent, PlayerCard } from '@/components/MenuContent';

export function Sidebar() {
  return (
    <aside className="w-60 bg-sidebar border-r border-border h-screen flex flex-col fixed left-0 top-0 overflow-hidden">
      {/* ── ЛОГОТИП ── */}
      <div className="p-4 border-b border-border bg-sidebar-accent/30 backdrop-blur-sm z-10">
        <MenuLogo />
      </div>

      {/* ── СКРОЛЛ-ЗОНА ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        <MenuContent />
      </div>

      {/* ── ПОДВАЛ ── */}
      <div className="p-3 border-t border-border bg-sidebar-accent/30">
        <PlayerCard />
      </div>
    </aside>
  );
}
