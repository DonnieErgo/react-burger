import styles from './feed.module.css'
import Loading from '../../components/loading/loading'
import OrderList from '../../components/order-list/order-list'
import { useEffect } from 'react'

export const Feed = () => {

  // useEffect(() => {
    
  // }, [])

  // добавить loading и error
  return (
    // проверки на loading, error и наличие нужных данных
    <section className={styles.main}>

      <h1 className='text text_type_main-large ml-5 mb-5'>Лента заказов</h1>
      <div className={`${styles.container}`}>

        <div className={`${styles.orders} custom-scroll ml-5`}>
          <OrderList showStatus={false} />
        </div>

        <div className={`${styles.info} ml-15`}>
          <div className={`${styles.statusContainer} mb-15`}>
            <div className={`${styles.status} mr-9`}>
              <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
              <ul className={`${styles.list} custom-scroll`}>
                <li className={`${styles.finished} text text_type_digits-default`}>233444</li>
                <li className={`${styles.finished} text text_type_digits-default`}>233444</li>
                <li className={`${styles.finished} text text_type_digits-default`}>233444</li>
              </ul>
            </div>
            <div className={styles.status}>
              <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
              <ul className={`${styles.list} custom-scroll`}>
                <li className={'text text_type_digits-default'}>233444</li>
                <li className={'text text_type_digits-default'}>233444</li>
                <li className={'text text_type_digits-default'}>233444</li>
                <li className={'text text_type_digits-default'}>233444</li>
                <li className={'text text_type_digits-default'}>233444</li>
                <li className={'text text_type_digits-default'}>233444</li>
                <li className={'text text_type_digits-default'}>233444</li>
                <li className={'text text_type_digits-default'}>233444</li>
                <li className={'text text_type_digits-default'}>233444</li>
                <li className={'text text_type_digits-default'}>233444</li>
                <li className={'text text_type_digits-default'}>233444</li>
              </ul>
            </div>
          </div>
          <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
          <p className={`text text_type_digits-large mb-15 ${styles.highlight }`}>45325</p>
          <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
          <p className={`text text_type_digits-large ${styles.highlight }`}>3421</p>
        </div>

      </div>
    </section>
  )
}