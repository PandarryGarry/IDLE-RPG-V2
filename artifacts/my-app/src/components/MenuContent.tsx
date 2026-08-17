import React from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation } from '@/hooks/useTranslation';
import { usePlayerStore } from '@/store/playerStore';
import { useGameStore } from '@/store/gameStore';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { SkillId, COMBAT_SKILLS, GATHERING_SKILLS, CRAFTING_SKILLS, OTHER_SKILLS } from '@/data/types';
import { SkillCircle } from '@/components/SkillCircle';
import { getGroupIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { Home, User, Backpack, Coins, Store, Settings, Flame, LogIn, UserCircle, LogOut } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// ЛОГОТИП (индиго, как акценты инвентаря)
// ═══════════════════════════════════════════════════════════════

export function MenuLogo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/" onClick={onNavigate} className="flex items-center gap-2.5 group">
      <div className="w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/40 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.25)] group-hover:shadow-[0_0_14px_rgba(99,102,241,0.4)] transition-shadow">
        <Flame className="w-5 h-5" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-black text-base tracking-tight text-foreground">
          Idle<span className="text-indigo-400">RPG</span>
        </span>
        <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
          v2.1
        </span>
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════
// ЭЛЕМЕНТ НАВИГАЦИИ (карточка как в ките: иконка + подпись)
// ═══════════════════════════════════════════════════════════════

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  accentColor: string;
  onNavigate?: () => void;
}

