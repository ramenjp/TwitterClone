import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import * as Formik from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import '../plugins/setting.js'

import * as Profile from '../templates/Profile'

export const Component = () => {
  const match = ReactRouter.useRouteMatch();
  const [file,setFile] = React.useState()
  const [tweet, setTweet] = React.useState([])
  const [likeTweet, setLikeTweet] = React.useState([])
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
      bio: user.Bio,
      image:user.Profile_img
    },
    onSubmit: async values => {
      const params = new URLSearchParams()
      const name = values.name
      const bio = values.bio
      const username = values.username
      const image = values.image;
      params.append('name', name)
      params.append('username', username)
      params.append('bio', bio)
      params.append('image', image)
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
    fetchLoginUserData()
  }, [])

  const fetchLoginUserData = async () => {
      try {
        const res = await axios.get('http://localhost:2001/profile', {
          withCredentials: true
        })
        setUser(res.data.LoginUser)
        setTweet(res.data.LoginUserTweets)
        setLikeTweet(res.data.LikeTweets)
      } catch (error) {
        console.log('error')
        return
      }
  }

//   const setImage = (e:string) => {
//     const image = document.getElementById('profile_image')
//     let reader = new FileReader();
//     reader.readAsDataURL(e);
//     console.log("reader.result",reader.result)
//     console.log("reader.result typeof",typeof(reader.result))
//   };

  const usernameField: string = React.useMemo(():string => formik.values.username,[formik])
  const nameField: string = React.useMemo(() => formik.values.name, [formik])
  const bioField: string = React.useMemo(() => formik.values.bio, [formik])
//   const imageField: any = React.useMemo(() => {
//     console.log("image: ",typeof(formik.values.image))
//     return setImage(formik.values.image)
//     },[formik.values.image])

  return (
        <Profile.Component
          tweet={tweet}
          likeTweet={likeTweet}
          user={user}
          username={usernameField}
          name={nameField}
          bio={bioField}
        //   image={imageField}

          params={match.url}
          handleChange={formik.handleChange}
          handleSubmit={formik.handleSubmit}
        />
    )
}
