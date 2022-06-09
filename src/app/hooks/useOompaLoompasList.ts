import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchOompaLoompas,
  selectOompaloompasList
} from '../slices/oompaLoompaSlice'
import { AppDispatch, RootState } from '../store'

const useOompaLoompasList = (page: number) => {
  const oompaLoompasList = useSelector((state: RootState) =>
    selectOompaloompasList(state)
  )

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchOompaLoompas(page))
  }, [dispatch, page])

  return oompaLoompasList
}

export default useOompaLoompasList
