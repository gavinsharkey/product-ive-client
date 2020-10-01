import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { checkLoggedInStatus } from './actions/userActions'
import ProtectedRoute from './components/router/ProtectedRoute'
import LoginScreen from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage';
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLoggedInStatus())
  })

  return (
    <Switch>
      <Route exact path="/" component={WelcomePage} />
      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/signup" component={SignupPage} />
      <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
    </Switch>
  );
}

export default App;
