# 📦 Предметы (`data/items/`)

Единая система всех игровых предметов: ресурсы, крафт, экипировка, оружие, инструменты.

**Главный принцип:** каждый предмет хранит **ЧТО это** (id, имя, категория, статы), а **СКОЛЬКО стоит** — в `data/economy/prices.ts`.

---

## 🧠 Модель качества (ВАЖНО)

| Понятие | Что даёт | Для каких предметов | Где хранится |
|---|---|---|---|
| **Тир (1-12)** | Бирка `T1..T12` (нумерация) | Экипировка, оружие, инструменты | `tiers.ts` |
| **Грейд** | Цвет фона + **бонусы** | Все предметы | `grades.ts` (цвет) + `economy/modifiers/` (бонусы) |

### Два вида грейдов:

1. **Ресурсы/крафт** (бревна, руда, рыба, слитки) → только цвет + бонусы к цене/XP/скорости фарма
2. **Экипировка/оружие/инструменты** → цвет + множитель статов (+10%/+25%/+50%/+100%)

**Тиры бонусов НЕ дают** — это только визуальная метка уровня предмета.

---

## 📁 Структура

```
data/items/
├── gathered.ts        ← сырьё (бревна, руда, рыба, травы, самоцветы, кости) — плоский файл
├── crafted.ts         ← крафт (зола, уголь, слитки, приготовленная рыба, руны) — плоский файл
├── misc.ts            ← прочее (квестовые предметы, валюта) — плоский файл
├── weapons/           ← оружие (папка с подмодулями)
│   ├── swords.ts      (7 мечей: bronze→dragon)
│   ├── daggers.ts     (заготовка)
│   ├── twoHanders.ts  (заготовка)
│   ├── bows.ts        (заготовка, requiresAmmo)
│   ├── staves.ts      (заготовка)
│   └── index.ts
├── equipment/         ← экипировка (папка с подмодулями)
│   ├── helms.ts       (7 шлемов)
│   ├── armors.ts      (7 нагрудников, 3 с fullBody:true)
│   ├── platelegs.ts   (заготовка)
│   ├── boots.ts       (заготовка)
│   ├── gloves.ts      (заготовка)
│   ├── shields.ts     (7 щитов)
│   └── index.ts
├── tools/             ← инструменты (папка с подмодулями)
│   ├── axes.ts        (заготовка)
│   ├── pickaxes.ts    (заготовка)
│   ├── fishingRods.ts (заготовка)
│   └── index.ts
├── tiers.ts           ← конфиг тиров (1-12, цвета бирок)
├── grades.ts          ← конфиг грейдов (цвета фона)
└── index.ts           ← ФАСАД (агрегатор всех предметов)
```

**Почему плоские файлы vs папки:**
- `gathered.ts`, `crafted.ts`, `misc.ts` — относительно небольшие (50-80 предметов), плоская структура удобнее
- `weapons/`, `equipment/`, `tools/` — большие и логически разделены на подтипы, поэтому папки

---

## 🗡️ Система слотов оружия (`weaponSlots.ts`)

Каждый тип оружия занимает разное количество слотов экипировки:

| Тип | weapon | shield | quiver | Особенности |
|---|---|---|---|---|
| `dagger` | 1 | 0 | 0 | Быстрый, слабый урон |
| `sword` | 1 | 0 | 0 | Сбалансированный |
| `twoHander` | 1 | 1 | 0 | Занимает weapon + shield |
| `bow` | 1 | 0 | 1 | Требует стрелы в quiver |
| `crossbow` | 1 | 0 | 1 | Требует болты в quiver |
| `staff` | 1 | 1 | 0 | Занимает weapon + shield |

```ts
import { getWeaponSlots } from '@/data/weaponSlots';

const slots = getWeaponSlots('bow');
// { weapon: 1, shield: 0, quiver: 1, requiresAmmo: true }
```

---

## 👕 Экипировка и `fullBody`

