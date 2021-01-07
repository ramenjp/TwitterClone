import * as React from 'react'
import axios, { AxiosResponse } from 'axios'
import '../plugins/setting.js'
import * as Formik from 'formik'
import * as Yup from 'yup'
import * as Top from '../templates/Top'

export const Component = () => {
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
      const res = await axios.post('http://localhost:2001/createTweet', params)
    },
    validationSchema: () => {
      return Yup.object().shape({
        content: Yup.string().required('入力してください')
      })
    },
    enableReinitialize: true
  })

  const [tweets, setTweets] = React.useState([])
  const [users, setUsers] = React.useState([])


  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:2001/')
      setUsers(result.data)
      
    }
    fetchData()
  }, [])

  const contentField:string = React.useMemo(() => formik.values.content, [formik])
  return (
      <Top.Component
      users={users}
      tweets={tweets}
      content={contentField}

      handleChange={formik.handleChange}
      handleSubmit={formik.handleSubmit}
      />
  )
}

