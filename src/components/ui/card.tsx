import type { HTMLAttributes } from 'react'
import { cn } from '../../utilities/cn'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950/70 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]',
        className,
      )}
      {...props}
    />
  )
}
