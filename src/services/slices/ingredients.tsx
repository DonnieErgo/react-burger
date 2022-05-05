import { createSlice, createAsyncThunk, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { customFetch } from '../../utils/utils'
import { baseUrl } from '../../utils/constants'
import { getCookie } from '../../utils/cookies'
import { TRootState } from '../rootReducer'
import { TIngredient } from '../../utils/types'

type TIngridientsState = {
  ingredients: Array<TIngredient>,
  loading: boolean,
  error: string,
  cartIngredients: Array<TIngredient>,
  orderNumber: number,
  orderName: string,
  orderModal: boolean,
  cartBuns: Array<TIngredient>,
};

const initialState = {
  ingredients: [],
  loading: false,
  error: '',
  cartIngredients: [],
  orderNumber: 0,
  orderName: '',
  orderModal: false,
  cartBuns: [],
} as TIngridientsState

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addBunsToCart: {
      reducer: (state, { payload }: PayloadAction<TIngredient>) => {
        state.cartBuns.splice(0, 1, payload)
      },
      prepare: item => {
        const id = nanoid()
        return { payload: { id, ...item } }
      },
    },
    addIngredientToCart: {
      reducer: (state, { payload }: PayloadAction<TIngredient>) => {
        state.cartIngredients.push(payload)
      },
      prepare: item => {
        const id = nanoid()
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
  extraReducers: (builder) => {
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

export const ingredientsSelector = (state: TRootState) => state.ingredients
export const ingredientsReducer = ingredientsSlice.reducer

export const fetchIngredients = createAsyncThunk('ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try { return await customFetch(`${baseUrl}ingredients`)
    } catch (err) { return rejectWithValue(err.message) }
  }
)

export const sendOrderInfo = createAsyncThunk('ingredients/sendOrderInfo',
  async (ingredients: Array<TIngredient>, { rejectWithValue }) => {
    try { return await customFetch(
      `${baseUrl}orders`, 'POST', JSON.stringify({ ingredients: ingredients.map(i => i._id) }),
      {'Content-Type': 'application/json', 'authorization': getCookie('accessToken')})
    } catch (err) { return rejectWithValue(err.message) }
  }
)