import { defaultQuests } from '../data/defaultData'
import type { Quest } from '../types'
import { useLocalStorage } from './useLocalStorage'

export function useQuests() {
  const [quests, setQuests] = useLocalStorage<Quest[]>('lat:quests', defaultQuests)

  function updateQuest(nextQuest: Quest): void {
    setQuests((previous) => previous.map((quest) => (quest.id === nextQuest.id ? nextQuest : quest)))
  }

  function resetQuests(): void {
    setQuests(defaultQuests)
  }

  return { quests, updateQuest, setQuests, resetQuests }
}
