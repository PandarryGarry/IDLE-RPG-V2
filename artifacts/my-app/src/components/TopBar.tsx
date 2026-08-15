import React from 'react';
import { Link } from 'wouter';
import { Pause, Play, Timer, UserCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { usePlayerStore } from '@/store/playerStore';
import { useBankStore } from '@/store/bankStore';
import { useGameStore } from '@/store/gameStore';
import { useUIStore } from '@/store/uiStore';
import { cn, formatDuration } from '@/lib/utils';
import { getSkillIcon, UI_ICONS } from '@/lib/icons';

// ═══════════════════════════════════════════════════════════════
// ХЕЛПЕР: цвет заполнения инвентаря
// ═══════════════════════════════════════════════════════════════

function getSlotFillState(used: number, max: number): {
  color: string;
  pulse: boolean;
  ring: string;
} {
  const ratio = max > 0 ? used / max : 0;
  if (ratio >= 0.9) {
    return { color: 'text-red-400', pulse: true, ring: 'hover:ring-red-500/40' };
  }
  if (ratio >= 0.7) {
    return { color: 'text-yellow-400', pulse: false, ring: 'hover:ring-yellow-500/30' };
  }
  return { color: 'text-emerald-400', pulse: false, ring: 'hover:ring-emerald-500/30' };
}

export function TopBar() {
  const { t } = useTranslation();
  const gp = useBankStore(s => s.gp);
  const maxSlots = useBankStore(s => s.maxSlots);
  const usedSlots = useBankStore(s => s.getUsedSlots());
  const activeSkill = useGameStore(s => s.activeSkill);
  const actionProgress = useGameStore(s => s.actionProgress);
  const isRunning = useGameStore(s => s.isRunning);
  const isPaused = useGameStore(s => s.isPaused);
  const pauseGame = useGameStore(s => s.pauseGame);
  const resumeGame = useGameStore(s => s.resumeGame);
  const totalPlayTime = useGameStore(s => s.totalPlayTime);
  const toggleSideMenu = useUIStore(s => s.toggleSideMenu);

  const skillLevel = usePlayerStore(s => activeSkill ? s.skills[activeSkill]?.level ?? 1 : null);
  const slotFill = getSlotFillState(usedSlots, maxSlots);

  return (
    <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center h-12 gap-1.5 sm:gap-3">

          {/* ── Бургер (мобильные) ── */}
          <button
            onClick={toggleSideMenu}
            className="md:hidden shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-background/50 border border-border hover:bg-background transition-colors"
            aria-label="Открыть меню"
          >
            <span className="text-xl">{UI_ICONS.menu}</span>
          </button>

          {/* ── GP → банк ── */}
          <Link href="/bank" className="shrink-0 block">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-background/60 transition-all ring-0 hover:ring-2 hover:ring-amber-500/30">
              <span className="text-lg">{UI_ICONS.gold}</span>
              <span className="font-mono text-sm font-bold text-amber-400">
                {gp.toLocaleString()}
              </span>
              <span className="text-[10px] text-muted-foreground hidden lg:inline uppercase font-bold tracking-wider">
                GP
              </span>
            </div>
          </Link>

          {/* ── Слоты → инвентарь ── */}
          <Link href="/inventory" className="shrink-0 block">
            <div
              className={cn(
                'flex items-center gap-1.5 px-2 py-1 rounded-md transition-all hover:bg-background/60 ring-0 hover:ring-2',
                slotFill.ring,
                slotFill.pulse && 'animate-pulse'
              )}
            >
              <span className={cn('text-lg', slotFill.color)}>{UI_ICONS.inventory}</span>
              <span className={cn('font-mono text-sm font-bold', slotFill.color)}>
                {usedSlots}/{maxSlots}
              </span>
            </div>
          </Link>

          {/* ── ПРАВАЯ ЧАСТЬ: навык + пауза + персонаж + таймер ── */}
          <div className="flex-1 min-w-0 flex items-center justify-end gap-1.5 sm:gap-2">

            {/* Активный навык */}
            {activeSkill && isRunning && (
              <Link href={`/${activeSkill}`} className="block flex-1 min-w-0 max-w-[280px]">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 py-1 rounded-md hover:bg-background/60 transition-colors min-w-0">
                  <span className={cn('shrink-0 text-lg', !isPaused && 'drop-shadow-[0_0_4px_rgba(34,211,238,0.6)]')}>
                    {getSkillIcon(activeSkill)}
                  </span>

                  <span className="hidden sm:inline text-sm font-bold text-foreground truncate">
                    {t(`skill.${activeSkill}`)}
                  </span>

                  {skillLevel && (
                    <span className="hidden md:inline shrink-0 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/40">
                      {skillLevel}
                    </span>
                  )}

                  {/* Прогресс-бар (янтарный при паузе) */}
                  <div className="flex-1 min-w-[36px] h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full transition-all duration-100',
                        isPaused
                          ? 'bg-amber-500'
                          : 'bg-primary shadow-[0_0_6px_rgba(34,211,238,0.6)]'
                      )}
                      style={{ width: `${actionProgress * 100}%` }}
                    />
                  </div>
                </div>
              </Link>
            )}

            {/* ── Кнопка паузы (пункт 5) ── */}
            {activeSkill && isRunning && (
              <button
                onClick={isPaused ? resumeGame : pauseGame}
                className={cn(
                  'shrink-0 flex items-center justify-center w-8 h-8 rounded-lg border transition-all',
                  isPaused
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25'
                    : 'bg-background/50 border-border text-muted-foreground hover:bg-background hover:text-foreground'
                )}
                aria-label={isPaused ? 'Продолжить' : 'Пауза'}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            )}

            {/* ── Персонаж (пункт 4, md+) ── */}
            <Link href="/character" className="hidden md:block shrink-0">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-background/60 transition-all ring-0 hover:ring-2 hover:ring-violet-500/30">
                <UserCircle className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-bold text-foreground">
                  {t('auth.guest')}
                </span>
              </div>
            </Link>

            {/* ── Таймер сессии (пункт 6, lg+) ── */}
            <div
              className="hidden lg:flex shrink-0 items-center gap-1.5 px-2 py-1 text-muted-foreground"
              title={t('dashboard.playTime')}
            >
              <Timer className="w-4 h-4" />
              <span className="font-mono text-xs font-bold">
                {formatDuration(totalPlayTime)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
