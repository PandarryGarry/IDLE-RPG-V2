import React, { useState } from 'react';
import { usePlayerStore } from '@/store/playerStore';
import { useTranslation } from '@/hooks/useTranslation';
import { ItemCard } from '@/components/ItemCard';
import { ItemModal } from '@/components/ItemModal';
import { SkillCircle } from '@/components/SkillCircle';
import { getSkillIcon, COMBAT_ICONS } from '@/lib/icons';
import { XP_TABLE, MAX_LEVEL } from '@/gameEngine/xpTable';
import { cn } from '@/lib/utils';
import type { SkillId, EquipSlot } from '@/data/types';

// ═══ Анатомический paper doll ═══
const LEFT_COL: EquipSlot[] = ['weapon', 'shield', 'gloves', 'quiver'];
const RIGHT_COL: EquipSlot[] = ['helm', 'platebody', 'platelegs', 'boots'];
const BOTTOM_ROW: EquipSlot[] = ['amulet', 'ring', 'cape', 'passive'];

const COMBAT_STATS: { skill: SkillId; label: string }[] = [
  { skill: 'attack', label: 'Attack' },
  { skill: 'strength', label: 'Strength' },
  { skill: 'defence', label: 'Defence' },
  { skill: 'hitpoints', label: 'Hitpoints' },
  { skill: 'ranged', label: 'Ranged' },
  { skill: 'magic', label: 'Magic' },
  { skill: 'prayer', label: 'Prayer' },
  { skill: 'slayer', label: 'Slayer' },
];

const ALL_SKILLS: SkillId[] = [
  'attack', 'strength', 'defence', 'hitpoints', 'ranged', 'magic', 'prayer', 'slayer',
  'woodcutting', 'mining', 'fishing', 'firemaking', 'cooking', 'smithing', 'fletching',
  'crafting', 'runecrafting', 'herblore', 'thieving', 'farming', 'agility', 'summoning',
  'astrology', 'township',
];

type Tab = 'stats' | 'equipment' | 'skills';

// ═══ Витальный бар (как Vitality/Magic/Stamina в реф 1) ═══
function VitalBar({ icon, label, value, max, barClass }: {
  icon: string; label: string; value: number; max: number; barClass: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-16 shrink-0 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
        <span className="text-sm leading-none">{icon}</span>{label}
      </span>
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-300', barClass)}
          style={{ width: `${Math.min(100, (value / Math.max(1, max)) * 100)}%` }}
        />
      </div>
      <span className="w-14 shrink-0 text-right font-mono text-[11px] font-bold text-foreground tabular-nums">
        {value}/{max}
      </span>
    </div>
  );
}

// ═══ Строка стата: лейбл — бар — моно-число (реф 1+2) ═══
function StatBarRow({ skill, label }: { skill: SkillId; label: string }) {
  const level = usePlayerStore(s => s.skills[skill].level);
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <span className="w-24 shrink-0 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
        <span className="text-sm leading-none">{getSkillIcon(skill)}</span>{label}
      </span>
      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500/80 rounded-full"
          style={{ width: `${Math.min(100, (level / MAX_LEVEL) * 100)}%` }}
        />
      </div>
      <span className="w-8 shrink-0 text-right font-mono text-sm font-black text-foreground tabular-nums">
        {level}
      </span>
    </div>
  );
}

// ═══ Слот paper doll (60px) ═══
function DollSlot({ slot, onClick }: { slot: EquipSlot; onClick: () => void }) {
  const equipped = usePlayerStore(s => s.equipment[slot]);
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center shrink-0',
        'transition-all duration-100 active:scale-95',
        equipped ? 'bg-white/[0.07] hover:bg-white/10 cursor-pointer' : 'bg-white/[0.03] cursor-default'
      )}
    >
      {equipped ? (
        <ItemCard itemId={equipped} size="md" showCount={false} />
      ) : (
        <span className="text-sm text-zinc-600">+</span>
      )}
    </button>
  );
}

