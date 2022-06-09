import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit' // eslint-disable-line
import { oompoaLoompasService } from '../../services/OmmpaLoompasServices'
import { OompaLoompaInfo, OompaLoompasDetailed } from '../../types/types'
import { RootState } from '../store' // eslint-disable-line

export interface OompaLoompaState {
  list: OompaLoompaInfo[]
  details: OompaLoompasDetailed[]
  loading: boolean
}

const initialState: OompaLoompaState = {
  list: [] as OompaLoompaInfo[],
  details: [] as OompaLoompasDetailed[],
  loading: false
}

export const fetchOompaLoompas = createAsyncThunk(
  'oompaLoompa/fetchOompaLoompas',
  async (page: number): Promise<OompaLoompaInfo[]> =>
    await oompoaLoompasService.getList(page)
)

export const fetchOompaLoompasDetails = createAsyncThunk(
  'oompaLoompa/fetchOompaLoompasDetails',
  async (id: number): Promise<OompaLoompasDetailed> =>
    await oompoaLoompasService.getDetail(id)
)

export const oompaLoompaSlice = createSlice({
  name: 'oompaLoompa',
  initialState,
  reducers: {
    setOompaLoompasDetailedList: (
      state,
      action: PayloadAction<OompaLoompasDetailed>
    ) => {
      state.details = [...state.details, action.payload]
      state.loading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  },
  extraReducers: {
    [fetchOompaLoompas.pending.type]: (state) => {
      state.loading = true
    },
    [fetchOompaLoompas.fulfilled.type]: (state, action) => {
      state.list = [...state.list, ...action.payload]
      state.loading = false
    },
    [fetchOompaLoompas.rejected.type]: (state) => {
      state.loading = false
    },
    [fetchOompaLoompasDetails.pending.type]: (state) => {
      state.loading = true
    },
    [fetchOompaLoompasDetails.fulfilled.type]: (state, action) => {
      state.details = [...state.details, action.payload]
      state.loading = false
    },
    [fetchOompaLoompasDetails.rejected.type]: (state) => {
      state.loading = false
    }
  }
})

export const { setOompaLoompasDetailedList, setLoading } =
  oompaLoompaSlice.actions
export const selectLoading = (state: RootState) => state.oompaLoompas.loading
export const selectOompaloompasList = (state: RootState) =>
  state.oompaLoompas.list
export const selectOompaloompasDetails = (state: RootState) =>
  state.oompaLoompas.details
export const selectDetailedOompaloompaById = (state: RootState, id: number) => {
  return state.oompaLoompas.details.find(
    (oompaLoompa: OompaLoompasDetailed) => oompaLoompa.id === id
  )
}

// prettier-ignore
export const selectOompaLoompasFilter = (state: RootState, search:string) => {
  return search.length
    ? state.oompaLoompas.list.filter(
      (item) =>
        item.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.last_name.toLowerCase().includes(search.toLowerCase()) ||
        item.profession.toLowerCase().includes(search.toLowerCase())
    )
    : state.oompaLoompas.list
}
export default oompaLoompaSlice.reducer
