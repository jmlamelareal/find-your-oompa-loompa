import { OompaLoompaInfo, OompaLoompasDetailed } from '../types/types'

export interface OmmpaloompasStorageProvider {
  ommpaLoompas(page: number): OompaLoompaInfo[] | null
  ommpaLoompaDetails(id: number): OompaLoompasDetailed | null
  saveOmmpaLoompas(payload: { data: OompaLoompaInfo[]; page: number }): void
  saveOmmpaLoompaDetails(payload: OompaLoompasDetailed): void
}
