import { createSlice } from '@reduxjs/toolkit'
import { TRootState } from '../rootReducer'
import { TOrder } from '../../utils/types'

type TFeedState = {
  feed: Array<TOrder>,
  total: number,
  totalToday: number,
  activeOrder: TOrder
};

const initialState = {
  feed: [],
  total: 0,
  totalToday: 0,
  activeOrder: null
} as TFeedState

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    saveData: (state, { payload }) => {
      state.feed = payload.orders
      state.total = payload.total
      state.totalToday = payload.totalToday
    },
    setActiveOrder: (state, { payload }) => {
      state.activeOrder = payload
    }
  }
})

export const { saveData, setActiveOrder } = feedSlice.actions

export const feedSelector = (state: TRootState) => state.feed
export const feedReducer = feedSlice.reducer