import React from 'react';
import { cn } from '@/lib/utils';
import { getTier } from '@/data/tiers';

interface TierBadgeProps {
  tier?: number;
  showLabel?: boolean;
  showName?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'px-1.5 py-0.5 text-[9px]',
  md: 'px-2 py-1 text-[10px]',
  lg: 'px-2.5 py-1 text-xs',
};

export function TierBadge({ tier, showLabel = true, showName = false, size = 'sm', className }: TierBadgeProps) {
  if (!tier || tier < 1) return null;
  const tierData = getTier(tier);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-mono font-bold rounded-md',
        'border border-white/10 text-white shadow-sm',
        tierData.solidColor,
        SIZE_CLASSES[size],
        className
      )}
    >
      {showLabel && <span>T{tier}</span>}
      {showName && (
        <>
          {showLabel && <span className="opacity-50">·</span>}
          <span className="font-semibold">{tierData.name}</span>
        </>
      )}
    </span>
  );
}
