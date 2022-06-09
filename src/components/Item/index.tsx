import React from 'react'
import { Link } from 'react-router-dom'
import { OompaLoompaInfo } from '../../types/types'
import styles from './item.module.scss'

interface ItemProps {
  item: OompaLoompaInfo
}

const Item: React.FC<ItemProps> = ({ item }) => {
  return (
    <div className={styles.item}>
      <Link to={`/oompa-loompa/${item.id}`} className={styles.item__link}>
        <img
          src={item.image}
          className={styles.item__image}
          alt={item.first_name}
        />
        <div className="item__info">
          <h2 className={styles.item__name}>{item.first_name}</h2>
          <p className={styles.item__gender}>{item.gender}</p>
          <p className={styles.item__profession}>{item.profession}</p>
        </div>
      </Link>
    </div>
  )
}

export default Item
