
---

# 📋 ПЛАН: система предметов (`items/`) + экономика (`economy/`)

## 🧠 Что зафиксировано в памяти (решения)

1. **ItemCard = вариант C** (один компонент, внутри композиция TierFrame/GradeFrame)
2. **Тиры ↔ экономика:** инструменты → бонус скорости; оружие/экипировка → бонусы характеристик (сила, защита, ловкость, скорость атаки — у персонажа их пока нет, но будут)
3. **Грейды** = цветовое отличие (те же цвета, что у тиров, но без бирки); влияют на цену + (опционально) скорость фарма и XP
4. **Stack count / locked / tooltip** — обсуждены (count по умолчанию, locked через prop, tooltip пока клик)
5. **Конфиги визуала** (цвета/названия) в `data/items/`; **бонусы** в `data/economy/modifiers/`
6. **Оружие делится на типы** (кинжал/меч/двуручник/лук/арбалет), у каждого свой профиль статов (±)
7. **Руны** — будущие «ячейки» на оружии (`runeSlots`, `appliedRunes`)
8. **modifiers.ts станет монстром → делим на папку `modifiers/`** с подмодулями
9. **Оружие/экипировка/инструменты — в отдельные папки** с базовыми статами

---

## 🗑 Шаг 0 — очистка ✅

- Удалить `data/items.ts` (старый монолит)
- Удалить `data/balance.ts` (перенесён в economy)

---

## 🧬 Шаг 1 — расширение типов (`data/types.ts`).  ✅

Добавить к `Item`:
- `grade?: GradeId` (common/uncommon/rare/epic/legendary)
- `weaponType?: WeaponTypeId`
- `baseStats?: CombatStats` (базовые характеристики до тира/рун)
- `runeSlots?: number` (сейчас 0)
- `appliedRunes?: string[]` (сейчас [])
- (`tier?: number` уже есть)

Расширить `CombatStats` (подготовка под персонажа):
- `attackSpeed?: number`
- `agility?: number`

Новые типы: `GradeId`, `WeaponTypeId`.

---

## 📁 Шаг 2 — реорганизация `data/items/` ✅

**Останутся плоскими** (не трогаем): `gathered.ts`, `crafted.ts`, `misc.ts`

**Новые папки:**
```
data/items/
├── weapons/
│   ├── swords.ts, daggers.ts, twoHanders.ts, bows.ts, crossbows.ts
│   └── index.ts
├── equipment/
│   ├── helms.ts, armors.ts, shields.ts
│   └── index.ts
├── tools/
│   ├── axes.ts, pickaxes.ts, fishingRods.ts
│   └── index.ts
├── tiers.ts        ← визуал тиров (цвета, названия)
├── grades.ts       ← визуал грейдов (те же цвета, без бирки)
├── weaponTypes.ts  ← профили базовых статов по типам оружия
└── index.ts        ← фасад (обновить импорты)
```

**Миграция:** текущий `equipment.ts` (мечи/шлемы/нагрудники/щиты) расщепляется → мечи в `weapons/swords.ts`, остальное в `equipment/`.

**Согласование с существующим `data/tiers.ts`** (getTierBackground/getTierBorder, используется FiremakingPage): новый `items/tiers.ts` становится источником; `data/tiers.ts` оставляем как тонкий ре-экспорт, чтобы не сломать FiremakingPage.

---

## ⚙️ Шаг 3 — реорганизация `data/economy/modifiers` ✅

Удалить `modifiers.ts` → создать папку:
```
data/economy/modifiers/
├── index.ts           ← агрегатор + getEffectiveWeaponStats/getEffectiveGearStats
├── toolBonuses.ts     ← TOOL_TIER_BONUS (скорость) [перенос]
├── gearBonuses.ts     ← GEAR_TIER_STATS_MULT + applyGearTierBonus
├── weaponBonuses.ts   ← WEAPON_TIER_STATS_MULT + applyWeaponTierBonus
├── gradeBonuses.ts    ← GRADE_BONUSES (цена/скорость/XP)
├── weatherBonuses.ts  ← заглушка (почва)
└── runeBonuses.ts     ← заглушка (RUNE_EFFECTS + applyRuneBonuses)
```
Существующие `TIER_PRICE_MULT`, `RARITY_PRICE_MULT`, `WEATHER_EFFECTS`, `MAX_BONUS_PERCENT`, `collectBonuses`, `EconomyContext` распределяются по подмодулям. `economy/index.ts` импортирует `./modifiers` → резолвится в `modifiers/index.ts`, ничего не ломается.

---

## 🃏 Шаг 4 — компонент `components/ItemCard.tsx` (вариант C) ✅

Props: `itemId, size(sm/md/lg), quantity, showCount, tier, grade, locked, onClick`
- Внутри использует конфиги `items/tiers.ts` / `items/grades.ts` для рамки/фона/бирки
- `tier` → рамка + бирка T1-T8; `grade` → рамка без бирки
- `quantity>1 && stackable` → «×12» (отключается `showCount={false}`)
- `locked` → grayscale + замок
- `onClick` → открывает `ItemInfoPopover` (tooltip пока клик)

---

## 🔗 Шаг 5 — интеграция с механиками

- `getEffectiveWeaponStats(item, runes)` = baseStats × weaponTierMult + руны
- `getEffectiveGearStats(item)` = baseStats × gearTierMult
- `getEffectiveInterval/Xp` учитывают `toolTier` + `itemGrade`
- `getEffectivePrice` учитывает `tier`/`grade`/`rarity`

---

## 📚 Шаг 6 — документация

- Создать `data/items/README.md` (карточки, тиры, грейды, как расширять)
- Обновить `data/economy/README.md` (новая структура modifiers)

---

## 🔢 Порядок реализации (по 1 файлу за шаг)

1. types.ts (расширения)
2. items/tiers.ts + grades.ts + weaponTypes.ts
3. weapons/ + equipment/ + tools/ (папки + миграция equipment.ts)
4. items/index.ts (фасад)
5. economy/modifiers/ (папка, перенос + новые)
6. economy/index.ts (новые геттеры)
7. components/ItemCard.tsx
8. README.md ×2
9. Удаление items.ts, balance.ts, старого equipment.ts, modifiers.ts

---

## ⏸ Отложено (НЕ сейчас)

- Реальные руны, погода, зелья, характеристики персонажа — только «почва»
- Hover-tooltip, аукцион

---

**Подтверждаешь план?** Если «ок» — начинаю с Шага 1 (`types.ts`). Если есть правки — вноси.