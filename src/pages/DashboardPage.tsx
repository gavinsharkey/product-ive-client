import React from 'react'
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from 'antd'
import { UserState } from '../types/userTypes'
import { logout } from '../actions/userActions'
import DashboardHeader from '../components/dashboard/header/DashboardHeader'
import NotesRoute from '../components/dashboard/routes/NotesRoute'
import TodosRoute from '../components/dashboard/routes/TodosRoute'
import DefaultRoute from '../components/dashboard/routes/DefaultRoute'

const { Footer } = Layout

const DashboardPage: React.FC<RouteComponentProps> = (props) => {
  const path = props.match.path
  const id = useSelector((state: UserState) => state.user.id)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    props.history.push('/')
  }

  const handleLink = (route: string): void => {
    props.history.push(`${path}${route}`)
  }

  return (
    <>
      <Layout style={{height: '100%'}}>
        <DashboardHeader handleLogout={handleLogout} handleLink={handleLink} />
        <Layout>
          <Switch>
            <Route exact path={path}>
              <DefaultRoute/>
            </Route>
            <Route path={`${path}/notes`}>
              <NotesRoute/>
            </Route>
            <Route path={`${path}/todos`}>
              <TodosRoute/>
            </Route>
            <Route path={`${path}/:else`}>
              <Redirect to={path} />
            </Route>
          </Switch>
        </Layout>
        <Footer></Footer>
      </Layout>
    </>
  )
}

export default DashboardPage