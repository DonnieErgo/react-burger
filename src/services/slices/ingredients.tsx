import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { checkResponse } from '../../utils/utils'
import { baseUrl } from '../../utils/constants'
import { getCookie } from '../../utils/cookies';

const initialState = {
  ingredients: [],
  loading: false,
  error: '',
  cartIngredients: [],
  orderNumber: 0,
  orderName: '',
  orderModal: false,
  cartBuns: [],
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addBunsToCart: {
      // @ts-ignore
      reducer: (state, { payload }) => {
        state.cartBuns.splice(0, 1, payload)
      },
      // @ts-ignore
      prepare: item => {
        const id = nanoid()
        // @ts-ignore
        return { payload: { id, ...item } }
      },
    },
    addIngredientToCart: {
      // @ts-ignore
      reducer: (state, { payload }) => {
        state.cartIngredients.push(payload)
      },
      // @ts-ignore
      prepare: item => {
        const id = nanoid()
        // @ts-ignore
        return { payload: { id, ...item } }
      },
    },
    deleteBunsFromCart: state => {
      state.cartBuns = []
    },
    deleteIngredientFromCart: (state, { payload }) => {
      state.cartIngredients = state.cartIngredients.filter(i => i.id !== payload.id)
    },
    closeOrderModal: state => { 
      state.orderModal = false 
      state.cartBuns = []
      state.cartIngredients = []
    },
    dragIngredients: (state, { payload }) => {
      const ingredientsToChange = state.cartIngredients
      ingredientsToChange[payload.drag] = ingredientsToChange.splice(payload.hover, 1, ingredientsToChange[payload.drag])[0]
      state.cartIngredients = ingredientsToChange.concat(state.cartIngredients.filter(i => i.type === 'bun'))
    }
  },
  extraReducers: builder => {
    builder
      .addCase(sendOrderInfo.pending, state => { state.loading = true })
      .addCase(sendOrderInfo.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = ''
        state.orderNumber = payload.order.number
        state.orderName = payload.name
        state.orderModal = true
      })
      .addCase(sendOrderInfo.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с отправкой заказа: ${payload}`
        state.orderNumber = 0
        state.orderName = ''
      }) 
      .addCase(fetchIngredients.pending, state => { state.loading = true })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = ''
        state.ingredients = payload.data
      })
      .addCase(fetchIngredients.rejected, (state, { payload }) => {
        state.loading = false
        state.error = `Проблема с загрузкой ингредиентов: ${payload}`
      })
      .addDefaultCase(() => {})
  }
})

export const { 
  addIngredientToCart,
  deleteIngredientFromCart,
  closeOrderModal,
  dragIngredients,
  addBunsToCart,
  deleteBunsFromCart
} = ingredientsSlice.actions

export const ingredientsSelector = state => state.ingredients
export const ingredientsReducer = ingredientsSlice.reducer

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    const res = await fetch(baseUrl + 'ingredients')
    return await checkResponse(res)
      .then(res => res)
      .catch(err => rejectWithValue(err.message))
  }
)

export const sendOrderInfo = createAsyncThunk(
  'ingredients/sendOrderInfo',
  async (ingredients, { rejectWithValue }) => {
    const res = await fetch(baseUrl + 'orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': getCookie('accessToken')
      },
      // @ts-ignore
      body: JSON.stringify({ ingredients: ingredients.map(i => i._id) })
    })
    return await checkResponse(res)
      .then(res => res)
      .catch(err => rejectWithValue(err.message))
  }
)