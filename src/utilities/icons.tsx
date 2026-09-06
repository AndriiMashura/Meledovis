import {
  BookOpenCheck,
  BriefcaseBusiness,
  Car,
  Cpu,
  Dumbbell,
  FileCheck2,
  Flame,
  HeartHandshake,
  House,
  Languages,
  MessageCircleMore,
  Mic,
  MousePointer2,
  Plane,
  Radar,
  ShieldCheck,
  Siren,
  Sparkles,
  Stamp,
  Trophy,
  type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  BookOpenCheck,
  BriefcaseBusiness,
  Car,
  Cpu,
  Dumbbell,
  FileCheck2,
  Flame,
  HeartHandshake,
  House,
  Languages,
  MessageCircleMore,
  Mic,
  MousePointer2,
  Plane,
  Radar,
  ShieldCheck,
  Siren,
  Sparkles,
  Stamp,
}

export function getIcon(name: string): LucideIcon {
  return icons[name] ?? Trophy
}
