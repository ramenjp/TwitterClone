import * as React from 'react'
import axios from 'axios'
import * as OtherProfile from '../templates/OtherProfile'

type Props = {
  username: string
}

export const Component = (props: Props) => {
  const { username } = props
  const [contents, setContents] = React.useState([])
  const [user, setUser] = React.useState({
    ID: 0,
    Name: '',
    UserName: '',
    Email: '',
    Password: '',
    Bio: '',
    Profile_img: ''
  })

  React.useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const params = new URLSearchParams()
      params.append('username', username)
      const res = await axios.post(
        'http://localhost:2001/otherProfile',params,{
          withCredentials: true
      })
      console.log("res.data.TweetList",res.data.Tweets)
      setUser(res.data.User)
      setContents(res.data.Tweets)
    } catch (error) {
      console.log('error')
      return
    }
  }

  return <OtherProfile.Component tweets={contents} user={user} />
}
