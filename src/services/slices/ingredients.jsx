import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { ingredientsApiUrl, orderSubmitUrl } from '../../utils/constants'
import { useHttp } from "../hooks/http.hook";

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
    showIngredientDetails: (state, { payload }) => {
      state.ingredientDetails = payload
      state.activeIngredientDetailsModal = true
    },
    removeIngredientDetails: state => {
      state.ingredientDetails = null
      state.activeIngredientDetailsModal = false
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
    deleteIngredientFromCart: (state, { payload }) => {
      if (payload.type === 'bun') state.cartIngredients = state.cartIngredients.filter(i => i.type !== 'bun')
      else {
        const itemIndex = state.cartIngredients.map(i => i._id).indexOf(payload._id)
        state.cartIngredients = state.cartIngredients.filter((i, ind) => ind !== itemIndex)
      }
    },
    closeOrderModal: state => { state.orderModal = false },
    getTotalPrice: state => {
      const cart = state.cartIngredients
      let total

      if (cart.length > 0) {
        total = (cart.filter(i => i.type !== 'bun').reduce((a,i) => a + i.price, 0)) + 
          (cart.some(i => i.type === 'bun') ? (cart.find(i => i.type === 'bun').price * 2) : 0)
      }

      state.totalPrice = total
    },
    dragIngredients: (state, { payload }) => {
      const ingredientsToChange = state.cartIngredients.filter(i => i.type !== 'bun')
      ingredientsToChange[payload.drag] = ingredientsToChange.splice(payload.hover, 1, ingredientsToChange[payload.drag])[0]
      state.cartIngredients = ingredientsToChange.concat(state.cartIngredients.filter(i => i.type === 'bun'))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderInfo.pending, state => { state.loading = true })
      .addCase(sendOrderInfo.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = false
        state.orderNumber = payload.order.number
        state.orderName = payload.name
        state.orderModal = true
      })
      // разобраться как вывести текст ошибки из самого payload через кастомный хук
      .addCase(sendOrderInfo.rejected, (state, { payload }) => {
        state.loading = false
        state.error = 'Проблема с отправкой заказа'
        state.orderNumber = 0
        state.orderName = ''
      })
      .addCase(fetchIngredients.pending, state => { state.loading = true })
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = false
        state.ingredients = payload.data
      })
      // разобраться как вывести текст ошибки из самого payload через кастомный хук
      .addCase(fetchIngredients.rejected, (state, { payload }) => {
        state.loading = false
        state.error = 'Проблема с загрузкой ингредиентов'
      })
      .addDefaultCase(() => {})
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
export const ingredientsSelector = state => state.ingredients
export const ingredientsReducer = ingredientsSlice.reducer

export const fetchIngredients = createAsyncThunk(
  'fetchIngredients',
  async () => {
    const {request} = useHttp();
    return await request(ingredientsApiUrl);
  }
)

export const sendOrderInfo = createAsyncThunk(
  'sendOrderInfo',
  async (ingredients) => {
    const {request} = useHttp();
    return await request(orderSubmitUrl, 'POST', JSON.stringify({ingredients}));
  }
)