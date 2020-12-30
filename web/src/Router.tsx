import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import * as Top from './pages/Top'

export const Component = () => {
  return (
    <ReactRouter.BrowserRouter>
      <ReactRouter.Switch>
        <ReactRouter.Route exact path='/' component={Top.Component} />
      </ReactRouter.Switch>
    </ReactRouter.BrowserRouter>
  )
}
