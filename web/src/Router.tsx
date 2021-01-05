import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import * as Top from './pages/Top'
import * as Profile from './pages/Profile'
import * as Home from './pages/Home'
import * as Login from './pages/Login'
import * as Signup from './pages/Signup'

export const Component = () => {
  return (
    <ReactRouter.BrowserRouter>
      <ReactRouter.Switch>
      <ReactRouter.Route exact path='/' component={Home.Component} />
      <ReactRouter.Route path='/login' component={Login.Component} />
      <ReactRouter.Route path='/signup' component={Signup.Component} />
        <ReactRouter.Route exact path='/top' component={Top.Component} />
        <ReactRouter.Route exact path='/:userId/profile' component={Profile.Component} />
      </ReactRouter.Switch>
    </ReactRouter.BrowserRouter>
  )
}
