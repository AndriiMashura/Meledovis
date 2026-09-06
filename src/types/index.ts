export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Secret'

export type AchievementCategory =
  | 'Germany Journey'
  | 'Languages'
  | 'Education & Engineering'
  | 'Career'
  | 'Fitness'
  | 'Travel'
  | 'Personal Growth'
  | 'Random Life'

export interface Achievement {
  id: string
  title: string
  description: string
  category: AchievementCategory
  rarity: Rarity
  xp: number
  date?: string
  icon: string
  unlocked: boolean
  secret: boolean
  location?: string
  metadata?: Record<string, string>
}

export type QuestStatus = 'In Progress' | 'Completed' | 'Planned'

export interface Quest {
  id: string
  title: string
  description: string
  status: QuestStatus
  progress: string
  targetDate?: string
}

export interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  category: AchievementCategory
  xp: number
}

export interface UserProfile {
  name: string
  subtitle: string
  arrivalDate: string
  livingStartDate: string
}

export interface Settings {
  darkMode: boolean
  animations: boolean
  sound: boolean
}

export interface Stats {
  totalXP: number
  level: number
  currentLevelXP: number
  nextLevelXP: number
  completionPercentage: number
  unlockedCount: number
  remainingCount: number
  byCategory: Record<string, number>
  byRarity: Record<string, number>
  xpByCategory: Record<string, number>
  longestStreak: number
}

export type NavSection = 'Dashboard' | 'Achievements' | 'Quests' | 'Stats' | 'Timeline' | 'Settings'

export interface GeneratedAchievement {
  title: string
  description: string
  category: AchievementCategory
  rarity: Rarity
  xp: number
  icon: string
}
