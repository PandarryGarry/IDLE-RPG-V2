import React, { useEffect, useState } from 'react';
import { ActionProgressBar } from '@/components/ActionProgressBar';
import { TierBadge } from '@/components/TierBadge';
import { getTierBackground, getTierBorder } from '@/data/tiers';
import { UI_ICONS } from '@/lib/icons';
import { cn } from '@/lib/utils';

export interface CraftingInput {
  itemId: string;
  icon: string;
  name: string;
  quantity: number;
  sellValue: number;
}

export interface CraftingOutput {
  itemId: string;
  icon: string;
  name: string;
  tier?: number;
  quantity: number;
  sellValue: number;
  xp: number;
  extraInfo?: string;
}

export interface CraftingProcess {
  icon: string;
  label: string;
}

export interface CraftingPanelProps {
  isTraining: boolean;
  onStop: () => void;
  input: CraftingInput;
  output: CraftingOutput;
  process: CraftingProcess;
  actionInterval: number; // уже ГОТОВОЕ время партии (мс)
  actionName: string;
  progressColor?: 'red' | 'green' | 'blue' | 'yellow';
  selectedMultiplier: number;
  onMultiplierChange: (multiplier: number) => void;
  availableMultipliers: number[];
  stopLabel?: string;
}

export function CraftingPanel({
  isTraining,
  onStop,
  input,
  output,
  process,
  actionInterval,
  actionName,
  progressColor = 'red',
  selectedMultiplier,
  onMultiplierChange,
  availableMultipliers,
  stopLabel = 'Стоп',
}: CraftingPanelProps) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (!isTraining) return;
    const id = setInterval(() => setPulse(p => !p), 800);
    return () => clearInterval(id);
  }, [isTraining]);

  const totalIntervalMs = actionInterval; // время уже посчитано движком/страницей
  const formatTime = (ms: number) => {
    const total = Math.ceil(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    if (m > 0) return `${m}м ${s.toString().padStart(2, '0')}с`;
    return `${s}с`;
  };

  const totalProductValue = output.quantity * output.sellValue;

  if (!isTraining) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="text-center text-muted-foreground flex flex-col items-center gap-2 py-4">
          <div className="text-5xl opacity-40">{process.icon}</div>
          <p className="text-sm font-medium">Выберите сырьё для обработки</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-card border border-border rounded-2xl p-3 md:p-5 shadow-sm overflow-hidden">
      <div className="pointer-events-none absolute -top-10 left-1/3 w-64 h-32 bg-orange-500/10 blur-3xl rounded-full" />

      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm md:text-lg font-bold flex items-center gap-1.5 md:gap-2">
              <span className="text-base md:text-xl animate-pulse">{process.icon}</span>
              <span className="truncate">{actionName}</span>
            </h3>
            <p className="text-muted-foreground text-[11px] md:text-sm font-mono mt-0.5">
              {formatTime(totalIntervalMs)} на партию (×{selectedMultiplier})
            </p>
          </div>
          <button
            onClick={onStop}
            className="shrink-0 px-3 md:px-5 py-1.5 md:py-2.5 bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive hover:text-white font-bold rounded-lg md:rounded-xl transition-all text-xs md:text-sm"
          >
            {UI_ICONS.stop} {stopLabel}
          </button>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-1.5 md:gap-3 items-stretch">
          {/* СЫРЬЁ */}
          <div className="rounded-xl bg-background/40 border border-border p-2 md:p-3 space-y-1.5 md:space-y-2">
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Сырьё</p>

            <div className="relative flex flex-col items-center gap-1">
              <div className="absolute -top-1 -right-1 px-1 py-0.5 bg-background/90 border border-border rounded text-[9px] md:text-[10px] font-mono font-bold text-foreground">
                {input.quantity.toLocaleString()}
              </div>
              <div className="w-11 h-11 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-gradient-to-br from-amber-900/20 to-amber-700/10 border border-amber-500/30 flex items-center justify-center text-2xl md:text-4xl shadow-inner">
                {input.icon}
              </div>
              <p className="font-bold text-[11px] md:text-sm text-center leading-tight truncate w-full">{input.name}</p>
            </div>

            <div className="grid grid-cols-3 gap-1">
              {availableMultipliers.map(mult => (
                <button
                  key={mult}
                  onClick={() => onMultiplierChange(mult)}
                  className={cn(
                    'py-1 md:py-1.5 rounded-md md:rounded-lg text-[10px] md:text-[11px] font-mono font-bold transition-all border',
                    selectedMultiplier === mult
                      ? 'bg-primary/20 border-primary text-primary shadow-sm'
                      : 'bg-background/60 border-border text-muted-foreground hover:border-primary/40'
                  )}
                >
                  ×{mult}
                </button>
              ))}
            </div>

            <div className="space-y-0.5 pt-1 border-t border-border/50">
              <div className="flex items-center justify-between text-[10px] md:text-[11px]">
                <span className="text-muted-foreground">{UI_ICONS.inventory} В инвентаре</span>
                <span className="font-mono font-bold">{input.quantity.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* ПРОЦЕСС */}
          <div className="flex flex-col items-center justify-center gap-1 px-0.5 md:px-2">
            <div className="hidden md:block text-xl text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] animate-pulse">→</div>
            <div
              className={cn(
                'w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-gradient-to-br from-orange-900/40 via-red-700/30 to-yellow-600/20 border flex items-center justify-center text-2xl md:text-4xl transition-all',
                pulse
                  ? 'border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                  : 'border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.2)]'
              )}
            >
              {process.icon}
            </div>
            <p className="text-[8px] md:text-[9px] font-mono font-bold text-orange-300 uppercase tracking-wider text-center">
              {process.label}
            </p>
          </div>

          {/* ПРОДУКТ */}
          <div
            className={cn(
              'rounded-xl bg-background/40 border p-2 md:p-3 space-y-1.5 md:space-y-2',
              output.tier ? getTierBorder(output.tier) : 'border-border'
            )}
          >
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Продукт</p>

            <div className="relative flex flex-col items-center gap-1">
              {output.tier && (
                <div className="absolute -top-1 -right-1">
                  <TierBadge tier={output.tier} size="sm" />
                </div>
              )}
              <div
                className={cn(
                  'w-11 h-11 md:w-16 md:h-16 rounded-lg md:rounded-xl border flex items-center justify-center text-2xl md:text-4xl shadow-inner',
                  output.tier
                    ? `${getTierBackground(output.tier)} ${getTierBorder(output.tier)}`
                    : 'bg-gradient-to-br from-slate-900/40 to-slate-700/20 border-slate-500/30'
                )}
              >
                {output.icon}
              </div>
              <p className="font-bold text-[11px] md:text-sm text-center leading-tight truncate w-full">{output.name}</p>
            </div>

            <div className="space-y-0.5 pt-1 border-t border-border/50">
              <div className="flex items-center justify-between text-[10px] md:text-[11px]">
                <span className="text-muted-foreground">В инвентаре</span>
                <span className="font-mono font-bold">{output.quantity.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] md:text-[11px]">
                <span className="text-muted-foreground">Цена</span>
                <span className="font-mono font-bold text-yellow-400">{output.sellValue} GP</span>
              </div>
              <div className="flex items-center justify-between text-[10px] md:text-[11px]">
                <span className="text-muted-foreground">Всего</span>
                <span className="font-mono font-bold text-yellow-400">{totalProductValue.toLocaleString()} GP</span>
              </div>
              <div className="flex items-center justify-between text-[10px] md:text-[11px]">
                <span className="text-muted-foreground">Опыт</span>
                <span className="font-mono font-bold text-primary">{output.xp} XP</span>
              </div>
              {output.extraInfo && (
                <div className="flex items-center justify-between text-[10px] md:text-[11px]">
                  <span className="text-muted-foreground">Свойство</span>
                  <span className="font-mono font-bold text-orange-400">{output.extraInfo}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <ActionProgressBar height="h-3" color={progressColor} />
      </div>
    </div>
  );
}
