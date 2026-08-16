import React from 'react';
import { Link, useLocation } from 'wouter';
import { Pause, Play, Timer, Store } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { usePlayerStore } from '@/store/playerStore';
import { useInventoryStore } from '@/store/inventoryStore';
import { useGameStore } from '@/store/gameStore';
import { useUIStore } from '@/store/uiStore';
import { cn, formatDuration } from '@/lib/utils';
import { getSkillIcon, UI_ICONS, COMBAT_ICONS } from '@/lib/icons';

// ── ХЕЛПЕР: цвет заполнения инвентаря ──
function getSlotFillState(used: number, max: number): { color: string; pulse: boolean } {
  const ratio = max > 0 ? used / max : 0;
  if (ratio >= 0.9) return { color: 'text-red-400', pulse: true };
  if (ratio >= 0.7) return { color: 'text-yellow-400', pulse: false };
  return { color: 'text-emerald-400', pulse: false };
}

export function TopBar() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const onInventory = location.startsWith('/inventory');

  const gp = useInventoryStore(s => s.gp);
  const maxSlots = useInventoryStore(s => s.maxSlots);
  const usedSlots = useInventoryStore(s => s.getUsedSlots());
  const combatLevel = usePlayerStore(s => s.combatLevel);
  const activeSkill = useGameStore(s => s.activeSkill);
  const actionProgress = useGameStore(s => s.actionProgress);
  const isRunning = useGameStore(s => s.isRunning);
  const isPaused = useGameStore(s => s.isPaused);
  const pauseGame = useGameStore(s => s.pauseGame);
  const resumeGame = useGameStore(s => s.resumeGame);
  const totalPlayTime = useGameStore(s => s.totalPlayTime);
  const toggleSideMenu = useUIStore(s => s.toggleSideMenu);

  const slotFill = getSlotFillState(usedSlots, maxSlots);

  return (
    <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-white/5">
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center h-14 gap-2 sm:gap-3">

          {/* ── Бургер (мобильные) ── */}
          <button
            onClick={toggleSideMenu}
            className="md:hidden shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Открыть меню"
          >
            <span className="text-lg">{UI_ICONS.menu}</span>
          </button>

          {/* ── Аватар + имя + Lv (как в ките) ── */}
          <Link href="/character" className="shrink-0 flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-lg">
              {COMBAT_ICONS.player}
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="text-xs font-black text-foreground truncate leading-tight">
                {t('auth.guest')}
              </p>
              <p className="text-[10px] text-muted-foreground font-mono font-bold leading-tight">
                Lv.{combatLevel}
              </p>
            </div>
          </Link>

          {/* ── Активный навык + прогресс + пауза ── */}
          {activeSkill && isRunning && (
            <div className="flex-1 min-w-0 max-w-[280px] flex items-center gap-1.5 sm:gap-2">
              <Link href={`/${activeSkill}`} className="flex-1 min-w-0 flex items-center gap-1.5 sm:gap-2 px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">
                <span className={cn('shrink-0 text-lg', !isPaused && 'drop-shadow-[0_0_4px_rgba(99,102,241,0.6)]')}>
                  {getSkillIcon(activeSkill)}
                </span>
                <span className="hidden sm:inline text-xs font-bold text-foreground truncate">
                  {t(`skill.${activeSkill}`)}
                </span>
                <div className="flex-1 min-w-[36px] h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full transition-all duration-100 rounded-full',
                      isPaused
                        ? 'bg-amber-500'
                        : 'bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.6)]'
                    )}
                    style={{ width: `${actionProgress * 100}%` }}
                  />
                </div>
              </Link>
              <button
                onClick={isPaused ? resumeGame : pauseGame}
                className={cn(
                  'shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all',
                  isPaused
                    ? 'bg-amber-500/15 text-amber-400 hover:bg-amber-500/25'
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
                )}
                aria-label={isPaused ? 'Продолжить' : 'Пауза'}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* ── ПРАВАЯ ЧАСТЬ: чипы валют + таймер + магазин ── */}
          <div className="flex-1 flex items-center justify-end gap-1.5 sm:gap-2">

            {/* GP чип */}
            <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5">
              <span className="text-sm">{UI_ICONS.gold}</span>
              <span className="font-mono text-xs font-bold text-amber-400 tabular-nums">
                {gp.toLocaleString()}
              </span>
            </div>

            {/* Слоты чип — СКРЫТ на /inventory */}
            {!onInventory && (
              <Link href="/inventory" className="shrink-0 block">
                <div
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors',
                    slotFill.pulse && 'animate-pulse'
                  )}
                >
                  <span className={cn('text-sm', slotFill.color)}>{UI_ICONS.inventory}</span>
                  <span className={cn('font-mono text-xs font-bold tabular-nums', slotFill.color)}>
                    {usedSlots}/{maxSlots}
                  </span>
                </div>
              </Link>
            )}

            {/* Таймер сессии (lg+) */}
            <div
              className="hidden lg:flex shrink-0 items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 text-muted-foreground"
              title={t('dashboard.playTime')}
            >
              <Timer className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] font-bold tabular-nums">
                {formatDuration(totalPlayTime)}
              </span>
            </div>

            {/* Магазин (быстрый доступ) */}
            <Link href="/shop" className="shrink-0 block">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors">
                <Store className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
