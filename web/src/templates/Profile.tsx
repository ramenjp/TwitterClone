import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import styled from 'styled-components'

import * as Tweet from '../components/Tweet'
import * as Text from '../components/Text'

type Props = {
  user?: any
  tweet?: any
  likeTweet?: any
  username: string
  name: string
  bio: string
  params:string
//   image: any

  handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
}

export const Component = (props: Props) => {
  const { tweet,likeTweet, user ,name,username,bio,params} = props
  const [content, setContent] = React.useState(true)
  const [isEdit, setIsEdit] = React.useState(true)
  
  const renderTweet = () => {
    const tweetKeyList = Object.keys(tweet)
    return tweetKeyList.map(key => {
      return <Tweet.Component key={key} tweet={tweet[key].Content} date={tweet[key].CreatedAt}/>
    })
  }

  const renderLikeTweet = () => {
    const tweetKeyList = Object.keys(likeTweet)
    return tweetKeyList.map(key => {
      return <Tweet.Component key={key} tweet={likeTweet[key].Content} date={tweet[key].CreatedAt}/>
    })
  }
  const toggleTweetContent = () => {
    setContent(true)
  }
  const toggleLikeContent = () => {
    setContent(false)
  }
  const toggleEdit = () => {
    setIsEdit(!isEdit)
  }

//   const onFileChange= (e:any) => {
//     const files = e.target.files
//     if(files.length > 0) {
//         var file = files[0]
//         var reader = new FileReader()
//         reader.onload = (e) => {
//             if(e.target.result){
//                 setFileName(e.target.result)
//             }
//         };
//         reader.readAsDataURL(file)
//     }
// }
  
  return (
    <Wrapper>
      <StyledLink>
        <ReactRouter.Link to='/top'>
          <Text.Component text='ホームに戻る' />
        </ReactRouter.Link>
      </StyledLink>
      <EditButton onClick={toggleEdit}>プロフィールを編集</EditButton>
      {isEdit ? (
        <div>
          <ProfileWrapper>
            <Name>{user.Name}</Name>
            <UserName>@{user.UserName}</UserName>
            <Bio>{user.Bio}</Bio>
            <StyledLink>
            <ReactRouter.Link to={`${params}/following`}>
               フォロー中のユーザーを見る
            </ReactRouter.Link>
            </StyledLink>
          </ProfileWrapper>
          <Menu>
            <MenuItem onClick={toggleTweetContent}>ツイート</MenuItem>
            <MenuItem onClick={toggleLikeContent}>いいね</MenuItem>
          </Menu>
          <DisplayContent>
            {content ? <ul>{renderTweet()}</ul> : <div>{renderLikeTweet()}</div>}
          </DisplayContent>
        </div>
      ) : (
        <div>
          <form onSubmit={props.handleSubmit}>
            <Text.Component text='名前' />
            <FullInput
              type='text'
              name='name'
              placeholder='名前'
              value={name}
              onChange={props.handleChange}
            />
            <Text.Component text='ユーザネーム' />
            <FullInput
              type='text'
              name='username'
              placeholder='ユーザーネーム'
              value={username}
              onChange={props.handleChange}
            />
            <Text.Component text='自己紹介' />
            <FullInputArea
              name='bio'
              placeholder='自己紹介'
              value={bio}
              onChange={props.handleChange}
            />
            {/* <input
              id="profile_image"
              name="image"
              type='file'
              accept='.png, .jpg, .jpeg'
              value={image}
              onChange={e =>onFileChange(e) }
            />
            <img src={!image ? filename : image} /> */}
            <LoginButton>編集完了</LoginButton>
          </form>
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 40px;
  width: 40%;
  margin: 0 auto;
`

const ProfileWrapper = styled.div`
  padding: 15px;
`

const Name = styled.div`
  font-weight: bold;
  font-size: 19px;
`

const Menu = styled.div`
  display: flex;
`

const Bio = styled.div`
  font-size: 15px;
`

const MenuItem = styled.div`
  font-weight: bold;
  width: 50%;
  text-align: center;
  padding: 15px;
  &:hover {
    cursor: pointer;
    color: #1da1f2;
  }
`

const DisplayContent = styled.div``

const EditButton = styled.button`
  border-color: #1da1f2;
  border-width: 1px;
  border-radius: 9999px;
  outline: none;
  width: 167px;
  height: 40px;
  color: #1da1f2;
  background-color: white;
  font-weight: bold;
  font-size: 15px;
  display: block;
  margin: 0 0 0 auto;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`

const FullInput = styled.input`
  padding: 5px;
  margin-bottom: 14px;
  font-size: 19px;
  width: 100%;
  box-sizing: border-box;
`

const FullInputArea = styled.textarea`
  padding: 15px;
  margin-bottom: 14px;
  font-size: 19px;
  width: 100%;
  box-sizing: border-box;
`

const LoginButton = styled.button`
  border: none;
  border-radius: 9999px;
  outline: none;
  width: 100%;
  height: 37px;
  color: white;
  background-color: #1da1f2;
  font-weight: bold;
  font-size: 15px;
  display: block;
  margin-bottom: 30px;
  &:hover {
    cursor: pointer;
  }
`

const UserName = styled.div`
  color: #5b7083;
  font-size: 15px;
  margin-bottom: 10px;
`

const StyledLink = styled.div`
  a {
    text-decoration: none;
    color: black;
    &:hover {
      color: #1da1f2;
    }
  }
`
