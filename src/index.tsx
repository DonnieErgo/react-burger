import { render } from 'react-dom'
import { Provider, useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/app/app'
import rootReducer from './services/index'
import { wsMiddleware } from './services/middlwares/wsMiddleware'
import { actions } from './services/slices/websocket'

const store = configureStore({ 
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(wsMiddleware(actions))
})

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()