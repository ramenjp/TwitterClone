import * as React from 'react'
import styled from 'styled-components'
import * as Login from '../templates/Login'
import * as Formik from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

type loginData = {
    email:string,
    password:string
}

export const Component = () => {
  const formik = Formik.useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values: any) => {
      const loginData:loginData = {
        email:values.email,
        password:values.password,
    }
      const params = new URLSearchParams()
      params.append('email', loginData.email)
      params.append('password', loginData.password)
      const res = await axios.post('http://localhost:2001/login', params)
      if (!res.data?.login) {
        alert('パスワードが違います。')
        return
      }
      window.location.reload()
    },
    validationSchema: () => {
      return Yup.object().shape({
        email: Yup.string()
          .email('有効なメールアドレスを入力してください。')
          .required('入力してください。'),
        password: Yup.string().required('入力してください。')
      })
    },
    enableReinitialize: true
  })
  const emailField: string = React.useMemo(() => formik.values.email, [formik])
  const passwordField = React.useMemo(() => formik.values.password, [formik])
  return (
    <Login.Component
      email={emailField}
      password={passwordField}
      handleChange={formik.handleChange}
      handleSubmit={formik.handleSubmit}
    />
  )
}
