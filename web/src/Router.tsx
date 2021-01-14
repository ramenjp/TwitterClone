import * as React from 'react'
import * as ReactRouter from 'react-router-dom'

import * as Top from './pages/Top'
import * as Profile from './pages/Profile'
import * as Login from './pages/Login'
import * as Signup from './pages/Signup'
import * as UserInfo from './pages/UserInfo'
import * as Auth from './Auth'

export const Component = () => {
    const history = ReactRouter.useHistory()
  return (
    <ReactRouter.BrowserRouter>
      <ReactRouter.Switch>
      <ReactRouter.Route exact path='/' component={Auth.Component} />
      <ReactRouter.Route path='/login' component={Login.Component} />
      <ReactRouter.Route path='/signup' component={Signup.Component} history= {history} />
      <ReactRouter.Route path='/top' component={Top.Component} />
      <ReactRouter.Route path='/:userId' component={UserInfo.Component} />
      </ReactRouter.Switch>
    </ReactRouter.BrowserRouter>
  )
}