Некоторые топовые нагрудники — **комбинезоны** (`fullBody: true`), которые занимают слоты `platebody` + `platelegs` одновременно.

```ts
// armors.ts
adamant_platebody: {
  id: 'adamant_platebody',
  name: 'Adamant Platebody',
  category: 'platebody',
  equipSlot: 'platebody',
  fullBody: true,  // занимает platebody + platelegs
  baseStats: { defenceBonus: 80 },
  tier: 5,
},
```

При экипировке комбинезона слот `platelegs` автоматически блокируется.

---

## 🎯 Как устроен предмет

```ts
{
  // Обязательные поля
  id: 'bronze_sword',
  name: 'Bronze Sword',
  category: 'weapon',
  sellValue: 0,           // подмешивается из economy/prices.ts
  canSell: true,
  stackable: false,

  // Экипировка/оружие
  equipSlot: 'weapon',    // 'helm' | 'platebody' | 'weapon' | ...
  weaponType: 'sword',    // для оружия
  tier: 1,                // бирка T1-T12 (экипировка/оружие/инструменты)
  grade: 'common',        // цвет + бонусы

  // Статы (до применения грейда)
  baseStats: {
    attackBonus: 7,
    strengthBonus: 8,
    attackSpeed: 4,
  },

  // Руны (будущее)
  runeSlots: 0,           // ячеек для рун
  appliedRunes: [],       // применённые руны

  // Комбинезоны
  fullBody: false,        // занимает platebody + platelegs

  // Визуал
  icon: '⚔️',             // emoji fallback
  description: 'Базовый меч из бронзы',
}
```

---

## 🚀 Использование

### Получить предмет

```ts
import { getItem } from '@/data/items';

const sword = getItem('bronze_sword');
// { id: 'bronze_sword', name: 'Bronze Sword', baseStats: {...}, tier: 1, grade: 'common' }
```

### Получить все предметы

```ts
import { getAllItems } from '@/data/items';

const items = getAllItems(); // массив всех предметов
```

### Получить по категории

```ts
import { WEAPONS, EQUIPMENT_ITEMS, GATHERED_ITEMS } from '@/data/items';

const swords = Object.values(WEAPONS).filter(i => i.weaponType === 'sword');
```

### Эффективные статы экипировки (с учётом грейда)

```ts
import { getEffectiveEquipmentStats } from '@/data/economy';

const sword = getItem('bronze_sword'); // grade: 'rare'
const stats = getEffectiveEquipmentStats(sword);
// baseStats × GEAR_GRADE_MULT['rare'] (×1.25)
```

### Эффективная цена ресурса (с учётом грейда)

```ts
import { getEffectivePrice } from '@/data/economy';

const price = getEffectivePrice('oak_logs', { itemGrade: 'rare' });
// = 2 × 1.5 = 3
```

---

## ➕ Как добавить новый предмет

### 1. Ресурс (бревно, руда, рыба)

Добавить в `gathered.ts`:

```ts
new_log: {
  id: 'new_log',
  name: 'New Log',
  category: 'log',
  sellValue: 0,
  canSell: true,
  stackable: true,
  grade: 'common',        // цвет + бонусы из economy/modifiers/resourceBonuses
  icon: getItemIcon('new_log'),
},
```

Затем добавить цену в `economy/prices.ts`:

```ts
'new_log': { sellValue: 5 },
```

### 2. Оружие

Создать файл `weapons/newWeaponType.ts`:

```ts
import type { Item } from '../../types';
import { getItemIcon } from '@/lib/icons';

export const NEW_WEAPONS: Record<string, Item> = {
  bronze_newweapon: {
    id: 'bronze_newweapon',
    name: 'Bronze New Weapon',
    category: 'weapon',
    sellValue: 0,
    canSell: true,
    stackable: false,
    equipSlot: 'weapon',
    weaponType: 'newType',  // добавить в WeaponTypeId
    tier: 1,
    grade: 'common',
    baseStats: { attackBonus: 5, strengthBonus: 4, attackSpeed: 8 },
    icon: getItemIcon('bronze_newweapon'),
  },
};
```

