import { useLocalStorage } from './useLocalStorage'

export function useAuth() {
  const [pinHash, setPinHash] = useLocalStorage<string | null>('expense-tracker:pin', null)
  const [unlocked, setUnlocked] = useLocalStorage<boolean>('expense-tracker:unlocked', false)

  const hasPin = pinHash !== null

  const setPin = (pin: string) => {
    setPinHash(simpleHash(pin))
    setUnlocked(true)
  }

  const tryUnlock = (pin: string) => {
    if (simpleHash(pin) === pinHash) {
      setUnlocked(true)
      return true
    }
    return false
  }

  const lock = () => setUnlocked(false)

  const resetPin = () => {
    setPinHash(null)
    setUnlocked(false)
  }

  return { hasPin, unlocked, setPin, tryUnlock, lock, resetPin }
}

function simpleHash(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return hash.toString(36)
}
