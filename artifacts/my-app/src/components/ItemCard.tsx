// ═══════════════════════════════════════════════════════════════
// УНИВЕРСАЛЬНАЯ КАРТОЧКА ПРЕДМЕТА («оболочка»)
// Сама читает: иконку, тир (бирку), грейд (цвет), статы, слоты рун.
// + hover-свечение, legendary-glow, tooltip (ItemInfoPopover).
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { cn } from '@/lib/utils';
import { getItem } from '@/data/items';
import { getGradeConfig } from '@/data/items/grades';
import { getTierConfig, getRuneSlotsForTier } from '@/data/items/tiers';
import { getEffectiveEquipmentStats } from '@/data/economy';
import { ItemInfoPopover } from '@/components/ItemInfoPopover';
import { UI_ICONS } from '@/lib/icons';

interface ItemCardProps {
  itemId: string;
  grade?: string;
  quantity?: number;
  showCount?: boolean;
  locked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Клик открывает ItemInfoPopover (инфо о предмете) */
  tooltip?: boolean;
  onClick?: () => void;
  className?: string;
}

const SIZE_BOX = {
  sm: 'w-10 h-10 text-xl rounded-lg',
  md: 'w-14 h-14 text-2xl rounded-xl',
  lg: 'w-16 h-16 text-3xl rounded-xl',
};

export function ItemCard({
  itemId, grade, quantity, showCount = true, locked = false,
  size = 'md', tooltip = false, onClick, className,
}: ItemCardProps) {
  const item = getItem(itemId);
  if (!item) return null;

  const gradeCfg = getGradeConfig(grade as any);
  const tierCfg = getTierConfig(item.tier);
  const isEquippable = !!item.equipSlot || item.category === 'weapon';
  const runeSlots = isEquippable ? getRuneSlotsForTier(item.tier) : 0;
  const stats = isEquippable ? getEffectiveEquipmentStats(item) : null;
  const showQty = showCount && item.stackable && (quantity ?? 0) > 1;
  const isLegendary = grade === 'legendary';

  // CSS-переменная для свечения (hover + legendary)
  const glowStyle = gradeCfg
    ? ({ ['--glow' as any]: gradeCfg.glowColor } as React.CSSProperties)
    : undefined;

  const glowClass = cn(
    !locked && 'transition-shadow hover:shadow-[0_0_14px_var(--glow)]',
    isLegendary && !locked && 'shadow-[0_0_18px_var(--glow)]'
  );

  const iconBox = (
    <div
      className={cn(
        'relative shrink-0 flex items-center justify-center border shadow-inner',
        SIZE_BOX[size],
        gradeCfg ? `${gradeCfg.bgColor} ${gradeCfg.borderColor}` : 'bg-background/40 border-border',
        locked && 'grayscale opacity-60'
      )}
    >
      {item.icon}
      {tierCfg && (
        <span className={cn(
          'absolute -top-1.5 -right-1.5 px-1 py-0.5 rounded text-[9px] font-mono font-black leading-none',
          tierCfg.badgeBgColor, tierCfg.badgeTextColor
        )}>T{item.tier}</span>
      )}
      {showQty && (
        <span className="absolute -bottom-1 -right-1 px-1 rounded bg-black/70 text-[9px] font-mono font-bold text-white leading-tight">×{quantity}</span>
      )}
      {locked && (
        <span className="absolute inset-0 flex items-center justify-center text-sm opacity-80">{UI_ICONS.locked}</span>
      )}
    </div>
  );

  // ── Компактные размеры ──
  if (size !== 'lg') {
    const body = (
      <div onClick={onClick} style={glowStyle}
        className={cn('relative rounded-xl', glowClass, onClick && 'cursor-pointer', className)}>
        {iconBox}
        {isLegendary && <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[0_0_18px_var(--glow)] animate-pulse" />}
      </div>
    );
    return tooltip ? <ItemInfoPopover itemId={itemId}>{body}</ItemInfoPopover> : body;
  }

  // ── lg: полная карточка ──
  const body = (
    <div onClick={onClick} style={glowStyle}
      className={cn(
        'relative flex flex-col gap-2 p-3 rounded-xl border',
        gradeCfg ? `${gradeCfg.bgColor} ${gradeCfg.borderColor}` : 'bg-card border-border',
        glowClass, onClick && 'cursor-pointer', className
      )}>
      {isLegendary && <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[0_0_18px_var(--glow)] animate-pulse" />}
      <div className="flex items-center gap-3">
        {iconBox}
        <div className="flex-1 min-w-0">
          <p className={cn('font-bold text-sm leading-tight truncate', gradeCfg?.textColor)}>{item.name}</p>
          {item.description && <p className="text-[10px] text-muted-foreground line-clamp-1">{item.description}</p>}
        </div>
      </div>
      {stats && Object.keys(stats).length > 0 && (
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px] font-mono">
          {stats.attackBonus != null && <span className="text-muted-foreground">Атака <b className="text-foreground">+{stats.attackBonus}</b></span>}
          {stats.strengthBonus != null && <span className="text-muted-foreground">Сила <b className="text-foreground">+{stats.strengthBonus}</b></span>}
          {stats.defenceBonus != null && <span className="text-muted-foreground">Защита <b className="text-foreground">+{stats.defenceBonus}</b></span>}
          {stats.attackSpeed != null && <span className="text-muted-foreground">Скор. <b className="text-foreground">{stats.attackSpeed}</b></span>}
        </div>
      )}
      {runeSlots > 0 && (
        <div className="flex gap-1.5">
          {Array.from({ length: runeSlots }).map((_, i) => {
            const filled = (item.appliedRunes ?? [])[i];
            return (
              <div key={i} className={cn(
                'w-5 h-5 rounded-md border flex items-center justify-center text-[10px]',
                filled ? 'bg-primary/20 border-primary' : 'bg-background/40 border-border/60 border-dashed'
              )}>{filled ? '◆' : ''}</div>
            );
          })}
        </div>
      )}
    </div>
  );
  return tooltip ? <ItemInfoPopover itemId={itemId}>{body}</ItemInfoPopover> : body;
}
