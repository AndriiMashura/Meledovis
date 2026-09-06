# Life Achievement Tracker

A polished RPG-style personal life tracker that turns real-life progress into achievements, XP, levels, quests, stats, and a timeline.

## Features

- Dark premium gaming-inspired UI with responsive sidebar/mobile navigation
- Dashboard with character profile, level progression, featured latest achievement, and one-year milestones
- Full achievement system (locked/unlocked/secret states, rarity, XP, category, metadata)
- Search + filterable achievements grid
- Add Achievement modal with validation-friendly form
- Deterministic local **Achievement Generator** (keyword/template based, no API)
- Real XP + level progression formula
- Unlock celebration toast with animation particles and optional sound
- Editable quests
- Timeline of unlocked milestones
- Stats charts (category and XP breakdown)
- Settings with dark mode, animations, sound, reset demo data, JSON export/import
- LocalStorage persistence for achievements, quests, and settings

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn-style UI primitives
- Lucide icons
- Recharts

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/
    layout/
    sections/
    ui/
  hooks/
  data/
  types/
  utilities/
```

## LocalStorage Keys

- `lat:achievements`
- `lat:quests`
- `lat:settings`

## Extending Achievements

1. Add/edit seeded achievements in `/src/data/defaultData.ts`.
2. Ensure each achievement follows the `Achievement` interface in `/src/types/index.ts`.
3. Optionally map new icon names in `/src/utilities/icons.tsx`.
4. Expand deterministic generation rules in `/src/utilities/achievementGenerator.ts`.