export function CharacterPage() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>('stats');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const skills = usePlayerStore(s => s.skills);
  const combatLevel = usePlayerStore(s => s.combatLevel);
  const prayerPoints = usePlayerStore(s => s.prayerPoints);
  const maxPrayerPoints = usePlayerStore(s => s.maxPrayerPoints);
  const equipment = usePlayerStore(s => s.equipment);

  const totalLevel = ALL_SKILLS.reduce((sum, id) => sum + skills[id].level, 0);
  const equippedCount = Object.values(equipment).filter(Boolean).length;
  const hp = skills.hitpoints.level * 10;

  const handleSlotClick = (slot: EquipSlot) => {
    const eq = usePlayerStore.getState().equipment[slot];
    if (eq) setSelectedItem(eq);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* ═══ ЯКОРЬ: имя + Total + Combat (компактная строка) ═══ */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500/25 to-purple-500/25 border border-indigo-500/30 flex items-center justify-center text-2xl">
          {COMBAT_ICONS.player}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-black text-foreground truncate">{t('auth.guest')}</p>
          <p className="text-[10px] text-muted-foreground font-semibold">Adventurer · Cmb {combatLevel}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Total</p>
          <p className="font-mono font-black text-indigo-400 tabular-nums leading-none text-2xl md:text-3xl drop-shadow-[0_0_12px_rgba(99,102,241,0.35)]">
            {totalLevel}
          </p>
        </div>
      </div>

      {/* ═══ ТАБЫ ═══ */}
      <div className="bg-white/5 rounded-xl p-1 flex gap-1">
        {([
          { key: 'stats', label: 'Stats' },
          { key: 'equipment', label: `Equip · ${equippedCount}/12` },
          { key: 'skills', label: 'Skills' },
        ] as { key: Tab; label: string }[]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              'flex-1 h-10 rounded-lg text-[11px] font-bold transition-all active:scale-95 whitespace-nowrap',
              tab === key
                ? 'bg-white/10 text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ═══ TAB: STATS — витальные бары + список с барами ═══ */}
      {tab === 'stats' && (
        <div className="bg-white/[0.06] rounded-2xl p-4 space-y-4">
          {/* Витальные бары (реф 1) */}
          <div className="space-y-2">
            <VitalBar icon={getSkillIcon('hitpoints')} label="HP" value={hp} max={hp} barClass="bg-red-500" />
            <VitalBar icon={getSkillIcon('prayer')} label="Prayer" value={prayerPoints} max={maxPrayerPoints} barClass="bg-purple-500" />
          </div>
          <div className="h-px bg-white/5" />
          {/* Статы: лейбл — бар — число */}
          <div>
            {COMBAT_STATS.map(({ skill, label }) => (
              <StatBarRow key={skill} skill={skill} label={label} />
            ))}
          </div>
        </div>
      )}

      {/* ═══ TAB: EQUIPMENT — анатомический paper doll ═══ */}
      {tab === 'equipment' && (
        <div className="bg-white/[0.06] rounded-2xl p-4">
          <div className="flex items-start justify-center gap-3 md:gap-5">
            {/* Левая колонка */}
            <div className="flex flex-col gap-2">
              {LEFT_COL.map(slot => (
                <DollSlot key={slot} slot={slot} onClick={() => handleSlotClick(slot)} />
              ))}
            </div>

            {/* Силуэт в центре */}
            <div className="flex flex-col items-center justify-center py-2 px-1">
              <span className="text-[80px] md:text-[100px] leading-none grayscale opacity-40 select-none">
                {COMBAT_ICONS.player}
              </span>
              <p className="mt-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                {t('auth.guest')}
              </p>
            </div>

            {/* Правая колонка */}
            <div className="flex flex-col gap-2">
              {RIGHT_COL.map(slot => (
                <DollSlot key={slot} slot={slot} onClick={() => handleSlotClick(slot)} />
              ))}
            </div>
          </div>

          {/* Нижний ряд */}
          <div className="flex justify-center gap-2 mt-3">
            {BOTTOM_ROW.map(slot => (
              <DollSlot key={slot} slot={slot} onClick={() => handleSlotClick(slot)} />
            ))}
          </div>
        </div>
      )}

      {/* ═══ TAB: SKILLS — сетка кругов ═══ */}
      {tab === 'skills' && (
        <div className="bg-white/[0.06] rounded-2xl p-4">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-x-2 gap-y-4">
            {ALL_SKILLS.map(id => (
              <div key={id} className="flex justify-center">
                <SkillCircle skillId={id} size="sm" showLevel={true} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ Модалка предмета ═══ */}
      {selectedItem && (
        <ItemModal itemId={selectedItem} open={true} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
