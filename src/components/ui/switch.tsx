import * as SwitchPrimitives from '@radix-ui/react-switch'

export function Switch(props: SwitchPrimitives.SwitchProps) {
  return (
    <SwitchPrimitives.Root
      className="peer inline-flex h-6 w-11 items-center rounded-full bg-zinc-700 transition data-[state=checked]:bg-indigo-500"
      {...props}
    >
      <SwitchPrimitives.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-5" />
    </SwitchPrimitives.Root>
  )
}
