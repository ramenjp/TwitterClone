import * as React from 'react'
import axios from 'axios'
import * as Formik from 'formik'
import * as Yup from 'yup'
import * as ReactRouter from 'react-router-dom'
import '../plugins/setting.js'

import * as Top from '../templates/Top'
import * as Interface from '../interface/interface'

export const Component = () => {
  const history = ReactRouter.useHistory()
  const formik = Formik.useFormik({
    initialValues: {
      content: ''
    },
    onSubmit: async values => {
      const params = new URLSearchParams()
      const content: string = values.content
      params.append('content', content)
      await axios
        .post('http://localhost:2001/createTweet', params, {
          withCredentials: true
        })
        .then(() => {
          values.content = ''
          window.location.reload()
        })
    },
    validationSchema: () => {
      return Yup.object().shape({
        content: Yup.string().required('入力してください')
      })
    },
    enableReinitialize: true
  })

  const [users, setUsers] = React.useState<Interface.User[]>([])
  const [tweets, setTweets] = React.useState<Interface.Tweet[]>([])
  const [user, setUser] = React.useState<Interface.User>({
    ID: 0,
    Name: "",
    UserName: "",
    Bio: "",
    Email: "",
    Password:"",
    Profile_img: ""
  })

  const logout = async () => {
    try {
      const res = await axios.get('http://localhost:2001/logout', {
        withCredentials: true
      })
      history.replace('/')
    } catch (error) {
      return
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:2001/top', {
          withCredentials: true
        })
        // TODO: フォローしてるユーザーのみツイートをとってくる
        setUser(res.data.LoginUser)
        setUsers(res.data.Users)
        setTweets(res.data.Tweets)
      } catch (error) {
        history.replace('/')
      }
    }
    fetchData()
  }, [])

  const contentField: string = React.useMemo(() => formik.values.content, [
    formik
  ])
  return (
    <Top.Component
      user={user}
      users={users}
      tweets={tweets}
      content={contentField}
      logout={logout}
      handleChange={formik.handleChange}
      handleSubmit={formik.handleSubmit}
    />
  )
}
