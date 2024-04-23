import React, { useContext } from 'react'
import { Route, Switch} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { AuthContext } from '../context/AuthContext'
// import { MAIN_ROUTE } from '../utils/consts'
// import { Redirect } from 'react-router-dom'

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext)

  return (
    <Switch>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      {/* <Redirect to={MAIN_ROUTE} /> */}
    </Switch>
  )
}

export default AppRouter
