import type { Quest } from '../../types'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Select } from '../ui/select'
import { Textarea } from '../ui/textarea'

interface QuestsSectionProps {
  quests: Quest[]
  onUpdateQuest: (quest: Quest) => void
}

export function QuestsSection({ quests, onUpdateQuest }: QuestsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {quests.map((quest) => (
        <Card key={quest.id}>
          <h3 className="text-lg font-semibold text-zinc-100">{quest.title}</h3>
          <label className="mt-3 block text-xs text-zinc-400">
            Description
            <Textarea
              className="mt-1"
              value={quest.description}
              onChange={(event) => onUpdateQuest({ ...quest, description: event.target.value })}
            />
          </label>
          <label className="mt-3 block text-xs text-zinc-400">
            Progress
            <Input
              className="mt-1"
              value={quest.progress}
              onChange={(event) => onUpdateQuest({ ...quest, progress: event.target.value })}
            />
          </label>
          <label className="mt-3 block text-xs text-zinc-400">
            Status
            <Select
              className="mt-1"
              value={quest.status}
              onChange={(event) => onUpdateQuest({ ...quest, status: event.target.value as Quest['status'] })}
            >
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Select>
          </label>
          {quest.targetDate ? <p className="mt-3 text-xs text-zinc-500">Target: {quest.targetDate}</p> : null}
        </Card>
      ))}
    </div>
  )
}
