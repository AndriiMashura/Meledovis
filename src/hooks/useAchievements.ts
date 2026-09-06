import { useMemo } from 'react'
import { defaultAchievements } from '../data/defaultData'
import type { Achievement, Stats } from '../types'
import { getLongestStreak, getProgressToNextLevel } from '../utilities/xp'
import { useLocalStorage } from './useLocalStorage'

export function useAchievements() {
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('lat:achievements', defaultAchievements)

  const unlocked = useMemo(() => achievements.filter((achievement) => achievement.unlocked), [achievements])
  const totalXP = useMemo(
    () => unlocked.reduce((sum, achievement) => sum + achievement.xp, 0),
    [unlocked],
  )

  const stats = useMemo<Stats>(() => {
    const byCategory: Record<string, number> = {}
    const byRarity: Record<string, number> = {}
    const xpByCategory: Record<string, number> = {}

    achievements.forEach((achievement) => {
      byCategory[achievement.category] = (byCategory[achievement.category] ?? 0) + 1
      byRarity[achievement.rarity] = (byRarity[achievement.rarity] ?? 0) + 1
      if (achievement.unlocked) {
        xpByCategory[achievement.category] = (xpByCategory[achievement.category] ?? 0) + achievement.xp
      }
    })

    const unlockedCount = unlocked.length
    const remainingCount = achievements.length - unlockedCount
    const completionPercentage = achievements.length === 0 ? 0 : (unlockedCount / achievements.length) * 100

    const progress = getProgressToNextLevel(totalXP)

    return {
      totalXP,
      level: progress.level,
      currentLevelXP: progress.currentLevelXP,
      nextLevelXP: progress.nextLevelXP,
      completionPercentage,
      unlockedCount,
      remainingCount,
      byCategory,
      byRarity,
      xpByCategory,
      longestStreak: getLongestStreak(unlocked.map((achievement) => achievement.date).filter(Boolean) as string[]),
    }
  }, [achievements, totalXP, unlocked])

  function updateAchievement(nextAchievement: Achievement): void {
    setAchievements((previous) =>
      previous.map((achievement) => (achievement.id === nextAchievement.id ? nextAchievement : achievement)),
    )
  }

  function addAchievement(achievement: Achievement): void {
    setAchievements((previous) => [achievement, ...previous])
  }

  function resetAchievements(): void {
    setAchievements(defaultAchievements)
  }

  return {
    achievements,
    setAchievements,
    updateAchievement,
    addAchievement,
    unlocked,
    stats,
  totalXP,
    resetAchievements,
  }
}
