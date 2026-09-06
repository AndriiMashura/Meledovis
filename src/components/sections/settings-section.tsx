import type { ChangeEvent } from 'react'
import type { Achievement, Quest, Settings } from '../../types'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Switch } from '../ui/switch'

interface SettingsSectionProps {
  settings: Settings
  onSettingsChange: (nextSettings: Settings) => void
  achievements: Achievement[]
  quests: Quest[]
  onImport: (payload: { achievements: Achievement[]; quests: Quest[]; settings: Settings }) => void
  onReset: () => void
}

export function SettingsSection({
  settings,
  onSettingsChange,
  achievements,
  quests,
  onImport,
  onReset,
}: SettingsSectionProps) {
  function handleExport(): void {
    const blob = new Blob([JSON.stringify({ achievements, quests, settings }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'life-achievement-tracker-export.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const parsed = JSON.parse(String(reader.result)) as {
        achievements: Achievement[]
        quests: Quest[]
        settings: Settings
      }
      onImport(parsed)
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-lg font-semibold text-zinc-100">Experience Settings</h3>
        <div className="mt-4 space-y-3">
          <SettingRow
            checked={settings.darkMode}
            label="Dark mode"
            onCheckedChange={(darkMode) => onSettingsChange({ ...settings, darkMode })}
          />
          <SettingRow
            checked={settings.animations}
            label="Animation toggle"
            onCheckedChange={(animations) => onSettingsChange({ ...settings, animations })}
          />
          <SettingRow checked={settings.sound} label="Sound toggle" onCheckedChange={(sound) => onSettingsChange({ ...settings, sound })} />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-zinc-100">Data Management</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={handleExport} type="button">
            Export JSON
          </Button>
          <label className="inline-flex cursor-pointer items-center rounded-xl bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-700">
            Import JSON
            <input className="sr-only" onChange={handleImport} type="file" accept="application/json" />
          </label>
          <Button onClick={onReset} type="button" variant="danger">
            Reset demo data
          </Button>
        </div>
      </Card>
    </div>
  )
}

function SettingRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
      <p className="text-sm text-zinc-200">{label}</p>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}
