import * as React from 'react'
import axios from 'axios'
import * as ReactRouter from 'react-router-dom'

import * as Following from '../templates/Following'

type Props = {} & ReactRouter.RouteComponentProps<{ userId: string }>

export const Component = (props:Props) => {
    const username:string = props.match.params.userId

    const [follow,setFollow] = React.useState([])
    React.useEffect(()=> {  
        fetchFollowUser()
    },[])

    const fetchFollowUser= async()=>{
        const params = new URLSearchParams()
        params.append("username",username)
        try{
          const res = await axios.get('http://localhost:2001/getFollowUser',{
              withCredentials: true
          })
          console.log("followUser",res.data)
          setFollow(res.data)
        }catch(error){
            return
        }
      }

    return (
        <Following.Component followUsers={follow} username={username} />
    )
}

