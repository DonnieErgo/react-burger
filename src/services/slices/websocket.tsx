import { createSlice } from '@reduxjs/toolkit'
import { wsUrl } from '../../utils/constants'
import { getCookie } from '../../utils/cookies'
import { useAppDispatch } from '../../index';

const initialState = {
  webSocket: null,
  wsHasConnected: false,
  wsHasError: false
}

export const wsSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    // @ts-ignore
    wsStart: (state, { payload }) => {},
    wsStop: state => {
      state.wsHasConnected = false
      state.wsHasError = false
    },
    wsSuccess: state => {
      state.wsHasConnected = true
      state.wsHasError = false
    },
    wsError: state => {
      state.wsHasConnected = false
      state.wsHasError = true
      // обработка ошибки c текстом?
    },
    wsClosed: state => {
      state.wsHasConnected = false
      state.wsHasError = false
    },
  }
})

export const { 
  wsStart, 
  wsStop,
  wsSuccess,
  wsError,
  wsClosed
} = wsSlice.actions

export const wsSelector = state => state.webSocket
export const websocketReducer = wsSlice.reducer

export const getFeed = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(
      wsStart({ url: `${wsUrl}/orders/all`, })
    )
  }
}

export const getUserFeed = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(
      wsStart({
        url: `${wsUrl}/orders`,
        token: getCookie('accessToken').slice(7)
      })
    )
  }
}

export const stopFeed = () => {
  return (dispatch = useAppDispatch()) => {
    dispatch(
      wsStop()
    )
  }
}