Подключить в `weapons/index.ts`:

```ts
import { NEW_WEAPONS } from './newWeaponType';
export const WEAPONS = { ...SWORDS, ...NEW_WEAPONS };
```

Добавить слоты в `weaponSlots.ts`:

```ts
newType: { weapon: 1, shield: 0, quiver: 0, requiresAmmo: false },
```

### 3. Экипировка

Добавить в `equipment/helms.ts` (или другой файл):

```ts
new_helm: {
  id: 'new_helm',
  name: 'New Helm',
  category: 'helm',
  sellValue: 0,
  canSell: true,
  stackable: false,
  equipSlot: 'helm',
  tier: 1,
  grade: 'common',
  baseStats: { defenceBonus: 5 },
  icon: getItemIcon('new_helm'),
},
```

### 4. Инструмент

Добавить в `tools/axes.ts`:

```ts
new_axe: {
  id: 'new_axe',
  name: 'New Axe',
  category: 'tool',
  sellValue: 0,
  canSell: true,
  stackable: false,
  equipSlot: 'tool',
  tier: 1,
  grade: 'common',        // грейд даёт бонус скорости из economy/modifiers/toolBonuses
  icon: getItemIcon('new_axe'),
},
```

---

## 🎨 Как настроить визуал

### Цвета тиров (бирки T1-T12)

Править `tiers.ts`:

```ts
export const TIERS: Record<number, TierConfig> = {
  1: {
    id: 1,
    name: 'Tier 1',
    badgeBgColor: 'bg-slate-600',
    badgeTextColor: 'text-slate-100',
  },
};
```

### Цвета грейдов (фон карточки)

Править `grades.ts`:

```ts
export const GRADES: Record<GradeId, GradeConfig> = {
  common: {
    id: 'common',
    name: 'Common',
    bgColor: 'bg-slate-900/40',
    borderColor: 'border-slate-500',
    textColor: 'text-slate-300',
  },
};
```

### Бонусы грейдов

Править `economy/modifiers/resourceBonuses.ts` (ресурсы) или `gearBonuses.ts` (экипировка).

---

## ⚠️ Правила

1. **Не дублируй `sellValue`** — он подмешивается из `economy/prices.ts` через фасад.
2. **Используй `baseStats`** для статов экипировки/оружия, а не `combatStats` (устаревшее поле).
3. **Тиры (1-12)** — только для экипировки/оружия/инструментов, ресурсы их не имеют.
4. **Грейды** — для всех предметов, но бонусы дают только экипировке/оружию/инструментам.
5. **`fullBody: true`** — только для нагрудников-комбинезонов (занимают platebody + platelegs).
6. **Иконки** — через `getItemIcon()` из `lib/icons.ts`, не хардкодить эмодзи.

---

## 🔗 Связь с экономикой

| Предмет | Что читает из economy |
|---|---|
| Ресурс (бревно) | `getEffectivePrice(id, { itemGrade })`, `getEffectiveXp/Interval` |
| Экипировка/оружие | `getEffectiveEquipmentStats(item)` (грейд × baseStats) |
| Инструмент | `getEffectiveInterval` (грейд инструмента → скорость) |

**Тиры не влияют на экономику** — они только визуал.

---

## 🔮 Будущее

- **Руны** — поле `runeSlots` и `appliedRunes` уже готовы, логика в `economy/modifiers/runeBonuses.ts`
- **Новые типы оружия** — добавить в `WeaponTypeId` + `weaponSlots.ts` + создать файл в `weapons/`
- **Новые слоты экипировки** (кольца, амулеты, плащи) — добавить файлы в `equipment/`
- **Инструменты** — наполнить `tools/axes.ts`, `pickaxes.ts`, `fishingRods.ts` реальными предметами
