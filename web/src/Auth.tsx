import * as React from 'react'
import axios from 'axios'

import * as Login from './pages/Login'
import * as Top from './pages/Top'

export const Component = () => {
  const [isLogin, setIsLogin] = React.useState(false)
  const res = async () => {
    axios.get('http://localhost:2001/').then(res => {
      const isLogin = res.data
      setIsLogin(isLogin)
    })
  }

  return <div> {isLogin ? <Top.Component /> : <Login.Component />}</div>
}
