# 💰 Экономика (`data/economy/`)

Единая система всех чисел игры: **цены, XP, скорость, бонусы, качество**.

**Главный принцип:** базы отдельно, модификаторы отдельно, эффективные значения — через агрегатор.

---

## 🧠 Модель качества (ВАЖНО)

| Понятие | Что даёт | Где хранится |
|---|---|---|
| **Тир (1-12)** | ТОЛЬКО визуальная бирка `T1..T12` (нумерация носимых предметов) | `items/tiers.ts` |
| **Грейд** | Цвет фона карточки + **бонусы** | `items/grades.ts` (цвет) + `modifiers/` (бонусы) |

**Грейд делится на 2 вида:**
- **Ресурсы/крафт** (бревна, руда, рыба) → цвет + бонусы к цене/XP/скорости (`resourceBonuses.ts`)
- **Экипировка/оружие/инструменты** → цвет + множитель статов (`gearBonuses.ts`, `toolBonuses.ts`)

**Тиры бонусов НЕ дают.** Это просто метка уровня предмета.

---

## 📁 Структура

```
data/economy/
├── prices.ts    ← NPC-цены по itemId (база)
├── xp.ts        ← базовый XP по ключу skill.itemId
├── speed.ts     ← базовый interval (мс) по ключу skill.itemId
├── modifiers/
│   ├── types.ts           ← BonusEntry, EconomyContext, MAX_BONUS_PERCENT
│   ├── toolBonuses.ts     ← грейд инструмента → скорость фарма
│   ├── gearBonuses.ts     ← грейд экипировки/оружия → множитель статов
│   ├── resourceBonuses.ts ← грейд ресурса → цена/XP/скорость
│   ├── weatherBonuses.ts  ← погода (заглушка)
│   ├── runeBonuses.ts     ← руны (заглушка)
│   └── index.ts           ← collectBonuses + геттеры модификаторов
├── index.ts     ← АГРЕГАТОР (единая точка доступа)
└── README.md
```

---

## 🎯 Ключевая идея

```
эффективное значение = база × модификаторы
```

- **База** (prices/xp/speed) — «чистые» числа без контекста
- **Модификаторы** (modifiers) — источники бонусов (грейды, зелья, погода)
- **Агрегатор** (`index.ts`) — собирает всё и возвращает итог

---

## 🚀 Использование

### Для механик / gameEngine

```ts
import {
  getEffectiveXp,
  getEffectiveInterval,
  getEffectivePrice,
  getEffectiveEquipmentStats,
  actionKey,
} from '@/data/economy';

// Ресурс с грейдом + инструмент с грейдом
const xp = getEffectiveXp(
  actionKey('woodcutting', 'oak_logs'),
  {
    toolGrade: 'rare',     // +10% скорость от инструмента
    itemGrade: 'uncommon', // +5% XP, ×1.2 цена от ресурса
  }
);

// Цена ресурса с грейдом
const price = getEffectivePrice('oak_logs', { itemGrade: 'rare' });
// = 2 × 1.5 = 3

// Статы оружия с учётом грейда
const stats = getEffectiveEquipmentStats(item);
// baseStats × GEAR_GRADE_MULT[item.grade]
```

### Для интерфейсов / тултипов

```ts
import { describeEffective, actionKey } from '@/data/economy';

const info = describeEffective(actionKey('woodcutting', 'oak_logs'), {
  toolGrade: 'rare',
  itemGrade: 'uncommon',
});
// {
//   key: 'woodcutting.oak_logs',
//   baseXp: 14,
//   baseInterval: 4000,
//   bonuses: [{ source: 'tool_grade', stat: 'speed', percent: 10 }],
//   effectiveXp: 15,
//   effectiveInterval: 3600,
// }
```

`describeEffective` возвращает **разбор** — можно показывать игроку: «Инструмент rare: +10% к скорости».

### Чистые базы (без бонусов)

Иногда нужны «сырые» числа:

```ts
import { getBaseXp, getBaseInterval, getBasePrice } from '@/data/economy';

getBaseXp('woodcutting.oak_logs');       // 14
getBaseInterval('woodcutting.oak_logs'); // 4000
getBasePrice('oak_logs');                // 2
```

---

## 🔌 Как подключить к предметам

В `items/index.ts` цены подмешиваются через фасад:

```ts
import { getBasePrice } from '../economy/prices';
function withEconomy(item: Item): Item {
  return { ...item, sellValue: getBasePrice(item.id) };
}
```

Для **эффективной** цены (с учётом грейда) интерфейсы вызывают
`getEffectivePrice(item.id, { itemGrade: item.grade })`, а не `item.sellValue`.

