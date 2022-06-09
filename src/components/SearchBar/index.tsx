import React from 'react'
import searchIcon from './../../assets/search.png'
import styles from './searchBar.module.scss'

interface SearchProps {
  onSearch: (value: string) => void
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__wrapper}>
        <input
          className={styles.searchBar__input}
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
        />
        <button className={styles.searchBar__button}>
          <img
            className={styles.searchBar__icon}
            src={searchIcon}
            alt="Search"
          />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
