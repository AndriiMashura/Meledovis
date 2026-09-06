import { CalendarDays, MapPin, Star } from 'lucide-react'
import { createElement } from 'react'
import { featuredAchievementId, profile } from '../../data/defaultData'
import type { Achievement, Quest, Stats } from '../../types'
import { formatDate } from '../../utilities/format'
import { getIcon } from '../../utilities/icons'
import { Card } from '../ui/card'

interface DashboardSectionProps {
  achievements: Achievement[]
  stats: Stats
  quests: Quest[]
}

function getDaysSince(date: string): number {
  const start = new Date(date)
  const today = new Date()
  return Math.max(0, Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
}

function getCountdown(targetMonth: number, targetDay: number): { label: string; daysLeft: number } {
  const today = new Date()
  const currentYear = today.getFullYear()
  const candidate = new Date(currentYear, targetMonth - 1, targetDay)
  if (candidate < today) {
    candidate.setFullYear(currentYear + 1)
  }
  const daysLeft = Math.ceil((candidate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  return { label: `${targetDay.toString().padStart(2, '0')}.${targetMonth.toString().padStart(2, '0')}.${candidate.getFullYear()}`, daysLeft }
}

export function DashboardSection({ achievements, stats, quests }: DashboardSectionProps) {
  const featured = achievements.find((achievement) => achievement.id === featuredAchievementId) ?? achievements[0]
  const featuredIcon = getIcon(featured.icon)
  const daysSinceArrival = getDaysSince(profile.arrivalDate)
  const daysSinceLiving = getDaysSince(profile.livingStartDate)
  const oneYear = getCountdown(9, 8)

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_50%)]" />
        <div className="relative z-10">
          <p className="text-sm uppercase tracking-wide text-indigo-200">Character</p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-50">{profile.name}</h1>
          <p className="mt-1 text-zinc-300">{profile.subtitle}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <StatPill label="Level" value={`Lv. ${stats.level}`} />
            <StatPill label="Total XP" value={stats.totalXP.toLocaleString()} />
            <StatPill label="Next level" value={`${stats.nextLevelXP - stats.totalXP} XP`} />
          </div>

          <div className="mt-5">
            <div className="mb-2 flex justify-between text-xs text-zinc-400">
              <span>{stats.currentLevelXP} XP</span>
              <span>{stats.nextLevelXP} XP</span>
            </div>
            <div className="h-3 rounded-full bg-zinc-800">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400"
                style={{ width: `${((stats.totalXP - stats.currentLevelXP) / (stats.nextLevelXP - stats.currentLevelXP)) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <StatPill label="Unlocked" value={String(stats.unlockedCount)} />
            <StatPill label="Secret" value={String(achievements.filter((achievement) => achievement.secret).length)} />
            <StatPill label="Active quests" value={String(quests.filter((quest) => quest.status === 'In Progress').length)} />
          </div>
        </div>
      </Card>

      <Card className="border-emerald-700/40">
        <p className="text-sm uppercase tracking-wide text-emerald-200">Latest Achievement</p>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-50">{featured.title}</h2>
            <p className="mt-2 max-w-xl text-zinc-300">{featured.description}</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3">
            {createElement(featuredIcon, { className: 'text-emerald-200', size: 28 })}
          </div>
        </div>
        <div className="mt-4 grid gap-3 text-sm text-zinc-300 sm:grid-cols-2 lg:grid-cols-4">
          <Meta icon={MapPin} label={featured.location ?? 'Weimar, Deutschland'} />
          <Meta icon={CalendarDays} label={featured.date ? formatDate(featured.date) : '05.09.2026'} />
          <Meta icon={Star} label={featured.metadata?.reward ?? '+50 XP'} />
          <Meta icon={Star} label={featured.rarity} />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-zinc-100">One-Year Milestones</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <StatPill label="Days since arrival (08.09.2025)" value={String(daysSinceArrival)} />
          <StatPill label="Days living in Germany (16.09.2025)" value={String(daysSinceLiving)} />
          <StatPill label={`1 Year in Germany (${oneYear.label})`} value={`${oneYear.daysLeft} days`} />
        </div>
      </Card>
    </div>
  )
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-zinc-100">{value}</p>
    </div>
  )
}

function Meta({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/70 px-3 py-2">
      <Icon size={14} className="text-zinc-500" />
      <span>{label}</span>
    </div>
  )
}
