import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  fetchOompaLoompasDetails,
  selectDetailedOompaloompaById,
  selectLoading
} from '../../app/slices/oompaLoompaSlice'
import { AppDispatch, RootState } from '../../app/store'
import styles from './detail.module.scss'

interface DetailProps {}

const Details: React.FC<DetailProps> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const params = useParams()
  const loading = useSelector((state: RootState) => selectLoading(state))
  const oompaLoompa = useSelector((state: RootState) =>
    selectDetailedOompaloompaById(state, params.id ? parseInt(params.id) : 0)
  )

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOompaLoompasDetails(parseInt(params.id)))
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (oompaLoompa === undefined) {
    return <div>No oompa loompa found</div>
  }

  return (
    <div className={styles.detail}>
      <div className={styles.detail__wrapper}>
        <figure className={styles.detail__figure}>
          <img
            src={oompaLoompa.image}
            className={styles.detail__image}
            alt={oompaLoompa.first_name}
          />
        </figure>
        <div className={styles.detail__info}>
          <h2 className={styles.detail__name}>
            {`${oompaLoompa.first_name} ${oompaLoompa.last_name}`}
          </h2>
          <p className={styles.detail__profession}>{oompaLoompa.profession}</p>
          <p className={styles.detail__gender}>{oompaLoompa.gender}</p>
          <p
            className={styles.detail__description}
            dangerouslySetInnerHTML={{ __html: oompaLoompa.description }}
          />
        </div>
      </div>
    </div>
  )
}
export default Details
