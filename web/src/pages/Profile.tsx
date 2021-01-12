import * as React from 'react'
import * as Profile from '../templates/Profile'
import '../plugins/setting.js'

import * as ReactRouter from 'react-router-dom'
import * as Formik from 'formik'
import * as Yup from 'yup'
import axios from 'axios'


// type Props = {
//     user: User
// }

// type User = {
//     ID :number
// 	Name:string
// 	UserName:string
// 	Email : string
// 	Password : string
// 	Bio :string
// 	Profile_img:string 
// }

export const Component = () => {
    const [tweet,setTweet] = React.useState([])
    const [user,setUser] = React.useState({
        ID: 0,
        Name: '',
        UserName:'',
        Email:'',
        Password:'',
        Bio:'',
        Profile_img:''
    })
    const history = ReactRouter.useHistory()
    const formik = Formik.useFormik({
        initialValues:{
            name: user.Name,
            username:user.UserName,
            bio:user.Bio,
    },
    onSubmit: async values => {
        const params = new URLSearchParams()
        const name = values.name;
        const bio = values.bio;
        const username = values.username;
        console.log("name",name)
        console.log("username",username)
        console.log("bio",bio)
        // const Profile_img = values.profileImg;
        params.append("name",name)
        params.append("username",username)
        params.append("bio",bio)
        const response = await axios.post('http://localhost:2001/updateUser',params,{
            withCredentials:true
        }).then((response) => {
            if(response.status===200){
                history.push("/top")
            }
        })
        .catch((error)=>{
            alert("更新できませんでした")
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

    React.useEffect(() =>{
        const fetchLoginUserData = async () => {
            try{
                const res = await axios.get('http://localhost:2001/profile',{
                    withCredentials:true
                })
                console.log("loginUserData tweet",res.data.LoginUserTweets)
                console.log("loginUserData user",res.data.LoginUser)
                setTweet(res.data.LoginUserTweets)
                setUser(res.data.LoginUser)
            }
            catch(error) {
                return
            }
        }
        fetchLoginUserData()
    },[])

    const usernameField: string = React.useMemo(() => formik.values.username, [formik])
    const nameField: string = React.useMemo(() => formik.values.name, [formik])
    const bioField :string = React.useMemo(() => formik.values.bio, [formik])

  return (
    <Profile.Component 
      tweet={tweet}
      user={user}
      username={usernameField}
      name={nameField}
      bio={bioField}
      
      handleChange={formik.handleChange}
      handleSubmit={formik.handleSubmit}
      />
    )
}
