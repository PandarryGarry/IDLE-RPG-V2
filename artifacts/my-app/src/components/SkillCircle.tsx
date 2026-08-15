import React from 'react';
import { usePlayerStore } from '@/store/playerStore';
import { useGameStore } from '@/store/gameStore';
import { getSkillIcon } from '@/lib/icons';
import { SkillId } from '@/data/types';
import { cn } from '@/lib/utils';

interface SkillCircleProps {
  skillId: SkillId;
  size?: 'sm' | 'md' | 'lg';
  showLevel?: boolean;
  className?: string;
}

const SIZE_CONFIG = {
  sm: { container: 'w-11 h-11', svg: 'w-full h-full', radius: 18, strokeWidth: 3, icon: 'text-lg', levelBox: 'text-[9px] px-1 py-0.5' },
  md: { container: 'w-14 h-14', svg: 'w-full h-full', radius: 24, strokeWidth: 3.5, icon: 'text-2xl', levelBox: 'text-[10px] px-1.5 py-0.5' },
  lg: { container: 'w-18 h-18', svg: 'w-full h-full', radius: 30, strokeWidth: 4, icon: 'text-3xl', levelBox: 'text-xs px-2 py-0.5' },
};

export function SkillCircle({ skillId, size = 'md', showLevel = true, className }: SkillCircleProps) {
  const config = SIZE_CONFIG[size];
  const circumference = 2 * Math.PI * config.radius;

  const level = usePlayerStore(s => s.skills[skillId]?.level ?? 0);
  const xp = usePlayerStore(s => s.skills[skillId]?.xp ?? 0);
  const activeSkill = useGameStore(s => s.activeSkill);
  const isActive = activeSkill === skillId;

  // XP progress (0-1) для кольца. Max level = 99 → 100% прогресс
  const progress = level >= 99 ? 1 : Math.min(xp / (level * 100 + 100), 1);
  const offset = circumference - progress * circumference;

  const viewBoxSize = (config.radius + config.strokeWidth) * 2;

  return (
    <div className={cn('relative flex flex-col items-center', className)}>
      {/* Круг с SVG-кольцом */}
      <div
        className={cn(
          'relative flex items-center justify-center transition-all',
          config.container,
          isActive ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]'
        )}
      >
        <svg className={cn('absolute inset-0', config.svg)} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
          {/* Фоновое кольцо */}
          <circle
            cx={viewBoxSize / 2}
            cy={viewBoxSize / 2}
            r={config.radius}
            className="stroke-muted fill-none"
            strokeWidth={config.strokeWidth}
          />
          {/* Прогресс-кольцо */}
          <circle
            cx={viewBoxSize / 2}
            cy={viewBoxSize / 2}
            r={config.radius}
            className={cn(
              'fill-none transition-all duration-300',
              isActive ? 'stroke-primary' : 'stroke-primary/50'
            )}
            strokeWidth={config.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${viewBoxSize / 2} ${viewBoxSize / 2})`}
          />
        </svg>

        {/* Иконка в центре */}
        <div
          className={cn(
            'relative z-10 rounded-full flex items-center justify-center border-2 transition-all',
            size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-11 h-11' : 'w-14 h-14',
            isActive
              ? 'bg-primary/20 border-primary shadow-[0_0_12px_rgba(34,211,238,0.4)]'
              : 'bg-background border-border group-hover:border-primary/40'
          )}
        >
          <span className={config.icon}>{getSkillIcon(skillId)}</span>
        </div>
      </div>

      {/* Уровень в карточке */}
      {showLevel && (
        <div
          className={cn(
            'mt-1 font-mono font-black rounded-md border leading-tight',
            config.levelBox,
            isActive
              ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_6px_rgba(34,211,238,0.4)]'
              : 'bg-background/80 text-foreground border-border'
          )}
        >
          {level}
        </div>
      )}
    </div>
  );
}
