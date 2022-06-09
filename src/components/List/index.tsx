import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { OompaLoompaInfo } from '../../types/types'
import Item from '../Item'
import styles from './list.module.scss'

interface ListProps {
  items: OompaLoompaInfo[]
  input?: string
  handleMoreData: () => void
}

const List: React.FC<ListProps> = ({ items, input = '', handleMoreData }) => (
  <InfiniteScroll
    className={styles.list}
    dataLength={items.length}
    next={handleMoreData}
    hasMore={true}
    loader={<h4>Loading...</h4>}
    scrollThreshold={0.9}
  >
    {items?.map((item) => (
      <Item item={item} key={Math.random()} />
    ))}
  </InfiniteScroll>
)

export default List
