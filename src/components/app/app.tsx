import AppHeader from '../app-header/app-header'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'	
import { fetchIngredients } from '../../services/slices/ingredients'
import { getToken } from '../../services/slices/auth'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ProtectedRoute } from '../protected-route/protected-route'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { getCookie } from '../../utils/cookies'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { 
  Login, 
  Home, 
  NotFound, 
  Register, 
  ForgotPassword, 
  ResetPassword, 
  Profile, 
  IngredientPage, 
  Feed } from '../../pages'


const App = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const background = location.state && location.state.background

  useEffect(() => {
    dispatch(fetchIngredients())

    // && !background
    if (getCookie('refreshToken') != null) {
      dispatch(getToken())
    }
  }, [])

  const closeModal = () => {
    history.goBack()
  }

  return (
    <>
      <AppHeader />

      <Switch location={background || location}>

        <Route path='/' exact>
          <DndProvider backend={HTML5Backend}>
            <Home />
          </DndProvider>
        </Route>

        <Route path='/login' exact>
          <Login />
        </Route>

        <ProtectedRoute path='/profile'>
          <Profile />
        </ProtectedRoute>

        <Route path='/register' exact>
          <Register />
        </Route>

        <Route path='/forgot-password' exact>
          <ForgotPassword />
        </Route>

        <Route path='/reset-password' exact>
          <ResetPassword />
        </Route>

        <Route path='/ingredients/:ingredientId' exact>
          <IngredientPage />
        </Route>

        <Route path='/feed' exact>
          <Feed />
        </Route>

        <Route>
          <NotFound />
        </Route>
        
      </Switch>

      {background &&
        <Route path='/ingredients/:ingredientId' exact>
          <Modal onClose={closeModal} title={'Детали ингредиента'}>
            <IngredientDetails />
          </Modal>
        </Route>
      }

    </>
  )
}

export default App;