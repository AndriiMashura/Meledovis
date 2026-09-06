import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { Stats } from '../../types'
import { Card } from '../ui/card'

const colors = ['#60a5fa', '#22d3ee', '#818cf8', '#a78bfa', '#f59e0b', '#34d399']

interface StatsSectionProps {
  stats: Stats
}

export function StatsSection({ stats }: StatsSectionProps) {
  const byCategory = Object.entries(stats.byCategory).map(([name, value]) => ({ name, value }))
  const xpByCategory = Object.entries(stats.xpByCategory).map(([name, value]) => ({ name, value }))

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card>
        <h3 className="text-lg font-semibold text-zinc-100">Overall Progress</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="Total XP" value={stats.totalXP.toLocaleString()} />
          <Stat label="Current Level" value={String(stats.level)} />
          <Stat label="Unlocked" value={String(stats.unlockedCount)} />
          <Stat label="Remaining" value={String(stats.remainingCount)} />
          <Stat label="Completion" value={`${stats.completionPercentage.toFixed(1)}%`} />
          <Stat label="Longest Streak" value={`${stats.longestStreak} days`} />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-zinc-100">Achievements by Category</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={100}>
                {byCategory.map((entry, index) => (
                  <Cell fill={colors[index % colors.length]} key={entry.name} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="xl:col-span-2">
        <h3 className="text-lg font-semibold text-zinc-100">XP by Category</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer>
            <BarChart data={xpByCategory}>
              <XAxis dataKey="name" stroke="#71717a" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
              <YAxis stroke="#71717a" tick={{ fill: '#a1a1aa' }} />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-zinc-100">{value}</p>
    </div>
  )
}
