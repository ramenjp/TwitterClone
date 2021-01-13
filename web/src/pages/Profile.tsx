import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import * as Formik from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import '../plugins/setting.js'

import * as Profile from '../templates/Profile'
import * as OtherProfile from '../templates/OtherProfile'

type Props = {} & ReactRouter.RouteComponentProps<{ userId: string }>

export const Component = (props: Props) => {
  const location = ReactRouter.useLocation()
  const [judgeNum, setJudgeNum] = React.useState(1)
  const [isMyAccount, setIsMyAccount] = React.useState(true)
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
  const history = ReactRouter.useHistory()
  const formik = Formik.useFormik({
    initialValues: {
      name: user.Name,
      username: user.UserName,
      bio: user.Bio
    },
    onSubmit: async values => {
      const params = new URLSearchParams()
      const name = values.name
      const bio = values.bio
      const username = values.username
      // const Profile_img = values.profileImg;
      params.append('name', name)
      params.append('username', username)
      params.append('bio', bio)
      const response = await axios
        .post('http://localhost:2001/updateUser', params, {
          withCredentials: true
        })
        .then(response => {
          if (response.status === 200) {
            history.push('/top')
          }
        })
        .catch(error => {
          alert('更新できませんでした')
          window.location.reload()
        })
    },
    validationSchema: () => {
      return Yup.object().shape({
        username: Yup.string().required('入力してください。'),
        bio: Yup.string().max(140)
      })
    },
    enableReinitialize: true
  })

  React.useEffect(() => {
    const returnContent = async () => {
      //自分のアカウントかどうか判定
      await judgeIsMyAccout()
      //自分のアカウントでプロフィールを見ている場合プロフィール表示
      await fetchLoginUserData()
    }
    returnContent()
  }, [])

  React.useEffect(() => {
    console.log('useEffect isMyAccout', isMyAccount)
  }, [judgeNum])

  const judgeIsMyAccout = async () => {
    console.log('judgeMyAccout')
    const params = new URLSearchParams()
    params.append('userId', props.match.params.userId)
    const res = await axios.post(
      'http://localhost:2001/judgeIsMyAccout',
      params,
      {
        withCredentials: true
      }
    )
    console.log('judge res.data ', res.data)

    if (res.data === 'MyAccount') {
      console.log('myaccount!')
      setIsMyAccount(true)
    } else {
      console.log('Other account!')
      setIsMyAccount(false)
    }
  }

  //   const setIsAccount = (t:boolean) =>{
  //       setIsMyAccount(prevState => {
  //           const newState = t
  //           return newState
  //       });
  //   }

  const fetchLoginUserData = async () => {
    console.log('fetchLoginUserData')
    console.log('isMyAccount', isMyAccount)

    console.log('if前')
    if (isMyAccount) {
      try {
        const res = await axios.get('http://localhost:2001/profile', {
          withCredentials: true
        })
        setTweet(res.data.LoginUserTweets)
        setUser(res.data.LoginUser)
      } catch (error) {
        console.log('error')
        return
      }
    } else {
      console.log('params.userid', props.match.params.userId)
      try {
        const params = new URLSearchParams()
        params.append('userName', props.match.params.userId)
        const res = await axios.post(
          'http://localhost:2001/otherProfile',
          params,
          {
            withCredentials: true
          }
        )
        setUser(res.data.user)
        setTweet(res.data.userTweets)
      } catch (error) {
        return
      }
    }
  }

  const usernameField: string = React.useMemo(() => formik.values.username, [
    formik
  ])
  const nameField: string = React.useMemo(() => formik.values.name, [formik])
  const bioField: string = React.useMemo(() => formik.values.bio, [formik])

  return (
    <div>
      {isMyAccount ? (
        <Profile.Component
          tweet={tweet}
          user={user}
          username={usernameField}
          name={nameField}
          bio={bioField}
          handleChange={formik.handleChange}
          handleSubmit={formik.handleSubmit}
        />
      ) : (
        <OtherProfile.Component user={user} tweet={tweet} />
      )}
    </div>
  )
}
