import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useOompaLoompasList from '../../app/hooks/useOompaLoompasList'
import { usePaginationLocalStorage } from '../../app/hooks/usePaginationStorage'
import { selectOompaLoompasFilter } from '../../app/slices/oompaLoompaSlice'
import { RootState } from '../../app/store'
import List from '../../components/List'
import SearchBar from '../../components/SearchBar'
import styles from './home.module.scss'

const Home = () => {
  const { page, handlePagination } = usePaginationLocalStorage('list')

  const [search, setSearch] = useState('')

  const oompaLoompas = useOompaLoompasList(page)

  const oompaLoompasFiltered = useSelector((state: RootState) =>
    selectOompaLoompasFilter(state, search)
  )

  if (oompaLoompas.length === 0) {
    return <div>...Loading</div>
  }

  return (
    <div className={styles.home}>
      <SearchBar onSearch={setSearch} />
      <h1 className={styles.home__title}>Find Your OompaLoompa</h1>
      <h2 className={styles.home__subtitle}>There are more than 100k</h2>
      <List
        items={oompaLoompasFiltered}
        input={search}
        handleMoreData={handlePagination}
      />
    </div>
  )
}

export default Home
