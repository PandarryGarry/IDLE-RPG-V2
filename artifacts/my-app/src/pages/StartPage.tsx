import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';

export default function StartPage() {
  const openAuthModal = useUIStore(s => s.openAuthModal);
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 text-3xl opacity-60 pointer-events-none">
        <span>🍄</span>
        <span>💀</span>
        <span>🌿</span>
        <span>🪨</span>
        <span>🔥</span>
      </div>

      <div className="relative z-10 max-w-md w-full px-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-2">
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

        <h2 className="text-xl font-bold mt-4 text-foreground/90">
          A multi-purpose UI system
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
          Create your own game UI easily with this professionally handcrafted Modular Game UI Kit.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={openAuthModal}
            className="flex-1 py-3 px-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-foreground font-semibold hover:bg-white/20 transition-all active:scale-95"
          >
            Log In
          </button>
          <button
            onClick={openAuthModal}
            className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold shadow-[0_4px_14px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] transition-all active:scale-95"
          >
            Play now
          </button>
        </div>

        <p className="mt-6 text-[10px] text-muted-foreground/50 font-mono tracking-widest">
          Modular Game UI Kit · IdleRPG
        </p>
      </div>
    </div>
  );
}