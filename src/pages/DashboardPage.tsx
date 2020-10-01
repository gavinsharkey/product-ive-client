import React from 'react'
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import { UserState } from '../types/userTypes'
import DashboardHeader from '../components/dashboard/header/DashboardHeader'
import NotesContent from '../components/dashboard/content/NotesContent'
import TodosContent from '../components/dashboard/content/TodosContent'
import DefaultContent from '../components/dashboard/content/DefaultContent'
import { useSelector } from 'react-redux'

const { Footer } = Layout

const DashboardPage: React.FC<RouteComponentProps> = (props) => {
  const path = props.match.path
  const id = useSelector((state: UserState) => state.user.id)

  const handleLink = (route: string): void => {
    props.history.push(`${path}${route}`)
  }

  return (
    <>
      <Layout style={{height: '100%'}}>
        <DashboardHeader handleLink={handleLink} />
        <Layout>
          <Switch>
            <Route exact path={path}>
              <DefaultContent userId={id} />
            </Route>
            <Route path={`${path}/notes`}>
              <NotesContent userId={id} />
            </Route>
            <Route path={`${path}/todos`}>
              <TodosContent userId={id} />
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