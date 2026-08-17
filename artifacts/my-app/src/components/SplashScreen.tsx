import { useEffect } from 'react';
import { useUIStore } from '@/store/uiStore';

export function SplashScreen() {
  const hideSplash = useUIStore(s => s.hideSplash);

  useEffect(() => {
    // Автоматически скрываем сплеш через 1.5 секунды
    const timer = setTimeout(() => {
      hideSplash();
    }, 1500);

    return () => clearTimeout(timer);
  }, [hideSplash]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center">
      {/* Dot-паттерн (как в ките) */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Логотип */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/40 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
            <span className="text-2xl">🔥</span>
          </div>
          <div className="flex flex-col leading-tight">
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              Idle<span className="text-indigo-400">RPG</span>
            </h1>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              v2.1
            </span>
          </div>
        </div>

        {/* Прогресс-бар (индиго) */}
        <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: '100%' }}
          />
        </div>

        <p className="text-xs text-muted-foreground font-mono animate-pulse">
          Загрузка...
        </p>
      </div>
    </div>
  );
}