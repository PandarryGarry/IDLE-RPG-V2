import React from 'react';
import { getItem } from '@/data/items';
import { formatNumber } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { ItemCard } from '@/components/ItemCard';
import { useInventoryStore } from '@/store/inventoryStore';
import { usePlayerStore } from '@/store/playerStore';
import { getEffectiveEquipmentStats } from '@/data/economy';
import { Lock, Unlock } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ItemInfoPopoverProps {
  itemId: string;
  quantity?: number;
  /** Грейд экземпляра (если есть) — для корректных статов */
  grade?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

const STAT_LABELS: Record<string, string> = {
  attackBonus: 'Атака',
  strengthBonus: 'Сила',
  defenceBonus: 'Защита',
  rangedAttackBonus: 'Дальняя атака',
  rangedStrengthBonus: 'Дальняя сила',
  magicAttackBonus: 'Маг. атака',
  magicDamageBonus: 'Маг. урон',
  prayerBonus: 'Молитва',
  attackSpeed: 'Скор. атаки',
  agility: 'Ловкость',
};

export function ItemInfoPopover({
  itemId,
  quantity,
  grade,
  children,
  actions,
}: ItemInfoPopoverProps) {
  const { t } = useTranslation();
  const item = getItem(itemId);

  const slot = useInventoryStore(s => s.getSlot(itemId, undefined, grade as any));
  const lockItem = useInventoryStore(s => s.lockItem);
  const isLocked = slot?.locked ?? false;

  const equipment = usePlayerStore(s => s.equipment);

  if (!item) return children ?? null;

  // ── Статы: читаем из baseStats с учётом грейда ──
  const effectiveStats = item.equipSlot || item.category === 'weapon'
    ? getEffectiveEquipmentStats({ ...item, grade: grade as any } as any)
    : null;

  const stats = effectiveStats
    ? Object.entries(effectiveStats).filter(([, v]) => v !== undefined && v !== 0)
    : [];

  const comparison = getEquipmentComparison(item, grade, equipment);

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children ?? (
          <button type="button" aria-label={item.name} className="rounded-lg active:scale-95 transition-transform">
            <ItemCard itemId={itemId} quantity={quantity} grade={grade} size="md" />
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={8}
        className="w-72 max-w-[calc(100vw-1.5rem)] border-white/10 bg-popover/95 p-3 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-start gap-2.5">
          <ItemCard itemId={itemId} grade={grade} size="md" />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-black text-foreground">{item.name}</h3>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {t('inventory.type')}: {item.category.replace('_', ' ')}
            </p>
            {item.tier && (
              <p className="text-[10px] font-mono text-zinc-300 mt-0.5">Tier {item.tier}</p>
            )}
            {grade && (
              <p className="text-[10px] font-mono text-foreground mt-0.5 capitalize">{grade}</p>
            )}
          </div>
          {isLocked && <Lock className="w-4 h-4 text-amber-400 shrink-0" />}
        </div>

        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {item.description ?? t('inventory.noDescription')}
        </p>

        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-border/60 pt-2 text-xs">
          <dt className="text-muted-foreground">{t('inventory.sellsFor')}</dt>
          <dd className="text-right font-mono font-bold text-amber-400">
            {formatNumber(item.sellValue)} GP
          </dd>
          {item.healAmount !== undefined && (
            <>
              <dt className="text-muted-foreground">{t('inventory.heals')}</dt>
              <dd className="text-right font-mono font-bold text-emerald-400">+{item.healAmount} HP</dd>
            </>
          )}
          {item.equipSlot && (
            <>
              <dt className="text-muted-foreground">{t('inventory.equipSlot')}</dt>
              <dd className="text-right font-mono text-sky-400">{item.equipSlot}</dd>
            </>
          )}
        </dl>

        {stats.length > 0 && (
          <div className="mt-3 border-t border-border/60 pt-2">
            <div className="mb-1 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              {t('inventory.stats')}
            </div>
            <div className="space-y-1 text-xs">
              {stats.map(([stat, value]) => (
                <div key={stat} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">{STAT_LABELS[stat] ?? stat}</span>
                  <span className={Number(value) > 0 ? 'font-mono text-primary' : 'font-mono text-destructive'}>
                    {Number(value) > 0 ? '+' : ''}{value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {comparison && (
          <div className="mt-3 border-t border-border/60 pt-2">
            <div className="mb-1 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              {t('inventory.vsCurrent') ?? 'vs Current'}
            </div>
            <div className="space-y-1 text-xs">
              {comparison.map(([stat, diff]) => (
                <div key={stat} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">{STAT_LABELS[stat] ?? stat}</span>
                  <span className={diff > 0 ? 'font-mono text-emerald-400' : diff < 0 ? 'font-mono text-destructive' : 'font-mono text-muted-foreground'}>
                    {diff > 0 ? '+' : ''}{diff}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => lockItem(itemId, slot?.tier, grade as any, !isLocked)}
          className={`mt-3 w-full flex items-center justify-center gap-2 px-3 py-2.5 min-h-[44px] rounded-lg text-xs font-bold transition-colors active:scale-95 ${
            isLocked
              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25'
              : 'bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
          }`}
        >
          {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          {isLocked ? (t('inventory.unlock') ?? 'Unlock') : (t('inventory.lock') ?? 'Lock')}
        </button>

        {actions && <div className="mt-2 border-t border-border/60 pt-2">{actions}</div>}
      </PopoverContent>
    </Popover>
  );
}

/**
 * Сравнение статов предмета с текущей экипировкой.
 * Учитывает грейд обоих предметов через getEffectiveEquipmentStats.
 */
function getEquipmentComparison(
  item: NonNullable<ReturnType<typeof getItem>>,
  grade: string | undefined,
  equipment: Record<string, string | null>,
): [string, number][] | null {
  if (!item.equipSlot || item.category !== 'weapon' && !item.equipSlot) return null;
  if (!item.baseStats) return null;

  const currentItemId = equipment[item.equipSlot];
  if (!currentItemId) return null;

  const currentItem = getItem(currentItemId);
  if (!currentItem?.baseStats) return null;

  const newStats = getEffectiveEquipmentStats({ ...item, grade: grade as any } as any);
  const oldStats = getEffectiveEquipmentStats(currentItem);

  const comparison: [string, number][] = [];
  const allStats = new Set([...Object.keys(newStats), ...Object.keys(oldStats)]);

  for (const stat of allStats) {
    const newVal = (newStats as any)[stat] ?? 0;
    const oldVal = (oldStats as any)[stat] ?? 0;
    const diff = newVal - oldVal;
    if (diff !== 0) comparison.push([stat, diff]);
  }

  return comparison.length > 0 ? comparison : null;
}
