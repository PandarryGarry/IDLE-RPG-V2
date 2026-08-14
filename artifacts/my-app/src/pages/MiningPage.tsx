import { useGameStore } from '@/store/gameStore';
import { useBankStore } from '@/store/bankStore';
import { ROCKS, MINING_ROCKS_MAP } from '@/data/mining';
import { getItem } from '@/data/items';
import { SkillScreen } from '@/components/skills/SkillScreen';
import { useTranslation } from '@/hooks/useTranslation';
import type { ResourceInfo, MiningRock } from '@/data/types';

export function MiningPage() {
  const { t } = useTranslation();

  const startSkillAction = useGameStore(s => s.startSkillAction);
  const stopAction = useGameStore(s => s.stopAction);
  const activeSkill = useGameStore(s => s.activeSkill);
  const activeActionId = useGameStore(s => s.activeActionId);

  const handleActionClick = (actionId: string) => {
    if (activeSkill === 'mining' && activeActionId === actionId) {
      stopAction();
    } else {
      startSkillAction('mining', actionId);
    }
  };

  const activeRock = activeActionId ? MINING_ROCKS_MAP[activeActionId] : undefined;
  const isTraining = activeSkill === 'mining' && !!activeRock;

  // Информация о ресурсе (руда)
  const activeOreId = activeRock?.oreId ?? null;
  const inInventory = useBankStore(s =>
    activeOreId ? (s.items.find(i => i.itemId === activeOreId)?.quantity ?? 0) : 0
  );

  const oreItem = activeRock ? getItem(activeRock.oreId) : undefined;
  const resourceInfo: ResourceInfo | undefined = activeRock && oreItem ? {
    icon: oreItem.icon ?? '🪨',
    name: oreItem.name,
    sellValue: oreItem.sellValue,
    xp: activeRock.xp,
    qtyPerAction: '1',
    inInventory,
  } : undefined;

  // TODO: заменить на данные из toolStore
  const demoTool = {
    name: 'Бронзовая кирка',
    icon: '⛏️',
    tier: 2,
    durability: 140,
    maxDurability: 150,
    speedBonus: 5,
  };

  return (
    <SkillScreen
      skillId="mining"
      skillName={t('skill.mining')}
      skillIcon="⛏️"
      isTraining={isTraining}
      activeAction={activeRock}
      onStop={stopAction}
      toolName={demoTool.name}
      toolIcon={demoTool.icon}
      toolTier={demoTool.tier}
      toolDurability={demoTool.durability}
      toolMaxDurability={demoTool.maxDurability}
      toolSpeedBonus={demoTool.speedBonus}
      resourceInfo={resourceInfo}
      actions={ROCKS}
      onActionClick={handleActionClick}
      actionsTitle={t('mining.availableRocks')}
      // 💎 Шанс гема + цена руды на карточке
      renderActionExtra={(action) => {
        const rock = action as MiningRock;
        const ore = getItem(rock.oreId);
        return (
          <div className="w-full space-y-0.5">
            {rock.gemChance && (
              <div className="text-[10px] font-mono font-bold text-purple-400">
                💎 {((rock.gemChance ?? 0) * 100).toFixed(1)}% гем
              </div>
            )}
            {ore && (
              <div className="text-[10px] font-mono font-bold text-yellow-400">
                💰 {ore.sellValue} GP/шт
              </div>
            )}
          </div>
        );
      }}
      t={t}
    />
  );
}
