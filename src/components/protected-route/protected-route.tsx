import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { authSelector } from '../../services/slices/auth'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

export const ProtectedRoute = ({ children, ...rest }) => {

  const { auth } = useSelector(authSelector)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? children : ( <Redirect to={{ pathname: '/login', state: { from: location }}}/> )
      }
    />
  )
} 