import styles from './order-modal.module.css'
import Loading from '../../components/loading/loading'
import { useParams, matchPath, useLocation } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { ingredientsSelector } from '../../services/slices/ingredients'
import { useEffect, useState } from 'react'
import { getCookie } from '../../utils/cookies'
import { getToken } from '../../services/slices/auth'
import { fetchIngredients } from '../../services/slices/ingredients'
import { feedSelector, setActiveOrder } from '../../services/slices/feed'
import { getFeed, getUserFeed } from '../../services/slices/websocket'
import { getStatus, getDate } from '../../utils/utils'

const OrderModal = () => {

  const { ingredients } = useSelector(ingredientsSelector)
  const { feed, activeOrder } = useSelector(feedSelector)
  const dispatch = useDispatch()
  const location = useLocation()
  const background = location.state && location.state.background
  const { orderId } = useParams()
  const [totalPrice, setPrice] = useState(0)
  const [ingredientsArray, setIngredients] = useState([])

  useEffect(() => {
    if (ingredients.length === 0) dispatch(fetchIngredients())

    if (!activeOrder) {
      const actualOrder = feed.find(el => el._id === orderId)
      dispatch(setActiveOrder(actualOrder))
    }

    if (getCookie('refreshToken') != null && getCookie('accessToken') === null) {
      dispatch(getToken())
    }

    if (feed.length === 0) {
      if (location.pathname.indexOf('profile') >= 0) {
        dispatch(getUserFeed())
      } else {
        dispatch(getFeed())
      }
    }

  }, [ingredients, feed, location.pathname])

  useEffect(() => {
    let totalPrice = 0
    let ingrArray = []
    let countedIngrArray = []

    if (activeOrder) activeOrder.ingredients.forEach(item => {
      let ingr = ingredients.find(el => el._id === item)
      if (ingr) ingrArray.push({ ...ingr, count: 1 })
      totalPrice += ingr.price
    })

    ingrArray.forEach(el => {
      const duplicate = countedIngrArray.find(ingr => ingr._id === el._id)
      if (duplicate) duplicate.count += 1
      else { countedIngrArray.push(el) }
    })

    setPrice(totalPrice)
    setIngredients(countedIngrArray)
  }, [activeOrder, ingredients])

  return (
    <>
      {(feed.length === 0 || ingredients.length === 0 || !activeOrder) && <Loading />}

      {(feed.length > 0 && ingredients.length > 0 && activeOrder != null) && 
        <div className={`${styles.main} ${!background ? 'mt-30' : null}`}>
          <span className={`text text_type_digits-default mb-10 ${styles.number}`}>
            #{activeOrder.number}
          </span>
          <span className={'text text_type_main-medium mb-3'}>{activeOrder.name}</span>
          <span className={`text text_type_main-default mb-15 ${activeOrder.status === 'done' ? styles.done : 'text_color_primary'}`}>
            {getStatus(activeOrder.status)}
          </span>
          <span className={'text text_type_main-medium mb-6'}>Состав:</span>
          <ul className={`${styles.ingredients} mb-10 pr-6 `}>
            {/* Переделать в компонент */}
            {ingredientsArray && ingredientsArray.map(el => (
              <li key={el._id} className={styles.ingredient}>
                <div className={styles.wrap}>
                  <img className={`${styles.ingredient_icon} mr-4`} src={el.image_mobile} alt='картинка'/>
                  <span className={`text text_type_main-default`}>{el.name}</span>
                </div>
                <div className={styles.wrap}>
                  <span className={'text text_type_digits-default'}>{el.count}</span>
                  <span className={'text text_type_main-default mr-2 ml-2'}>x</span>
                  <span className={'text text_type_digits-default mr-2'}>{el.price}</span>
                  <CurrencyIcon type='primary'/>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.info}>
            <span className={'text text_type_main-default text_color_inactive'}>{getDate(activeOrder.createdAt)}</span>
            <div className={styles.wrap}>
              <span className={'text text_type_digits-default mr-2'}>
                {totalPrice}
              </span>
              <CurrencyIcon type='primary'/>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default OrderModal