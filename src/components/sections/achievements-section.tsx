import { type ReactNode, useMemo, useState } from 'react'
import { categories, rarityOrder } from '../../data/defaultData'
import type { Achievement, GeneratedAchievement, Rarity } from '../../types'
import { generateAchievementFromText } from '../../utilities/achievementGenerator'
import { fromInputDate, toInputDate } from '../../utilities/format'
import { AchievementCard } from './achievement-card'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { Input } from '../ui/input'
import { Select } from '../ui/select'
import { Textarea } from '../ui/textarea'

interface AchievementsSectionProps {
  achievements: Achievement[]
  onToggleUnlock: (achievement: Achievement) => void
  onAddAchievement: (achievement: Achievement) => void
}

type LockedFilter = 'all' | 'unlocked' | 'locked'

const initialForm = {
  title: '',
  description: '',
  category: categories[0],
  rarity: 'Common' as Rarity,
  xp: 50,
  date: new Date().toISOString().slice(0, 10),
  location: '',
  icon: 'Sparkles',
  secret: false,
  unlocked: true,
}

export function AchievementsSection({ achievements, onToggleUnlock, onAddAchievement }: AchievementsSectionProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [rarity, setRarity] = useState('all')
  const [lockedFilter, setLockedFilter] = useState<LockedFilter>('all')
  const [form, setForm] = useState(initialForm)
  const [generatorInput, setGeneratorInput] = useState('')
  const [generated, setGenerated] = useState<GeneratedAchievement | null>(null)

  const filtered = useMemo(
    () =>
      achievements.filter((achievement) => {
        const searchText = `${achievement.title} ${achievement.description}`.toLowerCase()
        const matchesSearch = searchText.includes(search.toLowerCase())
        const matchesCategory = category === 'all' || achievement.category === category
        const matchesRarity = rarity === 'all' || achievement.rarity === rarity
        const matchesLocked =
          lockedFilter === 'all' ||
          (lockedFilter === 'unlocked' && achievement.unlocked) ||
          (lockedFilter === 'locked' && !achievement.unlocked)

        return matchesSearch && matchesCategory && matchesRarity && matchesLocked
      }),
    [achievements, category, lockedFilter, rarity, search],
  )

  function createAchievement(data: typeof form) {
    if (!data.title.trim() || !data.description.trim()) {
      return
    }

    onAddAchievement({
      id: `custom-${crypto.randomUUID()}`,
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category,
      rarity: data.rarity,
      xp: Math.max(1, data.xp),
      date: data.unlocked ? fromInputDate(data.date) : undefined,
      location: data.location.trim() || undefined,
      icon: data.icon.trim() || 'Sparkles',
      secret: data.secret,
      unlocked: data.unlocked,
    })

    setForm(initialForm)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-4">
        <label className="space-y-1 text-xs text-zinc-400">
          Search
          <Input aria-label="Search achievements" onChange={(event) => setSearch(event.target.value)} value={search} />
        </label>
        <label className="space-y-1 text-xs text-zinc-400">
          Category
          <Select aria-label="Filter by category" onChange={(event) => setCategory(event.target.value)} value={category}>
            <option value="all">All</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </label>
        <label className="space-y-1 text-xs text-zinc-400">
          Rarity
          <Select aria-label="Filter by rarity" onChange={(event) => setRarity(event.target.value)} value={rarity}>
            <option value="all">All</option>
            {rarityOrder.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </label>
        <label className="space-y-1 text-xs text-zinc-400">
          Status
          <Select
            aria-label="Filter by status"
            onChange={(event) => setLockedFilter(event.target.value as LockedFilter)}
            value={lockedFilter}
          >
            <option value="all">All</option>
            <option value="unlocked">Unlocked</option>
            <option value="locked">Locked</option>
          </Select>
        </label>
      </div>

      <div className="flex flex-wrap gap-3">
        <Dialog
          title="Add Achievement"
          trigger={<Button type="button">Add Achievement</Button>}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <FormField label="Title">
              <Input value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} />
            </FormField>
            <FormField label="Category">
              <Select
                value={form.category}
                onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value as Achievement['category'] }))}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Description" className="md:col-span-2">
              <Textarea
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              />
            </FormField>
            <FormField label="Rarity">
              <Select value={form.rarity} onChange={(event) => setForm((prev) => ({ ...prev, rarity: event.target.value as Rarity }))}>
                {rarityOrder.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="XP">
              <Input
                min={1}
                type="number"
                value={form.xp}
                onChange={(event) => setForm((prev) => ({ ...prev, xp: Number(event.target.value) }))}
              />
            </FormField>
            <FormField label="Date">
              <Input
                type="date"
                value={toInputDate(form.date)}
                onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
              />
            </FormField>
            <FormField label="Location">
              <Input
                value={form.location}
                onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
              />
            </FormField>
            <FormField label="Icon">
              <Input value={form.icon} onChange={(event) => setForm((prev) => ({ ...prev, icon: event.target.value }))} />
            </FormField>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                checked={form.secret}
                className="h-4 w-4"
                onChange={(event) => setForm((prev) => ({ ...prev, secret: event.target.checked }))}
                type="checkbox"
              />
              Secret
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <input
                checked={form.unlocked}
                className="h-4 w-4"
                onChange={(event) => setForm((prev) => ({ ...prev, unlocked: event.target.checked }))}
                type="checkbox"
              />
              Unlocked
            </label>
          </div>
          <Button className="mt-4 w-full" onClick={() => createAchievement(form)} type="button">
            Save achievement
          </Button>
        </Dialog>

        <Dialog title="Achievement Generator" trigger={<Button variant="secondary">Achievement Generator</Button>}>
          <div className="space-y-3">
            <label className="block text-xs text-zinc-400" htmlFor="generator-input">
              Describe what you did
            </label>
            <Textarea
              id="generator-input"
              value={generatorInput}
              onChange={(event) => setGeneratorInput(event.target.value)}
              placeholder="I called the German police for the first time because of extremely loud music."
            />
            <Button onClick={() => setGenerated(generateAchievementFromText(generatorInput))} type="button">
              Generate
            </Button>

            {generated ? (
              <div className="space-y-2 rounded-xl border border-zinc-700 bg-zinc-900/80 p-4">
                <Input
                  aria-label="Generated title"
                  value={generated.title}
                  onChange={(event) => setGenerated((prev) => (prev ? { ...prev, title: event.target.value } : prev))}
                />
                <Textarea
                  aria-label="Generated description"
                  value={generated.description}
                  onChange={(event) =>
                    setGenerated((prev) => (prev ? { ...prev, description: event.target.value } : prev))
                  }
                />
                <div className="grid gap-2 sm:grid-cols-3">
                  <Select
                    aria-label="Generated category"
                    value={generated.category}
                    onChange={(event) =>
                      setGenerated((prev) =>
                        prev ? { ...prev, category: event.target.value as Achievement['category'] } : prev,
                      )
                    }
                  >
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                  <Select
                    aria-label="Generated rarity"
                    value={generated.rarity}
                    onChange={(event) => setGenerated((prev) => (prev ? { ...prev, rarity: event.target.value as Rarity } : prev))}
                  >
                    {rarityOrder.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                  <Input
                    aria-label="Generated XP"
                    type="number"
                    min={1}
                    value={generated.xp}
                    onChange={(event) => setGenerated((prev) => (prev ? { ...prev, xp: Number(event.target.value) } : prev))}
                  />
                </div>

                <Button
                  onClick={() =>
                    onAddAchievement({
                      id: `gen-${crypto.randomUUID()}`,
                      title: generated.title,
                      description: generated.description,
                      category: generated.category,
                      rarity: generated.rarity,
                      xp: Math.max(1, generated.xp),
                      date: new Date().toISOString().slice(0, 10),
                      icon: generated.icon,
                      unlocked: true,
                      secret: false,
                    })
                  }
                  type="button"
                >
                  Save generated achievement
                </Button>
              </div>
            ) : null}
          </div>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((achievement) => (
          <AchievementCard achievement={achievement} key={achievement.id} onToggle={onToggleUnlock} />
        ))}
      </div>
    </div>
  )
}

function FormField({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={`space-y-1 text-xs text-zinc-400 ${className ?? ''}`}>
      {label}
      {children}
    </label>
  )
}
