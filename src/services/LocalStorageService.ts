import { StorageProvider } from '../providers/StorageProvider'

class LocalStorageService implements StorageProvider {
  get<T>(key: string): T | null {
    const data = localStorage.getItem(key)

    if (data === null) return data

    return JSON.parse(data)
  }

  set<T>(key: string, payload: T): void {
    localStorage.setItem(key, JSON.stringify(payload))
  }

  delete(key: string) {
    localStorage.removeItem(key)
  }
}

export const localStorageService = new LocalStorageService()
