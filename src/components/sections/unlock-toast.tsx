import type { Achievement } from '../../types'
import { createElement } from 'react'
import { getIcon } from '../../utilities/icons'

interface UnlockToastProps {
  achievement: Achievement
  visible: boolean
  animationsEnabled: boolean
}

export function UnlockToast({ achievement, visible, animationsEnabled }: UnlockToastProps) {
  const icon = getIcon(achievement.icon)

  return (
    <div
      className={`pointer-events-none fixed right-4 top-4 z-50 w-[320px] rounded-2xl border border-emerald-500/40 bg-zinc-900/95 p-4 shadow-2xl transition-all ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      }`}
      role="status"
    >
      <p className="text-xs tracking-widest text-emerald-200">🏆 ACHIEVEMENT UNLOCKED</p>
      <div className="mt-2 flex items-center gap-3">
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-2">
          {createElement(icon, { className: 'text-emerald-200', size: 20 })}
        </div>
        <div>
          <p className="font-semibold text-zinc-100">{achievement.title}</p>
          <p className="text-sm text-zinc-300">+{achievement.xp} XP • {achievement.rarity}</p>
        </div>
      </div>
      {animationsEnabled ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, index) => (
            <span
              className="absolute h-1.5 w-1.5 rounded-full bg-emerald-300/70 animate-ping"
              key={`particle-${index}`}
              style={{ left: `${14 + index * 11}%`, top: `${14 + (index % 4) * 18}%`, animationDelay: `${index * 120}ms` }}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
