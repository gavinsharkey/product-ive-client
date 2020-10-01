import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UserState } from '../../types/userTypes'

const ProtectedRoute = (props: RouteProps): JSX.Element => {
  const isLoggedIn = useSelector((state: UserState) => state.isLoggedIn)

  if (!isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <Route {...props}>
      {props.children}
    </Route>
  )
}

export default ProtectedRoute