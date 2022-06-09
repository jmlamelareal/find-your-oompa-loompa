/* eslint-disable indent */
import { useRef, useState } from 'react'
import { StorageProvider } from '../../providers/StorageProvider'
import { localStorageService } from '../../services/LocalStorageService'

export const usePagination = (currentPage = 0) => {
  const [page, setPage] = useState(currentPage)

  const handlePagination = () => {
    setPage((prevState) => prevState + 1)
  }

  return { page, handlePagination }
}

const usePaginationStorage = (storage: StorageProvider) => (key: string) => {
  const { current: pageStorage } = useRef(storage.get<{ page: number }>(key))

  return usePagination(pageStorage?.page ?? 0)
}

export const usePaginationLocalStorage =
  usePaginationStorage(localStorageService)
