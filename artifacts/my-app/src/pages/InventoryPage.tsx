import React, { useEffect, useState } from 'react';
import { useInventoryStore } from '@/store/inventoryStore';
import { ItemCard, EmptySlot } from '@/components/ItemCard';
import { ItemModal } from '@/components/ItemModal';
import { getItem } from '@/data/items';
import type { ItemSlot } from '@/data/types';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { UI_ICONS } from '@/lib/icons';

interface SelectedItem {
  itemId: string;
  tier?: number;
  grade?: string;
}

// 5 рядов по 8 ячеек = 40 на страницу
const PAGE_SIZE = 40;

type Cell =
  | { kind: 'item'; slot: ItemSlot }
  | { kind: 'empty'; key: string };

export function InventoryPage() {
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [selected, setSelected] = useState<SelectedItem | null>(null);
  const [page, setPage] = useState(0);

  const getFilteredItems = useInventoryStore(s => s.getFilteredItems);
  const items = useInventoryStore(s => s.items);
  const maxSlots = useInventoryStore(s => s.maxSlots);
  const searchQuery = useInventoryStore(s => s.searchQuery);
  const setSearch = useInventoryStore(s => s.setSearch);
  const activeCategory = useInventoryStore(s => s.activeCategory);
  const setCategory = useInventoryStore(s => s.setCategory);
  const upgradeSlots = useInventoryStore(s => s.upgradeSlots);

  const filteredItems = getFilteredItems();
  const usedSlots = items.filter(i => i.quantity > 0).length;
  const isFiltered = searchQuery !== '' || activeCategory !== 'all';
  const emptySlots = isFiltered ? 0 : Math.max(0, maxSlots - usedSlots);
  const showSearch = searchOpen || searchQuery !== '';

  // Сброс страницы при смене фильтра/поиска
  useEffect(() => { setPage(0); }, [activeCategory, searchQuery]);

  // ── Пагинация: все ячейки (предметы + пустые) ──
  const allCells: Cell[] = [
    ...filteredItems.map((slot): Cell => ({ kind: 'item', slot })),
    ...Array.from({ length: emptySlots }, (_, i): Cell => ({ kind: 'empty', key: `empty-${i}` })),
  ];
  const totalPages = Math.max(1, Math.ceil(allCells.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pageCells = allCells.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  const CATEGORIES = [
    { key: 'all',       icon: UI_ICONS.allItems,  title: 'All' },
    { key: 'equipment', icon: UI_ICONS.equipment, title: 'Equipment' },
    { key: 'resources', icon: UI_ICONS.resources, title: 'Resources' },
    { key: 'food',      icon: UI_ICONS.food,      title: 'Food' },
    { key: 'misc',      icon: UI_ICONS.mastery,   title: 'Misc' },
  ] as const;

  return (
    <div className="space-y-4 md:space-y-5">
      {/* ── Шапка ── */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 md:w-11 md:h-11 shrink-0 rounded-xl bg-gradient-to-br from-sky-500/25 to-indigo-500/25 border border-sky-400/20 flex items-center justify-center text-xl md:text-2xl shadow-inner">
            {UI_ICONS.inventory}
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-foreground truncate">
            {t('inventory.title') || 'Inventory'}
          </h1>
          <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
            <span className="text-indigo-400 font-bold">{usedSlots}</span> / {maxSlots}
          </span>
        </div>
        <button
          onClick={upgradeSlots}
          className="shrink-0 px-3 md:px-4 py-2 min-h-[36px] rounded-lg text-[11px] md:text-xs font-bold text-white
            bg-gradient-to-b from-indigo-500 to-indigo-600 hover:brightness-110 active:scale-95 transition-all shadow-sm"
        >
          + Slots
        </button>
      </div>

      {/* ── Табы + поиск ── */}
      <div className="bg-white/5 rounded-xl p-1 flex items-center gap-1">
        {CATEGORIES.map(({ key, icon, title }) => (
          <button
            key={key}
            onClick={() => setCategory(key as any)}
            title={title}
            aria-label={title}
            className={`flex-1 flex items-center justify-center h-11 md:h-12 rounded-lg transition-all active:scale-95 ${
              activeCategory === key
                ? 'bg-white/10 text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            <span className="text-lg md:text-xl leading-none">{icon}</span>
          </button>
        ))}

        <div className="w-px h-6 bg-white/10 mx-0.5 shrink-0" />

        <button
          onClick={() => setSearchOpen(v => !v)}
          title="Search"
          aria-label="Search"
          className={`w-11 h-11 md:w-12 md:h-12 shrink-0 flex items-center justify-center rounded-lg transition-all active:scale-95 ${
            showSearch
              ? 'bg-white/10 text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
          }`}
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* ── Раскрывающийся поиск ── */}
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            autoFocus
            placeholder={t('ui.search') + '...'}
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-10 py-2.5 min-h-[44px] bg-white/5 rounded-xl border-0 focus:outline-none focus:ring-1 focus:ring-indigo-500/60 transition-all text-sm text-foreground placeholder:text-muted-foreground"
          />
          {searchQuery !== '' && (
            <button
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/10 active:scale-95 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* ── Сетка текущей страницы ── */}
      {pageCells.length === 0 ? (
        <div className="bg-white/5 rounded-2xl flex flex-col items-center justify-center text-muted-foreground py-16">
          <div className="text-5xl mb-3 opacity-20">{UI_ICONS.inventory}</div>
          <p className="font-bold text-sm">{t('inventory.empty') || 'Empty'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-10 gap-2.5 md:gap-3">
          {pageCells.map((cell, index) => {
            if (cell.kind === 'empty') {
              return <EmptySlot key={cell.key} />;
            }
            const { slot } = cell;
            const item = getItem(slot.itemId);
            if (!item) return null;

            // Глобальный индекс по странице для stagger-анимации
            const globalIndex = safePage * PAGE_SIZE + index;

            return (
              <ItemCard
                key={`${slot.itemId}-${slot.tier ?? 0}-${slot.grade ?? 'n'}-${globalIndex}`}
                itemId={slot.itemId}
                grade={slot.grade}
                tier={slot.tier}
                quantity={slot.quantity}
                locked={slot.locked}
                index={index}
                size="cell"
                onClick={() => setSelected({ itemId: slot.itemId, tier: slot.tier, grade: slot.grade })}
              />
            );
          })}
        </div>
      )}

      {/* ── Пагинация: стрелки в стиле модалки ── */}
      <div className="flex items-center justify-center gap-2">
        {safePage > 0 && (
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            aria-label="Previous page"
            className="w-11 h-9 flex items-center justify-center rounded-lg text-muted-foreground
              bg-gradient-to-b from-[#3d434c] to-[#31363e] hover:brightness-110 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        <div className="px-3.5 h-9 flex items-center rounded-lg bg-white/5 text-[11px] font-black text-foreground tabular-nums">
          {safePage + 1} / {totalPages}
        </div>

        <button
          onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
          disabled={safePage >= totalPages - 1}
          aria-label="Next page"
          className="w-11 h-9 flex items-center justify-center rounded-lg text-muted-foreground
            bg-gradient-to-b from-[#3d434c] to-[#31363e] hover:brightness-110 active:scale-95 transition-all
            disabled:opacity-40 disabled:pointer-events-none"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── Модалка предмета ── */}
      {selected && (
        <ItemModal
          itemId={selected.itemId}
          tier={selected.tier}
          grade={selected.grade}
          open={true}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
