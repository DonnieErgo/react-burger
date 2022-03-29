import AppHeader from './components/app-header/app-header'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'	
import { fetchIngredients } from './services/slices/ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Route, Switch } from 'react-router-dom'
import { Login, Home, NotFound, Register, ForgotPassword, ResetPassword } from './pages'


const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchIngredients())
  }, [])

  return (
    <>
      <AppHeader />
      <Switch>
        <Route path='/' exact>
          <DndProvider backend={HTML5Backend}>
            <Home />
          </DndProvider>
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <Route path='/forgot-password'>
          <ForgotPassword />
        </Route>
        <Route path='/reset-password'>
          <ResetPassword />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  )
}

export default App;