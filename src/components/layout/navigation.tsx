import { BarChart3, Compass, ListChecks, Settings2, Sparkles, Trophy } from 'lucide-react'
import type { NavSection } from '../../types'
import { cn } from '../../utilities/cn'

interface NavigationProps {
  section: NavSection
  onChange: (section: NavSection) => void
}

const sections: Array<{ label: NavSection; icon: typeof Sparkles }> = [
  { label: 'Dashboard', icon: Sparkles },
  { label: 'Achievements', icon: Trophy },
  { label: 'Quests', icon: ListChecks },
  { label: 'Stats', icon: BarChart3 },
  { label: 'Timeline', icon: Compass },
  { label: 'Settings', icon: Settings2 },
]

export function Navigation({ section, onChange }: NavigationProps) {
  return (
    <>
      <aside className="hidden h-screen w-72 shrink-0 border-r border-zinc-800 bg-zinc-950/70 p-6 lg:sticky lg:top-0 lg:block">
        <p className="mb-8 text-lg font-semibold text-zinc-100">Life Achievement Tracker</p>
        <nav className="space-y-2">
          {sections.map(({ label, icon: Icon }) => (
            <button
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-all',
                section === label
                  ? 'bg-indigo-500/20 text-indigo-100 ring-1 ring-indigo-400/40'
                  : 'text-zinc-300 hover:bg-zinc-900 hover:text-white',
              )}
              key={label}
              onClick={() => onChange(label)}
              type="button"
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800 bg-zinc-950/95 p-2 lg:hidden">
        <div className="grid grid-cols-6 gap-1">
          {sections.map(({ label, icon: Icon }) => (
            <button
              className={cn(
                'flex flex-col items-center rounded-lg px-1 py-2 text-[11px] transition-colors',
                section === label ? 'bg-indigo-500/20 text-indigo-200' : 'text-zinc-400',
              )}
              key={label}
              onClick={() => onChange(label)}
              type="button"
            >
              <Icon size={14} />
              <span className="mt-1">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
