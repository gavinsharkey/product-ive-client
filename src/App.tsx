import React, {useEffect} from 'react';
import { Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { checkLoggedInStatus } from './actions/userActions'
import { UserState } from './types/userTypes'
import ProtectedRoute from './components/router/ProtectedRoute'
import LoginScreen from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage';
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'

const App: React.FC = () => {
  const status = useSelector((state: UserState) => state.status)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLoggedInStatus())
  }, [dispatch])

  if (status === 'loading') {
    return (
      <Typography.Title>Loading...</Typography.Title>
    )
  }

  return (
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/signup" component={SignupPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
    </Switch>
  );
}

export default App;
