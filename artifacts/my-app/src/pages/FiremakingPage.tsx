import React, { useState } from 'react';
import { SkillHeader } from '@/components/SkillHeader';
import { CraftingPanel } from '@/components/skills/CraftingPanel';
import type { CraftingInput, CraftingOutput, CraftingProcess } from '@/components/skills/CraftingPanel';
import { TierBadge } from '@/components/TierBadge';
import { FIREMAKING_LOGS, FIREMAKING_MAP, getCharcoalStats, getBatchTime } from '@/data/firemaking';
import { useGameStore } from '@/store/gameStore';
import { useBankStore } from '@/store/bankStore';
import { usePlayerStore } from '@/store/playerStore';
import { getItem } from '@/data/items';
import { useTranslation } from '@/hooks/useTranslation';
import { getSkillIcon, getItemIcon, UI_ICONS } from '@/lib/icons';
import { getTierBackground, getTierBorder } from '@/data/tiers';
import { cn } from '@/lib/utils';

export function FiremakingPage() {
  const { t } = useTranslation();

  const startSkillAction = useGameStore(s => s.startSkillAction);
  const setMultiplier = useGameStore(s => s.setMultiplier);
  const stopAction = useGameStore(s => s.stopAction);
  const activeSkill = useGameStore(s => s.activeSkill);
  const activeActionId = useGameStore(s => s.activeActionId);
  const bankItems = useBankStore(s => s.items);
  const playerLevel = usePlayerStore(s => s.skills.firemaking?.level ?? 1);

  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(1);

  const activeLog = activeActionId ? FIREMAKING_MAP[activeActionId] : undefined;
  const isTraining = activeSkill === 'firemaking' && !!activeLog;

  const getLogQty = (logId: string): number =>
    bankItems.find(s => s.itemId === logId)?.quantity ?? 0;

  const getCharcoalQty = (tier: number): number =>
    bankItems.find(s => s.itemId === 'charcoal' && s.tier === tier)?.quantity ?? 0;

  const handleActionClick = (actionId: string, locked: boolean) => {
    if (locked) return;
    if (activeSkill === 'firemaking' && activeActionId === actionId) {
      stopAction();
    } else {
      startSkillAction('firemaking', actionId, selectedMultiplier);
    }
  };

  const handleMultiplierChange = (mult: number) => {
    setSelectedMultiplier(mult);
    if (isTraining) setMultiplier(mult);
  };

  const input: CraftingInput | null = activeLog
    ? {
        itemId: activeLog.logId,
        icon: getItemIcon(activeLog.logId),
        name: getItem(activeLog.logId)?.name ?? activeLog.name,
        quantity: getLogQty(activeLog.logId),
        sellValue: getItem(activeLog.logId)?.sellValue ?? 0,
      }
    : null;

  const charcoalStats = activeLog?.charcoalTier ? getCharcoalStats(activeLog.charcoalTier) : null;

  const output: CraftingOutput | null =
    activeLog && charcoalStats
      ? {
          itemId: 'charcoal',
          icon: getItemIcon('charcoal'),
          name: getItem('charcoal')?.name ?? 'Charcoal',
          tier: activeLog.charcoalTier,
          quantity: getCharcoalQty(activeLog.charcoalTier ?? 1),
          sellValue: charcoalStats.sellValue,
          xp: activeLog.xp,
          extraInfo: `${charcoalStats.heatDuration}с жара`,
        }
      : null;

  const process: CraftingProcess = {
    icon: getSkillIcon('firemaking'),
    label: 'Обжиг',
  };

  return (
    <div className="space-y-4">
      <SkillHeader
        skillId="firemaking"
        skillName={t('skill.firemaking')}
        skillIcon={getSkillIcon('firemaking')}
      />

      {input && output ? (
        <CraftingPanel
          isTraining={isTraining}
          onStop={stopAction}
          input={input}
          output={output}
          process={process}
          actionInterval={getBatchTime(activeLog?.interval ?? 10000, selectedMultiplier)}
          actionName={activeLog?.name ?? ''}
          progressColor="red"
          selectedMultiplier={selectedMultiplier}
          onMultiplierChange={handleMultiplierChange}
          availableMultipliers={[1, 10, 100]}
          stopLabel="Стоп"
        />
      ) : (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="text-center text-muted-foreground flex flex-col items-center gap-2 py-4">
            <div className="text-5xl opacity-40">{getSkillIcon('firemaking')}</div>
            <p className="text-sm font-medium">{t('firemaking.selectLog')}</p>
          </div>
        </div>
      )}

      <h2 className="text-base font-black uppercase tracking-widest text-muted-foreground px-1">
        {t('firemaking.availableLogs')}
      </h2>

      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {FIREMAKING_LOGS.map(log => {
          const isActive = isTraining && activeActionId === log.id;
          const locked = playerLevel < log.levelRequired;
          const logQty = getLogQty(log.logId);
          const hasEnough = logQty >= 1;

          return (
            <div
              key={log.id}
              className={cn(
                'rounded-xl border p-2.5 md:p-4 transition-all flex flex-col',
                isActive
                  ? 'bg-gradient-to-b from-primary/20 to-primary/5 border-primary shadow-[0_0_14px_rgba(34,197,94,0.25)]'
                  : locked
                    ? 'bg-background/40 border-border opacity-60'
                    : 'bg-background/40 border-border hover:border-primary/40'
              )}
            >
              <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                {/* Иконка с цветом тира + ярлык T */}
                <div className="relative shrink-0">
                  <div
                    className={cn(
                      'w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl border flex items-center justify-center text-xl md:text-3xl shadow-inner',
                      getTierBackground(log.charcoalTier),
                      getTierBorder(log.charcoalTier),
                      locked && 'grayscale opacity-70'
                    )}
                  >
                    {getItemIcon(log.logId)}
                  </div>
                  <div className="absolute -top-1.5 -right-1.5">
                    <TierBadge tier={log.charcoalTier} size="sm" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className={cn('font-bold text-xs md:text-sm leading-tight truncate', isActive && 'text-primary')}>
                    {log.name}
                  </p>
                  <p className="text-[10px] md:text-[11px] font-mono mt-0.5">
                    <span className="text-primary font-bold">{log.xp} XP</span>
                    <span className="text-muted-foreground"> · {(log.interval / 1000).toFixed(0)}с</span>
                  </p>
                </div>
                <div
                  className={cn(
                    'shrink-0 px-1.5 py-0.5 rounded-md text-[9px] md:text-[10px] font-mono font-bold',
                    locked ? 'bg-red-500/15 text-red-400' : 'bg-muted text-muted-foreground'
                  )}
                >
                  {locked ? `${UI_ICONS.locked} ` : ''}Lv.{log.levelRequired}
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] md:text-[11px] mb-1.5 md:mb-3 pb-1.5 md:pb-2 border-b border-border/50 mt-auto">
                <span className="text-muted-foreground">{UI_ICONS.inventory} В инвентаре</span>
                <span className={cn('font-mono font-bold', hasEnough ? 'text-foreground' : 'text-destructive')}>
                  {logQty.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => handleActionClick(log.id, locked)}
                disabled={locked}
                className={cn(
                  'w-full py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all border',
                  locked
                    ? 'bg-muted/30 border-border text-muted-foreground cursor-not-allowed'
                    : isActive
                      ? 'bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive hover:text-white'
                      : 'bg-primary/10 border-primary/30 text-primary hover:bg-primary hover:text-white'
                )}
              >
                {locked
                  ? `${UI_ICONS.locked} Lv.${log.levelRequired}`
                  : isActive
                    ? `${UI_ICONS.stop} Отменить`
                    : `${UI_ICONS.start} Выбрать`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
