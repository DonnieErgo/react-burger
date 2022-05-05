import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer, TRootState } from '../services/rootReducer'
import { wsMiddleware } from '../services/middlwares/wsMiddleware'
import { actions } from '../services/slices/websocket'

export const store = configureStore({ 
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(wsMiddleware(actions))
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector