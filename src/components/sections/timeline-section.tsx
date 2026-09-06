import type { Achievement, TimelineEvent } from '../../types'
import { formatDate } from '../../utilities/format'
import { Card } from '../ui/card'

interface TimelineSectionProps {
  achievements: Achievement[]
}

function toTimelineEvents(achievements: Achievement[]): TimelineEvent[] {
  return achievements
    .filter((achievement) => achievement.unlocked && achievement.date)
    .map((achievement) => ({
      id: achievement.id,
      date: achievement.date ?? new Date().toISOString().slice(0, 10),
      title: achievement.title,
      description: achievement.description,
      category: achievement.category,
      xp: achievement.xp,
    }))
    .sort((left, right) => (left.date < right.date ? 1 : -1))
}

export function TimelineSection({ achievements }: TimelineSectionProps) {
  const events = toTimelineEvents(achievements)

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card className="relative pl-10" key={event.id}>
          <span className="absolute left-4 top-8 h-3 w-3 rounded-full bg-indigo-400" />
          <p className="text-xs text-zinc-500">{formatDate(event.date)}</p>
          <h3 className="mt-1 text-lg font-semibold text-zinc-100">{event.title}</h3>
          <p className="mt-1 text-sm text-zinc-300">{event.description}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
            <span>{event.category}</span>
            <span>+{event.xp} XP</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
