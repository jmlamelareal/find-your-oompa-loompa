export interface HttpProvider {
  get<T>(url: string): Promise<T>
}
