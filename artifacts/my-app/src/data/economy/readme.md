## 📄 `data/economy/README.md`

```markdown
# 💰 Экономика (`data/economy/`)

Единая система для всех чисел игры: цены, XP, скорость, бонусы.
**Главный принцип:** базы отдельно, модификаторы отдельно, эффективные значения — через агрегатор.

## 📁 Структура

| Файл | Что хранит |
|---|---|
| `prices.ts` | NPC-цены выкупа по `itemId` (база) |
| `xp.ts` | Базовый XP по ключу `${skill}.${itemId}` |
| `speed.ts` | Базовый interval (мс) по ключу `${skill}.${itemId}` |
| `modifiers.ts` | Таблицы бонусов (тир, погода, зелья, экипировка) |
| `index.ts` | **Агрегатор** — единая точка доступа |

## 🎯 Ключевая идея

```
эффективное значение = база × модификаторы
```

- **База** (prices/xp/speed) — «чистые» числа без контекста
- **Модификаторы** (modifiers) — источники бонусов в % (тир инструмента, зелья, погода)
- **Агрегатор** (`index.ts`) — собирает всё и возвращает итог

## 🚀 Использование

### Для механик / gameEngine

```ts
import {
  getEffectiveXp,
  getEffectiveInterval,
  getEffectivePrice,
  actionKey,
} from '@/data/economy';

// XP за действие (с учётом инструмента и других бонусов)
const xp = getEffectiveXp(
  actionKey('woodcutting', 'oak_logs'),
  { toolTier: 2 }
); // = 14 × 1.05 = 15

// Скорость действия (мс)
const interval = getEffectiveInterval(
  actionKey('woodcutting', 'oak_logs'),
  { toolTier: 2 }
); // = 4000 × 0.95 = 3800мс

// Цена продажи предмета (с учётом тира/редкости)
const price = getEffectivePrice('charcoal', { tier: 2 });
// = 3 × 1.6 (TIER_PRICE_MULT) = 5
```

### Для интерфейсов / тултипов

```ts
import { describeEffective, actionKey } from '@/data/economy';

const info = describeEffective(actionKey('woodcutting', 'oak_logs'), { toolTier: 2 });
// {
//   key: 'woodcutting.oak_logs',
//   baseXp: 14,
//   baseInterval: 4000,
//   bonuses: [{ source: 'tool_tier', stat: 'speed', percent: 5 }],
//   effectiveXp: 14,
//   effectiveInterval: 3800,
// }
```

`describeEffective` возвращает **разбор** — можно показывать игроку: «Топор T2: +5% к скорости».

### Чистые базы (без бонусов)

Иногда нужны «сырые» числа:

```ts
import { getBaseXp, getBaseInterval, getBasePrice } from '@/data/economy';

getBaseXp('woodcutting.oak_logs');       // 14
getBaseInterval('woodcutting.oak_logs'); // 4000
getBasePrice('charcoal');                // 3
```

## 🔧 Как расширять

### Добавить новое действие (новый навык/ресурс)

1. Добавить строку в `xp.ts` и `speed.ts` с ключом `${skill}.${itemId}`
2. Если предмет новый — добавить в `data/items/` (соответствующий подмодуль)
3. Если предмет новый — добавить цену в `prices.ts`

### Добавить новый источник бонусов

Допустим, хотим добавить **зелья скорости**:

**Шаг 1.** Расширить `EconomyContext` в `modifiers.ts`:

```ts
export interface EconomyContext {
  toolTier?: number;
  potions?: string[]; // ← новое
}
```

**Шаг 2.** Добавить таблицу:

```ts
export const POTION_BONUS: Record<string, BonusEntry> = {
  haste: { source: 'potion_haste', stat: 'speed', percent: 15 },
  xp_boost: { source: 'potion_xp', stat: 'xp', percent: 20 },
};
```

**Шаг 3.** Добавить в `collectBonuses`:

```ts
export function collectBonuses(ctx: EconomyContext): BonusEntry[] {
  const out: BonusEntry[] = [];
  if (ctx.toolTier && TOOL_TIER_BONUS[ctx.toolTier])
    out.push(TOOL_TIER_BONUS[ctx.toolTier]);
  // НОВОЕ:
  if (ctx.potions) {
    for (const p of ctx.potions) {
      if (POTION_BONUS[p]) out.push(POTION_BONUS[p]);
    }
  }
  return out;
}
```

Всё! Теперь `getEffectiveXp/Interval` подхватят зелья автоматически.

### Добавить новую погоду

В `modifiers.ts` раскомментировать нужную строку:

```ts
export const WEATHER_EFFECTS: Record<string, WeatherEffect> = {
  clear: {},
  rain: {
    speedMult: { woodcutting: 1.25 }, // дольше фармится
    xpMult: { woodcutting: 1.2 },     // но больше XP
    priceMult: { log: 1.2 },          // и дороже
  },
};
```

И добавить обработку в `collectBonuses`.

### Настроить баланс

**Цены:** править `prices.ts`  
**XP:** править `xp.ts`  
**Скорость:** править `speed.ts`  
**Сила бонусов:** править таблицы в `modifiers.ts`  
**Капы:** править `MAX_BONUS_PERCENT` в `modifiers.ts`

## ⚠️ Правила

1. **Не дублируй числа.** Если число — цена/Xp/скорость, оно только в одном файле.
2. **Используй `actionKey(skill, itemId)`** для единообразия ключей.
3. **Капы существуют** (`MAX_BONUS_PERCENT`) — не обходи их в коде.
4. **Стекание бонусов аддитивное** (проценты складываются). Если нужен мультипликативный — добавь новый тип `BonusStat`.
5. **`getEffectiveInterval` имеет минимум 200мс** — чтобы не получить бесконечную скорость.

## 🔮 Будущее

Почва заложена под:

- **Погода** (в `modifiers.ts` уже есть заготовка `WEATHER_EFFECTS`)
- **Зелья** (`POTION_BONUS` добавляется по шаблону выше)
- **Заточка инструментов** (новая таблица + поле в `EconomyContext`)
- **Бижутерия/броня** (аналогично, новая таблица + поля)
- **Бафы гильдии** (новая таблица)
- **Аукцион** (отдельная система, читает `getBasePrice` как ориентир)

Сигнатуры `getEffectiveXp/Interval/Price` при этом **не меняются** — просто расширяется `EconomyContext`.
```

---

Создай файл `data/economy/README.md`, удали `data/balance.ts` (после проверки отсутствия импортов) — и **первый шаг новой архитектуры закрыт**: у тебя готовая, расширяемая система экономики.

Когда захочешь подключать её к механикам (начиная с пилота `woodcutting`) — скажи, и я покажу, как именно заменить хардкод в skill-файлах на вызовы `getEffectiveXp/Interval`.