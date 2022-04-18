import OrderModal from '../../components/order-modal/order-modal'
import Loading from '../../components/loading/loading'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { feedSelector, setActiveOrder } from '../../services/slices/feed'
import { getCookie } from '../../utils/cookies'
import { ingredientsSelector, fetchIngredients } from '../../services/slices/ingredients'
import { getToken } from '../../services/slices/auth'
import { getFeed, getUserFeed } from '../../services/slices/websocket'

export const OrderPage = () => {

  const { ingredients } = useSelector(ingredientsSelector)
  const { feed, activeOrder } = useSelector(feedSelector)
  const dispatch = useDispatch()
  const location = useLocation()
  const { orderId } = useParams()

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

  return (
    <>
      {(feed.length === 0 || ingredients.length === 0 || !activeOrder) && <Loading />}
      {(feed.length > 0 && ingredients.length > 0 && activeOrder != null) &&
        <OrderModal/>
      }
    </>
  )
}