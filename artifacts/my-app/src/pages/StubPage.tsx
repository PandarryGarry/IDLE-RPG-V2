import React from 'react';
import { UI_ICONS } from '@/lib/icons';

interface StubPageProps {
  title: string;
  iconName?: keyof typeof UI_ICONS;
}

export function StubPage({ title, iconName = 'misc' }: StubPageProps) {
  const icon = UI_ICONS[iconName] || UI_ICONS.misc;

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm max-w-md text-center">
        <div className="text-6xl md:text-7xl mb-4 opacity-40">{icon}</div>
        <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground font-mono">
          Coming soon — в разработке
        </p>
      </div>
    </div>
  );
}
