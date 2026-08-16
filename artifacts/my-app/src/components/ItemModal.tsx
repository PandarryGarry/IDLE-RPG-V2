// ═══════════════════════════════════════════════════════════════
// ITEM MODAL v5 — закрытие после продажи экипировки + toast
// Экипировка → закрываем всегда + уведомление.
// Ресурсы → закрываем если всё продано.
// ═══════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { getItem } from '@/data/items';
import { DEFAULT_GRADES } from '@/data/items/grades';
import { getEffectiveEquipmentStats } from '@/data/economy';
import { useInventoryStore } from '@/store/inventoryStore';
import { useNotificationsStore } from '@/store/notificationsStore';
import { getSkillIcon, UI_ICONS } from '@/lib/icons';
import { formatNumber, cn } from '@/lib/utils';
import { X, Lock, Unlock, Minus, Plus } from 'lucide-react';

interface ItemModalProps {
  itemId: string;
  tier?: number;
  grade?: string;
  open: boolean;
  onClose: () => void;
}

const GRADE_PILL: Record<string, string> = {
  common: 'bg-slate-500/15 text-slate-300',
  uncommon: 'bg-emerald-500/15 text-emerald-300',
  rare: 'bg-sky-500/15 text-sky-300',
  epic: 'bg-purple-500/15 text-purple-300',
  legendary: 'bg-amber-500/15 text-amber-300',
};

const GRADE_RING: Record<string, string> = {
  uncommon: 'ring-1 ring-emerald-400/40',
  rare: 'ring-1 ring-sky-400/50',
  epic: 'ring-1 ring-purple-400/50',
  legendary: 'ring-1 ring-amber-400/60',
};

