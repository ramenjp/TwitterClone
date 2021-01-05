import * as React from 'react'
import axios from 'axios'
import '../plugins/setting.js'
import * as Formik from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'


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
    React.useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get('http://localhost:2001/')
      }
      fetchData()
    })
  
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:2001/')
        console.log('res', res)
      } catch (errror) {
        console.log('error!')
      }
    }

  return (
    <MainWrapper>
      <ContentWrapper>
        <ul>
          <SidebarItem>ホーム</SidebarItem>
          <SidebarItem>プロフィール</SidebarItem>
          <SidebarItem>ツイートする</SidebarItem>
        </ul>
      </ContentWrapper>
      <ContentWrapper>
          <Home>ホーム</Home>
          <form onSubmit={formik.handleSubmit}>
            <FullInput
              type='text'
              name='content'
              placeholder='今どうしてる？'
              onChange={formik.handleChange}
              value={formik.values.content}
            />
            <TweetButton type='submit'>ツイートする</TweetButton>
          </form>
      </ContentWrapper>
      <ContentWrapper>testtest</ContentWrapper>
    </MainWrapper>
  )
}



const SidebarItem = styled.li`
  line-height: 45px;
  width: 255px;
  font-size: 19px;
  font-weight: bold;
  color: black;
  list-style: none;
  &:hover {
    color: #1da1f2;
  }
`

const MainWrapper = styled.div`
  margin: 40px;
  display: flex;
`

const ContentWrapper = styled.div`
  width: calc(100% / 3);
  text-align: center;
`

const Home = styled.div`
font-weight:bold;
font-size:19px;
text-align: left;

`

const FullInput = styled.input`
font-size:19px;
  height: 50px;
  border: none;
  outline: none;
  width:100%;
  border-bottom:1px solid #A0A0A0;
  margin-bottom:10px;
`

const TweetButton = styled.button`
border: none;
border-radius:9999px;
outline: none;
width:120px;
height:37px;
color:white;
background-color:#1da1f2;
font-weight:bold;
font-size:15px;
display: block;
margin: 0 0 0 auto;
`
