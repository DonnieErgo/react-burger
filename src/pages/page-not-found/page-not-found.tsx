import styles from './page-not-found.module.css'
import { Link } from 'react-router-dom'
import { FC } from 'react'

export const NotFound: FC = () => {
  return (
    <div className={styles.main}>
      <span className="text_type_main-large">404 - Страница не найдена</span>
      <Link to="/" className={`${styles.link} ml-2 text_type_main-default`}>Вернуться на главную страницу</Link>
    </div>
  )
}