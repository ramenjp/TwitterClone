import * as React from 'react'
import axios from 'axios'
import * as ReactRouter from 'react-router-dom'

import * as UserInfo from '../templates/UserInfo'

type Props = {} & ReactRouter.RouteComponentProps<{ userId: string }>

export const Component = (props: Props) => {
  const [isMyAccout, setIsMyAccout] = React.useState<boolean>(true)
  const username:string = props.match.params.userId

  React.useEffect(() => {
    //自分のアカウントかどうか判定
    judgeIsMyAccout()
  }, [])


  const judgeIsMyAccout = async () => {
    const params = new URLSearchParams()
    params.append('userId', username)
    try {
        const res = await axios.post(
          'http://localhost:2001/judgeIsMyAccout',params,{
            withCredentials: true
        })
        if (res.data === 'MyAccount') {
            setIsMyAccout(true)
            console.log("MyAccunt")
            return 
        } else {
            setIsMyAccout(false)
            console.log("Other Account")
            return 
        }
    } catch(error) {

    }
  }

return <UserInfo.Component isMyAccount={isMyAccout} username={username}/>
}

