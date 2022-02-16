import AppHeader from '../app-header/app-header'
import styles from './app.module.css'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import Loading from '../loading/loading'
import Err from '../err/err'
import {useEffect, useState, useReducer} from 'react'
import { Context } from '../../services/appContext'

const ingredientsApiUrl = 'https://norma.nomoreparties.space/api/ingredients'
const initialState = {
  ingredients: [],
  cart: [],
  totalPrice: 0,
  loading: true
}

const reducer = (state, action) => {
  const cart = state.cart
  let totalPrice

  if (cart.length > 0) {
    const cart = state.cart
    totalPrice = (cart.filter(i => i.type !== 'bun').reduce((a,i) => a + i.price, 0)) + 
      (cart.find(i => i.type === 'bun').price * 2)
  }

  switch (action.type) {
    case 'ingredients':
      return {...state, ingredients: action.payload}
    case 'totalPrice':
      return {...state, totalPrice: totalPrice}
    // Cart здесь выполняет функцию плейсхолдера, что б далее отделять ingredients от заказа
    case 'cart':
      return {...state, cart: action.payload}
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const App = () => {

  const [state, dispatcher] = useReducer(reducer, initialState, undefined);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try { 
        const res = await fetch(ingredientsApiUrl)
        if (!res.ok) { 
          throw new Error(`Fetching ${ingredientsApiUrl} failed. Status is ${res.status}`)
        }
        let actualData = await res.json()
        dispatcher({type:'ingredients', payload: actualData.data})
        dispatcher({type:'cart', payload: actualData.data})
        setError(null)
      } catch(err) {
        setError(err.message)
        dispatcher({type:'ingredients', payload: []})
        dispatcher({type:'cart', payload: []})
      } finally { setLoading(false) }
    }
    getData()
  }, [])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {error && <Err error={error} />}
        {loading && <Loading />}
        {!error && !loading && <>
          <Context.Provider value={{ state, dispatcher }}>
              { <BurgerIngredients /> }
              <BurgerConstructor />
          </Context.Provider></>}
      </main>
    </>
  )
}

export default App;