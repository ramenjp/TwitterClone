import * as React from 'react'
import axios from 'axios'

import * as Login from './pages/Login'
import * as Top from './pages/Top'

// useEffect内でstateがすぐに更新されないため正常に動かせていない
export const Component = () => {
  const [isLogin, setIsLogin] = React.useState(false)

  React.useEffect(() => {
    judgeIsLogin()
  }, [])

  const judgeIsLogin = () => {
    const res = async () => {
      axios.get('http://localhost:2001/').then(res => {
        const isLogin = res.data
        setIsLogin(isLogin)
      })
    }
  }

  return <div> {isLogin ? <Top.Component /> : <Login.Component />}</div>
}
