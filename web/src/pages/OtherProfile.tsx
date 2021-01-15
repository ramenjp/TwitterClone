import * as React from 'react'
import axios from 'axios'
import * as OtherProfile from '../templates/OtherProfile'

type Props = {
  username: string
}

export const Component = (props: Props) => {
  const { username } = props
  const [tweet, setTweet] = React.useState([])
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
        'http://localhost:2001/otherProfile',
        params,
        {
          withCredentials: true
        }
      )
      setUser(res.data.User)
      setTweet(res.data.Tweets)
    } catch (error) {
      console.log('error')
      return
    }
  }

  return <OtherProfile.Component tweets={tweet} user={user} />
}
