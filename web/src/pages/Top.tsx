import * as React from 'react'
import axios, { AxiosResponse } from 'axios'
import '../plugins/setting.js'
import * as Formik from 'formik'
import * as Yup from 'yup'
import * as Top from '../templates/Top'
import * as ReactRouter from 'react-router-dom'

export const Component = () => {
    const history = ReactRouter.useHistory()
  const formik = Formik.useFormik({
    initialValues: {
      content: ''
    },
    onSubmit: async values => {
      console.log('createTweet')
      const params = new URLSearchParams()
      const content: string = values.content
      params.append('content', content)
      console.log('params', params)
      await axios.post('http://localhost:2001/createTweet', params).then(()=>{
          values.content=""
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

  const [tweets, setTweets] = React.useState([])
  const [user,setUser] = React.useState([])
  const [users, setUsers] = React.useState([])


  React.useEffect(() => {
      const fetchData = async () => {
      console.log("fetchData")
      try {
        const res = await axios.get('http://localhost:2001/top')
        console.log("res.data.LoginUser",res.data.LoginUser)
        setUser(res.data.LoginUser)
        setUsers(res.data.Users);
        setTweets(res.data.Tweets);
      } catch( error ) {
        history.replace('/')
      }
    }
    fetchData()
  }, [])

  const contentField:string = React.useMemo(() => formik.values.content, [formik])
  return (
      <Top.Component
      user={user}
      users={users}
      tweets={tweets}
      content={contentField}

      handleChange={formik.handleChange}
      handleSubmit={formik.handleSubmit}
      />
  )
}

