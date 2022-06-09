import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import oompaLoompaSlice from './slices/oompaLoompaSlice'

export const store = configureStore({
  reducer: {
    oompaLoompas: oompaLoompaSlice
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
