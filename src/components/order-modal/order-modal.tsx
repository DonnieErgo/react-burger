import styles from './order-modal.module.css'
import Loading from '../../components/loading/loading'
import { useParams, useLocation } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientsSelector, fetchIngredients } from '../../services/slices/ingredients'
import { useEffect, useState } from 'react'
import { getCookie } from '../../utils/cookies'
import { getToken } from '../../services/slices/auth'
import { feedSelector, setActiveOrder } from '../../services/slices/feed'
import { getFeed, getUserFeed } from '../../services/slices/websocket'
import { getStatus, getDate } from '../../utils/utils'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { TLocation, TIngredient } from '../../utils/types'
import OrderModalItems from '../../components/order-modal-items/order-modal-items'

const OrderModal: FC = () => {

  const { ingredients } = useAppSelector(ingredientsSelector)
  const { feed, activeOrder } = useAppSelector(feedSelector)
  const dispatch = useAppDispatch()
  const location = useLocation<TLocation>()
  const background = location.state && location.state.background
  const { orderId } = useParams<{ orderId: string }>()
  const [totalPrice, setPrice] = useState<number>(0)
  const [ingredientsArray, setIngredients] = useState<Array<TIngredient>>([])

  useEffect(() => {
    if (ingredients.length === 0) dispatch(fetchIngredients())

    const actualOrder: object = feed.find(el => el._id === orderId)
    dispatch(setActiveOrder(actualOrder))
    

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients, feed, location.pathname])

  useEffect(() => {
    let totalPrice: number = 0
    let ingrArray: Array<TIngredient> = []
    let countedIngrArray: Array<TIngredient> = []

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
            {ingredientsArray && ingredientsArray.map((ingredient: TIngredient) => (
              <OrderModalItems key={ingredient._id} ingredient={ingredient} />))
            }
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