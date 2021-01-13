import * as React from 'react'
import * as Formik from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import * as ReactRouter from 'react-router-dom'

import * as Signup from '../templates/Signup'

type userData = {
    username:string,
    email:string,
    password:string
} 

type Props = {} & ReactRouter.RouteComponentProps

export const Component = (props:Props) => {
  const formik = Formik.useFormik({
    initialValues: {
      username:'',
      email: '',
      password: ''
    },
    onSubmit: async (values: any) => {
      const userData:userData = {
        username:values.username,
        email:values.email,
        password:values.password,
    }
      const params = new URLSearchParams()
      params.append('username', userData.username)
      params.append('email', userData.email)
      params.append('password', userData.password)
      const response = await axios.post('http://localhost:2001/createUser', params)
      if (response) {
          console.log("redirect");
          props.history.replace(`login`);
      }
    },
    validationSchema: () => {
      return Yup.object().shape({
        username: Yup.string().required('入力してください。'),
        email: Yup.string()
          .email('有効なメールアドレスを入力してください。')
          .required('入力してください。'),
        password: Yup.string().required('入力してください。')
      })
    },
    enableReinitialize: true
  })
  const usernameField: string = React.useMemo(() => formik.values.username, [formik])
  const emailField: string = React.useMemo(() => formik.values.email, [formik])
  const passwordField = React.useMemo(() => formik.values.password, [formik])
  return (
    <Signup.Component
      username={usernameField}
      email={emailField}
      password={passwordField}
      handleChange={formik.handleChange}
      handleSubmit={formik.handleSubmit}
    />
  )
}
