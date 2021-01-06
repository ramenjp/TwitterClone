import * as React from 'react'
// import styled from 'styled-components'
import * as Login from '../templates/Login'
import * as Formik from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

type loginData = {
    username:string,
    password:string
}

export const Component = () => {
  const formik = Formik.useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values: any) => {
      const loginData:loginData = {
        username:values.username,
        password:values.password,
    }
      const params = new URLSearchParams()
      params.append('username', loginData.username)
      params.append('password', loginData.password)
      const res = await axios.post('http://localhost:2001/login', params)
    //   if (!res.data?.login) {
    //     alert('パスワードが違います。')
    //     return
    //   }
    //   window.location.reload()
    },
    validationSchema: () => {
      return Yup.object().shape({
        username: Yup.string().required('入力してください。'),
        password: Yup.string().required('入力してください。')
      })
    },
    enableReinitialize: true
  })
  const usernameField: string = React.useMemo(() => formik.values.username, [formik])
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
