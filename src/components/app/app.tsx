import AppHeader from '../app-header/app-header'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'	
import { fetchIngredients } from '../../services/slices/ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ProtectedRoute } from '../protected-route/protected-route'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import OrderModal from '../order-modal/order-modal'
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
  Feed,
  OrderPage } from '../../pages'

const App = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const background = location.state && location.state.background

  useEffect(() => {
    dispatch(fetchIngredients())
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

        <Route path='/feed/:orderId' exact>
          <OrderPage />
        </Route>

        <Route path='/feed' exact>
          <Feed />
        </Route>

        <Route>
          <NotFound />
        </Route>
        
      </Switch>

      {background &&
        <Switch>
          <Route path='/ingredients/:ingredientId' exact>
            <Modal onClose={closeModal} title={'Детали ингредиента'}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path='/feed/:orderId' exact>
            <Modal onClose={closeModal} title={''}>
              <OrderModal/>
            </Modal>
          </Route>
          <Route path='/profile/orders/:orderId' exact>
            <Modal onClose={closeModal} title={''}>
              <OrderModal/>
            </Modal>
          </Route>
        </Switch>
      }

    </>
  )
}

export default App;