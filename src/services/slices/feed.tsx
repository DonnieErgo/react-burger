import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  feed: [],
  total: null,
  totalToday: null,
  activeOrder: null
}

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

export const feedSelector = state => state.feed
export const feedReducer = feedSlice.reducer