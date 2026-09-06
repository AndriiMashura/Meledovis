import { type ReactNode, useState } from 'react'
import { Navigation } from './components/layout/navigation'
import { AchievementsSection } from './components/sections/achievements-section'
import { DashboardSection } from './components/sections/dashboard-section'
import { QuestsSection } from './components/sections/quests-section'
import { SettingsSection } from './components/sections/settings-section'
import { StatsSection } from './components/sections/stats-section'
import { TimelineSection } from './components/sections/timeline-section'
import { UnlockToast } from './components/sections/unlock-toast'
import { defaultSettings } from './data/defaultData'
import { useAchievements } from './hooks/useAchievements'
import { useQuests } from './hooks/useQuests'
import { useSettings } from './hooks/useSettings'
import type { Achievement, NavSection, Settings } from './types'

const navDescriptions: Record<NavSection, string> = {
  Dashboard: 'Your current character state and latest progress',
  Achievements: 'Track, filter, unlock, and generate achievements',
  Quests: 'Manage long-term goals and progress milestones',
  Stats: 'Analyze your XP and completion progress',
  Timeline: 'A chronological view of your life journey',
  Settings: 'Customize visual, animation, sound, and data settings',
}

function playUnlockSound() {
  const audioContext = new AudioContext()
  const oscillator = audioContext.createOscillator()
  const gain = audioContext.createGain()

  oscillator.type = 'triangle'
  oscillator.frequency.value = 740
  gain.gain.value = 0.03

  oscillator.connect(gain)
  gain.connect(audioContext.destination)

  oscillator.start()
  oscillator.stop(audioContext.currentTime + 0.2)
}

function App() {
  const [section, setSection] = useState<NavSection>('Dashboard')
  const { settings, setSettings } = useSettings()
  const { achievements, addAchievement, updateAchievement, stats, resetAchievements, setAchievements } = useAchievements()
  const { quests, updateQuest, setQuests, resetQuests } = useQuests()
  const [unlockedToast, setUnlockedToast] = useState<Achievement | null>(null)
  const [toastVisible, setToastVisible] = useState(false)

  function handleUnlockVisuals(achievement: Achievement): void {
    setUnlockedToast(achievement)
    setToastVisible(true)
    window.setTimeout(() => setToastVisible(false), 3200)
    window.setTimeout(() => setUnlockedToast(null), 3500)
    if (settings.sound) {
      playUnlockSound()
    }
  }

  function toggleUnlock(achievement: Achievement): void {
    if (achievement.unlocked) {
      updateAchievement({ ...achievement, unlocked: false, date: undefined })
      return
    }

    const unlockedAchievement = {
      ...achievement,
      unlocked: true,
      date: achievement.date ?? new Date().toISOString().slice(0, 10),
    }
    updateAchievement(unlockedAchievement)
    handleUnlockVisuals(unlockedAchievement)
  }

  function handleAddAchievement(achievement: Achievement): void {
    addAchievement(achievement)
    if (achievement.unlocked) {
      handleUnlockVisuals(achievement)
    }
  }

  function handleImport(payload: { achievements: Achievement[]; quests: typeof quests; settings: Settings }): void {
    if (!payload.achievements || !payload.quests || !payload.settings) {
      return
    }

    setAchievements(payload.achievements)
    setQuests(payload.quests)
    setSettings(payload.settings)
  }

  function handleReset(): void {
    resetAchievements()
    resetQuests()
    setSettings(defaultSettings)
  }

  let content: ReactNode
  switch (section) {
    case 'Dashboard':
      content = <DashboardSection achievements={achievements} quests={quests} stats={stats} />
      break
    case 'Achievements':
      content = <AchievementsSection achievements={achievements} onAddAchievement={handleAddAchievement} onToggleUnlock={toggleUnlock} />
      break
    case 'Quests':
      content = <QuestsSection quests={quests} onUpdateQuest={updateQuest} />
      break
    case 'Stats':
      content = <StatsSection stats={stats} />
      break
    case 'Timeline':
      content = <TimelineSection achievements={achievements} />
      break
    case 'Settings':
      content = (
        <SettingsSection
          achievements={achievements}
          onImport={handleImport}
          onReset={handleReset}
          onSettingsChange={setSettings}
          quests={quests}
          settings={settings}
        />
      )
      break
    default:
      content = null
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-[1480px]">
        <Navigation section={section} onChange={setSection} />
        <main className="w-full px-4 pb-24 pt-6 sm:px-6 lg:pb-6 lg:pt-8">
          <header className="mb-6">
            <h2 className="text-2xl font-bold text-zinc-50">{section}</h2>
            <p className="mt-1 text-sm text-zinc-400">{navDescriptions[section]}</p>
          </header>

          <div className={`transition-all duration-300 ${settings.animations ? 'animate-fade-in' : ''}`}>{content}</div>
        </main>
      </div>

      {unlockedToast ? (
        <UnlockToast achievement={unlockedToast} animationsEnabled={settings.animations} visible={toastVisible} />
      ) : null}
    </div>
  )
}

export default App
