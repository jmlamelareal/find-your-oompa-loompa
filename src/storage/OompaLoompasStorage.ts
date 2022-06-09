import { OmmpaloompasStorageProvider } from '../providers/OmmpaLoompasStorageProvider'
import { StorageProvider } from '../providers/StorageProvider'
import { OompaLoompaInfo, OompaLoompasDetailed } from '../types/types'
import { localStorageService } from '../services/LocalStorageService'
import { DateHelper } from '../helper/DateHelper'

export type OmmpaLoompasStorage = {
  data: OompaLoompaInfo[]
  page: number
  lastCallingDate: number
}

export type OmmpaLoompasDeatilsStorage = {
  data: OompaLoompasDetailed[]
}
export class OompaLoompasStorage implements OmmpaloompasStorageProvider {
  private __storage__: StorageProvider

  constructor(storage: StorageProvider) {
    this.__storage__ = storage
  }

  public ommpaLoompas(page: number): OompaLoompaInfo[] | null {
    const data = this.__storage__.get<OmmpaLoompasStorage>('list')

    if (data === null || page > data.page) return null
    if (DateHelper.isOlderThanNHourAgo(data.lastCallingDate, 24)) {
      this.__storage__.delete('list')

      return null
    }

    return data.data
  }

  ommpaLoompaDetails(id: number): OompaLoompasDetailed | null {
    const data = this.__storage__.get<OmmpaLoompasDeatilsStorage>('details')

    if (data === null || data.data === undefined) return null
    const result = data.data.find((item) => item.id === id)

    if (result === undefined) return null

    return result
  }

  saveOmmpaLoompas(payload: { data: OompaLoompaInfo[]; page: number }): void {
    const dataStorage = this.__storage__.get<OmmpaLoompasStorage>('list')

    let data = payload.data

    if (dataStorage !== null) data = [...payload.data, ...dataStorage.data]

    this.__storage__.set<OmmpaLoompasStorage>('list', {
      page: payload.page,
      data,
      lastCallingDate: Date.now()
    })
  }

  saveOmmpaLoompaDetails(payload: OompaLoompasDetailed): void {
    const dataStorage =
      this.__storage__.get<OmmpaLoompasDeatilsStorage>('details')

    if (dataStorage !== null) {
      const item = dataStorage.data.find((item) => item.id === payload.id)

      if (item === undefined) {
        this.__storage__.set<OmmpaLoompasDeatilsStorage>('details', {
          data: [...dataStorage.data, payload]
        })
        return
      }
    }

    this.__storage__.set<OmmpaLoompasDeatilsStorage>('details', {
      data: [payload]
    })
  }
}

export const oompaLoompasStorageService = new OompaLoompasStorage(
  localStorageService
)
