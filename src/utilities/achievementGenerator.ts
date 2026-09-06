import type { AchievementCategory, GeneratedAchievement } from '../types'

interface Rule {
  includes: string[]
  result: GeneratedAchievement
}

const rules: Rule[] = [
  {
    includes: ['police', 'polizei', 'noise', 'ruhestörung', 'loud music'],
    result: {
      title: 'First Contact: Polizei',
      description: 'Make your first independent contact with the German police.',
      category: 'Germany Journey',
      rarity: 'Uncommon',
      xp: 50,
      icon: 'ShieldCheck',
    },
  },
  {
    includes: ['german', 'deutsch', 'language'],
    result: {
      title: 'Sprachkraft',
      description: 'Push your German communication skills forward in a real-world context.',
      category: 'Languages',
      rarity: 'Rare',
      xp: 220,
      icon: 'Languages',
    },
  },
  {
    includes: ['job', 'career', 'interview', 'arbeit'],
    result: {
      title: 'Career Momentum',
      description: 'Take a meaningful step toward building your engineering career in Germany.',
      category: 'Career',
      rarity: 'Epic',
      xp: 380,
      icon: 'BriefcaseBusiness',
    },
  },
  {
    includes: ['gym', 'workout', 'training', 'fitness'],
    result: {
      title: 'Strength Session Logged',
      description: 'Show consistency by completing another focused fitness session.',
      category: 'Fitness',
      rarity: 'Uncommon',
      xp: 80,
      icon: 'Dumbbell',
    },
  },
]

function inferCategory(text: string): AchievementCategory {
  if (text.includes('germany') || text.includes('deutschland') || text.includes('visa')) {
    return 'Germany Journey'
  }

  if (text.includes('trip') || text.includes('travel') || text.includes('city')) {
    return 'Travel'
  }

  if (text.includes('project') || text.includes('linux') || text.includes('server')) {
    return 'Education & Engineering'
  }

  return 'Personal Growth'
}

export function generateAchievementFromText(text: string): GeneratedAchievement {
  const normalized = text.toLowerCase()
  const matchedRule = rules.find((rule) => rule.includes.some((term) => normalized.includes(term)))

  if (matchedRule) {
    return matchedRule.result
  }

  return {
    title: 'Momentum Captured',
    description: 'Turn an everyday win into measurable progress on your life journey.',
    category: inferCategory(normalized),
    rarity: 'Common',
    xp: 40,
    icon: 'Sparkles',
  }
}