export function ItemModal({ itemId, tier, grade, open, onClose }: ItemModalProps) {
  const [sellQty, setSellQty] = useState(1);

  const item = getItem(itemId);
  const slot = useInventoryStore(s => s.getSlot(itemId, tier, grade as any));
  const sellItem = useInventoryStore(s => s.sellItem);
  const lockItem = useInventoryStore(s => s.lockItem);
  const equipFromInventory = useInventoryStore(s => s.equipFromInventory);
  const notifyItem = useNotificationsStore(s => s.notifyItem);

  if (!open || !item) return null;

  const effectiveGrade = grade ?? item.grade ?? DEFAULT_GRADES[itemId];
  const tierValue = tier ?? item.tier;
  const quantity = slot?.quantity ?? 0;
  const locked = slot?.locked ?? false;

  const qty = Math.max(1, Math.min(sellQty, Math.max(1, quantity)));

  // ── Статы кружками ──
  const circles: { icon: string; bg: string; label: string; value: string }[] = [];

  if (item.equipSlot || item.category === 'weapon') {
    const stats = getEffectiveEquipmentStats({ ...item, grade: effectiveGrade } as any) as Record<string, number>;
    if (stats?.attackBonus) circles.push({ icon: getSkillIcon('attack'), bg: 'bg-red-500', label: 'Attack', value: `+${stats.attackBonus}` });
    if (stats?.strengthBonus) circles.push({ icon: getSkillIcon('strength'), bg: 'bg-emerald-500', label: 'Strength', value: `+${stats.strengthBonus}` });
    if (stats?.defenceBonus) circles.push({ icon: getSkillIcon('defence'), bg: 'bg-amber-500', label: 'Defence', value: `+${stats.defenceBonus}` });
  } else {
    circles.push({ icon: UI_ICONS.gold, bg: 'bg-amber-500', label: 'Value', value: formatNumber(item.sellValue) });
    if (item.healAmount) {
      circles.push({ icon: getSkillIcon('hitpoints'), bg: 'bg-emerald-500', label: 'Heals', value: `+${item.healAmount} HP` });
    }
  }

  const handleEquip = () => {
    equipFromInventory(itemId, tier, grade as any);
    onClose();
  };

  const handleSell = (amount: number) => {
    const gpGained = sellItem(itemId, amount, tier, grade as any);

    // Toast: что продали
    if (gpGained > 0) {
      notifyItem(item.name, amount, item.icon);
    }

    // Экипировка — закрываем всегда (даже если остались другие экземпляры)
    // Ресурсы — закрываем если всё продано, иначе сбрасываем селектор
    if (item.equipSlot) {
      onClose();
      return;
    }

    const left = useInventoryStore.getState().getItemQty(itemId, tier, grade as any);
    if (left <= 0) {
      onClose();
    } else {
      setSellQty(1);
    }
  };

  const canSell = item.canSell && !locked && quantity > 0;
  const canEquip = !!item.equipSlot && !locked;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-[fade-in_0.2s_ease] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'w-full max-w-[320px] bg-card border border-white/10 rounded-2xl shadow-2xl',
          'p-3.5 md:p-4 animate-[modal-pop_0.2s_ease] max-h-[80vh] overflow-y-auto'
        )}
      >
        {/* ── Шапка: заголовок + тир | lock + close ── */}
        <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-black text-foreground">
              {item.equipSlot ? 'Equipment' : 'Item'}
            </h2>
            {tierValue && (
              <span className="px-1.5 py-0.5 rounded-md bg-white/10 text-zinc-300 text-[9px] font-mono font-bold leading-none">
                T{tierValue}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => lockItem(itemId, tier, grade as any, !locked)}
              aria-label={locked ? 'Unlock' : 'Lock'}
              className={cn(
                'w-7 h-7 flex items-center justify-center rounded-md transition-all active:scale-95',
                locked
                  ? 'text-amber-400 bg-amber-500/15'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
              )}
            >
              {locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/10 active:scale-95 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Предмет: иконка + pills/имя/описание ── */}
        <div className="flex gap-3 pt-3">
          <div
            className={cn(
              'relative w-16 h-16 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-3xl',
              GRADE_RING[effectiveGrade ?? ''] ?? ''
            )}
          >
            {item.icon}
            {quantity > 1 && (
              <span className="absolute bottom-0.5 right-1 text-[9px] font-semibold text-zinc-400 tabular-nums">
                ×{quantity}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 flex-wrap">
              {effectiveGrade && (
                <span className={cn('px-1.5 py-0.5 rounded-md text-[9px] font-bold capitalize', GRADE_PILL[effectiveGrade] ?? GRADE_PILL.common)}>
                  {effectiveGrade}
                </span>
              )}
              <span className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-semibold text-muted-foreground capitalize">
                {item.category.replace('_', ' ')}
              </span>
            </div>
            <h3 className="mt-1 text-[13px] font-black text-foreground truncate">{item.name}</h3>
            <p className="pt-0.5 text-[10px] leading-relaxed text-muted-foreground">
              {item.description ?? 'No description.'}
            </p>
          </div>
        </div>

        {/* ── Статы кружками ── */}
        {circles.length > 0 && (
          <div className="flex gap-3.5 pt-3 flex-wrap">
            {circles.map((c) => (
              <div key={c.label} className="flex items-center gap-1.5">
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0', c.bg)}>
                  {c.icon}
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground font-semibold">{c.label}</p>
                  <p className="text-[11px] font-black text-foreground tabular-nums">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {locked && (
          <p className="pt-2.5 text-[10px] text-amber-400 font-bold text-center">
            {UI_ICONS.locked} Locked — cannot sell
          </p>
        )}

        {/* ── Действия ── */}
        {(canSell || canEquip) && (
          <div className="pt-3 mt-1 border-t border-white/10 space-y-1.5">
            {canSell && (
              <>
                <div className="flex items-center bg-white/5 rounded-lg">
                  <button
                    onClick={() => setSellQty(q => Math.max(1, q - 1))}
                    aria-label="Less"
                    className="w-9 h-9 flex items-center justify-center rounded-l-lg text-muted-foreground hover:text-foreground hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="flex-1 text-center text-[11px] font-black text-foreground tabular-nums">{qty}</span>
                  <button
                    onClick={() => setSellQty(q => Math.min(quantity, q + 1))}
                    aria-label="More"
                    className="w-9 h-9 flex items-center justify-center rounded-r-lg text-muted-foreground hover:text-foreground hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => handleSell(qty)}
                    className="min-h-[34px] rounded-lg text-[11px] font-bold text-amber-300
                      bg-gradient-to-b from-[#3d434c] to-[#31363e] hover:brightness-110 active:scale-95 transition-all"
                  >
                    Sell
                  </button>
                  <button
                    onClick={() => handleSell(quantity)}
                    className="min-h-[34px] rounded-lg text-[11px] font-bold text-amber-300
                      bg-gradient-to-b from-[#3d434c] to-[#31363e] hover:brightness-110 active:scale-95 transition-all"
                  >
                    Sell all
                  </button>
                </div>
              </>
            )}

            {canEquip && (
              <button
                onClick={handleEquip}
                className="w-full min-h-[40px] rounded-lg text-xs font-bold text-white
                  bg-gradient-to-b from-indigo-500 to-indigo-600 hover:brightness-110 active:scale-95 transition-all shadow-sm shadow-indigo-500/20"
              >
                Equip
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
