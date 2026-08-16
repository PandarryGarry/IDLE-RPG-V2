// ═══════════════════════════════════════════════════════════════
// ITEM CARD v4 — точно по Modular Game UI Kit
// Ячейка = слой светлее страницы, крупная иконка, мягкие бейджи,
// количество приглушённое. Без внешних панелей.
// ═══════════════════════════════════════════════════════════════

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { getItem } from '@/data/items';
import { DEFAULT_GRADES } from '@/data/items/grades';
import { UI_ICONS } from '@/lib/icons';

interface ItemCardProps {
  itemId: string;
  grade?: string;
  tier?: number;
  quantity?: number;
  showCount?: boolean;
  locked?: boolean;
  index?: number;
  size?: 'cell' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  onLongPress?: () => void;
  className?: string;
}

const SIZE_CLASS = {
  cell: 'w-full aspect-square',
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
};

const ICON_SIZE = {
  cell: 'text-3xl sm:text-4xl',
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
};

const GRADE_DOT: Record<string, string> = {
  common: 'bg-zinc-400',
  uncommon: 'bg-emerald-400',
  rare: 'bg-sky-400',
  epic: 'bg-purple-400',
  legendary: 'bg-amber-400',
};

const GRADE_GLOW: Record<string, string> = {
  epic: 'shadow-[0_0_14px_rgba(168,85,247,0.22)]',
  legendary: 'shadow-[0_0_16px_rgba(251,191,36,0.28)]',
};

export function ItemCard({
  itemId, grade, tier, quantity, showCount = true, locked = false,
  index, size = 'cell', onClick, onLongPress, className,
}: ItemCardProps) {
  const pressTimer = useRef<number | null>(null);

  const item = getItem(itemId);
  if (!item) return null;

  const effectiveGrade = grade ?? item.grade ?? DEFAULT_GRADES[itemId];
  const tierValue = tier ?? item.tier;
  const showQty = showCount && item.stackable && (quantity ?? 0) > 1;

  const startPress = () => {
    if (!onLongPress) return;
    pressTimer.current = window.setTimeout(() => {
      onLongPress();
      if (navigator.vibrate) navigator.vibrate(25);
    }, 450);
  };
  const cancelPress = () => {
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
    pressTimer.current = null;
  };

  const delayStyle = index !== undefined
    ? { animationDelay: `${Math.min(index * 25, 300)}ms` }
    : undefined;

  return (
    <div
      style={delayStyle}
      onClick={onClick}
      onTouchStart={startPress}
      onTouchEnd={cancelPress}
      onTouchMove={cancelPress}
      onContextMenu={(e) => { if (onLongPress) { e.preventDefault(); onLongPress(); } }}
      className={cn(
        'card-in relative rounded-xl bg-white/[0.06] flex items-center justify-center',
        'transition-all duration-100 active:scale-95',
        onClick && 'cursor-pointer hover:bg-white/10',
        GRADE_GLOW[effectiveGrade ?? ''] ?? '',
        SIZE_CLASS[size],
        className
      )}
    >
      {/* Крупная иконка (как в ките — ~60% ячейки) */}
      <span className={cn('select-none leading-none', ICON_SIZE[size], locked && 'grayscale opacity-60')}>
        {item.icon}
      </span>

      {/* Грейд-точка */}
      {effectiveGrade && effectiveGrade !== 'common' && (
        <span
          className={cn(
            'absolute top-1.5 right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full',
            GRADE_DOT[effectiveGrade]
          )}
        />
      )}

      {/* Тир-бейдж — мягкий, не кричащий */}
      {tierValue && (
        <span className="absolute top-1 left-1 px-1 py-px rounded-md text-[8px] sm:text-[9px] font-mono font-bold leading-tight bg-white/10 text-zinc-300">
          T{tierValue}
        </span>
      )}

      {/* Количество — мелкое, приглушённое */}
      {showQty && (
        <span className="absolute bottom-1 right-1.5 text-[10px] font-medium text-zinc-400 tabular-nums">
          {quantity}
        </span>
      )}

      {/* Замок */}
      {locked && (
        <span className="absolute bottom-1 left-1.5 text-[10px] opacity-70">
          {UI_ICONS.locked}
        </span>
      )}
    </div>
  );
}

// ── Пустой слот «+» — тот же фон, что у ячеек (как в ките) ──
export function EmptySlot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full aspect-square rounded-xl bg-white/[0.06]',
        'flex items-center justify-center',
        className
      )}
    >
      <span className="text-xl text-zinc-500 select-none">+</span>
    </div>
  );
}
