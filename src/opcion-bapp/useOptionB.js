import { useState, useEffect } from 'react'

export function useOptionB() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('useOptionB')
      console.log('[useOptionB] Stored value:', stored)
      return stored === 'true'
    }
    return false
  })

  useEffect(() => {
    localStorage.setItem('useOptionB', String(enabled))
    console.log('[useOptionB] Saved:', enabled)
  }, [enabled])

  const toggleOption = () => {
    console.log('[useOptionB] Toggling from:', enabled)
    setEnabled(prev => !prev)
  }

  console.log('[useOptionB] Current state:', enabled)
  return { useOptionB: enabled, toggleOption }
}
