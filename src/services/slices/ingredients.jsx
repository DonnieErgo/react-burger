import { createSlice } from '@reduxjs/toolkit'
import { ingredientsApiUrl, orderSubmitUrl } from '../../utils/constants'

export const initialState = {
  ingredients: [],
  loading: false,
  error: null,
  ingredientDetails: null,
  activeIngredientDetailsModal: false,
  cartIngredients: [],
  orderNumber: 0,
  orderName: '',
  orderModal: false,
  totalPrice: 0
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredients: state => { state.loading = true },
    getIngredientsSuccess: (state, { payload }) => {
      state.loading = false
      state.error = false
      state.ingredients = payload
    },
    getIngredientsFail: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    showIngredientDetails: (state, { payload }) => {
      state.ingredientDetails = payload
      state.activeIngredientDetailsModal = true
    },
    removeIngredientDetails: state => {
      state.ingredientDetails = null
      state.activeIngredientDetailsModal = false
    },
    addIngredientToCart: (state, { payload }) => {
      state.cartIngredients = [...state.cartIngredients, payload]
    },
    deleteIngredientFromCart: (state, { payload }) => {
      if (payload.type === 'bun') state.cartIngredients = state.cartIngredients.filter(i => i.type !== 'bun')
      else {
        const itemIndex = state.cartIngredients.map(i => i._id).indexOf(payload._id)
        state.cartIngredients = state.cartIngredients.filter((i, ind) => ind !== itemIndex)
      }
    },
    sendOrder: state => { state.loading = true },
    sendOrderSuccess: (state, { payload }) => {
      state.loading = false
      state.error = false
      state.orderNumber = payload.order.number
      state.orderName = payload.name
      state.orderModal = true
    },
    sendOrderFail: (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.orderNumber = 0
      state.orderName = ''
    },
    closeOrderModal: state => { state.orderModal = false },
    getTotalPrice: state => {
      const cart = state.cartIngredients
      let total

      if (cart.length > 0) {
        total = (cart.filter(i => i.type !== 'bun').reduce((a,i) => a + i.price, 0)) + 
          (cart.find(i => i.type === 'bun').price * 2)
      }

      state.totalPrice = total
    },
    dragIngredients: (state, { payload }) => {
      const ingredientsToChange = [...state.cartIngredients]
      ingredientsToChange.splice(payload.drag, 0, ingredientsToChange.splice(payload.hover, 1)[0])
      state.cartIngredients = ingredientsToChange
    }
  }
})

export const { 
  getIngredients, 
  getIngredientsSuccess, 
  getIngredientsFail, 
  showIngredientDetails, 
  removeIngredientDetails,
  addIngredientToCart,
  deleteIngredientFromCart,
  sendOrder,
  sendOrderSuccess,
  sendOrderFail,
  closeOrderModal,
  getTotalPrice,
  dragIngredients
} = ingredientsSlice.actions

// Выяснить как работает ссылка на селектор т.к. сейчас из деструктуризации
// ingredientsSelector я достаю вообще все стейты, возможно надо переписать по аналогии с экшенами
export const ingredientsSelector = (state) => state.ingredients
export const ingredientsReducer = ingredientsSlice.reducer

export const fetchIngredients = () => {
  return async dispatch => { 
    dispatch(getIngredients())
    try {
      const res = await fetch(ingredientsApiUrl)
      if (!res.ok) { throw new Error(`Fetching ${ingredientsApiUrl} failed. Status is ${res.status}`) }
      const actualData = await res.json()
      dispatch(getIngredientsSuccess(actualData.data))
    } catch (error) { dispatch(getIngredientsFail(error.message)) }
  }
}

export const sendOrderInfo = ingredients => {
  return async dispatch => { 
    dispatch(sendOrder())
    try {
      const res = await fetch(orderSubmitUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ ingredients: ingredients.map(i => i._id) })
      })
      if (!res.ok) { throw new Error(`Fetching ${orderSubmitUrl} failed. Status is ${res.status}`) }
      const actualData = await res.json()
      dispatch(sendOrderSuccess(actualData))
    } catch (error) { dispatch(sendOrderFail(error.message)) }
  }
}