`ItemCard` читает цвет из `items/grades.ts` (`item.grade`) и бирку из `items/tiers.ts` (`item.tier`).

---

## 🔧 Как расширять

### Добавить новое действие (новый навык/ресурс)

1. Добавить строку в `xp.ts` и `speed.ts` с ключом `${skill}.${itemId}`
2. Если предмет новый — добавить в `data/items/` (соответствующий подмодуль)
3. Если предмет новый — добавить цену в `prices.ts`

### Добавить новый источник бонусов

Допустим, хотим добавить **зелья скорости**:

**Шаг 1.** Создать файл `modifiers/potionBonuses.ts`:

```ts
import type { BonusEntry } from './types';

export const POTION_BONUS: Record<string, BonusEntry> = {
  haste: { source: 'potion_haste', stat: 'speed', percent: 15 },
  xp_boost: { source: 'potion_xp', stat: 'xp', percent: 20 },
};
```

**Шаг 2.** Расширить `EconomyContext` в `modifiers/types.ts`:

```ts
export interface EconomyContext {
  toolGrade?: string;
  potions?: string[]; // ← новое
  weather?: string;
}
```

**Шаг 3.** Добавить в `collectBonuses` (`modifiers/index.ts`):

```ts
import { POTION_BONUS } from './potionBonuses';

export function collectBonuses(ctx: EconomyContext): BonusEntry[] {
  const out: BonusEntry[] = [];

  if (ctx.toolGrade && TOOL_GRADE_BONUS[ctx.toolGrade as GradeId]) {
    out.push(TOOL_GRADE_BONUS[ctx.toolGrade as GradeId]);
  }

  // НОВОЕ:
  if (ctx.potions) {
    for (const p of ctx.potions) {
      if (POTION_BONUS[p]) out.push(POTION_BONUS[p]);
    }
  }

  return out;
}
```

**Шаг 4.** Реэкспортировать из `modifiers/index.ts`:

```ts
export * from './potionBonuses';
```

Всё! Теперь `getEffectiveXp/Interval` подхватят зелья автоматически.

### Добавить новую погоду

**Шаг 1.** Раскомментировать/добавить в `weatherBonuses.ts`:

```ts
export const WEATHER_EFFECTS: Record<string, WeatherEffect> = {
  clear: {},
  rain: {
    speedMult: { woodcutting: 1.25 }, // на 25% медленнее
    xpMult: { woodcutting: 1.2 },     // но на 20% больше XP
    priceMult: { log: 1.2 },          // и на 20% дороже
  },
};
```

**Шаг 2.** Добавить обработку в `collectBonuses` (аналогично зельям).

### Настроить баланс

| Что | Где править |
|---|---|
| Базовые цены | `prices.ts` |
| Базовый XP | `xp.ts` |
| Базовая скорость | `speed.ts` |
| Сила грейд-бонусов ресурсов | `modifiers/resourceBonuses.ts` |
| Множители статов экипировки | `modifiers/gearBonuses.ts` |
| Бонус скорости инструмента | `modifiers/toolBonuses.ts` |
| Капы бонусов | `modifiers/types.ts` (`MAX_BONUS_PERCENT`) |
| Цвета грейдов | `items/grades.ts` |
| Цвета/бирки тиров | `items/tiers.ts` |

---

## ⚠️ Правила

1. **Не дублируй числа** — каждое число живёт ровно в одном файле.
2. **Используй `actionKey(skill, itemId)`** для единообразия ключей.
3. **Капы существуют** (`MAX_BONUS_PERCENT`) — не обходи их в коде.
4. **Стекание бонусов аддитивное** (проценты складываются). Грейд-множители — мультипликативные (отдельный слой).
5. **`getEffectiveInterval` имеет минимум 200мс** — чтобы не получить бесконечную скорость.
6. **Тиры не трогают экономику** — они только визуал.

---

## 🔮 Будущее (почва заложена)

- **Погода** (в `modifiers/weatherBonuses.ts` есть заготовка `WEATHER_EFFECTS`)
- **Зелья** (`potionBonuses.ts` добавляется по шаблону выше)
- **Заточка инструментов** (новая таблица + поле в `EconomyContext`)
- **Бижутерия/броня** (аналогично, новая таблица + поля)
- **Бафы гильдии** (новая таблица)
- **Аукцион** (отдельная система, читает `getBasePrice` как ориентир)

Сигнатуры `getEffectiveXp/Interval/Price` при этом **не меняются** — просто расширяется `EconomyContext`.
