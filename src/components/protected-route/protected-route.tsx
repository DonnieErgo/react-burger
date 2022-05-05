import { Route, Redirect, RouteProps } from 'react-router-dom'
import { authSelector } from '../../services/slices/auth'
import { useAppSelector } from '../../services/store'
import { FC } from 'react'

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {

  const { auth } = useAppSelector(authSelector)

  return (
    <Route
      {...rest}
      render={({ location }) =>
      auth ? children 
        : ( <Redirect to={{ pathname: '/login', state: { from: location }}}/> )
      }
    />
  )
} 