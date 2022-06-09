import React from 'react'
import styles from './header.module.scss'
import logo from './../../assets/logo-umpa-loompa.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <Link to={'/'}>
          <img src={logo} className={styles.header__logo} alt="logo" />
        </Link>
        <span className={styles.header__title}>Oompa Loompa&apos;s Crew</span>
      </div>
    </header>
  )
}

export default Header
