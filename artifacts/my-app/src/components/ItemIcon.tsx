import React from 'react';
import { getItemIcon } from '@/lib/icons';
import { getTierConfig } from '@/data/items/tiers';
import { TierBadge } from '@/components/TierBadge';
import { cn } from '@/lib/utils';

interface ItemIconProps {
  itemId: string;
  size?: 'sm' | 'md' | 'lg';
  tier?: number;
  showTierBadge?: boolean;
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'w-6 h-6 text-lg',
  md: 'w-8 h-8 text-2xl',
  lg: 'w-12 h-12 text-3xl',
};

export function ItemIcon({ itemId, size = 'md', tier, showTierBadge = false, className }: ItemIconProps) {
  const icon = getItemIcon(itemId);
  const sizeClass = SIZE_CLASSES[size];
  const tierCfg = getTierConfig(tier);

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'rounded-lg border flex items-center justify-center shadow-inner',
          tierCfg
            ? `${tierCfg.badgeBgColor} border-zinc-400/40`
            : 'bg-background/60 border-border',
          sizeClass,
          className
        )}
      >
        {icon}
      </div>
      {showTierBadge && tier && (
        <div className="absolute -top-1 -right-1">
          <TierBadge tier={tier} size="sm" />
        </div>
      )}
    </div>
  );
}
