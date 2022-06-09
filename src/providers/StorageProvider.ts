export interface StorageProvider {
  get<T>(key: string): T | null
  set<T>(key: string, payload: T): void
  delete(key: string): void
}
