import styles from './order-item.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

// также будет передаваться айтем
const OrderItem = ({ showStatus }) => {

  return (

    // добавить onClick с модальником в li
      <li className={`${styles.item} mb-4 mr-2`}>
        <div className={`${styles.header_info} mb-6`}>
          <span className={`${styles.id} text_type_digits-default`}>#13119</span>
          <time className={`${styles.date} text text_color_inactive text_type_main-default`}>Сегодня, 13:20 i-GMT+3</time>
        </div>
        <h2 className={`text text_type_main-medium ${showStatus ? 'mb-2' : 'mb-6'}`}>Death Star Starship Main бургер</h2>
        {showStatus && <span className={'text text_type_main-small mb-6'}>Создан</span> }
        <div className={styles.container}>
          <div className={styles.icons}>
            <img className={styles.icon} src={'https://code.s3.yandex.net/react/code/sp_1.png'} alt={'картинка'}/>
            <img className={styles.icon} src={'https://code.s3.yandex.net/react/code/core.png'} alt={'картинка'}/>
            <img className={styles.icon} src={'https://code.s3.yandex.net/react/code/salad.png'} alt={'картинка'}/>
          </div>
          <div className={styles.price}>
            <span className={'text text_type_digits-default'}>123</span>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </li>

  )
}

OrderItem.propTypes = {
  showStatus: PropTypes.bool.isRequired,
}

export default OrderItem