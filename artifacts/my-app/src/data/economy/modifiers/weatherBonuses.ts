// ═══════════════════════════════════════════════════════════════
// ПОГОДНЫЕ ЭФФЕКТЫ (заглушка для будущей системы погоды)
// Погода может влиять на: скорость, XP, цену определённых ресурсов.
// ═══════════════════════════════════════════════════════════════

export interface WeatherEffect {
  speedMult?: Record<string, number>;   // skill → множитель
  xpMult?: Record<string, number>;      // skill → множитель
  priceMult?: Record<string, number>;   // category → множитель
}

export const WEATHER_EFFECTS: Record<string, WeatherEffect> = {
  clear: {},
  // rain: {
  //   speedMult: { woodcutting: 1.25 },  // на 25% медленнее
  //   xpMult: { woodcutting: 1.2 },      // но на 20% больше XP
  //   priceMult: { log: 1.2 },           // и на 20% дороже
  // },
  // fog: {
  //   speedMult: { fishing: 0.9 },       // на 10% быстрее
  //   priceMult: { raw_fish: 0.9 },      // но на 10% дешевле
  // },
};
