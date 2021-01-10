import * as React from 'react'
import axios from 'axios'

import * as Login from './pages/Login'
import * as Top from './pages/Top'

export const Component = () => {
  console.log("Auth Component")
  const [isLogin, setIsLogin] = React.useState(false)
  console.log("isLogin",isLogin)
  const res = async () => {
    axios.get('http://localhost:2001/').then(res => {
      const isLogin = res.data
      console.log("res.data",res.data)
      setIsLogin(isLogin)
    })
  }

  return <div> {isLogin ? <Top.Component /> : <Login.Component /> }</div>
}
