import { combineReducers } from 'redux'
import { ingredientsReducer } from './slices/ingredients'
import { authReducer } from './slices/auth'
import { websocketReducer } from './slices/websocket'
import { feedReducer } from './slices/feed'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  webSocket: websocketReducer,
  feed: feedReducer
})

export type TRootState = ReturnType<typeof rootReducer>