import { Lock } from 'lucide-react'
import { createElement } from 'react'
import type { Achievement } from '../../types'
import { cn } from '../../utilities/cn'
import { formatDate } from '../../utilities/format'
import { getIcon } from '../../utilities/icons'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

const rarityClass: Record<Achievement['rarity'], string> = {
  Common: 'border-zinc-700 text-zinc-200',
  Uncommon: 'border-emerald-600/50 text-emerald-200',
  Rare: 'border-sky-600/50 text-sky-200',
  Epic: 'border-violet-600/50 text-violet-200',
  Legendary: 'border-amber-500/60 text-amber-200',
  Secret: 'border-fuchsia-600/50 text-fuchsia-200',
}

interface AchievementCardProps {
  achievement: Achievement
  onToggle: (achievement: Achievement) => void
}

export function AchievementCard({ achievement, onToggle }: AchievementCardProps) {
  const icon = getIcon(achievement.icon)
  const isLocked = !achievement.unlocked

  return (
    <Card
      className={cn(
        'group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/10',
        isLocked && 'opacity-70',
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className={cn('rounded-xl border p-2 transition-transform group-hover:scale-105', rarityClass[achievement.rarity])}>
          {isLocked ? <Lock size={20} /> : createElement(icon, { size: 20 })}
        </div>
        <span className={cn('rounded-full border px-2 py-1 text-xs font-medium', rarityClass[achievement.rarity])}>
          {achievement.rarity}
        </span>
      </div>

      <h3 className="text-base font-semibold text-zinc-100">{isLocked && achievement.secret ? '???' : achievement.title}</h3>
      <p className="mt-2 text-sm text-zinc-400">
        {isLocked && achievement.secret ? 'Hidden until unlocked.' : achievement.description}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-zinc-400">
        <span>{achievement.category}</span>
        <span className="text-right font-semibold text-zinc-200">+{achievement.xp} XP</span>
        <span>{achievement.unlocked && achievement.date ? formatDate(achievement.date) : 'Locked'}</span>
        <span className="text-right">{achievement.location ?? '—'}</span>
      </div>

      <Button className="mt-4 w-full" onClick={() => onToggle(achievement)} variant={achievement.unlocked ? 'secondary' : 'default'}>
        {achievement.unlocked ? 'Mark Locked' : 'Unlock'}
      </Button>
    </Card>
  )
}
