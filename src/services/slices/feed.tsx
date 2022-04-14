import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  feed: [],
  total: null,
  totalToday: null
}

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    saveData: (state, { payload }) => {
      state.feed = payload.orders
      state.total = payload.total
      state.totalToday = payload.totalToday
    }
  }
})

export const { saveData } = feedSlice.actions

export const feedSelector = state => state.feed
export const feedReducer = feedSlice.reducer