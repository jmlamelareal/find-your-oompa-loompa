import { HttpProvider } from '../providers/HttpProvider'
import { OmmpaloompasStorageProvider } from '../providers/OmmpaLoompasStorageProvider'
import { OompaLoompaInfo, OompaLoompasDetailed } from '../types/types'
import { httpService } from './HttpServices'
import { oompaLoompasStorageService } from '../storage/OompaLoompasStorage'

class OompoaLoompasService {
  private http: HttpProvider
  private storage: OmmpaloompasStorageProvider

  constructor(http: HttpProvider, storage: OmmpaloompasStorageProvider) {
    this.http = http
    this.storage = storage
  }

  async getList(page = 0) {
    const list = this.storage.ommpaLoompas(page)

    if (list) return list

    const { results } = await this.http.get<{ results: OompaLoompaInfo[] }>(
      `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`
    )

    this.storage.saveOmmpaLoompas({ data: results, page })

    return results
  }

  async getDetail(id: number) {
    const details = this.storage.ommpaLoompaDetails(id)

    if (details) return details

    const data = await this.http.get<OompaLoompasDetailed>(
      `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${id}`
    )

    this.storage.saveOmmpaLoompaDetails({ ...data, id })

    return { ...data, id }
  }
}

export const oompoaLoompasService = new OompoaLoompasService(
  httpService,
  oompaLoompasStorageService
)
