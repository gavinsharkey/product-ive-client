import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { checkLoggedInStatus } from './actions/userActions'
import LoginScreen from './pages/LoginPage'
import WelcomePage from './pages/WelcomePage';
import SignupPage from './pages/SignupPage'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLoggedInStatus())
  })

  return (
    <>
      <Switch>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/signup" component={SignupPage} />
      </Switch>
    </>
  );
}

export default App;
