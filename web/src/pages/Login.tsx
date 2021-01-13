import * as React from 'react'
import * as Formik from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import * as ReactRouter from 'react-router-dom'

import * as Login from '../templates/Login'

type loginData = {
  username: string
  password: string
}

// type Props = {} & ReactRouter.RouteComponentProps

export const Component = () => {
  const history = ReactRouter.useHistory()
  const formik = Formik.useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async values => {
      const loginData: loginData = {
        username: values.username,
        password: values.password
      }
      const params = new URLSearchParams()
      params.append('username', loginData.username)
      params.append('password', loginData.password)
      await axios
        .post('http://localhost:2001/login', params, {
          withCredentials: true
        })
        .then(res => {
          if (res.status === 200) {
            history.push('/top')
          }
        })
        .catch(() => {
          alert('パスワードが違います。')
          window.location.reload()
          return
        })
    },
    validationSchema: () => {
      return Yup.object().shape({
        username: Yup.string().required('入力してください。'),
        password: Yup.string().required('入力してください。')
      })
    },
    enableReinitialize: true
  })
  const usernameField: string = React.useMemo(() => formik.values.username, [
    formik
  ])
  const passwordField = React.useMemo(() => formik.values.password, [formik])
  return (
    <Login.Component
      username={usernameField}
      password={passwordField}
      handleChange={formik.handleChange}
      handleSubmit={formik.handleSubmit}
    />
  )
}
