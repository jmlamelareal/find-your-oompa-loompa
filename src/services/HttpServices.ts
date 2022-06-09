import { HttpProvider } from '../providers/HttpProvider'

class HttpService implements HttpProvider {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${url}`)

    const data = await response.json()
    return data
  }
}

export const httpService = new HttpService()