function NavItem({ href, icon, label, accentColor, onNavigate }: NavItemProps) {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <Link href={href} onClick={onNavigate} className="block">
      <div
        className={cn(
          'flex flex-col items-center gap-1.5 p-3 md:p-2.5 min-h-[70px] md:min-h-0 rounded-xl transition-all',
          isActive
            ? 'bg-white/10 shadow-sm'
            : 'bg-white/5 hover:bg-white/10 active:scale-95'
        )}
      >
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center transition-all',
            isActive ? accentColor : 'bg-white/10 text-muted-foreground'
          )}
        >
          {icon}
        </div>
        <span
          className={cn(
            'text-[10px] font-bold leading-tight text-center truncate w-full',
            isActive ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════
// CIRCLE ДЛЯ COMBAT (все ведут на /combat)
// ═══════════════════════════════════════════════════════════════

function CombatCircle({ href, skillId, onNavigate }: { href: string; skillId: SkillId; onNavigate?: () => void }) {
  return (
    <Link href={href} onClick={onNavigate} className="block group min-h-[56px] md:min-h-0">
      <div className="flex items-center justify-center p-1.5 md:p-1 rounded-xl transition-all hover:bg-white/10 active:scale-95">
        <SkillCircle skillId={skillId} size="sm" showLevel={true} />
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════
// СТРОКА НАВЫКА (круг + имя + уровень справа)
// ═══════════════════════════════════════════════════════════════

function SkillRow({ href, skillId, onNavigate }: { href: string; skillId: SkillId; onNavigate?: () => void }) {
  const [location] = useLocation();
  const { t } = useTranslation();
  const isActive = location === href;
  const level = usePlayerStore(s => s.skills[skillId]?.level ?? 0);
  const activeSkill = useGameStore(s => s.activeSkill);
  const isTraining = activeSkill === skillId;
  const label = t(('skill.' + skillId) as any) ?? skillId;

  return (
    <Link href={href} onClick={onNavigate} className="block">
      <div
        className={cn(
          'flex items-center gap-2.5 md:gap-2 px-2 md:px-1.5 py-2 md:py-1.5 min-h-[44px] md:min-h-0 rounded-xl transition-all',
          isActive
            ? 'bg-white/10'
            : 'hover:bg-white/5 active:scale-[0.98]'
        )}
      >
        <SkillCircle skillId={skillId} size="sm" showLevel={false} />

        <span
          className={cn(
            'flex-1 text-sm md:text-[12px] font-semibold truncate',
            isActive ? 'text-indigo-300' : 'text-foreground/90'
          )}
        >
          {label}
        </span>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {isTraining && (
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_4px_rgba(129,140,248,1)]" />
          )}
          <span
            className={cn(
              'font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md',
              isActive
                ? 'bg-indigo-500 text-white'
                : 'bg-white/5 text-foreground'
            )}
          >
            {level}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════
// ЗАГОЛОВОК СЕКЦИИ
// ═══════════════════════════════════════════════════════════════

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2 px-1 mb-1 mt-2 md:mt-1 first:mt-0">
      <span className="text-sm">{icon}</span>
      <h3 className="text-[10px] font-black text-muted-foreground/80 uppercase tracking-wider">
        {title}
      </h3>
      <div className="flex-1 h-px bg-white/10 ml-1" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ОСНОВНАЯ НАЧИНКА МЕНЮ (общая для Sidebar и SideMenu)
// ═══════════════════════════════════════════════════════════════

export function MenuContent({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* ── НАВИГАЦИЯ (3×2) ── */}
      <div>
        <SectionTitle icon={getGroupIcon('all')} title={t('nav.navigation')} />
        <div className="grid grid-cols-3 gap-1.5">
          <NavItem href="/"          icon={<Home className="w-5 h-5 text-white" />}     label={t('nav.home')}      accentColor="bg-sky-600 text-white"     onNavigate={onNavigate} />
          <NavItem href="/character" icon={<User className="w-5 h-5 text-white" />}     label={t('nav.character')} accentColor="bg-violet-600 text-white"  onNavigate={onNavigate} />
          <NavItem href="/inventory" icon={<Backpack className="w-5 h-5 text-white" />} label={t('nav.inventory')} accentColor="bg-emerald-600 text-white" onNavigate={onNavigate} />
          <NavItem href="/bank"      icon={<Coins className="w-5 h-5 text-white" />}    label={t('nav.bank')}      accentColor="bg-amber-600 text-white"   onNavigate={onNavigate} />
          <NavItem href="/shop"      icon={<Store className="w-5 h-5 text-white" />}    label={t('nav.shop')}      accentColor="bg-rose-600 text-white"    onNavigate={onNavigate} />
          <NavItem href="/settings"  icon={<Settings className="w-5 h-5 text-white" />} label={t('nav.settings')}  accentColor="bg-slate-600 text-white"   onNavigate={onNavigate} />
        </div>
      </div>

      {/* ── COMBAT (4×2 круги, все → /combat) ── */}
      <div>
        <SectionTitle icon={getGroupIcon('combat')} title={t('group.combat')} />
        <div className="grid grid-cols-4 gap-1">
          {COMBAT_SKILLS.map(id => (
            <CombatCircle key={id} href="/combat" skillId={id} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      {/* ── GATHERING ── */}
      <div>
        <SectionTitle icon={getGroupIcon('gathering')} title={t('group.gathering')} />
        <div className="space-y-0.5">
          {GATHERING_SKILLS.map(id => (
            <SkillRow key={id} href={`/${id}`} skillId={id} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      {/* ── ARTISAN ── */}
      <div>
        <SectionTitle icon={getGroupIcon('artisan')} title={t('group.artisan')} />
        <div className="space-y-0.5">
          {CRAFTING_SKILLS.map(id => (
            <SkillRow key={id} href={`/${id}`} skillId={id} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      {/* ── OTHER ── */}
      <div>
        <SectionTitle icon={getGroupIcon('support')} title={t('group.other')} />
        <div className="space-y-0.5">
          {OTHER_SKILLS.map(id => (
            <SkillRow key={id} href={`/${id}`} skillId={id} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// КАРТОЧКА ИГРОКА (подвал меню)
// ═══════════════════════════════════════════════════════════════

export function PlayerCard({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation();
  const combatLevel = usePlayerStore(s => s.combatLevel);
  const { user, isAuthenticated, logout } = useAuthStore();
  const openAuthModal = useUIStore(s => s.openAuthModal);

  const handleLogout = () => {
    logout();
    if (onNavigate) onNavigate();
  };

  const handleSignIn = () => {
    openAuthModal();
    if (onNavigate) onNavigate(); // закрыть меню после открытия модалки
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
      <div className="w-9 h-9 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
        <UserCircle className="w-5 h-5 text-muted-foreground group-hover:text-indigo-300 transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-bold text-foreground truncate leading-tight">
          {isAuthenticated ? user?.name || t('auth.guest') : t('auth.guest')}
        </p>
        {isAuthenticated && (
          <p className="text-[9px] text-muted-foreground font-mono leading-tight">
            {getGroupIcon('combat')} {t('combat.combatLevel')}: {combatLevel}
          </p>
        )}
      </div>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/15 text-red-300 text-[10px] font-bold hover:bg-red-500/25 transition-colors"
        >
          <LogOut className="w-3 h-3" />
          {t('auth.logout') || 'Logout'}
        </button>
      ) : (
        <button
          onClick={handleSignIn}
          className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-500/15 text-indigo-300 text-[10px] font-bold hover:bg-indigo-500/25 transition-colors"
        >
          <LogIn className="w-3 h-3" />
          {t('auth.login')}
        </button>
      )}
    </div>
  );
}