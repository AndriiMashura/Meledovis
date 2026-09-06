import { useEffect } from 'react'
import { defaultSettings } from '../data/defaultData'
import type { Settings } from '../types'
import { useLocalStorage } from './useLocalStorage'

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<Settings>('lat:settings', defaultSettings)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.darkMode)
  }, [settings.darkMode])

  return { settings, setSettings }
}
