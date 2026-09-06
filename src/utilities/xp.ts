export function getXpForLevel(level: number): number {
  if (level <= 1) {
    return 0
  }

  return 100 * (level - 1) * (level + 3)
}

export function getLevelFromXp(xp: number): number {
  let level = 1
  while (getXpForLevel(level + 1) <= xp) {
    level += 1
  }
  return level
}

export function getProgressToNextLevel(xp: number): {
  level: number
  currentLevelXP: number
  nextLevelXP: number
  progress: number
} {
  const level = getLevelFromXp(xp)
  const currentLevelXP = getXpForLevel(level)
  const nextLevelXP = getXpForLevel(level + 1)
  const progress = Math.max(0, Math.min(100, ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100))

  return { level, currentLevelXP, nextLevelXP, progress }
}

export function getLongestStreak(dates: string[]): number {
  if (dates.length === 0) {
    return 0
  }

  const uniqueSorted = [...new Set(dates)].sort()
  let longest = 1
  let current = 1

  for (let index = 1; index < uniqueSorted.length; index += 1) {
    const previous = new Date(uniqueSorted[index - 1]).getTime()
    const next = new Date(uniqueSorted[index]).getTime()
    const diffDays = Math.round((next - previous) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      current += 1
      longest = Math.max(longest, current)
    } else {
      current = 1
    }
  }

  return longest
}
